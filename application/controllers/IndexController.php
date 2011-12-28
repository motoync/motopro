<?php
require_once 'Zend/Controller/Action.php';    //コンポーネントの呼び出し
require_once 'Zend/Db.php';
require_once dirname(dirname(__FILE__)) . '/models/db/Db_Registry.php';

class IndexController extends Zend_Controller_Action
{
	public function init(){
		$contextSwitch = $this->_helper->contextSwitch;
		//$contextSwitch->addActionContext(‘index’, ‘json’);  // ビュースクリプトは不要
		//$contextSwitch->initContext();
	}
    public function indexAction()    //デフォルトのアクションメソッド
    {
    	$params = array ('host' => '127.0.0.1',
    'username' => 'root',
    'password' => 'root',
    'dbname'   => 'motop',
    'charset'   => 'UTF8');
try {
    //$db = Zend_Db::factory('MYSQLI', $params);
    $db = Db_Registry::getDb();
	
	$sql = "SELECT * FROM  users";
    // SELECT文を実行します
    $result = $db->fetchAll($sql);
    // 配列で返される結果を表示します
    foreach ($result as $row) {
        echo $row['firstname'] . '<br/>';
    }
} catch (Exception $e){
	var_dump($e);
}
	
    }
}
