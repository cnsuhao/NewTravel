/**
 *
 * @author 
 *
 */
class OverPage extends egret.Sprite{
    
    private scoreTxt: egret.TextField;
    private bmp: egret.Bitmap;
    
	public constructor() {
        super();
        
        var g: egret.Graphics = this.graphics;
        g.lineStyle(2, 0xffffff);
        g.beginFill(0x000000);
        g.drawRect(0,0,Global.WIDTH, Global.HEIGHT);
        g.endFill();
        
        this.bmp = new egret.Bitmap();
        this.bmp.texture = RES.getRes("3_5");
        this.addChild(this.bmp);
        
        /*var overTxt: egret.TextField = new egret.TextField();
        overTxt.text = "游戏结束";
        overTxt.size = 25;
        overTxt.textAlign = egret.HorizontalAlign.CENTER;
        overTxt.x = (Global.WIDTH - overTxt.width) * 0.5;
        overTxt.y = Global.HEIGHT * 0.3;
        this.addChild(overTxt);*/
        
        this.scoreTxt = new egret.TextField();
        this.scoreTxt.width = 100;
        this.scoreTxt.height = 40;
        this.scoreTxt.size = 25;
        this.scoreTxt.x = 285;
        this.scoreTxt.y = 375;
        this.addChild(this.scoreTxt);
        
        var againTxt:egret.TextField = new egret.TextField();
        againTxt.touchEnabled = true;
        //againTxt.text = "again";
        againTxt.border = true;
        againTxt.width = 140;
        againTxt.height = 50;
        againTxt.x = 75;
        againTxt.y = 540;
        this.addChild(againTxt);
        againTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgain,this);
        
        var shareTxt:egret.TextField = new egret.TextField();
        shareTxt.touchEnabled = true;
        //shareTxt.text = "share";
        shareTxt.border = true;
        shareTxt.width = 140;
        shareTxt.height = 50;
        shareTxt.x = 270;
        shareTxt.y = 540;
        this.addChild(shareTxt);
	}
	
    public setScore(tollgate: number): void
    {
        this.scoreTxt.text = "" + tollgate;
    }
	
    private onAgain(evt: egret.Event): void
    {
        var againTxt: egret.TextField = evt.currentTarget;
        againTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgain,this);
        var e: egret.Event = new egret.Event("again");
        this.dispatchEvent(e);
    }
	
    public dispose(): void
    {
        
    }
}
