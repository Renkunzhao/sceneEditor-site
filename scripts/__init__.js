function __init__() {

  // Connect to ROS.
  var ros = new ROSLIB.Ros({
    url: 'ws://192.168.1.199:9090'
  });

  // Create the main viewer.
  viewer = new ROS3D.Viewer({
    divID: 'markers',
    width: 800,
    height: 600,
    antialias: true,
    cameraPose: {
      x: 0,
      y: 0,
      z: 50
    }
  });
  viewer.addObject(new ROS3D.Grid(), true);
  viewer.cameraControls.rotateLeft(Math.PI/2)
  canvas = viewer.renderer.domElement;

  // Setup a client to listen to TFs.
  var tfClient = new ROSLIB.TFClient({
    ros: ros,
    angularThres: 0.01,
    transThres: 0.01,
    rate: 10.0,
    fixedFrame: '/my_frame'
  });

  // Setup the marker client.
  markerClient = new ROS3D.MarkerClient({
    ros: ros,
    tfClient: tfClient,
    topic: '/visualization_marker',
    rootObject: viewer.scene
  });

  obstacleClient = new ROS3D.MarkerArrayClient({
    ros: ros,
    tfClient: tfClient,
    topic: '/obstacle',
    rootObject: viewer.scene
  });

  mouseHandler = new MouseHandler(viewer);
  obstacleEditor = new ObstacleEditor(ros);
  regionEditor = new RegionEditor();

  canvas.addEventListener('click', processMouseEvent, false);

  function processMouseEvent(event) {
    console.log(event);
    switch (mouseHandler.mouseMod) {
      case MouseMod.Interact:
        console.log("Interact mod...");
        break;
      case MouseMod.Obstacle:
        console.log("Obstacle mod...");
        if (obstacleEditor.processMouseEvent(event, mouseHandler)) {
          mouseHandler.mouseMod = MouseMod.Interact;
        }
        break;
      case MouseMod.Region:
        console.log("Region mod...");
        regionEditor.processMouseEvent(event);
        break;
    }
  }

  window.addEventListener("keydown", (event) => {
    console.log("Keydown.");
    if (event.isComposing || event.code === 229) {
      return;
    }
    if(event.key == "Control"){
      mouseHandler.mouseMod = MouseMod.Obstacle;
      obstacleEditor.obstacleMod = ObstacleMod.Select;
    }
  });

  window.addEventListener("keyup", (event) => {
    console.log("Keyup.");
    if (event.isComposing || event.code === 229) {
      return;
    }
    if(event.key == "Control"){
      mouseHandler.mouseMod = MouseMod.Interact;
    }
  });

  $("#interact").click(function () {
    mouseHandler.mouseMod = MouseMod.Interact;
  })
  $("#regionSet").click(function () {
    mouseHandler.mouseMod = MouseMod.Region;
  })
  $("#obstacle_add").click(function () {
    mouseHandler.mouseMod = MouseMod.Obstacle;
    obstacleEditor.obstacleMod = ObstacleMod.Add;
  })
  $("#obstacle_select").click(function () {
    mouseHandler.mouseMod = MouseMod.Obstacle;
    obstacleEditor.obstacleMod = ObstacleMod.Select;
  })


}