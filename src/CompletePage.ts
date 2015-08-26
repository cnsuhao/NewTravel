/**
 *
 * @author 
 *
 */
class CompletePage extends egret.Sprite{
    
    private txt: egret.TextField;
    
	public constructor() {
        super();
        
        var g: egret.Graphics = this.graphics;
        g.beginFill(0x000000);
        g.drawRect(0,0,Global.WIDTH,Global.HEIGHT);
        g.endFill();
        
        this.txt = new egret.TextField();
        this.txt.text = "恭喜你游玩了世界！";
        this.addChild(this.txt);
	}
}
