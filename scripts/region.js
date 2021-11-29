class RegionEditor {

    constructor() {
        this.regionPtr = 1;

        $("#RegionEditor").keypress(function(event){
            console.log(event.key);
            if(event.key=='Enter'){
                console.log("Sending modified message...");
            }
        });
    };

    processMouseEvent(event){
        console.log("Set p" + this.regionPtr);
        $("#p"+this.regionPtr).val(event.clientX);
        this.regionPtr++;
        if(this.regionPtr==5){this.regionPtr=1;}
    }
}