# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-alpha.4](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2022-01-14)


### Bug Fixes

* **comp:image:** fix image test error ([#723](https://github.com/IDuxFE/idux/issues/723)) ([329fc2c](https://github.com/IDuxFE/idux/commit/329fc2c3bc3b15f85f4994f51c4da0343df5d8d0))
* **comp:select:** fix option style ([#704](https://github.com/IDuxFE/idux/issues/704)) ([45a9763](https://github.com/IDuxFE/idux/commit/45a9763101d1ccaebb6158ed534442000e4030dc))
* **radio,checkbox:** fix checkbox and radio aligin ([#692](https://github.com/IDuxFE/idux/issues/692)) ([cafa7ba](https://github.com/IDuxFE/idux/commit/cafa7ba78fb094c705e73d72f5f618720f644b1c))


### Code Refactoring

* **comp:menu:** use customXxx instead of slots ([#725](https://github.com/IDuxFE/idux/issues/725)) ([f88ca6d](https://github.com/IDuxFE/idux/commit/f88ca6db43b1eba493cda16b91a16062a654ce0a))
* **comp:select:** use customLabel instead of slots ([#726](https://github.com/IDuxFE/idux/issues/726)) ([3a34fc4](https://github.com/IDuxFE/idux/commit/3a34fc44d759f4f0c835efe51b406c3e2fd1efa4))


### Features

* **comp:dropdown:** support hideOnClick ([#715](https://github.com/IDuxFE/idux/issues/715)) ([fbbe478](https://github.com/IDuxFE/idux/commit/fbbe4786b3f47b1924c9d7b404306f424111fbd4))
* **comp:footer:** swap confirm and cancel btn ([#714](https://github.com/IDuxFE/idux/issues/714)) ([78f3e06](https://github.com/IDuxFE/idux/commit/78f3e064faca07b025ea327a6ca5bb65c8809fec))
* **comp:image:** add image and imageViewer components ([#706](https://github.com/IDuxFE/idux/issues/706)) ([8b5212b](https://github.com/IDuxFE/idux/commit/8b5212bc1287e5c2b3cedd4e1fe556cb707eba0c)), closes [#698](https://github.com/IDuxFE/idux/issues/698)
* **comp:menu:** type of MenuItem is optional ([#712](https://github.com/IDuxFE/idux/issues/712)) ([5d1490a](https://github.com/IDuxFE/idux/commit/5d1490ae407ac59a7e1f863ad8a3db256f8c3b91))
* **comp:modal:** add padding to padding next icon ([#701](https://github.com/IDuxFE/idux/issues/701)) ([e663401](https://github.com/IDuxFE/idux/commit/e66340144ced3a04c60e93aaaf5cd7aa1585930d))
* **comp:slider:** unify trigger conditions for change events ([#721](https://github.com/IDuxFE/idux/issues/721)) ([a3209fa](https://github.com/IDuxFE/idux/commit/a3209fa8e1194869b9df0aec3324e135c332f15c)), closes [#696](https://github.com/IDuxFE/idux/issues/696)
* **comp:table:** add TableColumn component ([#702](https://github.com/IDuxFE/idux/issues/702)) ([eb979a6](https://github.com/IDuxFE/idux/commit/eb979a688f157eec0cd10d96df20a60980065717)), closes [#650](https://github.com/IDuxFE/idux/issues/650)
* **comp:table:** redesign api of filter ([#720](https://github.com/IDuxFE/idux/issues/720)) ([c8078ea](https://github.com/IDuxFE/idux/commit/c8078ea5915be0326463b6beabf766e49d43c413))
* **comp:table:** redesign TableColumn and support children in template ([#708](https://github.com/IDuxFE/idux/issues/708)) ([356faaf](https://github.com/IDuxFE/idux/commit/356faaf708624e1e0a918b08cba634a42ad1c2fe))
* **comp:table:** use `menus` instead of `options` ([#709](https://github.com/IDuxFE/idux/issues/709)) ([71185fc](https://github.com/IDuxFE/idux/commit/71185fcdd8e5023c3629dc4ffb5771f891e92eb2))
* **table:** modify table functions and style ([#672](https://github.com/IDuxFE/idux/issues/672)) ([05e6399](https://github.com/IDuxFE/idux/commit/05e639922eae342e557a6c142c7aa296d81c7f72))


### BREAKING CHANGES

* **comp:select:** `slots` of `SelectOption` is deprecated, please use customLabel instead
* **comp:menu:** `slots` of `MenuData` is deprecated,  please use `customIcon`, `customLabel` and
`customSuffix` instead
* **comp:table:** `options` in `TableColumnSelectable` was deprecated, please use `menus` instead
* **comp:table:** `customRender`, `customTtile`, `customIcon` and `customExpand` have been
deprecated, please use `slots` instead





# [1.0.0-alpha.3](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2021-12-30)


### Bug Fixes

* **comp:input-number:** decimal precision calculation error ([#688](https://github.com/IDuxFE/idux/issues/688)) ([d863ad0](https://github.com/IDuxFE/idux/commit/d863ad08f2f64bdcb1652b9814051521754c3314))
* **comp:menu:** remove border-bototm on horizontal mode ([#690](https://github.com/IDuxFE/idux/issues/690)) ([be02417](https://github.com/IDuxFE/idux/commit/be02417d298d7b645cb87e94e1e9b09e22a101b2))
* **comp:typography:** fix typography disabled style ([#687](https://github.com/IDuxFE/idux/issues/687)) ([41d5225](https://github.com/IDuxFE/idux/commit/41d522584844ea0ffe19c61a3ae330a53eb374fa)), closes [#567](https://github.com/IDuxFE/idux/issues/567)


### Features

* **cdk:forms:** add default messages ([#689](https://github.com/IDuxFE/idux/issues/689)) ([22d45d6](https://github.com/IDuxFE/idux/commit/22d45d64b009617abff1456cec38397348287a6f)), closes [#684](https://github.com/IDuxFE/idux/issues/684)
* **comp: space:** add size and block props ([#670](https://github.com/IDuxFE/idux/issues/670)) ([a1f895b](https://github.com/IDuxFE/idux/commit/a1f895b67e65efb800dcd5c5e9f54330bca06bd0))
* **comp:modal:** add prop to control transition ([#674](https://github.com/IDuxFE/idux/issues/674)) ([4b4d786](https://github.com/IDuxFE/idux/commit/4b4d7866debe9950e8d640885baad5750728404d)), closes [#623](https://github.com/IDuxFE/idux/issues/623)
* **comp:pagination:** remove itemRender and totalRender ([#695](https://github.com/IDuxFE/idux/issues/695)) ([e2dccc6](https://github.com/IDuxFE/idux/commit/e2dccc6f35a8be626199a2cf75a0819bb42d291b)), closes [#658](https://github.com/IDuxFE/idux/issues/658)


### BREAKING CHANGES

* **comp:pagination:** itemRender and totalRender have been removed
* **comp: space:** size is used instead of gap





# [1.0.0-alpha.2](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2021-12-27)


### Bug Fixes

* **comp:form:** invalid style of input ([#668](https://github.com/IDuxFE/idux/issues/668)) ([7558b18](https://github.com/IDuxFE/idux/commit/7558b1896e3407d206c10ef985bbad84440588df))





# [1.0.0-alpha.1](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2021-12-25)


### Bug Fixes

* **cdk:scroll:** update scroll blocked style ([#660](https://github.com/IDuxFE/idux/issues/660)) ([4d7bbff](https://github.com/IDuxFE/idux/commit/4d7bbffb86c5409040fa82a0cbdf7b3ba875edc1)), closes [#586](https://github.com/IDuxFE/idux/issues/586)
* **comp: select:** incomplete readonly scenario ([#649](https://github.com/IDuxFE/idux/issues/649)) ([24da0a0](https://github.com/IDuxFE/idux/commit/24da0a06b5f35d144115222252171ece144f8d17))
* **comp:all:** add default.variable.less ([#646](https://github.com/IDuxFE/idux/issues/646)) ([9eced60](https://github.com/IDuxFE/idux/commit/9eced60b9ff9ba27540dc165418d1110b023e264))
* **comp:button:** button-group display: inline-flex ([#661](https://github.com/IDuxFE/idux/issues/661)) ([60dc8c3](https://github.com/IDuxFE/idux/commit/60dc8c30b9ca0da0f4446e5be24b439f5ecbdf79))
* **comp:ixmenu:** fix error when initialize settings expandKeys ([#637](https://github.com/IDuxFE/idux/issues/637)) ([131d95b](https://github.com/IDuxFE/idux/commit/131d95b3e89576146d21f68191f50d958bc4a086)), closes [#636](https://github.com/IDuxFE/idux/issues/636)
* **comp:message/notification:** fix first animation ([#639](https://github.com/IDuxFE/idux/issues/639)) ([b9d1d19](https://github.com/IDuxFE/idux/commit/b9d1d19a36c9e91353317e722f832493e289aa12)), closes [#576](https://github.com/IDuxFE/idux/issues/576)
* **comp:table:** selectable header vertical alignment issue ([#652](https://github.com/IDuxFE/idux/issues/652)) ([e9f85e4](https://github.com/IDuxFE/idux/commit/e9f85e4a31216fbb1302054cde4ab5c51737cf8a))


### Features

* **cdk: portal:**  support html selectors ([#656](https://github.com/IDuxFE/idux/issues/656)) ([1eafdf6](https://github.com/IDuxFE/idux/commit/1eafdf684bf55ee5d00d06a4184dad822869976a))
* **comp: tree-select:** add tree-select comp ([#606](https://github.com/IDuxFE/idux/issues/606)) ([a8cc003](https://github.com/IDuxFE/idux/commit/a8cc003443b32a083038b5298de8cedef414d440)), closes [#557](https://github.com/IDuxFE/idux/issues/557)
* **comp:breadcrumb:** add breadcrumb component ([#71](https://github.com/IDuxFE/idux/issues/71)) ([#633](https://github.com/IDuxFE/idux/issues/633)) ([18ef292](https://github.com/IDuxFE/idux/commit/18ef292e3b77d1f84a571c837a0816b0cabc570f))
* **comp:carousel:** add carousel component ([#634](https://github.com/IDuxFE/idux/issues/634)) ([4737191](https://github.com/IDuxFE/idux/commit/473719140e926c3ec4b751c04c838347711c2d4c)), closes [#230](https://github.com/IDuxFE/idux/issues/230)
* **comp:drawer,modal:** add onBeforeClose event ([#647](https://github.com/IDuxFE/idux/issues/647)) ([a45e450](https://github.com/IDuxFE/idux/commit/a45e4501b314e6cef8896c93c9bdfc929bff52a7)), closes [#645](https://github.com/IDuxFE/idux/issues/645)
* **comp:private/input:** add input component ([#657](https://github.com/IDuxFE/idux/issues/657)) ([efbfda1](https://github.com/IDuxFE/idux/commit/efbfda1edd5f44b8b193ca0f36a7c65f200f8196)), closes [#582](https://github.com/IDuxFE/idux/issues/582)


### BREAKING CHANGES

* **comp:private/input:** IxInput and IxInputNumber rebuild with _private/input
* **comp:drawer,modal:** onBeforeClose is used instead of onClose





# 1.0.0-alpha.0 (2021-12-17)


### Features

* Hello @idux.
