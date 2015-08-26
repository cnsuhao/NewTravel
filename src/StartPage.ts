/**
 *
 * @author 
 *
 */
class StartPage extends egret.Sprite{
    
    private bmp: egret.Bitmap;
    
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
        this.bmp.texture = RES.getRes("3_1");
        this.addChild(this.bmp);
        
        var txt2: egret.TextField = new egret.TextField();
        txt2.x = 165;
        txt2.y = 520;
        //txt2.text = "开始";
        txt2.width = 165;
        txt2.height = 68;
        txt2.border = true;
        txt2.borderColor = 0xffffff;
        txt2.touchEnabled = true;
        this.addChild(txt2);
        txt2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
	}
	
    private onClick(evt: egret.TouchEvent): void
    {
        var event: egret.Event = new egret.Event("enterGame");
        this.dispatchEvent(event)
    }
    
    public setBg(bgName: string): void
    {
        this.bmp.texture = RES.getRes(bgName);
    }
}
