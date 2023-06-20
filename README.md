# Lensys
Lensys is a Google Chrome extension that converts selected text into code blocks with syntax highlight. Lensys is powered by [Highlight.js](https://github.com/highlightjs/highlight.js) and supports most major programming languages. More features are in the works. Let me know if there is any thing you would like to see or if there are any bugs you come by.

# Changelog
You can find the changelog for Lensys [here](https://github.com/AbdelRahmanRahal/Lensys/blob/main/CHANGELOG.md).

# Credits
Thank you to these amazing people/projects for helping make this extension possible:

<table>
  <tr>
    <td align="center" style="min-width: 75px;">
      <a href="https://github.com/AlexanderBerejnov">
        <img src="https://avatars.githubusercontent.com/u/32594553?v=4" width="50px" alt="Alexander Berejnov"/>
        <br /><sub><b>Alexander Berejnov</b></sub>
      </a>
    </td>
    <td align="center" style="min-width: 75px;">
      <a href="https://github.com/highlightjs/highlight.js">
        <img src="https://avatars.githubusercontent.com/u/9039821?s=200&v=4" width="50px" alt="Highlight.js"/>
        <br /><sub><b>Highlight.js</b></sub>
      </a>
    </td>
  </tr>
</table>
<br />

- Berejnov fixed a major issue with the compatibility of Lensys with some sites, making it work on practically any website.
- Highlight.js powers Lensys' syntax highlight feature.

# Installation
Currently, this extension is not available on the Chrome store. So follow these steps to install it:
1. Download the [latest release](https://github.com/AbdelRahmanRahal/Lensys/releases/tag/v1.0.0).
2. Open up Google Chrome and click on the extensions icon.
3. Click on `Manage extensions`.
4. On the top right corner, activate `Developer mode` if it's not already activated.
5. On the top left corner, click on `Load unpacked`.
6. Navigate to the Lensys folder and click `Select Folder`.

Done. Now, you should be ready to use Lensys.

> **Warning**: this extension is not available on the Chrome Web Store yet. Also, make sure Lensys is not active on all sites if it makes your websites load slower. You can do that by setting `This can read and change site data` to `When you click the extension`.

# Usage
1. Select a piece of unformatted code.
2. Click on the Lensys icon.
3. Click on the `Lensys.syntaxHighlight(my_code);` button.

![Demo gif to demonstrate how to use Lensys](https://github.com/AbdelRahmanRahal/Lensys/blob/main/demo.gif?raw=true)

Done. The code should now be formatted into a beautiful code block with syntax highlighting for the lanugage used.
