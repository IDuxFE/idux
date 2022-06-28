# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-beta.18](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.17...v1.0.0-beta.18) (2022-06-28)


### Bug Fixes

* **cdk:portal:** remove targetHashMap ([#980](https://github.com/IDuxFE/idux/issues/980)) ([5f1e637](https://github.com/IDuxFE/idux/commit/5f1e6377a28e870223cdb03440581633877afcbb))
* **comp:carousel:** after click the same dot repeatedly, will not work ([#986](https://github.com/IDuxFE/idux/issues/986)) ([33e136e](https://github.com/IDuxFE/idux/commit/33e136e68f5af082f1f1d768c944d92bcc58d053))
* **comp:carousel:** stop onTransitionend from bubbling ([#984](https://github.com/IDuxFE/idux/issues/984)) ([f2c8347](https://github.com/IDuxFE/idux/commit/f2c8347ad60105d864ca3b0728e0a9025c0d1b11))
* **comp:select:** fix selected options display when filtered ([#977](https://github.com/IDuxFE/idux/issues/977)) ([ddd67e3](https://github.com/IDuxFE/idux/commit/ddd67e3284b6575701e642da5e359f9c4e58431e))
* **comp:tree:** node cannot be checked when its key is 0(Number type) ([#978](https://github.com/IDuxFE/idux/issues/978)) ([5497f20](https://github.com/IDuxFE/idux/commit/5497f20473637166f7ab5a394705267efdd8e7c3))
* **pro:layout:** update the scroll style on the dark theme ([#982](https://github.com/IDuxFE/idux/issues/982)) ([756c38b](https://github.com/IDuxFE/idux/commit/756c38b8b85f8733260a15d2be95297fb4b831c0))


### Features

* **comp:card:** add selection state and disabled state ([#983](https://github.com/IDuxFE/idux/issues/983)) ([a263497](https://github.com/IDuxFE/idux/commit/a2634970ea8738fc736be99673b0a7432ec217e3)), closes [#972](https://github.com/IDuxFE/idux/issues/972)





# [1.0.0-beta.17](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.16...v1.0.0-beta.17) (2022-06-23)


### Bug Fixes

* **comp:button:** style error ([#968](https://github.com/IDuxFE/idux/issues/968)) ([9db8c9f](https://github.com/IDuxFE/idux/commit/9db8c9f59bb8d6953d8748f97841897a71b8537b))
* **comp:menu:** update hover style ([#967](https://github.com/IDuxFE/idux/issues/967)) ([4bda54b](https://github.com/IDuxFE/idux/commit/4bda54be6adbad21da0e11c133cf8318f59450db))
* **comp:modal:** the default header size should be 'md' ([#969](https://github.com/IDuxFE/idux/issues/969)) ([437a6ce](https://github.com/IDuxFE/idux/commit/437a6ce664c6ddd1a370c395f836d7efcde54cdd))


### Features

* **comp:checkbox,comp:radio:** add group vertical props ([#975](https://github.com/IDuxFE/idux/issues/975)) ([d0710d6](https://github.com/IDuxFE/idux/commit/d0710d68e3766d7936b21ac0ae0685bb43d2b4a6))
* **comp:modal:** add draggable props ([#905](https://github.com/IDuxFE/idux/issues/905)) ([#966](https://github.com/IDuxFE/idux/issues/966)) ([d81b99f](https://github.com/IDuxFE/idux/commit/d81b99fa3b67b153301acd78d759cc32485b6b16))
* **comp:tabs:** add onBeforeLeave prop ([#965](https://github.com/IDuxFE/idux/issues/965)) ([9a792e3](https://github.com/IDuxFE/idux/commit/9a792e34df4cea07b96ab595a4e67943ee6faa50))





# [1.0.0-beta.16](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2022-06-17)


### Bug Fixes

* **cdk:resize:** performance problem ([#963](https://github.com/IDuxFE/idux/issues/963)) ([52e2eb8](https://github.com/IDuxFE/idux/commit/52e2eb8029d78c2fd5273727cef46f5e402b6785))
* **comp:button:** danger mode style error ([#957](https://github.com/IDuxFE/idux/issues/957)) ([6fef486](https://github.com/IDuxFE/idux/commit/6fef486cd8527835ef9d61eec55497c10cbe2464)), closes [#955](https://github.com/IDuxFE/idux/issues/955)
* **comp:header:** prefix or suffix is empty str, expect no render vnode ([#954](https://github.com/IDuxFE/idux/issues/954)) ([f9fb28b](https://github.com/IDuxFE/idux/commit/f9fb28b27e2187c0d09bc76c1e28f09d08d03067))
* **comp:modal:** fix loading stop before hide ([#961](https://github.com/IDuxFE/idux/issues/961)) ([8f3f696](https://github.com/IDuxFE/idux/commit/8f3f696268e85cdf3eb6bf3a58e47740fd47c5cf))
* **comp:table:** calculate the scroll postion when container resize ([#956](https://github.com/IDuxFE/idux/issues/956)) ([5fffb9b](https://github.com/IDuxFE/idux/commit/5fffb9b74f448c90d9478e26aaf1cbdf8a322a00))
* **comp:table:** set expandable trigger button type ([#962](https://github.com/IDuxFE/idux/issues/962)) ([a59b764](https://github.com/IDuxFE/idux/commit/a59b7641306a1d4d64d02a170bcc148adbb53c33))
* **comp:time-picker:** fix time range input ([#959](https://github.com/IDuxFE/idux/issues/959)) ([56bd1b2](https://github.com/IDuxFE/idux/commit/56bd1b28d01c6ad4b234e0cd59ed4455a018c75e))
* **comp:tree:** data display error after search clearing ([#952](https://github.com/IDuxFE/idux/issues/952)) ([2f502f6](https://github.com/IDuxFE/idux/commit/2f502f6ec4375d0e01bad4725531ae0e4ceafeee))
* **pro:transfer:** fix flat tree transfer render when labelKey provided ([#958](https://github.com/IDuxFE/idux/issues/958)) ([8319ac0](https://github.com/IDuxFE/idux/commit/8319ac00e34fe10e5fa7bab888ae2792b71f2150))


### Features

* **comp:select:** extract IxSelectPanel component ([#938](https://github.com/IDuxFE/idux/issues/938)) ([3724675](https://github.com/IDuxFE/idux/commit/3724675812d47fb1bcebc486ad8f3ab2a8704ad9))


### BREAKING CHANGES

* **pro:transfer:** TransferBindings provide getKey as ComputedRef instead of getRowKey





# [1.0.0-beta.15](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2022-06-13)


### Bug Fixes

* **comp:slider:** add control props to support forms api ([#946](https://github.com/IDuxFE/idux/issues/946)) ([0a86160](https://github.com/IDuxFE/idux/commit/0a8616027137619d2beaac8cc7054001a95136dd)), closes [#942](https://github.com/IDuxFE/idux/issues/942)
* **comp:watermark:** prop content type error ([#944](https://github.com/IDuxFE/idux/issues/944)) ([ae91476](https://github.com/IDuxFE/idux/commit/ae91476f6bb88bce01836b339efe20b74b0302ca))


### Features

* **cdk:resize:** add CdkResizable and CdkResizableHandler ([#943](https://github.com/IDuxFE/idux/issues/943)) ([58bab1b](https://github.com/IDuxFE/idux/commit/58bab1ba8be0ade028e71a6752901749f39b064a))
* **comp:tree*:** add draggableIcon prop ([#948](https://github.com/IDuxFE/idux/issues/948)) ([28b7031](https://github.com/IDuxFE/idux/commit/28b7031fe5325258d488abcf2c23cd611ecac802))
* **pro:table:** support resizable column ([#945](https://github.com/IDuxFE/idux/issues/945)) ([47b90dd](https://github.com/IDuxFE/idux/commit/47b90ddf514e2cf67d76d074b594c414f70b7c33))





# [1.0.0-beta.14](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2022-06-07)


### Bug Fixes

* **comp:cascader:** the cloned node should have a unique key ([#940](https://github.com/IDuxFE/idux/issues/940)) ([45ece7b](https://github.com/IDuxFE/idux/commit/45ece7bd8e5c1b525e07c16b8a26cd300c568334))


### Features

* **cdk:drag-drop:** add useDraggable and CdkDraggable ([#939](https://github.com/IDuxFE/idux/issues/939)) ([7161d96](https://github.com/IDuxFE/idux/commit/7161d96e63a81bf7595f0cd5e03f31d77fd89273))





# [1.0.0-beta.13](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2022-05-30)


### Bug Fixes

* **comp: pagination:** pageSizes input width error ([#931](https://github.com/IDuxFE/idux/issues/931)) ([3e91b33](https://github.com/IDuxFE/idux/commit/3e91b33f980d7d9620b4d881d7b5935f9e3c16fc))
* **comp: pagination:** Showquickjumper does not work in simple mode ([#928](https://github.com/IDuxFE/idux/issues/928)) ([2955e7f](https://github.com/IDuxFE/idux/commit/2955e7fbbfae89a64c5be5701ccf9db6e675a14c))
* **comp: table:** auto height not works with spin ([#935](https://github.com/IDuxFE/idux/issues/935)) ([5b770a9](https://github.com/IDuxFE/idux/commit/5b770a9617f5f3f8368828d22c44be38a746dde4))
* **comp: tree:** expand the node being hover, when dragging ([#927](https://github.com/IDuxFE/idux/issues/927)) ([ae8fdef](https://github.com/IDuxFE/idux/commit/ae8fdef5073f25d34c25e22c6a1fc2bf647544a5))
* **comp:all:** fix CI lint error ([#925](https://github.com/IDuxFE/idux/issues/925)) ([2aa0e91](https://github.com/IDuxFE/idux/commit/2aa0e91197177487ebd00cae08f92cc632cf482d))


### Features

* **comp: tree:** Don't show irrelevant nodes during search ([#904](https://github.com/IDuxFE/idux/issues/904)) ([b176cda](https://github.com/IDuxFE/idux/commit/b176cda695ec268de4541026270e372db0769b2c))
* **comp: watermark:** add watermark component ([#930](https://github.com/IDuxFE/idux/issues/930)) ([79b6435](https://github.com/IDuxFE/idux/commit/79b64352d607a3e7724fc312d522d352b64d76e5)), closes [#924](https://github.com/IDuxFE/idux/issues/924)
* **pro: table:** add IxProTable and IxProTableLayoutTool ([#936](https://github.com/IDuxFE/idux/issues/936)) ([688627f](https://github.com/IDuxFE/idux/commit/688627f256ef124be37a9cedf63ce21f288a3747))





# [1.0.0-beta.12](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2022-05-24)


### Bug Fixes

* **comp:all,pro:all,cdk:all:** add eslint import check ([#922](https://github.com/IDuxFE/idux/issues/922)) ([8bbbec1](https://github.com/IDuxFE/idux/commit/8bbbec178a51ad5707791db5ceb49f0547c84f95))





# [1.0.0-beta.11](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2022-05-23)


### Bug Fixes

* **comp: select:** search error when group exists ([#908](https://github.com/IDuxFE/idux/issues/908)) ([ddbfc5e](https://github.com/IDuxFE/idux/commit/ddbfc5e5fd3ee24522f25633f74aeab33a23e200))
* **comp: table:** controled filter works ([#919](https://github.com/IDuxFE/idux/issues/919)) ([fff5022](https://github.com/IDuxFE/idux/commit/fff502266cd1c66ece2f2b1310c9eb0f44c38a76))
* **comp: tabs:** error style when nesting tabs ([#918](https://github.com/IDuxFE/idux/issues/918)) ([ee41c7a](https://github.com/IDuxFE/idux/commit/ee41c7a557b1e65245876be1e5839a91c8c0fdb0)), closes [#913](https://github.com/IDuxFE/idux/issues/913)
* **comp:stepper:** padding problem of left&right ([#912](https://github.com/IDuxFE/idux/issues/912)) ([25a2aac](https://github.com/IDuxFE/idux/commit/25a2aac55e1a51d5fef2d1846d94134d74d43f45))


### Features

* **cdk: resize:** add useResizeObserver and CdkResizeObserver ([#909](https://github.com/IDuxFE/idux/issues/909)) ([c20fe45](https://github.com/IDuxFE/idux/commit/c20fe45f94afd09d6a358030d2cc9b6f2124e4a3))
* **comp: table:** support multiple sort ([#917](https://github.com/IDuxFE/idux/issues/917)) ([a407920](https://github.com/IDuxFE/idux/commit/a4079202cdde6c5f635bda908cb333c98389675c)), closes [#915](https://github.com/IDuxFE/idux/issues/915)
* **comp: tree,tree-select,pro-tree:** add getNode method ([#910](https://github.com/IDuxFE/idux/issues/910)) ([#916](https://github.com/IDuxFE/idux/issues/916)) ([82c929d](https://github.com/IDuxFE/idux/commit/82c929d46b63af31e4cab25deab485c11b630fc9))





# [1.0.0-beta.10](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2022-05-16)


### Bug Fixes

* **comp: select:** Add number to the type of label ([#901](https://github.com/IDuxFE/idux/issues/901)) ([5875e2d](https://github.com/IDuxFE/idux/commit/5875e2d9b64047c4375d7169e7d2f1d61c9a7bb2))
* **comp: table:** update style with sticky and bodered ([#898](https://github.com/IDuxFE/idux/issues/898)) ([ff75f3e](https://github.com/IDuxFE/idux/commit/ff75f3e3a24e886b44ff97431b3c2bb6542556b1))
* **comp: tag:** if value of number over 9 and show '9+' ([#841](https://github.com/IDuxFE/idux/issues/841)) ([#896](https://github.com/IDuxFE/idux/issues/896)) ([645301c](https://github.com/IDuxFE/idux/commit/645301cb76198e0725489ec93d8b7ec40f205c1f))


### Features

* **cdk: forms:** getValud support skip disabled control ([#897](https://github.com/IDuxFE/idux/issues/897)) ([9ba3eca](https://github.com/IDuxFE/idux/commit/9ba3eca2bc23d2f78e04afa16e19ac859c75757c))
* **pro: tree:** add collapseIcon prop ([#900](https://github.com/IDuxFE/idux/issues/900)) ([e9bb42b](https://github.com/IDuxFE/idux/commit/e9bb42b18fc7c6fdd51b921387a1cd33a32557cf))


### BREAKING CHANGES

* **cdk: forms:** `ValidatorOptions.trim` was deprecated, please use `trim` of `IxInput` or
`IxTextarea` instead.





# [1.0.0-beta.9](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2022-05-09)


### Bug Fixes

* **cdk:click-outside:**  not working when click target has [@click](https://github.com/click).stop ([#887](https://github.com/IDuxFE/idux/issues/887)) ([a400cba](https://github.com/IDuxFE/idux/commit/a400cbace8fe1384acbec243d0ee415b31c7e49a))
* **comp: button:** update style with icon ([#885](https://github.com/IDuxFE/idux/issues/885)) ([1377fff](https://github.com/IDuxFE/idux/commit/1377fff56e30737889277de910f5f42d9b5a34f1))
* **comp: table:** update style with empty data ([#888](https://github.com/IDuxFE/idux/issues/888)) ([44c67aa](https://github.com/IDuxFE/idux/commit/44c67aae3858157b32d918a5102e183b8eaac97d))
* **comp:affix:** fix the problem of dynamic display ([#893](https://github.com/IDuxFE/idux/issues/893)) ([dbb69a5](https://github.com/IDuxFE/idux/commit/dbb69a571e8c035fbdfa56464fa66ec0dc090bab)), closes [#849](https://github.com/IDuxFE/idux/issues/849)
* **comp:select:** value key of select is 'value' by default ([#892](https://github.com/IDuxFE/idux/issues/892)) ([582cd4a](https://github.com/IDuxFE/idux/commit/582cd4ae68dc281f8193f86a280835f58d2598a6))
* **comp:time-picker,date-picker:** refactor code and fix z-index ([#886](https://github.com/IDuxFE/idux/issues/886)) ([8d2133b](https://github.com/IDuxFE/idux/commit/8d2133b860c105a7cfa78cdc6f967eeed1f6ed78))


### Features

* **comp: tree-select:** add expandAll and collapseAll methods ([#895](https://github.com/IDuxFE/idux/issues/895)) ([772e039](https://github.com/IDuxFE/idux/commit/772e03937069a076b5861235859497a7ffd0318b))
* **comp: tree:** expandIcon add array type ([#883](https://github.com/IDuxFE/idux/issues/883)) ([1342e66](https://github.com/IDuxFE/idux/commit/1342e66f8fe6348ed37d0b90c422a0ff23f41cf7))
* **pro: tree:** add pro tree component ([#891](https://github.com/IDuxFE/idux/issues/891)) ([ffd80de](https://github.com/IDuxFE/idux/commit/ffd80de694377309b65fb569bb91f24d6ba8d514))


### BREAKING CHANGES

* **comp: tree-select:** setExpandAll was deprecated, please use collapseAll and
expandAll instead.





# [1.0.0-beta.8](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2022-05-05)


### Bug Fixes

* **comp: alert:** align icon with text ([#881](https://github.com/IDuxFE/idux/issues/881)) ([4b4f567](https://github.com/IDuxFE/idux/commit/4b4f567d4493765fe44acebf22cb5b4f94d51621))
* **comp: menu:** menu cannot show ([#875](https://github.com/IDuxFE/idux/issues/875)) ([2eaf920](https://github.com/IDuxFE/idux/commit/2eaf9204a09f253b97837bb28bd78ed6e62d0124))
* **comp: message:** align icon with text ([#865](https://github.com/IDuxFE/idux/issues/865)) ([07475d2](https://github.com/IDuxFE/idux/commit/07475d2284d007a6636bc6e65fde547f45369256))
* **comp: tree:** the horizontal scroll bar does not appear ([#861](https://github.com/IDuxFE/idux/issues/861)) ([ac63edf](https://github.com/IDuxFE/idux/commit/ac63edf56009ffbb9154b1036ecc4b11949472c6))
* **comp:carousel:** modify onChange params order ([#863](https://github.com/IDuxFE/idux/issues/863)) ([d08b9f3](https://github.com/IDuxFE/idux/commit/d08b9f34943d87fd956f7622fc6eb873396b2d04)), closes [#862](https://github.com/IDuxFE/idux/issues/862)
* **comp:data-picker:** modify data-picker according to current desigin ([#859](https://github.com/IDuxFE/idux/issues/859)) ([7efdcb9](https://github.com/IDuxFE/idux/commit/7efdcb948cc2a2627ad35fe100633b6dde23e5f4))
* **comp:table:** fix table column width measure problem when data load is delayed ([#860](https://github.com/IDuxFE/idux/issues/860)) ([1204300](https://github.com/IDuxFE/idux/commit/1204300c2f573902cab1d1e150a081b6c2574b85))


### Features

* **comp: cascader:** add cascader component ([#857](https://github.com/IDuxFE/idux/issues/857)) ([50fb584](https://github.com/IDuxFE/idux/commit/50fb584604bd9452f25649718f3340d1b40d10c8)), closes [#797](https://github.com/IDuxFE/idux/issues/797)
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


### Bug Fixes

* **comp: select:** sync width on opened ([#853](https://github.com/IDuxFE/idux/issues/853)) ([02d2769](https://github.com/IDuxFE/idux/commit/02d27690b0f4e324962510d8f7782ecc9931ebce))
* **comp: select:** update overlay on selector resize ([#851](https://github.com/IDuxFE/idux/issues/851)) ([24f173e](https://github.com/IDuxFE/idux/commit/24f173e24495e6253e467511365635d2fbe99b53))


### Features

* **comp: all:** add seer themes ([#850](https://github.com/IDuxFE/idux/issues/850)) ([789a266](https://github.com/IDuxFE/idux/commit/789a266f117b34c61efd8d52f4c325e5f49c8622))
* **comp: form:** add controlTooltip,controlTooltipIcon,labelTooltipIcon props ([#852](https://github.com/IDuxFE/idux/issues/852)) ([c3cd180](https://github.com/IDuxFE/idux/commit/c3cd180c452a062c299642e4ee23ddea49d8fe86))
* **comp: tabs:** first tab is selected by default when no selectedKey ([#855](https://github.com/IDuxFE/idux/issues/855)) ([5c6ee77](https://github.com/IDuxFE/idux/commit/5c6ee777b886f6ffed2d20a89dcfe54d0a6594ba))





# [1.0.0-beta.6](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2022-04-21)


### Bug Fixes

* **comp: select:** sync width on opened ([#853](https://github.com/IDuxFE/idux/issues/853)) ([7b40e6f](https://github.com/IDuxFE/idux/commit/7b40e6f0a2cee77f3f8f519885f2736d4990603b))
* **comp: select:** update overlay on selector resize ([#851](https://github.com/IDuxFE/idux/issues/851)) ([24f173e](https://github.com/IDuxFE/idux/commit/24f173e24495e6253e467511365635d2fbe99b53))





# [1.0.0-beta.5](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2022-04-18)


### Bug Fixes

* **cdk:scroll:** turn to native scrollbar ([#847](https://github.com/IDuxFE/idux/issues/847)) ([95df1b9](https://github.com/IDuxFE/idux/commit/95df1b9e3b0d44b924fff8f81ebe7eef1a41b352))


### Features

* **comp:date-picker:** add datetime type ([#837](https://github.com/IDuxFE/idux/issues/837)) ([6200d5a](https://github.com/IDuxFE/idux/commit/6200d5a1dfbb74005f9edbd0dd0d2f15ce296660))
* **comp:icon:** update assets of svg ([#848](https://github.com/IDuxFE/idux/issues/848)) ([09e6ac3](https://github.com/IDuxFE/idux/commit/09e6ac3c2762c8d0a9bc2f645238c53753167acb))





# [1.0.0-beta.4](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2022-04-11)


### Bug Fixes

* **comp: checkbox-group:** invalid disabled in dataSource ([#827](https://github.com/IDuxFE/idux/issues/827)) ([0f43a09](https://github.com/IDuxFE/idux/commit/0f43a09ab7da5d5f8c52a38e506438ec0764b7f8))
* **comp: space:** error color value in style ([#832](https://github.com/IDuxFE/idux/issues/832)) ([052aefe](https://github.com/IDuxFE/idux/commit/052aefeff0d6ee69e2e0eccdd359adb87b8f0919))
* **comp: tree:** Asynchronous loading node hierarchy error ([#838](https://github.com/IDuxFE/idux/issues/838)) ([1e41588](https://github.com/IDuxFE/idux/commit/1e41588937fb23ea3afe5c7d4be3148c8e2045e8)), closes [#835](https://github.com/IDuxFE/idux/issues/835)
* **comp:anchor:** should default active first item ([#843](https://github.com/IDuxFE/idux/issues/843)) ([84bf725](https://github.com/IDuxFE/idux/commit/84bf72526bd3d4923ceb0455d783d9914205bcde))
* **comp:input:** update style with selector ([#842](https://github.com/IDuxFE/idux/issues/842)) ([39239be](https://github.com/IDuxFE/idux/commit/39239bee20fd814da8ef13108f20d5ab892e84a1))


### Features

* **comp:select:** support setting autocomplete ([#833](https://github.com/IDuxFE/idux/issues/833)) ([583952d](https://github.com/IDuxFE/idux/commit/583952d8859a0cd0944491ead11fa72dac788ec8))
* **comp:tag-group:** add tagGroup component ([#836](https://github.com/IDuxFE/idux/issues/836)) ([b365f3e](https://github.com/IDuxFE/idux/commit/b365f3e97c9bc94b3542d50045990fb23df0266b))





# [1.0.0-beta.3](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2022-03-27)


### Bug Fixes

* **comp: select:** placeholder position are squeezed  ([#813](https://github.com/IDuxFE/idux/issues/813)) ([a4d1933](https://github.com/IDuxFE/idux/commit/a4d1933286c60da132b741bd8348f19fa6acdd64)), closes [#812](https://github.com/IDuxFE/idux/issues/812)
* **comp:select:** sync input width on composing ([#821](https://github.com/IDuxFE/idux/issues/821)) ([743328f](https://github.com/IDuxFE/idux/commit/743328f5f99a34aa8184956b6344a8990567213f))
* **comp:slider:** slid distance calculation error ([#818](https://github.com/IDuxFE/idux/issues/818)) ([322f755](https://github.com/IDuxFE/idux/commit/322f7556d3463e38cf4fabbb4e08ecbf6a59d212)), closes [#817](https://github.com/IDuxFE/idux/issues/817)
* **comp:table:** empty style ([#820](https://github.com/IDuxFE/idux/issues/820)) ([689437b](https://github.com/IDuxFE/idux/commit/689437b784f6198aa253c22e38b92fe3405b55b8))


### Features

* **comp:comment:** add comment component ([#822](https://github.com/IDuxFE/idux/issues/822)) ([e3f1e98](https://github.com/IDuxFE/idux/commit/e3f1e988139c1fde922c415e066cfc03dd034e04)), closes [#358](https://github.com/IDuxFE/idux/issues/358)
* **comp:table:** support autoHeight ([#816](https://github.com/IDuxFE/idux/issues/816)) ([7a87569](https://github.com/IDuxFE/idux/commit/7a87569abf7ecf05ddb4c42eae4256551ec0dffe)), closes [#757](https://github.com/IDuxFE/idux/issues/757)
* **comp:tooltip:** support setting zindex ([#825](https://github.com/IDuxFE/idux/issues/825)) ([0a97e42](https://github.com/IDuxFE/idux/commit/0a97e42b6c3b189a0baa5b74e0849401a2da10c7))
* **comp:tree-select:** maxLabel support responsive ([#814](https://github.com/IDuxFE/idux/issues/814)) ([#823](https://github.com/IDuxFE/idux/issues/823)) ([df82e5d](https://github.com/IDuxFE/idux/commit/df82e5d4a61a3cd8bc064a448ea22502eb94967a))
* **pro:transfer:** add pro transfer compoennt ([#815](https://github.com/IDuxFE/idux/issues/815)) ([e367009](https://github.com/IDuxFE/idux/commit/e367009c0b7cec277606574c1f485b43f094145b))





# [1.0.0-beta.2](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2022-03-20)


### Bug Fixes

* **comp:menu:** cache expandedKeys when collapse changed ([#805](https://github.com/IDuxFE/idux/issues/805)) ([48bacb2](https://github.com/IDuxFE/idux/commit/48bacb2140140c2a984ead14328dcb28d7494b99))
* **comp:tab:** tab content is not vertically centered ([#809](https://github.com/IDuxFE/idux/issues/809)) ([74b0dba](https://github.com/IDuxFE/idux/commit/74b0dbaa85b221c1085e6a6e45f2d77773f82904))
* **component:message:** message icon and content not align center when custom content ([#807](https://github.com/IDuxFE/idux/issues/807)) ([120390b](https://github.com/IDuxFE/idux/commit/120390b414f1feab98d86ee239f956a33f8b294f))


*  feat(comp: select): maxLabel support responsive (#806) ([115b5ec](https://github.com/IDuxFE/idux/commit/115b5ecb5f30fb48356c9d71f31508430fb273ed)), closes [#806](https://github.com/IDuxFE/idux/issues/806) [#756](https://github.com/IDuxFE/idux/issues/756)


### Features

* **comp: timeline:** rebuild with tsx ([#803](https://github.com/IDuxFE/idux/issues/803)) ([8677d61](https://github.com/IDuxFE/idux/commit/8677d6163505769cb9af80f3073980dbdab6fc01))
* **comp:select:** disable option when limited ([#804](https://github.com/IDuxFE/idux/issues/804)) ([aa6a5aa](https://github.com/IDuxFE/idux/commit/aa6a5aa47ca7ca82f09eaf6f245987f882f3b036))
* **comp:transfer:** add transfer component ([#794](https://github.com/IDuxFE/idux/issues/794)) ([e861615](https://github.com/IDuxFE/idux/commit/e86161568affa4fb71d36f75ad5b8045cdbef699)), closes [#782](https://github.com/IDuxFE/idux/issues/782)


### BREAKING CHANGES

* `maxLabelCount` was deprecated, please use `maxLabel` instead





# [1.0.0-beta.1](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.6...v1.0.0-beta.1) (2022-03-14)


### Bug Fixes

* **cdk:forms:** maxLength message ([#800](https://github.com/IDuxFE/idux/issues/800)) ([93231ab](https://github.com/IDuxFE/idux/commit/93231abe2167adab5265e4d99697c06fc386d63b))
* **comp: checkbox:** onChange returned an error oldValue ([#792](https://github.com/IDuxFE/idux/issues/792)) ([2825def](https://github.com/IDuxFE/idux/commit/2825defa4733e5b5c4c025405428221d82ffa577)), closes [#790](https://github.com/IDuxFE/idux/issues/790)
* **comp: stepper:** vertical style error without description ([#784](https://github.com/IDuxFE/idux/issues/784)) ([5ec4906](https://github.com/IDuxFE/idux/commit/5ec49062f245755c2811a458e121ca29edec76a3))
* **comp: tabs:** when scrolling style is wrong ([#785](https://github.com/IDuxFE/idux/issues/785)) ([05cb864](https://github.com/IDuxFE/idux/commit/05cb86494b7e20d96b2ccaa2c9320e4a022ee7e1))
* **comp:menu:** remove stopPropagation ([#799](https://github.com/IDuxFE/idux/issues/799)) ([fedf778](https://github.com/IDuxFE/idux/commit/fedf778c319a9c69b56b3d7f96c16c55790da35b))
* **comp:select:** trigger handleInput  when onCompositionEnd ([#801](https://github.com/IDuxFE/idux/issues/801)) ([d157f0c](https://github.com/IDuxFE/idux/commit/d157f0c3470747866c613e5b8151b388ba031fa6)), closes [#786](https://github.com/IDuxFE/idux/issues/786)
* **comp:tree:** The expanded state of the first layer node is wrong ([#795](https://github.com/IDuxFE/idux/issues/795)) ([aba661a](https://github.com/IDuxFE/idux/commit/aba661a70c20404e1c4df93697c4d25661a54d9c))


### Code Refactoring

* **comp:form:** api redesign and add test ([#763](https://github.com/IDuxFE/idux/issues/763)) ([825066e](https://github.com/IDuxFE/idux/commit/825066e011b46b50f536e413d189a7d7d104c185))
* **comp:locales:** use useGlobalConfig instead of useI18n ([#764](https://github.com/IDuxFE/idux/issues/764)) ([4f50728](https://github.com/IDuxFE/idux/commit/4f50728ae26c6091ac6d9bf85f95af134b16a97d))
* **comp:radio:** use dataSource instead of options ([#771](https://github.com/IDuxFE/idux/issues/771)) ([25e85a3](https://github.com/IDuxFE/idux/commit/25e85a340edaaa7d26f9a24570f5c687b2ad8e5a))
* **comp:select:** api redesign ([#773](https://github.com/IDuxFE/idux/issues/773)) ([934c0b2](https://github.com/IDuxFE/idux/commit/934c0b21e14e63860874f4a2fb3664d31e3534d0))


### Features

* **comp: button:** add xs and lg sizes ([#780](https://github.com/IDuxFE/idux/issues/780)) ([69f94c8](https://github.com/IDuxFE/idux/commit/69f94c8f9f7f68d7b91eb831b3ee286ed8a3d663))
* **comp:select:** add clearIcon ([#798](https://github.com/IDuxFE/idux/issues/798)) ([57e88f0](https://github.com/IDuxFE/idux/commit/57e88f039c5b8dc51175687acd2c07f13deb2831))
* **comp:table:** add ellipsis and less variable ([#778](https://github.com/IDuxFE/idux/issues/778)) ([3d1f3fe](https://github.com/IDuxFE/idux/commit/3d1f3fe2d8b02e212e6270f0f48fd3405d7550b2)), closes [#769](https://github.com/IDuxFE/idux/issues/769)
* **comp:tabs:** add less variable ([#777](https://github.com/IDuxFE/idux/issues/777)) ([fa653f9](https://github.com/IDuxFE/idux/commit/fa653f91565dff8a5384cab6d8e2af6ccae54159)), closes [#768](https://github.com/IDuxFE/idux/issues/768)
* **pro:layout:** add siderHover and compress props ([#759](https://github.com/IDuxFE/idux/issues/759)) ([faf0913](https://github.com/IDuxFE/idux/commit/faf09130c895a82ca65eee8a82dc082e36cc9247))


### BREAKING CHANGES

* **comp:select:** `compareWith` was deprecated, please use `compareFn` instead, `options` was deprecated, please use `dataSource` instead, `searchFilter` was deprecated, please use `searchFn` instead.
* **comp:radio:** `options` was deprecated, please use `dataSource` instead
* **comp:locales:** `useI18n` was removed.
* **comp:form:** `hasFeedback` was deprecated, please use `statusIcon` instead.  `extra` was
deprecated, please use `extraMessage` instead.





# [1.0.0-beta.0](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.6...v1.0.0-beta.0) (2022-03-01)


### Code Refactoring

* **comp:form:** api redesign and add test ([#763](https://github.com/IDuxFE/idux/issues/763)) ([825066e](https://github.com/IDuxFE/idux/commit/825066e011b46b50f536e413d189a7d7d104c185))
* **comp:locales:** use useGlobalConfig instead of useI18n ([#764](https://github.com/IDuxFE/idux/issues/764)) ([4f50728](https://github.com/IDuxFE/idux/commit/4f50728ae26c6091ac6d9bf85f95af134b16a97d))
* **comp:radio:** use dataSource instead of options ([#771](https://github.com/IDuxFE/idux/issues/771)) ([25e85a3](https://github.com/IDuxFE/idux/commit/25e85a340edaaa7d26f9a24570f5c687b2ad8e5a))
* **comp:select:** api redesign ([#773](https://github.com/IDuxFE/idux/issues/773)) ([934c0b2](https://github.com/IDuxFE/idux/commit/934c0b21e14e63860874f4a2fb3664d31e3534d0))


### Features

* **comp:table:** add ellipsis and less variable ([#778](https://github.com/IDuxFE/idux/issues/778)) ([3d1f3fe](https://github.com/IDuxFE/idux/commit/3d1f3fe2d8b02e212e6270f0f48fd3405d7550b2)), closes [#769](https://github.com/IDuxFE/idux/issues/769)
* **comp:tabs:** add less variable ([#777](https://github.com/IDuxFE/idux/issues/777)) ([fa653f9](https://github.com/IDuxFE/idux/commit/fa653f91565dff8a5384cab6d8e2af6ccae54159)), closes [#768](https://github.com/IDuxFE/idux/issues/768)
* **pro:layout:** add siderHover and compress props ([#759](https://github.com/IDuxFE/idux/issues/759)) ([faf0913](https://github.com/IDuxFE/idux/commit/faf09130c895a82ca65eee8a82dc082e36cc9247))


### BREAKING CHANGES

* **comp:select:** `compareWith` was deprecated, please use `compareFn` instead, `options` was deprecated, please use `dataSource` instead, `searchFilter` was deprecated, please use `searchFn` instead.
* **comp:radio:** `options` was deprecated, please use `dataSource` instead
* **comp:locales:** `useI18n` was removed.
* **comp:form:** `hasFeedback` was deprecated, please use `statusIcon` instead.  `extra` was
deprecated, please use `extraMessage` instead.





# [1.0.0-alpha.6](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2022-02-18)


### Bug Fixes

* **comp: radio:** incomplete consideration of controlled mode ([#744](https://github.com/IDuxFE/idux/issues/744)) ([1a190bd](https://github.com/IDuxFE/idux/commit/1a190bd77d8b952ab263c8ffdc9153963e511804))
* **comp:select:** filter option exception ([#751](https://github.com/IDuxFE/idux/issues/751)) ([96ed380](https://github.com/IDuxFE/idux/commit/96ed3807dc35b5445ec4bc83dde0894a56e99ed1)), closes [#750](https://github.com/IDuxFE/idux/issues/750)
* **comp:space:** remove default alian and justify ([#749](https://github.com/IDuxFE/idux/issues/749)) ([54456c6](https://github.com/IDuxFE/idux/commit/54456c6ddedc7e8c786cb23cedfedac4f5a0833e))


### Code Refactoring

* **comp:layout:** remove onCollapse ([#747](https://github.com/IDuxFE/idux/issues/747)) ([3001bbd](https://github.com/IDuxFE/idux/commit/3001bbd74200d22510bf49d505ee176cd469d9ac))


### Features

* **comp:checkbox:** use dataSource instead of options ([#753](https://github.com/IDuxFE/idux/issues/753)) ([ac2579a](https://github.com/IDuxFE/idux/commit/ac2579aa2270f25040c01ea387f025a507f09e05))
* **comp:divider:** add size prop ([#742](https://github.com/IDuxFE/idux/issues/742)) ([c6b4919](https://github.com/IDuxFE/idux/commit/c6b49197f2829f3999e5967a542eadd0c9c92a88))
* **comp:space:** add justify prop ([#743](https://github.com/IDuxFE/idux/issues/743)) ([9340796](https://github.com/IDuxFE/idux/commit/93407968a8763fad05b7aa7dfa8b5fdf323151d6))
* **comp:space:** add justify prop ([#746](https://github.com/IDuxFE/idux/issues/746)) ([af525d9](https://github.com/IDuxFE/idux/commit/af525d9263a1bb8f846ca916e82b224829030758))
* **comp:stepper:** redesign api ([#760](https://github.com/IDuxFE/idux/issues/760)) ([623569d](https://github.com/IDuxFE/idux/commit/623569db9725c8f97ce2a1beec8eb1805d5b8027))


### BREAKING CHANGES

* **comp:checkbox:** `options` was deprecated, please use `dataSource` instead
* **comp:layout:** `onCollapse` was removed
* **comp:space:** `direction` was deprecated, please use `vertical` instead. split` was deprecated,
please use `separator` instead.
* **comp:divider:** `position` was deprecated, please use `labelPlacement` instead, `type` was
deprecated, please use `vertical` instead





# [1.0.0-alpha.5](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2022-01-24)


### Bug Fixes

* **comp: affix:** style is not recalculated when resizing ([#737](https://github.com/IDuxFE/idux/issues/737)) ([9cda3d0](https://github.com/IDuxFE/idux/commit/9cda3d0354f93be7d1ac60fe767b15a3a51ddbf6))


### Features

* **comp:select:** add 'overlay' to searchable ([#729](https://github.com/IDuxFE/idux/issues/729)) ([68c6adc](https://github.com/IDuxFE/idux/commit/68c6adc63d11cd7516e420c1ab04309cfac6e33a))
* **comp:table:** scroll support fullHeight ([#739](https://github.com/IDuxFE/idux/issues/739)) ([2255853](https://github.com/IDuxFE/idux/commit/2255853832ce9db96ac80a774bcc60924cc52511))
* **comp:upload:** add file upload component ([#669](https://github.com/IDuxFE/idux/issues/669)) ([91f501a](https://github.com/IDuxFE/idux/commit/91f501a2f3373953dc7a8317d546e050fe6fddde)), closes [#605](https://github.com/IDuxFE/idux/issues/605)
* **pro:layout:** suppor all slots of IxMenu ([#738](https://github.com/IDuxFE/idux/issues/738)) ([9745c32](https://github.com/IDuxFE/idux/commit/9745c329a962faa2499f0003c8badab33b9dcabc))


### BREAKING CHANGES

* **comp:table:** `scroll.x` and `scroll.y` are deprecated, please use `scroll.width` and
`scroll.height` instead

* test(comp:table): add basic test





# [1.0.0-alpha.4](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2022-01-14)


### Bug Fixes

* **comp:image:** fix image test error ([#723](https://github.com/IDuxFE/idux/issues/723)) ([329fc2c](https://github.com/IDuxFE/idux/commit/329fc2c3bc3b15f85f4994f51c4da0343df5d8d0))
* **comp:select:** fix option style ([#704](https://github.com/IDuxFE/idux/issues/704)) ([45a9763](https://github.com/IDuxFE/idux/commit/45a9763101d1ccaebb6158ed534442000e4030dc))
* **radio,checkbox:** fix checkbox and radio aligin ([#692](https://github.com/IDuxFE/idux/issues/692)) ([cafa7ba](https://github.com/IDuxFE/idux/commit/cafa7ba78fb094c705e73d72f5f618720f644b1c))


### Code Refactoring

* **comp:menu:** use customXxx instead of slots ([#725](https://github.com/IDuxFE/idux/issues/725)) ([f88ca6d](https://github.com/IDuxFE/idux/commit/f88ca6db43b1eba493cda16b91a16062a654ce0a))
* **comp:select:** use customLabel instead of slots ([#726](https://github.com/IDuxFE/idux/issues/726)) ([3a34fc4](https://github.com/IDuxFE/idux/commit/3a34fc44d759f4f0c835efe51b406c3e2fd1efa4))


### Features

* **cdk:forms:** add option to remove space ([#718](https://github.com/IDuxFE/idux/issues/718)) ([be43870](https://github.com/IDuxFE/idux/commit/be43870b3e013ba2009a52f6d77ac23abdbab199)), closes [#553](https://github.com/IDuxFE/idux/issues/553)
* **cdk:scroll:** show scrollbar when mouseenter ([#722](https://github.com/IDuxFE/idux/issues/722)) ([cfa48ce](https://github.com/IDuxFE/idux/commit/cfa48ce257ad5c2be3c2c6754d0ae751fdf99dd7))
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
* **pro:layout:** fix sider border-right style ([#659](https://github.com/IDuxFE/idux/issues/659)) ([bcdffdb](https://github.com/IDuxFE/idux/commit/bcdffdba5a52f0b14e62261b8f26d5115945a4bb))


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
