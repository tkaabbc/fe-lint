# fe-lint

`ESlint`和`prettier`配置, 方便在项目中引入.
基于 Airbnb StyleGuide, 并根据自己的风格偏好和经验做相应的调整.

## 功能介绍

eslint 部分内置了语言与框架的所有组合, 有如下选择：

- `js.js`：基础的 js 规则
- `ts.js`：基础的 ts 规则
- `react-js.js`：针对使用 js 的 react 项目
- `react-ts.js`：针对使用 ts 的 react 项目

prettier 为一份通用的配置：

- `prettier.js`：通用 prettier 配置

## 使用

### 安装

安装 fe-lint 本身

```bash
yarn add @tkwang/fe-lint -D
```

安装 eslint、prettier

```bash
yarn add eslint@^8.2.0 prettier@^2.6.2 -D
```

### 在项目中引入配置文件

#### 引入 ESlint 配置

根据项目类型引入对应配置文件即可

如，对于使用 ts 的 react 项目，在`.eslintrc.js`中引入`react-ts`：

```js
module.exports = {
  extends: [require.resolve("@tkwang/fe-lint/react-ts")],
};
```

> 注意：`package.json`中如果指明了`type: "module"`，`.eslintrc.js`文件名需改为`.eslintrc.cjs`

##### 识别 alias

项目中常常会用到 alias，比如用`@/`表示`<project-root>/src/`。如果需要 alias 可以被 ESlint 顺利识别，需要做一些配置。

比如对于 ts 项目，`.eslintrc.js`中添加如下配置即可。

```js
settings: {
  'import/resolver': {
    typescript: {
      project: './tsconfig.json',
    },
  },
},
```

> 其中`eslint-plugin-import`可以识别其他文件中的 alias 配置，详见[Resolvers](https://github.com/benmosher/eslint-plugin-import/wiki/Resolvers)。

#### 引入 Prettier 配置

在`.prettierrc.js`文件中写入如下配置即可

```js
module.exports = require("@tkwang/fe-lint/prettier");
```

### 自动修复

#### 通过 VSCode 插件自动修复

针对 VSCode，推荐安装下列插件，可以提供编辑器层的代码提示与自动修复。

- dbaeumer.vscode-eslint
- esbenp.prettier-vscode

安装好插件后，如果需要开启自动修复，需要在 VSCode 的配置文件`settings.json`中开启如下配置。

> `settings.json`这里要注意一点：
>
> - VSCode 编辑器菜单栏中的`设置`针对的是全局的设置，也就是打开其它项目时也会应用该配置
> - VSCode 也会识别项目目录下的`.vscode/settings.json`文件，作为当前项目的配置，优先级更高。如果只希望在当前项目中开启自动修复代码的功能，则需要在项目目录下创建`.vscode/settings.json`并写入配置

##### Prettier 自动修复配置

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode", //  默认使用 prettier 作为格式化工具
  "editor.formatOnSave": true // 保存代码时格式化
}
```

> 对于未指明 Prettier 配置的项目，VSCode 的 Prettier 插件会使用默认的配置格式化代码，会导致代码被修改为非预期的格式。如果希望避免这一行为，可以修改 VSCode 全局的`settings.json`为`"editor.formatOnSave": false`，而后在希望启用 Prettier 的项目下创建`.vscode/settings.json`，并写入需要的配置。

##### ESlint 自动修复配置

```json
{
  // ESLint will not lint .vue, .ts or .tsx files in VSCode by default
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

#### 通过命令自动修复

针对非 VSCode 编辑器，或者不习惯使用插件修复功能的情况，可以通过下面命令来实现代码检查与自动修复。

可根据项目实际情况做对应调整。

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

平常开发中，完整检测一遍整个项目的代码有时是比较耗时的，如果**只希望检测这次改动的代码**，可以使用如下命令，下列命令只会对**`git`暂存区**的代码进行检测：

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

其中`git diff --name-only --staged --diff-filter=AM`用于获取 _`git` 暂存区(staged)的文件路径_，详细可参考[Git list of staged files](https://stackoverflow.com/a/33610683/19547174)

## 本地调试 npm 包

使用 yarn link 调试

到 fe-lint 目录下执行

```bash
yarn & yarn link
```

之后到你的项目目录下执行

```bash
yarn link "@tkwang/fe-lint"
```

到这一步之后，本地 fe-lint 项目中的所有改动就都会反应到你的项目中，就可以在本地进行调试啦

## 常见问题及解决方法

### 按照上面配置了，也安装了 VSCode 插件，但是没有看见错误提示

一般退出 vscode 重新打开就可以了
