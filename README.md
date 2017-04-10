Fill out Mustache-style templates for any file quickly and easily.

## How
1. `sudo npm install fill-template -g`
1. Open Terminal and move to the desired directory
1. `fill-template` and follow instructions

That's it!

## Options

* `-t filename.txt` or `--template example.txt`
    * File to use as a template (default `template.txt`)
* `-e encoding` or `--encoding encoding`
    * Encoding of the template (default utf8)
* `-o example.txt` or `--output example.txt`
    * Name of output file (default `output.txt`)

## Changing the Template
Everything that happens in the script is based on the template file. `fill-template` scans the template (default `templates/template.css`) for [Mustache-style](https://mustache.github.io/) placeholders, then prompts the user for values to fill those placeholders.

For example, if `template.css` just contained this:

```css
html {
    color: {{ background-color }};
}
```

then running `fill-template` would ask you for the `background-color`:

```
prompt: background-color (required): [your hex value here]
```

and would result in this CSS file:

```css
html {
    color: [your hex value here];
}
```

### Defaults

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

### Types

You can specify types for placeholders:

```css
html {
    color: {{ background type:hex }}
}
```

Valid types are:
* `string` (default)
* `hex`
* `number`

-------

Version 2.0.1

http://funkhaus.us
