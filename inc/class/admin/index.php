<?php // phpcs:ignore

namespace R2\WpPlugin\Admin;

use Micropackage\Singleton\Singleton;

/**
 * RY Neweb Pay Expansion Class
 */
final class Expansion extends Singleton {
	/**
	 * Init function
	 *
	 * @return void
	 */
	public function init() {
		add_filter( 'woocommerce_get_settings_checkout', array( $this, 'add_options_to_gateway_options_page' ), 10, 2 );
	}

	/**
	 * Add options to the gateway's options page
	 *
	 * @param array  $settings            The settings
	 * @param string $current_section_id  The current section ID
	 **/
	public function add_options_to_gateway_options_page( $settings, $current_section_id ) {

		// 當前的section不是我們要的gateway，直接返回settings
		if ( 'ry_newebpay_credit_installment' != $current_section_id ) {
			return $settings;
		}

		// 取得分期期數
		$get_settings = \get_option( 'woocommerce_ry_newebpay_credit_installment_settings', array() );
		// $periods      = $get_settings['number_of_periods'];
		$periods = array( 3, 6, 12, 18, 24, 30 );
		// 取得最小訂購金額
		$min_amount = $get_settings['min_amount'];
		// 取得最大訂購金額
		$max_amount = ( $get_settings['max_amount'] == 0 ) ? null : $get_settings['max_amount'];

		// 建立新欄位
		$my_settings = array(
			array(
				'title' => __( '各期數最小金額' ),
				'type'  => 'title',
				'id'    => 'r2_ry_newebpay_expansion',
			),
		);
		foreach ( $periods as $period ) {
			$my_settings[] = array(
				'id'                => 'woocommerce_ry_newebpay_credit_installment_' . $period . '_of_periods',
				'name'              => 'woocommerce_ry_newebpay_credit_installment_[' . $period . ']_of_periods',
				// translators: %d represents the number of periods.
				'title'             => sprintf( __( '%d 期', 'r2_ry_newebpay_expansion' ), $period ),
				'type'              => 'number',
				'default'           => 0,
				'placeholder'       => 0,
				'class'             => 'r2_newebpay_' . $period . '_of_periods',
				'custom_attributes' => array(
					'min'  => $min_amount,
					'max'  => $max_amount,
					'step' => 1,
				),
			);
		}
		$my_settings[] = array(
			'type' => 'sectionend',
			'id'   => 'r2_ry_newebpay_expansion',
		);

		return $my_settings;
	}
}

$expansion = Expansion::get();
$expansion->init();
