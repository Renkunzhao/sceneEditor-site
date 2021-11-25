class MouseHandler {

    constructor() {
        this.canvas = viewer.renderer.domElement;
        this.mousemod = MOUSEMOD.Interact;

        this.canvas.addEventListener('click', this.processMouseEvent.bind(this));
    };

    processMouseEvent(event){
        console.log(this);
        switch(this.mousemod){
            case MOUSEMOD.Interact:
                console.log("Interact mod...");
                break;
            case MOUSEMOD.ObstacleAdd:
                console.log("ObstacleAdd mod...");
                break;   
            case MOUSEMOD.RegionSet:
                console.log("RegionSet mod...");
                regionEditor.processMouseEvent(event);      //这里使用了全局变量regionEditor，在类的方法中使用全局变量并不合理
                break;
        }
    }
}
const MOUSEMOD = {
    "Interact":1,
    "ObstacleAdd":2,
    "RegionSet":3
}