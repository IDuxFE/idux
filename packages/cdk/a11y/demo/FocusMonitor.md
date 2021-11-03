---
order: 0
title:
  zh: 焦点管理器
  en: FocusMonitor
---

## zh

`FocusMonitor` 可以用来监听元素焦点状态的变化。

它比单纯监听 focus 或 blur 事件更有意义，因为它会告诉你该元素是如何获得焦点的（通过鼠标，键盘，触摸或编程方式）。如果需要，它还允许监听各级子元素。

要监听某个元素的焦点变化，可以调用 `monitor` 方法, 指定要监控的元素(`element`)和是否检查子元素(`checkChildren`)。如果 `checkChildren` 为 `true`, 那么该元素的任何各级子元素有焦点，就认为该元素有焦点。 `monitor` 方法返回的是一个计算属性 `FocusMonitorEvent`, 当焦点状态改变时，会得到一个新的值。

`FocusMonitor` 还会自动对有焦点的元素元素应用一些 CSS 类。如果该元素拥有焦点，它会添加 `.cdk-focused` 类，并进一步添加 `.cdk-${origin}-focused` 类来表明元素是如何获得焦点的 (`origin` 是 `mouse`、`keyboard`、`touch` 或 `program` 之一)。

## en

`FocusMonitor` can be used to listen for changes in the focus state of an element. It's more powerful than just listening for focus or blur events because it tells you how the element was focused (via the mouse, keyboard, touch, or programmatically). It also allows listening for focus on descendant elements if desired.

To listen for changes in focus on an element, call the `monitor` method, specifying which `element` to monitor and whether to check the children.  If `checkChildren` is `true`, then the element is considered to have focus if any of its children have focus.  The `monitor` method returns a calculated property, `FocusMonitorEvent`, which gets a new value when the focus state changes.  

The `FocusMonitor` will automatically apply CSS classes to the element when focused. It will add `.cdk-focused` if the element is focused and will further add `.cdk-${origin}-focused` (with `origin` being `mouse`, `keyboard`, `touch`, or `program`) to indicate how the element was focused.
