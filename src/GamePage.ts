/**
 *
 * @author 
 *
 */
class GamePage extends egret.Sprite{

    private persion: Person;
    
    private boxesInfo: Array<any> = [];
    private boxes: Array<Box> = [];
    
    private currentBox: Box;
    private nextBox: Box;
    private currentLine: Line;
    private cursor: number = 0;
    
    private lineLength: number = 0;
    
    private FALL_SPEED:number = 15;//人物掉落速度
    private MOVE_SPEED: number = 2;//人物移动速度
    private LINE_GROW_SPEED: number = 3;//线的增长速度
    
    public constructor() {
        super();
        var g: egret.Graphics = this.graphics;
        //g.lineStyle(2, 0xffffff);
        g.beginFill(0x000000, 0);
        g.drawRect(0,0, Global.WIDTH * 4, Global.HEIGHT);
        g.endFill();
        
        /*var bmp: egret.Bitmap = new egret.Bitmap();
        bmp.texture = RES.getRes("3_1_0");
        this.addChild(bmp);*/
        
        //游戏格子配置信息，add:字符，可能会换成图片，distance:格子左上角距离舞台左边界的距离，width，格子的宽度
        this.boxesInfo = [  {add:"A", distance:10, width:80,res:"b_1"}, 
                            {add:"B", distance:150, width:60,res:"b_2"},
                            {add:"C", distance:300, width:50,res:"b_2"},
                            {add:"D", distance:290 + 150, width:90,res:"b_1"},
                            {add:"E", distance:380 + 200, width:80,res:"b_3"},
                            {add:"F", distance:480 + 250, width:40,res:"b_3"},
                            {add:"G", distance:570 + 300, width:90,res:"b_3"},
                            {add:"H", distance:670 + 350, width:20,res:"b_1"},
                            {add:"I", distance:780 + 400, width:80,res:"b_2"}];
        
        this.createBoxes();
        this.currentBox = this.boxes[this.cursor];
        
        this.persion = new Person();
        this.persion.x = this.currentBox.x + this.currentBox.width * 0.5;
        this.persion.y = this.currentBox.y;
        this.addChild(this.persion);
        
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        
        this.touchEnabled = true;
        
        this.init(this.cursor);
	}
	
    private createBoxes(): void
    {
        for(var i: number = 0;i < this.boxesInfo.length - 1;i++)
        {
            var box: Box = new Box();
            box.add = this.boxesInfo[i].add;
            box.boxWidth = this.boxesInfo[i].width;
            box.x = this.boxesInfo[i].distance;
            box.y = Global.HEIGHT - box.height;
            //box.setBg(this.boxesInfo[i].res);
            this.addChild(box);
            this.boxes.push(box);
        }
    }
	
    private status: number = 0;
    
    private onTouchBegin(evt: egret.TouchEvent): void
    {
        if(this.status != 0) return;
        this.status = 1;
    }
    
    private onTouchEnd(evt: egret.TouchEvent): void
    {
        /*this.status = 2; 
        this.currentLine.rotation = 0;
        this.lineLength = 1;
        this.result();*/
        this.status = -1;
        var self: GamePage = this;
        egret.Tween.get(self.currentLine, { loop: false }).to({ "rotation": 0 },300).call(self.onComplete, self);
    }
    
    private onComplete(): void
    {
        this.status = 2; 
        this.lineLength = 1;
        this.result();
        this.persion.walk();
    }
    
    private onEnterFrame(event: egret.Event): void
    {
        if(this.status == 1) {
            this.currentLine.updateShape(this.lineLength += this.LINE_GROW_SPEED);
        }
        else if(this.status == 2) {
            this.persion.x += this.MOVE_SPEED;
            if(this.persion.x >= this.resultPos) {
                //console.log("fffffffffffffffff:" + this.cursor);
                if(this.cursor < this.boxesInfo.length - 3)
                    this.over("RoundComplete");
                else
                    this.over("GameComplete");
            }
        }
        else if(this.status == 3)
        {
            this.persion.y += this.FALL_SPEED;
            if(this.persion.y > 800)
            {
                this.status = 4;
                var evt: ResultEvent = new ResultEvent(ResultEvent.RESULT, this.cursor + 1);
                this.dispatchEvent(evt);
            }
        }
    }
    
    private init(cursor: number): void
    {
        if(cursor >= this.boxesInfo.length - 1)
        {
            this.over("GameComplete");
            return;
        }
        this.currentBox = this.boxes[cursor];
        this.nextBox = this.boxes[cursor+1];
        var main: Main = <Main>this.parent;
        if (main)
            main.txtGate.text = "第" + (cursor+1) + "关";
        
        this.persion.x = this.currentBox.x + this.currentBox.width - 10;
        this.persion.y = this.currentBox.y;
        this.currentLine = new Line();
        this.currentLine.x = this.currentBox.x + this.currentBox.width;
        this.currentLine.y = this.currentBox.y;
        this.currentLine.rotation = -90;
        this.lineLength = this.currentLine.width;
        this.addChild(this.currentLine);
        
        //this.x = -this.currentBox.x;
        
        var self: GamePage = this;
        var tw = egret.Tween.get(self);
        tw.to({"x": -self.currentBox.x}, 300);
        //tw.wait(2000);
        //tw.to({"alpha": 0}, 200);
        //tw.call(change, self);
    }
    
    private resultTag: number = 0;
    private resultPos: number = 0;
    
    public result(): void
    {
        var lineEnd: number = this.currentLine.x + this.currentLine.width;
        var targetEnd: number = this.nextBox.x + this.nextBox.width;
        if(lineEnd < this.nextBox.x || lineEnd > targetEnd) 
        {
            this.resultTag = 1; //失败
            this.resultPos = lineEnd < this.nextBox.x ? lineEnd : targetEnd;
        }
        else
        {
            this.resultTag = 2;//成功
            this.resultPos = this.nextBox.x + this.nextBox.width - 10;
        }
        //console.log("xxxxxxxxxxxxxxxxxx:" + this.resultTag + ":::" + this.resultPos);
    }
    
    private over(type:string):void
    {
        this.persion.stand();
        if(type == "RoundComplete") {
            if(this.resultTag == 1) {
                this.status = 3;
            }
            else {
                this.cursor++;
                this.init(this.cursor);
                this.status = 0;
            }
        }
        else
        {
            //游戏全部通关的处理
            var main: Main = <Main>this.parent;
            if(main)
                main.addCompletePage();
        }
    }
    
    public dispose(): void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
}
