---
category: components
type:
title: Message
subtitle: 全局提示
order: 0
---



## 何时使用

全局展示操作反馈信息。

## API

- MessageService.success(content, [duration])
- MessageService.error(content, [duration])
- MessageService.info(content, [duration])
- MessageService.warn(content, [duration])
- MessageService.remove([messageId])
- MessageService.getContainer() 获取message消息容器

也可以通过对象的形式传递参数

- MessageService.success(config)
- MessageService.error(config)
- MessageService.info(config)
- MessageService.warn(config)
- MessageService.create(config)

|参数|说明|类型|默认值|
|--------|-----------------------------------------|---------------------|------|
|content|提示内容|`stringconfig\|vnode`|-|
|duration|自动关闭的延时，单位毫秒。当设置为0时不消失|`number`|3000|

`config`对象属性如下:

|参数|说明|类型|默认值|
|------------|---------------------------------------|--------------|------|
|content|提示内容|`string\|vnode`|-|
|duration|自动关闭的延时，单位毫秒。设置为0立即关闭|`number`|3000|
|icon|自定义图标|`string\|vnode`|-|
|messageId|当前提示的唯一标志|`string\|number`|-|
|onClose|message关闭时触发的回调函数|`function`|-|
|pauseOnHover|鼠标移上时禁止自动移除|`boolean`|true|

## 全局方法

组件还提供全局配置和全局销毁方法

**通过`useGlobalConfig`设置全局配置暂不生效 默认配置如下**

```javascript
useGlobalConfig('message', {
  top: 100,
  duration: 2,
  maxCount: 3,
  pauseOnHover: true,
});
```

options:

|参数|说明|类型|默认值|
|------------|----------------------------------------------|--------------|------|
|duration|默认自动关闭延时，单位毫秒，设置为0立即关闭|`number`|3000|
|maxCount|最大显示数, 超过限制时，最早的消息会被自动关闭|`number`|5|
|top|消息距离顶部的位置|`string\|number`|60px|
|pauseOnHover|鼠标移上时禁止自动移除|`boolean`|true|

## MessageService.remove

销毁某个消息实例的方法

|参数|说明|类型|默认值|
|------------|----------------------------------------------|--------------|------|
|messageId|需要销毁的消息实例对应的messageId。可选参数，如果不传参数则清除所有消息。|`string\|number\|(string\|number)[]`|-|
