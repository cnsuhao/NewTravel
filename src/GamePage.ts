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
    
    private FALL_SPEED:number = 20;//人物掉落速度
    private MOVE_SPEED: number = 6;//人物移动速度
    private LINE_GROW_SPEED: number = 9;//线的增长速度
    
    private status: number = 0; //0:背景滑动状态；1.开始按下;2:增长,抬起;3:棍子下滑；4:人物移动;0
    
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
        this.boxesInfo = [{ add: "1",distance: 10, width: 80,res: "s_1", txt:"n_1"},
                            { add: "2",distance: 150, width: 60,res: "s_2", txt:"n_2" },
                            { add: "3",distance: 100, width: 70,res: "s_3", txt:"n_3" },
                            { add: "4",distance: 120, width: 55,res: "s_4", txt:"n_4" },
                            { add: "5",distance: 200, width: 90,res: "s_5", txt:"n_5" },
                            { add: "6",distance: 220, width: 60,res: "s_6" , txt:"n_6"},
                            { add: "7",distance: 170, width: 50,res: "s_7", txt:"n_7" },
                            { add: "8",distance: 170, width: 75,res: "s_8", txt:"n_8" },
                            { add: "9",distance: 150, width: 45,res: "s_9", txt:"n_9" },
                            { add: "10",distance: 130, width: 60,res: "s_10", txt:"n_10" },
                            
                            { add: "11",distance: 150, width: 85,res: "s_11", txt:"n_11" },
                            { add: "12",distance: 100, width: 40,res: "s_12", txt:"n_12" },
                            { add: "13",distance: 200, width: 55,res: "s_13", txt:"n_13" },
                            { add: "14",distance: 180, width: 65,res: "s_14", txt:"n_14" },
                            { add: "15",distance: 180, width: 35,res: "s_15", txt:"n_15" },
                            { add: "16",distance: 170, width: 50,res: "s_16", txt:"n_16" },
                            { add: "17",distance: 270, width: 20,res: "s_17", txt:"n_17" },
                            { add: "18",distance: 180, width: 60,res: "s_18", txt:"n_18" },
                            { add: "19",distance: 100, width: 20,res: "s_19", txt:"n_19" },
                            { add: "20",distance: 150, width: 30,res: "s_20", txt:"n_20" }];
        
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
            //box.add = this.boxesInfo[i].add;
            box.boxWidth = this.boxesInfo[i].width;
            if(i == 0)
                box.x = this.boxesInfo[i].distance;
            else
                box.x = this.boxes[i - 1].x + this.boxes[i - 1].width + this.boxesInfo[i].distance;
            box.y = Global.HEIGHT - box.height;
            box.setBg(this.boxesInfo[i].res);
            box.setBmpTxt(this.boxesInfo[i].txt);
            this.addChild(box);
            this.boxes.push(box);
        }
    }
	
    private onTouchBegin(evt: egret.TouchEvent): void
    {
        if(this.status == 1) 
        {
            this.status = 2;
        }
    }
    
    private onTouchEnd(evt: egret.TouchEvent): void
    {
        if(this.status == 2) 
        {
            this.status = 3;
            var self: GamePage = this;
            egret.Tween.get(self.currentLine,{ loop: false }).to({ "rotation": 0 },300).call(self.onComplete,self);
        }
    }
    
    private onComplete(): void
    {
        this.status = 4; 
        this.lineLength = 1;
        this.result();
        this.persion.walk();
    }
    
    private onEnterFrame(event: egret.Event): void
    {
        if(this.status == 2) {
            this.currentLine.updateShape(this.lineLength += this.LINE_GROW_SPEED);
        }
        else if(this.status == 4) {
            this.persion.x += this.MOVE_SPEED;
            if(this.persion.x >= this.resultPos) {
                //console.log("fffffffffffffffff:" + this.cursor);
                if(this.cursor < this.boxesInfo.length - 3)
                    this.over("RoundComplete");
                else
                    this.over("GameComplete");
            }
        }
        else if(this.status == 5)
        {
            this.persion.y += this.FALL_SPEED;
            if(this.persion.y > 800)
            {
                //this.status = 0;
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
        
        this.persion.x = this.currentBox.x + this.currentBox.width - 15;
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
        tw.to({"x": -self.currentBox.x}, 300).call(self.onComplete2, self);
    }
    
    private onComplete2(): void 
    {
        this.status = 1;
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
            this.resultPos = this.nextBox.x + this.nextBox.width - 15;
        }
        //console.log("xxxxxxxxxxxxxxxxxx:" + this.resultTag + ":::" + this.resultPos);
    }
    
    private over(type:string):void
    {
        this.persion.stand();
        if(type == "RoundComplete") {
            if(this.resultTag == 1) {
                this.status = 5;
            }
            else {
                this.cursor++;
                this.status = 0;
                this.init(this.cursor);
            }
        }
        else
        {
            //游戏全部通关的处理
            this.status = 0;
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
