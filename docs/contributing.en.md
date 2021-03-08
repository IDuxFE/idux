---
category: docs
title: Contribution
order: 11
---

This guide will guild you how to contribute to `@idux`. Please take a fill minutes to read this guide before you open an issue or pull request.

## Code of conduct

We have a [code of conduct](https://github.com/IduxFE/idux/blob/main/CODE_OF_CONDUCT.md). I hope that all contributors can comply. Please take the time to read the full text to make sure you understand what can and cannot be done.

## Fair development

All our work will be on [GitHub](https://github.com/IduxFE/idux). Pull requests from the core team members and external contributors need to go through the same review process.

## Bugs

We use [Issues](https://github.com/IduxFE/idux/issues) to track bugs. If you want the bug you find to be resolved quickly, the best way is to raise an issue through the [issue assistant(TODO)](./) we provide, and use the [template(TODO)](./) to provide reproduction.

Before you report a bug, please make sure you have searched the existing issue and read our [question(TODO)](./).

## Features

If you have ideas to improve our API or adding new features, we also recommended that you use the [issue assistant(TODO)](./) we provide to create an issue that adds new features.

## First contribution

If you are not sure how to submit a Pull Request on GitHub, you can read the following articles to learn:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [First Contributions](https://github.com/firstcontributions/first-contributions)

To help you start your first attempt, we use [Good First Issue](https://github.com/IduxFE/idux/labels/good%20first%20issue) to mark some bugs and small ones that are easier to fix. These issues can serve well as your first attempt.

If you plan to start working on an issue, please check the comments under issue first to make sure that no one else is working on the issue. If no one is currently working on it, you can leave a message to inform others that you will deal with this issue to avoid duplication of work by others.

If someone left a message saying that this issue will be dealt with but there is no movement for a week or two, then you can also take over this issue, of course, you still need to leave a message to inform others.

## Contribute code

The `IduxFE` team will pay attention to all Pull Requests. We will review and merge your code. We may also ask you to make some changes or tell you why we cannot accept such changes.

**Before you send the Pull Request** , please make sure you follow the steps below:

- Run `npm install` in the project root directory;
- If you fix a bug or add a new feature, please make sure to write the corresponding test, this is very important;
- Confirm that all tests are passed `npm run test`;
- Make sure your code passes the lint check `npm run lint`;
- Make sure your code goes through the correct [Rebase](https://www.digitalocean.com/community/tutorials/how-to-rebase-and-update-a-pull-request) before submitting
- Make sure your submission information conforms to [our commit specification](#commit).

## How to make a Pull Request

- Fork this repository, all the following operations are performed on the repository after fork;
- Run in the `main` branch: `git remote add upstream https://github.com/IduxFE/idux.git`;
- Run in the `main` branch: `git pull upstream main`;
- Run in the `main` branch: `git push origin main`;
- Switch to the feature branch you want to work on (for example, there is a branch called `docs-fix`): `git checkout docs-fix`;
- Run in the `docs-fix` branch: `git rebase main` or `git rebase main -i`;
- Modify the code in the `docs-fix` branch, use `git add` to add the files to be submitted, and then commit: Please fill in according to [our commit specification](#commit);
- Push code `git push` (if Rebase operation is performed, `-f` may be required);
- Initiate a Pull Request request on GitHub.

## Development Process

- clone the fork repository;
- install dependencies with `npm i` or `yarn`;
- commonly used commands:
  - `npm start` Run the documentation website locally;
  - `npm run lint` Check code style(tips: run `npm run lint-fix` Can fix simple format errors);
  - `npm run test` Run unit tests(tips: Modify the `root` configuration of `jest.config.js` to adjust the scope of unit testing);
  - `npm run gen` Quickly create templates through a graphical interface.

## Code format

We use `eslint`, `stylelint`, `markdownlint` and `ls-lint` to ensure the overall code style is consistent. And automatic formatting and lint are configured in commit hooks, as long as the submission is passed.

### vue

- filename: `PascalCase`
- props
  - name: `camelCase`
  - default: Please use the `PropTypes` in `@idux/cdk/utils`, please note: when there is no specified default value displayed, the default value of all types is `undefined`, which is different from the default behavior of vue compiler the difference.
- slots
  - name: `camcelCase`
  - If it is consistent with the function of a props, it needs to have the same name as the props.
- emits
  - name: `camelCase`
- Use `template` first, `tsx` can only be used when the function of `template` is inconvenient to implement, for example: scenes that require recursive rendering.
- Use Composition API as much as possible to complete our functions, including Demo.

### typescript

- filename: `camelCase`
- the variable name: Usually use `camelCase`, for static constants that need to be shared globally or used by users, use all uppercase `snake_case`.
- Give the most accurate type definition possible.
- Functions that require `export` must specify the return value type.

### less

- filename: `camelCase`
- Class naming does not need to use `BEM`, you can refer to antd naming.
- Define variables as much as possible to facilitate user customization.
- The variable name must be prefixed with the component name.

### test

- filename: The same name as the tested file, and the suffix `.spec`.
- the test name: It should be the name of the API or function being tested, simple and clear.
- All Public APIs need to have corresponding test cases.
- As far as possible, one test case is only used for testing one API or function.

### docs & demo

- filename: `kebab-case`
- Unless multiple APIs are closely related, a demo should only be used to show the usage of one API.
- When the demo code is more complicated, you can create a separate vue file with the same name (the first letter is capitalized).

## Commit

We have very precise rules for how to submit a git commit message. We hope that all commit messages are more readable, so that it is easier to view the project history, and we use commit messages to generate the Changelog.

This project uses `@commitlint` as the commit lint tool, and uses [`@commitlint/config-angular`](https://www.npmjs.com/package/@commitlint/config-angular) as the basic rule, please Use any of the following methods to submit your commit.

- Install `npm install -g commitizen` globally, then use `cz` to submit;
- Use `git commit -a` to submit, please note that the message meets our requirements.

### Commit message

Each commit message includes **header**, **body** and **footer**.

The header has a special format, including **type**, **scope** and **subject**, type and subject are required, scope is optional.

```vim
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Any line of the submitted message cannot exceed 100 characters! Make sure that the message is easier to read in GitHub and various git tools.

The footnote should include [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Example: ([More examples](https://github.com/IduxFE/idux/commits/main)).

```vim
docs(changelog): update change log to beta.5
```

```vim
fix(component:button): change type not work

Button doesn't work when setting its type dynamically.

fix #123
```

### Type

Must be one of the following options:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **revert**: Reverts a previous commit

### Scope

Scope should be the name of the module affected by this modification (folder name or other meaningful words), and the module prefix (for example: cdk, comp, pro) should be used when necessary.

```vim
<prefix:name>
<prefix:name1,name2>
```

Here are some examples:

- **cdk:clickOutside**
- **cdk:clipboard**
- **comp:alert**
- **comp:badge,button**
- **comp:OTHER_COMPONENT_NAME**

The following modules do not need to use prefixes:

- **release**: For version release
- **packaging**: Used to change the structure, path, etc. of the npm package
- **changelog**: Used to modify CHANGELOG.md

In other cases, the scope can be ignored:

- Use global changes such as `docs`, `build` or `ci` (e.g. `docs: add missing type`).

### Subject

Subject is a concise description of this modification:

- Use imperative sentences, present tense, for example: use "change" instead of "changed", "changes"
- Do not capitalize the first letter
- Does not end with a decimal point (.)

### Body

Body should contain the motivation for the modification, and compare this with the previous behavior, which is a detailed description of this modification:

- Use imperative sentences, present tense, for example: use "change" instead of "changed", "changes"

### Footer

Footer should contain **Breaking Changes** and closed or associated **Issues**

- **Breaking Changes** should start with `BREAKING CHANGE:`
- Close or related **Issues** use `fix #123` or `re #123`

The detailed explanation can be found in [document commit-message-format](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).
