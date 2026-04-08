# Docusaurus Tabs — simple examples

Note: put this file as MDX (e.g., `.mdx`) or add the imports at the top of your MDX page.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



<Tabs>
    <TabItem value="overview" label="Overview">
    This is the overview content. Explain features or concepts here.
    </TabItem>

    <TabItem value="details" label="Details">
    More detailed explanation, examples, or usage notes.
    </TabItem>
</Tabs>

<Tabs>
    <TabItem value="js" label="JavaScript">
    ```js
    // JavaScript example
    import lib from 'my-lib';
    lib.doThing();
    ```
    </TabItem>

    <TabItem value="py" label="Python">
    ```py
    # Python example
    from my_lib import do_thing
    do_thing()
    ```
    </TabItem>

    <TabItem value="cli" label="CLI">
    ```bash
    # Command-line example
    my-tool init
    my-tool run
    ```
    </TabItem>
</Tabs>


Tips:
- Use .mdx files to enable component imports.
- Keep TabItem value unique per Tabs group.
- You can nest Tabs or style content inside each TabItem as needed.