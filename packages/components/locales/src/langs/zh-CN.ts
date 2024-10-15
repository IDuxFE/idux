/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Locale } from '../types'

import { zhCN as dateFnsLocale } from 'date-fns/locale'

const zhCN: Locale = {
  type: 'zh-CN',
  date: dateFnsLocale,
  colorPicker: {
    presetEmpty: '暂无',
  },
  datePicker: {
    today: '今天',
    ok: '确定',
    clear: '清除',
    month: '月',
    year: '年',
    monthSelect: '选择月份',
    yearSelect: '选择年份',
    monthFormat: 'MMM',
    yearFormat: 'yyyy年',
    previousMonth: '上个月',
    nextMonth: '下个月',
    previousYear: '上一年',
    nextYear: '下一年',
    previousDecade: '上一年代',
    nextDecade: '下一年代',
    datePlaceholder: '请选择日期',
    yearPlaceholder: '请选择年份',
    quarterPlaceholder: '请选择季度',
    monthPlaceholder: '请选择月份',
    weekPlaceholder: '请选择周',
    datetimePlaceholder: '请选择日期时间',
  },
  dateRangePicker: {
    datePlaceholder: ['开始日期', '结束日期'],
    weekPlaceholder: ['开始周', '结束周'],
    monthPlaceholder: ['开始月份', '结束月份'],
    quarterPlaceholder: ['开始季度', '结束季度'],
    yearPlaceholder: ['开始年份', '结束年份'],
    datetimePlaceholder: ['开始时间', '结束时间'],
    separator: '至',
    okText: '确定',
    cancelText: '取消',
  },
  empty: {
    description: '暂无数据',
  },
  modal: {
    cancelText: '取消',
    okText: '确定',
    justOkText: '我知道了',
  },
  popconfirm: {
    cancelText: '取消',
    okText: '确定',
  },
  pagination: {
    itemsPerPage: '每页',
    itemsSuffix: '项',
    jumpTo: '前往',
    page: '页',
    prev: '上一页',
    next: '下一页',
    prev5: '向前 5 页',
    next5: '向后 5 页',
    totalPrefix: '共',
    totalSuffix: '项',
  },
  select: {
    limitMessage: '该选择器的值不能超过 ${0} 项',
  },
  table: {
    expand: '展开行',
    collapse: '收起行',
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    filterEmptyText: '无筛选项',
    selectAll: '全选所有',
    selectInvert: '反选所有',
    selectNone: '清空所有',
    selectPageAll: '全选当页',
    selectPageInvert: '反选当页',
    sortDesc: '点击降序',
    sortAsc: '点击升序',
    sortCancel: '取消排序',
  },
  tabs: {
    allTabs: '所有面板',
  },
  text: {
    copyText: ['点击复制', '复制成功'],
  },
  timePicker: {
    okText: '确定',
    placeholder: '请选择时间',
  },
  timeRangePicker: {
    okText: '确定',
    separator: '至',
    placeholder: ['起始时间', '结束时间'],
  },
  tour: {
    nextText: '下一步',
    prevText: '上一步',
    finishText: '开始体验',
  },
  transfer: {
    toSelect: '待选',
    selected: '已选',
    searchPlaceholder: ['搜索关键字', '搜索关键字'],
  },
  treeSelect: {
    expandAll: '展开全部',
    collapseAll: '收起全部',
  },
  upload: {
    uploading: '正在上传...',
    error: '上传失败',
    cancel: '取消上传',
    preview: '预览文件',
    remove: '删除文件',
    retry: '重新上传',
    download: '下载文件',
  },
}

export default zhCN
