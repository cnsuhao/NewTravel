/**
 *
 * @author 
 *
 */
class Box extends egret.Sprite{
    
    private txt: egret.TextField;
    private bmp: egret.Bitmap;
    
    private bmpTxt: egret.Bitmap;
    
	public constructor() {
        super();
        
        var g: egret.Graphics = this.graphics;
        g.lineStyle(2, 0xffffff);
        g.drawRect(0,0, 120, 200);
        
        this.txt = new egret.TextField();
        this.txt.width = 80;
        this.txt.height = 30;
        this.txt.size = 15;
        this.addChild(this.txt);
        
        this.bmp = new egret.Bitmap();
        //this.bmp.texture = RES.getRes("3_5");
        this.addChild(this.bmp);
        
        this.bmpTxt = new egret.Bitmap();
        //this.bmp.texture = RES.getRes("3_5");
        this.addChild(this.bmpTxt);
	}
	
    public set add(value: string)
    {
        this.txt.text = value;
    }
    
    public set boxWidth(w: number)
    {
        var g: egret.Graphics = this.graphics;
        g.clear();
        g.lineStyle(2, 0xffffff);
        g.beginFill(0x00ff00);
        g.drawRect(0,0, w, 200);
        g.endFill();
        this.txt.width = w;
    }
    
    public setBg(resName: string): void
    {
        this.bmp.texture = RES.getRes(resName);
        this.bmp.scaleX = this.width / this.bmp.texture.textureWidth;
        this.bmp.scaleY = this.height / this.bmp.texture.textureHeight;
    }
    
    public setBmpTxt(resName: string): void
    {
        this.bmpTxt.texture = RES.getRes(resName);
        this.bmpTxt.x = (this.width - this.bmpTxt.width) * 0.5;
        this.bmpTxt.y = (this.height - this.bmpTxt.height) * 0.5;
    }
}
