/**
 * Genera documentación Markdown en api/link y api/next-ecuador desde los OpenAPI YAML.
 * Ejecutar: node scripts/generate-api-docs.mjs
 */
import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const DOC_HINTS_LINK = {
  Facturas: { path: '/docs/advconf/invoice', label: 'Configuración avanzada — Facturas' },
  'Notas de crédito': { path: '/docs/advconf/credit-note', label: 'Notas de crédito' },
  'Notas de débito': { path: '/docs/advconf/debit-note', label: 'Notas de débito' },
  Retenciones: { path: '/docs/advconf/ats-retention', label: 'Retenciones ATS' },
  'Guías de remisión': { path: '/docs/advconf/waybill', label: 'Guías de remisión' },
  'Liquidaciones de compra': { path: '/docs/advconf/purch-settlement', label: 'Liquidaciones de compra' },
  Edocs: { path: '/docs/advconf/doc-query', label: 'Consulta de documentos' },
};

const DOC_HINTS_NEXT = {
  'Ventas — facturas': { path: '/docs/advconf/invoice', label: 'Facturas' },
  'Ventas — notas de crédito': { path: '/docs/advconf/credit-note', label: 'Notas de crédito' },
  'Ventas — retenciones': { path: '/docs/advconf/ats-retention', label: 'Retenciones' },
  'Compras — retenciones': { path: '/docs/advconf/ats-retention', label: 'Retenciones' },
};

function slugifyTag(tag) {
  return tag
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[—–]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function resolveRef(components, ref) {
  if (!ref || typeof ref !== 'string' || !ref.startsWith('#/components/')) return null;
  const parts = ref.replace('#/components/', '').split('/');
  let cur = components;
  for (const p of parts) {
    cur = cur?.[p];
  }
  return cur ?? null;
}

function resolveParam(p, components) {
  if (p && p.$ref) {
    const r = resolveRef(components, p.$ref);
    return r ? { ...r } : p;
  }
  return p;
}

function schemaType(schema) {
  if (!schema) return '—';
  if (schema.$ref) {
    const name = schema.$ref.split('/').pop();
    return `\`${name}\``;
  }
  if (schema.enum) return `enum: ${schema.enum.join(', ')}`;
  let t = schema.type || 'object';
  if (schema.format) t += ` (${schema.format})`;
  if (schema.items?.$ref) t += ` of \`${schema.items.$ref.split('/').pop()}\``;
  return t;
}

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/\|/g, '\\|').replace(/\r?\n/g, '<br/>');
}

function describeSecurity(spec, operationSecurity, securitySchemes) {
  const sec = operationSecurity ?? spec.security;
  if (!sec || !sec.length) return 'No requiere autenticación (según especificación).';

  const lines = [];
  for (const req of sec) {
    const keys = Object.keys(req).filter((k) => req[k] !== undefined);
    const parts = keys.map((name) => {
      const scheme = securitySchemes?.[name];
      if (!scheme) return name;
      if (scheme.type === 'apiKey') {
        return `\`${scheme.name}\` (${scheme.in})`;
      }
      return name;
    });
    lines.push(parts.join(' + '));
  }
  return lines.join(' **o** ');
}

function getBaseUrl(spec, pathItemServers, opServers) {
  const s = opServers?.[0] ?? pathItemServers?.[0] ?? spec.servers?.[0];
  return s?.url?.replace(/\/$/, '') || 'https://example.invalid';
}

function collectOperations(spec) {
  const components = spec.components || {};
  const securitySchemes = components.securitySchemes || {};
  const out = [];

  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    if (!pathItem || typeof pathItem !== 'object') continue;

    const pathServers = pathItem.servers;
    for (const method of ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']) {
      const op = pathItem[method];
      if (!op || typeof op !== 'object') continue;

      const tags = op.tags?.length ? op.tags : ['Sin etiqueta'];
      const primaryTag = tags[0];
      const params = (op.parameters || []).map((p) => resolveParam(p, components));

      out.push({
        path: pathKey,
        method: method.toUpperCase(),
        operationId: op.operationId,
        summary: op.summary,
        description: op.description,
        tags,
        primaryTag,
        parameters: params,
        requestBody: op.requestBody,
        responses: op.responses || {},
        security: op.security,
        baseUrl: getBaseUrl(spec, pathServers, op.servers),
        securityDescription: describeSecurity(spec, op.security, securitySchemes),
      });
    }
  }
  return { operations: out, securitySchemes };
}

function tagOrder(spec) {
  const listed = (spec.tags || []).map((t) => (typeof t === 'string' ? t : t.name));
  const seen = new Set();
  const order = [];
  for (const t of listed) {
    if (!seen.has(t)) {
      seen.add(t);
      order.push(t);
    }
  }
  return order;
}

function groupByTag(operations) {
  const map = new Map();
  for (const op of operations) {
    const tag = op.primaryTag;
    if (!map.has(tag)) map.set(tag, []);
    map.get(tag).push(op);
  }
  return map;
}

function requestBodyRows(requestBody, components) {
  if (!requestBody) return '';
  const resolved = requestBody.$ref ? resolveRef(components, requestBody.$ref) : requestBody;
  if (!resolved?.content) return '';

  const rows = [];
  for (const [ct, meta] of Object.entries(resolved.content)) {
    const schema = meta?.schema;
    const req = resolved.required ? 'sí' : 'no';
    rows.push(`| Cuerpo | ${esc(ct)} | ${req} | ${esc(schemaType(schema))} |`);
  }
  return rows.length
    ? `\n**Cuerpo de la petición**\n\n| Origen | Content-Type | Requerido | Esquema |\n| --- | --- | --- | --- |\n${rows.join('\n')}\n`
    : '';
}

function responsesTable(responses, components) {
  const rows = [];
  for (const [code, res] of Object.entries(responses)) {
    const resolved = res.$ref ? resolveRef(components, res.$ref) : res;
    const desc = resolved?.description || '—';
    let contentTypes = '—';
    if (resolved?.content) {
      contentTypes = Object.keys(resolved.content).join(', ');
    }
    rows.push(`| \`${code}\` | ${esc(desc)} | ${esc(contentTypes)} |`);
  }
  if (!rows.length) return '';
  return `**Respuestas**\n\n| Código | Descripción | Content-Type |\n| --- | --- | --- |\n${rows.join('\n')}\n`;
}

function paramsTable(parameters) {
  if (!parameters?.length) return '';
  const rows = parameters.map((p) => {
    const req = p.required ? 'sí' : 'no';
    const desc = p.description || '—';
    return `| \`${esc(p.name)}\` | ${p.in} | ${esc(schemaType(p.schema))} | ${req} | ${esc(desc)} |`;
  });
  return `**Parámetros**\n\n| Nombre | En | Tipo | Requerido | Descripción |\n| --- | --- | --- | --- | --- |\n${rows.join('\n')}\n`;
}

function minimalCurl(op) {
  const url = `${op.baseUrl}${op.path}`;
  const usesXKey =
    op.baseUrl.includes('link.datil') || op.baseUrl.includes('app.datil');
  const keyHeader = usesXKey ? "-H 'X-Key: TU_API_KEY'" : "-H 'X-Api-Key: TU_API_KEY'";
  const jsonPostHeaders = usesXKey
    ? "-H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json'"
    : "-H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json'";
  if (['GET', 'DELETE', 'HEAD'].includes(op.method)) {
    return `\`\`\`bash\ncurl -sS -X ${op.method} '${url}' \\\n  ${keyHeader}\n\`\`\`\n`;
  }
  return `\`\`\`bash\ncurl -sS -X ${op.method} '${url}' \\\n  ${jsonPostHeaders} \\\n  -d '{}'\n\`\`\`\n`;
}

function buildTagPage(tag, ops, spec, options) {
  const { docHints } = options;
  const components = spec.components || {};
  const hint = docHints[tag];
  const bases = [...new Set(ops.map((o) => o.baseUrl))];
  const basePhrase =
    bases.length === 1 ? `Base URL: \`${bases[0]}\`` : `Bases URL: ${bases.map((b) => `\`${b}\``).join(', ')}`;

  let body = `Esta sección describe los endpoints del grupo **${tag}**. ${basePhrase}.\n\n`;

  if (hint) {
    body += `:::tip Guía relacionada\nEn la documentación general: [${hint.label}](${hint.path}).\n:::\n\n`;
  }

  body += `:::info Esquemas JSON/XML\nLos cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.\n:::\n\n`;

  for (const op of ops) {
    const sum = (op.summary || op.operationId || 'Operación').replace(/\s+/g, ' ').trim();
    body += `## ${op.method} \`${op.path}\` — ${sum}\n\n`;
    body += `**Identificador de operación:** \`${op.operationId || '—'}\`\n\n`;
    body += `**Autenticación:** ${op.securityDescription}\n\n`;

    if (op.description) {
      body += `:::note Detalle\n${op.description.trim()}\n:::\n\n`;
    }

    body += paramsTable(op.parameters);
    body += requestBodyRows(op.requestBody, components);
    if (Object.keys(op.responses || {}).length) body += '\n';
    body += responsesTable(op.responses, components);
    body += `**Ejemplo (curl)**\n\n${minimalCurl(op)}\n`;
  }

  return body;
}

function writeApiDocs({ spec, outDir, docHints, tagOrderOverride }) {
  fs.mkdirSync(outDir, { recursive: true });
  const { operations } = collectOperations(spec);
  const byTag = groupByTag(operations);
  const order = tagOrderOverride || tagOrder(spec);

  for (const tag of order) {
    if (!byTag.has(tag)) continue;
    const slug = slugifyTag(tag);
    const pos = order.indexOf(tag) + 1;
    const content = buildTagPage(tag, byTag.get(tag), spec, { docHints });
    const md = `---
title: ${JSON.stringify(tag)}
sidebar_position: ${pos}
---

${content}`;
    fs.writeFileSync(path.join(outDir, `${slug}.md`), md, 'utf8');
    byTag.delete(tag);
  }

  let extraPos = order.length + 1;
  for (const [tag, ops] of byTag) {
    const slug = slugifyTag(tag);
    const content = buildTagPage(tag, ops, spec, { docHints });
    const md = `---
title: ${JSON.stringify(tag)}
sidebar_position: ${extraPos++}
---

${content}`;
    fs.writeFileSync(path.join(outDir, `${slug}.md`), md, 'utf8');
  }
}

function main() {
  const linkYaml = fs.readFileSync(path.join(ROOT, 'openapi', 'link.openapi.yaml'), 'utf8');
  const nextYaml = fs.readFileSync(path.join(ROOT, 'openapi', 'api.openapi.yaml'), 'utf8');
  const linkSpec = parseYaml(linkYaml);
  const nextSpec = parseYaml(nextYaml);

  const linkTags = tagOrder(linkSpec);
  const nextTags = tagOrder(nextSpec);

  writeApiDocs({
    spec: linkSpec,
    outDir: path.join(ROOT, 'api', 'link'),
    docHints: DOC_HINTS_LINK,
    tagOrderOverride: linkTags,
  });

  writeApiDocs({
    spec: nextSpec,
    outDir: path.join(ROOT, 'api', 'next-ecuador'),
    docHints: DOC_HINTS_NEXT,
    tagOrderOverride: nextTags,
  });

  console.log('Generado: api/link/*.md, api/next-ecuador/*.md');
}

main();
