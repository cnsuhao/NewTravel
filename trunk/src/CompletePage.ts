/**
 *
 * @author 
 *
 */
class CompletePage extends egret.Sprite{
    
    private txt: egret.TextField;
    private bmp: egret.Bitmap;
    
	public constructor() {
        super();
        
        var g: egret.Graphics = this.graphics;
        g.beginFill(0x000000);
        g.drawRect(0,0,Global.WIDTH,Global.HEIGHT);
        g.endFill();
        
        this.bmp = new egret.Bitmap();
        this.bmp.texture = RES.getRes("common_bg_png");
        this.addChild(this.bmp);
        
        var tipRoundComplete: egret.Bitmap = new egret.Bitmap();
        tipRoundComplete.texture = RES.getRes("tip_round_complete_png");
        tipRoundComplete.x = (this.width - tipRoundComplete.texture.textureWidth) * 0.5;
        tipRoundComplete.y = 100;
        this.addChild(tipRoundComplete);
        
        var tipWithFriend: egret.Bitmap = new egret.Bitmap();
        tipWithFriend.texture = RES.getRes("tip_with_friend_png");
        tipWithFriend.x = (this.width - tipWithFriend.texture.textureWidth) * 0.5;
        tipWithFriend.y = 300;
        this.addChild(tipWithFriend);
        
        var btnRetrip: egret.Bitmap = new egret.Bitmap();
        btnRetrip.texture = RES.getRes("btn_retrip_png");
        btnRetrip.x = 45;
        btnRetrip.y = 540;
        btnRetrip.touchEnabled = true;
        btnRetrip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRetrip,this);
        this.addChild(btnRetrip);
        
        var btnShare: egret.Bitmap = new egret.Bitmap();
        btnShare.texture = RES.getRes("btn_friend_share_png");
        btnShare.x = 265;
        btnShare.y = 540;
        btnShare.touchEnabled = true;
        btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShare,this);
        this.addChild(btnShare);
	}
	
    private onRetrip(event: egret.TouchEvent): void
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
}
