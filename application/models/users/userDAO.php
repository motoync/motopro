<?php
require_once dirname(__FILE__) . '/userDbTable.php';

class userDAO{
    private $db = null;
    
    private $dbTable = null;
    
    public function __construct(){
        $this->db = Db_Registry::getDb();
        
    }
    
    protected function createUserDbTable(){
        if (is_null($this->dbTable)) {
            $this->dbTable = new UsersDbTable($this->db);
        }
        
        return $this->dbTable;
    }
    
    public function find($inId){
        $userDbTable = $this->createUserDbTable();
        $rowSet      = $userDbTable->find($inId);
        
        $row = $rowSet->getRow(0);
        return $row;
    }
    
    public function selectAll($count, $offset){
        $userDbTable = $this->createUserDbTable();
        $rowSet      = $userDbTable->selectAll($count, $offset);
        
        return $rowSet;
    }
    
}
