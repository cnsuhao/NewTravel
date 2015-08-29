/**
 *
 * @author 
 *
 */
class ResultEvent extends egret.Event{
    
    public score: number = 0;
    public dest: string;
    public static RESULT: string = "fightResult";
    
	public constructor(type:string, score:number, dest:string, bubbles?:boolean, cancelable?:boolean) {
    	super(type, bubbles, cancelable)
        this.score = score;
        this.dest = dest;
	}
	
    public clone(): egret.Event
    {
        return new ResultEvent(this.type,this.score,this.dest,this.bubbles,this.cancelable);
    }
}
