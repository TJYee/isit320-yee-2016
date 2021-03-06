/* globals define: true, THREE:true */

define(['floor', 'PointerLockControls', 'PointerLockSetup', 'Score'], function(Floor, PointerLockControls, PointerLockSetup, Score) {
    'use strict';
    var scene = null;
    var camera = null;
    var renderer = null;
    var THREE = null;
    var controls = null;
    var size = 20;
    var cubes = [];
    var raycaster = null;

    var score = Score;
    var NPCs = [];

    function Control(threeInit) {
        THREE = threeInit;

        init();
        animate();
    }

    function init() {
        var screenWidth = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);

        controls = new PointerLockControls(camera, THREE);

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 0, 750);

        /*
         addShapes(scene, camera, false);
         addSphere(scene, camera, false, 5, -100);
         */
        loadGrid(scene, camera, false);
        loadNPCs(scene, camera, false);

        doPointerLock();

        addLights();

        var floor = new Floor(THREE);
        floor.drawFloor(scene);

        raycaster = new THREE.Raycaster(new THREE.Vector3(),
            new THREE.Vector3(0, -1, 0), 0, 10);

        renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);
    }

    function animate() {
        requestAnimationFrame(animate);

        var xAxis = new THREE.Vector3(1, 0, 0);

        controls.isOnObject(false);

        var controlObject = controls.getObject();
        var position = controlObject.position;

        //drawText(controlObject, position);

        collisionDetection(controls, cubes);
        if (score.npcData) {
            npcDetection(controls, NPCs);
        }

        // Move the camera
        controls.update();

        $('#cameraX').html(Math.round(position.x / size));
        $('#cameraZ').html(Math.round(position.z / size));

        renderer.render(scene, camera);
    }

    function doPointerLock() {
        controls = new PointerLockControls(camera, THREE);
        var yawObject = controls.getObject();
        scene.add(yawObject);

        yawObject.position.x = size;
        yawObject.position.z = size;

        var ps = new PointerLockSetup(controls);
    }

    var collisionDetection = function(controls, cubes) {

        function bounceBack(position, ray) {
            position.x -= ray.bounceDistance.x;
            position.y -= ray.bounceDistance.y;
            position.z -= ray.bounceDistance.z;
        }

        var rays = [
            //   Time    Degrees      words
            new THREE.Vector3(0, 0, 1), // 0 12:00,   0 degrees,  deep
            new THREE.Vector3(1, 0, 1), // 1  1:30,  45 degrees,  right deep
            new THREE.Vector3(1, 0, 0), // 2  3:00,  90 degress,  right
            new THREE.Vector3(1, 0, -1), // 3  4:30, 135 degrees,  right near
            new THREE.Vector3(0, 0, -1), // 4  6:00  180 degress,  near
            new THREE.Vector3(-1, 0, -1), // 5  7:30  225 degrees,  left near
            new THREE.Vector3(-1, 0, 0), // 6  9:00  270 degrees,  left
            new THREE.Vector3(-1, 0, 1) // 7 11:30  315 degrees,  left deep
        ];

        var position = controls.getObject().position;
        var rayHits = [];
        for (var index = 0; index < rays.length; index += 1) {

            // Set bounce distance for each vector
            var bounceSize = 0.1;
            rays[index].bounceDistance = {
                x: rays[index].x * bounceSize,
                y: rays[index].y * bounceSize,
                z: rays[index].z * bounceSize
            };

            raycaster.set(position, rays[index]);

            var intersections = raycaster.intersectObjects(cubes);

            if (intersections.length > 0 && intersections[0].distance <= 3) {
                controls.isOnObject(true);
                bounceBack(position, rays[index]);
            }
        }

        return false;
    };

    var npcDetection = function(controls) {

        var position = controls.getObject().position;
        var npcList = NPCs;

        var detection = {
            touch: false,
            npcID: 1,
            npcName: '',
            description: ''
        };

        $('#feedback').html('');
        for (var i = 0; i < npcList.length; i++) {
            npcList[i].name = score.npcData[i + 1].npc_name;
            npcList[i].description = score.npcData[i + 1].description;
            if ((Math.round(position.x / size) == npcList[i].gridPostion.xPos) &&
                (Math.round(position.z / size) == npcList[i].gridPostion.zPos)) {
                detection.touch = true;
                detection.npcID += i;
                detection.npcName = npcList[i].name;
                detection.description = npcList[i].description;
            }
        }

        if (detection.touch) {
            $('#feedback').html('Name: ' + detection.npcName + '</br>' +
                'Description: ' + detection.description);
        }
    };

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function addCube(scene, material, x, z) {
        var geometry = new THREE.BoxGeometry(size, size, size);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, size / 2, z);
        scene.add(cube);
        cubes.push(cube);
        return cube;
    }

    function addSphere(scene, wireFrame, x, z) {
        var geometry = new THREE.SphereGeometry(5, 25, 25);
        var material = new THREE.MeshNormalMaterial({
            //color: 0x00ffff,
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        //sphere.overdraw = true;
        sphere.position.set(x, 5, z);
        sphere.gridPostion = {
            xPos: Math.round(x / size),
            zPos: Math.round(z / size)
        };
        scene.add(sphere);
        NPCs.push(sphere);

        $('#npcs').append('<li>XPos: ' + sphere.gridPostion.xPos +
            ' ZPos: ' + sphere.gridPostion.zPos + '</li>');

        return sphere;
    }

    function addShapes(scene, wireFrame) {
        for (var i = 0; i < 6; i++) {
            addCube(scene, wireFrame, 25, -i * 20);
            addCube(scene, wireFrame, -25, -i * 20);
        }
    }

    function addLights() {
        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(1, 1, 1);
        scene.add(light);
        light = new THREE.DirectionalLight(0xffffff, 0.75);
        light.position.set(-1, -0.5, -1);
        scene.add(light);
    }

    function loadGrid(scene, wireFrame) {

        // Load Grid texture
        var loader = new THREE.TextureLoader();
        var material = new THREE.MeshLambertMaterial({
            wireframe: wireFrame,
            map: loader.load('images/retroblock.jpg')
        });

        $.getJSON('Grid000.json', function(result) {
            for (var i = 0; i < Object.keys(result).length; i++) {
                for (var j = 0; j < result[i].length; j++) {
                    //console.log(i, j);
                    if (result[i][j] == 1) {
                        addCube(scene, material, j * size, i * size);
                    } else if (result[i][j] === 0) {
                        //console.log('Nothing at:' + j + ', ' + i);
                    }
                }
            }
        });
    }

    function loadNPCs(scene, wireFrame) {
        // Load Database Data into score.npcData
        $.getJSON('/viewNpcs?designDoc=states&view=docNpcs', function(json) {
            for (var i = 0; i < json.rows.length; i++) {
                score.npcData[json.rows[i].key] = json.rows[i].value;
            }
        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log({
                'Request Failed': err
            });
            var response = JSON.parse(jqxhr.responseText);
            var responseValue = JSON.stringify(response, null, 4);
            console.log(responseValue);
            alert('Database not connected' + responseValue);
        });

        // Iterate over NPC000.json file
        $.getJSON('NPC000.json', function(result) {
            for (var i = 0; i < Object.keys(result).length; i++) {
                for (var j = 0; j < result[i].length; j++) {
                    //console.log(i, j);
                    if (result[i][j] !== 0) {
                        addSphere(scene, wireFrame, j * size, i * size);
                    }
                }
            }
        });
    }

    return Control;
});
