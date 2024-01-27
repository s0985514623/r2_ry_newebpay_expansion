<?php

declare(strict_types=1);

namespace J7\MyPlugin;

require_once __DIR__ . '/admin/index.php';

class Bootstrap
{
	public function __construct()
	{
		$this->init();
		\add_action('init', array($this, 'remove_notices'), 20);
	}

	private function init()
	{
		// 套件的 class 都在這裡初始化
		new Admin\UI();
	}

	public function remove_notices(): void
	{
		\remove_action('admin_notices', array(\TGM_Plugin_Activation::$instance, 'notices'));
	}
}
