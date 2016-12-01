define([], function() {
    'use strict';

    function Npcs() {
        var size;
    }

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
        scene.add(sphere);
        NPCs.push(sphere);

        return sphere;
    }

    return Npcs;
});