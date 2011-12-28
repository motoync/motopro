<?php
require_once 'Zend/Controller/Action.php';
require_once dirname(dirname(__FILE__)) . '/models/users/user.php';

class UsersController extends Zend_Controller_Action
{
    public function init(){
        $contextSwitch = $this->_helper->contextSwitch();
        $contextSwitch->addActionContext('list', 'json');  // ビュースクリプトは不要
        $contextSwitch->initContext();
    }
    
    public function indexAction()
    {
                $user = new User("11");
                $user->absorbById();
                $user->toJson();
    }
    
    public function listAction()
    {
        $user = new User();
        $userList = $user->searchAll(10, 0);
        //連想配列をJsonの関数を用いて、Jsonに変換する。
        $jsonList = $user->toArrayOfJsons($userList);
        $this->view->assign("users", $jsonList);
    }
}
?>