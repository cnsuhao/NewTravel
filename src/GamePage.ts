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
   
    private FALL_SPEED:number = 20;//人物掉落速度
    private MOVE_SPEED: number = 6;//人物移动速度
    private LINE_GROW_SPEED: number = 9;//线的增长速度
    
    private status: number = 0; //0:背景滑动状态；1.开始按下;2:增长,抬起;3:棍子下滑；4:人物移动;0
    private cursor: number = 0;
    private lineLength: number = 0;
    
    public constructor() {
        super();
        var g: egret.Graphics = this.graphics;
        //g.lineStyle(2, 0xffffff);
        g.beginFill(0x000000, 0);
        g.drawRect(0,0, Global.WIDTH * 8.76, Global.HEIGHT);
        g.endFill();
        
        /*var bmp: egret.Bitmap = new egret.Bitmap();
        bmp.texture = RES.getRes("big_bg");
        bmp.height = Global.HEIGHT;
        bmp.width = Global.HEIGHT / bmp.texture.textureHeight * bmp.texture.textureWidth;
        this.addChild(bmp);*/
        
        //游戏格子配置信息，add:字符，可能会换成图片，distance:格子左上角距离舞台左边界的距离，width，格子的宽度
        this.boxesInfo = [  { add: "上海",distance: 10, width: 80,res: "s_1", txt:"n_1", bg:"d1"},
                            { add: "东京",distance: 150, width: 60,res: "s_2", txt:"n_2", bg:"d2" },
                            { add: "首尔",distance: 100, width: 70,res: "s_3", txt:"n_3" , bg:"d3"},
                            { add: "巴黎",distance: 120, width: 55,res: "s_4", txt:"n_4" , bg:"d4"},
                            { add: "威尼斯",distance: 200, width: 90,res: "s_5", txt:"n_5", bg:"d5" },
                            { add: "斐济",distance: 220, width: 60,res: "s_6" , txt:"n_6", bg:"d6"},
                            { add: "新加坡",distance: 170, width: 50,res: "s_7", txt:"n_7", bg:"d7" },
                            { add: "巴厘岛",distance: 170, width: 75,res: "s_8", txt:"n_8" , bg:"d8"},
                            { add: "迪拜",distance: 150, width: 45,res: "s_9", txt:"n_9" , bg:"d9"},
                            { add: "加勒比",distance: 130, width: 60,res: "s_10", txt:"n_10" , bg:"d10"},
                            
                            { add: "希腊",distance: 150, width: 85,res: "s_11", txt:"n_11" , bg:"d11"},
                            { add: "夏威夷",distance: 100, width: 40,res: "s_12", txt:"n_12" , bg:"d12"},
                            { add: "慕尼黑",distance: 200, width: 55,res: "s_13", txt:"n_13" , bg:"d13"},
                            { add: "莫斯科",distance: 180, width: 65,res: "s_14", txt:"n_14" , bg:"d14"},
                            { add: "维也纳",distance: 180, width: 35,res: "s_15", txt:"n_15" , bg:"d15"},
                            { add: "新德里",distance: 170, width: 50,res: "s_16", txt:"n_16" , bg:"d16"},
                            { add: "曼谷",distance: 270, width: 20,res: "s_17", txt:"n_17" , bg:"d17"},
                            { add: "马尼拉",distance: 180, width: 60,res: "s_18", txt:"n_18" , bg:"d18"},
                            { add: "悉尼",distance: 100, width: 20,res: "s_19", txt:"n_19" , bg:"d19"},
                            { add: "纽约",distance: 150, width: 30,res: "s_20", txt:"n_20" , bg:"d20"}];
        
        this.createBoxes();
        this.currentBox = this.boxes[this.cursor];
        
        this.persion = new Person();
        this.persion.stand();
        this.persion.x = this.currentBox.x + this.currentBox.width * 0.5;
        this.persion.y = this.currentBox.y;
        this.addChild(this.persion);
        
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        
        this.touchEnabled = true;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
	}
	
    private onAddedToStage(event: egret.Event): void
    {
        //this.init(this.cursor);
    }
	
    private createBoxes(): void
    {
        for(var i: number = 0;i < this.boxesInfo.length - 1;i++)
        {
            var box: Box = new Box();
            //box.add = this.boxesInfo[i].add;
            box.setBoxSize(this.boxesInfo[i].width, Global.BOX_HEIGHT);
            if(i == 0)
                box.x = this.boxesInfo[i].distance;
            else
                box.x = this.boxes[i - 1].x + this.boxes[i - 1].width + this.boxesInfo[i].distance;
            box.y = Global.HEIGHT - box.height - Global.BOX_OFFSET;
            //box.setBgPos(this.boxesInfo[i].res);
            box.setBmpTxt(this.boxesInfo[i].txt);
            this.addChild(box);
            this.boxes.push(box);
        }
    }
    
    public reset(): void
    {
        this.lineLength = 0;
        this.cursor = 0;
        this.status = 0;
        this.resultTag = 0;
        this.resultPos = 0;
        for(var i: number = this.numChildren - 1;i >= 0;i--)
        {
            var c: egret.DisplayObject = this.getChildAt(i);
            if(c instanceof Line)
            {
                this.removeChild(c);
            }
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
                this.visible = false;
                var main: Main = <Main>this.parent;
                main.overPage.visible = true;
                main.overPage.setDest(this.boxesInfo[this.cursor].add);
                //main.overPage.setCurrentBg(this.boxesInfo[this.cursor].bg+"_png");
            }
        }
    }
    
    public init(cursor: number): void
    {
        if(cursor >= this.boxesInfo.length - 1)
        {
            this.over("GameComplete");
            return;
        }
        this.currentBox = this.boxes[cursor];
        this.nextBox = this.boxes[cursor+1];
        var main: Main = <Main>this.parent;
        if(main) {
            main.txtGate.text = (cursor + 1) + "/20";
            main.txtGate.visible = true;
            main.startPage.setBgPos(this.boxesInfo[cursor].bg + "_png", cursor);
        }
        
        this.persion.x = this.currentBox.x + this.currentBox.width - 30;
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
            this.resultPos = this.nextBox.x + this.nextBox.width - 30;
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
            {
                this.visible = false;
                main.completPage.visible = true;
            }
        }
    }
    
    public dispose(): void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
    
    public show(): void
    {
        this.visible = true;
    }
}
