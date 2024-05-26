import jQuery from 'jquery'

import '@/assets/scss/index.scss'
;(function ($) {
  $(document).on('wc-enhanced-select-init', function () {
    console.log('wc-enhanced-select-init')
  })
  console.log('Hello admin')
})(jQuery)
