/* globals define: true, THREE:true */

define(['floor'], function (Floor) {
    'use strict';
    var scene = null;
    var camera = null;
    var renderer = null;
    var cube = null;
    var THREE = null;

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
        console.log('Control called');
        scene = new THREE.Scene();
        var width = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(75, width, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        document.body.appendChild(renderer.domElement);
        addCShapes(scene, camera, false);
        camera.position.z = 0;
        camera.position.x = 0;
        camera.position.y = 0;

        addLights();

        var floor = new Floor(THREE);
        floor.drawFloor(scene);
        render();

        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
        window.addEventListener('resize', onWindowResize, false);
    }

    function render() {
        requestAnimationFrame(render);

        renderer.render(scene, camera);

        if (keyMove.moveLeft) {
            cameraPosition.x -= 1;
        } else if (keyMove.moveRight) {
            cameraPosition.x += 1;
        } else if (keyMove.moveForward) {
            cameraPosition.z -= 1;
        } else if (keyMove.moveBackward) {
            cameraPosition.z += 1;
        }
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function addCube(scene, camera, wireFrame, x, z) {
        var geometry = new THREE.BoxGeometry(5, 5, 5);
        var loader = new THREE.TextureLoader();
        var material = new THREE.MeshLambertMaterial({
            map : loader.load('images/crate.jpg')
        });

        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, 0, z);
        scene.add(cube);
        return cube;
    }

    function addSphere(sne, camera, wireFrame, x, z) {
        var geometry = new THREE.SphereGeometry(.5, 25, 25);
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

    var onKeyDown = function (event) {

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

    var onKeyUp = function (event) {

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
