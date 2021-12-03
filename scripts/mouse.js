class MouseHandler {

    constructor(viewer) {
        this.viewer = viewer;
        this.canvas = viewer.renderer.domElement;
        this.mouseMod = MouseMod.Interact;
        this.raycaster = new THREE.Raycaster();
        this.pos = new THREE.Vector3();

        this.canvas.addEventListener('click', this.posCalculate.bind(this), false);
    };

    posCalculate(event) {
        console.log(this);
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left * (canvas.width / rect.width);
        var y = event.clientY - rect.top * (canvas.height / rect.height);

        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        var mouse = new THREE.Vector2();
        mouse.x = (x / this.canvas.width) * 2 - 1;
        mouse.y = - (y / this.canvas.height) * 2 + 1;
        console.log(mouse.x, mouse.y);

        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(mouse, this.viewer.camera);

        // 计算Z平面和射线的焦点
        var normal = new THREE.Vector3(0, 0, 1); 
        var groundplane = new THREE.Plane(normal, 0);
        this.raycaster.ray.intersectPlane(groundplane, this.pos);
        console.log(this.pos);

        // // 计算物体和射线的焦点
        // var intersects = raycaster.intersectObjects(this.viewer.scene.children);
        // console.log(intersects.length);
        // for (var i = 0; i < intersects.length; i++) {
        //   intersects[i].object.material.color.set(0xff0000);
        //   console.log(intersects[i]);
        //   selected = intersects[i].object;
        // }
    }

}
const MouseMod = {
    Interact:   1,
    Obstacle:   2,
    Region:     3
}