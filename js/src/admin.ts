import jQuery from 'jquery'

import '@/assets/scss/index.scss'
;(function ($) {
  //隱藏分期數的選項.
  $('.r2_newebpay_of_periods').each(function () {
    const $this = $(this)
    const tr = $this.closest('tr')
    tr.hide()
  })

  //當WC Enhanced Select初始化完成後.
  $(document).on('wc-enhanced-select-init', function () {
    const number_of_periods_select = $('ul.select2-selection__rendered')
    const choice_periods = number_of_periods_select.children('li.select2-selection__choice')
    showPeriodsTr(choice_periods)

    //當最小金額改變時.
    $(document).on('change', '#woocommerce_ry_newebpay_credit_installment_min_amount', function () {
      const min_amount = $(this).val()
      const choice_periods_change = number_of_periods_select.children('li.select2-selection__choice')
      showPeriodsTr(choice_periods_change)
      $('.r2_newebpay_of_periods').each(function () {
        const $this = $(this)
        $this.attr('min', min_amount)
      })
    })

    // 獲取 ul 元素
    const ulElement = document.querySelector('ul.select2-selection__rendered') as Element
    // 創建一個 MutationObserver 實例並傳入回調函數
    const observer = new MutationObserver(handleMutations)
    // 設定觀察選項：子節點變化
    const config = {
      childList: true, // 只觀察子節點的增減
    }
    // 開始觀察 ul 元素
    observer.observe(ulElement, config)
  })

  /**
   *
   * @param {jQuery} params 選擇的分期數的選項.
   */
  // eslint-disable-next-line no-undef
  function showPeriodsTr(params: JQuery) {
    const min_amount = $('#woocommerce_ry_newebpay_credit_installment_min_amount').val()
    if (min_amount === '0') return
    params.each((_index, element) => {
      //取得選擇的分期數.
      const value = $(element)
        .attr('title')
        ?.replace(/[^0-9.-]+/g, '')
      //顯示選擇的分期數的選項.
      $('.' + value + '_of_periods')
        .closest('tr')
        .show()
    })
  }
  /**
   * MutationObserver Callback function.
   *
   * @param {Element} mutations
   */
  function handleMutations(mutations: MutationRecord[]) {
    const number_of_periods_select = $('ul.select2-selection__rendered')
    const choice_periods_change = number_of_periods_select.children('li.select2-selection__choice')
    showPeriodsTr(choice_periods_change)
    // console.log(mutations)
  }
})(jQuery)
