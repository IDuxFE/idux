`@idux/cdk/a11y` 提供了许多提高无障碍性（可访问性）的工具。

## FocusMonitor（焦点管理器）

`FocusMonitor` 可以用来监听元素焦点状态的变化。

它比单纯监听 focus 或 blur 事件更有意义，因为它会告诉你该元素是如何获得焦点的（通过鼠标，键盘，触摸或编程方式）。如果需要，它还允许监听各级子元素。

要监听某个元素的焦点变化，可以调用 `monitor` 方法, 指定要监控的元素(`element`)和是否检查子元素(`checkChildren`)。如果 `checkChildren` 为 `true`, 那么该元素的任何各级子元素有焦点，就认为该元素有焦点。 `monitor` 方法返回的是一个计算属性 `FocusMonitorEvent`, 当焦点状态改变时，会得到一个新的值。

`FocusMonitor` 还会自动对有焦点的元素元素应用一些 CSS 类。如果该元素拥有焦点，它会添加 `.cdk-focused` 类，并进一步添加 `.cdk-${origin}-focused` 类来表明元素是如何获得焦点的 (`origin` 是 `mouse`、`keyboard`、`touch` 或 `program` 之一)。
