/**
 *
 * @author 
 *
 */
class ResultEvent extends egret.Event{
    
    public score: number = 0;
    public static RESULT: string = "fightResult";
    
	public constructor(type:string, score:number, bubbles?:boolean, cancelable?:boolean) {
    	super(type, bubbles, cancelable)
        this.score = score;
	}
	
    public clone(): egret.Event
    {
        return new ResultEvent(this.type,this.score,this.bubbles,this.cancelable);
    }
}
