define(['floor', 'PointerLockControls', 'PointerLockSetup', 'Score', 'collisions', 'npcs'],
    function(Floor, PointerLockControls, PointerLockSetup, Score, Collisions, Npcs) {
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
        var NPCs;
        var collision = null;

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

            NPCs = new Npcs(scene, THREE);
            loadGrid(scene, camera, false);
            loadNPCs(scene, camera, false);
            collision = new Collisions(scene, THREE);

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

            collision.collisionDetection(controls, cubes);
            collision.npcDetection(controls, NPCs);
            messageUpdater();


            // Move the camera
            controls.update();

            score.mainCharacter.x = Math.round(position.x / size);
            score.mainCharacter.z = Math.round(position.z / size);

            $('#cameraX').html(score.mainCharacter.x);
            $('#cameraZ').html(score.mainCharacter.z);

            renderer.render(scene, camera);
        }

        function messageUpdater() {
            $('#npcs').empty();
            $('#debug').empty();
            for (var i = 0; i < NPCs.npcList.length; i++) {
                if (NPCs.npcList[i]) {
                    $('#npcs').append('<li>ID: ' + NPCs.npcList[i].idNumber + ' XPos: ' + NPCs.npcList[i].gridPostion.xPos +
                        ' ZPos: ' + NPCs.npcList[i].gridPostion.zPos + '</li>');
                } else {
                    $('#debug').html('Error in npcList!');
                }
            }
        }

        function doPointerLock() {
            controls = new PointerLockControls(camera, THREE);
            var yawObject = controls.getObject();
            scene.add(yawObject);

            yawObject.position.x = size;
            yawObject.position.z = size;

            var ps = new PointerLockSetup(controls);
        }

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

        function addNPC(scene, wireFrame, x, z, id) {
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
            sphere.idNumber = id;
            scene.add(sphere);
            NPCs.push(sphere);

            return sphere;
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
            }).done(function() {
                showDebug('Grid loaded second success');
            }).fail(function(jqxhr, textStatus, error) {
                showDebug('Grid loaded error: ' + jqxhr.status + ' ' + textStatus + ' ' + error);
            }).always(function() {
                showDebug('Grid loaded complete');
            });
        }

        function loadNPCs(scene, wireFrame) {
            // Load Database Data into score.npcData
            $.getJSON('/viewNpcs?designDoc=states&view=docNpcs', function(json) {
                for (var i = 0; i < json.length; i++) {
                    score.npcData[json[i].key] = json[i].value;
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
                            //addNPC(scene, wireFrame, j * size, i * size, result[i][j]);
                            NPCs.createNPC(scene, wireFrame, j * size, i * size, result[i][j]);
                        }
                    }
                }
            });
        }

        // Debug Display
        function showDebug(err) {
            console.log(err);
            $('#debug').html(err);
        }

        return Control;
    });
