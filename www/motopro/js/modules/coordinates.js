/**
 * @author yamanaka
 */

var PolarCoordinates = function(inX, inY){
    // 回転の中心
    this.centerX  = inX;
    this.centerY  = inY;
};

PolarCoordinates.prototype = {
    /**
     * 一覧取得
     */
    revolve : function(preX, preY, radian){
        // JqはJQueryで取得したDOMを前提にしている。
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        
        var cX = this.centerX;
        var cY = this.centerY;
        
        var revolvedX = (preX - cX) * cos - (preY - xY) * sin + cX;
        var revolvedY = (preY - xY) * cos + (preX - cX) * sin + cY;
        
        return { x : revolvedX
               , y : revolvedY};
    },
    
    /**
     * 回転の中心から現在の点までの距離を、回転の半径と同じ長さに伸ばす。
     */
    expand : function(currentX, currentY, radius){
        // ユーザのアイコンを作成する。
        var deltaX = (currentX - this.centerX);
        var deltaY = (currentY - this.centerY);
        
        var currentLength = 0;
        currentLength = this.getLengthBetweenCenterAnd(currentX, currentY);
        
        return { x : radius/currentLength * deltaX + this.centerX
               , y : radius/currentLength * deltaY + this.centerY};
    },
    
    getLengthBetweenCenterAnd : function(currentX, currentY){
        // ユーザのアイコンを作成する。
        var deltaX = (currentX - this.centerX);
        var deltaY = (currentY - this.centerY);
        
        var currentLength = 0;
        currentLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        return currentLength;
    },
    
    end : function(){
        // 最後の関数にコンマはつかないので、そのための関数。
        //　何かしらの処理をさせたい。
    }
}
