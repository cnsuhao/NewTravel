/**
 *
 * @author 
 *
 */
class Box extends egret.Sprite{
    
    private txt: egret.TextField;
    
	public constructor() {
        super();
        
        var g: egret.Graphics = this.graphics;
        g.lineStyle(2, 0xffffff);
        g.drawRect(0,0, 80, 120);
        
        this.txt = new egret.TextField();
        this.txt.width = 80;
        this.txt.height = 30;
        this.txt.size = 15;
        this.addChild(this.txt);
	}
	
    public set add(value: string)
    {
        this.txt.text = value;
    }
}
