# Tourette Atom package

This package will help you to convert selected text symbols in Atom editor
from Cyrillic to Latin keyboard layout.

## Demonstration

![Tourette demonstration](http://cheersunlimited.com.ua/tourette-demo.gif)

## Purpose

Coders who use Cyrillic keyboard layout are often caught writing code (after chit-chat with their Slavic friends) in their fluent keyboard layout, resulting in few words (or even lines) of bollocks. This is rather annoying.

Now instead of furiously hitting backspace and swearing like you've got Tourette's syndrome, just finish the statement, select it and press the hotkey combination - and Cyrillic symbols will get converted to Latin according to standard keyboard layout.

## Installation

To install this package with Atom Package Manager:

```shell
apm install tourette
```

Alternatively just use Atom interface.

## Usage

Select some text in your editor and press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>z</kbd> to convert it. Tourette will omit non-Cyrillic characters or ones that do not require convertion.
