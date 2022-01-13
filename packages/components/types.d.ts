/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AlertComponent } from '@idux/components/alert'
import type { AnchorComponent, AnchorLinkComponent } from '@idux/components/anchor'
import type { AvatarComponent } from '@idux/components/avatar'
import type { BackTopComponent } from '@idux/components/back-top'
import type { BadgeComponent } from '@idux/components/badge'
import type { BreadcrumbComponent, BreadcrumbItemComponent } from '@idux/components/breadcrumb'
import type { ButtonComponent, ButtonGroupComponent } from '@idux/components/button'
import type { CardComponent, CardGridComponent } from '@idux/components/card'
import type { CarouselComponent } from '@idux/components/carousel'
import type { CheckboxComponent, CheckboxGroupComponent } from '@idux/components/checkbox'
import type { CollapseComponent, CollapsePanelComponent } from '@idux/components/collapse'
import type { DatePickerComponent } from '@idux/components/date-picker'
import type { DividerComponent } from '@idux/components/divider'
import type { DrawerComponent, DrawerProviderComponent } from '@idux/components/drawer'
import type { DropdownComponent } from '@idux/components/dropdown'
import type { EmptyComponent } from '@idux/components/empty'
import type { FormComponent, FormItemComponent, FormWrapperComponent } from '@idux/components/form'
import type { ColComponent, RowComponent } from '@idux/components/grid'
import type { HeaderComponent } from '@idux/components/header'
import type { IconComponent } from '@idux/components/icon'
import type { ImageComponent, ImageViewerComponent } from '@idux/components/image'
import type { InputComponent } from '@idux/components/input'
import type { InputNumberComponent } from '@idux/components/input-number'
import type {
  LayoutComponent,
  LayoutContentComponent,
  LayoutFooterComponent,
  LayoutHeaderComponent,
  LayoutSiderComponent,
} from '@idux/components/layout'
import type { ListComponent, ListItemComponent } from '@idux/components/list'
import type {
  MenuComponent,
  MenuDividerComponent,
  MenuItemComponent,
  MenuItemGroupComponent,
  MenuSubComponent,
} from '@idux/components/menu'
import type { MessageComponent, MessageProviderComponent } from '@idux/components/message'
import type { ModalComponent, ModalProviderComponent } from '@idux/components/modal'
import type { NotificationComponent, NotificationProviderComponent } from '@idux/components/notification'
import type { PaginationComponent } from '@idux/components/pagination'
import type { PopconfirmComponent } from '@idux/components/popconfirm'
import type { PopoverComponent } from '@idux/components/popover'
import type { ProgressComponent } from '@idux/components/progress'
import type { RadioComponent, RadioGroupComponent } from '@idux/components/radio'
import type { RateComponent } from '@idux/components/rate'
import type { ResultComponent } from '@idux/components/result'
import type { SelectComponent, SelectOptionComponent, SelectOptionGroupComponent } from '@idux/components/select'
import type { SkeletonComponent } from '@idux/components/skeleton'
import type { SliderComponent } from '@idux/components/slider'
import type { SpaceComponent } from '@idux/components/space'
import type { SpinComponent } from '@idux/components/spin'
import type { StatisticComponent } from '@idux/components/statistic'
import type { StepperComponent, StepperItemComponent } from '@idux/components/stepper'
import type { SwitchComponent } from '@idux/components/switch'
import type { TableColumnComponent, TableComponent } from '@idux/components/table'
import type { TabComponent, TabsComponent } from '@idux/components/tabs'
import type { TagComponent } from '@idux/components/tag'
import type { TextareaComponent } from '@idux/components/textarea'
import type { TimePickerComponent } from '@idux/components/time-picker'
import type { TimelineComponent, TimelineItemComponent } from '@idux/components/timeline'
import type { TooltipComponent } from '@idux/components/tooltip'
import type { TreeComponent } from '@idux/components/tree'

declare module 'vue' {
  export interface GlobalComponents {
    IxAlert: AlertComponent
    IxAnchor: AnchorComponent
    IxAnchorLink: AnchorLinkComponent
    IxAvatar: AvatarComponent
    IxBackTop: BackTopComponent
    IxBadge: BadgeComponent
    IxBreadcrumb: BreadcrumbComponent
    IxBreadcrumbItem: BreadcrumbItemComponent
    IxButton: ButtonComponent
    IxButtonGroup: ButtonGroupComponent
    IxCard: CardComponent
    IxCardGrid: CardGridComponent
    IxCarousel: CarouselComponent
    IxCheckbox: CheckboxComponent
    IxCheckboxGroup: CheckboxGroupComponent
    IxCol: ColComponent
    IxCollapse: CollapseComponent
    IxCollapsePanel: CollapsePanelComponent
    IxDatePicker: DatePickerComponent
    IxDivider: DividerComponent
    IxDrawer: DrawerComponent
    IxDrawerProvider: DrawerProviderComponent
    IxDropdown: DropdownComponent
    IxEmpty: EmptyComponent
    IxForm: FormComponent
    IxFormItem: FormItemComponent
    IxFormWrapper: FormWrapperComponent
    IxHeader: HeaderComponent
    IxIcon: IconComponent
    IxImage: ImageComponent
    IxImageViewer: ImageViewerComponent
    IxInput: InputComponent
    IxInputNumber: InputNumberComponent
    IxLayout: LayoutComponent
    IxLayoutContent: LayoutContentComponent
    IxLayoutFooter: LayoutFooterComponent
    IxLayoutHeader: LayoutHeaderComponent
    IxLayoutSider: LayoutSiderComponent
    IxList: ListComponent
    IxListItem: ListItemComponent
    IxMenu: MenuComponent
    IxMenuDivider: MenuDividerComponent
    IxMenuItem: MenuItemComponent
    IxMenuItemGroup: MenuItemGroupComponent
    IxMenuSub: MenuSubComponent
    IxMessage: MessageComponent
    IxMessageProvider: MessageProviderComponent
    IxModal: ModalComponent
    IxModalProvider: ModalProviderComponent
    IxNotification: NotificationComponent
    IxNotificationProvider: NotificationProviderComponent
    IxPagination: PaginationComponent
    IxPopconfirm: PopconfirmComponent
    IxPopover: PopoverComponent
    IxProgress: ProgressComponent
    IxRadio: RadioComponent
    IxRadioGroup: RadioGroupComponent
    IxRate: RateComponent
    IxResult: ResultComponent
    IxRow: RowComponent
    IxSelect: SelectComponent
    IxSelectOption: SelectOptionComponent
    IxSelectOptionGroup: SelectOptionGroupComponent
    IxSkeleton: SkeletonComponent
    IxSlider: SliderComponent
    IxSpace: SpaceComponent
    IxSpin: SpinComponent
    IxStatistic: StatisticComponent
    IxStepper: StepperComponent
    IxStepperItem: StepperItemComponent
    IxSwitch: SwitchComponent
    IxTab: TabComponent
    IxTable: TableComponent
    IxTableColumn: TableColumnComponent
    IxTabs: TabsComponent
    IxTag: TagComponent
    IxTextarea: TextareaComponent
    IxTimeline: TimelineComponent
    IxTimelineItem: TimelineItemComponent
    IxTimePicker: TimePickerComponent
    IxTooltip: TooltipComponent
    IxTree: TreeComponent
  }
}

export {}
