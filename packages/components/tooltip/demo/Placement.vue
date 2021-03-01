<template>
  <table>
    <tbody>
      <tr>
        <td></td>
        <td>
          <ix-tooltip title="This is a very long prompt text." placement="top-start">
            <ix-button>TL</ix-button>
          </ix-tooltip>
        </td>
        <td>
          <ix-tooltip title="This is a very long prompt text." placement="top">
            <ix-button>Top</ix-button>
          </ix-tooltip>
        </td>
        <td>
          <ix-tooltip title="This is a very long prompt text." placement="top-end">
            <ix-button>TR</ix-button>
          </ix-tooltip>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <ix-tooltip placement="left-start">
            <template #title>
              <p>This is a very long prompt text.</p>
            </template>
            <ix-button>LT</ix-button>
          </ix-tooltip>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <ix-tooltip placement="right-start">
            <template #title>
              <p>This is a very long prompt text.</p>
            </template>
            <ix-button>RT</ix-button>
          </ix-tooltip>
        </td>
      </tr>
      <tr>
        <td>
          <ix-tooltip placement="left">
            <template #title>
              <p>This is a very long prompt text.</p>
            </template>
            <ix-button>Left</ix-button>
          </ix-tooltip>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <ix-tooltip placement="right">
            <template #title>
              <p>This is a very long prompt text.</p>
            </template>
            <ix-button>Right</ix-button>
          </ix-tooltip>
        </td>
      </tr>
      <tr>
        <td>
          <ix-tooltip placement="left-end">
            <template #title>
              <p>This is a very long prompt text.</p>
            </template>
            <ix-button>LB</ix-button>
          </ix-tooltip>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <ix-tooltip placement="right-end">
            <template #title>
              <p>This is a very long prompt text.</p>
            </template>
            <ix-button>RB</ix-button>
          </ix-tooltip>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <ix-tooltip title="This is a very long prompt text." placement="bottom-start">
            <ix-button>BL</ix-button>
          </ix-tooltip>
        </td>
        <td>
          <ix-tooltip title="This is a very long prompt text." placement="bottom">
            <ix-button>Bottom</ix-button>
          </ix-tooltip>
        </td>
        <td>
          <ix-tooltip title="This is a very long prompt text." placement="bottom-end">
            <ix-button>BR</ix-button>
          </ix-tooltip>
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
