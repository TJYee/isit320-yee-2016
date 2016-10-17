/* globals define: true, THREE:true */

define(['floor', 'PointerLockControls', 'PointerLockSetup'], function(Floor, PointerLockControls, PointerLockSetup) {
    'use strict';
    var scene = null;
    var camera = null;
    var renderer = null;
    var THREE = null;
    var controls = null;
    var size = 20;

    var keyMove = {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false
    };

    var cameraPosition = {
        x: 0,
        y: 0,
        z: 0
    };

    function Control(threeInit) {
        THREE = threeInit;
        init();
        animate();
    }

    function init() {

        var screenWidth = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 0, 750);

        addCShapes(scene, camera, false);

        doPointerLock();

        addLights();

        var floor = new Floor(THREE);
        floor.drawFloor(scene);

        var raycaster = new THREE.Raycaster(new THREE.Vector3(),
            new THREE.Vector3(0, -1, 0), 0, 10);

        renderer = new THREE.WebGLRenderer({ antialias : true });

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

        // drawText(controlObject, position);

        collisionDetection(position);

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

    function collisionDetection(position) {
        // Collision detection
        raycaster.ray.origin.copy(position);

        var dir = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();
        raycaster.ray.direction.copy(dir);

        var intersections = raycaster.intersectObjects(cubes);

        // If we hit something (a wall) then stop moving in
        // that direction
        if (intersections.length > 0 && intersections[0].distance <= 215) {
            console.log(intersections.length);
            controls.isOnObject(true);
        }
    }

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
        cube.position.set(x, 0, z);
        scene.add(cube);
        return cube;
    }

    function addSphere(sne, camera, wireFrame, x, z) {
        var geometry = new THREE.SphereGeometry(0.5, 25, 25);
        var material = new THREE.MeshNormalMaterial({
            color: 0x00ffff,
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, 0, z);
        scene.add(sphere);
        return sphere;
    }

    function addCShapes(scene, camera, wireFrame) {
        for (var i = 1; i < 7; i++) {
            addCube(scene, camera, wireFrame, -i * 10, -i * 10);
            addSphere(scene, camera, wireFrame, i, i);
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

    var onKeyDown = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                keyMove.moveForward = true;
                break;

            case 37: // left
            case 65: // a
                keyMove.moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                keyMove.moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                keyMove.moveRight = true;
                break;
        }
    };

    var onKeyUp = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                keyMove.moveForward = false;
                break;

            case 37: // left
            case 65: // a
                keyMove.moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                keyMove.moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                keyMove.moveRight = false;
                break;
        }
    };

    return Control;
});
