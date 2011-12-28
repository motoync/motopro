/**
 * @author yamanaka
 */
$("head").append($(" <script type='text/javascript' src='../js/models/effects.js'></script>"));

var User = function(inUserJson){
    // コンストラクタ
    this.id               = inUserJson["id"];
    this.login            = inUserJson["login"];
    this.password         = inUserJson["password"];
    this.firstname        = inUserJson["firstname"];
    this.lastname         = inUserJson["lastname"];
    this.mail             = inUserJson["mail"];
    this.last_login_on    = inUserJson["last_login_on"];
    this.language         = inUserJson["language"];
    this.created_on       = inUserJson["created_on"];
    this.updated_on       = inUserJson["updated_on"];
    
    this.icon = null;
    this.x = 0;
    this.y = 0;
    
    this.createIcon();
};

User.prototype = {
    /**
     * 一覧取得
     */
    createIcon : function(){
        // ユーザのアイコンを作成する。
        if (this.icon != null) {
            return this.icon;
        }
        
        var wrapper = $("<div/>").addClass("user");
        
        var pageOne = $("<div/>");
        pageOne.append($("<span/>").text(this.firstname + " " + this.lastname));
        pageOne.append($("<img/>").attr("src", "../img/sample.jpg"));
        wrapper.append(pageOne);
        
        var pageTwo = $("<div/>");
        pageTwo.append($("<span/>").text(this.login));
        pageTwo.append($("<span/>").text(this.mail));
        pageTwo.append($("<span/>").text(this.last_login_on));
        wrapper.append(pageTwo);
        
        this.icon = wrapper;
        this.icon.css({top : this.x, left : this.y});
        return wrapper;
    },
    
    moveTo : function(inX, inY){
        // ユーザのアイコンを作成する。
        this.x = inX;
        this.y = inY;
        if (this.icon == null) {
            return false;
        }
        this.icon.css({top : this.x, left : this.y});
        return true;
    },
    
    moveInOneGoOn : function(effect){
        // strategy
        effect.moveInOneGo(this.icon, this.x, this.y);
        return true;
    },
    
    moveStepByStepOn : function(effect){
        // strategy
        effect.moveStepByStep(this.icon, this.x, this.y);
        return true;
    },
    
    appendTo : function(parentNode){
        // ユーザのアイコンを作成する。
        parentNode.append(this.icon);
    },
    
    setInZIndex : function(inZIndex){
        // ユーザのアイコンを作成する。
        this.icon.css({'z-index' : inZIndex});
    },
    
    end : function(){
        // 最後の関数にコンマはつかないので、そのための関数。
        //　何かしらの処理をさせたい。
    }
}

var UsersList = function(inUsersListJson){
    // コンストラクタ
    
    this.usersList   = new Array();
    var counter = 0;
    for (var num in inUsersListJson) {
        this.usersList[counter++] = new User(inUsersListJson[num]);
    }
    
    //　細かさ
    this.fineness = 360;
};

UsersList.prototype = {
    /**
     * 一覧取得
     */
    createCircleOfIcons : function(inXzero, inYzero, inRadius){
        // ユーザのアイコンを作成する。
        var users = this.usersList;
        var circle  = $("<div/>").addClass("circle");
        var radian = 0;
        var revolve = null;
        for (var i = 0; i < users.length; i++) {
            users[i].createIcon();
            radian  = 2 * Math.PI/users.length * i;
            revolve = new RevolutionEffect(inXzero, inYzero, radian, inRadius);
            this.setCirclePosition(icon, inXzero, inYzero, inRadius, users.length, i)
            circle.append(icon);
        }
        
        return circle;
    },
    
    setCirclePosition : function(inIcon, inXzero, inYzero, inRadius, inNum, inOrder){
        var rad = 0;
        var x = 0;
        var y = 0;
        inIcon.css({ position : "absolute"});
        rad = this.getRadian(Math.PI/2, inNum, inOrder);
        x   = this.getCircleX(inXzero, inRadius, rad);
        y   = this.getCircleY(inYzero, inRadius, rad);
        inIcon.css({top : y, left : x});
    },
    
    turnRound : function(inIcon, inXzero, inYzero, inRadius, inNum, inOrder){
        //細かさ
        var standardRadian = Math.PI/this.fineness;
        var standardRadius = inRadius/this.fineness;
        var rad = 0;
        var x = 0;
        var y = 0;
        var id = setTimeout();
        
        rad = this.getRadian(Math.PI/2, inNum, inOrder);
        x   = this.getCircleX(inXzero, inRadius, rad);
        y   = this.getCircleY(inYzero, inRadius, rad);
    },
    
    moveOneFrame : function( inIcon
                           , inXzero
                           , inYzero
                           , inStartRadius
                           , inRadius
                           , inStartRadian
                           , inNum
                           , inOrder){
        //細かさ
        var standardRadian = Math.PI/this.fineness;
        var standardRadius = inStartRadius/this.fineness;
        var rad = 0;
        var x = 0;
        var y = 0;
        var id;
        
        rad = this.getRadian(inRadius + standardRadian, inNum, inOrder);
        x   = this.getCircleX(inXzero, inRadius + standardRadius, rad);
        y   = this.getCircleY(inYzero, inRadius + standardRadius, rad);
        inIcon.css({top : y, left : x});
        
        id = setTimeout( (function(){ 
                                     return function(){}; 
                                   })()
                       , 200);
        
        if ( inRadius + standardRadius >  inStartRadius) {
            clearTimeout(id);
            
            rad = this.getRadian(standardRadian, inNum, inOrder);
            x   = this.getCircleX(inXzero, inStartRadian, rad);
            y   = this.getCircleY(inYzero, inStartRadian, rad);
            inIcon.css({top : y, left : x});
            
            return true;
        }
    },
    
    getRadian : function(startRad, elementNum, order){
        // x0 + cos(π/2-i2π/N)
        return startRad - order * 2 * Math.PI/elementNum;
    },
    
    getCircleX : function(xzero, radius, radian){
        // x0 + cos(π/2-i2π/N)
        var x = 0;
        x = xzero + radius * Math.cos(radian);
        return x;
    },
    
    getCircleY : function(yzero, radius, radian){
        // y0 - sin(π/2-i2π/N) 
        var y = 0;
        y = yzero - radius * Math.sin(radian);
        return y;
    },
    
    end : function(){
        // 最後の関数にコンマはつかないので、そのための関数。
        //　何かしらの処理をさせたい。
    }
}

