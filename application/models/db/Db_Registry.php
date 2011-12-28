<?php
require_once 'Zend/Db.php';
require_once 'Zend/Registry.php';
require_once 'Zend/Config/Ini.php';

class Db_Registry {
	
	public static function getDb(){
		
		if (Zend_Registry::isRegistered("db")) {
			return Zend_Registry::get("db");
		}
		$db = null;
		// 設定を読み込み、アダプタオブジェクトを作ります
		$config = new Zend_Config_Ini( dirname(dirname(dirname(__FILE__))) . '/config/db_info.ini'
									 , 'database');
		//アダプタオブジェクト作成
		$db = Zend_Db::factory($config->db);
		// MySQLの文字コードを指定します
		$db->query("set names '" . $config->character_set . "'");
		Zend_Registry::set("db", $db);
		
		return $db;
	}
}

