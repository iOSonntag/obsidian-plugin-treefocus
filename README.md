# Obsidian Plugin: TreeFocus

![Dynamic JSON
Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FiOSonntag%2Fobsidian-plugin-treefocus%2Fmaster%2Fpackage.json&query=%24.version&label=version)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FiOSonntag%2Fobsidian-plugin-treefocus%2Fmaster%2Fmanifest.json&query=%24.id&label=obsidian-plugin&color=rgb(124%2C%2058%2C%20237))
![Static Badge](https://img.shields.io/badge/strict-d?label=TypeScript)
[![build](https://github.com/iOSonntag/obsidian-plugin-treefocus/actions/workflows/release.yml/badge.svg?branch=master)](https://github.com/iOSonntag/obsidian-plugin-treefocus/actions/workflows/release.yml)

### Ever wanted to (*dim*) a `File` or `Folder`?  
> **For example:**  
> *System* like Folder: `/_SYS/`  
> (maybe for your template and attachment Folders)

### Or maybe **HIGHLIGHT** some `Files` and `Folders`?

> **For example:**  
> Root Folders like: `/_Backend/` or `/More/`

### Or any other imaginable item focus config for your file explorer?

*🍀 🍀 🍀 Good Fortune has arrived! This plugin makes it happen! :D 🍀 🍀 🍀*



<br/>
<br/>

# TreeFocus - Intro
**Highlight**, **dim** & **style** your `Files` & `Folders` in the file
explorer based on predefined or custom rules.

All your vault items in the left navigation panel can be styled. Either via 
- **matching rules** *or* 
- **explicitly set** via the item context menu

Every item in the file explorer evaluates to one of the following
**TreeFocusModes**™ :
- 💡 `HIGHLIGHT` 
- 🥱 `DIM` 
- 🍆 `DEFAULT` (Obsidian default)

Then each item will be styled based on that **TreeFocusMode**™.

<br/>

## Combine with other Plugins
You like the **`Icon Folder`** plugin?  
Me too that is why this plugin is fully
compatible with the plugin [Icon Folder (`obsidian-iconize`)](https://github.com/FlorianWoelki/obsidian-iconize).
> Hurray 🕺 🎊 🎉 !!!  
> Big shout out @ [FlorianWoelki](https://github.com/FlorianWoelki) for his
> awesome plugin.


<br/>

## How it all works
*Example config result:*

<img src="resources/treefocus_01.png?raw=true" width="300">

<br/>

The screenshot is the result of choosing the
- **Style Transformation Preset:** `Fancy` 

and applying the following rules:


1. **TreeFocusMode**™ - `DIM`  
on all `Files` and `Folders` starting with `'_'`

2. **TreeFocusMode**™ - `HIGHLIGHT`  
on explicit selected items:
    - `/Backend`
    - `/More`


<br/>
<br/>

## Settings

You can configure the behavior of this plugin by either defining general rules
or explicitly set the **TreeFocusMode**™ per `File` / `Folder`.

<img src="resources/settings_01.png?raw=true" width="400">


<br/>
<br/>

## Explicit Transformations: Configurations On Item Level

Right click on an item in the file explorer gives you options to explicitly
apply **TreeFocusModes**™. This overwrites all defined rules and can be reset at any time.

<img src="resources/context_menu_01.png?raw=true" width="200">


<br/>
<br/>

## Bugs

Please report any issues at: [TreeFocus - GitHub Repository](https://github.com/iOSonntag/obsidian-plugin-treefocus/issues)


<br/>
<br/>

## Contribution

Pull requests are **WELCOME** !

> If you have improvements or feel like you can solve a bug, please do not
> hesitate to submit a pull requests. Even if you think you might not be skilled
> enough. That is pure bullsh*t. We are all beginners - all the time :)

<br/>
<br/>

## Support This Plugin

If you like this plugin and want to support it - submit a feature request, a
pull request or simply buy me
a little coffee :) - Thank You.

If you find this useful - feel free to buy me a coffee :)

<a href="https://www.buymeacoffee.com/iOSonntag" target="_blank"><img
src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A
Coffee" style="height: 60px !important;width: 217px !important;" ></a>

or direct via
- [Buy Me A Coffee](https://www.buymeacoffee.com/iOSonntag)
- [GitHub Sponsor](https://github.com/sponsors/iOSonntag)
- [PayPal](https://paypal.com/paypalme/iOSonntag/20)
- [Homepage](https://iOSonntag.com/buy-me-a-coffe)

<br/>
<br/>

## DISCLAIMER

I do not own the **TreeFocusMode**™ nor the **TreeFocusModes**™ trade mark. This
is pure parody on the stupidity of that trade mark. Developers do these kind of
jokes :D - Have a great day!