# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-beta.13](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2022-05-30)


### Features

* **pro: table:** add IxProTable and IxProTableLayoutTool ([#936](https://github.com/IDuxFE/idux/issues/936)) ([688627f](https://github.com/IDuxFE/idux/commit/688627f256ef124be37a9cedf63ce21f288a3747))





# [1.0.0-beta.12](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2022-05-24)


### Bug Fixes

* **comp:all,pro:all,cdk:all:** add eslint import check ([#922](https://github.com/IDuxFE/idux/issues/922)) ([8bbbec1](https://github.com/IDuxFE/idux/commit/8bbbec178a51ad5707791db5ceb49f0547c84f95))





# [1.0.0-beta.11](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2022-05-23)


### Features

* **comp: tree,tree-select,pro-tree:** add getNode method ([#910](https://github.com/IDuxFE/idux/issues/910)) ([#916](https://github.com/IDuxFE/idux/issues/916)) ([82c929d](https://github.com/IDuxFE/idux/commit/82c929d46b63af31e4cab25deab485c11b630fc9))





# [1.0.0-beta.10](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2022-05-16)


### Bug Fixes

* **comp: select:** Add number to the type of label ([#901](https://github.com/IDuxFE/idux/issues/901)) ([5875e2d](https://github.com/IDuxFE/idux/commit/5875e2d9b64047c4375d7169e7d2f1d61c9a7bb2))


### Features

* **pro: tree:** add collapseIcon prop ([#900](https://github.com/IDuxFE/idux/issues/900)) ([e9bb42b](https://github.com/IDuxFE/idux/commit/e9bb42b18fc7c6fdd51b921387a1cd33a32557cf))





# [1.0.0-beta.9](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2022-05-09)


### Bug Fixes

* **comp: table:** update style with empty data ([#888](https://github.com/IDuxFE/idux/issues/888)) ([44c67aa](https://github.com/IDuxFE/idux/commit/44c67aae3858157b32d918a5102e183b8eaac97d))


### Features

* **comp: tree-select:** add expandAll and collapseAll methods ([#895](https://github.com/IDuxFE/idux/issues/895)) ([772e039](https://github.com/IDuxFE/idux/commit/772e03937069a076b5861235859497a7ffd0318b))
* **pro: tree:** add pro tree component ([#891](https://github.com/IDuxFE/idux/issues/891)) ([ffd80de](https://github.com/IDuxFE/idux/commit/ffd80de694377309b65fb569bb91f24d6ba8d514))


### BREAKING CHANGES

* **comp: tree-select:** setExpandAll was deprecated, please use collapseAll and
expandAll instead.





# [1.0.0-beta.8](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2022-05-05)


### Features

* **comp: menu:** add customAdditional, getKey and overlayContainer ([#871](https://github.com/IDuxFE/idux/issues/871)) ([5064add](https://github.com/IDuxFE/idux/commit/5064addd4e359993a8a16943eb3cf1a9dbce340b))
* **comp: select:** add customAdditional, getKey and overlayContainer ([#868](https://github.com/IDuxFE/idux/issues/868)) ([d10f5e0](https://github.com/IDuxFE/idux/commit/d10f5e069cd48c8b8cabec829566c8425b32fc08))
* **comp: table:** add customAdditional to support cosutom row and cell ([#866](https://github.com/IDuxFE/idux/issues/866)) ([e79b55b](https://github.com/IDuxFE/idux/commit/e79b55bf7896534e98597e5b7e4bfaf2fc139a33))
* **comp: transfer:** add customAdditional ([#872](https://github.com/IDuxFE/idux/issues/872)) ([84c4e61](https://github.com/IDuxFE/idux/commit/84c4e615c6df7e5239248d94bd4c237a65da680b))
* **comp: tree-selct:** add customAdditional,getKey and overlayContainer ([#869](https://github.com/IDuxFE/idux/issues/869)) ([593f86f](https://github.com/IDuxFE/idux/commit/593f86fe3c49526e8fcc4352db0afdb986d9fd57))


### BREAKING CHANGES

* **comp: menu:** `dataSource.additional` was deprecated, please use `customAdditional` instead. `target` was deprecated, please use `overlayContainer` instead.
* **comp: tree-selct:** `nodeKey` was deprecated, please use `getKey`
instead. `target` was deprecated, please use `overlayContainer` instead. `dataSource.additional` was
deprecated, please use `customAdditional` instead.
* **comp: select:** `compareFn` was removed. `target` was deprecated, please use `overlayContainer`
instead. `valueKey` was deprecated, please use `getKey` instead. `dataSource.additional` was
deprecated, please use `customAdditional` instead.
* **comp: table:** `tags`, `rowClassName` and `column.additional` are deprecated, please use `customAdditional` instead





# [1.0.0-beta.7](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.5...v1.0.0-beta.7) (2022-04-24)


### Features

* **comp: all:** add seer themes ([#850](https://github.com/IDuxFE/idux/issues/850)) ([789a266](https://github.com/IDuxFE/idux/commit/789a266f117b34c61efd8d52f4c325e5f49c8622))





# [1.0.0-beta.6](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2022-04-21)

**Note:** Version bump only for package @idux/pro





# [1.0.0-beta.5](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2022-04-18)


### Bug Fixes

* **cdk:scroll:** turn to native scrollbar ([#847](https://github.com/IDuxFE/idux/issues/847)) ([95df1b9](https://github.com/IDuxFE/idux/commit/95df1b9e3b0d44b924fff8f81ebe7eef1a41b352))


### Features

* **comp:date-picker:** add datetime type ([#837](https://github.com/IDuxFE/idux/issues/837)) ([6200d5a](https://github.com/IDuxFE/idux/commit/6200d5a1dfbb74005f9edbd0dd0d2f15ce296660))





# [1.0.0-beta.4](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2022-04-11)

**Note:** Version bump only for package @idux/pro





# [1.0.0-beta.3](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2022-03-27)


### Features

* **pro:transfer:** add pro transfer compoennt ([#815](https://github.com/IDuxFE/idux/issues/815)) ([e367009](https://github.com/IDuxFE/idux/commit/e367009c0b7cec277606574c1f485b43f094145b))





# [1.0.0-beta.2](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2022-03-20)


### Bug Fixes

* **comp:menu:** cache expandedKeys when collapse changed ([#805](https://github.com/IDuxFE/idux/issues/805)) ([48bacb2](https://github.com/IDuxFE/idux/commit/48bacb2140140c2a984ead14328dcb28d7494b99))





# [1.0.0-beta.1](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.6...v1.0.0-beta.1) (2022-03-14)


### Features

* **pro:layout:** add siderHover and compress props ([#759](https://github.com/IDuxFE/idux/issues/759)) ([faf0913](https://github.com/IDuxFE/idux/commit/faf09130c895a82ca65eee8a82dc082e36cc9247))





# [1.0.0-beta.0](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.6...v1.0.0-beta.0) (2022-03-01)


### Features

* **pro:layout:** add siderHover and compress props ([#759](https://github.com/IDuxFE/idux/issues/759)) ([faf0913](https://github.com/IDuxFE/idux/commit/faf09130c895a82ca65eee8a82dc082e36cc9247))





# [1.0.0-alpha.6](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2022-02-18)

**Note:** Version bump only for package @idux/pro





# [1.0.0-alpha.5](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2022-01-24)


### Features

* **pro:layout:** suppor all slots of IxMenu ([#738](https://github.com/IDuxFE/idux/issues/738)) ([9745c32](https://github.com/IDuxFE/idux/commit/9745c329a962faa2499f0003c8badab33b9dcabc))





# [1.0.0-alpha.4](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2022-01-14)


### Features

* **comp:dropdown:** support hideOnClick ([#715](https://github.com/IDuxFE/idux/issues/715)) ([fbbe478](https://github.com/IDuxFE/idux/commit/fbbe4786b3f47b1924c9d7b404306f424111fbd4))





# [1.0.0-alpha.3](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2021-12-30)

**Note:** Version bump only for package @idux/pro





# [1.0.0-alpha.2](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2021-12-27)

**Note:** Version bump only for package @idux/pro





# [1.0.0-alpha.1](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2021-12-25)


### Bug Fixes

* **comp:all:** add default.variable.less ([#646](https://github.com/IDuxFE/idux/issues/646)) ([9eced60](https://github.com/IDuxFE/idux/commit/9eced60b9ff9ba27540dc165418d1110b023e264))
* **pro:layout:** fix sider border-right style ([#659](https://github.com/IDuxFE/idux/issues/659)) ([bcdffdb](https://github.com/IDuxFE/idux/commit/bcdffdba5a52f0b14e62261b8f26d5115945a4bb))





# 1.0.0-alpha.0 (2021-12-17)


### Features

* Hello @idux.
