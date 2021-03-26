<template>
  <table>
    <tbody>
      <tr>
        <td></td>
        <td>
          <ix-popover title="Title" placement="top-start" content="Content">
            <ix-button>TL</ix-button>
          </ix-popover>
        </td>
        <td>
          <ix-popover title="Title" placement="top" content="Content">
            <ix-button>Top</ix-button>
          </ix-popover>
        </td>
        <td>
          <ix-popover title="Title" placement="top-end" content="Content">
            <ix-button>TR</ix-button>
          </ix-popover>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <ix-popover placement="left-start" title="Title" content="Content">
            <ix-button>LT</ix-button>
          </ix-popover>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <ix-popover placement="right-start" title="Title" content="Content">
            <ix-button>RT</ix-button>
          </ix-popover>
        </td>
      </tr>
      <tr>
        <td>
          <ix-popover placement="left" title="Title" content="Content">
            <ix-button>Left</ix-button>
          </ix-popover>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <ix-popover placement="right" title="Title" content="Content">
            <ix-button>Right</ix-button>
          </ix-popover>
        </td>
      </tr>
      <tr>
        <td>
          <ix-popover placement="left-end" title="Title" content="Content">
            <ix-button>LB</ix-button>
          </ix-popover>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <ix-popover placement="right-end" title="Title" content="Content">
            <ix-button>RB</ix-button>
          </ix-popover>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <ix-popover title="Title" placement="bottom-start" content="Content">
            <ix-button>BL</ix-button>
          </ix-popover>
        </td>
        <td>
          <ix-popover title="Title" placement="bottom" content="Content">
            <ix-button>Bottom</ix-button>
          </ix-popover>
        </td>
        <td>
          <ix-popover title="Title" placement="bottom-end" content="Content">
            <ix-button>BR</ix-button>
          </ix-popover>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="less">
.ix-button {
  width: 80px;
}

p {
  max-width: 50px;
}
</style>
