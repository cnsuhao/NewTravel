/**
 *
 * @author 
 *
 */
class Person extends egret.Sprite{
	public constructor() {
        super();
        
        var g: egret.Graphics = this.graphics;
        g.lineStyle(2, 0xffffff);
        g.moveTo(0,0);
        g.lineTo(-10,-80);
        g.lineTo(10,-80);
        g.lineTo(0,0);
	}
	
}
