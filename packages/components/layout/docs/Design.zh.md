## 组件定义

协助进行页面级整体布局。

采用了 [css grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)布局，容器的整体布局设置为：

``` css
grid-template-areas:
  'header header header'
  'sider content content'
  'sider footer footer';
```

### 主题变量

| 名称 | `default` | `dark` | 备注 |
| --- | --- | --- | --- |
| `@layout-header-background` | `@background-color-component` | - | - |
| `@layout-header-color` | `@text-color` | - | - |
| `@layout-header-height` | `64px` | - | - |
| `@layout-header-padding` | `0 @spacing-xl` | - | - |
| `@layout-header-box-shadow` | `0 2px 8px 0 rgba(0, 0, 0, 0.08)` | - | - |
| `@layout-footer-background` | `@background-color-component` | - | - |
| `@layout-footer-color` | `@text-color` | - | - |
| `@layout-footer-padding` | `@spacing-xl @spacing-3xl` | - | - |
| `@layout-sider-background` | `@background-color-component` | - | - |
| `@layout-sider-color` | `@text-color` | - | - |
| `@layout-sider-width` | `224px` | - | - |
| `@layout-sider-collapsed-width` | `64px` | - | - |
