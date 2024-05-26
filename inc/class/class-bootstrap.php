<?php
/**
 * Bootstrap
 */

declare (strict_types = 1);

namespace R2\WpPlugin;

use Micropackage\Singleton\Singleton;

/**
 * Class Bootstrap
 */
final class Bootstrap extends Singleton {


	/**
	 * Constructor
	 */
	public function __construct() {
		require_once __DIR__ . '/utils/index.php';
		require_once __DIR__ . '/admin/index.php';
		require_once __DIR__ . '/front-end/index.php';

		\add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_script' ), 99 );
		\add_filter(
			'script_loader_tag',
			function ( $tag, $handle, $src ) {
				if ( Plugin::KEBAB . '_admin' === $handle || Plugin::KEBAB . '_frontend' === $handle ) {
					// phpcs:ignore.
					$tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
				}
				return $tag;
			},
			10,
			3
		);
	}

	/**
	 * Admin Enqueue script
	 * You can load the script on demand
	 *
	 * @param string $hook current page hook
	 *
	 * @return void
	 */
	public function admin_enqueue_script( $hook ): void {
		$this->enqueue_admin_script();
	}



	/**
	 * Enqueue admin script
	 * You can load the script on demand
	 *
	 * @return void
	 */
	public function enqueue_admin_script(): void {

		\wp_enqueue_script(
			Plugin::KEBAB . '_admin',
			Plugin::$url . '/js/dist/index-admin.js',
			array( 'jquery' ),
			Plugin::$version,
			array(
				'in_footer' => true,
				'strategy'  => 'async',
			)
		);

		// \wp_enqueue_style(
		// Plugin::KEBAB,
		// Plugin::$url . '/js/dist/assets/css/index.css',
		// array(),
		// Plugin::$version
		// );
	}
}
