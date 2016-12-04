define([], function() {
    'use strict';

    var THREE = null;

    function Npcs(threeInit) {
        var size = 20;
        THREE = threeInit;
    }

    // When you insert an NPC, put it here.
    Npcs.prototype.createNPC = function(scene, wireFrame, x, z, id) {
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
        sphere.name = getName(baseName, x, z);
        scene.add(sphere);
        npcList.push(sphere);

        return sphere;
    };

    // When you delete an NPC remove it from this list.
    Npcs.prototype.npcList = [];

    Npcs.prototype.removeNpc = function(x, z, scene, gridNpc) {
        gridNpc[x][z] = 0;
        var objectName = getName(baseName, x, z);
        var selectedObject = scene.getObjectByName(objectName);
        var index = this.npcList.indexOf(selectedObject);
        this.npcList.splice(index, 1);
        scene.remove(selectedObject);
    };

    // Track the coordinates of the NPCs here. Possibly redundant?
    Npcs.prototype.npcCoordinates = [];

    var baseName = 'npc';

    function getName(baseName, x, z) {
        return baseName + '_' + x + '_' + z;
    }

    return Npcs;
});
