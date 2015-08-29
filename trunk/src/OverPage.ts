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
        this.bmp.texture = RES.getRes("common_bg_png");
        this.addChild(this.bmp);
        
        var tipLose: egret.Bitmap = new egret.Bitmap();
        tipLose.texture = RES.getRes("tip_lose_png");
        tipLose.x = 100;
        tipLose.y = 240;
        this.addChild(tipLose);
        
        var tipSuccessTo: egret.Bitmap = new egret.Bitmap();
        tipSuccessTo.texture = RES.getRes("tip_success_to_png");
        tipSuccessTo.x = 135;
        tipSuccessTo.y = 370;
        this.addChild(tipSuccessTo);
        
        this.scoreTxt = new egret.TextField();
        this.scoreTxt.width = 150;
        this.scoreTxt.height = 40;
        this.scoreTxt.size = 30;
        this.scoreTxt.x = 285;
        this.scoreTxt.y = 370;
        this.addChild(this.scoreTxt);
        
        var btnRestart: egret.Bitmap = new egret.Bitmap();
        btnRestart.texture = RES.getRes("btn_restart_png");
        btnRestart.x = 75;
        btnRestart.y = 540;
        this.addChild(btnRestart);
        btnRestart.touchEnabled = true;
        btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgain,this);
        
        var btnFriendShare: egret.Bitmap = new egret.Bitmap();
        btnFriendShare.texture = RES.getRes("btn_friend_share_png");
        btnFriendShare.x = 270;
        btnFriendShare.y = 540;
        this.addChild(btnFriendShare);
        btnFriendShare.touchEnabled = true;
        btnFriendShare.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShare,this);
	}
	
    public setDest(dest: string): void
    {
        this.scoreTxt.text = "" + dest;
    }
	
    private onAgain(evt: egret.TouchEvent): void
    {
        this.visible = false;
        var main: Main = <Main>this.parent;
        main.gamePage.visible = true;
        main.gamePage.reset();
        main.gamePage.init(0);
    }
	
    private onShare(event: egret.TouchEvent): void
    {
        var main: Main = <Main>this.parent;
        main.sharePage.visible = true;
    }
    
    public dispose(): void
    {
        
    }
}
