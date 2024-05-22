import jQuery from 'jquery'

import '@/assets/scss/index.scss'

interface window {
  r2_ry_newebpay_expansion_data?: {
    number_of_periods: { [key: number]: number }[]
  }
}
;(function ($) {
  //當結帳頁面更新完成後.
  $(document).on('updated_checkout', function () {
    //取得後台設定的分期數據.
    const expansion_data = (window as window)?.r2_ry_newebpay_expansion_data?.number_of_periods || []
    const cartAmountStr = $('.order-total .woocommerce-Price-amount.amount')[0]?.innerText || '0'

    //取得購物車總金額數字部分.
    const cartAmountNum = parseFloat(cartAmountStr.replace(/[^0-9.-]+/g, ''))

    //取得分期數的選項.
    const selectOption = $('select[name="newebpay_number_of_periods"] option')
    selectOption.each((_index, element) => {
      const optionElement = element as HTMLOptionElement
      //如果總金額大於等於分期數的最小金額,則該選項可選,否則不可選.
      if (cartAmountNum >= Number(expansion_data[Number(optionElement.value)])) {
        $(element).prop('disabled', false)
      } else {
        $(element).prop('disabled', true)
      }
    })
  })
})(jQuery)
