<?php
/**
 * Front-end Entry
 */

declare(strict_types=1);

namespace R2\WpPlugin\FrontEnd;

use R2\WpPlugin\Plugin;

use Micropackage\Singleton\Singleton;
/**
 * Class Entry
 */
final class Entry extends Singleton {

	/**
	 * Constructor
	 */
	public function __construct() {
		\add_action( 'template_redirect', array( $this, 'enqueue_frontend_script' ) );
	}
	/**
	 * Enqueue frontend script
	 * You can load the script on demand
	 *
	 * @return void
	 */
	public function enqueue_frontend_script(): void {
		if ( ! \is_checkout() ) {
			return;
		}
		// 註冊前端腳本
		\wp_enqueue_script(
			Plugin::KEBAB . '_frontend',
			Plugin::$url . '/js/dist/index-frontend.js',
			array( 'jquery' ),
			Plugin::$version,
			array(
				'in_footer' => true,
				'strategy'  => 'async',
			)
		);

		\wp_enqueue_style(
			Plugin::KEBAB,
			Plugin::$url . '/js/dist/assets/css/index.css',
			array(),
			Plugin::$version
		);
		// 取得資料.
		// 取得分期期數.
		$get_settings = \get_option( 'woocommerce_ry_newebpay_credit_installment_settings', array() );
		$periods      = $get_settings['number_of_periods'];
		// 取得期數金額.
		$periods_amount = array();
		foreach ( $periods as $period ) {
			$periods_amount[ $period ] = \get_option( 'woocommerce_ry_newebpay_credit_installment_' . $period . '_of_periods', 0 );
		}

		// 腳本塞入資料.
		\wp_localize_script(
			Plugin::KEBAB . '_frontend',
			Plugin::SNAKE . '_data',
			array(
				'number_of_periods' => $periods_amount,
			)
		);
	}
}

Entry::get();
