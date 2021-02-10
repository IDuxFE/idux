import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent, PropType } from 'vue'
import { renderWork } from '@tests'
import IxTimeline from '../src/Timeline.vue'
import IxTimelineItem from '../src/TimelineItem.vue'
import type { TimelineItemProps } from '../src/types';
import type { TimelineMode, TimelineItemMode } from '../src/types';

const TestComponent = {
    components: {IxTimeline, IxTimelineItem},
    template: `
    <IxTimeline :mode="mode">
        <IxTimelineItem>0</IxTimelineItem>
        <IxTimelineItem :position="position">1</IxTimelineItem>
        <IxTimelineItem>2</IxTimelineItem>
        <IxTimelineItem>3</IxTimelineItem>
    </IxTimeline>
    `,
    props: {
        mode: { type: String as PropType<TimelineMode>, default: undefined },
        position: { type: String as PropType<TimelineItemMode>, default: undefined }
    }
}

describe('TimelineItem.vue', () => {
    let timelineItemMount: (
        options?: MountingOptions<Partial<TimelineItemProps>>,
      ) => VueWrapper<InstanceType<DefineComponent<TimelineItemProps>>>
    
    beforeEach(() => {
        timelineItemMount = (options = {}) => {
            return mount<TimelineItemProps>(IxTimelineItem, {
            ...options,
            })
        }
    })

    renderWork(IxTimelineItem)

    test('color work', () => {
        const wrapper = timelineItemMount({
            props: {
                color: 'red'
            }
        });
        expect(wrapper.find('.ix-timeline-item__dot').html()).toContain('style="color: red; border-color: red;"');
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('dot work', async () => {
        const dotText = 'dotText';
        const wrapper = timelineItemMount();
        expect(wrapper.find('.ix-timeline-item__dot--custom').exists()).toBe(false);
        expect(wrapper.find('.ix-timeline-item__dot').text()).toBe('');
        expect(wrapper.html()).toMatchSnapshot()

        await wrapper.setProps({
            dot: dotText
        });
        expect(wrapper.find('.ix-timeline-item__dot--custom').exists()).toBe(true);
        expect(wrapper.find('.ix-timeline-item__dot').classes()).toContain('ix-timeline-item__dot--custom');
        expect(wrapper.find('.ix-timeline-item__dot').text()).toBe(dotText);
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('dot slot work', async () => {
        const dotSlotText = 'dotSlotText';
        const dotText = 'dotText';
        const wrapper = timelineItemMount({
            slots: {
                dot: dotSlotText
            }
        });
        expect(wrapper.find('.ix-timeline-item__dot--custom').exists()).toBe(true);
        expect(wrapper.find('.ix-timeline-item__dot').classes()).toContain('ix-timeline-item__dot--custom');
        expect(wrapper.find('.ix-timeline-item__dot').text()).toBe(dotSlotText);
        expect(wrapper.html()).toMatchSnapshot()

        await wrapper.setProps({
            dot: dotText
        });
        expect(wrapper.find('.ix-timeline-item__dot').text()).toBe(dotSlotText);
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('position work', async () => {
        const wrapper = mount(TestComponent);
        expect(wrapper.classes()).toContain('ix-timeline--right');
        expect(wrapper.findAll('.ix-timeline-item').length).toBe(4);
        expect(wrapper.findAll('.ix-timeline-item--right').length).toBe(4);
        expect(wrapper.html()).toMatchSnapshot()

        await wrapper.setProps({
            position: 'left'
        });
        expect(wrapper.classes()).toContain('ix-timeline--alternate');
        expect(wrapper.findAll('.ix-timeline-item').length).toBe(4);
        expect(wrapper.findAll('.ix-timeline-item--right').length).toBe(3);
        expect(wrapper.findAll('.ix-timeline-item')[1].classes()).toContain('ix-timeline-item--left');
        expect(wrapper.html()).toMatchSnapshot()
        
        await wrapper.setProps({
            mode: 'left',
            position: undefined
        });
        expect(wrapper.classes()).toContain('ix-timeline--left');
        expect(wrapper.findAll('.ix-timeline-item').length).toBe(4);
        expect(wrapper.findAll('.ix-timeline-item--left').length).toBe(4);
        expect(wrapper.html()).toMatchSnapshot()

        await wrapper.setProps({
            position: 'right'
        });
        expect(wrapper.classes()).toContain('ix-timeline--alternate');
        expect(wrapper.findAll('.ix-timeline-item').length).toBe(4);
        expect(wrapper.findAll('.ix-timeline-item--left').length).toBe(3);
        expect(wrapper.findAll('.ix-timeline-item')[1].classes()).toContain('ix-timeline-item--right');
        expect(wrapper.html()).toMatchSnapshot()

        await wrapper.setProps({
            mode: 'alternate',
            position: undefined
        });
        expect(wrapper.classes()).toContain('ix-timeline--alternate');
        expect(wrapper.findAll('.ix-timeline-item').length).toBe(4);
        wrapper.findAll('.ix-timeline-item').forEach((item, index) => {
            let position = index % 2 ? 'left' : 'right';

            expect(item.classes()).toContain(`ix-timeline-item--${position}`);
        })
        expect(wrapper.html()).toMatchSnapshot()

        await wrapper.setProps({
            position: 'right'
        });
        wrapper.findAll('.ix-timeline-item').forEach((item, index) => {
            let position = index % 2 ? 'left' : 'right';

            if (index === 1) {
                expect(item.classes()).toContain(`ix-timeline-item--right`);
            } else {
                expect(item.classes()).toContain(`ix-timeline-item--${position}`);
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })
        
})