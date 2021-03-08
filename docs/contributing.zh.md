---
category: docs
title: 贡献指南
order: 11
---

这篇指南会指导你如何为 `@idux` 贡献一份自己的力量，请在你要提 issue 或者 pull request 之前花几分钟来阅读一遍这篇指南。

## 行为准则

我们有一份 [行为准则](https://github.com/IduxFE/idux/blob/main/CODE_OF_CONDUCT.md) ，希望所有的贡献者都能遵守，请花时间阅读一遍全文以确保你能明白哪些是可以做的，哪些是不可以做的。

## 透明的开发

我们所有的工作都会放在 [GitHub](https://github.com/IduxFE/idux) 上。不管是核心团队的成员还是外部贡献者的 pull request 都需要进过同样流程的 review。

## Bugs

我们使用 [Issues](https://github.com/IduxFE/idux/issues) 来做 bug 追踪。 如果你想要你发现的 bug 被快速解决，最好的办法就是通过我们提供的 [issue 助手(TODO)](./) 来提 issue。 并且能使用这个 [模板(TODO)](./) 来提供重现。

在你报告一个 bug 之前，请先确保已经搜索过已有的 issue 和阅读了我们的 [常见问题(TODO)](./)。

## Features

如果你有改进我们的 API 或者新增功能的想法，我们同样推荐你使用我们提供的 [issue 助手(TODO)](./) 来新建一个添加新功能的 issue。

## 第一次贡献

如果你还不清楚怎么在 GitHub 上提 Pull Request ，可以阅读下面这些文章来学习：

- [如何为开源做贡献](https://opensource.guide/zh-cn/how-to-contribute/)
- [第一次参与开源](https://github.com/firstcontributions/first-contributions/blob/master/translations/README.chs.md)

为了能帮助你开始你的第一次尝试，我们用 [Good First Issue](https://github.com/IduxFE/idux/labels/good%20first%20issue) 标记了一些比较容易修复的 bug 和小功能。这些 issue 可以很好地做为你的首次尝试。

如果你打算开始处理一个 issue，请先检查一下 issue 下面的留言以确保没有别人正在处理这个 issue。如果当前没有人在处理的话你可以留言告知其他人你将会处理这个 issue，以免别人重复劳动。

如果之前有人留言说会处理这个 issue 但是一两个星期都没有动静，那么你也可以接手处理这个 issue，当然还是需要留言告知其他人。

## 贡献代码

`IduxFE` 团队会关注所有的 Pull Request，我们会 review 以及合并你的代码，也有可能要求你做一些修改或者告诉你我们为什么不能接受这样的修改。

**在你发送 Pull Request 之前**，请确认你是按照下面的步骤来做的：

- 在项目根目录下运行了 `npm install` ；
- 如果你修复了一个 bug 或者新增了一个功能，请确保写了相应的测试，这很重要；
- 确认所有的测试都是通过的 `npm run test` ；
- 确保你的代码通过了 lint 检查 `npm run lint` ；
- 确保你的代码在提交之前经过了正确的 [Rebase](https://www.digitalocean.com/community/tutorials/how-to-rebase-and-update-a-pull-request) ；
- 确保你的提交信息符合[我们的 commit 规范](#commit) 。

## 如何提出 Pull Request

- fork 此仓库，以下所有操作均在 fork 之后的仓库上执行；
- 在 `main` 分支运行：`git remote add upstream https://github.com/IduxFE/idux.git` ；
- 在 `main` 分支运行: `git pull upstream main` ；
- 在 `main` 分支运行: `git push origin main` ；
- 切换到你要工作的 feature 分支 (例如有一个分支叫 `docs-fix`): `git checkout docs-fix` ；
- 在 `docs-fix` 分支运行: `git rebase main` 或 `git rebase main -i` ；
- 在 `docs-fix` 分支修改代码，使用 `git add` 添加要提交的文件后，然后 commit: 请按照 [我们的 commit 规范](#commit) 进行填写；
- 推送代码 `git push` (如果进行了 Rebase 操作，可能需要 `-f`)；
- 在 GitHub 上发起 Pull Request 请求。

## 开发流程

- clone fork 后的仓库
- 安装依赖：`npm install` 或 `yarn`
- 常用的命令：
  - `npm start` 在本地运行文档网站。
  - `npm run lint` 检查代码风格(tips: 使用 `npm run lint-fix` 可以修复简单格式错误)。
  - `npm run test` 运行单元测试(tips: 修改 `jest.config.js` 的 `root` 配置可以调整单元测试范围)。
  - `npm run gen` 通过图形化界面快速创建模板。

## 代码风格

我们使用了 `eslint`, `stylelint`, `markdownlint` 以及 `ls-lint` 来保证整体的代码风格一致。并且在 commit hooks 中配置了自动格式化和 lint, 只要提交通过即可。

### vue

- 文件命名：`PascalCase`
- props
  - 命名：`camelCase`
  - 默认值：请使用 `@idux/cdk/utils` 中的 `PropTypes`, 请注意：在没有显示的指定默认值的情况下，所有类型的默认值都为 `undefined`, 这与 vue compiler 默认的行为有所区别。
- slots
  - 命名：`camelCase`
  - 如果与某个 props 的功能一致时，需要跟该 props 同名
- emits
  - 命名：`camelCase`
- 优先使用 `template`, 只有在 `template` 不便实现的功能时，才可以使用 `tsx`, 例如：需要递归渲染的场景
- 尽可能的使用 Composition API 去完成我们的功能，包括 Demo

### typescript

- 文件命名：`camelCase`
- 变量命名: 通常情况下使用 `camelCase`, 对于需要全局共享或者给用户使用的静态常量，使用全大写的 `snake_case`
- 尽可能的给出最准确的类型定义
- 需要 `export` 的函数，必须指定返回值类型

### less

- 文件命名：`camelCase`
- class 命名不需要使用 `BEM`, 可以参考 antd 的命名
- 尽可能的定义变量，方便用户进行自定义
- 变量名必须以组件名为前缀

### test

- 文件命名：与被测试的文件同名，同时添加 `.spec` 后缀
- test 命名：应该是被测试的 API 或者功能的名字，简单明了即可
- 所有 Public API 都需要有对应的测试用例
- 尽可能的一个测试用例只用于一个 API 或功能的测试

### docs & demo

- 文件命名：`kebab-case`
- 除非多个 API 的关联性很强，否则应该一个 demo 只用于展示一个 API 的用法
- 当 demo 的示例代码比较复杂时，可以单独建立一个同名（首字母大写）的 vue 文件

## Commit

对于如何提交 git commit message，我们有非常精确的规则。我们希望所有的 commit message 更具可读性，这样在查看项目历史记录会变得容易，同时我们使用 commit message 生成 Changelog.

本项目使用了 `@commitlint` 作为 commit lint 工具，并使用 [`@commitlint/config-angular`](https://www.npmjs.com/package/@commitlint/config-angular)作为基础规则，请使用下面任意一种方式提交你的 commit.

- 全局安装 `npm install -g commitizen`，然后使用 `cz` 提交
- 使用 `git commit -a` 提交，请注意 message 符合我们的要求

### 提交格式

每个 commit message 包括 **header**, **body** 和 **footer**.

header 具有特殊的格式，包括 **type**, **scope** 和 **subject**, type 和 subject 是必须的，scope 是可选的。

```vim
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

提交 message 的任何行不能超过 100 个字符！确保 message 在 GitHub 以及各种 git 工具中更易于阅读。

注脚应该包含 [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) 如果有的话.

示例: ([更多示例](https://github.com/IduxFE/idux/commits/main))

```vim
docs(changelog): update change log to beta.5
```

```vim
fix(component:button): change type not work

Button doesn't work when setting its type dynamically.

fix #123
```

### Type

必须是以下选项之一:

- **feat**: 一个新特性
- **fix**: 一次 bug 修复
- **docs**: 只是对文档进行修改
- **style**: 不影响代码本身含义的代码风格修改 (white-space, formatting, missing semi-colons, etc)
- **refactor**: 既不属于新特性又不是 bug 修改的代码修改
- **perf**: 性能优化
- **test**: 添加或修改测试用例
- **build**: 修改构建工具 (example scopes: gulp, broccoli, npm)
- **ci**: 修改自动化脚本 (example scopes: Circle, BrowserStack, SauceLabs)
- **revert**: 回滚提交

### Scope

Scope 应该是本次修改所影响模块的名称（文件夹名称或其他有意义的单词），必要时还应该使用模块前缀（例如：cdk, comp, pro）。

```vim
<prefix:name>
<prefix:name1,name2>
```

以下是一些示例:

- **cdk:clickOutside**
- **cdk:clipboard**
- **comp:alert**
- **comp:badge,button**
- **comp:OTHER_COMPONENT_NAME**

以下模块不需要使用前缀：

- **release**: 用于版本发布
- **packaging**: 用于改变 npm 包的结构、路径等
- **changelog**: 用于修改 CHANGELOG.md

其他情况可以忽略 scope:

- 使用 `docs`, `build` 或 `ci` 等全局修改(例如:`docs: add missing type`).

### Subject

Subject 是本次修改的简洁描述:

- 使用祈使句、现在时，例如：使用 "change" 而不是 "changed"、"changes"
- 不大写第一个字母
- 不以小数点(.)结尾

### Body

Body 应包含修改的动机，并对比这与以前的行为，是本次修改的详细描述：

- 使用祈使句、现在时，例如：使用 "change" 而不是 "changed"、"changes"

### Footer

Footer 应包含 **Breaking Changes** 和关闭或关联的 **Issues**

- **Breaking Changes** 应该以 `BREAKING CHANGE:` 开头
- 关闭或关联的 **Issues** 使用 `fix #123` 或者 `re #123`

详细的解释可以在[document commit-message-format](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)中找到。
