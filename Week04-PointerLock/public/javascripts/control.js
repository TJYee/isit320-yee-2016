/* globals define: true, THREE:true */

define(['floor', 'PointerLockControls', 'PointerLockSetup'], function(Floor, PointerLockControls, PointerLockSetup) {
    'use strict';
    var scene = null;
    var camera = null;
    var renderer = null;
    var THREE = null;
    var controls = null;
    var size = 20;
    var cubes = [];
    var raycaster = null;

    var keyMove = {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false
    };

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

        addShapes(scene, camera, false);
        addSphere(scene, camera, false, 5, -100);

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

        // Move the camera
        controls.update();

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

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function addCube(scene, camera, wireFrame, x, z) {
        var geometry = new THREE.BoxGeometry(size, size, size);
        var loader = new THREE.TextureLoader();
        var material = new THREE.MeshLambertMaterial({
            map: loader.load('images/crate.jpg')
        });

        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, size / 2, z);
        scene.add(cube);
        cubes.push(cube);
        return cube;
    }

    function addSphere(sne, camera, wireFrame, x, z) {
        var geometry = new THREE.SphereGeometry(5, 25, 25);
        var material = new THREE.MeshNormalMaterial({
            color: 0x00ffff,
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, 5, z);
        scene.add(sphere);
        return sphere;
    }

    function addShapes(scene, camera, wireFrame) {
        for (var i = 0; i < 6; i++) {
            addCube(scene, camera, wireFrame, 25, -i * 20);
            addCube(scene, camera, wireFrame, -25, -i * 20);
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

    return Control;
});
