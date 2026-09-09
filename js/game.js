import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// =====================================================
// HOSTEL SIMULATOR 3D
// VERSION 0.6
// REALISTIC ROOM + CAMERA
// =====================================================


// =====================================================
// HTML
// =====================================================

const canvas =
    document.getElementById("gameCanvas");

const healthText =
    document.getElementById("health");

const hungerText =
    document.getElementById("hunger");

const energyText =
    document.getElementById("energy");

const moodText =
    document.getElementById("mood");

const studyText =
    document.getElementById("study");

const moneyText =
    document.getElementById("money");

const gameMessage =
    document.getElementById("gameMessage");

const interactionPrompt =
    document.getElementById("interactionPrompt");


// =====================================================
// PLAYER STATS
// =====================================================

const stats = {

    health: 100,
    hunger: 85,
    energy: 90,
    mood: 95,
    study: 10,
    money: 2500

};


function updateStats() {

    healthText.textContent =
        stats.health;

    hungerText.textContent =
        stats.hunger;

    energyText.textContent =
        stats.energy;

    moodText.textContent =
        stats.mood;

    studyText.textContent =
        stats.study;

    moneyText.textContent =
        stats.money;

}


updateStats();


// =====================================================
// SCENE
// =====================================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(
        0xb9c8d3
    );


// =====================================================
// CAMERA
// =====================================================

const camera =
    new THREE.PerspectiveCamera(

        65,

        canvas.width /
        canvas.height,

        0.1,

        1000

    );


// Camera rotation

let cameraYaw = 0;

let cameraPitch = 0.32;

let cameraDistance = 6;


// =====================================================
// RENDERER
// =====================================================

const renderer =
    new THREE.WebGLRenderer({

        canvas: canvas,

        antialias: true

    });


renderer.setSize(

    canvas.width,

    canvas.height,

    false

);


renderer.setPixelRatio(

    Math.min(

        window.devicePixelRatio,

        2

    )

);


renderer.shadowMap.enabled =
    true;


renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


renderer.outputColorSpace =
    THREE.SRGBColorSpace;


renderer.toneMapping =
    THREE.ACESFilmicToneMapping;


renderer.toneMappingExposure =
    1.1;


// =====================================================
// MATERIALS
// =====================================================

const floorMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x8b6749,

        roughness: 0.75

    });


const wallMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xe7e3d9,

        roughness: 0.9

    });


const ceilingMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xf1f1ed,

        roughness: 1

    });


const woodMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x65462f,

        roughness: 0.65

    });


const metalMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x64686b,

        roughness: 0.35,

        metalness: 0.6

    });


// =====================================================
// LIGHTING
// =====================================================


// Soft general lighting

const ambient =
    new THREE.HemisphereLight(

        0xdce8ff,

        0x6d665b,

        1.7

    );


scene.add(ambient);


// Sunlight

const sunlight =
    new THREE.DirectionalLight(

        0xfff4dd,

        3

    );


sunlight.position.set(

    -5,

    8,

    3

);


sunlight.castShadow =
    true;


sunlight.shadow.mapSize.set(

    2048,

    2048

);


scene.add(sunlight);


// Room light

const roomLight =
    new THREE.PointLight(

        0xfff3d6,

        18,

        14

    );


roomLight.position.set(

    0,

    4.3,

    0

);


roomLight.castShadow =
    true;


scene.add(roomLight);


// =====================================================
// ROOM FLOOR
// =====================================================

const floor =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            12,

            0.15,

            10

        ),

        floorMaterial

    );


floor.position.y =
    -0.075;


floor.receiveShadow =
    true;


scene.add(floor);


// =====================================================
// FLOOR DETAILS
// =====================================================

for (
    let x = -5;
    x <= 5;
    x += 1
) {

    const line =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.015,

                0.01,

                10

            ),

            new THREE.MeshStandardMaterial({

                color: 0x74543c

            })

        );


    line.position.set(

        x,

        0.01,

        0

    );


    scene.add(line);

}


// =====================================================
// WALL CREATOR
// =====================================================

function createWall(

    width,

    height,

    depth,

    x,

    y,

    z

) {

    const wall =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                width,

                height,

                depth

            ),

            wallMaterial

        );


    wall.position.set(

        x,

        y,

        z

    );


    wall.receiveShadow =
        true;


    scene.add(wall);


    return wall;

}


// =====================================================
// WALLS
// =====================================================


// Back wall

createWall(

    12,

    5,

    0.2,

    0,

    2.5,

    -5

);


// Left

createWall(

    0.2,

    5,

    10,

    -6,

    2.5,

    0

);


// Right

createWall(

    0.2,

    5,

    10,

    6,

    2.5,

    0

);


// Front left

createWall(

    5,

    5,

    0.2,

    -3.5,

    2.5,

    5

);


// Front right

createWall(

    5,

    5,

    0.2,

    3.5,

    2.5,

    5

);


// =====================================================
// CEILING
// =====================================================

const ceiling =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            12,

            0.12,

            10

        ),

        ceilingMaterial

    );


ceiling.position.y =
    5;


scene.add(ceiling);


// =====================================================
// WINDOW
// =====================================================

const windowFrame =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            3.4,

            2.2,

            0.18

        ),

        metalMaterial

    );


windowFrame.position.set(

    -2.5,

    3,

    -4.83

);


scene.add(windowFrame);


const glass =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            3,

            1.8,

            0.08

        ),

        new THREE.MeshPhysicalMaterial({

            color: 0x92c8dd,

            transparent: true,

            opacity: 0.4,

            roughness: 0.1

        })

    );


glass.position.set(

    -2.5,

    3,

    -4.7

);


scene.add(glass);


// Window center frame

const windowDivider =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.08,

            1.9,

            0.15

        ),

        metalMaterial

    );


windowDivider.position.set(

    -2.5,

    3,

    -4.62

);


scene.add(windowDivider);


// =====================================================
// BED
// =====================================================

const bedGroup =
    new THREE.Group();


const bedBase =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            3.5,

            0.45,

            2

        ),

        woodMaterial

    );


bedBase.position.y =
    0.3;


bedGroup.add(
    bedBase
);


// Mattress

const mattress =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            3.35,

            0.35,

            1.85

        ),

        new THREE.MeshStandardMaterial({

            color: 0xe4e2dc,

            roughness: 0.95

        })

    );


mattress.position.y =
    0.7;


bedGroup.add(
    mattress
);


// Blanket

const blanket =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            1.9,

            0.09,

            1.82

        ),

        new THREE.MeshStandardMaterial({

            color: 0x6d8291,

            roughness: 1

        })

    );


blanket.position.set(

    0.65,

    0.92,

    0

);


bedGroup.add(
    blanket
);


// Pillow

const pillow =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.75,

            0.24,

            1.25

        ),

        new THREE.MeshStandardMaterial({

            color: 0xf1efe9

        })

    );


pillow.position.set(

    -1.15,

    0.95,

    0

);


bedGroup.add(
    pillow
);


bedGroup.position.set(

    -3.8,

    0,

    -2.7

);


bedGroup.traverse(

    object => {

        if (
            object.isMesh
        ) {

            object.castShadow =
                true;

            object.receiveShadow =
                true;

        }

    }

);


scene.add(
    bedGroup
);


// =====================================================
// DESK
// =====================================================

const deskGroup =
    new THREE.Group();


const deskTop =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            3,

            0.18,

            1.3

        ),

        woodMaterial

    );


deskTop.position.y =
    1.45;


deskGroup.add(
    deskTop
);


const deskLegGeometry =
    new THREE.BoxGeometry(

        0.16,

        1.45,

        0.16

    );


const deskLegPositions = [

    [-1.3, 0.72, -0.5],

    [1.3, 0.72, -0.5],

    [-1.3, 0.72, 0.5],

    [1.3, 0.72, 0.5]

];


deskLegPositions.forEach(

    position => {

        const leg =
            new THREE.Mesh(

                deskLegGeometry,

                woodMaterial

            );


        leg.position.set(
            ...position
        );


        deskGroup.add(
            leg
        );

    }

);


// =====================================================
// LAPTOP
// =====================================================

const laptopBase =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            1.2,

            0.08,

            0.8

        ),

        metalMaterial

    );


laptopBase.position.set(

    0,

    1.6,

    0

);


deskGroup.add(
    laptopBase
);


const laptopScreen =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            1.2,

            0.8,

            0.06

        ),

        new THREE.MeshStandardMaterial({

            color: 0x121820,

            roughness: 0.2

        })

    );


laptopScreen.position.set(

    0,

    2,

    -0.37

);


laptopScreen.rotation.x =
    -0.12;


deskGroup.add(
    laptopScreen
);


deskGroup.position.set(

    3.8,

    0,

    -3.1

);


deskGroup.traverse(

    object => {

        if (
            object.isMesh
        ) {

            object.castShadow =
                true;

        }

    }

);


scene.add(
    deskGroup
);


// =====================================================
// CHAIR
// =====================================================

const chair =
    new THREE.Group();


const chairSeat =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            1,

            0.16,

            1

        ),

        woodMaterial

    );


chairSeat.position.y =
    0.85;


chair.add(
    chairSeat
);


const chairBack =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            1,

            1.25,

            0.14

        ),

        woodMaterial

    );


chairBack.position.set(

    0,

    1.5,

    0.43

);


chair.add(
    chairBack
);


chair.position.set(

    3.8,

    0,

    -1.2

);


scene.add(
    chair
);


// =====================================================
// CUPBOARD
// =====================================================

const cupboard =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            2,

            3.8,

            1

        ),

        woodMaterial

    );


cupboard.position.set(

    4.6,

    1.9,

    2.7

);


cupboard.castShadow =
    true;


scene.add(
    cupboard
);


// Cupboard doors line

const cupboardLine =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.025,

            3.6,

            1.02

        ),

        new THREE.MeshStandardMaterial({

            color: 0x3e2d22

        })

    );


cupboardLine.position.set(

    4.6,

    1.9,

    2.7

);


scene.add(
    cupboardLine
);


// Handles

for (
    const offset of [-0.17, 0.17]
) {

    const handle =
        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.06,

                12,

                12

            ),

            metalMaterial

        );


    handle.position.set(

        4.6 + offset,

        2,

        2.17

    );


    scene.add(
        handle
    );

}


// =====================================================
// DOOR
// =====================================================

const door =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            2,

            3.7,

            0.15

        ),

        new THREE.MeshStandardMaterial({

            color: 0x4f3524,

            roughness: 0.7

        })

    );


door.position.set(

    0,

    1.85,

    4.9

);


door.castShadow =
    true;


scene.add(
    door
);


// Door handle

const doorHandle =
    new THREE.Mesh(

        new THREE.SphereGeometry(

            0.08,

            16,

            16

        ),

        new THREE.MeshStandardMaterial({

            color: 0xcaa74b,

            metalness: 0.8,

            roughness: 0.25

        })

    );


doorHandle.position.set(

    0.7,

    1.8,

    4.76

);


scene.add(
    doorHandle
);


// =====================================================
// TUBE LIGHT
// =====================================================

const tubeLight =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            2.6,

            0.12,

            0.15

        ),

        new THREE.MeshStandardMaterial({

            color: 0xffffff,

            emissive: 0xffffff,

            emissiveIntensity: 2

        })

    );


tubeLight.position.set(

    2,

    4.25,

    -4.82

);


scene.add(
    tubeLight
);


// =====================================================
// CEILING FAN
// =====================================================

const fan =
    new THREE.Group();


const fanRod =
    new THREE.Mesh(

        new THREE.CylinderGeometry(

            0.06,

            0.06,

            0.7,

            12

        ),

        metalMaterial

    );


fanRod.position.y =
    -0.3;


fan.add(
    fanRod
);


const fanCenter =
    new THREE.Mesh(

        new THREE.CylinderGeometry(

            0.22,

            0.28,

            0.25,

            16

        ),

        metalMaterial

    );


fanCenter.rotation.x =
    Math.PI / 2;


fanCenter.position.y =
    -0.65;


fan.add(
    fanCenter
);


for (
    let i = 0;
    i < 3;
    i++
) {

    const blade =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                1.8,

                0.06,

                0.3

            ),

            new THREE.MeshStandardMaterial({

                color: 0x5d5d5d

            })

        );


    blade.position.x =
        0.9;


    blade.rotation.y =
        i *
        Math.PI *
        2 /
        3;


    const bladePivot =
        new THREE.Group();


    bladePivot.add(
        blade
    );


    bladePivot.position.y =
        -0.65;


    bladePivot.rotation.y =
        i *
        Math.PI *
        2 /
        3;


    fan.add(
        bladePivot
    );

}


fan.position.set(

    0,

    4.8,

    0

);


scene.add(
    fan
);


// =====================================================
// PLAYER
// =====================================================

const player =
    new THREE.Group();


const shirtMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x334e68

    });


const skinMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xc78d65

    });


const pantsMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x26282b

    });


// Body

const body =
    new THREE.Mesh(

        new THREE.CylinderGeometry(

            0.38,

            0.45,

            1.2,

            18

        ),

        shirtMaterial

    );


body.position.y =
    1.15;


player.add(
    body
);


// Head

const head =
    new THREE.Mesh(

        new THREE.SphereGeometry(

            0.36,

            24,

            24

        ),

        skinMaterial

    );


head.position.y =
    2;


player.add(
    head
);


// Legs

const leftLeg =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.26,

            0.95,

            0.3

        ),

        pantsMaterial

    );


leftLeg.position.set(

    -0.2,

    0.3,

    0

);


player.add(
    leftLeg
);


const rightLeg =
    leftLeg.clone();


rightLeg.position.x =
    0.2;


player.add(
    rightLeg
);


// Arms

const leftArm =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.22,

            1,

            0.24

        ),

        skinMaterial

    );


leftArm.position.set(

    -0.52,

    1.15,

    0

);


player.add(
    leftArm
);


const rightArm =
    leftArm.clone();


rightArm.position.x =
    0.52;


player.add(
    rightArm
);


player.position.set(

    0,

    0.45,

    1.5

);


player.traverse(

    object => {

        if (
            object.isMesh
        ) {

            object.castShadow =
                true;

        }

    }

);


scene.add(
    player
);


// =====================================================
// KEYBOARD
// =====================================================

const keys = {};


document.addEventListener(

    "keydown",

    event => {

        keys[
            event.key.toLowerCase()
        ] = true;


        if (
            event.key.startsWith(
                "Arrow"
            )
        ) {

            event.preventDefault();

        }


        if (
            event.key.toLowerCase() === "e" &&
            !event.repeat
        ) {

            interact();

        }

    }

);


document.addEventListener(

    "keyup",

    event => {

        keys[
            event.key.toLowerCase()
        ] = false;

    }

);


// =====================================================
// MOUSE CAMERA
// =====================================================

let dragging = false;

let previousMouseX = 0;
let previousMouseY = 0;


canvas.addEventListener(

    "mousedown",

    event => {

        dragging = true;

        previousMouseX =
            event.clientX;

        previousMouseY =
            event.clientY;

    }

);


window.addEventListener(

    "mouseup",

    () => {

        dragging = false;

    }

);


window.addEventListener(

    "mousemove",

    event => {

        if (
            !dragging
        ) {

            return;

        }


        const deltaX =
            event.clientX -
            previousMouseX;


        const deltaY =
            event.clientY -
            previousMouseY;


        cameraYaw -=
            deltaX *
            0.006;


        cameraPitch +=
            deltaY *
            0.004;


        cameraPitch =
            THREE.MathUtils.clamp(

                cameraPitch,

                0.1,

                0.85

            );


        previousMouseX =
            event.clientX;

        previousMouseY =
            event.clientY;

    }

);


// Mouse wheel camera zoom

canvas.addEventListener(

    "wheel",

    event => {

        event.preventDefault();


        cameraDistance +=
            event.deltaY *
            0.005;


        cameraDistance =
            THREE.MathUtils.clamp(

                cameraDistance,

                3.8,

                8

            );

    },

    {
        passive: false
    }

);


// =====================================================
// COLLISION
// =====================================================

function isBlocked(
    x,
    z
) {

    // Walls

    if (
        x < -5.4 ||
        x > 5.4 ||
        z < -4.4 ||
        z > 4.35
    ) {

        return true;

    }


    // Bed

    if (
        x > -5.6 &&
        x < -1.7 &&
        z > -4 &&
        z < -1.25
    ) {

        return true;

    }


    // Desk

    if (
        x > 2 &&
        x < 5.5 &&
        z > -4.3 &&
        z < -2
    ) {

        return true;

    }


    // Chair

    if (
        x > 3 &&
        x < 4.7 &&
        z > -2 &&
        z < -0.4
    ) {

        return true;

    }


    // Cupboard

    if (
        x > 3.2 &&
        x < 5.6 &&
        z > 1.8 &&
        z < 3.7
    ) {

        return true;

    }


    return false;

}


// =====================================================
// MOVEMENT
// =====================================================

let walking = false;

let walkTime = 0;


function updatePlayer() {

    const speed =
        keys["shift"]
            ? 0.1
            : 0.06;


    let forward = 0;
    let side = 0;


    if (
        keys["w"] ||
        keys["arrowup"]
    ) {

        forward += 1;

    }


    if (
        keys["s"] ||
        keys["arrowdown"]
    ) {

        forward -= 1;

    }


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        side -= 1;

    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        side += 1;

    }


    walking =
        forward !== 0 ||
        side !== 0;


    if (
        walking
    ) {

        const direction =
            new THREE.Vector3();


        direction.x =
            Math.sin(
                cameraYaw
            ) *
            forward +
            Math.cos(
                cameraYaw
            ) *
            side;


        direction.z =
            -Math.cos(
                cameraYaw
            ) *
            forward +
            Math.sin(
                cameraYaw
            ) *
            side;


        direction.normalize();


        const nextX =
            player.position.x +
            direction.x *
            speed;


        const nextZ =
            player.position.z +
            direction.z *
            speed;


        if (
            !isBlocked(
                nextX,
                player.position.z
            )
        ) {

            player.position.x =
                nextX;

        }


        if (
            !isBlocked(
                player.position.x,
                nextZ
            )
        ) {

            player.position.z =
                nextZ;

        }


        player.rotation.y =
            Math.atan2(

                direction.x,

                direction.z

            );


        walkTime += 0.14;


        leftLeg.rotation.x =
            Math.sin(
                walkTime
            ) *
            0.55;


        rightLeg.rotation.x =
            -Math.sin(
                walkTime
            ) *
            0.55;


        leftArm.rotation.x =
            -Math.sin(
                walkTime
            ) *
            0.35;


        rightArm.rotation.x =
            Math.sin(
                walkTime
            ) *
            0.35;

    }


    else {

        leftLeg.rotation.x = 0;

        rightLeg.rotation.x = 0;

        leftArm.rotation.x = 0;

        rightArm.rotation.x = 0;

    }

}


// =====================================================
// CAMERA
// =====================================================

function updateCamera() {

    const horizontalDistance =

        Math.cos(
            cameraPitch
        ) *
        cameraDistance;


    const verticalDistance =

        Math.sin(
            cameraPitch
        ) *
        cameraDistance;


    const x =
        player.position.x +

        Math.sin(
            cameraYaw
        ) *
        horizontalDistance;


    const z =
        player.position.z +

        Math.cos(
            cameraYaw
        ) *
        horizontalDistance;


    const y =
        player.position.y +
        verticalDistance +
        1.2;


    const desired =
        new THREE.Vector3(

            x,

            y,

            z

        );


    camera.position.lerp(

        desired,

        0.12

    );


    const target =
        player.position.clone();


    target.y +=
        1.2;


    camera.lookAt(
        target
    );

}


// =====================================================
// INTERACTIONS
// =====================================================

function interact() {

    const bedDistance =

        player.position.distanceTo(
            bedGroup.position
        );


    const deskDistance =

        player.position.distanceTo(
            deskGroup.position
        );


    const doorDistance =

        player.position.distanceTo(
            door.position
        );


    if (
        bedDistance < 2.4
    ) {

        stats.energy =
            Math.min(

                100,

                stats.energy + 20

            );


        stats.hunger =
            Math.max(

                0,

                stats.hunger - 5

            );


        updateStats();


        gameMessage.textContent =
            "😴 You rested on the bed. Energy +20";

    }


    else if (
        deskDistance < 2.5
    ) {

        stats.study =
            Math.min(

                100,

                stats.study + 10

            );


        stats.energy =
            Math.max(

                0,

                stats.energy - 5

            );


        updateStats();


        gameMessage.textContent =
            "📚 You studied using your laptop. Study +10";

    }


    else if (
        doorDistance < 2.4
    ) {

        gameMessage.textContent =
            "🚪 Corridor will open in Version 0.7.";

    }

}


// =====================================================
// INTERACTION PROMPT
// =====================================================

function updatePrompt() {

    const bedDistance =

        player.position.distanceTo(
            bedGroup.position
        );


    const deskDistance =

        player.position.distanceTo(
            deskGroup.position
        );


    const doorDistance =

        player.position.distanceTo(
            door.position
        );


    if (
        bedDistance < 2.4
    ) {

        interactionPrompt.style.display =
            "block";


        interactionPrompt.textContent =
            "E • Sleep";

    }


    else if (
        deskDistance < 2.5
    ) {

        interactionPrompt.style.display =
            "block";


        interactionPrompt.textContent =
            "E • Study";

    }


    else if (
        doorDistance < 2.4
    ) {

        interactionPrompt.style.display =
            "block";


        interactionPrompt.textContent =
            "E • Open Door";

    }


    else {

        interactionPrompt.style.display =
            "none";

    }

}


// =====================================================
// FAN ANIMATION
// =====================================================

function updateFan() {

    fan.rotation.y +=
        0.08;

}


// =====================================================
// ANIMATION
// =====================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    updatePlayer();

    updateCamera();

    updateFan();

    updatePrompt();


    renderer.render(

        scene,

        camera

    );

}


// =====================================================
// START
// =====================================================

gameMessage.textContent =
    "🎮 WASD to move • Shift to run • Drag mouse to look • Scroll to zoom • E to interact";


animate();