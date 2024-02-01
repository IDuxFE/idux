# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/IDuxFE/idux/compare/v1.12.2...v2.0.0) (2024-02-01)

### Bug Fixes

* **cdk:form,comp:icon:** fix suspected memory leak ([#1846](https://github.com/IDuxFE/idux/issues/1846)) ([43581b1](https://github.com/IDuxFE/idux/commit/7ce35d7f3ed92e64d63b3c3c950d8b3dbac0b9ba))
* **cdk:scroll:** optimize virtual scroll render pool resuage ([#1837](https://github.com/IDuxFE/idux/issues/1837)) ([4a37a0a](https://github.com/IDuxFE/idux/commit/998abea734bc03205a835469247dd1f06343619e))
* **comp:alert,tag:** replace rgba bg color with color with no alpha ([#1840](https://github.com/IDuxFE/idux/issues/1840)) ([458b070](https://github.com/IDuxFE/idux/commit/8d05916477f4ff4ad4afc6d5a0e6e29a8c4bd5eb))
* **comp:button:** button is not vertical center when it has icon ([#1830](https://github.com/IDuxFE/idux/issues/1830)) ([cefdc0d](https://github.com/IDuxFE/idux/commit/fbf4586a6e26c585d09cbcb0b814b465ba985103))
* **comp:cascader:** remote search is error ([#1832](https://github.com/IDuxFE/idux/issues/1832)) ([8d1e463](https://github.com/IDuxFE/idux/commit/551935ea1b8cec100d6757eb4518c7e991845945))
* **comp:drawer:** destroyOnHide drawer doesn't destroy if visible is set false before enter transition ([#1836](https://github.com/IDuxFE/idux/issues/1836)) ([773fb38](https://github.com/IDuxFE/idux/commit/1156a4f4e209bde9af2d8dda122733c9fde3ecb2))
* **comp:header:** header bar should be aligned top ([#1842](https://github.com/IDuxFE/idux/issues/1842)) ([592fc8b](https://github.com/IDuxFE/idux/commit/1688ecd673fc5b8799edd37e02b343e55b35845a))
* **comp:popconfirm:** change style ([#1823](https://github.com/IDuxFE/idux/issues/1823)) ([fc63a44](https://github.com/IDuxFE/idux/commit/339c292614be2892f593e574b078ee77a2291edb))
* **comp:popover:** remove content padding top ([#1822](https://github.com/IDuxFE/idux/issues/1822)) ([6b29646](https://github.com/IDuxFE/idux/commit/b372290f615ce5a72ed24d565d1b3a7f0310685a))
* **comp:select:** search input should be cleared after option selected ([#1843](https://github.com/IDuxFE/idux/issues/1843)) ([15daf1c](https://github.com/IDuxFE/idux/commit/6fbf32bf51c09476b7ab414229e4c64d3b5b0202))
* **comp:select:** when  input change multiply model input width is error ([#1829](https://github.com/IDuxFE/idux/issues/1829)) ([91c1f34](https://github.com/IDuxFE/idux/commit/0c7e0a44a0148be61803a51d021d5dbe05c755e8))
* **comp:table:** inconsecutive fixed columns are not fixed ([#1835](https://github.com/IDuxFE/idux/issues/1835)) ([9a8332b](https://github.com/IDuxFE/idux/commit/d2c4f17385b1ea5ac21d65571494b6a3de6d2fd8))
* **comp:table:** tree table line doesn't appear normally ([#1844](https://github.com/IDuxFE/idux/issues/1844)) ([2405527](https://github.com/IDuxFE/idux/commit/3e1b72fa1c0995fc30061d468bf8eac374157e28))
* **comp:table:** virtual table scroll sync should be done by virtual scrollTo API ([#1834](https://github.com/IDuxFE/idux/issues/1834)) ([383ca7d](https://github.com/IDuxFE/idux/commit/18b9e6b6cefcc6e0fbc25c53914e62a629c52455))
* **comp:tree:** modify tree line spacing ([#1839](https://github.com/IDuxFE/idux/issues/1839)) ([f091062](https://github.com/IDuxFE/idux/commit/de649a98cfabf9ede54a1707e1a0f2ed31d280ea))
* **pro:table:** hovering layout tool trigger shouldn't show resize handle ([#1838](https://github.com/IDuxFE/idux/issues/1838)) ([ba1b33e](https://github.com/IDuxFE/idux/commit/de649a98cfabf9ede54a1707e1a0f2ed31d280ea))


### Features

* **cdk:scroll:** virtual scrollTo supports horizontal target ([#1833](https://github.com/IDuxFE/idux/issues/1833)) ([d062236](https://github.com/IDuxFE/idux/commit/437c0348d8df072d2f15235423203ac2eda7901b))


### BREAKING CHANGES

* **cdk:scroll:** scrollTo option index is deprecated, use rowIndex instead
* **cdk:scroll:** scrollTo option offset is deprecated, use verticalOffset instead
* **cdk:scroll:** scrollTo option key is deprecated, use rowKey instead
* **cdk:scroll:** scrollTo option align is deprecated, use verticalAlign instead

# [2.0.0-beta.6](https://github.com/IDuxFE/idux/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2024-01-17)


### Bug Fixes

* **cdk:popper:** arrow size not properly calculated ([#1813](https://github.com/IDuxFE/idux/issues/1813)) ([f7abe16](https://github.com/IDuxFE/idux/commit/f7abe16f9b8bf71124d46fc96c8a6594d36ef64e))
* **comp:*:** modify all overlay default placement to bottomStart ([#1815](https://github.com/IDuxFE/idux/issues/1815)) ([4189049](https://github.com/IDuxFE/idux/commit/4189049b6e151ceaca7f0c29ea1f249e525e7646))
* **comp:alert:** change alert icon marigin-right to marginSizeXs([#1802](https://github.com/IDuxFE/idux/issues/1802)) ([4df6f97](https://github.com/IDuxFE/idux/commit/4df6f97f89afcfd47f33b9279afc4ebe02714829))
* **comp:collapse:** change header prefix margin right to marginSizeMd ([#1811](https://github.com/IDuxFE/idux/issues/1811)) ([6bf6655](https://github.com/IDuxFE/idux/commit/6bf6655451c2066a6b1136b95886d246eafbb0bd))
* **comp:header:** change bar height ([#1804](https://github.com/IDuxFE/idux/issues/1804)) ([972bd64](https://github.com/IDuxFE/idux/commit/972bd64a73f456dbb540e99df5dc7a69ea383895))
* **comp:select:** theme token optionGroupMargin unit error ([#1821](https://github.com/IDuxFE/idux/issues/1821)) ([c1c2906](https://github.com/IDuxFE/idux/commit/c1c2906b76292206dc939682676ab5ca005c4fd7))
* **comp:tag:** change tag padding x to 8px, use box-shadow instead of border ([#1801](https://github.com/IDuxFE/idux/issues/1801)) ([371c61d](https://github.com/IDuxFE/idux/commit/371c61d063d007909f3e1ba8aa80920398c1fb16))
* **comp:tag:** reset bordered style from box-shadow to border ([#1817](https://github.com/IDuxFE/idux/issues/1817)) ([7154ca5](https://github.com/IDuxFE/idux/commit/7154ca5886adf5bf6df92bc367973e094867d8d4))
* **pro:search:** quick select panel search bar overflows ([#1819](https://github.com/IDuxFE/idux/issues/1819)) ([c6824ea](https://github.com/IDuxFE/idux/commit/c6824ea4efaa3548015a831e7e3f5c15cd7b31d7))


### Features

* **cdk:scroll:** add simulated scroll support to VirtualScroll ([#1812](https://github.com/IDuxFE/idux/issues/1812)) ([17ccefa](https://github.com/IDuxFE/idux/commit/17ccefaf3cd0689e12e69be9d5af95578a12eae5))
* **pro:search:** select field supports caching selected data ([#1814](https://github.com/IDuxFE/idux/issues/1814)) ([6e80276](https://github.com/IDuxFE/idux/commit/6e80276e2b6461c98f2946b490e1d48ac0dcdc35))





# [2.0.0-beta.5](https://github.com/IDuxFE/idux/compare/v1.12.2...v2.0.0-beta.5) (2024-01-08)


### Bug Fixes

* **cdk:drag-drop:** remove user-select none style ([#1743](https://github.com/IDuxFE/idux/issues/1743)) ([d76dcda](https://github.com/IDuxFE/idux/commit/d76dcdabf443c1aa3399d82271fbbcbee79e260f))
* **cdk:forms:** interactions trigger dosen't work ([#1770](https://github.com/IDuxFE/idux/issues/1770)) ([fc44cbf](https://github.com/IDuxFE/idux/commit/fc44cbf912b2ba78f4847ad599d64d89464c408a))
* **cdk:popper:** modify default placement to `bottomStart` ([#1785](https://github.com/IDuxFE/idux/issues/1785)) ([5d9ddc4](https://github.com/IDuxFE/idux/commit/5d9ddc4d9e21226c9d7ef89b223cc4eb574ac611))
* **comp:button:** pointer events sholud be none when disabled ([#1744](https://github.com/IDuxFE/idux/issues/1744)) ([2ca124d](https://github.com/IDuxFE/idux/commit/2ca124d5b8ee8a20496e67970d0e563fe2e8dba1))
* **comp:cascader:** the value is incorrect after clicking the clear icon ([#1774](https://github.com/IDuxFE/idux/issues/1774)) ([0134f36](https://github.com/IDuxFE/idux/commit/0134f36c60140a6dcfe2864ce93c7e7ddce60e01))
* **comp:checkbox:** button theme not registered ([#1758](https://github.com/IDuxFE/idux/issues/1758)) ([1c68326](https://github.com/IDuxFE/idux/commit/1c6832680e58c20cb134eb5f9443e6ba1370b4d3))
* **comp:collapse:** modify header font-size to fontSizeHeaderSm ([#1790](https://github.com/IDuxFE/idux/issues/1790)) ([664c34b](https://github.com/IDuxFE/idux/commit/664c34bb1b1b5a00b8685a13742f400a2169f8ed))
* **comp:desc:** header component does not take effect ([#1742](https://github.com/IDuxFE/idux/issues/1742)) ([dd1aab8](https://github.com/IDuxFE/idux/commit/dd1aab86dc429858d8919ff9c438839d7f688e32))
* **comp:desc:** use div to wrap header slot ([#1752](https://github.com/IDuxFE/idux/issues/1752)) ([dd31ee4](https://github.com/IDuxFE/idux/commit/dd31ee4aee432327eab90356625bbd8ed91c01af))
* **comp:head:** modify header bar style ([#1781](https://github.com/IDuxFE/idux/issues/1781)) ([12278ef](https://github.com/IDuxFE/idux/commit/12278ef297d1878a7cd7e273f542a2e0c87b3048))
* **comp:input:** sufix click does not effect ([#1745](https://github.com/IDuxFE/idux/issues/1745)) ([4769dcd](https://github.com/IDuxFE/idux/commit/4769dcd7f58f56662b6098e77ad9009aa2eafdea))
* **comp:modal:** adjust the icon of the modal that confirm the mode ([#1763](https://github.com/IDuxFE/idux/issues/1763)) ([6227d4a](https://github.com/IDuxFE/idux/commit/6227d4adf9ecfeb24938c1fe56f150b51c996b8c))
* **comp:modal:** fix adjust modal icon height ([#1762](https://github.com/IDuxFE/idux/issues/1762)) ([019674d](https://github.com/IDuxFE/idux/commit/019674d091296ff5d709fa6e62b3617d5335172b))
* **comp:pagination:** change lg size font size to fontSizeSm ([#1761](https://github.com/IDuxFE/idux/issues/1761)) ([5669abc](https://github.com/IDuxFE/idux/commit/5669abcc0f0eaf8e8865c9d512b6246b389797b9))
* **comp:popover,tooltip:** replace paddings with theme variables ([#1780](https://github.com/IDuxFE/idux/issues/1780)) ([0c2be7b](https://github.com/IDuxFE/idux/commit/0c2be7b23582e13cbf1595703cfc90b2584a1739))
* **comp:radio:** gap behaves abnormally when configured without 0px ([#1740](https://github.com/IDuxFE/idux/issues/1740)) ([9ecd14a](https://github.com/IDuxFE/idux/commit/9ecd14aa5663399f1e3c92d3f40d8f5f05ad9dee))
* **comp:select:** selectOptionFontSize theme var reference error ([#1777](https://github.com/IDuxFE/idux/issues/1777)) ([0e0db55](https://github.com/IDuxFE/idux/commit/0e0db55b993f95ad86d2797e071c7b9dc6546b60))
* **comp:table:** pagination should hide when data empty ([#1782](https://github.com/IDuxFE/idux/issues/1782)) ([85d80e1](https://github.com/IDuxFE/idux/commit/85d80e174ad0fb81c7b04001a67bc86cdf98479b))
* **comp:table:** scroll classes is determined by scroll overflowed ([#1798](https://github.com/IDuxFE/idux/issues/1798)) ([dfbaec7](https://github.com/IDuxFE/idux/commit/dfbaec78965f7d29b994842845c148b9ee7ec5f3))
* **comp:table:** table header not visible when width not collected ([#1794](https://github.com/IDuxFE/idux/issues/1794)) ([7a1cd70](https://github.com/IDuxFE/idux/commit/7a1cd702e367fa494fe507c83231f4529ed56ee5))
* **comp:tabs:** tabs segment mod nav font-weight should be normal ([#1788](https://github.com/IDuxFE/idux/issues/1788)) ([7a8a89f](https://github.com/IDuxFE/idux/commit/7a8a89fb1b5440abe93cee14d9a6a21e4a163d17))
* **comp:tag:** modify tag normal bg color ([#1792](https://github.com/IDuxFE/idux/issues/1792)) ([5990a28](https://github.com/IDuxFE/idux/commit/5990a284794ecfb10595c8d2cfede460ba3499ed))
* **comp:timeline:** modify contentMarginBottom to marginSizeLg ([#1791](https://github.com/IDuxFE/idux/issues/1791)) ([bc3b27f](https://github.com/IDuxFE/idux/commit/bc3b27f453adb23202ea7a0de08238ede3f5eb30))
* **comp:tree:** update tree line style ([#1783](https://github.com/IDuxFE/idux/issues/1783)) ([ca64a1e](https://github.com/IDuxFE/idux/commit/ca64a1e0b0e60bfa301aa78518b173b6668be4dd))
* **comp:tree:** virtual treeNode slots not passed ([#1799](https://github.com/IDuxFE/idux/issues/1799)) ([f9361f7](https://github.com/IDuxFE/idux/commit/f9361f7fd102846b2a5183dd72620bcc3f583c6f))
* **comp:upload:** file is not uploaded when maxCount is 1 ([#1786](https://github.com/IDuxFE/idux/issues/1786)) ([400a0b4](https://github.com/IDuxFE/idux/commit/400a0b4cb1db93f8354e53c97c3384115ae04bae))
* **comp:upload:** file remove icon should be 'close' ([#1787](https://github.com/IDuxFE/idux/issues/1787)) ([f862fdf](https://github.com/IDuxFE/idux/commit/f862fdf59e4c22cf8171e6e2e7f650940120baba))
* **comp:** modify offline color token ([#1789](https://github.com/IDuxFE/idux/issues/1789)) ([00cd10c](https://github.com/IDuxFE/idux/commit/00cd10cd033c37e6c83e3a8aa5689d8b8bc85d86))
* **pro:layout:** dark theme overlay menu style error ([#1771](https://github.com/IDuxFE/idux/issues/1771)) ([64169d2](https://github.com/IDuxFE/idux/commit/64169d270741f242ecfcae49cd749b5fce59391b))
* **pro:layout:** logo title color theme var reference error ([#1759](https://github.com/IDuxFE/idux/issues/1759)) ([8fced5c](https://github.com/IDuxFE/idux/commit/8fced5c6262d842f88ccd8c3d4c09660a9ef0835))
* **pro:layout:** style error when theme style not injected ([#1769](https://github.com/IDuxFE/idux/issues/1769)) ([e216b08](https://github.com/IDuxFE/idux/commit/e216b08b90da1f9857b36cd40749f8025bab9c58))
* **pro:search:** click is correct when key is zero ([#1748](https://github.com/IDuxFE/idux/issues/1748)) ([9d996ce](https://github.com/IDuxFE/idux/commit/9d996cedbfb1c6748911ae6e6e3e263177444737))
* **pro:search:** container zIndex shouldn't be set when not focused ([#1795](https://github.com/IDuxFE/idux/issues/1795)) ([613079d](https://github.com/IDuxFE/idux/commit/613079d37e43bcf3c36cd05f4dcbeb0cdec4ab88))
* **pro:search:** non-multiple field created state should be overwritten by new state ([#1778](https://github.com/IDuxFE/idux/issues/1778)) ([617c192](https://github.com/IDuxFE/idux/commit/617c192e190ef902e591b4fb3e1de6227ee50946))
* **pro:search:** replace spacing with theme tokens ([#1793](https://github.com/IDuxFE/idux/issues/1793)) ([6505440](https://github.com/IDuxFE/idux/commit/65054408d5dc1ea5ddff19cb3b34c9087faba995))
* **pro:search:** searchable fields should keep search text after value change ([#1796](https://github.com/IDuxFE/idux/issues/1796)) ([97cf777](https://github.com/IDuxFE/idux/commit/97cf77786e8bab7303c3dc212a80b5c465ed772b))
* **pro:table:** layoutool checkbox shouldn't be checkable when disabled ([#1741](https://github.com/IDuxFE/idux/issues/1741)) ([0905872](https://github.com/IDuxFE/idux/commit/0905872941527f73d5acf56e0dc18d4768c2ad11))
* **pro:transfer:** maximum recursive updates exceeded under vue 3.4 ([4d8e1c8](https://github.com/IDuxFE/idux/commit/4d8e1c86d2f39c69206a4324dbdf7421ba44f3fb))
* **pro:transfer:** maximum recursive updates exceeded under vue 3.4 ([e511253](https://github.com/IDuxFE/idux/commit/e511253fa9654247b5c68db2bf176b38cbe28306))
* style dependencies missing in on-demand import entries ([#1755](https://github.com/IDuxFE/idux/issues/1755)) ([4b97958](https://github.com/IDuxFE/idux/commit/4b979588419d125bd13ce83425700961bf1dfbcf))


### Features

* add dark theme ([#1751](https://github.com/IDuxFE/idux/issues/1751)) ([415f07f](https://github.com/IDuxFE/idux/commit/415f07f5c5a23ac1737865b945417e1424a7086b))
* add theme entries for on-demand import ([#1756](https://github.com/IDuxFE/idux/issues/1756)) ([093641f](https://github.com/IDuxFE/idux/commit/093641f62c11d8d0737a0b54ee4a82402d476eef))
* **cdk:forms:** add `interactions` trigger ([#1766](https://github.com/IDuxFE/idux/issues/1766)) ([83c60e7](https://github.com/IDuxFE/idux/commit/83c60e729ec1d1979a1250f1d1cd88583a4be5ec))
* **cdk:scroll:** virtual scroll supports horizontal ([#1775](https://github.com/IDuxFE/idux/issues/1775)) ([77a0411](https://github.com/IDuxFE/idux/commit/77a0411370fb88e15e192850b57ae9bc5956a884))
* **cdk:theme:** add cdk theme support ([#1739](https://github.com/IDuxFE/idux/issues/1739)) ([ab9cb89](https://github.com/IDuxFE/idux/commit/ab9cb894e44be39dcf1310a4a0ff3a66be1d3649))
* **comp:drawer:** distance is configurable and determined by drawer size ([#1767](https://github.com/IDuxFE/idux/issues/1767)) ([4420e37](https://github.com/IDuxFE/idux/commit/4420e37000a2a9512e86d6a6292cc5ad3dada40f))
* **comp:table:** add insetShadow to horizontal overlowed container ([#1768](https://github.com/IDuxFE/idux/issues/1768)) ([2d51ad6](https://github.com/IDuxFE/idux/commit/2d51ad69eb37eeaa012a3a06f133a2535f40a4e3))
* **comp:table:** add virtualHorizontal support ([#1776](https://github.com/IDuxFE/idux/issues/1776)) ([23a8484](https://github.com/IDuxFE/idux/commit/23a84844a4d03446059171f230674bc22eec1eaa))
* **comp:table:** change rowHeight theme tokens to paddings ([#1760](https://github.com/IDuxFE/idux/issues/1760)) ([c9b4ef7](https://github.com/IDuxFE/idux/commit/c9b4ef741fde5782d4c0bc95177527e0ac252cf5))
* **comp:table:** column align supports cell and title ([#1784](https://github.com/IDuxFE/idux/issues/1784)) ([7a69ea1](https://github.com/IDuxFE/idux/commit/7a69ea147bbabd269d7cb36b3d914a1b2969e316))
* **comp:tag:** support compact group tags ([#1779](https://github.com/IDuxFE/idux/issues/1779)) ([318d8ef](https://github.com/IDuxFE/idux/commit/318d8efa3700c1f8da8a39e11bf5fbd236e26626))
* **comp:theme:** root level IxThemeProvider is no longer needed ([#1765](https://github.com/IDuxFE/idux/issues/1765)) ([bd5603e](https://github.com/IDuxFE/idux/commit/bd5603e2064bad94daec56e61e1672226a95d8a2))
* dynamic theme with theme tokens is now supported ([#1737](https://github.com/IDuxFE/idux/issues/1737)) ([5976f6d](https://github.com/IDuxFE/idux/commit/5976f6dcfecd276ad7c3406786266f65453da8dd))
* modify disable color theme tokens ([#1764](https://github.com/IDuxFE/idux/issues/1764)) ([33b3d4d](https://github.com/IDuxFE/idux/commit/33b3d4d71634942a288470b06793b9a296ba4a29))
* remove typography support ([#1738](https://github.com/IDuxFE/idux/issues/1738)) ([5d06267](https://github.com/IDuxFE/idux/commit/5d0626761f45355f436d0a88f3a8f3c3a37ae58d))


### BREAKING CHANGES

* **cdk:scroll:** itemHeight is deprecated, use rowHeight instead
* **cdk:scroll:** itemRender is deprecated, use rowRender instead
* typography is removed
* original css vars and less vars are removed
* original default theme is removed, seer is now default theme
* original style entries is removed, now only index is provided





# [2.0.0-beta.4](https://github.com/IDuxFE/idux/compare/v1.12.2...v2.0.0-beta.4) (2023-12-27)


### Bug Fixes

* **cdk:drag-drop:** remove user-select none style ([#1743](https://github.com/IDuxFE/idux/issues/1743)) ([d76dcda](https://github.com/IDuxFE/idux/commit/d76dcdabf443c1aa3399d82271fbbcbee79e260f))
* **cdk:forms:** interactions trigger dosen't work ([#1770](https://github.com/IDuxFE/idux/issues/1770)) ([c099b1a](https://github.com/IDuxFE/idux/commit/c099b1a50545ecc28c40a7610320614dbf23866e))
* **comp:button:** pointer events sholud be none when disabled ([#1744](https://github.com/IDuxFE/idux/issues/1744)) ([2ca124d](https://github.com/IDuxFE/idux/commit/2ca124d5b8ee8a20496e67970d0e563fe2e8dba1))
* **comp:cascader:** the value is incorrect after clicking the clear icon ([#1774](https://github.com/IDuxFE/idux/issues/1774)) ([337c894](https://github.com/IDuxFE/idux/commit/337c8947a87a9986419de0927dcc290ecb1abc2a))
* **comp:checkbox:** button theme not registered ([#1758](https://github.com/IDuxFE/idux/issues/1758)) ([534cf7e](https://github.com/IDuxFE/idux/commit/534cf7e7c0a0d707393dcc97f85f5f4918f23d56))
* **comp:desc:** header component does not take effect ([#1742](https://github.com/IDuxFE/idux/issues/1742)) ([dd1aab8](https://github.com/IDuxFE/idux/commit/dd1aab86dc429858d8919ff9c438839d7f688e32))
* **comp:desc:** use div to wrap header slot ([#1752](https://github.com/IDuxFE/idux/issues/1752)) ([dd31ee4](https://github.com/IDuxFE/idux/commit/dd31ee4aee432327eab90356625bbd8ed91c01af))
* **comp:input:** sufix click does not effect ([#1745](https://github.com/IDuxFE/idux/issues/1745)) ([4769dcd](https://github.com/IDuxFE/idux/commit/4769dcd7f58f56662b6098e77ad9009aa2eafdea))
* **comp:modal:** adjust the icon of the modal that confirm the mode ([#1763](https://github.com/IDuxFE/idux/issues/1763)) ([142a0ef](https://github.com/IDuxFE/idux/commit/142a0ef8cb2ba28216d2245569aacd9929b9549d))
* **comp:modal:** fix adjust modal icon height ([#1762](https://github.com/IDuxFE/idux/issues/1762)) ([e248941](https://github.com/IDuxFE/idux/commit/e2489411de67425b255e92ce0e38eddb17f64fd7))
* **comp:pagination:** change lg size font size to fontSizeSm ([#1761](https://github.com/IDuxFE/idux/issues/1761)) ([076d924](https://github.com/IDuxFE/idux/commit/076d9242092735b71dc52d283b33c094ff592b5c))
* **comp:radio:** gap behaves abnormally when configured without 0px ([#1740](https://github.com/IDuxFE/idux/issues/1740)) ([9ecd14a](https://github.com/IDuxFE/idux/commit/9ecd14aa5663399f1e3c92d3f40d8f5f05ad9dee))
* **comp:select:** selectOptionFontSize theme var reference error ([#1777](https://github.com/IDuxFE/idux/issues/1777)) ([3cd5982](https://github.com/IDuxFE/idux/commit/3cd5982632eb4eca1bb03d24c7b1f16976d1010f))
* **pro:layout:** dark theme overlay menu style error ([#1771](https://github.com/IDuxFE/idux/issues/1771)) ([98c6d98](https://github.com/IDuxFE/idux/commit/98c6d98a30ae24c99913de4b3aafcd2ebe5ec595))
* **pro:layout:** logo title color theme var reference error ([#1759](https://github.com/IDuxFE/idux/issues/1759)) ([f44039d](https://github.com/IDuxFE/idux/commit/f44039d1dac65480ddde1a3b7afbaf3e9fefa6ba))
* **pro:layout:** style error when theme style not injected ([#1769](https://github.com/IDuxFE/idux/issues/1769)) ([f7bbf20](https://github.com/IDuxFE/idux/commit/f7bbf2072fdc1b84486882659a1e3c1515bd81f8))
* **pro:search:** click is correct when key is zero ([#1748](https://github.com/IDuxFE/idux/issues/1748)) ([9d996ce](https://github.com/IDuxFE/idux/commit/9d996cedbfb1c6748911ae6e6e3e263177444737))
* **pro:table:** layoutool checkbox shouldn't be checkable when disabled ([#1741](https://github.com/IDuxFE/idux/issues/1741)) ([0905872](https://github.com/IDuxFE/idux/commit/0905872941527f73d5acf56e0dc18d4768c2ad11))
* style dependencies missing in on-demand import entries ([#1755](https://github.com/IDuxFE/idux/issues/1755)) ([0bd7cc9](https://github.com/IDuxFE/idux/commit/0bd7cc9b796e4081bf08b0527af5259c46e83d98))


### Features

* add dark theme ([#1751](https://github.com/IDuxFE/idux/issues/1751)) ([a4540ec](https://github.com/IDuxFE/idux/commit/a4540ecb226f110b0fdd74a4d4525427db02d926))
* add theme entries for on-demand import ([#1756](https://github.com/IDuxFE/idux/issues/1756)) ([aa0eaaa](https://github.com/IDuxFE/idux/commit/aa0eaaaf76525c4d6e134332b31348332e79f938))
* **cdk:forms:** add `interactions` trigger ([#1766](https://github.com/IDuxFE/idux/issues/1766)) ([dcdbfb3](https://github.com/IDuxFE/idux/commit/dcdbfb3effa0461edb0806fe4b08b59c78e45833))
* **cdk:scroll:** virtual scroll supports horizontal ([#1775](https://github.com/IDuxFE/idux/issues/1775)) ([4b39705](https://github.com/IDuxFE/idux/commit/4b39705af35cff3422dc7666777409c2f80030b1))
* **cdk:theme:** add cdk theme support ([#1739](https://github.com/IDuxFE/idux/issues/1739)) ([6616ebc](https://github.com/IDuxFE/idux/commit/6616ebc5472367231d52f9f55a923b1504a8c5dc))
* **comp:drawer:** distance is configurable and determined by drawer size ([#1767](https://github.com/IDuxFE/idux/issues/1767)) ([949e855](https://github.com/IDuxFE/idux/commit/949e855c4d19caab5f174f96816a88f3203818f9))
* **comp:table:** add insetShadow to horizontal overlowed container ([#1768](https://github.com/IDuxFE/idux/issues/1768)) ([65a1aca](https://github.com/IDuxFE/idux/commit/65a1acac6de4c3cfc1116af54f45ceb4ac0562e6))
* **comp:table:** add virtualHorizontal support ([#1776](https://github.com/IDuxFE/idux/issues/1776)) ([bb77f91](https://github.com/IDuxFE/idux/commit/bb77f9138ee0b46408f07b9149092f7964babc64))
* **comp:table:** change rowHeight theme tokens to paddings ([#1760](https://github.com/IDuxFE/idux/issues/1760)) ([48f0394](https://github.com/IDuxFE/idux/commit/48f03943b5adb6a3fb731d14077bc84fb0526884))
* **comp:theme:** root level IxThemeProvider is no longer needed ([#1765](https://github.com/IDuxFE/idux/issues/1765)) ([3565d49](https://github.com/IDuxFE/idux/commit/3565d49edc951dabfd6ea25150923be70d1777ff))
* dynamic theme with theme tokens is now supported ([#1737](https://github.com/IDuxFE/idux/issues/1737)) ([f587f3a](https://github.com/IDuxFE/idux/commit/f587f3aa856b0576a6d9bb8b1d428301c4f5cccb))
* modify disable color theme tokens ([#1764](https://github.com/IDuxFE/idux/issues/1764)) ([29566d5](https://github.com/IDuxFE/idux/commit/29566d5867ea08db3d5a9efa902ebe5d29328d7d))
* remove typography support ([#1738](https://github.com/IDuxFE/idux/issues/1738)) ([65a9c6c](https://github.com/IDuxFE/idux/commit/65a9c6c2fe9f1b915be15dbe4d420f91299256b4))


### BREAKING CHANGES

* **cdk:scroll:** itemHeight is deprecated, use rowHeight instead
* **cdk:scroll:** itemRender is deprecated, use rowRender instead
* typography is removed
* original css vars and less vars are removed
* original default theme is removed, seer is now default theme
* original style entries is removed, now only index is provided





# [2.0.0-beta.3](https://github.com/IDuxFE/idux/compare/v1.12.3...v2.0.0-beta.3) (2023-12-11)


### Bug Fixes

* **cdk:forms:** interactions trigger dosen't work ([#1770](https://github.com/IDuxFE/idux/issues/1770)) ([c099b1a](https://github.com/IDuxFE/idux/commit/c099b1a50545ecc28c40a7610320614dbf23866e))
* **comp:checkbox:** button theme not registered ([#1758](https://github.com/IDuxFE/idux/issues/1758)) ([534cf7e](https://github.com/IDuxFE/idux/commit/534cf7e7c0a0d707393dcc97f85f5f4918f23d56))
* **comp:modal:** adjust the icon of the modal that confirm the mode ([#1763](https://github.com/IDuxFE/idux/issues/1763)) ([142a0ef](https://github.com/IDuxFE/idux/commit/142a0ef8cb2ba28216d2245569aacd9929b9549d))
* **comp:modal:** fix adjust modal icon height ([#1762](https://github.com/IDuxFE/idux/issues/1762)) ([e248941](https://github.com/IDuxFE/idux/commit/e2489411de67425b255e92ce0e38eddb17f64fd7))
* **comp:pagination:** change lg size font size to fontSizeSm ([#1761](https://github.com/IDuxFE/idux/issues/1761)) ([076d924](https://github.com/IDuxFE/idux/commit/076d9242092735b71dc52d283b33c094ff592b5c))
* **pro:layout:** dark theme overlay menu style error ([#1771](https://github.com/IDuxFE/idux/issues/1771)) ([98c6d98](https://github.com/IDuxFE/idux/commit/98c6d98a30ae24c99913de4b3aafcd2ebe5ec595))
* **pro:layout:** logo title color theme var reference error ([#1759](https://github.com/IDuxFE/idux/issues/1759)) ([f44039d](https://github.com/IDuxFE/idux/commit/f44039d1dac65480ddde1a3b7afbaf3e9fefa6ba))
* **pro:layout:** style error when theme style not injected ([#1769](https://github.com/IDuxFE/idux/issues/1769)) ([f7bbf20](https://github.com/IDuxFE/idux/commit/f7bbf2072fdc1b84486882659a1e3c1515bd81f8))
* style dependencies missing in on-demand import entries ([#1755](https://github.com/IDuxFE/idux/issues/1755)) ([0bd7cc9](https://github.com/IDuxFE/idux/commit/0bd7cc9b796e4081bf08b0527af5259c46e83d98))


### Features

* add dark theme ([#1751](https://github.com/IDuxFE/idux/issues/1751)) ([a4540ec](https://github.com/IDuxFE/idux/commit/a4540ecb226f110b0fdd74a4d4525427db02d926))
* add theme entries for on-demand import ([#1756](https://github.com/IDuxFE/idux/issues/1756)) ([aa0eaaa](https://github.com/IDuxFE/idux/commit/aa0eaaaf76525c4d6e134332b31348332e79f938))
* **cdk:forms:** add `interactions` trigger ([#1766](https://github.com/IDuxFE/idux/issues/1766)) ([dcdbfb3](https://github.com/IDuxFE/idux/commit/dcdbfb3effa0461edb0806fe4b08b59c78e45833))
* **cdk:theme:** add cdk theme support ([#1739](https://github.com/IDuxFE/idux/issues/1739)) ([6616ebc](https://github.com/IDuxFE/idux/commit/6616ebc5472367231d52f9f55a923b1504a8c5dc))
* **comp:drawer:** distance is configurable and determined by drawer size ([#1767](https://github.com/IDuxFE/idux/issues/1767)) ([949e855](https://github.com/IDuxFE/idux/commit/949e855c4d19caab5f174f96816a88f3203818f9))
* **comp:table:** add insetShadow to horizontal overlowed container ([#1768](https://github.com/IDuxFE/idux/issues/1768)) ([65a1aca](https://github.com/IDuxFE/idux/commit/65a1acac6de4c3cfc1116af54f45ceb4ac0562e6))
* **comp:table:** change rowHeight theme tokens to paddings ([#1760](https://github.com/IDuxFE/idux/issues/1760)) ([48f0394](https://github.com/IDuxFE/idux/commit/48f03943b5adb6a3fb731d14077bc84fb0526884))
* **comp:theme:** root level IxThemeProvider is no longer needed ([#1765](https://github.com/IDuxFE/idux/issues/1765)) ([3565d49](https://github.com/IDuxFE/idux/commit/3565d49edc951dabfd6ea25150923be70d1777ff))
* dynamic theme with theme tokens is now supported ([#1737](https://github.com/IDuxFE/idux/issues/1737)) ([f587f3a](https://github.com/IDuxFE/idux/commit/f587f3aa856b0576a6d9bb8b1d428301c4f5cccb))
* modify disable color theme tokens ([#1764](https://github.com/IDuxFE/idux/issues/1764)) ([29566d5](https://github.com/IDuxFE/idux/commit/29566d5867ea08db3d5a9efa902ebe5d29328d7d))
* remove typography support ([#1738](https://github.com/IDuxFE/idux/issues/1738)) ([65a9c6c](https://github.com/IDuxFE/idux/commit/65a9c6c2fe9f1b915be15dbe4d420f91299256b4))


### BREAKING CHANGES

* typography is removed
* original css vars and less vars are removed
* original default theme is removed, seer is now default theme
* original style entries is removed, now only index is provided





# [2.0.0-beta.2](https://github.com/sallerli1/idux/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2023-12-01)


### Bug Fixes

* **comp:checkbox:** button theme not registered ([#1758](https://github.com/sallerli1/idux/issues/1758)) ([64bb7a3](https://github.com/sallerli1/idux/commit/64bb7a36d4656ac35119d0daed559073e3a4a8ba))
* style dependencies missing in on-demand import entries ([#1755](https://github.com/sallerli1/idux/issues/1755)) ([48b7e73](https://github.com/sallerli1/idux/commit/48b7e736963436ff4527d81af7dd89765c4aec93))


### Features

* add theme entries for on-demand import ([#1756](https://github.com/sallerli1/idux/issues/1756)) ([67173bf](https://github.com/sallerli1/idux/commit/67173bf7e39371f7d039ada1d6aeab95e32ab6b9))





# [2.0.0-beta.1](https://github.com/sallerli1/idux/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2023-11-29)


### Features

* add dark theme ([#1751](https://github.com/sallerli1/idux/issues/1751)) ([411ed2b](https://github.com/sallerli1/idux/commit/411ed2b90f15e3b8c7f1989429fa023065304143))





# [2.0.0-beta.0](https://github.com/sallerli1/idux/compare/v1.12.2...v2.0.0-beta.0) (2023-11-23)


### Features

* **cdk:theme:** add cdk theme support ([#1739](https://github.com/sallerli1/idux/issues/1739)) ([f34f0e5](https://github.com/sallerli1/idux/commit/f34f0e573d294719abe216dd2f3fbf196bcd021b))
* dynamic theme with theme tokens is now supported ([#1737](https://github.com/sallerli1/idux/issues/1737)) ([ea22a8f](https://github.com/sallerli1/idux/commit/ea22a8fa8fb863a4c546b9af62025718779d3463))
* remove typography support ([#1738](https://github.com/sallerli1/idux/issues/1738)) ([ed6462a](https://github.com/sallerli1/idux/commit/ed6462ac516a8aaec6cc9774f9ee7210e593ffc0))


### BREAKING CHANGES

* typography is removed
* original css vars and less vars are removed
* original default theme is removed, seer is now default theme
* original style entries is removed, now only index is provided

## [1.12.4](https://github.com/IDuxFE/idux/compare/v1.12.2...v1.12.4) (2024-01-02)


### Bug Fixes

* **cdk:drag-drop:** remove user-select none style ([#1743](https://github.com/IDuxFE/idux/issues/1743)) ([d76dcda](https://github.com/IDuxFE/idux/commit/d76dcdabf443c1aa3399d82271fbbcbee79e260f))
* **comp:button:** pointer events sholud be none when disabled ([#1744](https://github.com/IDuxFE/idux/issues/1744)) ([2ca124d](https://github.com/IDuxFE/idux/commit/2ca124d5b8ee8a20496e67970d0e563fe2e8dba1))
* **comp:desc:** header component does not take effect ([#1742](https://github.com/IDuxFE/idux/issues/1742)) ([dd1aab8](https://github.com/IDuxFE/idux/commit/dd1aab86dc429858d8919ff9c438839d7f688e32))
* **comp:desc:** use div to wrap header slot ([#1752](https://github.com/IDuxFE/idux/issues/1752)) ([dd31ee4](https://github.com/IDuxFE/idux/commit/dd31ee4aee432327eab90356625bbd8ed91c01af))
* **comp:input:** sufix click does not effect ([#1745](https://github.com/IDuxFE/idux/issues/1745)) ([4769dcd](https://github.com/IDuxFE/idux/commit/4769dcd7f58f56662b6098e77ad9009aa2eafdea))
* **comp:radio:** gap behaves abnormally when configured without 0px ([#1740](https://github.com/IDuxFE/idux/issues/1740)) ([9ecd14a](https://github.com/IDuxFE/idux/commit/9ecd14aa5663399f1e3c92d3f40d8f5f05ad9dee))
* **pro:search:** click is correct when key is zero ([#1748](https://github.com/IDuxFE/idux/issues/1748)) ([9d996ce](https://github.com/IDuxFE/idux/commit/9d996cedbfb1c6748911ae6e6e3e263177444737))
* **pro:search:** non-multiple field created state should be overwritten by new state ([#1778](https://github.com/IDuxFE/idux/issues/1778)) ([617c192](https://github.com/IDuxFE/idux/commit/617c192e190ef902e591b4fb3e1de6227ee50946))
* **pro:table:** layoutool checkbox shouldn't be checkable when disabled ([#1741](https://github.com/IDuxFE/idux/issues/1741)) ([0905872](https://github.com/IDuxFE/idux/commit/0905872941527f73d5acf56e0dc18d4768c2ad11))

## [1.12.3](https://github.com/IDuxFE/idux/compare/v1.12.2...v1.12.3) (2023-12-05)


### Bug Fixes

* **cdk:drag-drop:** remove user-select none style ([#1743](https://github.com/IDuxFE/idux/issues/1743)) ([d76dcda](https://github.com/IDuxFE/idux/commit/d76dcdabf443c1aa3399d82271fbbcbee79e260f))
* **comp:button:** pointer events sholud be none when disabled ([#1744](https://github.com/IDuxFE/idux/issues/1744)) ([2ca124d](https://github.com/IDuxFE/idux/commit/2ca124d5b8ee8a20496e67970d0e563fe2e8dba1))
* **comp:desc:** header component does not take effect ([#1742](https://github.com/IDuxFE/idux/issues/1742)) ([dd1aab8](https://github.com/IDuxFE/idux/commit/dd1aab86dc429858d8919ff9c438839d7f688e32))
* **comp:desc:** use div to wrap header slot ([#1752](https://github.com/IDuxFE/idux/issues/1752)) ([dd31ee4](https://github.com/IDuxFE/idux/commit/dd31ee4aee432327eab90356625bbd8ed91c01af))
* **comp:input:** sufix click does not effect ([#1745](https://github.com/IDuxFE/idux/issues/1745)) ([4769dcd](https://github.com/IDuxFE/idux/commit/4769dcd7f58f56662b6098e77ad9009aa2eafdea))
* **comp:radio:** gap behaves abnormally when configured without 0px ([#1740](https://github.com/IDuxFE/idux/issues/1740)) ([9ecd14a](https://github.com/IDuxFE/idux/commit/9ecd14aa5663399f1e3c92d3f40d8f5f05ad9dee))
* **pro:search:** click is correct when key is zero ([#1748](https://github.com/IDuxFE/idux/issues/1748)) ([9d996ce](https://github.com/IDuxFE/idux/commit/9d996cedbfb1c6748911ae6e6e3e263177444737))
* **pro:table:** layoutool checkbox shouldn't be checkable when disabled ([#1741](https://github.com/IDuxFE/idux/issues/1741)) ([0905872](https://github.com/IDuxFE/idux/commit/0905872941527f73d5acf56e0dc18d4768c2ad11))


## [1.12.2](https://github.com/IDuxFE/idux/compare/v1.12.1...v1.12.2) (2023-11-06)


### Bug Fixes

* **comp:table:** tree cell with no siblings should show indent line ([#1735](https://github.com/IDuxFE/idux/issues/1735)) ([bb75c13](https://github.com/IDuxFE/idux/commit/bb75c1337fe91c2372d07fb96b6c13b4d1734f7a))
* **pro:search:** rest count should hide when no item is overflowed ([#1736](https://github.com/IDuxFE/idux/issues/1736)) ([a436e92](https://github.com/IDuxFE/idux/commit/a436e921ded880b9e2eecc88efef63d2d27e90aa))





## [1.12.1](https://github.com/IDuxFE/idux/compare/v1.12.0...v1.12.1) (2023-11-03)


### Bug Fixes

* **comp:table:** expandable cell text not vertial aligned ([#1729](https://github.com/IDuxFE/idux/issues/1729)) ([4589e83](https://github.com/IDuxFE/idux/commit/4589e83b8eb95712189f040ed28761807ac5e844))
* **comp:text:** ellipsis doesn't work when there're line breaks ([#1730](https://github.com/IDuxFE/idux/issues/1730)) ([ed78fe3](https://github.com/IDuxFE/idux/commit/ed78fe38b169d3413ff436fc06babc053421aa9c))
* **comp:text:** text component should inherit attrs ([#1731](https://github.com/IDuxFE/idux/issues/1731)) ([75b49bf](https://github.com/IDuxFE/idux/commit/75b49bf09e9d780ff7ef6ff225198640e90c485e))
* **pro:search:** overflowd item count is incorrect ([#1732](https://github.com/IDuxFE/idux/issues/1732)) ([2e8fc95](https://github.com/IDuxFE/idux/commit/2e8fc9500ed741cb297ea428bf0c0b346607767a))
* **pro:search:** select in quickselect panel shouldn't have active value ([#1733](https://github.com/IDuxFE/idux/issues/1733)) ([a967f9b](https://github.com/IDuxFE/idux/commit/a967f9b64276592d4d1173112f8b0992abea03db))





# [1.12.0](https://github.com/IDuxFE/idux/compare/v1.11.2...v1.12.0) (2023-10-30)


### Bug Fixes

* **pro:search:** remote search not working ([#1727](https://github.com/IDuxFE/idux/issues/1727)) ([0d306ac](https://github.com/IDuxFE/idux/commit/0d306accc006171bcafac2c39228be32c79de530))
* **pro:search:** segment input title should be placeholder when empty ([#1724](https://github.com/IDuxFE/idux/issues/1724)) ([8902bb9](https://github.com/IDuxFE/idux/commit/8902bb982ce2539793631af1feca6ee7046b6485))
* **pro:search:** unconfirmed item sequence should change when update ([#1725](https://github.com/IDuxFE/idux/issues/1725)) ([34f9669](https://github.com/IDuxFE/idux/commit/34f9669bb274a7cc340e825c8a23f76e82ef8fb3))


### Features

* **comp:*:** all input components with overlay support focus and blur event ([#1714](https://github.com/IDuxFE/idux/issues/1714)) ([7b739aa](https://github.com/IDuxFE/idux/commit/7b739aaca85bfb0cfc675b88de06426579dc3b76))
* **comp:drawer,header,message,modal,notification:** all VNode props support render function now ([#1717](https://github.com/IDuxFE/idux/issues/1717)) ([69013e8](https://github.com/IDuxFE/idux/commit/69013e8ebb1a8cf3f5a409e7b4463c280b83f815))
* **comp:table:** add `pagination` slot ([#1716](https://github.com/IDuxFE/idux/issues/1716)) ([b653faf](https://github.com/IDuxFE/idux/commit/b653faff81ac5509c6de5b7795a45a4261743b21))
* **comp:table:** support `expandable.showLine` for tree data ([#1718](https://github.com/IDuxFE/idux/issues/1718)) ([4504c0f](https://github.com/IDuxFE/idux/commit/4504c0f4fcb1ff24f32f419c4364d80dc070d357))
* **pro:search:** add `useParser` api for value parsing ([#1721](https://github.com/IDuxFE/idux/issues/1721)) ([d96bed4](https://github.com/IDuxFE/idux/commit/d96bed4927ef98ab68b0010cfe8777450fd2da57))
* **pro:search:** support `concludeAllSelected` for select field ([#1726](https://github.com/IDuxFE/idux/issues/1726)) ([5e4c7e1](https://github.com/IDuxFE/idux/commit/5e4c7e14b85029623f33ce4ad42f0b17a2a606cc))
* **pro:search:** tree field supports `defaultExpandedKeys` ([#1728](https://github.com/IDuxFE/idux/issues/1728)) ([8120fdf](https://github.com/IDuxFE/idux/commit/8120fdfc0c266baa89622d7823ee99b37ac627b2))





## [1.11.2](https://github.com/IDuxFE/idux/compare/v1.11.1...v1.11.2) (2023-10-23)


### Bug Fixes

* **comp:upload:** controlled update should trigger upload and abort ([#1715](https://github.com/IDuxFE/idux/issues/1715)) ([c068cd4](https://github.com/IDuxFE/idux/commit/c068cd48b081c8f1a3b0c03e9f78151537d6781f))
* **comp:upload:** remove unecessary console log statement ([#1723](https://github.com/IDuxFE/idux/issues/1723)) ([c7b4c1f](https://github.com/IDuxFE/idux/commit/c7b4c1f74d92b8a51ef22bf5b09dc666bffc73b7))
* **pro:search:** segment input delete doesn't work after selecting all ([#1722](https://github.com/IDuxFE/idux/issues/1722)) ([1a34c13](https://github.com/IDuxFE/idux/commit/1a34c13dbee9596dc69e8ed6204d19b11524493e))





## [1.11.1](https://github.com/IDuxFE/idux/compare/v1.11.0...v1.11.1) (2023-10-17)


### Bug Fixes

* **pro:search:** placeholder not vertially centered ([#1713](https://github.com/IDuxFE/idux/issues/1713)) ([f05cc48](https://github.com/IDuxFE/idux/commit/f05cc4851a003f3bec4a9bf61657860701fa1efd))
* **pro:search:** select activeValue shouldn't change on mouse leave ([#1712](https://github.com/IDuxFE/idux/issues/1712)) ([a6d539a](https://github.com/IDuxFE/idux/commit/a6d539a576c0df230729dd79f07edf13d02f6bb3))





# [1.11.0](https://github.com/IDuxFE/idux/compare/v1.10.2...v1.11.0) (2023-10-07)


### Bug Fixes

* **comp:radio:** radio dot size and position shouldn't be constant ([#1707](https://github.com/IDuxFE/idux/issues/1707)) ([840eefe](https://github.com/IDuxFE/idux/commit/840eefef03633b2ecf5c9a481ddb36f63888cc8e))
* **comp:text:** native tooltip should show when not ellipsised ([#1709](https://github.com/IDuxFE/idux/issues/1709)) ([8513cd9](https://github.com/IDuxFE/idux/commit/8513cd92aad47081dd9ef160897bd388a88ffa68))
* **comp:text:** text blinks when content doesn't exceed one row ([#1706](https://github.com/IDuxFE/idux/issues/1706)) ([5afea2f](https://github.com/IDuxFE/idux/commit/5afea2f36f6a3a53c1d72fa37804f58a8f134a62))
* **comp:text:** use css ellipsis at one row to improve performance ([#1705](https://github.com/IDuxFE/idux/issues/1705)) ([271ef83](https://github.com/IDuxFE/idux/commit/271ef83dd5d88afff84e8007439e9b5a8d5546b0))
* **pro:search:** key duplication after controlled value change ([#1708](https://github.com/IDuxFE/idux/issues/1708)) ([3ae8dd2](https://github.com/IDuxFE/idux/commit/3ae8dd2a825483ce530abbf57a24cfb6fa99fa29))
* **pro:textarea:** readonly not working ([#1704](https://github.com/IDuxFE/idux/issues/1704)) ([6e82eb4](https://github.com/IDuxFE/idux/commit/6e82eb4cbc5a8a2b20f5d7315b8c0cedbfd96110))


### Features

* **comp:card:** `shadow` supports global config now ([#1696](https://github.com/IDuxFE/idux/issues/1696)) ([d3672cc](https://github.com/IDuxFE/idux/commit/d3672ccd8ba53f126b6ce7643fa3141e25b88c0e))
* **pro:search:** quickSelect prop supports object option ([#1697](https://github.com/IDuxFE/idux/issues/1697)) ([5259671](https://github.com/IDuxFE/idux/commit/52596710afee111bc5d98d145f4af5c3a516cd15))
* **pro:search:** searchField supports `keywordFallback` option ([#1698](https://github.com/IDuxFE/idux/issues/1698)) ([430c740](https://github.com/IDuxFE/idux/commit/430c74094cae6d99e27517d4060839f0d24a3670))





## [1.10.2](https://github.com/IDuxFE/idux/compare/v1.10.1...v1.10.2) (2023-09-25)


### Bug Fixes

* **comp:text:** copy icon of default global config error ([#1700](https://github.com/IDuxFE/idux/issues/1700)) ([7c26c81](https://github.com/IDuxFE/idux/commit/7c26c818ec581a4c1b4de7b79af0734fab0448a5))
* **comp:text:** expand icon shouldn't render when not ellipsised ([#1699](https://github.com/IDuxFE/idux/issues/1699)) ([43d489b](https://github.com/IDuxFE/idux/commit/43d489b0692e05cd7d3e3e0cd030a10751f7f781))





## [1.10.1](https://github.com/IDuxFE/idux/compare/v1.10.0...v1.10.1) (2023-09-18)


### Bug Fixes

* **comp:config:** modify seer global config ([#1695](https://github.com/IDuxFE/idux/issues/1695)) ([63878a5](https://github.com/IDuxFE/idux/commit/63878a5dbf15b28115d03f21b4cc6c1e0bb0b10d))
* **comp:icon:** three icon are added ([#1685](https://github.com/IDuxFE/idux/issues/1685)) ([bdb7ba1](https://github.com/IDuxFE/idux/commit/bdb7ba199dd914823bb04ec3a7cfa6a7869f6d2e))
* **comp:radio:** remove unnecessory console statement ([#1691](https://github.com/IDuxFE/idux/issues/1691)) ([f779ea2](https://github.com/IDuxFE/idux/commit/f779ea2f885e1c737de5444433446f096a112c66))
* **comp:stepper:** modify size config to `'sm'` for seer theme ([#1694](https://github.com/IDuxFE/idux/issues/1694)) ([51ae0b2](https://github.com/IDuxFE/idux/commit/51ae0b24365736f319862e4f86197bcdba355c73))
* **comp:tree:** change content horizontal padding to `0` ([#1686](https://github.com/IDuxFE/idux/issues/1686)) ([231a6ee](https://github.com/IDuxFE/idux/commit/231a6ee957145e02d20c3287e5e2747657f438f0))
* **pro:search:** name input width shouldn't exceeds container ([#1693](https://github.com/IDuxFE/idux/issues/1693)) ([fe42021](https://github.com/IDuxFE/idux/commit/fe4202104300b63d2ac3fde2df84a15e76b8832d))
* **pro:search:** name select overlay data blinks after closed ([#1692](https://github.com/IDuxFE/idux/issues/1692)) ([34034a3](https://github.com/IDuxFE/idux/commit/34034a3cf842c4d7f54c1207ba29022a1be3458b))
* **pro:search:** proSearch input shouldn't be auto focused in safari ([#1689](https://github.com/IDuxFE/idux/issues/1689)) ([e211465](https://github.com/IDuxFE/idux/commit/e211465f23f76c2e08a60d27ed424546109eb533))
* **pro:search:** segment input scroll event doesn't work in safari ([#1690](https://github.com/IDuxFE/idux/issues/1690)) ([1caabb8](https://github.com/IDuxFE/idux/commit/1caabb892f4b8bd543a92773cbb9717f6d4d0a20))





# [1.10.0](https://github.com/IDuxFE/idux/compare/v1.9.5...v1.10.0) (2023-09-11)


### Features

* **comp:table:** supports record for customCell of selectable column ([#1681](https://github.com/IDuxFE/idux/issues/1681)) ([b80ba68](https://github.com/IDuxFE/idux/commit/b80ba6802cf0e1dfa520565c38c816eb7c9c5af1))
* **comp:tabs:** customTitle supports `overflowed` paramater ([#1682](https://github.com/IDuxFE/idux/issues/1682)) ([5da8900](https://github.com/IDuxFE/idux/commit/5da8900279c8ce81c7e871029b3b47503fa33816))
* **comp:text:** rewrite component to provide better ellipsis support ([#1680](https://github.com/IDuxFE/idux/issues/1680)) ([fb1adb2](https://github.com/IDuxFE/idux/commit/fb1adb27657e21a1eddff253fb5c0137d44df281))
* **comp:upload:** add `onMaxCountExceeded` ([#1673](https://github.com/IDuxFE/idux/issues/1673)) ([8faddc1](https://github.com/IDuxFE/idux/commit/8faddc1388ddc8dae97814ece2ac3eef69c5c53f))
* **pro:search:** add `size` prop ([#1667](https://github.com/IDuxFE/idux/issues/1667)) ([e8068bd](https://github.com/IDuxFE/idux/commit/e8068bdc5f0136ad9c5057fe90f50546515d31da))





## [1.9.5](https://github.com/IDuxFE/idux/compare/v1.9.4...v1.9.5) (2023-09-04)


### Bug Fixes

* **comp:alert:** modify warning icon to `'exclamation-circle'` ([#1676](https://github.com/IDuxFE/idux/issues/1676)) ([3d9c265](https://github.com/IDuxFE/idux/commit/3d9c2657dfdecbd3185f90efd9d042540343fa8b))
* **comp:card:** footer button style should use class but not button ([#1677](https://github.com/IDuxFE/idux/issues/1677)) ([cf91774](https://github.com/IDuxFE/idux/commit/cf91774662bb84bd50ddfba77db4ff65df2e3a59))
* **comp:tree:** tree select disabled not right ([#1675](https://github.com/IDuxFE/idux/issues/1675)) ([c6b1bb3](https://github.com/IDuxFE/idux/commit/c6b1bb321f9a2eb698c9d5c02c18a67eb9af6f74))
* **comp:upload:** default icon config not right ([#1674](https://github.com/IDuxFE/idux/issues/1674)) ([0bf4f6b](https://github.com/IDuxFE/idux/commit/0bf4f6be6d812506d7848b58fd30044b9563722a))





## [1.9.4](https://github.com/IDuxFE/idux/compare/v1.9.3...v1.9.4) (2023-08-28)


### Bug Fixes

* **comp:input:** addon select should remove box-shadow when invalid ([#1665](https://github.com/IDuxFE/idux/issues/1665)) ([bb26dbb](https://github.com/IDuxFE/idux/commit/bb26dbbccc4987399e65f802395f0c3620c10b3b))
* **comp:pagination:** sizeChanger should be supported for simple mode ([#1663](https://github.com/IDuxFE/idux/issues/1663)) ([23178ed](https://github.com/IDuxFE/idux/commit/23178edca00e566a811fd148c5d2560654bf78f9))
* **comp:tree:** tree node disabled should be cascade ([#1666](https://github.com/IDuxFE/idux/issues/1666)) ([c57dfb3](https://github.com/IDuxFE/idux/commit/c57dfb3d5a7b5b4140e5c54b981574d7c364eec8))
* **pro:search:** search states should update when field changes ([#1662](https://github.com/IDuxFE/idux/issues/1662)) ([a564dd3](https://github.com/IDuxFE/idux/commit/a564dd30a3a73961c0b7f6d8d17949c156bc41b6))





## [1.9.3](https://github.com/IDuxFE/idux/compare/v1.9.2...v1.9.3) (2023-08-21)

### Bug Fixes

- **cdk:popper:** `display: none` reference is not treat as hidden ([#1659](https://github.com/IDuxFE/idux/issues/1659)) ([830be33](https://github.com/IDuxFE/idux/commit/830be33d41b4271c65107b15557ea91253ce90e2))
- **comp:alert:** alert content not aligined with pagination ([#1658](https://github.com/IDuxFE/idux/issues/1658)) ([f691999](https://github.com/IDuxFE/idux/commit/f6919999f20ba36c0618945c437e3f22537a62f4))
- **comp:card:** add css class to footer button ([#1660](https://github.com/IDuxFE/idux/issues/1660)) ([54f2c7f](https://github.com/IDuxFE/idux/commit/54f2c7fafe6cad925b2a80a37a146b0cb733b41e))
- **comp:drawer:** content first render should be delayed till visible ([#1657](https://github.com/IDuxFE/idux/issues/1657)) ([4e4542b](https://github.com/IDuxFE/idux/commit/4e4542bad43c90749d49309f873b8c804c5ce102))
- **pro:search:** onItemConfirm value is empty when item is removed ([#1661](https://github.com/IDuxFE/idux/issues/1661)) ([84f95d1](https://github.com/IDuxFE/idux/commit/84f95d1e2b0f4f3a64fcfc322f40ddbc81153fa9))
- **pro:search:** segment should init only when it's set inactive ([#1656](https://github.com/IDuxFE/idux/issues/1656)) ([6ae11ea](https://github.com/IDuxFE/idux/commit/6ae11ea0cc591beac35d9bff64fe6aa9e59ea65c))
- **pro:search:** segment with default value shouldn't be set active ([#1655](https://github.com/IDuxFE/idux/issues/1655)) ([97a40d6](https://github.com/IDuxFE/idux/commit/97a40d64db0d0a1c7e8f553b4adfd7fe071f8997))

## [1.9.2](https://github.com/IDuxFE/idux/compare/v1.9.1...v1.9.2) (2023-08-14)

### Bug Fixes

- **cdk:forms:** the status of control is incorrect with async validators ([#1645](https://github.com/IDuxFE/idux/issues/1645)) ([fa591b5](https://github.com/IDuxFE/idux/commit/fa591b5d8b7655971e1e2accbd2fb921a50319df))
- **cdk:popper:** popper shouldn't update if reference is display none ([#1653](https://github.com/IDuxFE/idux/issues/1653)) ([cf83513](https://github.com/IDuxFE/idux/commit/cf835133dae5ddfa58a2daac1a3e3e4e397feebd))
- **cdk:popper:** reference is hidden when ancestors are not visible ([#1648](https://github.com/IDuxFE/idux/issues/1648)) ([db00adb](https://github.com/IDuxFE/idux/commit/db00adbed7b2afcce6406239b59e8576cefd4d87))
- **comp:\*:** overlay options update should watch deep ([#1652](https://github.com/IDuxFE/idux/issues/1652)) ([e6f5fa2](https://github.com/IDuxFE/idux/commit/e6f5fa2cfac1d869ff6b4279456e44308b3c72b9))
- **comp:date-picker:** panel header font-size not right ([#1640](https://github.com/IDuxFE/idux/issues/1640)) ([e7895a1](https://github.com/IDuxFE/idux/commit/e7895a10874e609141ab33a6a033510dc0605ffe))
- **comp:drawer:** translate transition error when container is set ([#1642](https://github.com/IDuxFE/idux/issues/1642)) ([a4dc760](https://github.com/IDuxFE/idux/commit/a4dc760fef2eb9e1e119073f663e13fb07f561ab))
- **comp:dropdown:** dropdown border-radius not working ([#1632](https://github.com/IDuxFE/idux/issues/1632)) ([4817f09](https://github.com/IDuxFE/idux/commit/4817f09ca5e5f5b23fe1bb76c1c64c366cfcf6b6))
- **comp:modal:** header size should be sm when header has no content ([#1634](https://github.com/IDuxFE/idux/issues/1634)) ([ca74b62](https://github.com/IDuxFE/idux/commit/ca74b62d49990f8c8ef6dfed0e77ffb14f2f7ebe))
- **comp:select:** responsive maxLabel size calculation error ([#1647](https://github.com/IDuxFE/idux/issues/1647)) ([468a749](https://github.com/IDuxFE/idux/commit/468a749d17a80ecaedaef32f3afd5ca5f02506fe))
- **comp:select:** select grouped options indent not working ([#1636](https://github.com/IDuxFE/idux/issues/1636)) ([8807a31](https://github.com/IDuxFE/idux/commit/8807a3199ef00c4401631e6ed5bd75c4b9bd806f))
- **comp:table:** gap between expand trigger and text not working ([#1637](https://github.com/IDuxFE/idux/issues/1637)) ([0183341](https://github.com/IDuxFE/idux/commit/0183341f3c03814c29d37a1e086937738bf13f93))
- **comp:table:** header sort and filter trigger size not right ([#1649](https://github.com/IDuxFE/idux/issues/1649)) ([2697bb8](https://github.com/IDuxFE/idux/commit/2697bb8b3e5db3e460c76f985650b27487500b87))
- **comp:tag:** tag content not aligned center ([#1650](https://github.com/IDuxFE/idux/issues/1650)) ([02c5043](https://github.com/IDuxFE/idux/commit/02c50439918438b25e10676528d68bbfc9ce0601))
- **comp:tour:** step title should be optional ([#1628](https://github.com/IDuxFE/idux/issues/1628)) ([ecd1b7c](https://github.com/IDuxFE/idux/commit/ecd1b7c596f03fb02b8e76caa8863ab83b129453))
- **comp:transfer:** transfer header clear icon error ([#1633](https://github.com/IDuxFE/idux/issues/1633)) ([73eab86](https://github.com/IDuxFE/idux/commit/73eab866397277034cbac4c97645817ed2bc4763))
- **pro:search:** empty value set by quick select should be removed ([#1646](https://github.com/IDuxFE/idux/issues/1646)) ([eab7c44](https://github.com/IDuxFE/idux/commit/eab7c444cc86a4e0dd5a30258f0c2fd8a3103da2))

## [1.9.1](https://github.com/IDuxFE/idux/compare/v1.9.0...v1.9.1) (2023-08-05)

### Bug Fixes

- **comp:\*:** hide password input eye in edge with reset style ([#1626](https://github.com/IDuxFE/idux/issues/1626)) ([a0dddbd](https://github.com/IDuxFE/idux/commit/a0dddbd7d85fdceeb33cbce8b31f6fd3eb142b37))
- **comp:\*:** overlay arrow size misculated after rendered null ([#1627](https://github.com/IDuxFE/idux/issues/1627)) ([8c36d26](https://github.com/IDuxFE/idux/commit/8c36d26e41a4a04504710e9ea3305f57fc6590ce))
- **comp:button:** text and link should be user selectable ([#1624](https://github.com/IDuxFE/idux/issues/1624)) ([4ca9283](https://github.com/IDuxFE/idux/commit/4ca92832e7a40b6d875b26cfdeb7c9f7f74bfa1c))
- **comp:tour:** active step incorrect when async ([#1621](https://github.com/IDuxFE/idux/issues/1621)) ([cb6d0bf](https://github.com/IDuxFE/idux/commit/cb6d0bf323b85b9b90c159025e2acca2b3b36b74))
- **comp:tour:** tour closable should be configurable ([#1622](https://github.com/IDuxFE/idux/issues/1622)) ([409c280](https://github.com/IDuxFE/idux/commit/409c280c5f536d0b49a92eca7bd74385fac6a59f))
- **pro:search:** add min-height to select panel in quickselect ([#1625](https://github.com/IDuxFE/idux/issues/1625)) ([b019804](https://github.com/IDuxFE/idux/commit/b0198049809ff1f2ee8f28d9759c4bc82466cb67))
- **pro:search:** chinese couldn't be input ([#1620](https://github.com/IDuxFE/idux/issues/1620)) ([1e4a1c7](https://github.com/IDuxFE/idux/commit/1e4a1c745b6af7174e697ffd42bfe4b1be09302f))

# [1.9.0](https://github.com/IDuxFE/idux/compare/v1.8.1...v1.9.0) (2023-07-27)

### Bug Fixes

- **comp:select:** pressing enter after chinese input ([#1611](https://github.com/IDuxFE/idux/issues/1611)) ([62d53e7](https://github.com/IDuxFE/idux/commit/62d53e7e471ae11f7f2556400d26180be53ffd15))
- **comp:table:** the customMenu of filterable add parameters ([#1619](https://github.com/IDuxFE/idux/issues/1619)) ([079df65](https://github.com/IDuxFE/idux/commit/079df65c7ac96770dc306cdce64688936dde0d1e))
- **docs:** add loadingBar to show progress ([#1615](https://github.com/IDuxFE/idux/issues/1615)) ([9f643b2](https://github.com/IDuxFE/idux/commit/9f643b236165c361ea459ab0d3f6ce53986d4c4d)), closes [#1538](https://github.com/IDuxFE/idux/issues/1538)
- **pro:search:** each segment should have ellipsis separately ([#1614](https://github.com/IDuxFE/idux/issues/1614)) ([ffc85a1](https://github.com/IDuxFE/idux/commit/ffc85a15be8f3c2c4c3478e24b3576c1f98a6486))
- **pro:search:** empty state should be determined by search states ([#1613](https://github.com/IDuxFE/idux/issues/1613)) ([25e755f](https://github.com/IDuxFE/idux/commit/25e755f45e6a2d79728e3553383cc8616fbe1d27))
- **pro:search:** segment input mousedown doesn't change selection ([#1612](https://github.com/IDuxFE/idux/issues/1612)) ([eec8158](https://github.com/IDuxFE/idux/commit/eec81580261220487022fa6b3368f60995fa323e))
- **pro:table:** the layout tree enable checkOnClick ([#1609](https://github.com/IDuxFE/idux/issues/1609)) ([fdda882](https://github.com/IDuxFE/idux/commit/fdda882354bb7c02449ba2bf6eeae4395b9a931e))

### Features

- **comp:\*:** support virtualItemHeight for VirtualScroll ([#1618](https://github.com/IDuxFE/idux/issues/1618)) ([b1a5801](https://github.com/IDuxFE/idux/commit/b1a5801e943f4189b550769c5d107e80487ba097))
- **comp:checkbox,radio:** support fieldset slot ([#1608](https://github.com/IDuxFE/idux/issues/1608)) ([53c9131](https://github.com/IDuxFE/idux/commit/53c9131ebdfde4abd8886b33d11d2dcbf85b062c))
- **comp:tag:** support css variable and add status prop ([#1600](https://github.com/IDuxFE/idux/issues/1600)) ([4c2d506](https://github.com/IDuxFE/idux/commit/4c2d5069e745c30ad256436a4eeacd60e09afbe2))
- **comp:tour:** add tour component ([#1610](https://github.com/IDuxFE/idux/issues/1610)) ([79335e3](https://github.com/IDuxFE/idux/commit/79335e3917daf024b64b38f6ffdb78cedc4165e4))
- **comp:tree-select:** add searchPlaceholder prop ([#1617](https://github.com/IDuxFE/idux/issues/1617)) ([3a2687e](https://github.com/IDuxFE/idux/commit/3a2687e6cc7b9bfdd97d86da30697a35d26db3f3))
- **pro:search:** bluring segment with no panel triggers update now ([#1616](https://github.com/IDuxFE/idux/issues/1616)) ([294884e](https://github.com/IDuxFE/idux/commit/294884e21d404a50fab27a73a5bac6e7de014cbb))

## [1.8.1](https://github.com/IDuxFE/idux/compare/v1.8.0...v1.8.1) (2023-07-14)

### Bug Fixes

- **comp:icon:** update icon assets ([#1597](https://github.com/IDuxFE/idux/issues/1597)) ([cffe08c](https://github.com/IDuxFE/idux/commit/cffe08ceeab96144bc54523473f042b6222a5e5f))
- **comp:input:** sync design and update css variable ([#1602](https://github.com/IDuxFE/idux/issues/1602)) ([5a5eaea](https://github.com/IDuxFE/idux/commit/5a5eaea187b4af52e11da3135e8b4bd1ef2b2f34))
- **comp:textarea:** boxsizing data parse error in firefox ([#1599](https://github.com/IDuxFE/idux/issues/1599)) ([f68df61](https://github.com/IDuxFE/idux/commit/f68df6195f04f0770078e508970e839099170168))
- **comp:text:** the lineClamp does not work ([#1596](https://github.com/IDuxFE/idux/issues/1596)) ([f9a33e5](https://github.com/IDuxFE/idux/commit/f9a33e5e8e2217b1db669086464ddaee92802af2))
- **pro:search:** shortcut compont should provide comp name ([#1598](https://github.com/IDuxFE/idux/issues/1598)) ([12bf691](https://github.com/IDuxFE/idux/commit/12bf691c8eb4a83b1f0ca32fdb9d399f1929d495))

# [1.8.0](https://github.com/IDuxFE/idux/compare/v1.7.2...v1.8.0) (2023-07-06)

### Bug Fixes

- **comp:carousel:** dot clickable area is too small ([#1590](https://github.com/IDuxFE/idux/issues/1590)) ([7138b40](https://github.com/IDuxFE/idux/commit/7138b40f74adaf47960d8be73427eb92f61e0090))
- **comp:date-picker:** start and end cell calculation error ([#1591](https://github.com/IDuxFE/idux/issues/1591)) ([d66c71b](https://github.com/IDuxFE/idux/commit/d66c71b9399083e3da16db8347547cadfc7cb1b5))
- **pro:table:** the checkbox logic in the layout tool tree is incorrect ([#1593](https://github.com/IDuxFE/idux/issues/1593)) ([799ac59](https://github.com/IDuxFE/idux/commit/799ac5909aac314589c330d2b57f7ce91414c561))

### Features

- **comp:text:** add text component ([#1595](https://github.com/IDuxFE/idux/issues/1595)) ([9df3f1b](https://github.com/IDuxFE/idux/commit/9df3f1bba067130bca7f9104312d6b2ee3527b2a))
- **comp:tree:** expandIcon prop supports render function now ([#1586](https://github.com/IDuxFE/idux/issues/1586)) ([f4b1a38](https://github.com/IDuxFE/idux/commit/f4b1a38bd3160fed17abbc2e656025611f8459e9))
- **pro:search:** add `mutiSegment` field ([#1574](https://github.com/IDuxFE/idux/issues/1574)) ([90a1a8a](https://github.com/IDuxFE/idux/commit/90a1a8a1f5e197735aafa4fc0faac76008af0996))
- **pro:search:** add IxProSearchShortcut comp and shortcut slots ([#1594](https://github.com/IDuxFE/idux/issues/1594)) ([c605be2](https://github.com/IDuxFE/idux/commit/c605be21e7cb3f13c87cebffd87e09d2947493cd))
- **pro:transfer:** add layoutTool support to table transfer ([#1579](https://github.com/IDuxFE/idux/issues/1579)) ([6c6d41b](https://github.com/IDuxFE/idux/commit/6c6d41bf75a8a560c0446e27a5d1dde90bda0bcb))

## [1.7.2](https://github.com/IDuxFE/idux/compare/v1.6.0...v1.7.2) (2023-06-28)

### Bug Fixes

- **comp:\*:** overlay animating cls should be set only at leaving ([#1552](https://github.com/IDuxFE/idux/issues/1552)) ([c0d2e9c](https://github.com/IDuxFE/idux/commit/c0d2e9c6d87ba072536b6709b45be545fb5c43bb))
- **comp:button:** fix icon not vertically centered ([#1542](https://github.com/IDuxFE/idux/issues/1542)) ([cf269a5](https://github.com/IDuxFE/idux/commit/cf269a51c55b2b35d60005efcf8c17f0b45bd849))
- **comp:config:** the weekStartsOn does not work in the enUS locale ([#1570](https://github.com/IDuxFE/idux/issues/1570)) ([0ce5cf4](https://github.com/IDuxFE/idux/commit/0ce5cf411fc0d27f45ec9a01374428a42e82e965))
- **comp:empty:** the ids in svg should be only ([#1539](https://github.com/IDuxFE/idux/issues/1539)) ([40d25f5](https://github.com/IDuxFE/idux/commit/40d25f53e640d0f31507e19e034e9f552836b8a9))
- **comp:form:** the disabled color using css variable ([#1572](https://github.com/IDuxFE/idux/issues/1572)) ([850a1db](https://github.com/IDuxFE/idux/commit/850a1db5219c4836c813a7ec0f790c9eca80bfbd))
- **comp:image:** fix comp:image issue: icon [file-image] load failed ([#1581](https://github.com/IDuxFE/idux/issues/1581)) ([cc81151](https://github.com/IDuxFE/idux/commit/cc811518ca04948600d16ea486e1dfa33dd5b8b8)), closes [#1580](https://github.com/IDuxFE/idux/issues/1580)
- **comp:modal:** the size of button should be 'md' ([#1582](https://github.com/IDuxFE/idux/issues/1582)) ([00c7c6c](https://github.com/IDuxFE/idux/commit/00c7c6c7c1b9da47648112ce63b5f210bef45946))
- **comp:popconfirm:** sync design ([#1565](https://github.com/IDuxFE/idux/issues/1565)) ([08e1821](https://github.com/IDuxFE/idux/commit/08e182129f041c3cc61fef4147b4db46db3835a8))
- **comp:select:** the onSearch should be called when the intput is clear ([#1577](https://github.com/IDuxFE/idux/issues/1577)) ([ab4e4b0](https://github.com/IDuxFE/idux/commit/ab4e4b0981b1054197878f18c34543be19073a62))
- **comp:select:** the placeholder in overlay can't setting ([#1571](https://github.com/IDuxFE/idux/issues/1571)) ([7388dc4](https://github.com/IDuxFE/idux/commit/7388dc4bf028d18d62744596e7ad2cec193b8e08))
- **comp:style:** lost the style file of the watermark component in seer.less ([#1575](https://github.com/IDuxFE/idux/issues/1575)) ([d8b9aed](https://github.com/IDuxFE/idux/commit/d8b9aed807c5d86ea6feefd6460e8895bd4852ff))
- **comp:table:** fixed column background color error is selected ([#1543](https://github.com/IDuxFE/idux/issues/1543)) ([7448e38](https://github.com/IDuxFE/idux/commit/7448e38fd71de06ea4a2ac494091f1c9e681545f))
- **comp:tabs:** incorrect offset of the selected bar with dynamic tabs ([#1563](https://github.com/IDuxFE/idux/issues/1563)) ([15be909](https://github.com/IDuxFE/idux/commit/15be90944959d517027b987fe85da1ef22372c73))
- **comp:tabs:** more pane should hidden when empty data ([#1547](https://github.com/IDuxFE/idux/issues/1547)) ([13013b3](https://github.com/IDuxFE/idux/commit/13013b369daff7c7e7b82c125175c75c02f58fe2))
- **comp:tooltip:** visible is not work when destroyOnHide is true ([#1550](https://github.com/IDuxFE/idux/issues/1550)) ([05fdb30](https://github.com/IDuxFE/idux/commit/05fdb3054ac21e217f90bac35aa097cab508730b))
- **comp:tree-select:** async loading is invalid when getKey is set ([#1541](https://github.com/IDuxFE/idux/issues/1541)) ([6cd6155](https://github.com/IDuxFE/idux/commit/6cd615566d7a6e1692c4cb914daab0b6a82345c3))
- **comp:tree:** change drop node box-shadow to border ([#1584](https://github.com/IDuxFE/idux/issues/1584)) ([5b73101](https://github.com/IDuxFE/idux/commit/5b73101c5375f855a34f877f79c9941d38052e75))
- **comp:tree:** improve browser compatibility ([#1585](https://github.com/IDuxFE/idux/issues/1585)) ([9949124](https://github.com/IDuxFE/idux/commit/9949124a82f45fcdcd91b9b1bbe2d37a6945111b))
- **comp:upload:** accept does not ignore case ([#1544](https://github.com/IDuxFE/idux/issues/1544)) ([b7e9b89](https://github.com/IDuxFE/idux/commit/b7e9b891e48b9c12b90a6ad0d2d57d0b6d65ebf2))
- **pro:search:** all items triggered by quickselect should be updated ([#1559](https://github.com/IDuxFE/idux/issues/1559)) ([2385ed8](https://github.com/IDuxFE/idux/commit/2385ed80289a4e1cc68f8e38618c1d8684db5f1e))
- **pro:search:** clicking search button should trigger value change ([#1557](https://github.com/IDuxFE/idux/issues/1557)) ([324d74f](https://github.com/IDuxFE/idux/commit/324d74fbc115a05a3c564489d2e445bd22379505))
- **pro:search:** input searchField trim not working ([#1560](https://github.com/IDuxFE/idux/issues/1560)) ([9f2232a](https://github.com/IDuxFE/idux/commit/9f2232a33e2fe76cbeded7e9faa342c31e31c1bf))
- **pro:search:** item created by shortcut shoule be set active ([#1554](https://github.com/IDuxFE/idux/issues/1554)) ([31e433c](https://github.com/IDuxFE/idux/commit/31e433c5d27f2c7adff15ed7d1496b2ca7032dfc))
- **pro:search:** remove name input min-width ([#1551](https://github.com/IDuxFE/idux/issues/1551)) ([04e2500](https://github.com/IDuxFE/idux/commit/04e2500bdf1d4b8df5a0d9f8030729b06040e95b))
- **pro:search:** segment states should be reset after blur ([#1553](https://github.com/IDuxFE/idux/issues/1553)) ([b8cada3](https://github.com/IDuxFE/idux/commit/b8cada3a1247e87134fef88191e985cc0fd06765))
- **pro:table:** the empty is not rendered in the layout tool ([#1562](https://github.com/IDuxFE/idux/issues/1562)) ([ea62fd1](https://github.com/IDuxFE/idux/commit/ea62fd18634b7c96ac446f97848a4ded2dd06c7d))

### Features

- **comp:modal:** add `animatable` global config ([#1558](https://github.com/IDuxFE/idux/issues/1558)) ([0e82271](https://github.com/IDuxFE/idux/commit/0e822713a001e61b86523bdf0a6ddfd81af5b61a))
- **comp:style:** add min scroll and css variable support ([#1564](https://github.com/IDuxFE/idux/issues/1564)) ([d425a6f](https://github.com/IDuxFE/idux/commit/d425a6f75d1ffb7686c320e83f0c2c06c6756e80))
- **comp:tabs:** support addIcon slot ([#1566](https://github.com/IDuxFE/idux/issues/1566)) ([dcd9c1a](https://github.com/IDuxFE/idux/commit/dcd9c1a9c24a7256113ed6a64518d7b0fc5d451f))
- **pro:search:** add custom icon renderer for treeSelect and cascader ([#1556](https://github.com/IDuxFE/idux/issues/1556)) ([bec5772](https://github.com/IDuxFE/idux/commit/bec5772cc15d2a516430dff64c3b0e2d3c8637cf))

## [1.7.1](https://github.com/IDuxFE/idux/compare/v1.7.0...v1.7.1) (2023-06-05)

### Bug Fixes

- **comp:config:** the weekStartsOn does not work in the enUS locale ([#1570](https://github.com/IDuxFE/idux/issues/1570)) ([0ce5cf4](https://github.com/IDuxFE/idux/commit/0ce5cf411fc0d27f45ec9a01374428a42e82e965))
- **comp:form:** the disabled color using css variable ([#1572](https://github.com/IDuxFE/idux/issues/1572)) ([850a1db](https://github.com/IDuxFE/idux/commit/850a1db5219c4836c813a7ec0f790c9eca80bfbd))
- **comp:select:** the placeholder in overlay can't setting ([#1571](https://github.com/IDuxFE/idux/issues/1571)) ([7388dc4](https://github.com/IDuxFE/idux/commit/7388dc4bf028d18d62744596e7ad2cec193b8e08))

# [1.7.0](https://github.com/IDuxFE/idux/compare/v1.6.1...v1.7.0) (2023-05-29)

### Bug Fixes

- **comp:\*:** overlay animating cls should be set only at leaving ([#1552](https://github.com/IDuxFE/idux/issues/1552)) ([c0d2e9c](https://github.com/IDuxFE/idux/commit/c0d2e9c6d87ba072536b6709b45be545fb5c43bb))
- **comp:button:** fix icon not vertically centered ([#1542](https://github.com/IDuxFE/idux/issues/1542)) ([cf269a5](https://github.com/IDuxFE/idux/commit/cf269a51c55b2b35d60005efcf8c17f0b45bd849))
- **comp:empty:** the ids in svg should be only ([#1539](https://github.com/IDuxFE/idux/issues/1539)) ([40d25f5](https://github.com/IDuxFE/idux/commit/40d25f53e640d0f31507e19e034e9f552836b8a9))
- **comp:popconfirm:** sync design ([#1565](https://github.com/IDuxFE/idux/issues/1565)) ([08e1821](https://github.com/IDuxFE/idux/commit/08e182129f041c3cc61fef4147b4db46db3835a8))
- **comp:table:** fixed column background color error is selected ([#1543](https://github.com/IDuxFE/idux/issues/1543)) ([7448e38](https://github.com/IDuxFE/idux/commit/7448e38fd71de06ea4a2ac494091f1c9e681545f))
- **comp:tabs:** incorrect offset of the selected bar with dynamic tabs ([#1563](https://github.com/IDuxFE/idux/issues/1563)) ([15be909](https://github.com/IDuxFE/idux/commit/15be90944959d517027b987fe85da1ef22372c73))
- **comp:tabs:** more pane should hidden when empty data ([#1547](https://github.com/IDuxFE/idux/issues/1547)) ([13013b3](https://github.com/IDuxFE/idux/commit/13013b369daff7c7e7b82c125175c75c02f58fe2))
- **comp:tooltip:** visible is not work when destroyOnHide is true ([#1550](https://github.com/IDuxFE/idux/issues/1550)) ([05fdb30](https://github.com/IDuxFE/idux/commit/05fdb3054ac21e217f90bac35aa097cab508730b))
- **comp:tree-select:** async loading is invalid when getKey is set ([#1541](https://github.com/IDuxFE/idux/issues/1541)) ([6cd6155](https://github.com/IDuxFE/idux/commit/6cd615566d7a6e1692c4cb914daab0b6a82345c3))
- **comp:upload:** accept does not ignore case ([#1544](https://github.com/IDuxFE/idux/issues/1544)) ([b7e9b89](https://github.com/IDuxFE/idux/commit/b7e9b891e48b9c12b90a6ad0d2d57d0b6d65ebf2))
- **pro:search:** all items triggered by quickselect should be updated ([#1559](https://github.com/IDuxFE/idux/issues/1559)) ([2385ed8](https://github.com/IDuxFE/idux/commit/2385ed80289a4e1cc68f8e38618c1d8684db5f1e))
- **pro:search:** clicking search button should trigger value change ([#1557](https://github.com/IDuxFE/idux/issues/1557)) ([324d74f](https://github.com/IDuxFE/idux/commit/324d74fbc115a05a3c564489d2e445bd22379505))
- **pro:search:** input searchField trim not working ([#1560](https://github.com/IDuxFE/idux/issues/1560)) ([9f2232a](https://github.com/IDuxFE/idux/commit/9f2232a33e2fe76cbeded7e9faa342c31e31c1bf))
- **pro:search:** item created by shortcut shoule be set active ([#1554](https://github.com/IDuxFE/idux/issues/1554)) ([31e433c](https://github.com/IDuxFE/idux/commit/31e433c5d27f2c7adff15ed7d1496b2ca7032dfc))
- **pro:search:** remove name input min-width ([#1551](https://github.com/IDuxFE/idux/issues/1551)) ([04e2500](https://github.com/IDuxFE/idux/commit/04e2500bdf1d4b8df5a0d9f8030729b06040e95b))
- **pro:search:** segment states should be reset after blur ([#1553](https://github.com/IDuxFE/idux/issues/1553)) ([b8cada3](https://github.com/IDuxFE/idux/commit/b8cada3a1247e87134fef88191e985cc0fd06765))
- **pro:table:** the empty is not rendered in the layout tool ([#1562](https://github.com/IDuxFE/idux/issues/1562)) ([ea62fd1](https://github.com/IDuxFE/idux/commit/ea62fd18634b7c96ac446f97848a4ded2dd06c7d))

### Features

- **comp:modal:** add `animatable` global config ([#1558](https://github.com/IDuxFE/idux/issues/1558)) ([0e82271](https://github.com/IDuxFE/idux/commit/0e822713a001e61b86523bdf0a6ddfd81af5b61a))
- **comp:style:** add min scroll and css variable support ([#1564](https://github.com/IDuxFE/idux/issues/1564)) ([d425a6f](https://github.com/IDuxFE/idux/commit/d425a6f75d1ffb7686c320e83f0c2c06c6756e80))
- **comp:tabs:** support addIcon slot ([#1566](https://github.com/IDuxFE/idux/issues/1566)) ([dcd9c1a](https://github.com/IDuxFE/idux/commit/dcd9c1a9c24a7256113ed6a64518d7b0fc5d451f))
- **pro:search:** add custom icon renderer for treeSelect and cascader ([#1556](https://github.com/IDuxFE/idux/issues/1556)) ([bec5772](https://github.com/IDuxFE/idux/commit/bec5772cc15d2a516430dff64c3b0e2d3c8637cf))

## [1.6.1](https://github.com/IDuxFE/idux/compare/v1.6.0...v1.6.1) (2023-05-08)

### Bug Fixes

- **comp:button:** fix icon not vertically centered ([#1542](https://github.com/IDuxFE/idux/issues/1542)) ([cf269a5](https://github.com/IDuxFE/idux/commit/cf269a51c55b2b35d60005efcf8c17f0b45bd849))
- **comp:empty:** the ids in svg should be only ([#1539](https://github.com/IDuxFE/idux/issues/1539)) ([40d25f5](https://github.com/IDuxFE/idux/commit/40d25f53e640d0f31507e19e034e9f552836b8a9))
- **comp:table:** fixed column background color error is selected ([#1543](https://github.com/IDuxFE/idux/issues/1543)) ([7448e38](https://github.com/IDuxFE/idux/commit/7448e38fd71de06ea4a2ac494091f1c9e681545f))
- **comp:tabs:** more pane should hidden when empty data ([#1547](https://github.com/IDuxFE/idux/issues/1547)) ([13013b3](https://github.com/IDuxFE/idux/commit/13013b369daff7c7e7b82c125175c75c02f58fe2))
- **comp:tree-select:** async loading is invalid when getKey is set ([#1541](https://github.com/IDuxFE/idux/issues/1541)) ([6cd6155](https://github.com/IDuxFE/idux/commit/6cd615566d7a6e1692c4cb914daab0b6a82345c3))
- **comp:upload:** accept does not ignore case ([#1544](https://github.com/IDuxFE/idux/issues/1544)) ([b7e9b89](https://github.com/IDuxFE/idux/commit/b7e9b891e48b9c12b90a6ad0d2d57d0b6d65ebf2))

# [1.6.0](https://github.com/IDuxFE/idux/compare/v1.5.4...v1.6.0) (2023-04-17)

### Bug Fixes

- **cdk:drag-drop:** the shard context was not initalized correctly ([#1537](https://github.com/IDuxFE/idux/issues/1537)) ([1a8793d](https://github.com/IDuxFE/idux/commit/1a8793d811f309324df5c63fd721f81fd1a7c466)), closes [#1436](https://github.com/IDuxFE/idux/issues/1436)

### Features

- **comp:tabs:** supoort dataSource, removable, onAdd ([#1536](https://github.com/IDuxFE/idux/issues/1536)) ([0dad84b](https://github.com/IDuxFE/idux/commit/0dad84b7664587553daf9d51b69cfe5c839f1cf6))
- **pro:search:** add quick select panel support ([#1529](https://github.com/IDuxFE/idux/issues/1529)) ([daa39da](https://github.com/IDuxFE/idux/commit/daa39dac438ad2fe8fd9d358f731a2e20b68b603))

## [1.5.4](https://github.com/IDuxFE/idux/compare/v1.5.3...v1.5.4) (2023-04-13)

### Bug Fixes

- **cdk:scroll:** the onScrolledBottom is not triggered ([#1535](https://github.com/IDuxFE/idux/issues/1535)) ([cee4685](https://github.com/IDuxFE/idux/commit/cee46854af45863a8831eb22a901f9d2f535efb4))
- **comp:cascader:** onChange not working ([#1528](https://github.com/IDuxFE/idux/issues/1528)) ([c045d47](https://github.com/IDuxFE/idux/commit/c045d471719e32b288377ea17003ca98b83def7a))
- **comp:select:** panel active value couldn't be set as undefined ([#1533](https://github.com/IDuxFE/idux/issues/1533)) ([7949a28](https://github.com/IDuxFE/idux/commit/7949a28f96557b7ff1cc12c88dbbd82e549211cd))
- **comp:select:** searchable with multiple works abnormally ([#1530](https://github.com/IDuxFE/idux/issues/1530)) ([8240c44](https://github.com/IDuxFE/idux/commit/8240c44440e310328835e6c3938031d4edc09406))
- **pro:tree:** the header don't render when it is empty ([#1531](https://github.com/IDuxFE/idux/issues/1531)) ([64f6e33](https://github.com/IDuxFE/idux/commit/64f6e332ba310151baac5a1e670ae3832af41faa))

## [1.5.3](https://github.com/IDuxFE/idux/compare/v1.5.2...v1.5.3) (2023-04-04)

### Bug Fixes

- **cdk:popper:** reference hidden popper are no longer updated ([#1515](https://github.com/IDuxFE/idux/issues/1515)) ([9552ef3](https://github.com/IDuxFE/idux/commit/9552ef360c439e16414668d4a7bb07e0d7b5b504))
- **comp:\*:** animating overlay are not hidden anymore ([#1516](https://github.com/IDuxFE/idux/issues/1516)) ([3d4ce98](https://github.com/IDuxFE/idux/commit/3d4ce98e103f93f72c9655dfcef0206be7208691))
- **comp:icon:** 'info' and 'exclamation' are exchanged ([#1525](https://github.com/IDuxFE/idux/issues/1525)) ([dc98fae](https://github.com/IDuxFE/idux/commit/dc98faee2f89f86a1f2f5ee42ee2b92404c892da))
- **comp:icon:** ellipsis icon not right ([#1522](https://github.com/IDuxFE/idux/issues/1522)) ([615f483](https://github.com/IDuxFE/idux/commit/615f48300d7f930a033385594ea42032a0f9b880))
- **pro:search:** add animation to overlay ([#1517](https://github.com/IDuxFE/idux/issues/1517)) ([a781bb9](https://github.com/IDuxFE/idux/commit/a781bb9930479b800022cc410eb8c5dca3a25a19))

## [1.5.2](https://github.com/IDuxFE/idux/compare/v1.5.1...v1.5.2) (2023-03-27)

### Bug Fixes

- **cdk:forms:** disabled according to status ([#1503](https://github.com/IDuxFE/idux/issues/1503)) ([88a6d3f](https://github.com/IDuxFE/idux/commit/88a6d3f568521eea4b39220c03f7a622695cec70))
- **cdk:scroll:** content is blank when re-activated in keepalive mode ([#1505](https://github.com/IDuxFE/idux/issues/1505)) ([2d74862](https://github.com/IDuxFE/idux/commit/2d7486257cda29fe554572208bf516b70f33102e))
- **comp:button:** disabled btn when group's `disabled` is true ([#1508](https://github.com/IDuxFE/idux/issues/1508)) ([6e44b98](https://github.com/IDuxFE/idux/commit/6e44b9848864df369499afe885068bdf033e4f27))
- **comp:date-picker:** disabledDate error on year and month panel ([#1514](https://github.com/IDuxFE/idux/issues/1514)) ([06c546c](https://github.com/IDuxFE/idux/commit/06c546c5a9caf517068123fc098ec32226977451))
- **comp:date-picker:** prevent elements with class name `ix-overlay`'s `box-sizing` set to `content-box` ([#1511](https://github.com/IDuxFE/idux/issues/1511)) ([3fe76f2](https://github.com/IDuxFE/idux/commit/3fe76f25317a0e5aeae24865d50c00a7827b8815))
- **comp:select:** compositionEnd can't trigger ([#1513](https://github.com/IDuxFE/idux/issues/1513)) ([33a2cf6](https://github.com/IDuxFE/idux/commit/33a2cf6a7e0c8760f5e1e354a1f6c5221cfa738c))
- **comp:timeline:** modify timeline style according to design ([#1509](https://github.com/IDuxFE/idux/issues/1509)) ([b9db622](https://github.com/IDuxFE/idux/commit/b9db622646403063993c0ba0708701b18323c32f))
- **pro:table:** triggers of last column is covered by layout tool ([#1507](https://github.com/IDuxFE/idux/issues/1507)) ([d2654f2](https://github.com/IDuxFE/idux/commit/d2654f215e07f364730b29f5aa7ebeedd405cd41))
- **pro:textarea:** placeholder color for textarea ([#1512](https://github.com/IDuxFE/idux/issues/1512)) ([521ac8d](https://github.com/IDuxFE/idux/commit/521ac8d60a6bbf20fe2b4aad556e1a9bddd96b22))

## [1.5.1](https://github.com/IDuxFE/idux/compare/v1.5.0...v1.5.1) (2023-03-14)

### Bug Fixes

- **comp:\*:** the control type of all form components is incomplete ([#1495](https://github.com/IDuxFE/idux/issues/1495)) ([ace2a1e](https://github.com/IDuxFE/idux/commit/ace2a1ed57c2f6a3a3f5bd41a20e393d90866d60))
- **comp:cascader:** group height should be same as panel height ([#1500](https://github.com/IDuxFE/idux/issues/1500)) ([dfb5d0b](https://github.com/IDuxFE/idux/commit/dfb5d0bd93d7af6716e79a7e5c5563357881d5d8))
- **comp:spin:** btn under `ix-spin` can be clicked ([#1499](https://github.com/IDuxFE/idux/issues/1499)) ([3463cea](https://github.com/IDuxFE/idux/commit/3463cea35f83485c71ab66d0b8d1c23a79ff0935))
- **pro:search:** segmentState should init only when item key changes ([#1496](https://github.com/IDuxFE/idux/issues/1496)) ([70f947c](https://github.com/IDuxFE/idux/commit/70f947cc455f2a8a2ab82ae90540997218d04b32))
- **pro:search:** select panel virtual not working ([#1501](https://github.com/IDuxFE/idux/issues/1501)) ([5def0ab](https://github.com/IDuxFE/idux/commit/5def0abd30af0d2772ba2df3987c3b13274d3544))

# [1.5.0](https://github.com/IDuxFE/idux/compare/v1.4.3...v1.5.0) (2023-03-07)

### Bug Fixes

- **comp:cascader:** searchValue not working after CascaderPanel added ([#1487](https://github.com/IDuxFE/idux/issues/1487)) ([42b408b](https://github.com/IDuxFE/idux/commit/42b408b91d81b6fff08322902b9fa514850455bc))
- **comp:modal:** style update and css variable support ([#1479](https://github.com/IDuxFE/idux/issues/1479)) ([f45776d](https://github.com/IDuxFE/idux/commit/f45776d3a9e35ebd1a522d4d0c8faf97fd96be4b))
- **comp:table:** the indent not work and selected records not cached ([#1484](https://github.com/IDuxFE/idux/issues/1484)) ([a3d5bb7](https://github.com/IDuxFE/idux/commit/a3d5bb74c337d557f0d1a8baeb48949fe5bd02fd)), closes [#1482](https://github.com/IDuxFE/idux/issues/1482)
- **comp:textarea:** measureTextarea removeChild error ([#1492](https://github.com/IDuxFE/idux/issues/1492)) ([e489e8e](https://github.com/IDuxFE/idux/commit/e489e8e40770ac3eaf805a872eb796077df19520))
- **pro:search:** empty input segment should be invalid ([#1494](https://github.com/IDuxFE/idux/issues/1494)) ([168620e](https://github.com/IDuxFE/idux/commit/168620e6696a71c0f9693bdc42734e1a7e1f99d3))
- **pro:search:** name select label not rendering ([#1493](https://github.com/IDuxFE/idux/issues/1493)) ([cb4b86a](https://github.com/IDuxFE/idux/commit/cb4b86a35aabb64616fe476f8d544b7e2a1174cc))

### Features

- **cdk:forms:** formArray supports clearControls ([#1490](https://github.com/IDuxFE/idux/issues/1490)) ([1cd4dcc](https://github.com/IDuxFE/idux/commit/1cd4dccf36df890fac95351f4714070e18333141))
- **comp:cascader:** add `IxCascaderPanel` component ([#1481](https://github.com/IDuxFE/idux/issues/1481)) ([e044390](https://github.com/IDuxFE/idux/commit/e044390c26c594978c8bcc0edfb72e65edd47db3))
- **comp:desc:** add Descriptions component ([#1470](https://github.com/IDuxFE/idux/issues/1470)) ([a7faf13](https://github.com/IDuxFE/idux/commit/a7faf1365ef93a765e85fadfda4b06cf41600caf))
- **comp:rate:** add color prop for rate ([#1420](https://github.com/IDuxFE/idux/issues/1420)) ([31c29e0](https://github.com/IDuxFE/idux/commit/31c29e03975b6d1ecd1966dfbc0abd606d36e499))
- **comp:select:** add `loading` prop for select component ([#1439](https://github.com/IDuxFE/idux/issues/1439)) ([3289784](https://github.com/IDuxFE/idux/commit/328978436467bc8b7f59650c56809c7804096a1c))
- **pro:search:** `select` and `treeSelect` support `onSearch` now ([#1444](https://github.com/IDuxFE/idux/issues/1444)) ([79a7acc](https://github.com/IDuxFE/idux/commit/79a7acc40a43bcab853e5bfefcf1a0433452597f))
- **pro:search:** add `'cascader'` searchField ([#1485](https://github.com/IDuxFE/idux/issues/1485)) ([88b751b](https://github.com/IDuxFE/idux/commit/88b751b276440d0024296c5ccd3ef62c53af6d35))
- **pro:search:** add `customNameLabel` and `customOperatorLabel` ([#1491](https://github.com/IDuxFE/idux/issues/1491)) ([1be87e8](https://github.com/IDuxFE/idux/commit/1be87e8cab9a926527efa433baeb4c1e99d27840))
- **pro:table:** the layout tool support visible, changeSize, resetable ([#1488](https://github.com/IDuxFE/idux/issues/1488)) ([950f1b1](https://github.com/IDuxFE/idux/commit/950f1b1eb40b70e66e90989ac81da1fa3ffc8ed9))

## [1.4.3](https://github.com/IDuxFE/idux/compare/v1.4.2...v1.4.3) (2023-02-27)

### Bug Fixes

- **comp:alert:** alert icon should always be aligned top ([#1467](https://github.com/IDuxFE/idux/issues/1467)) ([c71ee04](https://github.com/IDuxFE/idux/commit/c71ee046f74d602967a4699c7c53a0971302414d))
- **comp:icon:** update icons, add `more` and `exit` icon ([#1468](https://github.com/IDuxFE/idux/issues/1468)) ([78918ae](https://github.com/IDuxFE/idux/commit/78918ae3a4866827eb1ed07235e19b5b49d074e2))
- **comp:rate:** control not work ([#1471](https://github.com/IDuxFE/idux/issues/1471)) ([0b2dfa1](https://github.com/IDuxFE/idux/commit/0b2dfa11c6b0a27f509b8ce8d56402c6e15a90ab))
- **comp:slider:** slider marker color error when disabled ([#1457](https://github.com/IDuxFE/idux/issues/1457)) ([d215935](https://github.com/IDuxFE/idux/commit/d2159356f6ff0a144ae42d16eb05aad6fea5399b))
- **comp:spin:** spin container blured opacity should be 0.3 ([#1464](https://github.com/IDuxFE/idux/issues/1464)) ([f88ad9a](https://github.com/IDuxFE/idux/commit/f88ad9a86e86479a36d863ed48cb9ffb6eecc7f5))
- **comp:stepper:** stepper tail dashed style isn't working ([#1458](https://github.com/IDuxFE/idux/issues/1458)) ([c688624](https://github.com/IDuxFE/idux/commit/c688624953502cf9dfce61cc08c6be1cf3ba92f4))
- **comp:table:** virtual + fixed column abnormal display with chrome83 ([#1473](https://github.com/IDuxFE/idux/issues/1473)) ([4523705](https://github.com/IDuxFE/idux/commit/452370565c4b099d53e2e186e64d0ecd285f564f))
- **comp:transfer:** pagination should enable quick jumper, meanwhile fix header suffix style ([#1459](https://github.com/IDuxFE/idux/issues/1459)) ([499ae90](https://github.com/IDuxFE/idux/commit/499ae902879597a53de0005f148aa9426a7c2287))
- **pro:search:** change proSearch overlay vertical offset to 8px ([#1463](https://github.com/IDuxFE/idux/issues/1463)) ([2da284d](https://github.com/IDuxFE/idux/commit/2da284de936a4d427691a31569ec8902b7d80549))
- **pro:search:** mutiple search filed validation error ([#1475](https://github.com/IDuxFE/idux/issues/1475)) ([b961c4e](https://github.com/IDuxFE/idux/commit/b961c4e5769647323085d31a9b3f73ce12bb67a0))
- **pro:search:** panel onkeydown should only be called when opened ([#1477](https://github.com/IDuxFE/idux/issues/1477)) ([76a1bac](https://github.com/IDuxFE/idux/commit/76a1bacdadcc909584b22366f62be50ae7f42ba8))
- **pro:tree:** tree content horizontal padding ([#1466](https://github.com/IDuxFE/idux/issues/1466)) ([ec8c61d](https://github.com/IDuxFE/idux/commit/ec8c61dce3cc554c77d6016d5ce69ab5ab085e3b))

## [1.4.2](https://github.com/IDuxFE/idux/compare/v1.4.1...v1.4.2) (2023-02-20)

### Bug Fixes

- **comp:carousel:** when items is dynamically reduced to 1, layout error ([#1450](https://github.com/IDuxFE/idux/issues/1450)) ([2e37c44](https://github.com/IDuxFE/idux/commit/2e37c447a9672c35c25fe448250d0fbcc01646d0))
- **comp:carousel:** when scaled, the component layout error ([#1448](https://github.com/IDuxFE/idux/issues/1448)) ([58ee991](https://github.com/IDuxFE/idux/commit/58ee991568e5b397fac95baa70bbc98866290c78))
- **comp:empty:** resolve id conflicts in svg ([#1451](https://github.com/IDuxFE/idux/issues/1451)) ([8ca7a08](https://github.com/IDuxFE/idux/commit/8ca7a08b86b8cc185f936da2afcb0b191f672894))
- **comp:upload:** upload list card status text isn't centered ([#1461](https://github.com/IDuxFE/idux/issues/1461)) ([afeb80e](https://github.com/IDuxFE/idux/commit/afeb80e942a4fb9f399a75d601897ef7e8e5293a))
- component style update ([#1452](https://github.com/IDuxFE/idux/issues/1452)) ([c07ef31](https://github.com/IDuxFE/idux/commit/c07ef312795834867d658703842a02244456328a))
- **pro:search:** `treeSelect` panel height is unset ([#1445](https://github.com/IDuxFE/idux/issues/1445)) ([388da6a](https://github.com/IDuxFE/idux/commit/388da6a6b1f2d5eeac354eeedabe4c81bf89f976))
- **pro:search:** remove transition for overlay ([#1447](https://github.com/IDuxFE/idux/issues/1447)) ([4c28a78](https://github.com/IDuxFE/idux/commit/4c28a78c83a1f820b8976956549c27390316135e))

## [1.4.1](https://github.com/IDuxFE/idux/compare/v1.4.0...v1.4.1) (2023-02-13)

### Bug Fixes

- **comp:\*:** use a smarter slide animation ([#1422](https://github.com/IDuxFE/idux/issues/1422)) ([33fb35f](https://github.com/IDuxFE/idux/commit/33fb35ff3e420c723bd6bf56d0b4149bf7f388b5))
- **comp:card:** remove footer padding and click effect ([#1418](https://github.com/IDuxFE/idux/issues/1418)) ([0612164](https://github.com/IDuxFE/idux/commit/0612164270e4837bf502df6951c42643475ebbfd))
- **comp:select:** blur event make span render bad ([#1437](https://github.com/IDuxFE/idux/issues/1437)) ([b15fedd](https://github.com/IDuxFE/idux/commit/b15fedd291622e3faa25c2430e9ce690f4202521)), closes [#1431](https://github.com/IDuxFE/idux/issues/1431)
- **comp:select:** call blur after 'enter' envent ([#1441](https://github.com/IDuxFE/idux/issues/1441)) ([391c526](https://github.com/IDuxFE/idux/commit/391c526d4fa9c12af33eaf3c89e1699f52bd16f5))
- **comp:table:** onScroll not work ([#1428](https://github.com/IDuxFE/idux/issues/1428)) ([79136b5](https://github.com/IDuxFE/idux/commit/79136b5813c3ed14c13ab82062e79cca751ebebe))
- **comp:table:** the size of pagination cannot be overridden ([#1440](https://github.com/IDuxFE/idux/issues/1440)) ([b647883](https://github.com/IDuxFE/idux/commit/b64788390a513f5d77e3bd6a4896abeb72e3017d))
- **comp:transfer:** select all status error ([#1442](https://github.com/IDuxFE/idux/issues/1442)) ([ff3bcf9](https://github.com/IDuxFE/idux/commit/ff3bcf9def843043769d27c06200e6df0138f03d))
- **pro:search:** segment panel overlay shouldn't blink ([#1424](https://github.com/IDuxFE/idux/issues/1424)) ([7829ca1](https://github.com/IDuxFE/idux/commit/7829ca1389d7b42cb04dc4da872ff2dcdba62cc4))
- **pro:transfer:** tree transfer count error under `children` strategy ([#1443](https://github.com/IDuxFE/idux/issues/1443)) ([e0f9597](https://github.com/IDuxFE/idux/commit/e0f9597364e823bc9b4927ea9472bd3891e1a207))
- **pro:tree:** expandAll button state is wrong ([#1429](https://github.com/IDuxFE/idux/issues/1429)) ([2d2d7ca](https://github.com/IDuxFE/idux/commit/2d2d7ca1a6c8b4a64f5c8e42f6e1f83ff4d01a7e))

# [1.4.0](https://github.com/IDuxFE/idux/compare/v1.3.3...v1.4.0) (2023-01-16)

### Bug Fixes

- **comp:badge:** the count should support non-numeric types ([#1399](https://github.com/IDuxFE/idux/issues/1399)) ([5400b29](https://github.com/IDuxFE/idux/commit/5400b29de42776e6078752f4495f3fc3d8401dba))
- **comp:tree:** correct param `checked` of `onCheck` ([#1404](https://github.com/IDuxFE/idux/issues/1404)) ([2858da6](https://github.com/IDuxFE/idux/commit/2858da62cf218a4397d4266fe853866a638b6a3d))
- **comp:tree:** incorrect style when node is selected ([#1416](https://github.com/IDuxFE/idux/issues/1416)) ([b112049](https://github.com/IDuxFE/idux/commit/b1120491a71f5f68f6c6332c9f0f58156106354a))
- **comp:tree:** lines are not aligned ([#1393](https://github.com/IDuxFE/idux/issues/1393)) ([0dd030d](https://github.com/IDuxFE/idux/commit/0dd030de66cf84a7d3a3e0f043ced4bdde2b17d1))
- **pro:table:** width calculation problem after resize ([#1417](https://github.com/IDuxFE/idux/issues/1417)) ([d7ef42c](https://github.com/IDuxFE/idux/commit/d7ef42cca7b2ca6611cd352b1f68592f1fa0b421))
- **pro:transfer:** optimze tree expanded keys sync logic ([#1414](https://github.com/IDuxFE/idux/issues/1414)) ([fec5fee](https://github.com/IDuxFE/idux/commit/fec5fee6146cd9412abdcb4bd4a8a6b42c78bf58))
- **pro:transfer:** overide transfer tree node selected bg color ([#1407](https://github.com/IDuxFE/idux/issues/1407)) ([477ac44](https://github.com/IDuxFE/idux/commit/477ac44f11036d33bfc487c51b44d54e765139ed))
- **pro:tree:** empty state is not centered ([#1394](https://github.com/IDuxFE/idux/issues/1394)) ([2c58ca2](https://github.com/IDuxFE/idux/commit/2c58ca23132609febd9b985b9eb912fd52105c52))

### Features

- **cdk:forms:** the disabled of ValidatorOptions support function ([#1395](https://github.com/IDuxFE/idux/issues/1395)) ([d633174](https://github.com/IDuxFE/idux/commit/d633174afbf32d05a6d42c793ded4cb3eeeb952c))
- **cdk:forms:** the setMessages supports setting locale for i18n ([#1398](https://github.com/IDuxFE/idux/issues/1398)) ([0a8b116](https://github.com/IDuxFE/idux/commit/0a8b116c432617701108d0dfe2322efccf7d0ac7))
- **cdk:utils, pro:search:** add tree utils, add pro search `'treeSelect'` field ([#1391](https://github.com/IDuxFE/idux/issues/1391)) ([4bf719d](https://github.com/IDuxFE/idux/commit/4bf719ddcea66b12500d2df891c09ba0af8621f1))
- **cdk:utils:** add tree utils, fix data param of getAllSelectedKeys, fix filtered or paginated tree data value error ([#1406](https://github.com/IDuxFE/idux/issues/1406)) ([56035c1](https://github.com/IDuxFE/idux/commit/56035c131cacbdf32c3eee3387f266768a85124b))
- **comp:badge:** add processing prop ([#1400](https://github.com/IDuxFE/idux/issues/1400)) ([ba15f33](https://github.com/IDuxFE/idux/commit/ba15f33eaa0393ef466cdef0c0327703f728ad21))
- **comp:badge:** add status prop and support css variable ([#1390](https://github.com/IDuxFE/idux/issues/1390)) ([da3905e](https://github.com/IDuxFE/idux/commit/da3905e626e5f8f14d11f9330aa2ac7eb73b874b))
- **comp:cascader:** add disableData to dynamically disable options ([#1408](https://github.com/IDuxFE/idux/issues/1408)) ([65328e7](https://github.com/IDuxFE/idux/commit/65328e7ee5b6e0794a856741f7b66b8817f6c7b3))
- **comp:stepper:** add dot prop ([#1401](https://github.com/IDuxFE/idux/issues/1401)) ([aa90a7e](https://github.com/IDuxFE/idux/commit/aa90a7e55c809e8b8e1fdc98836bcc7029fcaff7)), closes [#1082](https://github.com/IDuxFE/idux/issues/1082)

## [1.3.3](https://github.com/IDuxFE/idux/compare/v1.3.2...v1.3.3) (2023-01-09)

### Bug Fixes

- **comp:cascader:** selected and expanded status is display incorrectly ([#1386](https://github.com/IDuxFE/idux/issues/1386)) ([847f139](https://github.com/IDuxFE/idux/commit/847f1394ea970eb3b91ee095ea30aa75c2760610))
- **comp:header:** remove breakground-color ([#1392](https://github.com/IDuxFE/idux/issues/1392)) ([55bb758](https://github.com/IDuxFE/idux/commit/55bb75847ea1ca7d6e3372d3b2c71315c086c66c))
- **comp:input-number:** buttons of inc and dec are not hidden by default ([#1385](https://github.com/IDuxFE/idux/issues/1385)) ([b77fac6](https://github.com/IDuxFE/idux/commit/b77fac60833d6ca544812d74417d5a604075de36))
- **comp:select:** can't select other options when there are input values ([#1387](https://github.com/IDuxFE/idux/issues/1387)) ([59fc80e](https://github.com/IDuxFE/idux/commit/59fc80e5a8439fc34d61ea104f1f53dcce9a701e))
- **pro:search:** overlay zIndex should be larger than container ([#1389](https://github.com/IDuxFE/idux/issues/1389)) ([81ff47e](https://github.com/IDuxFE/idux/commit/81ff47e9ac9a2afceb4ac8726f6f2618a6933377))
- **pro:transfer:** tree transfer with 'off' stategy target error ([#1388](https://github.com/IDuxFE/idux/issues/1388)) ([796bfaf](https://github.com/IDuxFE/idux/commit/796bfaf6ce627d564a8db9e7675b9879342e4e5f))

## [1.3.2](https://github.com/IDuxFE/idux/compare/v1.3.1...v1.3.2) (2023-01-03)

### Bug Fixes

- **comp:alert:** style update ([#1377](https://github.com/IDuxFE/idux/issues/1377)) ([30d1ab3](https://github.com/IDuxFE/idux/commit/30d1ab381b4eb833e12137d6d85d9a230ca411f1))
- **comp:anchor:** style update and css variable support ([#1379](https://github.com/IDuxFE/idux/issues/1379)) ([3a106d9](https://github.com/IDuxFE/idux/commit/3a106d952b6ec3217d7f95655f2406457383b873))
- **comp:anchor:** style update and css variable support ([#1380](https://github.com/IDuxFE/idux/issues/1380)) ([f83ccc8](https://github.com/IDuxFE/idux/commit/f83ccc80a8aeb5ddc1efb0d27582dfcfd22df919))
- **comp:back-top:** style update and css variable support ([#1381](https://github.com/IDuxFE/idux/issues/1381)) ([cb97fd0](https://github.com/IDuxFE/idux/commit/cb97fd0905c544e5d43eb62d0ea9bb49eaa4db16))
- **comp:overlay:** quick switch visible causes positioning error ([#1384](https://github.com/IDuxFE/idux/issues/1384)) ([5d13977](https://github.com/IDuxFE/idux/commit/5d139778a494b36feeece08b0c5c27f68bd66a37))
- **comp:progress:** decimal numbers are display error ([#1382](https://github.com/IDuxFE/idux/issues/1382)) ([e474fa5](https://github.com/IDuxFE/idux/commit/e474fa534ea9dc147a544b6f641b55803cc950b6))
- **comp:table:** can't reverse select, when multiple of selectable is false ([#1383](https://github.com/IDuxFE/idux/issues/1383)) ([1300c13](https://github.com/IDuxFE/idux/commit/1300c134d11132455f5e259b98fc5bf9f7d17aa4))
- **comp:table:** sort and filter not work with async columns ([#1376](https://github.com/IDuxFE/idux/issues/1376)) ([9163d69](https://github.com/IDuxFE/idux/commit/9163d69bac526f1aa7dae86e769f830e3e01acd9))
- **pro:table:** emptyCell is not declared in props ([#1378](https://github.com/IDuxFE/idux/issues/1378)) ([edb23d4](https://github.com/IDuxFE/idux/commit/edb23d42b9d2479fa10b17f201e0a87c45c4cd7e))

## [1.3.1](https://github.com/IDuxFE/idux/compare/v1.3.0...v1.3.1) (2022-12-23)

### Bug Fixes

- **comp:modal:** reading contains after onmounted causes an exception ([#1371](https://github.com/IDuxFE/idux/issues/1371)) ([de416c1](https://github.com/IDuxFE/idux/commit/de416c10416ef4577f1fc09c108b61000e078e3e))
- **comp:table:** incorrect serial number ([#1370](https://github.com/IDuxFE/idux/issues/1370)) ([f19efbe](https://github.com/IDuxFE/idux/commit/f19efbe0e6a893e1211e1df97893094f68fb2c25))
- **comp:textarea:** lineheight error when not rendered initially ([#1372](https://github.com/IDuxFE/idux/issues/1372)) ([627e018](https://github.com/IDuxFE/idux/commit/627e01800c24cc96891920e89c9a8af077691449))
- **comp:time-picker:** range with empty array shouldn't be clearable ([#1365](https://github.com/IDuxFE/idux/issues/1365)) ([e6800a7](https://github.com/IDuxFE/idux/commit/e6800a74abb6c64c7c76de1564711c9c6be0b12b))
- **comp:tree:** indeterminateKeys shouldn't check disabled state ([#1373](https://github.com/IDuxFE/idux/issues/1373)) ([0607e5c](https://github.com/IDuxFE/idux/commit/0607e5cf958f561f9dbd3a1d5199f143e4127d71))
- failed to import style file, in webpack project ([#1369](https://github.com/IDuxFE/idux/issues/1369)) ([c2288d5](https://github.com/IDuxFE/idux/commit/c2288d5f6840ca3c2b463e78add9a0efbf5f178d))
- **pro:search:** search items covers dom content when bluerd ([#1374](https://github.com/IDuxFE/idux/issues/1374)) ([bda0db2](https://github.com/IDuxFE/idux/commit/bda0db24475d123cb0a2cd7531f6c9235087802b))
- **pro:search:** searchItem mousedown doesn't trigger focused ([#1368](https://github.com/IDuxFE/idux/issues/1368)) ([14637be](https://github.com/IDuxFE/idux/commit/14637be0880c72674d31363d97e367e326143c6a))

# [1.3.0](https://github.com/IDuxFE/idux/compare/v1.2.3...v1.3.0) (2022-12-16)

### Bug Fixes

- **cdk:breakpoint:** query unexpectedly destroyed ([#1357](https://github.com/IDuxFE/idux/issues/1357)) ([2b45f6b](https://github.com/IDuxFE/idux/commit/2b45f6b6c6fdf3cc3febd41861c766c6fc705816))
- **cdk:popper:** update floating-ui to fix position error under scale ([#1362](https://github.com/IDuxFE/idux/issues/1362)) ([8aeb214](https://github.com/IDuxFE/idux/commit/8aeb2149ff2d81c5d5ab1a9fec763d1efa156fd6))
- **comp:\*:** opening overlay once triggers two zIndex changes ([#1355](https://github.com/IDuxFE/idux/issues/1355)) ([7cec4ec](https://github.com/IDuxFE/idux/commit/7cec4ec5d9c882d9fae54cba221efda34ba3bc93))
- **comp:\*:** the font size under seer theme is incorrect ([#1343](https://github.com/IDuxFE/idux/issues/1343)) ([5c74fcf](https://github.com/IDuxFE/idux/commit/5c74fcf6964bd7d76e5d35f5bf84ca52b0f21fae))
- **comp:\*:** the text color variable update ([#1358](https://github.com/IDuxFE/idux/issues/1358)) ([49c8743](https://github.com/IDuxFE/idux/commit/49c874344710d8edbe43c48c010d2b97f4b0bb3b))
- **comp:button:** display to inline-block and remove focus style ([#1354](https://github.com/IDuxFE/idux/issues/1354)) ([107c03e](https://github.com/IDuxFE/idux/commit/107c03e20c2db96f0bd7fecd6da8a9eee084dcf5))
- **comp:carousel:** only two items and arrow is true, the switch appears blank ([#1346](https://github.com/IDuxFE/idux/issues/1346)) ([6a5f46b](https://github.com/IDuxFE/idux/commit/6a5f46b3af56efe3c74434845708843483e13557))
- **comp:cascader:** when children changed,the scrollbar should be pinned ([#1353](https://github.com/IDuxFE/idux/issues/1353)) ([031834e](https://github.com/IDuxFE/idux/commit/031834e6d9b948b4a065a8a56bdf4afc1c2145a3)), closes [#1316](https://github.com/IDuxFE/idux/issues/1316)
- **comp:checkbox:** style error when disabled ([#1344](https://github.com/IDuxFE/idux/issues/1344)) ([55b0be8](https://github.com/IDuxFE/idux/commit/55b0be849a43cf06c6dd98f4086ae0db37728ecf))
- **comp:date-picker,comp:time-picker:** opening picker shouldn't scroll to window top ([#1342](https://github.com/IDuxFE/idux/issues/1342)) ([cce0c0e](https://github.com/IDuxFE/idux/commit/cce0c0e81b67722f797f73db52632974ad7822b9))
- **comp:empty:** style update with icon ([#1349](https://github.com/IDuxFE/idux/issues/1349)) ([69ec9f9](https://github.com/IDuxFE/idux/commit/69ec9f944ea3569b6a85c0bcb9eb278f2fad084e))
- **comp:input:** the transition was inconsistent ([#1352](https://github.com/IDuxFE/idux/issues/1352)) ([9950e6f](https://github.com/IDuxFE/idux/commit/9950e6f966aa8964ba6283a75b1505da22bc87cd))
- **comp:progress:** trailColor not work ([#1347](https://github.com/IDuxFE/idux/issues/1347)) ([f448714](https://github.com/IDuxFE/idux/commit/f448714ab19d8c2e5ddb170ed4dec5f9a8526054))
- **comp:upload:** customRequest allows optional and async ([#1340](https://github.com/IDuxFE/idux/issues/1340)) ([52250a5](https://github.com/IDuxFE/idux/commit/52250a55225b8d36df904e3211d463fb67d23308))
- **pro:layout:** the dom still renders without the logo ([#1348](https://github.com/IDuxFE/idux/issues/1348)) ([375c691](https://github.com/IDuxFE/idux/commit/375c69132dcd06a46cdbf449aac8760d2e25eab5))
- **pro:search:** zIndex should be updated only when focused change ([#1356](https://github.com/IDuxFE/idux/issues/1356)) ([61a51fd](https://github.com/IDuxFE/idux/commit/61a51fd62c9ab74601261ac82be692ee782ceb4f))
- **pro:table:** wrong type of ellipsis ([#1345](https://github.com/IDuxFE/idux/issues/1345)) ([86c59f8](https://github.com/IDuxFE/idux/commit/86c59f8e98b70248178c2c8d4fc440d33b91ca7f))
- **scripts:** remove min.css ([#1359](https://github.com/IDuxFE/idux/issues/1359)) ([20f04f4](https://github.com/IDuxFE/idux/commit/20f04f45dbb0927ce0314ff731bb7ac4c0e9b9db))

### Features

- **comp:button,checkbox,radio:** add waveless prop ([#1303](https://github.com/IDuxFE/idux/issues/1303)) ([4881414](https://github.com/IDuxFE/idux/commit/4881414bf48fee70cc13f0038e8487b5390a92d3))
- **comp:table:** selectable supports showIndex ([#1360](https://github.com/IDuxFE/idux/issues/1360)) ([19e6f68](https://github.com/IDuxFE/idux/commit/19e6f685cda0c1900fa624a09349e95593c32d3b))
- **comp:tabs:** add size props, default value is md ([#1361](https://github.com/IDuxFE/idux/issues/1361)) ([41eb8d9](https://github.com/IDuxFE/idux/commit/41eb8d92af463c0e36a2bba0c631cd9acf5e45fe))
- **pro:search:** search btn triggers search change now ([#1321](https://github.com/IDuxFE/idux/issues/1321)) ([e44673f](https://github.com/IDuxFE/idux/commit/e44673f5320a76d9daca61f887a44e377d206815))
- **pro:search:** support searchField placeholder ([#1322](https://github.com/IDuxFE/idux/issues/1322)) ([84d0e66](https://github.com/IDuxFE/idux/commit/84d0e662024bd9f763a9f5debd65e90d52238c4b))
- **pro:table:** support layoutable ([#1364](https://github.com/IDuxFE/idux/issues/1364)) ([2e7533c](https://github.com/IDuxFE/idux/commit/2e7533cfebbbb12bd682b4805fb600d3a438607e))

## [1.2.4](https://github.com/IDuxFE/idux/compare/v1.2.3...v1.2.4) (2022-12-10)

### Bug Fixes

- **comp:\*:** the font size under seer theme is incorrect ([#1343](https://github.com/IDuxFE/idux/issues/1343)) ([5c74fcf](https://github.com/IDuxFE/idux/commit/5c74fcf6964bd7d76e5d35f5bf84ca52b0f21fae))
- **comp:carousel:** only two items and arrow is true, the switch appears blank ([#1346](https://github.com/IDuxFE/idux/issues/1346)) ([6a5f46b](https://github.com/IDuxFE/idux/commit/6a5f46b3af56efe3c74434845708843483e13557))
- **comp:checkbox:** style error when disabled ([#1344](https://github.com/IDuxFE/idux/issues/1344)) ([55b0be8](https://github.com/IDuxFE/idux/commit/55b0be849a43cf06c6dd98f4086ae0db37728ecf))
- **comp:date-picker,comp:time-picker:** opening picker shouldn't scroll to window top ([#1342](https://github.com/IDuxFE/idux/issues/1342)) ([cce0c0e](https://github.com/IDuxFE/idux/commit/cce0c0e81b67722f797f73db52632974ad7822b9))
- **comp:empty:** style update with icon ([#1349](https://github.com/IDuxFE/idux/issues/1349)) ([69ec9f9](https://github.com/IDuxFE/idux/commit/69ec9f944ea3569b6a85c0bcb9eb278f2fad084e))
- **comp:progress:** trailColor not work ([#1347](https://github.com/IDuxFE/idux/issues/1347)) ([f448714](https://github.com/IDuxFE/idux/commit/f448714ab19d8c2e5ddb170ed4dec5f9a8526054))
- **comp:upload:** customRequest allows optional and async ([#1340](https://github.com/IDuxFE/idux/issues/1340)) ([52250a5](https://github.com/IDuxFE/idux/commit/52250a55225b8d36df904e3211d463fb67d23308))
- **pro:layout:** the dom still renders without the logo ([#1348](https://github.com/IDuxFE/idux/issues/1348)) ([375c691](https://github.com/IDuxFE/idux/commit/375c69132dcd06a46cdbf449aac8760d2e25eab5))
- **pro:table:** wrong type of ellipsis ([#1345](https://github.com/IDuxFE/idux/issues/1345)) ([86c59f8](https://github.com/IDuxFE/idux/commit/86c59f8e98b70248178c2c8d4fc440d33b91ca7f))

## [1.2.3](https://github.com/IDuxFE/idux/compare/v1.2.2...v1.2.3) (2022-12-07)

### Bug Fixes

- **cdk:popper:** shift middleware does not work on the arrow ([#1337](https://github.com/IDuxFE/idux/issues/1337)) ([3f7afbd](https://github.com/IDuxFE/idux/commit/3f7afbdb8a8562887dddaf1c73272033ae5901a2))
- **comp:\*:** overlayContainer adds callback parameter ([#1336](https://github.com/IDuxFE/idux/issues/1336)) ([70e0d34](https://github.com/IDuxFE/idux/commit/70e0d34fd38c9dc1179b9bdb9d93f2e480a48b0a))
- **comp:\*:** via getter to manage overlayZIndex ([#1341](https://github.com/IDuxFE/idux/issues/1341)) ([ad3445d](https://github.com/IDuxFE/idux/commit/ad3445d6968678f4223cc073e2e9be3dc9e536ba))
- **comp:header:** remove the default padding ([#1330](https://github.com/IDuxFE/idux/issues/1330)) ([236f691](https://github.com/IDuxFE/idux/commit/236f6916a5e40815b3c55f09b45d759e5409f465))
- **comp:table:** align not work with selectable ([#1339](https://github.com/IDuxFE/idux/issues/1339)) ([be9e814](https://github.com/IDuxFE/idux/commit/be9e814e4c6d66900bd61a5fef967b147bdd7440))
- **pro:layout:** stype update and remove useless code ([#1335](https://github.com/IDuxFE/idux/issues/1335)) ([a4ba26a](https://github.com/IDuxFE/idux/commit/a4ba26a5cacf5f4c73f36e66406e6a9a07f37ad8))
- **pro:search:** all tags should be displayed when focused ([#1331](https://github.com/IDuxFE/idux/issues/1331)) ([05478ab](https://github.com/IDuxFE/idux/commit/05478abaee913334409dd0933a2e35487c7ff060))
- **pro:table:** resizable not work ([#1334](https://github.com/IDuxFE/idux/issues/1334)) ([b3a568d](https://github.com/IDuxFE/idux/commit/b3a568d6b82557846756b456f57d64d14c1a41ff))
- **pro:tree:** expandIcon style error without header ([#1332](https://github.com/IDuxFE/idux/issues/1332)) ([bf03db5](https://github.com/IDuxFE/idux/commit/bf03db58c1abc38653f17e76de2809bd456095ae))

## [1.2.2](https://github.com/IDuxFE/idux/compare/v1.2.1...v1.2.2) (2022-12-02)

### Bug Fixes

- **cdk:popper:** use shift middleware to keep popper in view ([#1329](https://github.com/IDuxFE/idux/issues/1329)) ([8152be1](https://github.com/IDuxFE/idux/commit/8152be184b1796c00a8ab5cbe41e2aacc77d5a91))
- **comp:\*:** overlay should be initialized before calling show ([#1320](https://github.com/IDuxFE/idux/issues/1320)) ([a93231d](https://github.com/IDuxFE/idux/commit/a93231de5f937135f548535089d7da77d94f0a55))
- **comp:tooltip:** style update and css variable supports ([#1323](https://github.com/IDuxFE/idux/issues/1323)) ([3c305a7](https://github.com/IDuxFE/idux/commit/3c305a73e9717a09e32d0408554fd83713bd5010))
- **dropdown,header,tree-select:** update style with design ([#1319](https://github.com/IDuxFE/idux/issues/1319)) ([145865c](https://github.com/IDuxFE/idux/commit/145865c64034515af1e86f63fd9c939fd30f0126))
- **pro:table:** column visible change should be trigger onColumnsChange ([#1327](https://github.com/IDuxFE/idux/issues/1327)) ([d0fb7fd](https://github.com/IDuxFE/idux/commit/d0fb7fd6f4729ab64a9e1286a22990d125f6a181))
- **pro:table:** the sorter should not be triggered on resize end ([#1324](https://github.com/IDuxFE/idux/issues/1324)) ([57c5a7f](https://github.com/IDuxFE/idux/commit/57c5a7fa14aae9bbc50c4fecb2d115f38888ef8c))

## [1.2.1](https://github.com/IDuxFE/idux/compare/v1.0.1...v1.2.1) (2022-12-01)

### Bug Fixes

- **cdk:drag-drop:** invalid handle ([677b163](https://github.com/IDuxFE/idux/commit/677b1635e54ff0d38b80563b0b6fa632f30b1432))
- **comp:\*:** footer buttons aren't aligned when loading ([#1306](https://github.com/IDuxFE/idux/issues/1306)) ([521f9fb](https://github.com/IDuxFE/idux/commit/521f9fb342c26397e422ed0955b93a3b71ab7bf5))
- **comp:\*:** overlay destory on hide caused popper position error ([#1288](https://github.com/IDuxFE/idux/issues/1288)) ([0d5fe4e](https://github.com/IDuxFE/idux/commit/0d5fe4eda56c33aafab5fdcb56d21c26931f8128))
- **comp:\*:** overlay offset with arrow should consider arrow size ([#1255](https://github.com/IDuxFE/idux/issues/1255)) ([81802c6](https://github.com/IDuxFE/idux/commit/81802c6924cd4fc09be7f5651bc8421ba813c532))
- **comp:\*:** update components style ([#1238](https://github.com/IDuxFE/idux/issues/1238)) ([68435df](https://github.com/IDuxFE/idux/commit/68435dffce06aeaeed870e8da745fcbfd44b685e))
- **comp:alert:** style update and css variable support ([#1283](https://github.com/IDuxFE/idux/issues/1283)) ([3ce5024](https://github.com/IDuxFE/idux/commit/3ce50243e3c31aca0d461f5fedd16f355eb59836))
- **comp:button:** button-group style error when nesting itself ([#1299](https://github.com/IDuxFE/idux/issues/1299)) ([af018fb](https://github.com/IDuxFE/idux/commit/af018fbeb9d427022f712785d235a197323c8556))
- **comp:button:** for text and link mode, the min-width is auto ([#1278](https://github.com/IDuxFE/idux/issues/1278)) ([36411e2](https://github.com/IDuxFE/idux/commit/36411e21417769a8238059d620e027f58d0435c5))
- **comp:button:** remove height for text and link mode ([#1282](https://github.com/IDuxFE/idux/issues/1282)) ([d4653bb](https://github.com/IDuxFE/idux/commit/d4653bb1ed543a8f758d895fffae33c5a122d0e4))
- **comp:button:** style problems caused by line-height with loading ([#1308](https://github.com/IDuxFE/idux/issues/1308)) ([23aeeed](https://github.com/IDuxFE/idux/commit/23aeeed933aebc0299a4e994988aa72006d7a75e))
- **comp:button:** text and link mode remove padding and bg color ([#1275](https://github.com/IDuxFE/idux/issues/1275)) ([6082a15](https://github.com/IDuxFE/idux/commit/6082a15ac78c0087962bd21921385734ad1b5d72))
- **comp:button:** the radius of button group always hidden ([#1290](https://github.com/IDuxFE/idux/issues/1290)) ([714f588](https://github.com/IDuxFE/idux/commit/714f5887dde46627371c9fa912768291988baead))
- **comp:cascader:** set expandedKeys with default value ([#1315](https://github.com/IDuxFE/idux/issues/1315)) ([1d8aa5f](https://github.com/IDuxFE/idux/commit/1d8aa5f8f23c7f068080e41c6ee3f2c876b2f5fe)), closes [#1192](https://github.com/IDuxFE/idux/issues/1192)
- **comp:checkbox:** style update and css variable support ([#1291](https://github.com/IDuxFE/idux/issues/1291)) ([b378ef2](https://github.com/IDuxFE/idux/commit/b378ef220bc6aedf25a5fa8e35f754127a489bf5))
- **comp:date-picker:** range panel date select shouldn't swap time ([#1258](https://github.com/IDuxFE/idux/issues/1258)) ([9622758](https://github.com/IDuxFE/idux/commit/96227584fe60691bfbf261f67a43220f26c162c0))
- **comp:dropdown:** style update and css variable support ([#1301](https://github.com/IDuxFE/idux/issues/1301)) ([0a59283](https://github.com/IDuxFE/idux/commit/0a5928331999ce70b294f8ffd51cd87b6ef7271b))
- **comp:dropdown:** update style with dark menu ([#1313](https://github.com/IDuxFE/idux/issues/1313)) ([6878994](https://github.com/IDuxFE/idux/commit/6878994fafe456f61fafcae3e38039e1ae64920a))
- **comp:input-number:** check whether value is a number ([#1250](https://github.com/IDuxFE/idux/issues/1250)) ([75c9fe1](https://github.com/IDuxFE/idux/commit/75c9fe1ca420f972dbad56364aa2d2a7f696d2c6))
- **comp:input,input-number:** style update and support css variable ([#1289](https://github.com/IDuxFE/idux/issues/1289)) ([5a9eb9d](https://github.com/IDuxFE/idux/commit/5a9eb9d0f8a1f06e6ca25823244cb1ba524c8af3))
- **comp:input:** input suffix is `icon size` only when it's icon ([#1233](https://github.com/IDuxFE/idux/issues/1233)) ([5d3f260](https://github.com/IDuxFE/idux/commit/5d3f2607367331059fe2ff884889227a3c4567dd))
- **comp:layout:** style update and css vaiable support ([#1302](https://github.com/IDuxFE/idux/issues/1302)) ([3d8a5c3](https://github.com/IDuxFE/idux/commit/3d8a5c3bd3affb0f4967ac73374f0622abe6aec5))
- **comp:modal:** update modal content with `update` doesn't work ([#1270](https://github.com/IDuxFE/idux/issues/1270)) ([38f130a](https://github.com/IDuxFE/idux/commit/38f130a932938539cb25d2a71eafffb0e9a8005f))
- **comp:radio:** style update and css variable support ([#1293](https://github.com/IDuxFE/idux/issues/1293)) ([e438cb3](https://github.com/IDuxFE/idux/commit/e438cb3b73fe7c2009b4722463e6a2d29cc7b3e2))
- **comp:select:** clicking selector when opened should trigger focus ([#1271](https://github.com/IDuxFE/idux/issues/1271)) ([bd34155](https://github.com/IDuxFE/idux/commit/bd34155089c1755a8dffd31e68a9f7ff0e89ace9))
- **comp:slider:** slider thumb tooltip shouldn't blink ([#1256](https://github.com/IDuxFE/idux/issues/1256)) ([fe6a533](https://github.com/IDuxFE/idux/commit/fe6a5330eca4877a8429beb7e47812da3cdf6f22))
- **comp:space:** empty item should be hidden ([#1263](https://github.com/IDuxFE/idux/issues/1263)) ([7fed8bc](https://github.com/IDuxFE/idux/commit/7fed8bca5b4e1e8aa720d38fc5acd10bd27ff473))
- **comp:spin:** compatible with the resize of target, when useSpin is used ([#1273](https://github.com/IDuxFE/idux/issues/1273)) ([bb2b4fd](https://github.com/IDuxFE/idux/commit/bb2b4fd8ea31877be0e7f6b08a8d8167275e0d0f))
- **comp:stepper,comp:slider:** fix stepper and slider styles ([#1243](https://github.com/IDuxFE/idux/issues/1243)) ([d07e914](https://github.com/IDuxFE/idux/commit/d07e9143ccaf40518c4a7017aad65bf1f33b2797))
- **comp:table:** resize column width with percentum not work ([#1254](https://github.com/IDuxFE/idux/issues/1254)) ([ae21248](https://github.com/IDuxFE/idux/commit/ae2124844e8cf5f68ae95a1c220bb153f5e54ccb))
- **comp:table:** scrollbar always appear, when scroll.width is set ([#1274](https://github.com/IDuxFE/idux/issues/1274)) ([2d8c9c4](https://github.com/IDuxFE/idux/commit/2d8c9c41e409c9ef9856a8df24d60e56907db1b4))
- **comp:table:** style update and ellipsis conflicts with column type ([#1245](https://github.com/IDuxFE/idux/issues/1245)) ([44a5353](https://github.com/IDuxFE/idux/commit/44a53530b086e52e6bf2c89bc3f6b8c81d3d0f6b))
- **comp:table:** the head is hidden when with autoHeight and not scroll ([#1317](https://github.com/IDuxFE/idux/issues/1317)) ([bf088c3](https://github.com/IDuxFE/idux/commit/bf088c35bf43493894ec42c92e2493a26f9a3079))
- **comp:tabs:** offset error when setting selectedKey ([#1236](https://github.com/IDuxFE/idux/issues/1236)) ([050a1f7](https://github.com/IDuxFE/idux/commit/050a1f7089aba2b818382393d76d6ca7acab2e2f))
- **comp:textarea,pro:textarea:** scrollHeight miscalculated on firefox ([c61d7b2](https://github.com/IDuxFE/idux/commit/c61d7b22b1755e35e6974a738a5d6fcf68680182))
- **comp:time-picker:** resolve time-range-picker console error ([82ce400](https://github.com/IDuxFE/idux/commit/82ce4004d98b86c53b6c2ec334542294ffa36b55))
- **comp:transfer:** empty suffix node shouldn't be rendered ([#1267](https://github.com/IDuxFE/idux/issues/1267)) ([4ab1ebb](https://github.com/IDuxFE/idux/commit/4ab1ebb4c02b6b55edfd2cfdece578c95668c3fd))
- **comp:transfer:** update transfer style and demo ([#1234](https://github.com/IDuxFE/idux/issues/1234)) ([d93b815](https://github.com/IDuxFE/idux/commit/d93b815f22220fb3ff11c313873cb1d1ddef1ccd))
- **comp:tree:** all nodes should be hidden when search not matched ([#1305](https://github.com/IDuxFE/idux/issues/1305)) ([fd3fae2](https://github.com/IDuxFE/idux/commit/fd3fae2c5b9e2662e7a17f5bab43ff6b15336796))
- **comp:tree:** height not working in non-virtual mode ([#1244](https://github.com/IDuxFE/idux/issues/1244)) ([fa4d0f3](https://github.com/IDuxFE/idux/commit/fa4d0f3375ce62a8664c6a85ad356933a29b54b4))
- **comp:tree:** leafLineIcon style not alignment ([#1287](https://github.com/IDuxFE/idux/issues/1287)) ([6f77ada](https://github.com/IDuxFE/idux/commit/6f77adaedf084bcd675f45ac2931714366091462))
- **pro:search:** name segment overlay isn't automatically opened now ([#1260](https://github.com/IDuxFE/idux/issues/1260)) ([da4de16](https://github.com/IDuxFE/idux/commit/da4de1681ef5bbffdbe0f7a10d54173572a765fc))
- **pro:table:** resize one column to make the other columns too narrow ([#1276](https://github.com/IDuxFE/idux/issues/1276)) ([cd4e08c](https://github.com/IDuxFE/idux/commit/cd4e08c74936f89ddf802724cb7cfa98c7ee5e7f))
- update components style according to UI design ([#1232](https://github.com/IDuxFE/idux/issues/1232)) ([4bf61fb](https://github.com/IDuxFE/idux/commit/4bf61fbda7bf277f546e65fc0945a9720d6aeb1c))

### Features

- **\*:transfer:** add transfer searchPlaceholder prop; add table transfer max selected count demo ([#1230](https://github.com/IDuxFE/idux/issues/1230)) ([2d47151](https://github.com/IDuxFE/idux/commit/2d47151d368ac04f0fd55bea89a959331e4e4a7e)), closes [#1213](https://github.com/IDuxFE/idux/issues/1213)
- **comp:\*:** export provider token ([#1310](https://github.com/IDuxFE/idux/issues/1310)) ([bc482bd](https://github.com/IDuxFE/idux/commit/bc482bd207e37759c995b59ce28b2f41f7b54487))
- **comp:alert:** default to worring, add offline type, support banner ([#1298](https://github.com/IDuxFE/idux/issues/1298)) ([9ca13db](https://github.com/IDuxFE/idux/commit/9ca13dbb9e9dc4eb6c75d02fe9f346bbc4c21a37))
- **comp:button:** style update and group support gap ([#1235](https://github.com/IDuxFE/idux/issues/1235)) ([7613c7d](https://github.com/IDuxFE/idux/commit/7613c7d76ed7c13a7a5aca4e7ab3ed5d32a34eac))
- **comp:button:** the ButtonGroup extends Space ([#1279](https://github.com/IDuxFE/idux/issues/1279)) ([46e65b1](https://github.com/IDuxFE/idux/commit/46e65b1798511d9709cc787a758cbd58d70560d6))
- **comp:collapse:** update style and add size prop ([#1252](https://github.com/IDuxFE/idux/issues/1252)) ([f3aa234](https://github.com/IDuxFE/idux/commit/f3aa23408ee04561da17aef6c5dbd09f814bbeb0))
- **comp:config:** add seer config ([#1295](https://github.com/IDuxFE/idux/issues/1295)) ([db38d14](https://github.com/IDuxFE/idux/commit/db38d146d3d72f7f44e295aa0cd8ba789ce034a8))
- **comp:date-picker:** add dateRangePicker `onSelect` event ([#1248](https://github.com/IDuxFE/idux/issues/1248)) ([b263b79](https://github.com/IDuxFE/idux/commit/b263b79b7b6b987bad572829b334906bc284844b))
- **comp:empty:** add simple mode and support css variable ([#1268](https://github.com/IDuxFE/idux/issues/1268)) ([4d5e770](https://github.com/IDuxFE/idux/commit/4d5e7702546e48afa1b1c46e6d73cba2b1ba71cc))
- **comp:form:** prevent the default submit event ([#1296](https://github.com/IDuxFE/idux/issues/1296)) ([edca00d](https://github.com/IDuxFE/idux/commit/edca00d2b74ac86f39a990f043e638747550d288))
- **comp:header:** update style and support css variable ([#1251](https://github.com/IDuxFE/idux/issues/1251)) ([be94528](https://github.com/IDuxFE/idux/commit/be94528a8b6966a7ee25d3fc05f940147dbbe07e))
- **comp:menu:** add overlayDelay prop and menu item support custom suffix ([#1300](https://github.com/IDuxFE/idux/issues/1300)) ([f1dde91](https://github.com/IDuxFE/idux/commit/f1dde91da7b5469cb7f540b3eb7a9ba30bded8a1)), closes [#1292](https://github.com/IDuxFE/idux/issues/1292)
- **comp:pagination:** add large size and update style ([#1249](https://github.com/IDuxFE/idux/issues/1249)) ([a05d7b7](https://github.com/IDuxFE/idux/commit/a05d7b7872cedb8317b039bb8f978344fb2af59d))
- **comp:select,comp:tree-select,comp:cascader:** add selectedItem slot ([#1257](https://github.com/IDuxFE/idux/issues/1257)) ([9651a8d](https://github.com/IDuxFE/idux/commit/9651a8d406e7e6097dd7472b3bfffe4a5e7e3b1f))
- **comp:spin:** add IxSpinProvider ([#1222](https://github.com/IDuxFE/idux/issues/1222)) ([42491a9](https://github.com/IDuxFE/idux/commit/42491a944757b38103c8b3eac141fa54902c5112))
- **comp:table:** enhancement for icon of expandable and ellipsis ([#1280](https://github.com/IDuxFE/idux/issues/1280)) ([9587f15](https://github.com/IDuxFE/idux/commit/9587f151703cd7ec4803b7561d89e8f71fb12224))
- **comp:tooltip,comp:tree,comp:tree-select:** add offset prop ([#1221](https://github.com/IDuxFE/idux/issues/1221)) ([f99028f](https://github.com/IDuxFE/idux/commit/f99028ffc1a75dc8f8a843ddc6d8cc6e0ac4ff66))
- **pro:layout:** add logo prop and update style ([#1307](https://github.com/IDuxFE/idux/issues/1307)) ([1d47a0c](https://github.com/IDuxFE/idux/commit/1d47a0c4557b66a1f01b006b95780ee69eb9ff13))
- **pro:search:** temp state is now cleared after blur, add merge items demo ([#1253](https://github.com/IDuxFE/idux/issues/1253)) ([775901e](https://github.com/IDuxFE/idux/commit/775901e33c083e0bbd963de6bd566067362c5f0d))

# [1.2.0](https://github.com/IDuxFE/idux/compare/v1.0.1...v1.2.0) (2022-11-28)

### Bug Fixes

- **cdk:drag-drop:** invalid handle ([677b163](https://github.com/IDuxFE/idux/commit/677b1635e54ff0d38b80563b0b6fa632f30b1432))
- **comp:\*:** footer buttons aren't aligned when loading ([#1306](https://github.com/IDuxFE/idux/issues/1306)) ([521f9fb](https://github.com/IDuxFE/idux/commit/521f9fb342c26397e422ed0955b93a3b71ab7bf5))
- **comp:\*:** overlay destory on hide caused popper position error ([#1288](https://github.com/IDuxFE/idux/issues/1288)) ([0d5fe4e](https://github.com/IDuxFE/idux/commit/0d5fe4eda56c33aafab5fdcb56d21c26931f8128))
- **comp:\*:** overlay offset with arrow should consider arrow size ([#1255](https://github.com/IDuxFE/idux/issues/1255)) ([81802c6](https://github.com/IDuxFE/idux/commit/81802c6924cd4fc09be7f5651bc8421ba813c532))
- **comp:\*:** update components style ([#1238](https://github.com/IDuxFE/idux/issues/1238)) ([68435df](https://github.com/IDuxFE/idux/commit/68435dffce06aeaeed870e8da745fcbfd44b685e))
- **comp:alert:** style update and css variable support ([#1283](https://github.com/IDuxFE/idux/issues/1283)) ([3ce5024](https://github.com/IDuxFE/idux/commit/3ce50243e3c31aca0d461f5fedd16f355eb59836))
- **comp:button:** button-group style error when nesting itself ([#1299](https://github.com/IDuxFE/idux/issues/1299)) ([af018fb](https://github.com/IDuxFE/idux/commit/af018fbeb9d427022f712785d235a197323c8556))
- **comp:button:** for text and link mode, the min-width is auto ([#1278](https://github.com/IDuxFE/idux/issues/1278)) ([36411e2](https://github.com/IDuxFE/idux/commit/36411e21417769a8238059d620e027f58d0435c5))
- **comp:button:** remove height for text and link mode ([#1282](https://github.com/IDuxFE/idux/issues/1282)) ([d4653bb](https://github.com/IDuxFE/idux/commit/d4653bb1ed543a8f758d895fffae33c5a122d0e4))
- **comp:button:** style problems caused by line-height with loading ([#1308](https://github.com/IDuxFE/idux/issues/1308)) ([23aeeed](https://github.com/IDuxFE/idux/commit/23aeeed933aebc0299a4e994988aa72006d7a75e))
- **comp:button:** text and link mode remove padding and bg color ([#1275](https://github.com/IDuxFE/idux/issues/1275)) ([6082a15](https://github.com/IDuxFE/idux/commit/6082a15ac78c0087962bd21921385734ad1b5d72))
- **comp:button:** the radius of button group always hidden ([#1290](https://github.com/IDuxFE/idux/issues/1290)) ([714f588](https://github.com/IDuxFE/idux/commit/714f5887dde46627371c9fa912768291988baead))
- **comp:checkbox:** style update and css variable support ([#1291](https://github.com/IDuxFE/idux/issues/1291)) ([b378ef2](https://github.com/IDuxFE/idux/commit/b378ef220bc6aedf25a5fa8e35f754127a489bf5))
- **comp:date-picker:** range panel date select shouldn't swap time ([#1258](https://github.com/IDuxFE/idux/issues/1258)) ([9622758](https://github.com/IDuxFE/idux/commit/96227584fe60691bfbf261f67a43220f26c162c0))
- **comp:dropdown:** style update and css variable support ([#1301](https://github.com/IDuxFE/idux/issues/1301)) ([0a59283](https://github.com/IDuxFE/idux/commit/0a5928331999ce70b294f8ffd51cd87b6ef7271b))
- **comp:input-number:** check whether value is a number ([#1250](https://github.com/IDuxFE/idux/issues/1250)) ([75c9fe1](https://github.com/IDuxFE/idux/commit/75c9fe1ca420f972dbad56364aa2d2a7f696d2c6))
- **comp:input,input-number:** style update and support css variable ([#1289](https://github.com/IDuxFE/idux/issues/1289)) ([5a9eb9d](https://github.com/IDuxFE/idux/commit/5a9eb9d0f8a1f06e6ca25823244cb1ba524c8af3))
- **comp:input:** input suffix is `icon size` only when it's icon ([#1233](https://github.com/IDuxFE/idux/issues/1233)) ([5d3f260](https://github.com/IDuxFE/idux/commit/5d3f2607367331059fe2ff884889227a3c4567dd))
- **comp:layout:** style update and css vaiable support ([#1302](https://github.com/IDuxFE/idux/issues/1302)) ([3d8a5c3](https://github.com/IDuxFE/idux/commit/3d8a5c3bd3affb0f4967ac73374f0622abe6aec5))
- **comp:modal:** update modal content with `update` doesn't work ([#1270](https://github.com/IDuxFE/idux/issues/1270)) ([38f130a](https://github.com/IDuxFE/idux/commit/38f130a932938539cb25d2a71eafffb0e9a8005f))
- **comp:radio:** style update and css variable support ([#1293](https://github.com/IDuxFE/idux/issues/1293)) ([e438cb3](https://github.com/IDuxFE/idux/commit/e438cb3b73fe7c2009b4722463e6a2d29cc7b3e2))
- **comp:select:** clicking selector when opened should trigger focus ([#1271](https://github.com/IDuxFE/idux/issues/1271)) ([bd34155](https://github.com/IDuxFE/idux/commit/bd34155089c1755a8dffd31e68a9f7ff0e89ace9))
- **comp:slider:** slider thumb tooltip shouldn't blink ([#1256](https://github.com/IDuxFE/idux/issues/1256)) ([fe6a533](https://github.com/IDuxFE/idux/commit/fe6a5330eca4877a8429beb7e47812da3cdf6f22))
- **comp:space:** empty item should be hidden ([#1263](https://github.com/IDuxFE/idux/issues/1263)) ([7fed8bc](https://github.com/IDuxFE/idux/commit/7fed8bca5b4e1e8aa720d38fc5acd10bd27ff473))
- **comp:spin:** compatible with the resize of target, when useSpin is used ([#1273](https://github.com/IDuxFE/idux/issues/1273)) ([bb2b4fd](https://github.com/IDuxFE/idux/commit/bb2b4fd8ea31877be0e7f6b08a8d8167275e0d0f))
- **comp:stepper,comp:slider:** fix stepper and slider styles ([#1243](https://github.com/IDuxFE/idux/issues/1243)) ([d07e914](https://github.com/IDuxFE/idux/commit/d07e9143ccaf40518c4a7017aad65bf1f33b2797))
- **comp:table:** resize column width with percentum not work ([#1254](https://github.com/IDuxFE/idux/issues/1254)) ([ae21248](https://github.com/IDuxFE/idux/commit/ae2124844e8cf5f68ae95a1c220bb153f5e54ccb))
- **comp:table:** scrollbar always appear, when scroll.width is set ([#1274](https://github.com/IDuxFE/idux/issues/1274)) ([2d8c9c4](https://github.com/IDuxFE/idux/commit/2d8c9c41e409c9ef9856a8df24d60e56907db1b4))
- **comp:table:** style update and ellipsis conflicts with column type ([#1245](https://github.com/IDuxFE/idux/issues/1245)) ([44a5353](https://github.com/IDuxFE/idux/commit/44a53530b086e52e6bf2c89bc3f6b8c81d3d0f6b))
- **comp:tabs:** offset error when setting selectedKey ([#1236](https://github.com/IDuxFE/idux/issues/1236)) ([050a1f7](https://github.com/IDuxFE/idux/commit/050a1f7089aba2b818382393d76d6ca7acab2e2f))
- **comp:textarea,pro:textarea:** scrollHeight miscalculated on firefox ([c61d7b2](https://github.com/IDuxFE/idux/commit/c61d7b22b1755e35e6974a738a5d6fcf68680182))
- **comp:time-picker:** resolve time-range-picker console error ([82ce400](https://github.com/IDuxFE/idux/commit/82ce4004d98b86c53b6c2ec334542294ffa36b55))
- **comp:transfer:** empty suffix node shouldn't be rendered ([#1267](https://github.com/IDuxFE/idux/issues/1267)) ([4ab1ebb](https://github.com/IDuxFE/idux/commit/4ab1ebb4c02b6b55edfd2cfdece578c95668c3fd))
- **comp:transfer:** update transfer style and demo ([#1234](https://github.com/IDuxFE/idux/issues/1234)) ([d93b815](https://github.com/IDuxFE/idux/commit/d93b815f22220fb3ff11c313873cb1d1ddef1ccd))
- **comp:tree:** all nodes should be hidden when search not matched ([#1305](https://github.com/IDuxFE/idux/issues/1305)) ([fd3fae2](https://github.com/IDuxFE/idux/commit/fd3fae2c5b9e2662e7a17f5bab43ff6b15336796))
- **comp:tree:** height not working in non-virtual mode ([#1244](https://github.com/IDuxFE/idux/issues/1244)) ([fa4d0f3](https://github.com/IDuxFE/idux/commit/fa4d0f3375ce62a8664c6a85ad356933a29b54b4))
- **comp:tree:** leafLineIcon style not alignment ([#1287](https://github.com/IDuxFE/idux/issues/1287)) ([6f77ada](https://github.com/IDuxFE/idux/commit/6f77adaedf084bcd675f45ac2931714366091462))
- **pro:search:** name segment overlay isn't automatically opened now ([#1260](https://github.com/IDuxFE/idux/issues/1260)) ([da4de16](https://github.com/IDuxFE/idux/commit/da4de1681ef5bbffdbe0f7a10d54173572a765fc))
- **pro:table:** resize one column to make the other columns too narrow ([#1276](https://github.com/IDuxFE/idux/issues/1276)) ([cd4e08c](https://github.com/IDuxFE/idux/commit/cd4e08c74936f89ddf802724cb7cfa98c7ee5e7f))
- update components style according to UI design ([#1232](https://github.com/IDuxFE/idux/issues/1232)) ([4bf61fb](https://github.com/IDuxFE/idux/commit/4bf61fbda7bf277f546e65fc0945a9720d6aeb1c))

### Features

- **\*:transfer:** add transfer searchPlaceholder prop; add table transfer max selected count demo ([#1230](https://github.com/IDuxFE/idux/issues/1230)) ([2d47151](https://github.com/IDuxFE/idux/commit/2d47151d368ac04f0fd55bea89a959331e4e4a7e)), closes [#1213](https://github.com/IDuxFE/idux/issues/1213)
- **comp:\*:** export provider token ([#1310](https://github.com/IDuxFE/idux/issues/1310)) ([bc482bd](https://github.com/IDuxFE/idux/commit/bc482bd207e37759c995b59ce28b2f41f7b54487))
- **comp:alert:** default to worring, add offline type, support banner ([#1298](https://github.com/IDuxFE/idux/issues/1298)) ([9ca13db](https://github.com/IDuxFE/idux/commit/9ca13dbb9e9dc4eb6c75d02fe9f346bbc4c21a37))
- **comp:button:** style update and group support gap ([#1235](https://github.com/IDuxFE/idux/issues/1235)) ([7613c7d](https://github.com/IDuxFE/idux/commit/7613c7d76ed7c13a7a5aca4e7ab3ed5d32a34eac))
- **comp:button:** the ButtonGroup extends Space ([#1279](https://github.com/IDuxFE/idux/issues/1279)) ([46e65b1](https://github.com/IDuxFE/idux/commit/46e65b1798511d9709cc787a758cbd58d70560d6))
- **comp:collapse:** update style and add size prop ([#1252](https://github.com/IDuxFE/idux/issues/1252)) ([f3aa234](https://github.com/IDuxFE/idux/commit/f3aa23408ee04561da17aef6c5dbd09f814bbeb0))
- **comp:config:** add seer config ([#1295](https://github.com/IDuxFE/idux/issues/1295)) ([db38d14](https://github.com/IDuxFE/idux/commit/db38d146d3d72f7f44e295aa0cd8ba789ce034a8))
- **comp:date-picker:** add dateRangePicker `onSelect` event ([#1248](https://github.com/IDuxFE/idux/issues/1248)) ([b263b79](https://github.com/IDuxFE/idux/commit/b263b79b7b6b987bad572829b334906bc284844b))
- **comp:empty:** add simple mode and support css variable ([#1268](https://github.com/IDuxFE/idux/issues/1268)) ([4d5e770](https://github.com/IDuxFE/idux/commit/4d5e7702546e48afa1b1c46e6d73cba2b1ba71cc))
- **comp:form:** prevent the default submit event ([#1296](https://github.com/IDuxFE/idux/issues/1296)) ([edca00d](https://github.com/IDuxFE/idux/commit/edca00d2b74ac86f39a990f043e638747550d288))
- **comp:header:** update style and support css variable ([#1251](https://github.com/IDuxFE/idux/issues/1251)) ([be94528](https://github.com/IDuxFE/idux/commit/be94528a8b6966a7ee25d3fc05f940147dbbe07e))
- **comp:menu:** add overlayDelay prop and menu item support custom suffix ([#1300](https://github.com/IDuxFE/idux/issues/1300)) ([f1dde91](https://github.com/IDuxFE/idux/commit/f1dde91da7b5469cb7f540b3eb7a9ba30bded8a1)), closes [#1292](https://github.com/IDuxFE/idux/issues/1292)
- **comp:pagination:** add large size and update style ([#1249](https://github.com/IDuxFE/idux/issues/1249)) ([a05d7b7](https://github.com/IDuxFE/idux/commit/a05d7b7872cedb8317b039bb8f978344fb2af59d))
- **comp:select,comp:tree-select,comp:cascader:** add selectedItem slot ([#1257](https://github.com/IDuxFE/idux/issues/1257)) ([9651a8d](https://github.com/IDuxFE/idux/commit/9651a8d406e7e6097dd7472b3bfffe4a5e7e3b1f))
- **comp:spin:** add IxSpinProvider ([#1222](https://github.com/IDuxFE/idux/issues/1222)) ([42491a9](https://github.com/IDuxFE/idux/commit/42491a944757b38103c8b3eac141fa54902c5112))
- **comp:table:** enhancement for icon of expandable and ellipsis ([#1280](https://github.com/IDuxFE/idux/issues/1280)) ([9587f15](https://github.com/IDuxFE/idux/commit/9587f151703cd7ec4803b7561d89e8f71fb12224))
- **comp:tooltip,comp:tree,comp:tree-select:** add offset prop ([#1221](https://github.com/IDuxFE/idux/issues/1221)) ([f99028f](https://github.com/IDuxFE/idux/commit/f99028ffc1a75dc8f8a843ddc6d8cc6e0ac4ff66))
- **pro:layout:** add logo prop and update style ([#1307](https://github.com/IDuxFE/idux/issues/1307)) ([1d47a0c](https://github.com/IDuxFE/idux/commit/1d47a0c4557b66a1f01b006b95780ee69eb9ff13))
- **pro:search:** temp state is now cleared after blur, add merge items demo ([#1253](https://github.com/IDuxFE/idux/issues/1253)) ([775901e](https://github.com/IDuxFE/idux/commit/775901e33c083e0bbd963de6bd566067362c5f0d))

## [1.1.2](https://github.com/IDuxFE/idux/compare/v1.1.1...v1.1.2) (2022-11-15)

### Bug Fixes

- **comp:button:** text and link mode remove padding and bg color ([#1275](https://github.com/IDuxFE/idux/issues/1275)) ([6082a15](https://github.com/IDuxFE/idux/commit/6082a15ac78c0087962bd21921385734ad1b5d72))
- **comp:modal:** update modal content with `update` doesn't work ([#1270](https://github.com/IDuxFE/idux/issues/1270)) ([38f130a](https://github.com/IDuxFE/idux/commit/38f130a932938539cb25d2a71eafffb0e9a8005f))
- **comp:transfer:** empty suffix node shouldn't be rendered ([#1267](https://github.com/IDuxFE/idux/issues/1267)) ([4ab1ebb](https://github.com/IDuxFE/idux/commit/4ab1ebb4c02b6b55edfd2cfdece578c95668c3fd))
- **pro:table:** resize one column to make the other columns too narrow ([#1276](https://github.com/IDuxFE/idux/issues/1276)) ([cd4e08c](https://github.com/IDuxFE/idux/commit/cd4e08c74936f89ddf802724cb7cfa98c7ee5e7f))

## [1.1.1](https://github.com/IDuxFE/idux/compare/v1.1.0...v1.1.1) (2022-11-13)

### Bug Fixes

- **comp:select:** clicking selector when opened should trigger focus ([#1271](https://github.com/IDuxFE/idux/issues/1271)) ([bd34155](https://github.com/IDuxFE/idux/commit/bd34155089c1755a8dffd31e68a9f7ff0e89ace9))
- **comp:spin:** compatible with the resize of target, when useSpin is used ([#1273](https://github.com/IDuxFE/idux/issues/1273)) ([bb2b4fd](https://github.com/IDuxFE/idux/commit/bb2b4fd8ea31877be0e7f6b08a8d8167275e0d0f))
- **comp:table:** scrollbar always appear, when scroll.width is set ([#1274](https://github.com/IDuxFE/idux/issues/1274)) ([2d8c9c4](https://github.com/IDuxFE/idux/commit/2d8c9c41e409c9ef9856a8df24d60e56907db1b4))
- **comp:tree:** height not working in non-virtual mode ([#1244](https://github.com/IDuxFE/idux/issues/1244)) ([fa4d0f3](https://github.com/IDuxFE/idux/commit/fa4d0f3375ce62a8664c6a85ad356933a29b54b4))
- **pro:search:** name segment overlay isn't automatically opened now ([#1260](https://github.com/IDuxFE/idux/issues/1260)) ([da4de16](https://github.com/IDuxFE/idux/commit/da4de1681ef5bbffdbe0f7a10d54173572a765fc))

# [1.1.0](https://github.com/IDuxFE/idux/compare/v1.0.1...v1.1.0) (2022-11-08)

### Bug Fixes

- **cdk:drag-drop:** invalid handle ([677b163](https://github.com/IDuxFE/idux/commit/677b1635e54ff0d38b80563b0b6fa632f30b1432))
- **comp:\*:** overlay offset with arrow should consider arrow size ([#1255](https://github.com/IDuxFE/idux/issues/1255)) ([81802c6](https://github.com/IDuxFE/idux/commit/81802c6924cd4fc09be7f5651bc8421ba813c532))
- **comp:\*:** update components style ([#1238](https://github.com/IDuxFE/idux/issues/1238)) ([68435df](https://github.com/IDuxFE/idux/commit/68435dffce06aeaeed870e8da745fcbfd44b685e))
- **comp:date-picker:** range panel date select shouldn't swap time ([#1258](https://github.com/IDuxFE/idux/issues/1258)) ([9622758](https://github.com/IDuxFE/idux/commit/96227584fe60691bfbf261f67a43220f26c162c0))
- **comp:input-number:** check whether value is a number ([#1250](https://github.com/IDuxFE/idux/issues/1250)) ([75c9fe1](https://github.com/IDuxFE/idux/commit/75c9fe1ca420f972dbad56364aa2d2a7f696d2c6))
- **comp:input:** input suffix is `icon size` only when it's icon ([#1233](https://github.com/IDuxFE/idux/issues/1233)) ([5d3f260](https://github.com/IDuxFE/idux/commit/5d3f2607367331059fe2ff884889227a3c4567dd))
- **comp:slider:** slider thumb tooltip shouldn't blink ([#1256](https://github.com/IDuxFE/idux/issues/1256)) ([fe6a533](https://github.com/IDuxFE/idux/commit/fe6a5330eca4877a8429beb7e47812da3cdf6f22))
- **comp:space:** empty item should be hidden ([#1263](https://github.com/IDuxFE/idux/issues/1263)) ([7fed8bc](https://github.com/IDuxFE/idux/commit/7fed8bca5b4e1e8aa720d38fc5acd10bd27ff473))
- **comp:stepper,comp:slider:** fix stepper and slider styles ([#1243](https://github.com/IDuxFE/idux/issues/1243)) ([d07e914](https://github.com/IDuxFE/idux/commit/d07e9143ccaf40518c4a7017aad65bf1f33b2797))
- **comp:table:** resize column width with percentum not work ([#1254](https://github.com/IDuxFE/idux/issues/1254)) ([ae21248](https://github.com/IDuxFE/idux/commit/ae2124844e8cf5f68ae95a1c220bb153f5e54ccb))
- **comp:table:** style update and ellipsis conflicts with column type ([#1245](https://github.com/IDuxFE/idux/issues/1245)) ([44a5353](https://github.com/IDuxFE/idux/commit/44a53530b086e52e6bf2c89bc3f6b8c81d3d0f6b))
- **comp:tabs:** offset error when setting selectedKey ([#1236](https://github.com/IDuxFE/idux/issues/1236)) ([050a1f7](https://github.com/IDuxFE/idux/commit/050a1f7089aba2b818382393d76d6ca7acab2e2f))
- **comp:time-picker:** resolve time-range-picker console error ([82ce400](https://github.com/IDuxFE/idux/commit/82ce4004d98b86c53b6c2ec334542294ffa36b55))
- **comp:transfer:** update transfer style and demo ([#1234](https://github.com/IDuxFE/idux/issues/1234)) ([d93b815](https://github.com/IDuxFE/idux/commit/d93b815f22220fb3ff11c313873cb1d1ddef1ccd))
- update components style according to UI design ([#1232](https://github.com/IDuxFE/idux/issues/1232)) ([4bf61fb](https://github.com/IDuxFE/idux/commit/4bf61fbda7bf277f546e65fc0945a9720d6aeb1c))

### Features

- **\*:transfer:** add transfer searchPlaceholder prop; add table transfer max selected count demo ([#1230](https://github.com/IDuxFE/idux/issues/1230)) ([2d47151](https://github.com/IDuxFE/idux/commit/2d47151d368ac04f0fd55bea89a959331e4e4a7e)), closes [#1213](https://github.com/IDuxFE/idux/issues/1213)
- **comp:button:** style update and group support gap ([#1235](https://github.com/IDuxFE/idux/issues/1235)) ([7613c7d](https://github.com/IDuxFE/idux/commit/7613c7d76ed7c13a7a5aca4e7ab3ed5d32a34eac))
- **comp:collapse:** update style and add size prop ([#1252](https://github.com/IDuxFE/idux/issues/1252)) ([f3aa234](https://github.com/IDuxFE/idux/commit/f3aa23408ee04561da17aef6c5dbd09f814bbeb0))
- **comp:date-picker:** add dateRangePicker `onSelect` event ([#1248](https://github.com/IDuxFE/idux/issues/1248)) ([b263b79](https://github.com/IDuxFE/idux/commit/b263b79b7b6b987bad572829b334906bc284844b))
- **comp:header:** update style and support css variable ([#1251](https://github.com/IDuxFE/idux/issues/1251)) ([be94528](https://github.com/IDuxFE/idux/commit/be94528a8b6966a7ee25d3fc05f940147dbbe07e))
- **comp:pagination:** add large size and update style ([#1249](https://github.com/IDuxFE/idux/issues/1249)) ([a05d7b7](https://github.com/IDuxFE/idux/commit/a05d7b7872cedb8317b039bb8f978344fb2af59d))
- **comp:select,comp:tree-select,comp:cascader:** add selectedItem slot ([#1257](https://github.com/IDuxFE/idux/issues/1257)) ([9651a8d](https://github.com/IDuxFE/idux/commit/9651a8d406e7e6097dd7472b3bfffe4a5e7e3b1f))
- **comp:spin:** add IxSpinProvider ([#1222](https://github.com/IDuxFE/idux/issues/1222)) ([42491a9](https://github.com/IDuxFE/idux/commit/42491a944757b38103c8b3eac141fa54902c5112))
- **comp:tooltip,comp:tree,comp:tree-select:** add offset prop ([#1221](https://github.com/IDuxFE/idux/issues/1221)) ([f99028f](https://github.com/IDuxFE/idux/commit/f99028ffc1a75dc8f8a843ddc6d8cc6e0ac4ff66))
- **pro:search:** temp state is now cleared after blur, add merge items demo ([#1253](https://github.com/IDuxFE/idux/issues/1253)) ([775901e](https://github.com/IDuxFE/idux/commit/775901e33c083e0bbd963de6bd566067362c5f0d))

## [1.0.2](https://github.com/IDuxFE/idux/compare/v1.0.1...v1.0.2) (2022-10-29)

### Bug Fixes

- **cdk:drag-drop:** invalid handle ([677b163](https://github.com/IDuxFE/idux/commit/677b1635e54ff0d38b80563b0b6fa632f30b1432))
- **comp:input:** input suffix is `icon size` only when it's icon ([#1233](https://github.com/IDuxFE/idux/issues/1233)) ([5d3f260](https://github.com/IDuxFE/idux/commit/5d3f2607367331059fe2ff884889227a3c4567dd))
- **comp:tabs:** offset error when setting selectedKey ([#1236](https://github.com/IDuxFE/idux/issues/1236)) ([050a1f7](https://github.com/IDuxFE/idux/commit/050a1f7089aba2b818382393d76d6ca7acab2e2f))
- **comp:time-picker:** resolve time-range-picker console error ([82ce400](https://github.com/IDuxFE/idux/commit/82ce4004d98b86c53b6c2ec334542294ffa36b55))
- **comp:transfer:** update transfer style and demo ([#1234](https://github.com/IDuxFE/idux/issues/1234)) ([d93b815](https://github.com/IDuxFE/idux/commit/d93b815f22220fb3ff11c313873cb1d1ddef1ccd))
- update components style according to UI design ([#1232](https://github.com/IDuxFE/idux/issues/1232)) ([4bf61fb](https://github.com/IDuxFE/idux/commit/4bf61fbda7bf277f546e65fc0945a9720d6aeb1c))

## [1.0.1](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.9...v1.0.1) (2022-10-21)

### Bug Fixes

- **cdk:drag-drop:** focus problem with pointer backend ([#1202](https://github.com/IDuxFE/idux/issues/1202)) ([#1203](https://github.com/IDuxFE/idux/issues/1203)) ([e46d5cb](https://github.com/IDuxFE/idux/commit/e46d5cb06ffa7172e5f71bfd382a8fd811d3285f))
- **cdk:popper:** vue warning when watch on non-reactive options ([#1197](https://github.com/IDuxFE/idux/issues/1197)) ([f311dc3](https://github.com/IDuxFE/idux/commit/f311dc3288f474d26fbe79651b5ff2c851375075))
- **comp:carousel:** gotTo doesn't work after item dynamic change ([#1196](https://github.com/IDuxFE/idux/issues/1196)) ([1ca7f6e](https://github.com/IDuxFE/idux/commit/1ca7f6efd1e88595cca485987f3dede97c39be45))
- **comp:cascader:** modify selected option text color ([#1207](https://github.com/IDuxFE/idux/issues/1207)) ([5fd11e1](https://github.com/IDuxFE/idux/commit/5fd11e11290d20ebca0511e2bdc5d41e7da52c44))
- **comp:modal:** prevent ok & cancel from triggering while animating ([#1190](https://github.com/IDuxFE/idux/issues/1190)) ([3e7083c](https://github.com/IDuxFE/idux/commit/3e7083c60ca7f7d35f340da9ae0507d43f361568))
- **comp:select:** selector suffix should stay on top ([#1205](https://github.com/IDuxFE/idux/issues/1205)) ([de86a17](https://github.com/IDuxFE/idux/commit/de86a171571fd2e226a81cc95278a3b3f6d64bb8))
- **comp:slider:** change dot to scale line ([#1208](https://github.com/IDuxFE/idux/issues/1208)) ([90651fd](https://github.com/IDuxFE/idux/commit/90651fd4c3d15b6e5c6acb241c6f56e9816b0eb2))
- **comp:switch:** remove box-shadow for seer theme ([#1209](https://github.com/IDuxFE/idux/issues/1209)) ([953d5ce](https://github.com/IDuxFE/idux/commit/953d5ce6fe1ae884baf4bcdb0cfc491295e4348c))
- **comp:table:** change filterable dropdown footer button size to xs ([#1218](https://github.com/IDuxFE/idux/issues/1218)) ([6c6411a](https://github.com/IDuxFE/idux/commit/6c6411a9866c46bc5a4e78939fab38e950d15545))
- **comp:textarea:** fix line-height to ensure height calculation ([#1214](https://github.com/IDuxFE/idux/issues/1214)) ([2d4ffa4](https://github.com/IDuxFE/idux/commit/2d4ffa4459fb6cd984b3ddfffd9d9355d7922c7f))
- **comp:watermark:** flickering problem ([#1206](https://github.com/IDuxFE/idux/issues/1206)) ([49863e9](https://github.com/IDuxFE/idux/commit/49863e9d8943ef7ec1bd98bf5bffe6c4e8418419))
- **pro:textarea:** disabled not working ([#1215](https://github.com/IDuxFE/idux/issues/1215)) ([8dc1f8d](https://github.com/IDuxFE/idux/commit/8dc1f8df6d82162327f22b87996334f74064e8b2))
- **pro:transfer:** strategy parent with flat-target-data not working ([#1204](https://github.com/IDuxFE/idux/issues/1204)) ([54d197b](https://github.com/IDuxFE/idux/commit/54d197b2a1aa48a4a475e90cfde8dca3c5cb2f2a))

### Features

- **cdk:popper:** migrate popperjs to floating-ui ([#1191](https://github.com/IDuxFE/idux/issues/1191)) ([d4c582e](https://github.com/IDuxFE/idux/commit/d4c582ec27a65752804d74911fa258487559e814))
- **comp:icon:** update arrow icons ([#1216](https://github.com/IDuxFE/idux/issues/1216)) ([7940bc5](https://github.com/IDuxFE/idux/commit/7940bc5ef4aa13deaedd4817a11899f3941c38fd))

### BREAKING CHANGES

- **cdk:popper:** modifiers is now changed to middlewares
- **cdk:popper:** forceUpdate is now removed
- **cdk:popper:** onFirstUpdate is now removed

# [1.0.0](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.9...v1.0.0) (2022-10-14)

### Bug Fixes

- **cdk:popper:** vue warning when watch on non-reactive options ([#1197](https://github.com/IDuxFE/idux/issues/1197)) ([123e62f](https://github.com/IDuxFE/idux/commit/123e62f32e62b801dce86d799f6ab95b7025b526))
- **comp:carousel:** gotTo doesn't work after item dynamic change ([#1196](https://github.com/IDuxFE/idux/issues/1196)) ([1406d27](https://github.com/IDuxFE/idux/commit/1406d27ca409d5ed53d81aafdf8848d173249b77))
- **comp:modal:** prevent ok & cancel from triggering while animating ([#1190](https://github.com/IDuxFE/idux/issues/1190)) ([e207465](https://github.com/IDuxFE/idux/commit/e20746521e3dd3102b1e736802a25de6591ac927))

### Features

- **cdk:popper:** migrate popperjs to floating-ui ([#1191](https://github.com/IDuxFE/idux/issues/1191)) ([7eb77d6](https://github.com/IDuxFE/idux/commit/7eb77d66cb5063e5724c1bf2666a2e33492e09e6))

### BREAKING CHANGES

- **cdk:popper:** modifiers is now changed to middlewares
- **cdk:popper:** forceUpdate is now removed
- **cdk:popper:** onFirstUpdate is now removed

# [1.0.0-rc.9](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2022-10-09)

### Bug Fixes

- **comp:button:** update the link button style ([#1174](https://github.com/IDuxFE/idux/issues/1174)) ([d21cdaa](https://github.com/IDuxFE/idux/commit/d21cdaa6628f529aae7360875efca46528c8f51a))
- **comp:date-picker:** inputs should check disabled dates ([#1165](https://github.com/IDuxFE/idux/issues/1165)) ([c122215](https://github.com/IDuxFE/idux/commit/c122215dcc956f5cb9860dbe9a1107322fd2c822))
- **comp:select:** input shouldn't trigger when allowInput is false ([#1168](https://github.com/IDuxFE/idux/issues/1168)) ([43b0802](https://github.com/IDuxFE/idux/commit/43b080281a04c1c119f6578827a152aeffdc9016))
- **comp:table:** th with center align not work ([#1183](https://github.com/IDuxFE/idux/issues/1183)) ([fe7482b](https://github.com/IDuxFE/idux/commit/fe7482b3b756568d47e1c215b159d293c643c5c5))
- **comp:table:** the pageIndex and pageSize should be controlled ([#1167](https://github.com/IDuxFE/idux/issues/1167)) ([648f832](https://github.com/IDuxFE/idux/commit/648f8326b3203813e6624d5bab0fe4862d844933))
- **comp:table:** the scroll body is incorrect, when virtual enabled ([#1175](https://github.com/IDuxFE/idux/issues/1175)) ([295c9ad](https://github.com/IDuxFE/idux/commit/295c9ad3f87a08ee67fde04e861f9ec3b389b110))
- **comp:tabs:** adaptive width when title changes ([#1177](https://github.com/IDuxFE/idux/issues/1177)) ([a066a19](https://github.com/IDuxFE/idux/commit/a066a1904dbcc65efc2d3ca58d1019b3d47430d3)), closes [#1163](https://github.com/IDuxFE/idux/issues/1163)
- **comp:time-picker:** inputs should check disabled time ([#1164](https://github.com/IDuxFE/idux/issues/1164)) ([d0d4191](https://github.com/IDuxFE/idux/commit/d0d41910b5a2aa8ed40dd326b9cbd1f0ab0aaf4f))
- **comp:upload:** fix incorrect class name when has not status ([#1126](https://github.com/IDuxFE/idux/issues/1126)) ([464ca5b](https://github.com/IDuxFE/idux/commit/464ca5b17a3083bda4ddf96e9d0cd71100a476b6))
- **pro:layout:** correct router-link's path ([#1179](https://github.com/IDuxFE/idux/issues/1179)) ([#1181](https://github.com/IDuxFE/idux/issues/1181)) ([fd24ccf](https://github.com/IDuxFE/idux/commit/fd24ccfde67ea2a59d5754db9b8222b29477176c))
- **pro:layout:** remove [display: flex] from [menu-vertical] ([#1178](https://github.com/IDuxFE/idux/issues/1178)) ([#1180](https://github.com/IDuxFE/idux/issues/1180)) ([b839427](https://github.com/IDuxFE/idux/commit/b83942770675b57d949434f6f9f496ae7602f74d))
- **pro:search:** fix onVisibleChange and segment state initialization ([#1162](https://github.com/IDuxFE/idux/issues/1162)) ([d8ea09c](https://github.com/IDuxFE/idux/commit/d8ea09c285e765b1f364f19da7f19d81897ddf8a))
- **pro:search:** pro search btn click shoudn't trigger foucs ([#1185](https://github.com/IDuxFE/idux/issues/1185)) ([bbb1e41](https://github.com/IDuxFE/idux/commit/bbb1e416cf0ac0ef6c7720f6dd02a9562bc4fb38))

### Features

- **comp:\*:** all input components support setting status ([#1171](https://github.com/IDuxFE/idux/issues/1171)) ([c0935b2](https://github.com/IDuxFE/idux/commit/c0935b2becc61380ed06042f2f43cbeed3220228)), closes [#1099](https://github.com/IDuxFE/idux/issues/1099)
- **comp:\*:** overlay is now hidden as trigger overflows scroll parents ([#1173](https://github.com/IDuxFE/idux/issues/1173)) ([3ee8e86](https://github.com/IDuxFE/idux/commit/3ee8e866c14be1b25af05d1dc78de75d07e00f99))
- **comp:table:** add `scrollToTopOnChange` support ([#1169](https://github.com/IDuxFE/idux/issues/1169)) ([464bf40](https://github.com/IDuxFE/idux/commit/464bf404065e75ac63ac7c32035960580bb6586b))
- **comp:textarea:** autoRows supports setting min and max separately ([#1166](https://github.com/IDuxFE/idux/issues/1166)) ([3829665](https://github.com/IDuxFE/idux/commit/382966521ba0f2a2b1eac0078e82921295a99059))
- **comp:transfer:** export IxTransferList component ([#1143](https://github.com/IDuxFE/idux/issues/1143)) ([fba1a5d](https://github.com/IDuxFE/idux/commit/fba1a5de84b3cf0378176d9d826fd9f997d9989c))
- **comp:tree:** cascaderStratery instead of cascade and checkStratety ([#1172](https://github.com/IDuxFE/idux/issues/1172)) ([aedf5d8](https://github.com/IDuxFE/idux/commit/aedf5d865ad34b203bb1695cffcb4883ed6aa039))
- **comp:upload:** actions and files are optional ([#1128](https://github.com/IDuxFE/idux/issues/1128)) ([7e9bee3](https://github.com/IDuxFE/idux/commit/7e9bee323c6d3779d04d98241445f821afebf6b7))
- **pro:transfer:** add cascade strategy `off` ([#1186](https://github.com/IDuxFE/idux/issues/1186)) ([1df412f](https://github.com/IDuxFE/idux/commit/1df412f927e0b5453cf617eb603d8917ddcb442d))
- **pro:transfer:** add tree transfer `cascadeStrategy` support ([#1155](https://github.com/IDuxFE/idux/issues/1155)) ([470bf8d](https://github.com/IDuxFE/idux/commit/470bf8d982a5f99670eaa0b5342f88220b4997f7))

### BREAKING CHANGES

- **comp:tree:** `cascade` and `checkStrategy` are deprecated, please use `cascaderStrategy` instead.
- **comp:transfer:** '.ix-transfer-list' class now changed to '.ix-transfer-content'

# [1.0.0-rc.8](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2022-09-23)

### Bug Fixes

- **cdk:scroll:** virtual scroll scrolledBottom event ([#1148](https://github.com/IDuxFE/idux/issues/1148)) ([64f1e07](https://github.com/IDuxFE/idux/commit/64f1e07c6d6c907ebcab3bf8b5444b86e4740f8f))
- **pro:transfer:** modify treeProps and tableProps type ([#1149](https://github.com/IDuxFE/idux/issues/1149)) ([93509fd](https://github.com/IDuxFE/idux/commit/93509fda2c539064173b16620fae60600419c25e))
- **pro:transfer:** transfer tree should show scrollbar ([#1156](https://github.com/IDuxFE/idux/issues/1156)) ([fc16803](https://github.com/IDuxFE/idux/commit/fc16803aad4a571343fb7fbcbf4ed95015fe9a54))

### Features

- **comp:table:** the selectable column supports custom cell ([#1153](https://github.com/IDuxFE/idux/issues/1153)) ([787f3f1](https://github.com/IDuxFE/idux/commit/787f3f16a211a881946ff59f33ebcdaae6b5ca9c))
- **comp:tooltip:** supports closeOnDeactivated ([#1158](https://github.com/IDuxFE/idux/issues/1158)) ([38c8e03](https://github.com/IDuxFE/idux/commit/38c8e0315ed74bf240a69c26d8062b65e1d4dd8d))
- **comp:watermark:** add custom props for canvas ([#1154](https://github.com/IDuxFE/idux/issues/1154)) ([16c9df3](https://github.com/IDuxFE/idux/commit/16c9df37e0915944eed5d7914bfe27091c81e870))
- **pro:search:** add focus and blur support ([#1151](https://github.com/IDuxFE/idux/issues/1151)) ([da8d6db](https://github.com/IDuxFE/idux/commit/da8d6db1b11ee75dd7a1989a5fc99cfe5bb771a6))
- **pro:table:** layout tool supports setting size and searching ([#1157](https://github.com/IDuxFE/idux/issues/1157)) ([667a392](https://github.com/IDuxFE/idux/commit/667a392b19c4d054412c2992e4939832281df162))

# [1.0.0-rc.7](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2022-09-16)

### Bug Fixes

- **comp:cascader:** update overlay position after edging ([#1135](https://github.com/IDuxFE/idux/issues/1135)) ([ef352a8](https://github.com/IDuxFE/idux/commit/ef352a87aa8d5f9ac833bb4c2e7c85b428aa76eb))
- **comp:icon:** update viewBox of all icons ([#1146](https://github.com/IDuxFE/idux/issues/1146)) ([140aaac](https://github.com/IDuxFE/idux/commit/140aaacf9f14d9396939ab62f0ba702b8c418777))
- **comp:table:** autoHeight not working when data changes ([#1136](https://github.com/IDuxFE/idux/issues/1136)) ([121b612](https://github.com/IDuxFE/idux/commit/121b61263389b60f70cd371a503fc2769e5aa219))
- **comp:table:** trigger scroll when column widths changes ([#1142](https://github.com/IDuxFE/idux/issues/1142)) ([ee57728](https://github.com/IDuxFE/idux/commit/ee577283b55b4d256a64626282f095a4ac857443)), closes [#1140](https://github.com/IDuxFE/idux/issues/1140)
- **pro:search:** clickside should exclude overlay container ([#1137](https://github.com/IDuxFE/idux/issues/1137)) ([bd2d1b9](https://github.com/IDuxFE/idux/commit/bd2d1b91c0b84804c167d2b9ff5c124ad1747664))
- **pro:table:** pining the position of the layout tool ([#1147](https://github.com/IDuxFE/idux/issues/1147)) ([d0b82d5](https://github.com/IDuxFE/idux/commit/d0b82d595a4cf3fb30f78956d5375fc7113a5efc))
- **pro:transfer:** remove icon isn't displayed ([#1144](https://github.com/IDuxFE/idux/issues/1144)) ([9fe89d6](https://github.com/IDuxFE/idux/commit/9fe89d67b355e26177eea41156eeb5c350893c15))

### Features

- **cdk:forms:** standardize English words for form verification ([#1132](https://github.com/IDuxFE/idux/issues/1132)) ([37fe693](https://github.com/IDuxFE/idux/commit/37fe693a6d644bb22dac220799a8f59ce0f0eac8))
- **comp:popconfirm:** support custom content ([#1138](https://github.com/IDuxFE/idux/issues/1138)) ([50a1d00](https://github.com/IDuxFE/idux/commit/50a1d0098cbee73a9304222072229fbd2d456486))
- **comp:transfer:** add controlled searchValue support ([#1141](https://github.com/IDuxFE/idux/issues/1141)) ([ba9fe6b](https://github.com/IDuxFE/idux/commit/ba9fe6b1e07981d601f6d5eda77da1ef05887c18))
- **pro:search:** add container zIndex support ([#1145](https://github.com/IDuxFE/idux/issues/1145)) ([ceda7be](https://github.com/IDuxFE/idux/commit/ceda7be8e078064e6d0813eefbcb2586796753df))

# [1.0.0-rc.6](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2022-09-13)

### Bug Fixes

- **cdk:scroll:** scrollTop error caused by miscalculation ([#1120](https://github.com/IDuxFE/idux/issues/1120)) ([f16c97b](https://github.com/IDuxFE/idux/commit/f16c97b6c5bb353e8b50503108d835d0aea16d15))
- **comp: overlay:** first vnode is comment node ([#1116](https://github.com/IDuxFE/idux/issues/1116)) ([d0d1e8e](https://github.com/IDuxFE/idux/commit/d0d1e8e9ed7134a602820d72efb98118770a680c))
- **comp:locales,pro:locales:** update the english locale for all components ([#1115](https://github.com/IDuxFE/idux/issues/1115)) ([6e18697](https://github.com/IDuxFE/idux/commit/6e18697ff12f66fa3e5714cfe7f8055e6236b1e1))
- **comp:select:** fix selector item text overflowed style ([#1113](https://github.com/IDuxFE/idux/issues/1113)) ([86e625c](https://github.com/IDuxFE/idux/commit/86e625c3d4d1923795dcfe04b7dbf21a6feb8b37))
- **comp:select:** onSearch not work with searchable='overlay' ([#1118](https://github.com/IDuxFE/idux/issues/1118)) ([96aa237](https://github.com/IDuxFE/idux/commit/96aa2373fa930c6ce6a70275878f9c62262df44b))
- **comp:table:** style sync design ([#1123](https://github.com/IDuxFE/idux/issues/1123)) ([141e05e](https://github.com/IDuxFE/idux/commit/141e05ea800f1cdafd547f17469a8563b59da104))
- **comp:table:** sync design and add class to all table elements ([#1117](https://github.com/IDuxFE/idux/issues/1117)) ([474c91c](https://github.com/IDuxFE/idux/commit/474c91c5463a611e6a8972834dcd566e45e60466))
- **comp:textarea:** textarea autoRows max not working ([#1129](https://github.com/IDuxFE/idux/issues/1129)) ([367e0bc](https://github.com/IDuxFE/idux/commit/367e0bcd8f2942cc761f37be16fda689cae45ed7))
- **comp:tree-select:** cannot get node through getNode ([#1121](https://github.com/IDuxFE/idux/issues/1121)) ([ab22a93](https://github.com/IDuxFE/idux/commit/ab22a93b42b0c158b5599140f641cd97c1b3d506))
- **pro:search:** error when deleting previsous item with backspace ([#1130](https://github.com/IDuxFE/idux/issues/1130)) ([670033c](https://github.com/IDuxFE/idux/commit/670033cafcfa187e57fa533da55d5c19bf9096d2))
- **pro:tree:** collapse icon style error ([#1114](https://github.com/IDuxFE/idux/issues/1114)) ([af647b0](https://github.com/IDuxFE/idux/commit/af647b0cefb2758b09a0da6f6cfce2832d5d9b1a))

### Features

- **cdk:scroll, comp:transfer, pro:transfer:** add autoHeight support for virtualScroll, refactor transfer style ([#920](https://github.com/IDuxFE/idux/issues/920)) ([5eb8553](https://github.com/IDuxFE/idux/commit/5eb855344addd3c3627ca902add2ca0f8b62881f))
- **comp:\*:** container is supported for all overlay related components ([#1122](https://github.com/IDuxFE/idux/issues/1122)) ([fe92709](https://github.com/IDuxFE/idux/commit/fe92709b6121ad1733429dbd03510f542336ff4d))
- **comp:table:** support for rendering empty cells ([#1127](https://github.com/IDuxFE/idux/issues/1127)) ([5168bf8](https://github.com/IDuxFE/idux/commit/5168bf8345fdc1dfdbbca79e8b562e8ce2140ff5))
- **comp:upload:** add file status about upload cancel ([#1125](https://github.com/IDuxFE/idux/issues/1125)) ([0fa37e9](https://github.com/IDuxFE/idux/commit/0fa37e9d826395244054f7e0955571fb9dd63d00))

# [1.0.0-rc.5](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2022-09-02)

### Bug Fixes

- **cdk:utils:** fix useControlledProp defaultValue behavior ([#1090](https://github.com/IDuxFE/idux/issues/1090)) ([0ac224c](https://github.com/IDuxFE/idux/commit/0ac224ccb2d9053f4c4889d5c0e0317dbfb5a0d9))
- **comp:alert:** cannot change pagination.pageindex through button ([#1102](https://github.com/IDuxFE/idux/issues/1102)) ([1669639](https://github.com/IDuxFE/idux/commit/166963934e77d913f5fd603fc5c47750d3af1876))
- **comp:input:** the clear icon should cover the suffix icon ([#1103](https://github.com/IDuxFE/idux/issues/1103)) ([18f8795](https://github.com/IDuxFE/idux/commit/18f8795fea766a07a65b8726424bb0539c9d243d))
- **comp:pagination:** sync design ([#1101](https://github.com/IDuxFE/idux/issues/1101)) ([44de517](https://github.com/IDuxFE/idux/commit/44de517f9e2d21639a1d8060c804aadfbfaf8d6d))
- **comp:select:** fix searchable select input focus error ([#1109](https://github.com/IDuxFE/idux/issues/1109)) ([f78d3ea](https://github.com/IDuxFE/idux/commit/f78d3ea7158be31b871b91a3ed6eb7a534f94274))
- **comp:select:** fix select height error when empty ([#1105](https://github.com/IDuxFE/idux/issues/1105)) ([c0ea8aa](https://github.com/IDuxFE/idux/commit/c0ea8aa21dff096fc489ba4e497f034708182f10))
- **comp:select:** fix select height error with size 'sm' ([#1110](https://github.com/IDuxFE/idux/issues/1110)) ([aba2e4f](https://github.com/IDuxFE/idux/commit/aba2e4fd95ea1e87e95497c606ce300907e144f6))
- **comp:select:** multipleLimit not work ([#1108](https://github.com/IDuxFE/idux/issues/1108)) ([41327d9](https://github.com/IDuxFE/idux/commit/41327d9ffcc2ccaef9276628fe063b95e2e3376a))
- **comp:table:** sync design ([#1111](https://github.com/IDuxFE/idux/issues/1111)) ([c59d4de](https://github.com/IDuxFE/idux/commit/c59d4de028a039f7ad3a934a042a6b0ac84937b3))
- **comp:tree:** expanded keys no longer clears after search is cleared ([#1100](https://github.com/IDuxFE/idux/issues/1100)) ([79d23ea](https://github.com/IDuxFE/idux/commit/79d23ead356996c54c49e195532dfb88d7dfc4b0))
- **comp:tree:** fix tree unit tests ([#1106](https://github.com/IDuxFE/idux/issues/1106)) ([8507a51](https://github.com/IDuxFE/idux/commit/8507a518cd5f1d8c25b837d76f53f7e35dcd1cd9))
- **comp:upload:** action's type is wrong ([#1095](https://github.com/IDuxFE/idux/issues/1095)) ([06c02b6](https://github.com/IDuxFE/idux/commit/06c02b6919299d826687e305f6c96746fae6bac3))
- **pro:search:** onChange triggered timing ([#1097](https://github.com/IDuxFE/idux/issues/1097)) ([32cd2bd](https://github.com/IDuxFE/idux/commit/32cd2bd956371f43abae1c3e1a000657c4371495))
- **pro:search:** onItemRemove should emit searchValue ([#1094](https://github.com/IDuxFE/idux/issues/1094)) ([5fc5ea1](https://github.com/IDuxFE/idux/commit/5fc5ea123cfed7c32030f13e15f2cabdd15341e9))
- **pro:tree:** add height prop supports, update proTree header height and container padding ([#1112](https://github.com/IDuxFE/idux/issues/1112)) ([69fa736](https://github.com/IDuxFE/idux/commit/69fa736ae4bbd6d63e032353c3046cc1f29ff1a0))

### Features

- **cdk:click-outside:** add component and composition API usages ([#1092](https://github.com/IDuxFE/idux/issues/1092)) ([9e65136](https://github.com/IDuxFE/idux/commit/9e65136deb399cef7bfdf8da8802a716786e8fac))
- **comp:select:** set first option active on search and options change ([#1096](https://github.com/IDuxFE/idux/issues/1096)) ([5aa2d82](https://github.com/IDuxFE/idux/commit/5aa2d823f0cc777883e337b96df35242a8fd4224))
- **comp:table:** sync design ([#1107](https://github.com/IDuxFE/idux/issues/1107)) ([b40fcb3](https://github.com/IDuxFE/idux/commit/b40fcb37141a8f19b46d4e85242c617d393b6cba))
- **pro:table:** support scrollTo ([#1093](https://github.com/IDuxFE/idux/issues/1093)) ([023f57a](https://github.com/IDuxFE/idux/commit/023f57a916478534def7629b664ac182e2e9e339))

# [1.0.0-rc.4](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2022-08-23)

### Bug Fixes

- **comp:form:** the content of form-item is block ([#1019](https://github.com/IDuxFE/idux/issues/1019)) ([#1088](https://github.com/IDuxFE/idux/issues/1088)) ([aef12af](https://github.com/IDuxFE/idux/commit/aef12af2072b6a2303747c5bac563b1182e6031f))
- **comp:table:** the fixed column not work with ellipsis ([#1081](https://github.com/IDuxFE/idux/issues/1081)) ([#1084](https://github.com/IDuxFE/idux/issues/1084)) ([c6f3ea0](https://github.com/IDuxFE/idux/commit/c6f3ea0d8ba018394b407dd58aa3db16dd3a9957))
- **pro:textarea:** fix index column cell align-items ([#1085](https://github.com/IDuxFE/idux/issues/1085)) ([f8a58fc](https://github.com/IDuxFE/idux/commit/f8a58fc91d27cff297e49bbbb92876d8f0bfe1e0))
- **pro:textarea:** textarea el shouldn't show scrollbar ([#1080](https://github.com/IDuxFE/idux/issues/1080)) ([de7cc60](https://github.com/IDuxFE/idux/commit/de7cc60305b94cce1d490f6e1edbb3a2bc95a73a))

### Features

- **comp:input:** the trim supports global configuration ([#1089](https://github.com/IDuxFE/idux/issues/1089)) ([efe2f8d](https://github.com/IDuxFE/idux/commit/efe2f8df70663558862d0d502057e857ac15a1ed)), closes [#1086](https://github.com/IDuxFE/idux/issues/1086) [#1087](https://github.com/IDuxFE/idux/issues/1087)

# [1.0.0-rc.3](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2022-08-17)

### Bug Fixes

- **comp:date-picker:** fix date picker active value validation ([#1076](https://github.com/IDuxFE/idux/issues/1076)) ([e07eb87](https://github.com/IDuxFE/idux/commit/e07eb871c66cc560205c2785129ae30daf26ec79))
- **comp:table:** bordered not work with spin ([#1079](https://github.com/IDuxFE/idux/issues/1079)) ([924c5bf](https://github.com/IDuxFE/idux/commit/924c5bf3fe06bcc54c221b53a33d20a37543c4cd))
- **comp:tree-select:** do not deselect when reclicked ([#1065](https://github.com/IDuxFE/idux/issues/1065)) ([8c670d0](https://github.com/IDuxFE/idux/commit/8c670d020c061b6af54dbd03be3cde759586da27))
- **comp:tree-select:** do not deselect when reclicked ([#1070](https://github.com/IDuxFE/idux/issues/1070)) ([1a11051](https://github.com/IDuxFE/idux/commit/1a11051a0335d69ee71613acde6aa8b8c754fa69))

### Features

- **cdk:forms:** setError supports path param ([#1073](https://github.com/IDuxFE/idux/issues/1073)) ([35dcddc](https://github.com/IDuxFE/idux/commit/35dcddc22d950d94aefde02d312c9e00c8100219)), closes [#1071](https://github.com/IDuxFE/idux/issues/1071)
- **pro:textarea:** add IxProTextarea compoent ([#1074](https://github.com/IDuxFE/idux/issues/1074)) ([e4ae522](https://github.com/IDuxFE/idux/commit/e4ae522dd7bc454646ca3f5841b735b1c2fbfde7))

# [1.0.0-rc.2](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2022-08-08)

### Bug Fixes

- **cdk:forms:** the second argument to setValue is optional ([#1061](https://github.com/IDuxFE/idux/issues/1061)) ([6756bf7](https://github.com/IDuxFE/idux/commit/6756bf7757a439bb0594c52c381de60d62cd9b48))
- **comp:\*:** update style of suffix icon ([#1053](https://github.com/IDuxFE/idux/issues/1053)) ([3496d08](https://github.com/IDuxFE/idux/commit/3496d08c008d81a3a33e230c48d5a1c267074402)), closes [#1005](https://github.com/IDuxFE/idux/issues/1005)
- **comp:table:** fix layout tool conflicts ([#1051](https://github.com/IDuxFE/idux/issues/1051)) ([07d6719](https://github.com/IDuxFE/idux/commit/07d6719223f624c0688ef58fa30471cd5c6d21ca))
- **comp:transfer:** removing items absent from datasource works now ([#1054](https://github.com/IDuxFE/idux/issues/1054)) ([1abf7e9](https://github.com/IDuxFE/idux/commit/1abf7e9a7b9077fefd6fdd24eae67e9e5bcb1d3b))

### Features

- **cdk:forms:** abstractControl support add or remove the validators ([#1055](https://github.com/IDuxFE/idux/issues/1055)) ([60f9796](https://github.com/IDuxFE/idux/commit/60f9796e2dce0a5d3356113fe42e0e3907a0ba6c)), closes [#1037](https://github.com/IDuxFE/idux/issues/1037)
- **cdk:forms:** formAccessor's setValue supports setting dirty and blur ([#1059](https://github.com/IDuxFE/idux/issues/1059)) ([dc40ed9](https://github.com/IDuxFE/idux/commit/dc40ed945e592b8afeccaa44ba31d64369958421))
- **comp:tree:** add checkOnClick prop ([#1052](https://github.com/IDuxFE/idux/issues/1052)) ([5aa4be4](https://github.com/IDuxFE/idux/commit/5aa4be4328c38f5a06a6f5df084c355da993bca5))
- **pro:search:** add validate function ([#1056](https://github.com/IDuxFE/idux/issues/1056)) ([79c2d09](https://github.com/IDuxFE/idux/commit/79c2d09f207948a636c403b04c1d1a85617c3557))

# [1.0.0-rc.1](https://github.com/IDuxFE/idux/compare/v1.0.0-rc.0...v1.0.0-rc.1) (2022-07-29)

**Note:** Version bump only for package idux

# [1.0.0-rc.0](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.21...v1.0.0-rc.0) (2022-07-29)

### Bug Fixes

- **comp:form:** repair the form-item-input-content centering ([#1032](https://github.com/IDuxFE/idux/issues/1032)) ([785abb5](https://github.com/IDuxFE/idux/commit/785abb5e1d0886a1c58b98055016a0808025b912)), closes [IDuxFE#1019](https://github.com/IDuxFE/issues/1019) [#1019](https://github.com/IDuxFE/idux/issues/1019)
- **comp:menu:** hover event cannot be triggered when animating ([#1041](https://github.com/IDuxFE/idux/issues/1041)) ([7582c6c](https://github.com/IDuxFE/idux/commit/7582c6cd31781aec690ce2926e32151bd5ed0670)), closes [#1013](https://github.com/IDuxFE/idux/issues/1013)
- **pro:search:** fix overflowed style to be overlap with elements below，fix overlay position update on item deleted ([#1030](https://github.com/IDuxFE/idux/issues/1030)) ([a6190aa](https://github.com/IDuxFE/idux/commit/a6190aa660446bddc07b8a6a8119b10ab77c9e83))
- **pro:tree:** onSearch cannot get the latest searchValue value ([#1043](https://github.com/IDuxFE/idux/issues/1043)) ([29adb34](https://github.com/IDuxFE/idux/commit/29adb34bfd2c362504b8d77d7a75e8e9b793d6bb))

### Features

- **cdk:utils:** add zIndex manager ([#1015](https://github.com/IDuxFE/idux/issues/1015)) ([03e6aa5](https://github.com/IDuxFE/idux/commit/03e6aa50de21277528ca890e7f16b0cb5762c6b8)), closes [#998](https://github.com/IDuxFE/idux/issues/998)
- **comp:date-picker:** timeFormat is now infered from format by default ([#1045](https://github.com/IDuxFE/idux/issues/1045)) ([0bb2f8e](https://github.com/IDuxFE/idux/commit/0bb2f8e3cf008cf6c8ff59a2ee403836f549bd87))
- **comp:form:** support for displaying message in tooltip ([#1047](https://github.com/IDuxFE/idux/issues/1047)) ([67222d1](https://github.com/IDuxFE/idux/commit/67222d1dbeaae688e51fe7ee68d45bdf9646ee01))
- **comp:loading-bar:** add LoadingBar component ([#971](https://github.com/IDuxFE/idux/issues/971)) ([#1023](https://github.com/IDuxFE/idux/issues/1023)) ([f948786](https://github.com/IDuxFE/idux/commit/f9487866fb7b10186097fd2714416cce5f430343))
- **comp:notification:** support contentProps ([#1014](https://github.com/IDuxFE/idux/issues/1014)) ([#1046](https://github.com/IDuxFE/idux/issues/1046)) ([0057697](https://github.com/IDuxFE/idux/commit/005769777a0a5eda0e9f87922fa51f1a4a3847ea))
- **comp:table:** ellipsis supports hidden the title ([#1044](https://github.com/IDuxFE/idux/issues/1044)) ([70a6d4a](https://github.com/IDuxFE/idux/commit/70a6d4a338dfb6bb3d7b1bbcf537bcd1fad4e0ab)), closes [#1035](https://github.com/IDuxFE/idux/issues/1035)
- **comp:watermark:** add anti-tamper feature ([#1022](https://github.com/IDuxFE/idux/issues/1022)) ([c301d95](https://github.com/IDuxFE/idux/commit/c301d95f460e76c6b1cc66bdcd04a51b335bb62e))
- **scripts:** add dynamic theme vite-plugin ([#1034](https://github.com/IDuxFE/idux/issues/1034)) ([556a4df](https://github.com/IDuxFE/idux/commit/556a4dfcfe87729dbe92e49e2ed691b8cc459fe6))

# [1.0.0-beta.21](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.20...v1.0.0-beta.21) (2022-07-21)

### Bug Fixes

- **comp:icon:** name changes in a short time, multiple SVG are rendered ([#1029](https://github.com/IDuxFE/idux/issues/1029)) ([6403dbf](https://github.com/IDuxFE/idux/commit/6403dbfa02f6680c8e4b448aeab6f04734b2497d))

### Features

- **cdk:forms:** add useuseAccessorAndControl, useAccessor, useControl ([#1012](https://github.com/IDuxFE/idux/issues/1012)) ([6f4d3af](https://github.com/IDuxFE/idux/commit/6f4d3af9717b6747633a827e0d1c06a00094bced))
- **cdk:forms:** setValue of AbstractControl supports triggering blur ([#1018](https://github.com/IDuxFE/idux/issues/1018)) ([8d38177](https://github.com/IDuxFE/idux/commit/8d38177d77c2564965756a3c6d8ebbb0446b057c))
- **cdk:forms:** useFormGroup support nested objects ([#1021](https://github.com/IDuxFE/idux/issues/1021)) ([bdb96df](https://github.com/IDuxFE/idux/commit/bdb96df2bb243bd98e302f0d1b779c9094c3f74a))
- **pro:form:** add ProForm component ([#1028](https://github.com/IDuxFE/idux/issues/1028)) ([a385711](https://github.com/IDuxFE/idux/commit/a3857116b88009a9c92d2a29d0a1dd0d4b016956)), closes [#981](https://github.com/IDuxFE/idux/issues/981)
- **pro:transfer:** add tree loadChildren support ([#1009](https://github.com/IDuxFE/idux/issues/1009)) ([9d43fb2](https://github.com/IDuxFE/idux/commit/9d43fb217e50cbff761de2c82ade417b27c8f66b))

### BREAKING CHANGES

- **cdk:forms:** `useValueControl` and `useValueAccessor` was deprecated

# [1.0.0-beta.20](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.19...v1.0.0-beta.20) (2022-07-11)

### Bug Fixes

- **comp:card:** hoisted vnode cannot be hot updated in dev mode ([#997](https://github.com/IDuxFE/idux/issues/997)) ([9576f58](https://github.com/IDuxFE/idux/commit/9576f58a92efa1db7e3f1a4a9297ff9febeabbbe))
- **comp:date-picker:** fix panel view display error when type changes ([#1003](https://github.com/IDuxFE/idux/issues/1003)) ([12af8ee](https://github.com/IDuxFE/idux/commit/12af8ee80d1ebe46672f0799c7ee0c14bcb8fde7))
- **comp:input-number:** update control style ([#1007](https://github.com/IDuxFE/idux/issues/1007)) ([ce081ba](https://github.com/IDuxFE/idux/commit/ce081ba1db92a7d5653c31d0a22918dbf9ee4aa3))
- **comp:select:** when over multiplelimit, the option can still be selected ([#1001](https://github.com/IDuxFE/idux/issues/1001)) ([41da36a](https://github.com/IDuxFE/idux/commit/41da36a7055a0aef9534d9b15cbac33f6ec34216)), closes [#1000](https://github.com/IDuxFE/idux/issues/1000)
- **comp:textarea:** [@focus](https://github.com/focus) and [@blur](https://github.com/blur) will be triggered twice ([#1002](https://github.com/IDuxFE/idux/issues/1002)) ([f65ed17](https://github.com/IDuxFE/idux/commit/f65ed176ae4921c10971b0a610aa7c05ff60e538))
- **pro:table:** not working with customAdditional ([#1004](https://github.com/IDuxFE/idux/issues/1004)) ([036a691](https://github.com/IDuxFE/idux/commit/036a6914c171600244f7b158b9574e9bc6a9ba88))

### Features

- **comp:alert:** add onAfterClose ([#1008](https://github.com/IDuxFE/idux/issues/1008)) ([2c0e301](https://github.com/IDuxFE/idux/commit/2c0e30181c0d814d1c50fce0452d463a58d1c6bb))
- **comp:transfer:** label slot renders source and target seperately ([#1006](https://github.com/IDuxFE/idux/issues/1006)) ([604e8d9](https://github.com/IDuxFE/idux/commit/604e8d99044e61839dade0e1cc752c751587ce3e))

### BREAKING CHANGES

- **comp:transfer:** label slot params change to { item, isSource }

# [1.0.0-beta.19](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.18...v1.0.0-beta.19) (2022-07-05)

### Bug Fixes

- **comp:list:** remove the gutter of ListGridProps and extends RowProps ([#995](https://github.com/IDuxFE/idux/issues/995)) ([9c316d4](https://github.com/IDuxFE/idux/commit/9c316d45561086fd3a121c75359cc802d815dcca))
- **comp:tree:** style error after global showline is configured to true ([#991](https://github.com/IDuxFE/idux/issues/991)) ([310360a](https://github.com/IDuxFE/idux/commit/310360a4718fb4449322ee4061c204eae53f59ed))
- **pro:transfer:** fix overflowed text style ([#996](https://github.com/IDuxFE/idux/issues/996)) ([ef26025](https://github.com/IDuxFE/idux/commit/ef260251c6eb79100a4234370f144edfc5a13baa))

### Features

- **cdk:forms:** add validator: range, rangeLength and update messages ([#987](https://github.com/IDuxFE/idux/issues/987)) ([d52f864](https://github.com/IDuxFE/idux/commit/d52f8640ae18b5fbc0e8ac6e2b51d07846bc7920))
- **comp:date-picker:** add DatePickerPanel & DateRangePickerPanel ([#964](https://github.com/IDuxFE/idux/issues/964)) ([2a343c1](https://github.com/IDuxFE/idux/commit/2a343c16faf328595678b41f0ae7d6aabea883c7))
- **comp:input-number:** replace old control ([#970](https://github.com/IDuxFE/idux/issues/970)) ([#994](https://github.com/IDuxFE/idux/issues/994)) ([1fad46a](https://github.com/IDuxFE/idux/commit/1fad46ae281538d93508444bd92d3d7e4b4824c9))
- **pro:search:** add ProSearch component ([#989](https://github.com/IDuxFE/idux/issues/989)) ([ed16c45](https://github.com/IDuxFE/idux/commit/ed16c45a147d0e38b43b60cd91ae0561b7a3535d))

# [1.0.0-beta.18](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.17...v1.0.0-beta.18) (2022-06-28)

### Bug Fixes

- **cdk:portal:** remove targetHashMap ([#980](https://github.com/IDuxFE/idux/issues/980)) ([5f1e637](https://github.com/IDuxFE/idux/commit/5f1e6377a28e870223cdb03440581633877afcbb))
- **comp:carousel:** after click the same dot repeatedly, will not work ([#986](https://github.com/IDuxFE/idux/issues/986)) ([33e136e](https://github.com/IDuxFE/idux/commit/33e136e68f5af082f1f1d768c944d92bcc58d053))
- **comp:carousel:** stop onTransitionend from bubbling ([#984](https://github.com/IDuxFE/idux/issues/984)) ([f2c8347](https://github.com/IDuxFE/idux/commit/f2c8347ad60105d864ca3b0728e0a9025c0d1b11))
- **comp:select:** fix selected options display when filtered ([#977](https://github.com/IDuxFE/idux/issues/977)) ([ddd67e3](https://github.com/IDuxFE/idux/commit/ddd67e3284b6575701e642da5e359f9c4e58431e))
- **comp:tree:** node cannot be checked when its key is 0(Number type) ([#978](https://github.com/IDuxFE/idux/issues/978)) ([5497f20](https://github.com/IDuxFE/idux/commit/5497f20473637166f7ab5a394705267efdd8e7c3))
- **pro:layout:** update the scroll style on the dark theme ([#982](https://github.com/IDuxFE/idux/issues/982)) ([756c38b](https://github.com/IDuxFE/idux/commit/756c38b8b85f8733260a15d2be95297fb4b831c0))

### Features

- **comp:card:** add selection state and disabled state ([#983](https://github.com/IDuxFE/idux/issues/983)) ([a263497](https://github.com/IDuxFE/idux/commit/a2634970ea8738fc736be99673b0a7432ec217e3)), closes [#972](https://github.com/IDuxFE/idux/issues/972)

# [1.0.0-beta.17](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.16...v1.0.0-beta.17) (2022-06-23)

### Bug Fixes

- **comp:button:** style error ([#968](https://github.com/IDuxFE/idux/issues/968)) ([9db8c9f](https://github.com/IDuxFE/idux/commit/9db8c9f59bb8d6953d8748f97841897a71b8537b))
- **comp:menu:** update hover style ([#967](https://github.com/IDuxFE/idux/issues/967)) ([4bda54b](https://github.com/IDuxFE/idux/commit/4bda54be6adbad21da0e11c133cf8318f59450db))
- **comp:modal:** the default header size should be 'md' ([#969](https://github.com/IDuxFE/idux/issues/969)) ([437a6ce](https://github.com/IDuxFE/idux/commit/437a6ce664c6ddd1a370c395f836d7efcde54cdd))

### Features

- **comp:checkbox,comp:radio:** add group vertical props ([#975](https://github.com/IDuxFE/idux/issues/975)) ([d0710d6](https://github.com/IDuxFE/idux/commit/d0710d68e3766d7936b21ac0ae0685bb43d2b4a6))
- **comp:modal:** add draggable props ([#905](https://github.com/IDuxFE/idux/issues/905)) ([#966](https://github.com/IDuxFE/idux/issues/966)) ([d81b99f](https://github.com/IDuxFE/idux/commit/d81b99fa3b67b153301acd78d759cc32485b6b16))
- **comp:tabs:** add onBeforeLeave prop ([#965](https://github.com/IDuxFE/idux/issues/965)) ([9a792e3](https://github.com/IDuxFE/idux/commit/9a792e34df4cea07b96ab595a4e67943ee6faa50))

# [1.0.0-beta.16](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2022-06-17)

### Bug Fixes

- **cdk:resize:** performance problem ([#963](https://github.com/IDuxFE/idux/issues/963)) ([52e2eb8](https://github.com/IDuxFE/idux/commit/52e2eb8029d78c2fd5273727cef46f5e402b6785))
- **comp:button:** danger mode style error ([#957](https://github.com/IDuxFE/idux/issues/957)) ([6fef486](https://github.com/IDuxFE/idux/commit/6fef486cd8527835ef9d61eec55497c10cbe2464)), closes [#955](https://github.com/IDuxFE/idux/issues/955)
- **comp:header:** prefix or suffix is empty str, expect no render vnode ([#954](https://github.com/IDuxFE/idux/issues/954)) ([f9fb28b](https://github.com/IDuxFE/idux/commit/f9fb28b27e2187c0d09bc76c1e28f09d08d03067))
- **comp:modal:** fix loading stop before hide ([#961](https://github.com/IDuxFE/idux/issues/961)) ([8f3f696](https://github.com/IDuxFE/idux/commit/8f3f696268e85cdf3eb6bf3a58e47740fd47c5cf))
- **comp:table:** calculate the scroll postion when container resize ([#956](https://github.com/IDuxFE/idux/issues/956)) ([5fffb9b](https://github.com/IDuxFE/idux/commit/5fffb9b74f448c90d9478e26aaf1cbdf8a322a00))
- **comp:table:** set expandable trigger button type ([#962](https://github.com/IDuxFE/idux/issues/962)) ([a59b764](https://github.com/IDuxFE/idux/commit/a59b7641306a1d4d64d02a170bcc148adbb53c33))
- **comp:time-picker:** fix time range input ([#959](https://github.com/IDuxFE/idux/issues/959)) ([56bd1b2](https://github.com/IDuxFE/idux/commit/56bd1b28d01c6ad4b234e0cd59ed4455a018c75e))
- **comp:tree:** data display error after search clearing ([#952](https://github.com/IDuxFE/idux/issues/952)) ([2f502f6](https://github.com/IDuxFE/idux/commit/2f502f6ec4375d0e01bad4725531ae0e4ceafeee))
- **pro:transfer:** fix flat tree transfer render when labelKey provided ([#958](https://github.com/IDuxFE/idux/issues/958)) ([8319ac0](https://github.com/IDuxFE/idux/commit/8319ac00e34fe10e5fa7bab888ae2792b71f2150))

### Features

- **comp:select:** extract IxSelectPanel component ([#938](https://github.com/IDuxFE/idux/issues/938)) ([3724675](https://github.com/IDuxFE/idux/commit/3724675812d47fb1bcebc486ad8f3ab2a8704ad9))

### BREAKING CHANGES

- **pro:transfer:** TransferBindings provide getKey as ComputedRef instead of getRowKey

# [1.0.0-beta.15](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2022-06-13)

### Bug Fixes

- **comp:slider:** add control props to support forms api ([#946](https://github.com/IDuxFE/idux/issues/946)) ([0a86160](https://github.com/IDuxFE/idux/commit/0a8616027137619d2beaac8cc7054001a95136dd)), closes [#942](https://github.com/IDuxFE/idux/issues/942)
- **comp:watermark:** prop content type error ([#944](https://github.com/IDuxFE/idux/issues/944)) ([ae91476](https://github.com/IDuxFE/idux/commit/ae91476f6bb88bce01836b339efe20b74b0302ca))

### Features

- **cdk:resize:** add CdkResizable and CdkResizableHandler ([#943](https://github.com/IDuxFE/idux/issues/943)) ([58bab1b](https://github.com/IDuxFE/idux/commit/58bab1ba8be0ade028e71a6752901749f39b064a))
- **comp:tree\*:** add draggableIcon prop ([#948](https://github.com/IDuxFE/idux/issues/948)) ([28b7031](https://github.com/IDuxFE/idux/commit/28b7031fe5325258d488abcf2c23cd611ecac802))
- **pro:table:** support resizable column ([#945](https://github.com/IDuxFE/idux/issues/945)) ([47b90dd](https://github.com/IDuxFE/idux/commit/47b90ddf514e2cf67d76d074b594c414f70b7c33))

# [1.0.0-beta.14](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2022-06-07)

### Bug Fixes

- **comp:cascader:** the cloned node should have a unique key ([#940](https://github.com/IDuxFE/idux/issues/940)) ([45ece7b](https://github.com/IDuxFE/idux/commit/45ece7bd8e5c1b525e07c16b8a26cd300c568334))

### Features

- **cdk:drag-drop:** add useDraggable and CdkDraggable ([#939](https://github.com/IDuxFE/idux/issues/939)) ([7161d96](https://github.com/IDuxFE/idux/commit/7161d96e63a81bf7595f0cd5e03f31d77fd89273))

# [1.0.0-beta.13](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2022-05-30)

### Bug Fixes

- **comp: pagination:** pageSizes input width error ([#931](https://github.com/IDuxFE/idux/issues/931)) ([3e91b33](https://github.com/IDuxFE/idux/commit/3e91b33f980d7d9620b4d881d7b5935f9e3c16fc))
- **comp: pagination:** Showquickjumper does not work in simple mode ([#928](https://github.com/IDuxFE/idux/issues/928)) ([2955e7f](https://github.com/IDuxFE/idux/commit/2955e7fbbfae89a64c5be5701ccf9db6e675a14c))
- **comp: table:** auto height not works with spin ([#935](https://github.com/IDuxFE/idux/issues/935)) ([5b770a9](https://github.com/IDuxFE/idux/commit/5b770a9617f5f3f8368828d22c44be38a746dde4))
- **comp: tree:** expand the node being hover, when dragging ([#927](https://github.com/IDuxFE/idux/issues/927)) ([ae8fdef](https://github.com/IDuxFE/idux/commit/ae8fdef5073f25d34c25e22c6a1fc2bf647544a5))
- **comp:all:** fix CI lint error ([#925](https://github.com/IDuxFE/idux/issues/925)) ([2aa0e91](https://github.com/IDuxFE/idux/commit/2aa0e91197177487ebd00cae08f92cc632cf482d))

### Features

- **comp: tree:** Don't show irrelevant nodes during search ([#904](https://github.com/IDuxFE/idux/issues/904)) ([b176cda](https://github.com/IDuxFE/idux/commit/b176cda695ec268de4541026270e372db0769b2c))
- **comp: watermark:** add watermark component ([#930](https://github.com/IDuxFE/idux/issues/930)) ([79b6435](https://github.com/IDuxFE/idux/commit/79b64352d607a3e7724fc312d522d352b64d76e5)), closes [#924](https://github.com/IDuxFE/idux/issues/924)
- **pro: table:** add IxProTable and IxProTableLayoutTool ([#936](https://github.com/IDuxFE/idux/issues/936)) ([688627f](https://github.com/IDuxFE/idux/commit/688627f256ef124be37a9cedf63ce21f288a3747))

# [1.0.0-beta.12](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2022-05-24)

### Bug Fixes

- **comp:all,pro:all,cdk:all:** add eslint import check ([#922](https://github.com/IDuxFE/idux/issues/922)) ([8bbbec1](https://github.com/IDuxFE/idux/commit/8bbbec178a51ad5707791db5ceb49f0547c84f95))

# [1.0.0-beta.11](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2022-05-23)

### Bug Fixes

- **comp: select:** search error when group exists ([#908](https://github.com/IDuxFE/idux/issues/908)) ([ddbfc5e](https://github.com/IDuxFE/idux/commit/ddbfc5e5fd3ee24522f25633f74aeab33a23e200))
- **comp: table:** controled filter works ([#919](https://github.com/IDuxFE/idux/issues/919)) ([fff5022](https://github.com/IDuxFE/idux/commit/fff502266cd1c66ece2f2b1310c9eb0f44c38a76))
- **comp: tabs:** error style when nesting tabs ([#918](https://github.com/IDuxFE/idux/issues/918)) ([ee41c7a](https://github.com/IDuxFE/idux/commit/ee41c7a557b1e65245876be1e5839a91c8c0fdb0)), closes [#913](https://github.com/IDuxFE/idux/issues/913)
- **comp:stepper:** padding problem of left&right ([#912](https://github.com/IDuxFE/idux/issues/912)) ([25a2aac](https://github.com/IDuxFE/idux/commit/25a2aac55e1a51d5fef2d1846d94134d74d43f45))

### Features

- **cdk: resize:** add useResizeObserver and CdkResizeObserver ([#909](https://github.com/IDuxFE/idux/issues/909)) ([c20fe45](https://github.com/IDuxFE/idux/commit/c20fe45f94afd09d6a358030d2cc9b6f2124e4a3))
- **comp: table:** support multiple sort ([#917](https://github.com/IDuxFE/idux/issues/917)) ([a407920](https://github.com/IDuxFE/idux/commit/a4079202cdde6c5f635bda908cb333c98389675c)), closes [#915](https://github.com/IDuxFE/idux/issues/915)
- **comp: tree,tree-select,pro-tree:** add getNode method ([#910](https://github.com/IDuxFE/idux/issues/910)) ([#916](https://github.com/IDuxFE/idux/issues/916)) ([82c929d](https://github.com/IDuxFE/idux/commit/82c929d46b63af31e4cab25deab485c11b630fc9))

# [1.0.0-beta.10](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2022-05-16)

### Bug Fixes

- **comp: select:** Add number to the type of label ([#901](https://github.com/IDuxFE/idux/issues/901)) ([5875e2d](https://github.com/IDuxFE/idux/commit/5875e2d9b64047c4375d7169e7d2f1d61c9a7bb2))
- **comp: table:** update style with sticky and bodered ([#898](https://github.com/IDuxFE/idux/issues/898)) ([ff75f3e](https://github.com/IDuxFE/idux/commit/ff75f3e3a24e886b44ff97431b3c2bb6542556b1))
- **comp: tag:** if value of number over 9 and show '9+' ([#841](https://github.com/IDuxFE/idux/issues/841)) ([#896](https://github.com/IDuxFE/idux/issues/896)) ([645301c](https://github.com/IDuxFE/idux/commit/645301cb76198e0725489ec93d8b7ec40f205c1f))

### Features

- **cdk: forms:** getValud support skip disabled control ([#897](https://github.com/IDuxFE/idux/issues/897)) ([9ba3eca](https://github.com/IDuxFE/idux/commit/9ba3eca2bc23d2f78e04afa16e19ac859c75757c))
- **pro: tree:** add collapseIcon prop ([#900](https://github.com/IDuxFE/idux/issues/900)) ([e9bb42b](https://github.com/IDuxFE/idux/commit/e9bb42b18fc7c6fdd51b921387a1cd33a32557cf))

### BREAKING CHANGES

- **cdk: forms:** `ValidatorOptions.trim` was deprecated, please use `trim` of `IxInput` or
  `IxTextarea` instead.

# [1.0.0-beta.9](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2022-05-09)

### Bug Fixes

- **cdk:click-outside:** not working when click target has [@click](https://github.com/click).stop ([#887](https://github.com/IDuxFE/idux/issues/887)) ([a400cba](https://github.com/IDuxFE/idux/commit/a400cbace8fe1384acbec243d0ee415b31c7e49a))
- **comp: button:** update style with icon ([#885](https://github.com/IDuxFE/idux/issues/885)) ([1377fff](https://github.com/IDuxFE/idux/commit/1377fff56e30737889277de910f5f42d9b5a34f1))
- **comp: table:** update style with empty data ([#888](https://github.com/IDuxFE/idux/issues/888)) ([44c67aa](https://github.com/IDuxFE/idux/commit/44c67aae3858157b32d918a5102e183b8eaac97d))
- **comp:affix:** fix the problem of dynamic display ([#893](https://github.com/IDuxFE/idux/issues/893)) ([dbb69a5](https://github.com/IDuxFE/idux/commit/dbb69a571e8c035fbdfa56464fa66ec0dc090bab)), closes [#849](https://github.com/IDuxFE/idux/issues/849)
- **comp:select:** value key of select is 'value' by default ([#892](https://github.com/IDuxFE/idux/issues/892)) ([582cd4a](https://github.com/IDuxFE/idux/commit/582cd4ae68dc281f8193f86a280835f58d2598a6))
- **comp:time-picker,date-picker:** refactor code and fix z-index ([#886](https://github.com/IDuxFE/idux/issues/886)) ([8d2133b](https://github.com/IDuxFE/idux/commit/8d2133b860c105a7cfa78cdc6f967eeed1f6ed78))

### Features

- **comp: tree-select:** add expandAll and collapseAll methods ([#895](https://github.com/IDuxFE/idux/issues/895)) ([772e039](https://github.com/IDuxFE/idux/commit/772e03937069a076b5861235859497a7ffd0318b))
- **comp: tree:** expandIcon add array type ([#883](https://github.com/IDuxFE/idux/issues/883)) ([1342e66](https://github.com/IDuxFE/idux/commit/1342e66f8fe6348ed37d0b90c422a0ff23f41cf7))
- **pro: tree:** add pro tree component ([#891](https://github.com/IDuxFE/idux/issues/891)) ([ffd80de](https://github.com/IDuxFE/idux/commit/ffd80de694377309b65fb569bb91f24d6ba8d514))

### BREAKING CHANGES

- **comp: tree-select:** setExpandAll was deprecated, please use collapseAll and
  expandAll instead.

# [1.0.0-beta.8](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2022-05-05)

### Bug Fixes

- **comp: alert:** align icon with text ([#881](https://github.com/IDuxFE/idux/issues/881)) ([4b4f567](https://github.com/IDuxFE/idux/commit/4b4f567d4493765fe44acebf22cb5b4f94d51621))
- **comp: menu:** menu cannot show ([#875](https://github.com/IDuxFE/idux/issues/875)) ([2eaf920](https://github.com/IDuxFE/idux/commit/2eaf9204a09f253b97837bb28bd78ed6e62d0124))
- **comp: message:** align icon with text ([#865](https://github.com/IDuxFE/idux/issues/865)) ([07475d2](https://github.com/IDuxFE/idux/commit/07475d2284d007a6636bc6e65fde547f45369256))
- **comp: tree:** the horizontal scroll bar does not appear ([#861](https://github.com/IDuxFE/idux/issues/861)) ([ac63edf](https://github.com/IDuxFE/idux/commit/ac63edf56009ffbb9154b1036ecc4b11949472c6))
- **comp:carousel:** modify onChange params order ([#863](https://github.com/IDuxFE/idux/issues/863)) ([d08b9f3](https://github.com/IDuxFE/idux/commit/d08b9f34943d87fd956f7622fc6eb873396b2d04)), closes [#862](https://github.com/IDuxFE/idux/issues/862)
- **comp:data-picker:** modify data-picker according to current desigin ([#859](https://github.com/IDuxFE/idux/issues/859)) ([7efdcb9](https://github.com/IDuxFE/idux/commit/7efdcb948cc2a2627ad35fe100633b6dde23e5f4))
- **comp:table:** fix table column width measure problem when data load is delayed ([#860](https://github.com/IDuxFE/idux/issues/860)) ([1204300](https://github.com/IDuxFE/idux/commit/1204300c2f573902cab1d1e150a081b6c2574b85))

### Features

- **comp: cascader:** add cascader component ([#857](https://github.com/IDuxFE/idux/issues/857)) ([50fb584](https://github.com/IDuxFE/idux/commit/50fb584604bd9452f25649718f3340d1b40d10c8)), closes [#797](https://github.com/IDuxFE/idux/issues/797)
- **comp: menu:** add customAdditional, getKey and overlayContainer ([#871](https://github.com/IDuxFE/idux/issues/871)) ([5064add](https://github.com/IDuxFE/idux/commit/5064addd4e359993a8a16943eb3cf1a9dbce340b))
- **comp: select:** add customAdditional, getKey and overlayContainer ([#868](https://github.com/IDuxFE/idux/issues/868)) ([d10f5e0](https://github.com/IDuxFE/idux/commit/d10f5e069cd48c8b8cabec829566c8425b32fc08))
- **comp: table:** add customAdditional to support cosutom row and cell ([#866](https://github.com/IDuxFE/idux/issues/866)) ([e79b55b](https://github.com/IDuxFE/idux/commit/e79b55bf7896534e98597e5b7e4bfaf2fc139a33))
- **comp: transfer:** add customAdditional ([#872](https://github.com/IDuxFE/idux/issues/872)) ([84c4e61](https://github.com/IDuxFE/idux/commit/84c4e615c6df7e5239248d94bd4c237a65da680b))
- **comp: tree-selct:** add customAdditional,getKey and overlayContainer ([#869](https://github.com/IDuxFE/idux/issues/869)) ([593f86f](https://github.com/IDuxFE/idux/commit/593f86fe3c49526e8fcc4352db0afdb986d9fd57))

### BREAKING CHANGES

- **comp: menu:** `dataSource.additional` was deprecated, please use `customAdditional` instead. `target` was deprecated, please use `overlayContainer` instead.
- **comp: tree-selct:** `nodeKey` was deprecated, please use `getKey`
  instead. `target` was deprecated, please use `overlayContainer` instead. `dataSource.additional` was
  deprecated, please use `customAdditional` instead.
- **comp: select:** `compareFn` was removed. `target` was deprecated, please use `overlayContainer`
  instead. `valueKey` was deprecated, please use `getKey` instead. `dataSource.additional` was
  deprecated, please use `customAdditional` instead.
- **comp: table:** `tags`, `rowClassName` and `column.additional` are deprecated, please use `customAdditional` instead

# [1.0.0-beta.7](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.5...v1.0.0-beta.7) (2022-04-24)

### Bug Fixes

- **comp: select:** sync width on opened ([#853](https://github.com/IDuxFE/idux/issues/853)) ([02d2769](https://github.com/IDuxFE/idux/commit/02d27690b0f4e324962510d8f7782ecc9931ebce))
- **comp: select:** update overlay on selector resize ([#851](https://github.com/IDuxFE/idux/issues/851)) ([24f173e](https://github.com/IDuxFE/idux/commit/24f173e24495e6253e467511365635d2fbe99b53))

### Features

- **comp: all:** add seer themes ([#850](https://github.com/IDuxFE/idux/issues/850)) ([789a266](https://github.com/IDuxFE/idux/commit/789a266f117b34c61efd8d52f4c325e5f49c8622))
- **comp: form:** add controlTooltip,controlTooltipIcon,labelTooltipIcon props ([#852](https://github.com/IDuxFE/idux/issues/852)) ([c3cd180](https://github.com/IDuxFE/idux/commit/c3cd180c452a062c299642e4ee23ddea49d8fe86))
- **comp: tabs:** first tab is selected by default when no selectedKey ([#855](https://github.com/IDuxFE/idux/issues/855)) ([5c6ee77](https://github.com/IDuxFE/idux/commit/5c6ee777b886f6ffed2d20a89dcfe54d0a6594ba))

# [1.0.0-beta.6](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2022-04-21)

### Bug Fixes

- **comp: select:** sync width on opened ([#853](https://github.com/IDuxFE/idux/issues/853)) ([7b40e6f](https://github.com/IDuxFE/idux/commit/7b40e6f0a2cee77f3f8f519885f2736d4990603b))
- **comp: select:** update overlay on selector resize ([#851](https://github.com/IDuxFE/idux/issues/851)) ([24f173e](https://github.com/IDuxFE/idux/commit/24f173e24495e6253e467511365635d2fbe99b53))

# [1.0.0-beta.5](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2022-04-18)

### Bug Fixes

- **cdk:scroll:** turn to native scrollbar ([#847](https://github.com/IDuxFE/idux/issues/847)) ([95df1b9](https://github.com/IDuxFE/idux/commit/95df1b9e3b0d44b924fff8f81ebe7eef1a41b352))

### Features

- **comp:date-picker:** add datetime type ([#837](https://github.com/IDuxFE/idux/issues/837)) ([6200d5a](https://github.com/IDuxFE/idux/commit/6200d5a1dfbb74005f9edbd0dd0d2f15ce296660))
- **comp:icon:** update assets of svg ([#848](https://github.com/IDuxFE/idux/issues/848)) ([09e6ac3](https://github.com/IDuxFE/idux/commit/09e6ac3c2762c8d0a9bc2f645238c53753167acb))

# [1.0.0-beta.4](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2022-04-11)

### Bug Fixes

- **comp: checkbox-group:** invalid disabled in dataSource ([#827](https://github.com/IDuxFE/idux/issues/827)) ([0f43a09](https://github.com/IDuxFE/idux/commit/0f43a09ab7da5d5f8c52a38e506438ec0764b7f8))
- **comp: space:** error color value in style ([#832](https://github.com/IDuxFE/idux/issues/832)) ([052aefe](https://github.com/IDuxFE/idux/commit/052aefeff0d6ee69e2e0eccdd359adb87b8f0919))
- **comp: tree:** Asynchronous loading node hierarchy error ([#838](https://github.com/IDuxFE/idux/issues/838)) ([1e41588](https://github.com/IDuxFE/idux/commit/1e41588937fb23ea3afe5c7d4be3148c8e2045e8)), closes [#835](https://github.com/IDuxFE/idux/issues/835)
- **comp:anchor:** should default active first item ([#843](https://github.com/IDuxFE/idux/issues/843)) ([84bf725](https://github.com/IDuxFE/idux/commit/84bf72526bd3d4923ceb0455d783d9914205bcde))
- **comp:input:** update style with selector ([#842](https://github.com/IDuxFE/idux/issues/842)) ([39239be](https://github.com/IDuxFE/idux/commit/39239bee20fd814da8ef13108f20d5ab892e84a1))

### Features

- **comp:select:** support setting autocomplete ([#833](https://github.com/IDuxFE/idux/issues/833)) ([583952d](https://github.com/IDuxFE/idux/commit/583952d8859a0cd0944491ead11fa72dac788ec8))
- **comp:tag-group:** add tagGroup component ([#836](https://github.com/IDuxFE/idux/issues/836)) ([b365f3e](https://github.com/IDuxFE/idux/commit/b365f3e97c9bc94b3542d50045990fb23df0266b))

# [1.0.0-beta.3](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2022-03-27)

### Bug Fixes

- **comp: select:** placeholder position are squeezed ([#813](https://github.com/IDuxFE/idux/issues/813)) ([a4d1933](https://github.com/IDuxFE/idux/commit/a4d1933286c60da132b741bd8348f19fa6acdd64)), closes [#812](https://github.com/IDuxFE/idux/issues/812)
- **comp:select:** sync input width on composing ([#821](https://github.com/IDuxFE/idux/issues/821)) ([743328f](https://github.com/IDuxFE/idux/commit/743328f5f99a34aa8184956b6344a8990567213f))
- **comp:slider:** slid distance calculation error ([#818](https://github.com/IDuxFE/idux/issues/818)) ([322f755](https://github.com/IDuxFE/idux/commit/322f7556d3463e38cf4fabbb4e08ecbf6a59d212)), closes [#817](https://github.com/IDuxFE/idux/issues/817)
- **comp:table:** empty style ([#820](https://github.com/IDuxFE/idux/issues/820)) ([689437b](https://github.com/IDuxFE/idux/commit/689437b784f6198aa253c22e38b92fe3405b55b8))

### Features

- **comp:comment:** add comment component ([#822](https://github.com/IDuxFE/idux/issues/822)) ([e3f1e98](https://github.com/IDuxFE/idux/commit/e3f1e988139c1fde922c415e066cfc03dd034e04)), closes [#358](https://github.com/IDuxFE/idux/issues/358)
- **comp:table:** support autoHeight ([#816](https://github.com/IDuxFE/idux/issues/816)) ([7a87569](https://github.com/IDuxFE/idux/commit/7a87569abf7ecf05ddb4c42eae4256551ec0dffe)), closes [#757](https://github.com/IDuxFE/idux/issues/757)
- **comp:tooltip:** support setting zindex ([#825](https://github.com/IDuxFE/idux/issues/825)) ([0a97e42](https://github.com/IDuxFE/idux/commit/0a97e42b6c3b189a0baa5b74e0849401a2da10c7))
- **comp:tree-select:** maxLabel support responsive ([#814](https://github.com/IDuxFE/idux/issues/814)) ([#823](https://github.com/IDuxFE/idux/issues/823)) ([df82e5d](https://github.com/IDuxFE/idux/commit/df82e5d4a61a3cd8bc064a448ea22502eb94967a))
- **pro:transfer:** add pro transfer compoennt ([#815](https://github.com/IDuxFE/idux/issues/815)) ([e367009](https://github.com/IDuxFE/idux/commit/e367009c0b7cec277606574c1f485b43f094145b))

# [1.0.0-beta.2](https://github.com/IDuxFE/idux/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2022-03-20)

### Bug Fixes

- **comp:menu:** cache expandedKeys when collapse changed ([#805](https://github.com/IDuxFE/idux/issues/805)) ([48bacb2](https://github.com/IDuxFE/idux/commit/48bacb2140140c2a984ead14328dcb28d7494b99))
- **comp:tab:** tab content is not vertically centered ([#809](https://github.com/IDuxFE/idux/issues/809)) ([74b0dba](https://github.com/IDuxFE/idux/commit/74b0dbaa85b221c1085e6a6e45f2d77773f82904))
- **component:message:** message icon and content not align center when custom content ([#807](https://github.com/IDuxFE/idux/issues/807)) ([120390b](https://github.com/IDuxFE/idux/commit/120390b414f1feab98d86ee239f956a33f8b294f))

- feat(comp: select): maxLabel support responsive (#806) ([115b5ec](https://github.com/IDuxFE/idux/commit/115b5ecb5f30fb48356c9d71f31508430fb273ed)), closes [#806](https://github.com/IDuxFE/idux/issues/806) [#756](https://github.com/IDuxFE/idux/issues/756)

### Features

- **comp: timeline:** rebuild with tsx ([#803](https://github.com/IDuxFE/idux/issues/803)) ([8677d61](https://github.com/IDuxFE/idux/commit/8677d6163505769cb9af80f3073980dbdab6fc01))
- **comp:select:** disable option when limited ([#804](https://github.com/IDuxFE/idux/issues/804)) ([aa6a5aa](https://github.com/IDuxFE/idux/commit/aa6a5aa47ca7ca82f09eaf6f245987f882f3b036))
- **comp:transfer:** add transfer component ([#794](https://github.com/IDuxFE/idux/issues/794)) ([e861615](https://github.com/IDuxFE/idux/commit/e86161568affa4fb71d36f75ad5b8045cdbef699)), closes [#782](https://github.com/IDuxFE/idux/issues/782)

### BREAKING CHANGES

- `maxLabelCount` was deprecated, please use `maxLabel` instead

# [1.0.0-beta.1](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.6...v1.0.0-beta.1) (2022-03-14)

### Bug Fixes

- **cdk:forms:** maxLength message ([#800](https://github.com/IDuxFE/idux/issues/800)) ([93231ab](https://github.com/IDuxFE/idux/commit/93231abe2167adab5265e4d99697c06fc386d63b))
- **comp: checkbox:** onChange returned an error oldValue ([#792](https://github.com/IDuxFE/idux/issues/792)) ([2825def](https://github.com/IDuxFE/idux/commit/2825defa4733e5b5c4c025405428221d82ffa577)), closes [#790](https://github.com/IDuxFE/idux/issues/790)
- **comp: stepper:** vertical style error without description ([#784](https://github.com/IDuxFE/idux/issues/784)) ([5ec4906](https://github.com/IDuxFE/idux/commit/5ec49062f245755c2811a458e121ca29edec76a3))
- **comp: tabs:** when scrolling style is wrong ([#785](https://github.com/IDuxFE/idux/issues/785)) ([05cb864](https://github.com/IDuxFE/idux/commit/05cb86494b7e20d96b2ccaa2c9320e4a022ee7e1))
- **comp:menu:** remove stopPropagation ([#799](https://github.com/IDuxFE/idux/issues/799)) ([fedf778](https://github.com/IDuxFE/idux/commit/fedf778c319a9c69b56b3d7f96c16c55790da35b))
- **comp:select:** trigger handleInput when onCompositionEnd ([#801](https://github.com/IDuxFE/idux/issues/801)) ([d157f0c](https://github.com/IDuxFE/idux/commit/d157f0c3470747866c613e5b8151b388ba031fa6)), closes [#786](https://github.com/IDuxFE/idux/issues/786)
- **comp:tree:** The expanded state of the first layer node is wrong ([#795](https://github.com/IDuxFE/idux/issues/795)) ([aba661a](https://github.com/IDuxFE/idux/commit/aba661a70c20404e1c4df93697c4d25661a54d9c))

### Code Refactoring

- **comp:form:** api redesign and add test ([#763](https://github.com/IDuxFE/idux/issues/763)) ([825066e](https://github.com/IDuxFE/idux/commit/825066e011b46b50f536e413d189a7d7d104c185))
- **comp:locales:** use useGlobalConfig instead of useI18n ([#764](https://github.com/IDuxFE/idux/issues/764)) ([4f50728](https://github.com/IDuxFE/idux/commit/4f50728ae26c6091ac6d9bf85f95af134b16a97d))
- **comp:radio:** use dataSource instead of options ([#771](https://github.com/IDuxFE/idux/issues/771)) ([25e85a3](https://github.com/IDuxFE/idux/commit/25e85a340edaaa7d26f9a24570f5c687b2ad8e5a))
- **comp:select:** api redesign ([#773](https://github.com/IDuxFE/idux/issues/773)) ([934c0b2](https://github.com/IDuxFE/idux/commit/934c0b21e14e63860874f4a2fb3664d31e3534d0))

### Features

- **comp: button:** add xs and lg sizes ([#780](https://github.com/IDuxFE/idux/issues/780)) ([69f94c8](https://github.com/IDuxFE/idux/commit/69f94c8f9f7f68d7b91eb831b3ee286ed8a3d663))
- **comp:select:** add clearIcon ([#798](https://github.com/IDuxFE/idux/issues/798)) ([57e88f0](https://github.com/IDuxFE/idux/commit/57e88f039c5b8dc51175687acd2c07f13deb2831))
- **comp:table:** add ellipsis and less variable ([#778](https://github.com/IDuxFE/idux/issues/778)) ([3d1f3fe](https://github.com/IDuxFE/idux/commit/3d1f3fe2d8b02e212e6270f0f48fd3405d7550b2)), closes [#769](https://github.com/IDuxFE/idux/issues/769)
- **comp:tabs:** add less variable ([#777](https://github.com/IDuxFE/idux/issues/777)) ([fa653f9](https://github.com/IDuxFE/idux/commit/fa653f91565dff8a5384cab6d8e2af6ccae54159)), closes [#768](https://github.com/IDuxFE/idux/issues/768)
- **pro:layout:** add siderHover and compress props ([#759](https://github.com/IDuxFE/idux/issues/759)) ([faf0913](https://github.com/IDuxFE/idux/commit/faf09130c895a82ca65eee8a82dc082e36cc9247))

### BREAKING CHANGES

- **comp:select:** `compareWith` was deprecated, please use `compareFn` instead, `options` was deprecated, please use `dataSource` instead, `searchFilter` was deprecated, please use `searchFn` instead.
- **comp:radio:** `options` was deprecated, please use `dataSource` instead
- **comp:locales:** `useI18n` was removed.
- **comp:form:** `hasFeedback` was deprecated, please use `statusIcon` instead. `extra` was
  deprecated, please use `extraMessage` instead.

# [1.0.0-beta.0](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.6...v1.0.0-beta.0) (2022-03-01)

### Code Refactoring

- **comp:form:** api redesign and add test ([#763](https://github.com/IDuxFE/idux/issues/763)) ([825066e](https://github.com/IDuxFE/idux/commit/825066e011b46b50f536e413d189a7d7d104c185))
- **comp:locales:** use useGlobalConfig instead of useI18n ([#764](https://github.com/IDuxFE/idux/issues/764)) ([4f50728](https://github.com/IDuxFE/idux/commit/4f50728ae26c6091ac6d9bf85f95af134b16a97d))
- **comp:radio:** use dataSource instead of options ([#771](https://github.com/IDuxFE/idux/issues/771)) ([25e85a3](https://github.com/IDuxFE/idux/commit/25e85a340edaaa7d26f9a24570f5c687b2ad8e5a))
- **comp:select:** api redesign ([#773](https://github.com/IDuxFE/idux/issues/773)) ([934c0b2](https://github.com/IDuxFE/idux/commit/934c0b21e14e63860874f4a2fb3664d31e3534d0))

### Features

- **comp:table:** add ellipsis and less variable ([#778](https://github.com/IDuxFE/idux/issues/778)) ([3d1f3fe](https://github.com/IDuxFE/idux/commit/3d1f3fe2d8b02e212e6270f0f48fd3405d7550b2)), closes [#769](https://github.com/IDuxFE/idux/issues/769)
- **comp:tabs:** add less variable ([#777](https://github.com/IDuxFE/idux/issues/777)) ([fa653f9](https://github.com/IDuxFE/idux/commit/fa653f91565dff8a5384cab6d8e2af6ccae54159)), closes [#768](https://github.com/IDuxFE/idux/issues/768)
- **pro:layout:** add siderHover and compress props ([#759](https://github.com/IDuxFE/idux/issues/759)) ([faf0913](https://github.com/IDuxFE/idux/commit/faf09130c895a82ca65eee8a82dc082e36cc9247))

### BREAKING CHANGES

- **comp:select:** `compareWith` was deprecated, please use `compareFn` instead, `options` was deprecated, please use `dataSource` instead, `searchFilter` was deprecated, please use `searchFn` instead.
- **comp:radio:** `options` was deprecated, please use `dataSource` instead
- **comp:locales:** `useI18n` was removed.
- **comp:form:** `hasFeedback` was deprecated, please use `statusIcon` instead. `extra` was
  deprecated, please use `extraMessage` instead.

# [1.0.0-alpha.6](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2022-02-18)

### Bug Fixes

- **comp: radio:** incomplete consideration of controlled mode ([#744](https://github.com/IDuxFE/idux/issues/744)) ([1a190bd](https://github.com/IDuxFE/idux/commit/1a190bd77d8b952ab263c8ffdc9153963e511804))
- **comp:select:** filter option exception ([#751](https://github.com/IDuxFE/idux/issues/751)) ([96ed380](https://github.com/IDuxFE/idux/commit/96ed3807dc35b5445ec4bc83dde0894a56e99ed1)), closes [#750](https://github.com/IDuxFE/idux/issues/750)
- **comp:space:** remove default alian and justify ([#749](https://github.com/IDuxFE/idux/issues/749)) ([54456c6](https://github.com/IDuxFE/idux/commit/54456c6ddedc7e8c786cb23cedfedac4f5a0833e))

### Code Refactoring

- **comp:layout:** remove onCollapse ([#747](https://github.com/IDuxFE/idux/issues/747)) ([3001bbd](https://github.com/IDuxFE/idux/commit/3001bbd74200d22510bf49d505ee176cd469d9ac))

### Features

- **comp:checkbox:** use dataSource instead of options ([#753](https://github.com/IDuxFE/idux/issues/753)) ([ac2579a](https://github.com/IDuxFE/idux/commit/ac2579aa2270f25040c01ea387f025a507f09e05))
- **comp:divider:** add size prop ([#742](https://github.com/IDuxFE/idux/issues/742)) ([c6b4919](https://github.com/IDuxFE/idux/commit/c6b49197f2829f3999e5967a542eadd0c9c92a88))
- **comp:space:** add justify prop ([#743](https://github.com/IDuxFE/idux/issues/743)) ([9340796](https://github.com/IDuxFE/idux/commit/93407968a8763fad05b7aa7dfa8b5fdf323151d6))
- **comp:space:** add justify prop ([#746](https://github.com/IDuxFE/idux/issues/746)) ([af525d9](https://github.com/IDuxFE/idux/commit/af525d9263a1bb8f846ca916e82b224829030758))
- **comp:stepper:** redesign api ([#760](https://github.com/IDuxFE/idux/issues/760)) ([623569d](https://github.com/IDuxFE/idux/commit/623569db9725c8f97ce2a1beec8eb1805d5b8027))

### BREAKING CHANGES

- **comp:checkbox:** `options` was deprecated, please use `dataSource` instead
- **comp:layout:** `onCollapse` was removed
- **comp:space:** `direction` was deprecated, please use `vertical` instead. split`was deprecated, please use`separator` instead.
- **comp:divider:** `position` was deprecated, please use `labelPlacement` instead, `type` was
  deprecated, please use `vertical` instead

# [1.0.0-alpha.5](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2022-01-24)

### Bug Fixes

- **comp: affix:** style is not recalculated when resizing ([#737](https://github.com/IDuxFE/idux/issues/737)) ([9cda3d0](https://github.com/IDuxFE/idux/commit/9cda3d0354f93be7d1ac60fe767b15a3a51ddbf6))

### Features

- **comp:select:** add 'overlay' to searchable ([#729](https://github.com/IDuxFE/idux/issues/729)) ([68c6adc](https://github.com/IDuxFE/idux/commit/68c6adc63d11cd7516e420c1ab04309cfac6e33a))
- **comp:table:** scroll support fullHeight ([#739](https://github.com/IDuxFE/idux/issues/739)) ([2255853](https://github.com/IDuxFE/idux/commit/2255853832ce9db96ac80a774bcc60924cc52511))
- **comp:upload:** add file upload component ([#669](https://github.com/IDuxFE/idux/issues/669)) ([91f501a](https://github.com/IDuxFE/idux/commit/91f501a2f3373953dc7a8317d546e050fe6fddde)), closes [#605](https://github.com/IDuxFE/idux/issues/605)
- **pro:layout:** suppor all slots of IxMenu ([#738](https://github.com/IDuxFE/idux/issues/738)) ([9745c32](https://github.com/IDuxFE/idux/commit/9745c329a962faa2499f0003c8badab33b9dcabc))

### BREAKING CHANGES

- **comp:table:** `scroll.x` and `scroll.y` are deprecated, please use `scroll.width` and
  `scroll.height` instead

- test(comp:table): add basic test

# [1.0.0-alpha.4](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2022-01-14)

### Bug Fixes

- **comp:image:** fix image test error ([#723](https://github.com/IDuxFE/idux/issues/723)) ([329fc2c](https://github.com/IDuxFE/idux/commit/329fc2c3bc3b15f85f4994f51c4da0343df5d8d0))
- **comp:select:** fix option style ([#704](https://github.com/IDuxFE/idux/issues/704)) ([45a9763](https://github.com/IDuxFE/idux/commit/45a9763101d1ccaebb6158ed534442000e4030dc))
- **radio,checkbox:** fix checkbox and radio aligin ([#692](https://github.com/IDuxFE/idux/issues/692)) ([cafa7ba](https://github.com/IDuxFE/idux/commit/cafa7ba78fb094c705e73d72f5f618720f644b1c))

### Code Refactoring

- **comp:menu:** use customXxx instead of slots ([#725](https://github.com/IDuxFE/idux/issues/725)) ([f88ca6d](https://github.com/IDuxFE/idux/commit/f88ca6db43b1eba493cda16b91a16062a654ce0a))
- **comp:select:** use customLabel instead of slots ([#726](https://github.com/IDuxFE/idux/issues/726)) ([3a34fc4](https://github.com/IDuxFE/idux/commit/3a34fc44d759f4f0c835efe51b406c3e2fd1efa4))

### Features

- **cdk:forms:** add option to remove space ([#718](https://github.com/IDuxFE/idux/issues/718)) ([be43870](https://github.com/IDuxFE/idux/commit/be43870b3e013ba2009a52f6d77ac23abdbab199)), closes [#553](https://github.com/IDuxFE/idux/issues/553)
- **cdk:scroll:** show scrollbar when mouseenter ([#722](https://github.com/IDuxFE/idux/issues/722)) ([cfa48ce](https://github.com/IDuxFE/idux/commit/cfa48ce257ad5c2be3c2c6754d0ae751fdf99dd7))
- **comp:dropdown:** support hideOnClick ([#715](https://github.com/IDuxFE/idux/issues/715)) ([fbbe478](https://github.com/IDuxFE/idux/commit/fbbe4786b3f47b1924c9d7b404306f424111fbd4))
- **comp:footer:** swap confirm and cancel btn ([#714](https://github.com/IDuxFE/idux/issues/714)) ([78f3e06](https://github.com/IDuxFE/idux/commit/78f3e064faca07b025ea327a6ca5bb65c8809fec))
- **comp:image:** add image and imageViewer components ([#706](https://github.com/IDuxFE/idux/issues/706)) ([8b5212b](https://github.com/IDuxFE/idux/commit/8b5212bc1287e5c2b3cedd4e1fe556cb707eba0c)), closes [#698](https://github.com/IDuxFE/idux/issues/698)
- **comp:menu:** type of MenuItem is optional ([#712](https://github.com/IDuxFE/idux/issues/712)) ([5d1490a](https://github.com/IDuxFE/idux/commit/5d1490ae407ac59a7e1f863ad8a3db256f8c3b91))
- **comp:modal:** add padding to padding next icon ([#701](https://github.com/IDuxFE/idux/issues/701)) ([e663401](https://github.com/IDuxFE/idux/commit/e66340144ced3a04c60e93aaaf5cd7aa1585930d))
- **comp:slider:** unify trigger conditions for change events ([#721](https://github.com/IDuxFE/idux/issues/721)) ([a3209fa](https://github.com/IDuxFE/idux/commit/a3209fa8e1194869b9df0aec3324e135c332f15c)), closes [#696](https://github.com/IDuxFE/idux/issues/696)
- **comp:table:** add TableColumn component ([#702](https://github.com/IDuxFE/idux/issues/702)) ([eb979a6](https://github.com/IDuxFE/idux/commit/eb979a688f157eec0cd10d96df20a60980065717)), closes [#650](https://github.com/IDuxFE/idux/issues/650)
- **comp:table:** redesign api of filter ([#720](https://github.com/IDuxFE/idux/issues/720)) ([c8078ea](https://github.com/IDuxFE/idux/commit/c8078ea5915be0326463b6beabf766e49d43c413))
- **comp:table:** redesign TableColumn and support children in template ([#708](https://github.com/IDuxFE/idux/issues/708)) ([356faaf](https://github.com/IDuxFE/idux/commit/356faaf708624e1e0a918b08cba634a42ad1c2fe))
- **comp:table:** use `menus` instead of `options` ([#709](https://github.com/IDuxFE/idux/issues/709)) ([71185fc](https://github.com/IDuxFE/idux/commit/71185fcdd8e5023c3629dc4ffb5771f891e92eb2))
- **table:** modify table functions and style ([#672](https://github.com/IDuxFE/idux/issues/672)) ([05e6399](https://github.com/IDuxFE/idux/commit/05e639922eae342e557a6c142c7aa296d81c7f72))

### BREAKING CHANGES

- **comp:select:** `slots` of `SelectOption` is deprecated, please use customLabel instead
- **comp:menu:** `slots` of `MenuData` is deprecated, please use `customIcon`, `customLabel` and
  `customSuffix` instead
- **comp:table:** `options` in `TableColumnSelectable` was deprecated, please use `menus` instead
- **comp:table:** `customRender`, `customTtile`, `customIcon` and `customExpand` have been
  deprecated, please use `slots` instead

# [1.0.0-alpha.3](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2021-12-30)

### Bug Fixes

- **comp:input-number:** decimal precision calculation error ([#688](https://github.com/IDuxFE/idux/issues/688)) ([d863ad0](https://github.com/IDuxFE/idux/commit/d863ad08f2f64bdcb1652b9814051521754c3314))
- **comp:menu:** remove border-bototm on horizontal mode ([#690](https://github.com/IDuxFE/idux/issues/690)) ([be02417](https://github.com/IDuxFE/idux/commit/be02417d298d7b645cb87e94e1e9b09e22a101b2))
- **comp:typography:** fix typography disabled style ([#687](https://github.com/IDuxFE/idux/issues/687)) ([41d5225](https://github.com/IDuxFE/idux/commit/41d522584844ea0ffe19c61a3ae330a53eb374fa)), closes [#567](https://github.com/IDuxFE/idux/issues/567)

### Features

- **cdk:forms:** add default messages ([#689](https://github.com/IDuxFE/idux/issues/689)) ([22d45d6](https://github.com/IDuxFE/idux/commit/22d45d64b009617abff1456cec38397348287a6f)), closes [#684](https://github.com/IDuxFE/idux/issues/684)
- **comp: space:** add size and block props ([#670](https://github.com/IDuxFE/idux/issues/670)) ([a1f895b](https://github.com/IDuxFE/idux/commit/a1f895b67e65efb800dcd5c5e9f54330bca06bd0))
- **comp:modal:** add prop to control transition ([#674](https://github.com/IDuxFE/idux/issues/674)) ([4b4d786](https://github.com/IDuxFE/idux/commit/4b4d7866debe9950e8d640885baad5750728404d)), closes [#623](https://github.com/IDuxFE/idux/issues/623)
- **comp:pagination:** remove itemRender and totalRender ([#695](https://github.com/IDuxFE/idux/issues/695)) ([e2dccc6](https://github.com/IDuxFE/idux/commit/e2dccc6f35a8be626199a2cf75a0819bb42d291b)), closes [#658](https://github.com/IDuxFE/idux/issues/658)

### BREAKING CHANGES

- **comp:pagination:** itemRender and totalRender have been removed
- **comp: space:** size is used instead of gap

# [1.0.0-alpha.2](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2021-12-27)

### Bug Fixes

- **comp:form:** invalid style of input ([#668](https://github.com/IDuxFE/idux/issues/668)) ([7558b18](https://github.com/IDuxFE/idux/commit/7558b1896e3407d206c10ef985bbad84440588df))

# [1.0.0-alpha.1](https://github.com/IDuxFE/idux/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2021-12-25)

### Bug Fixes

- **cdk:scroll:** update scroll blocked style ([#660](https://github.com/IDuxFE/idux/issues/660)) ([4d7bbff](https://github.com/IDuxFE/idux/commit/4d7bbffb86c5409040fa82a0cbdf7b3ba875edc1)), closes [#586](https://github.com/IDuxFE/idux/issues/586)
- **comp: select:** incomplete readonly scenario ([#649](https://github.com/IDuxFE/idux/issues/649)) ([24da0a0](https://github.com/IDuxFE/idux/commit/24da0a06b5f35d144115222252171ece144f8d17))
- **comp:all:** add default.variable.less ([#646](https://github.com/IDuxFE/idux/issues/646)) ([9eced60](https://github.com/IDuxFE/idux/commit/9eced60b9ff9ba27540dc165418d1110b023e264))
- **comp:button:** button-group display: inline-flex ([#661](https://github.com/IDuxFE/idux/issues/661)) ([60dc8c3](https://github.com/IDuxFE/idux/commit/60dc8c30b9ca0da0f4446e5be24b439f5ecbdf79))
- **comp:ixmenu:** fix error when initialize settings expandKeys ([#637](https://github.com/IDuxFE/idux/issues/637)) ([131d95b](https://github.com/IDuxFE/idux/commit/131d95b3e89576146d21f68191f50d958bc4a086)), closes [#636](https://github.com/IDuxFE/idux/issues/636)
- **comp:message/notification:** fix first animation ([#639](https://github.com/IDuxFE/idux/issues/639)) ([b9d1d19](https://github.com/IDuxFE/idux/commit/b9d1d19a36c9e91353317e722f832493e289aa12)), closes [#576](https://github.com/IDuxFE/idux/issues/576)
- **comp:table:** selectable header vertical alignment issue ([#652](https://github.com/IDuxFE/idux/issues/652)) ([e9f85e4](https://github.com/IDuxFE/idux/commit/e9f85e4a31216fbb1302054cde4ab5c51737cf8a))
- **pro:layout:** fix sider border-right style ([#659](https://github.com/IDuxFE/idux/issues/659)) ([bcdffdb](https://github.com/IDuxFE/idux/commit/bcdffdba5a52f0b14e62261b8f26d5115945a4bb))

### Features

- **cdk: portal:** support html selectors ([#656](https://github.com/IDuxFE/idux/issues/656)) ([1eafdf6](https://github.com/IDuxFE/idux/commit/1eafdf684bf55ee5d00d06a4184dad822869976a))
- **comp: tree-select:** add tree-select comp ([#606](https://github.com/IDuxFE/idux/issues/606)) ([a8cc003](https://github.com/IDuxFE/idux/commit/a8cc003443b32a083038b5298de8cedef414d440)), closes [#557](https://github.com/IDuxFE/idux/issues/557)
- **comp:breadcrumb:** add breadcrumb component ([#71](https://github.com/IDuxFE/idux/issues/71)) ([#633](https://github.com/IDuxFE/idux/issues/633)) ([18ef292](https://github.com/IDuxFE/idux/commit/18ef292e3b77d1f84a571c837a0816b0cabc570f))
- **comp:carousel:** add carousel component ([#634](https://github.com/IDuxFE/idux/issues/634)) ([4737191](https://github.com/IDuxFE/idux/commit/473719140e926c3ec4b751c04c838347711c2d4c)), closes [#230](https://github.com/IDuxFE/idux/issues/230)
- **comp:drawer,modal:** add onBeforeClose event ([#647](https://github.com/IDuxFE/idux/issues/647)) ([a45e450](https://github.com/IDuxFE/idux/commit/a45e4501b314e6cef8896c93c9bdfc929bff52a7)), closes [#645](https://github.com/IDuxFE/idux/issues/645)
- **comp:private/input:** add input component ([#657](https://github.com/IDuxFE/idux/issues/657)) ([efbfda1](https://github.com/IDuxFE/idux/commit/efbfda1edd5f44b8b193ca0f36a7c65f200f8196)), closes [#582](https://github.com/IDuxFE/idux/issues/582)

### BREAKING CHANGES

- **comp:private/input:** IxInput and IxInputNumber rebuild with \_private/input
- **comp:drawer,modal:** onBeforeClose is used instead of onClose

# 1.0.0-alpha.0 (2021-12-17)

### Features

- Hello @idux.
