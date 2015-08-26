/**
 *
 * @author 
 *
 */
class StartPage extends egret.Sprite{
	public constructor() {
        super();
        var g: egret.Graphics = this.graphics;
        g.lineStyle(2, 0xffffff);
        g.beginFill(0x000000);
        g.drawRect(0,0,480,800);
        g.endFill();
        
        var txt: egret.TextField = new egret.TextField();
        txt.x = 100;
        txt.y = 250;
        txt.text = "点击‘开始’开启旅程";
        this.addChild(txt);
        
        var txt2: egret.TextField = new egret.TextField();
        txt2.x = 230;
        txt2.y = 650;
        txt2.text = "开始";
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
}
