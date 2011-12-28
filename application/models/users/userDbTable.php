<?php
require_once 'Zend/Db/Table.php';
require_once 'Zend/Db.php';
require_once dirname(dirname(__FILE__)) . '/db/Db_Registry.php';
require_once dirname(__FILE__) . '/user.php';

class UsersDbTable extends Zend_Db_Table_Abstract 
{

    protected $_name	= 'users';
    protected $_primary = 'id';
    
    
    public function __construct($indb)
    {
        parent::__construct(array('db' => $indb));
    }
    
    public function selectAll($count, $offset)
    {
        $rows = $this->fetchAll(
                     $this->select()
                          ->order('login ASC')
                          ->limit($count, $offset)
                 );
        return $rows;
    }
}
