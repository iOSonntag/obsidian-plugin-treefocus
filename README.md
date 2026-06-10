# TreeFocus for Obsidian

> **Highlight**, **dim** and **style** the files and folders in your Obsidian file explorer - automatically, with rules, or item by item.

[![version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FiOSonntag%2Fobsidian-plugin-treefocus%2Fmaster%2Fmanifest.json&query=%24.version&label=version&color=7c3aed)](https://github.com/iOSonntag/obsidian-plugin-treefocus/releases)
[![obsidian](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FiOSonntag%2Fobsidian-plugin-treefocus%2Fmaster%2Fmanifest.json&query=%24.minAppVersion&label=obsidian&color=7c3aed)](https://obsidian.md)
[![build](https://github.com/iOSonntag/obsidian-plugin-treefocus/actions/workflows/release.yml/badge.svg?branch=master)](https://github.com/iOSonntag/obsidian-plugin-treefocus/actions/workflows/release.yml)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6)
![license](https://img.shields.io/badge/license-MIT-green)

<p align="center">
  <img src="resources/treefocus_01.png?raw=true" width="320" alt="TreeFocus styling the file explorer" />
</p>

A busy vault makes every file look equally important. TreeFocus lets you turn down the noise (template, attachment and archive folders) and bring the signal forward (your active projects) - so your file explorer reflects what actually matters to you.

---

## Contents

- [Features](#features)
- [Installation](#installation)
- [How it works](#how-it-works)
- [Matching rules](#matching-rules)
- [Per-item overrides](#per-item-overrides)
- [Style presets](#style-presets)
- [Compatibility](#compatibility)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Features

- 💡 **Highlight** the files and folders you care about.
- 🥱 **Dim** the ones you rarely touch.
- 🧰 **Rule-based** styling - match by name or full path using *equals*, *contains*, *starts with*, *ends with*, or *regex*.
- 🖱️ **Per-item overrides** - right-click any item to set its mode explicitly, overriding all rules.
- 🎨 **Style presets** - choose how highlight and dim actually look (`Default`, `Fancy`, `Delight`).
- 📱 **Desktop and mobile** - works on every platform Obsidian runs on.
- 🤝 **Plays nicely** with the [Iconize](https://github.com/FlorianWoelki/obsidian-iconize) plugin.

---

## Installation

### From within Obsidian (recommended)

1. Open **Settings → Community plugins** and make sure *Restricted mode* is **off**.
2. Click **Browse**, search for **TreeFocus**.
3. Click **Install**, then **Enable**.

### Manual installation

1. Download `main.js`, `manifest.json` and `styles.css` from the [latest release](https://github.com/iOSonntag/obsidian-plugin-treefocus/releases/latest).
2. Copy them into `<your-vault>/.obsidian/plugins/treefocus/`.
3. Reload Obsidian and enable **TreeFocus** under **Settings → Community plugins**.

> Requires Obsidian `1.2.0` or newer.

---

## How it works

Every item in the file explorer resolves to exactly one **focus mode**:

| Mode | Meaning |
| --- | --- |
| 💡 `Highlight` | Make the item stand out. |
| 🥱 `Dim` | Fade the item into the background. |
| 🍆 `Default` | Leave it as Obsidian renders it. |

A mode is assigned in one of two ways, in order of priority:

1. **Per-item override** - set explicitly via the right-click context menu (always wins).
2. **Matching rules** - the first rule whose matcher matches the item.

The chosen mode is then rendered according to your selected [style preset](#style-presets).

<p align="center">
  <img src="resources/settings_01.png?raw=true" width="420" alt="TreeFocus settings" />
</p>

---

## Matching rules

A rule says *"apply this mode to every item that matches this condition"*. Each rule combines a **match method** with a **match context**, plus optional **exclusions**.

**Match method**

| Method | Matches when the value... |
| --- | --- |
| `Equals` | is exactly equal |
| `Contains` | appears anywhere |
| `Starts with` | is a prefix |
| `Ends with` | is a suffix |
| `Regex` | matches the regular expression |

**Match context**

| Context | Matched against |
| --- | --- |
| `Name` | the file or folder name |
| `Path` | the full vault-relative path |

### Default rules

TreeFocus ships with a few sensible defaults you can edit or remove:

- 🥱 **Dim** everything whose name **starts with** `_` (e.g. `_templates`, `_attachments`).
- 🥱 **Dim** everything whose name **starts with** `.` (hidden / system items).
- 💡 **Highlight** everything whose name **starts with** `!` (e.g. `!inbox`, `!active-project`).

> Tip: prefixing a folder with `_` or `!` is a quick, zero-config way to dim or highlight it.

---

## Per-item overrides

Right-click any file or folder in the explorer to set its mode explicitly. This overrides every matching rule and can be reset at any time.

<p align="center">
  <img src="resources/context_menu_01.png?raw=true" width="220" alt="TreeFocus context menu" />
</p>

---

## Style presets

The focus modes are abstract - the **style preset** decides how `Highlight` and `Dim` are actually drawn. Pick the one that fits your theme:

| Preset | Look |
| --- | --- |
| `Default` | Subtle, theme-friendly emphasis and fading. |
| `Fancy` | Stronger, more decorative styling. |
| `Delight` | A little extra flair. |

---

## Compatibility

TreeFocus is fully compatible with [**Iconize** (`obsidian-iconize`)](https://github.com/FlorianWoelki/obsidian-iconize) - your folder icons and TreeFocus styling work side by side. Big thanks to [@FlorianWoelki](https://github.com/FlorianWoelki) for that excellent plugin. 🎉

---

## Contributing

Pull requests are very welcome. If you have an improvement or a fix, please open a PR or an [issue](https://github.com/iOSonntag/obsidian-plugin-treefocus/issues).

And do not talk yourself out of it because you think you are "not skilled enough" - we are all beginners, all the time. 🙂

### Development

```bash
pnpm install          # install dependencies (pnpm 11+)
pnpm run dev          # watch + rebuild on change
pnpm run build        # type-check and produce a production build
```

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint); releases are cut automatically by semantic-release.

---

## Support

If TreeFocus is useful to you, consider supporting its development - a feature request, a pull request, or a small coffee all help. Thank you!

<a href="https://www.buymeacoffee.com/iOSonntag" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="48" /></a>

- [Buy Me a Coffee](https://www.buymeacoffee.com/iOSonntag)
- [GitHub Sponsors](https://github.com/sponsors/iOSonntag)
- [PayPal](https://paypal.com/paypalme/iOSonntag/20)
- [Homepage](https://iOSonntag.com/buy-me-a-coffee)

---

## License

[MIT](LICENSE) © [iOSonntag](https://iOSonntag.com)

---

<sub><b>Disclaimer:</b> "TreeFocusMode™" is a tongue-in-cheek joke - a little parody of trademark overzealousness. No trademarks were harmed in the making of this plugin. Have a great day! 😄</sub>
