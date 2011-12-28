<?php
require_once 'Zend/Json.php';
require_once dirname(__FILE__) . '/userDAO.php';
/*
 * ドメインロジックを記述する。
 * 
 */
class User {
    
    protected $id;
    protected $login;
    protected $hashed_password;
    protected $firstname;
    protected $lastname;
    protected $mail;
    protected $admin;
    protected $status;
    protected $last_login_on;
    protected $language;
    protected $auth_source_id;
    protected $created_on;
    protected $updated_on;
    protected $type;
    protected $identity_url;
    protected $mail_notification;
    protected $salt;
    
    protected $password;
    
    public function __construct( $id = ""
                               , $login = ""
                               , $password = ""
                               , $firstname = ""
                               , $lastname = ""
                               , $mail = ""
                               ){
        $this->id           = $id;
        $this->login        = $login;
        $this->password     = $password;
        $this->firstname    = $firstname;
        $this->lastname     = $lastname;
        $this->mail         = $mail;
    }
    
    public function absorbRow(Zend_Db_Table_Row $inRow){
        
        $this->id                   = $inRow->id;
        $this->login                = $inRow->login;
        $this->hashed_password      = $inRow->hashed_password;
        $this->firstname            = $inRow->firstname;
        $this->lastname             = $inRow->lastname;
        $this->mail                 = $inRow->mail;
        $this->admin                = $inRow->admin;
        $this->status               = $inRow->status;
        $this->last_login_on        = $inRow->last_login_on;
        $this->language             = $inRow->language;
        $this->auth_source_id       = $inRow->auth_source_id;
        $this->created_on           = $inRow->created_on;
        $this->updated_on           = $inRow->updated_on;
        $this->type                 = $inRow->type;
        $this->identity_url         = $inRow->identity_url;
        $this->mail_notification    = $inRow->mail_notification;
        $this->salt                 = $inRow->salt;
        
    }
    
    public function absorbById(){
        $inUserDAO = new userDAO();
        $row       = $inUserDAO->find($this->id);
        $this->absorbRow($row);
    }
    
    public function searchAll($count, $offset){
        $inUserDAO = new userDAO();
        $rowSet    = $inUserDAO->selectAll($count, $offset);
        
        $resultList = array();
        $user = null;
        $row  = null;
        foreach ($rowSet as $row) {
            $user = new User();
            $user->absorbRow($row);
            $resultList[] = $user;
        }
        
        return $resultList;
    }
    
    public function toArray(){
        $result = array();
        $result["id"]                = $this->id;
        $result["login"]             = $this->login;
        $result["hashed_password"]   = $this->hashed_password;
        $result["firstname"]         = $this->firstname;
        $result["lastname"]          = $this->lastname;
        $result["mail"]              = $this->mail;
        $result["admin"]             = $this->admin;
        $result["status"]            = $this->status;
        $result["last_login_on"]     = $this->last_login_on;
        $result["language"]          = $this->language;
        $result["auth_source_id"]    = $this->auth_source_id;
        $result["created_on"]        = $this->created_on;
        $result["updated_on"]        = $this->updated_on;
        $result["type"]              = $this->type;
        $result["identity_url"]      = $this->identity_url;
        $result["mail_notification"] = $this->mail_notification;
        $result["salt"]              = $this->salt;
        return $result;
    }
    
    public function toJson(){
        $result     = $this->toArray();
        $jSonResult = Zend_Json::encode($result);
        
        return $result;
    }
    
    public function toJsons($userList){
        $result = "";
        $result = $this->toArrayOfJsons($userList);
        return $result;
    }
    
    public function toArrayOfJsons($userList){
        $result = "";
        $array = array();
        
        $counter = 0;
        foreach ($userList as $key => $user) {
            $array[$counter++] = $user->toJson();
        }
        return $array;
    }
}
