/**
 *
 * @author 
 *
 */
class Line extends egret.Shape{
	public constructor() {
        super();
        var g: egret.Graphics = this.graphics;
        g.lineStyle(2, 0xffffff);
        g.moveTo(0,0);
        g.lineTo(1,0);
	}
	
    public updateShape(ln:number): void
    {
        var g: egret.Graphics = this.graphics;
        g.clear();
        g.lineStyle(2, 0xffffff);
        g.moveTo(0,0);
        g.lineTo(ln,0);
    }
}
