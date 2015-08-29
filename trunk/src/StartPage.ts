/**
 *
 * @author 
 *
 */
class StartPage extends egret.Sprite{
    
    private bmp: egret.Bitmap;
    
    private tipOneStep: egret.Bitmap;
    private tipGuide: egret.Bitmap;
    private btnStart: egret.Bitmap;
    
	public constructor() {
        super();
        var g: egret.Graphics = this.graphics;
        g.lineStyle(2, 0xffffff);
        g.beginFill(0x000000);
        g.drawRect(0,0,480,800);
        g.endFill();
        
        /*var txt: egret.TextField = new egret.TextField();
        txt.x = 100;
        txt.y = 250;
        txt.text = "点击‘开始’开启旅程";
        this.addChild(txt);*/
        this.bmp = new egret.Bitmap();
        this.bmp.texture = RES.getRes("common_bg_png");
        this.addChild(this.bmp);
        
        this.tipOneStep = new egret.Bitmap();
        this.tipOneStep.texture = RES.getRes("tip_one_step_png");
        this.tipOneStep.x = (Global.WIDTH - this.tipOneStep.width) * 0.5;
        this.tipOneStep.y = 150;
        this.addChild(this.tipOneStep);
        
        this.tipGuide = new egret.Bitmap();
        this.tipGuide.texture = RES.getRes("tip_guide_png");
        this.tipGuide.x = (Global.WIDTH - this.tipGuide.width) * 0.5;
        this.tipGuide.y = 300;
        this.addChild(this.tipGuide);
        
        this.btnStart = new egret.Bitmap();
        this.btnStart.texture = RES.getRes("btn_start_png");
        this.btnStart.x = 165;
        this.btnStart.y = 520;
        this.btnStart.touchEnabled = true;
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        this.addChild(this.btnStart);
	}
	
    private onClick(evt: egret.TouchEvent): void
    {
        var main: Main = <Main>this.parent;
        main.gamePage.visible = true;
        main.gamePage.reset();
        main.gamePage.init(0);
        main.txtGate.visible = true;
    }
    
    public setBg(bgName: string): void
    {
        this.bmp.texture = RES.getRes(bgName);
        
        this.tipOneStep.visible = false;
        this.tipGuide.visible = false;
        this.btnStart.visible = false;
    }
}
