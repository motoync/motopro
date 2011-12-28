/**
 * @author yamanaka
 */
$("head").append($(" <script type='text/javascript' src='../js/models/coordinates.js'></script>"));


var RevolveInOneGoEffect = function(inX, inY, inRadian, inRadius){
    // 回転の中心
    this.polarCoordinates  = new PolarCoordinates(inX, inY);
    // 回転角度
    this.radian   = inRadian;
    // 回転後の半径
    this.radius   = inRadius;
};

RevolveInOneGoEffect.prototype = {
    /**
     * 一覧取得
     */
    move : function(elm, currentX, currentY){
        // 
        var expanded = this.polarCoordinates.expand(currentX, currentY, this.radius);
        
        var revolved = this.polarCoordinates.revolve(expanded["x"], expanded["y"], this.radian);
        
        elm.moveTo(revolved["x"], revolved["y"]);
        
    },
    
    end : function(){
        // 最後の関数にコンマはつかないので、そのための関数。
        //　何かしらの処理をさせたい。
    }
}

var RevolveStepByStepEffect = function(inX, inY, inRadian, inRadius){
    // 回転の中心
    this.polarCoordinates  = new PolarCoordinates(inX, inY);
    // 回転角度
    this.radian   = inRadian;
    // 回転後の半径
    this.radius   = inRadius;
    
    // 速度
    this.waitTime = 200;
    // 
    this.baseRadian = Math.PI/50;
    
    this.baseRadius = 0;
};

RevolveStepByStepEffect.prototype = {
    /**
     * 一覧取得
     */
    move : function(Jq, currentX, currentY, oneStepRadian, waitTime){
        // 
        this.waitTime   = waitTime;
        this.baseRadian = oneStepRadian;
        
        var counter = this.radian/this.baseRadian;
        var length  = this.polarCoordinates.getLengthBetweenCenterAnd(currentX, currentY);
        
        this.baseRadius = (this.radius - length)/counter;
        
        moveNextStep(Jq, currentX, currentY, 0, 0, 0);
        
        return Jq;
    },
    
    /**
     * @param Jq 移動させるJQueryのDOM要素
     * @param currentX 今のX座標（Left）
     * @param currentY 今のY座標（Top）
     * @param radian 今回転した角度
     * @param counter 再帰処理の回数
     * 
     * @return JQueryのDOM要素
     */
    moveNextStep : function(Jq, currentX, currentY, currentRadian, currentRadius, counter){
        var moveRadian = counter * this.baseRadian;
        var moveRadius = counter * this.baseRadius;
        
        var expandPoint = this.expandRadius(currentX, currentY, moveRadius);
        this.revolve(Jq, expandPoint["x"], expandPoint["y"], moveRadian);
        
        var id = setTimeout( (function(iJq, iX, iY, inRadian, inRadius, iCounter){
                                  return function(){
                                             moveNextStep( iJq
                                                         , iX
                                                         , iY
                                                         , inRadian
                                                         , inRadius
                                                         , iCounter);
                                         };
                                  })( Jq
                                    , expandPoint["x"]
                                    , expandPoint["y"]
                                    , currentRadian + moveRadian
                                    , currentRadius + moveRadius
                                    , counter + 1)
                           , this.waitTime
                           );
        
        if (this.radian - (currentRadian + moveRadian) <= 0) {
            clearTimeout(id);
        }
        
        return Jq;
    },
    
    end : function(){
        // 最後の関数にコンマはつかないので、そのための関数。
        //　何かしらの処理をさせたい。
    }
}

var CircleRevolveEffect = function(inElementList, allAngle, inRadius, inX, inY){
    // コンストラクタ
    this.elementList = inElementList;
    this.allAngle    = allAngle;
    this.radius      = inRadius;
    
    this.centerX  = inX;
    this.centerY  = inY;
};

CircleRevolveEffect.prototype = {
    /**
     * 一覧取得
     */
    moveAllInOneGo : function(){
        // ユーザのアイコンを作成する。
        var elementList = this.elementList;
        var radian  = 0;
        var revolve = null;
        for (var i = 0; i < elementList.length; i++) {
            radian  = this.getAngle(i);
            revolve = new RevolutionEffect(this.centerX, this.centerY, radian, this.radius);
            elementList[i].moveOn(revolve);
        }
    },
    
    moveAllStepByStep : function(oneStepRadian, waitTime){
        // 
        this.waitTime   = waitTime;
        this.baseRadian = oneStepRadian;
        
        var counter = this.radian/this.baseRadian;
        var length  = getLengthBetweenCenterAnd(currentX, currentY);
        
        this.baseRadius = (this.radius - length)/counter;
        
        moveNextStep(Jq, currentX, currentY, 0, 0, 0);
        
        return Jq;
    },
    
    getAngle : function(num){
        return this.allAngle / this.elementList.length * num;
    },
    
    end : function(){
        // 最後の関数にコンマはつかないので、そのための関数。
        //　何かしらの処理をさせたい。
    }
}