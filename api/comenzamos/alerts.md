## Alerts

A single section with examples of the common alert/admonition styles you can use in Docusaurus.

### Admonitions (MDX)
Use Docusaurus' built‑in admonition blocks (supported types: note, tip, info, caution, danger).

:::note Note
This is a note admonition.
:::

:::tip Tip
This is a tip admonition.
:::

:::info Info
This is an info admonition.
:::

:::caution Caution
This is a caution admonition.
:::

:::danger Danger
This is a danger admonition.
:::

### Infima alerts (HTML)
If you need more control over styling or want inline alerts, use Infima alert classes.

```html
<div class="alert alert--success">
    <strong>Success:</strong> The operation completed successfully.
</div>

<div class="alert alert--info">
    <strong>Info:</strong> Here is some important information.
</div>

<div class="alert alert--warning">
    <!-- se puede subrayar ciertas lineas-->
    //highlight-next-line
    <strong>Warning:</strong> Be cautious with this action.
</div>

<div class="alert alert--danger">
    <strong>Danger:</strong> This action may have severe consequences.
</div>
```

### Notes and tips
- Use admonitions for documentation semantics (notes, tips, warnings).
- Use Infima alerts for custom layouts or when you need inline HTML control.
- You can combine icons, links, and markdown inside admonitions and alert content.
- For custom colors or additional variants, create CSS classes in your theme and apply them to the alert divs.