import jQuery from 'jquery'

import '@/assets/scss/index.scss'
;(function ($) {
  //隱藏分期數的選項.
  const r2_newebpay_of_periods = $('.r2_newebpay_of_periods')
  r2_newebpay_of_periods.each(function () {
    const $this = $(this)
    const tr = $this.closest('tr')
    tr.hide()
  })

  //當WC Enhanced Select初始化完成後.
  $(document).on('wc-enhanced-select-init', function () {
    //初始化後顯示各分期數欄位.
    const number_of_periods_select = $('ul.select2-selection__rendered')
    const choice_periods = number_of_periods_select.children('li.select2-selection__choice')
    showPeriodsTr(choice_periods)

    //當最小金額input改變時，取得允許的分期期數並顯示相應欄位，並且設定input 最小值.
    $(document).on('change', '#woocommerce_ry_newebpay_credit_installment_min_amount', function () {
      const min_amount = $(this).val()
      const choice_periods_change = number_of_periods_select.children('li.select2-selection__choice')
      showPeriodsTr(choice_periods_change)
      $('.r2_newebpay_of_periods').each(function () {
        const $this = $(this)
        $this.attr('min', min_amount)
      })
    })
    //當最大金額input改變時，設定input 最大值.
    $(document).on('change', '#woocommerce_ry_newebpay_credit_installment_max_amount', function () {
      const max_amount = $(this).val()
      $('.r2_newebpay_of_periods').each(function () {
        const $this = $(this)
        $this.attr('max', max_amount)
      })
    })

    // 獲取 ul 元素
    const ulElement = document.querySelector('ul.select2-selection__rendered') as Element
    // 創建一個 MutationObserver 實例並傳入回調函數
    const observer = new MutationObserver(function (mutations: MutationRecord[]) {
      const addedNodes = Array.from(mutations[1].addedNodes) as HTMLElement[]
      showPeriodsTr($(addedNodes))
    })
    // 設定觀察選項：子節點變化
    const config = {
      childList: true, // 只觀察子節點的增減
    }
    // 開始觀察 ul 元素
    observer.observe(ulElement, config)
  })

  /**
   * 顯示選擇的分期數的選項.
   *
   * @param {jQuery} params 選擇的分期數的選項.
   */
  // eslint-disable-next-line no-undef
  function showPeriodsTr(params: JQuery) {
    //如果最小金額為0，則不顯示分期數的選項,直接return.
    const min_amount = $('#woocommerce_ry_newebpay_credit_installment_min_amount').val()
    if (min_amount === '0') return

    //取得選擇的分期數.
    const enable_periods = params.map((_index, element) => {
      const value = $(element)
        .attr('title')
        ?.replace(/[^0-9.-]+/g, '')
      return value + '_of_periods'
    })
    // 將對象的值轉換成陣列
    const enabledClasses = Object.values(enable_periods)

    // 遍歷所有分期數的選項，並根據選擇的分期數顯示相應的欄位.
    r2_newebpay_of_periods.each(function () {
      const $this = $(this)
      // 獲取所有類名並組成陣列
      const allClasses = $this.attr('class')?.split(' ')
      // 檢查目標元素的任一類名是否存在於 enable_periods 中
      const isShow = allClasses?.some((className) => enabledClasses.includes(className))
      if (isShow) {
        $this.closest('tr').show()
      } else {
        $this.closest('tr').hide()
      }
    })
  }
})(jQuery)
