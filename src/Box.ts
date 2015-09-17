/**
 *
 * @author 
 *
 */
class Box extends egret.Sprite{
    
    //private txt: egret.TextField;
    private bmp: egret.Bitmap;
    private shape: egret.Shape;
    private bmpTxt: egret.Bitmap;
    
	public constructor() {
        super();
        
        var g: egret.Graphics = this.graphics;
        g.lineStyle(3, 0xffffff);
        g.drawRect(0,0, 30, 200);
        
        /*this.txt = new egret.TextField();
        this.txt.width = 80;
        this.txt.height = 30;
        this.txt.size = 15;
        this.addChild(this.txt);*/
        
        this.bmp = new egret.Bitmap();
        //this.bmp.texture = RES.getRes("3_5");
        this.addChild(this.bmp);
        
        this.shape = new egret.Shape();
        this.addChild(this.shape);
        
        this.bmpTxt = new egret.Bitmap();
        this.addChild(this.bmpTxt);
	}
	
    public set boxWidth(w: number)
    {
        var g: egret.Graphics = this.graphics;
        g.clear();
        g.lineStyle(3, 0xffffff);
        g.beginFill(0x000000, 0.3);
        g.drawRect(0,0, w, 200);
        g.endFill();
    }
    
    /*public setBg(resName: string): void
    {
        this.bmp.texture = RES.getRes(resName);
        this.bmp.scaleX = this.width / this.bmp.texture.textureWidth;
        this.bmp.scaleY = this.height / this.bmp.texture.textureHeight;
        
        var g:egret.Graphics = this.shape.graphics;
        g.clear();
        g.beginFill(0x000000,0.5);
        g.drawRect(0,0,this.width,200);
        g.endFill();
    }*/
    
    public setBmpTxt(resName: string): void
    {
        this.bmpTxt.texture = RES.getRes(resName);
        this.bmpTxt.x = (this.width - this.bmpTxt.width) * 0.5;
        this.bmpTxt.y = (this.height - this.bmpTxt.height) * 0.5;
    }
}
