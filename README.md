# G2 libraries

![](https://badgen.net/badge/React/18.2.0/purple)
![](https://badgen.net/badge/@mui%2Fmaterial/5.8.4/green)
![](https://badgen.net/npm/v/@komune-io/g2-components/latest)
![](https://badgen.net/npm/types/tslib)

## 📦 Install

```bash
npm install @komune-io/g2-components
npm install @komune-io/g2-documentation
npm install @komune-io/g2-layout
npm install @komune-io/g2-notifications
npm install @komune-io/g2-forms
npm install @komune-io/g2-providers
npm install @komune-io/g2-themes
npm install @komune-io/g2-s2
```

```bash
yarn add @komune-io/g2-components
yarn add @komune-io/g2-documentation
yarn add @komune-io/g2-layout
yarn add @komune-io/g2-notifications
yarn add @komune-io/g2-forms
yarn add @komune-io/g2-themes
yarn add @komune-io/g2-providers
yarn add @komune-io/g2-s2
```

## 🧰 The contents

Almost every components are based on [Material-ui](https://material-ui.com/).

- @komune-io/g2-components regroups basic components to build an application like button, card, panel etc...

- @komune-io/g2-documentation regroups the components to document code.

- @komune-io/g2-forms regroups the components to build a complete form like text-fields, select etc...

- @komune-io/g2-layout regroups complexe layouts to structure an application like nav-bar, steppers, tools-menu etc...

- @komune-io/g2-notifications regroups the components to notify the user of an application.

- @komune-io/g2-providers regroups provider to make a standard modern react app like i18n, redux etc...

- @komune-io/g2-themes regroups providers and hooks to use our theme and the material-ui theme in the application.

- @komune-io/g2-s2 regroups components to work with Smartb's tools.

## 🌈 Override styles

There is a `theme provider` component in @komune-io/g2-components that has to include the app.

You have to give it a theme ~~that you can get and customise [here](/?path=/story/overview-cheatsheet-theme--page)~~ (not yet available). And you can also give it a [material-ui theme](https://material-ui.com/customization/default-theme/) to override the material-ui default properties.

Every components and layouts will have the following props to easily override their default styles:

- `className` to give a class to the root of the component.
- `style` to give custom styles to the root of the component.
- `classes` An object regrouping all the classes you can give to the different parts of a component.
- `styles` An object regrouping all the custom styles you can give to the different parts of a component.

Each part of a component also has a unique class construct like that: `"Arui" + /*the name of the component*/ + "-" + /*the name of the part of the component*/`.

For Example: `AruiCard-root`.

These classes allows you to override the default css properties from a static css file.

## ⛏ Source

- Build

```
make package-libs
```

- Run Storybook

```
yarn storybook
```

- Release Version on npm from master

```
lerna version 0.0.1 --no-git-tag-version --exact

lerna publish from-package --no-git-reset
```

- Release experimental Version on gitlab from develop

```
lerna version 1.0.0-alpha.1 --no-git-tag-version --exact

yarn publishWorkspaces:gitlab
```

- Create new package

```
cd packages
create-react-library COMPONENT_NAME
```
