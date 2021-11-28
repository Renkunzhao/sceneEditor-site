function __init__() {

    // Connect to ROS.
    var ros = new ROSLIB.Ros({
      url: 'ws://192.168.1.199:9090'
    });

    // Create the main viewer.
    viewer = new ROS3D.Viewer({
      divID: 'markers',
      width: 400,
      height: 300,
      antialias: true,
      cameraPose: {
        x: 0,
        y: 0,
        z: 50
      }
    });
    // viewer.addObject(new ROS3D.Grid(), true);
    canvas = viewer.renderer.domElement;
    canvas.addEventListener('click', PosCatch, false);

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

    mouseHandler = new MouseHandler();
    regionEditor = new RegionEditor();
    $("#interact").click(function(){
          mouseHandler.mousemod = MOUSEMOD.Interact;
    })
    $("#regionSet").click(function(){
          mouseHandler.mousemod = MOUSEMOD.RegionSet;
    })
}