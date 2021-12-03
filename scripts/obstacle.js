class ObstacleEditor {
    constructor(ros) {
        this.obstacleMod = ObstacleMod.Select;
        this.obstaclePub = new ROSLIB.Topic({
            ros: ros,
            name: '/obstacle',
            messageType: 'visualization_msgs/MarkerArray'
        });
        this.obstacles = new ROSLIB.Message({
            markers: []
        });
        var obstacle = JSON.parse(JSON.stringify(MarkerMsg));
        for (var i = 0; i < 10; i++) {
            obstacle.id = i;
            obstacle.pose.position.x = i;
            obstacle.pose.position.y = i;
            this.obstacles.markers.push(JSON.parse(JSON.stringify(obstacle)));
        }
        this.obstaclePub.publish(this.obstacles);
    };

    processMouseEvent(event, mouseHandler) {
        console.log("This is ObstacleEditor.processMouseEvent function.")
        switch (this.obstacleMod) {
            case ObstacleMod.Add:
                this.obstacleAdd(event, mouseHandler);
                break;
            case ObstacleMod.Select:
                this.obstacleSelect(event, mouseHandler);
                break;
            default:
                console.log("ObstacleEditor.obstacleMod error!!!")
                break;
        }
    }

    obstacleAdd(event, mouseHandler){
        console.log("This is ObstacleEditor.obstacleAdd function.")
        var obstacle = JSON.parse(JSON.stringify(MarkerMsg));
        obstacle.id = this.obstacles.markers.length;
        obstacle.pose.position.x = mouseHandler.pos.x;
        obstacle.pose.position.y = mouseHandler.pos.y;
        this.obstacles.markers.push(JSON.parse(JSON.stringify(obstacle)));
        this.obstaclePub.publish(this.obstacles);
    }

    obstacleSelect(event, mouseHandler){
        console.log("This is ObstacleEditor.obstacleSelect function.")
    }
}

const ObstacleMod = {
    Add: 1,
    Select: 2,
}

const MarkerMsg = {
    header: {
        seq: 0,
        stamp: 0,
        frame_id: "/my_frame"
    },
    ns: "",
    id: 0,
    type: ROS3D.MARKER_CUBE,
    action: 0,  //ADD
    pose: {
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        orientation: {
            x: 0,
            y: 0,
            z: 0,
            w: 1
        }
    },
    scale: {
        x: 1,
        y: 1,
        z: 1
    },
    color: {
        r: 0,
        g: 1,
        b: 0,
        a: 1
    },
    lifetime: 0,
    frame_locked: false,
    points: [],
    colors: [],
    text: "",
    mesh_resource: "",
    mesh_use_embedded_materials: false
}
