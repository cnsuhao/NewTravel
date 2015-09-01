
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    //过关
    public txtGate:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    public startPage: StartPage;
    public gamePage: GamePage;
    public overPage: OverPage;
    public completPage: CompletePage;
    public sharePage: SharePage;
    
    private createGameScene():void {
        
        this.txtGate = new egret.TextField();
        //this.txtGate.type = egret.TextFieldType.INPUT;
        //this.txtGate.border = true;
        //this.txtGate.borderColor = 0xfff000;
        this.txtGate.x = Global.WIDTH - 90;
        this.txtGate.y = 50;
        this.txtGate.size = 14;
        this.txtGate.width = 100;
        this.txtGate.height = 30;
        this.txtGate.text = "第1关";
        
        this.txtGate.visible = false;
        
        this.startPage = new StartPage();
        this.addChild(this.startPage);
        
        this.gamePage = new GamePage();
        this.addChild(this.gamePage);
        
        this.addChild(this.txtGate);
        
        this.overPage = new OverPage();
        this.addChild(this.overPage);
        
        this.completPage = new CompletePage();
        this.addChild(this.completPage);
        
        this.sharePage = new SharePage();
        this.addChild(this.sharePage);
        
        this.gamePage.visible = false;
        this.overPage.visible = false;
        this.completPage.visible = false;
        this.sharePage.visible = false;
        
        var cacheData:string = egret.localStorage.getItem("cache");
        if(!cacheData)
        {
            cacheData = "";
            egret.localStorage.setItem("cache", cacheData);
        }
        Global.cacheData = cacheData;
    }

    /*private enterGame(evt: egret.Event): void
    {
        this.gamePage = new GamePage();
        this.gamePage.addEventListener(ResultEvent.RESULT, this.onFail, this);
        this.addChild(this.gamePage);
        this.setChildIndex(this.txtGate,this.numChildren - 1);
        this.txtGate.visible = true;
    }
    
    private onFail(evt: ResultEvent)
    {
        this.gamePage.removeEventListener(ResultEvent.RESULT, this.onFail, this);
        this.overPage = new OverPage();
        this.overPage.setDest(evt.dest);
        this.gamePage.dispose();
        this.removeChild(this.gamePage);
        this.addChild(this.overPage);
        this.overPage.addEventListener("again", this.onAgain, this);
    }
    
    private onAgain(evt: egret.Event): void
    {
        this.overPage.removeEventListener("again", this.onAgain, this);
        this.removeChild(this.overPage);
        this.txtGate.text = "第1关";
        this.gamePage = new GamePage();
        this.gamePage.addEventListener(ResultEvent.RESULT, this.onFail, this);
        this.addChild(this.gamePage);
        this.setChildIndex(this.txtGate,this.numChildren - 1);
        this.txtGate.visible = true;
    }
    
    public addCompletePage(): void
    {
        if(!this.completPage)
        {
            this.completPage = new CompletePage();
            this.addChild(this.completPage);
        }
    }*/

}


