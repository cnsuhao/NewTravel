/**
 *
 * @author 
 *
 */
declare function bodySize(): number;

class Global {
	public constructor() {
	}
	
    public static WIDTH: number = 480;
    public static HEIGHT: number = 800;
    
    public static cacheData: string;
    
    public static playTimes: number = 0;
    public static playInfo: Array<any> = [];
    
    public static BOX_HEIGHT: number = 200;
    public static BOX_OFFSET: number = 0;
    
    public static viewHeight: number = 0;
}
