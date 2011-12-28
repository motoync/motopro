/**
 * @author 
 * 
 * UsersControllerとのやり取りをおこなうview用のJavaScriptクラス
 * テーブルの作成等々汎用な処理はそのためのクラスを作成して使用する。
 * 
 */

var UsersView = function(inId){
    // コンストラクタ
    var id = inId;
};

UsersView.prototype = {
    /**
     * 一覧取得
     */
    listAction : function(req){
        // 作成したリクエストを用いてAjaxでアクセス、レスポンスをbuildに渡す。
        var self = this;
        $.ajax({
            type: "POST",
            url: "/phpdevelop/motopro/users/list/format/json/",
            data: req,
            success: function(res){
                self.buildList(res);
            }
        });
        return true;
    },
    
    buildList : function (res) {
        // 
        var users    = res["users"];
        var userList = new UsersList(users);
        var circleDiv   = userList.createCircleOfIcons(270, 270, 250);
        
        $("#mainContents").append(circleDiv);
        
        return true;
    },
    
    end : function(){
        // 最後の関数にコンマはつかないので、そのための関数。
        //　何かしらの処理をさせたい。
    }
}

$(function(){
    var userCss = $("<link rel='stylesheet' type='text/css' href='../css/user.css?ver=0.2' media='screen'>");
    $("head").append(userCss);
    
    var userJs = $(" <script type='text/javascript' src='../js/models/users.js'></script>");
    $("head").append(userJs);
    
    var usersView = new UsersView();
    usersView.listAction();
});

