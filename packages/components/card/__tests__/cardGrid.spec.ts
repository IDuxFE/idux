import { flushPromises, mount } from '@vue/test-utils'

import Card from '../src/Card'
import CardGrid from '../src/CardGrid'

describe('CardGrid', () => {
  test('render work', async () => {
    const wrapper = mount({
      components: { Card, CardGrid },
      template: `
      <Card>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
      </Card>
      `,
    })
    await flushPromises()

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('hoverable work', async () => {
    const wrapper = mount({
      components: { Card, CardGrid },
      template: `
      <Card>
        <CardGrid hoverable>Content</CardGrid>
        <CardGrid hoverable>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid hoverable >Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
      </Card>
      `,
    })
    await flushPromises()

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('hoverable2 work', async () => {
    const wrapper = mount({
      components: { Card, CardGrid },
      template: `
      <Card hoverable>
        <CardGrid :hoverable="false">Content</CardGrid>
        <CardGrid :hoverable="false">Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
        <CardGrid>Content</CardGrid>
      </Card>
      `,
    })
    await flushPromises()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
