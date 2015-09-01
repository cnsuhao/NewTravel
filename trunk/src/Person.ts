/**
 *
 * @author 
 *
 */
class Person extends egret.Sprite{
    
    private mc: egret.MovieClip;
    
	public constructor() {
        super();
        
        /*var g: egret.Graphics = this.graphics;
        g.lineStyle(2, 0xffffff);
        g.moveTo(0,0);
        g.lineTo(-10,-80);
        g.lineTo(10,-80);
        g.lineTo(0,0);*/
        
        var mcDataFactory:egret.MovieClipDataFactory = 
            new egret.MovieClipDataFactory(RES.getRes("person_json"), RES.getRes("person_png"));
        this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("person_use"));
        this.addChild(this.mc);
        this.scaleX = this.scaleY = 0.5;
	}
	
    public walk(): void
    {
        this.mc.gotoAndPlay(1, -1);
    }
    
    public stand(): void
    {
        this.mc.gotoAndStop(1);
    }
	
}
