# fe-lint

ESLint and Prettier configurations for easy integration into my project.
Based on the Airbnb Style Guide, with adjustments to match my own style preferences and experience.

## Introduction

The eslint section includes all combinations of language and framework as follows:

- `js.js`: Basic JavaScript rules.
- `ts.js`: Basic TypeScript rules.
- `react-js.js`: Rules for JavaScript in React projects.
- `react-ts.js`: Rules for TypeScript in React projects.

Prettier provides a generic configuration:

- `prettier.js`: Generic Prettier configuration.

## Usage

### Installation

Install `fe-lint` itself:

```bash
yarn add @tk/fe-lint -D
```

Install ESLint and Prettier:

```bash
yarn add eslint prettier -D
```

### Import Configuration Files into Your Project

#### Import ESLint Configuration

Based on your project type, import the corresponding configuration file into your `.eslintrc.js`:

For example, for a TypeScript React project, you can import the `react-ts` configuration:

```js
module.exports = {
  extends: [require.resolve("@tk/fe-lint/react-ts")],
};
```

> Note: If your `package.json` specifies `"type": "module"`, rename the `.eslintrc.js` file to `.eslintrc.cjs`.

##### Recognizing Aliases

In your project, you may often use aliases, such as using `@/` to represent `<project-root>/src/`. To ensure that ESLint recognizes these aliases, you need to make some configurations. For TypeScript projects, add the following settings to your `.eslintrc.js`:

```js
settings: {
  'import/resolver': {
    typescript: {
      project: './tsconfig.json',
    },
  },
},
```

> The `eslint-plugin-import` can recognize alias configurations in other files. See [Resolvers](https://github.com/benmosher/eslint-plugin-import/wiki/Resolvers) for more details.

#### Import Prettier Configuration

In your `.prettierrc.js` file, simply write the following line:

```js
module.exports = require("@tk/fe-lint/prettier");
```

### Auto Fixing

#### Auto Fixing with VSCode Extension

For VSCode users, it's recommended to install the following extensions to provide code suggestions and auto-fixing at the editor level:

- dbaeumer.vscode-eslint
- esbenp.prettier-vscode

Once you have installed these extensions, you can enable auto-fixing by adding the following configuration to your VSCode `settings.json`:

> Note: 
> - The `settings.json` in the VSCode editor menu applies to global settings, which means it will be applied to other projects as well when opened.
> - VSCode can also recognize `.vscode/settings.json` in the project directory as the configuration for the current project, with higher priority. If you only want to enable auto-fixing for the current project, create `.vscode/settings.json` in your project directory and include the desired configuration.

##### Prettier Auto Fix Configuration

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode", // Use Prettier as the default code formatter
  "editor.formatOnSave": true // Format code on save
}
```

> For projects that do not specify Prettier configurations, the VSCode Prettier plugin will use default configurations to format the code. This may lead to unexpected formatting changes. If you want to avoid this behavior, you can change the global `settings.json` in VSCode to `"editor.formatOnSave": false` and then create `.vscode/settings.json` in the project with the desired Prettier configurations.

##### ESLint Auto Fix Configuration

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

#### Auto Fixing via Commands

For users who do not use the auto-fixing features of VSCode or prefer command-line solutions, you can use the following commands for code checking and auto-fixing. You can adjust these scripts according to your project's specific needs.

```json
// package.json
{
  "scripts": {
    "lint:js": "eslint ./src --ext .js,.ts,.jsx,.tsx",
    "lint:js-fix": "eslint --fix ./src --ext .js,.ts,.jsx,.tsx",
    "prettier": "prettier --check .",
    "prettier:fix": "prettier --write ."
  }
}
```

During development, running a full code check on the entire project can be time-consuming. If you only want to check the code changes made in the current session, you can use the following commands. These commands will only check the code in the Git staged area:

```json
// package.json
{
  "scripts": {
    "lint-staged": "eslint `git diff --name-only --staged --diff-filter=AM`",
    "lint-staged:js-fix": "eslint --fix `git diff --name-only --staged --diff-filter=AM`",
    "prettier-staged": "prettier --check `git diff --name-only --staged --diff-filter=AM`",
    "prettier-staged:fix": "prettier --write `git diff --name-only --staged --diff-filter=AM`"
  }
}
```

The `git diff --name-only --staged --diff-filter=AM` command retrieves the file paths in the Git staged area. For more details, refer to [Git list of staged files](https://stackoverflow.com/a/33610683/19547174).

## Local Debugging for npm Package

Use `yarn link` for debugging. Here's how to do it:

1. Navigate to the `fe-lint` directory and run:

```bash
yarn && yarn link
```

2. Navigate to your project directory and run:

```bash
yarn link

 "@tk/fe-lint"
```

With these steps, any changes you make to the `fe-lint` project will be reflected in your project, allowing you to debug locally.

## Common Issues and Solutions

### I've followed the above configurations and installed the VSCode extension, but I don't see any error prompts.

Usually, simply restarting VSCode should resolve the issue.

Translate the provided content into English.