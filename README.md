Quickly generate WP login CSS files for Funkhaus projects.

## How
1. `sudo npm install funkhaus-format-login -g`
1. Open Terminal and move to the desired directory
1. `funkhaus-format-login` and follow instructions

That's it!

## How It Works
The program requires the following as hex values (`#xxxxxx`, `xxxxxx`, `#xxx`, or `xxx` accepted)
* background
* font-color

Additional optional values include:
* label-font-color (default: font-color)
* input-background (default: background)
* button-background (default: font-color)
* button-font-color (default: background)
* button-hover-background (default: background)
* button-hover-font-color (default: font-color)
* check-color (default: font-color)

## Changing the Template
Everything that happens in the script is based on the `template.css` file. `funkhaus-format-login` scans `template.css` for [Mustache-style](https://mustache.github.io/) placeholders, then prompts the user for values to fill those placeholders.

For example, if `template.css` just contained this:

```css
html {
    color: {{ background-color }};
}
```

then running `format-login` would ask you for the `background-color`:

```
prompt: background-color (required): [your hex value here]
```

and would result in this CSS file:

```css
html {
    color: [your hex value here];
}
```

You can also specify a default value for a placeholder:

```css
html {
    color: {{ background }};
}
body {
    color: {{ body-background default:background }};
}
```

Name the placeholder as usual, then indicate a default value to look for with `default:[default-value-name]`. This falls back on the default value if the user doesn't specify the value in the prompt.

-------

Version 1.0

http://funkhaus.us
