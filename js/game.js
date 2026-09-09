// =====================================================
// HOSTEL LIFE LIVE
// VERSION 0.3
// =====================================================


// =====================================================
// CANVAS
// =====================================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// =====================================================
// HTML ELEMENTS
// =====================================================

const healthText = document.getElementById("health");
const hungerText = document.getElementById("hunger");
const energyText = document.getElementById("energy");
const moodText = document.getElementById("mood");
const studyText = document.getElementById("study");
const moneyText = document.getElementById("money");

const timeText = document.getElementById("time");
const dayText = document.getElementById("day");

const interactionPrompt =
    document.getElementById("interactionPrompt");

const gameMessage =
    document.getElementById("gameMessage");


// =====================================================
// CURRENT SCENE
// =====================================================

let currentScene = "room";


// =====================================================
// PLAYER
// =====================================================

const player = {

    x: 430,
    y: 300,

    width: 32,
    height: 42,

    speed: 4

};


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


// =====================================================
// GAME TIME
// =====================================================

let day = 1;

let gameHour = 8;
let gameMinute = 30;


// =====================================================
// ROOM AREA
// =====================================================

const room = {

    x: 40,
    y: 40,

    width: 820,
    height: 440

};


// =====================================================
// ROOM OBJECTS
// =====================================================

const bed = {

    x: 80,
    y: 110,

    width: 180,
    height: 90,

    interactionDistance: 80

};


const table = {

    x: 650,
    y: 100,

    width: 150,
    height: 70,

    interactionDistance: 80

};


const cupboard = {

    x: 650,
    y: 310,

    width: 110,
    height: 150

};


const roommate = {

    x: 280,
    y: 150,

    width: 32,
    height: 42,

    interactionDistance: 70

};


const roomDoor = {

    x: 370,
    y: 435,

    width: 120,
    height: 45,

    interactionDistance: 75

};


// =====================================================
// CORRIDOR
// =====================================================

const corridor = {

    x: 40,
    y: 40,

    width: 820,
    height: 440

};


// =====================================================
// CORRIDOR OBJECTS
// =====================================================

const corridorRoom101 = {

    x: 130,
    y: 55,

    width: 110,
    height: 35,

    interactionDistance: 80

};


const corridorRoom102 = {

    x: 330,
    y: 55,

    width: 110,
    height: 35

};


const corridorRoom103 = {

    x: 530,
    y: 55,

    width: 110,
    height: 35

};


const waterCooler = {

    x: 690,
    y: 120,

    width: 55,
    height: 80,

    interactionDistance: 75

};


const bench = {

    x: 300,
    y: 330,

    width: 170,
    height: 55

};


const stairs = {

    x: 730,
    y: 330,

    width: 90,
    height: 110,

    interactionDistance: 90

};


// =====================================================
// KEYBOARD
// =====================================================

const keys = {};


document.addEventListener(
    "keydown",
    function (event) {

        const key =
            event.key.toLowerCase();

        keys[key] = true;


        // Stop browser scrolling

        if (
            key === "arrowup" ||
            key === "arrowdown" ||
            key === "arrowleft" ||
            key === "arrowright"
        ) {

            event.preventDefault();

        }


        // Interaction

        if (
            key === "e" &&
            !event.repeat
        ) {

            interact();

        }

    }
);


document.addEventListener(
    "keyup",
    function (event) {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


// =====================================================
// RECTANGLE COLLISION
// =====================================================

function rectanglesCollide(
    x,
    y,
    width,
    height,
    object
) {

    return (

        x < object.x + object.width &&

        x + width > object.x &&

        y < object.y + object.height &&

        y + height > object.y

    );

}


// =====================================================
// CHECK ROOM OBSTACLES
// =====================================================

function isRoomBlocked(x, y) {

    const obstacles = [

        bed,
        table,
        cupboard,
        roommate

    ];


    for (const obstacle of obstacles) {

        if (
            rectanglesCollide(
                x,
                y,
                player.width,
                player.height,
                obstacle
            )
        ) {

            return true;

        }

    }


    return false;

}


// =====================================================
// CHECK CORRIDOR OBSTACLES
// =====================================================

function isCorridorBlocked(x, y) {

    const obstacles = [

        waterCooler,
        bench,
        stairs

    ];


    for (const obstacle of obstacles) {

        if (
            rectanglesCollide(
                x,
                y,
                player.width,
                player.height,
                obstacle
            )
        ) {

            return true;

        }

    }


    return false;

}


// =====================================================
// MOVEMENT
// =====================================================

function movePlayer() {

    let moveX = 0;
    let moveY = 0;


    if (
        keys["w"] ||
        keys["arrowup"]
    ) {

        moveY -= player.speed;

    }


    if (
        keys["s"] ||
        keys["arrowdown"]
    ) {

        moveY += player.speed;

    }


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        moveX -= player.speed;

    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        moveX += player.speed;

    }


    // ROOM MOVEMENT

    if (currentScene === "room") {

        moveInsideArea(
            room,
            moveX,
            moveY,
            isRoomBlocked
        );

    }


    // CORRIDOR MOVEMENT

    if (currentScene === "corridor") {

        moveInsideArea(
            corridor,
            moveX,
            moveY,
            isCorridorBlocked
        );

    }

}


// =====================================================
// MOVE INSIDE AREA
// =====================================================

function moveInsideArea(
    area,
    moveX,
    moveY,
    collisionFunction
) {

    // ----------------------------
    // X MOVEMENT
    // ----------------------------

    const nextX =
        player.x + moveX;


    if (
        nextX >= area.x + 8 &&
        nextX + player.width <=
        area.x + area.width - 8
    ) {

        if (
            !collisionFunction(
                nextX,
                player.y
            )
        ) {

            player.x =
                nextX;

        }

    }


    // ----------------------------
    // Y MOVEMENT
    // ----------------------------

    const nextY =
        player.y + moveY;


    if (
        nextY >= area.y + 8 &&
        nextY + player.height <=
        area.y + area.height - 8
    ) {

        if (
            !collisionFunction(
                player.x,
                nextY
            )
        ) {

            player.y =
                nextY;

        }

    }

}


// =====================================================
// DISTANCE
// =====================================================

function getDistance(object) {

    const playerCenterX =
        player.x +
        player.width / 2;

    const playerCenterY =
        player.y +
        player.height / 2;


    const objectCenterX =
        object.x +
        object.width / 2;

    const objectCenterY =
        object.y +
        object.height / 2;


    const distanceX =
        playerCenterX -
        objectCenterX;

    const distanceY =
        playerCenterY -
        objectCenterY;


    return Math.sqrt(

        distanceX * distanceX +
        distanceY * distanceY

    );

}


// =====================================================
// FIND NEARBY OBJECT
// =====================================================

function getNearbyObject() {

    // ROOM

    if (currentScene === "room") {

        if (
            getDistance(bed) <
            bed.interactionDistance
        ) {

            return "bed";

        }


        if (
            getDistance(table) <
            table.interactionDistance
        ) {

            return "table";

        }


        if (
            getDistance(roommate) <
            roommate.interactionDistance
        ) {

            return "roommate";

        }


        if (
            getDistance(roomDoor) <
            roomDoor.interactionDistance
        ) {

            return "roomDoor";

        }

    }


    // CORRIDOR

    if (currentScene === "corridor") {

        if (
            getDistance(corridorRoom101) <
            corridorRoom101.interactionDistance
        ) {

            return "room101";

        }


        if (
            getDistance(waterCooler) <
            waterCooler.interactionDistance
        ) {

            return "water";

        }


        if (
            getDistance(stairs) <
            stairs.interactionDistance
        ) {

            return "stairs";

        }

    }


    return null;

}


// =====================================================
// PROMPT
// =====================================================

function updateInteractionPrompt() {

    const nearby =
        getNearbyObject();


    if (nearby === "bed") {

        showPrompt(
            "Press E to Sleep 🛏️"
        );

    }

    else if (nearby === "table") {

        showPrompt(
            "Press E to Study 📚"
        );

    }

    else if (nearby === "roommate") {

        showPrompt(
            "Press E to Talk 👋"
        );

    }

    else if (nearby === "roomDoor") {

        showPrompt(
            "Press E to Enter Corridor 🚪"
        );

    }

    else if (nearby === "room101") {

        showPrompt(
            "Press E to Enter Room 101 🚪"
        );

    }

    else if (nearby === "water") {

        showPrompt(
            "Press E to Drink Water 💧"
        );

    }

    else if (nearby === "stairs") {

        showPrompt(
            "Press E to Use Stairs"
        );

    }

    else {

        interactionPrompt.style.display =
            "none";

    }

}


// =====================================================
// SHOW PROMPT
// =====================================================

function showPrompt(message) {

    interactionPrompt.textContent =
        message;

    interactionPrompt.style.display =
        "block";

}


// =====================================================
// INTERACT
// =====================================================

function interact() {

    const nearby =
        getNearbyObject();


    if (nearby === "bed") {

        sleep();

    }

    else if (nearby === "table") {

        study();

    }

    else if (nearby === "roommate") {

        talkToRoommate();

    }

    else if (nearby === "roomDoor") {

        enterCorridor();

    }

    else if (nearby === "room101") {

        enterRoom();

    }

    else if (nearby === "water") {

        drinkWater();

    }

    else if (nearby === "stairs") {

        useStairs();

    }

}


// =====================================================
// SLEEP
// =====================================================

function sleep() {

    stats.energy += 25;

    stats.hunger -= 7;

    stats.health += 3;

    stats.mood += 5;


    addTime(120);


    gameMessage.textContent =
        "😴 You slept for 2 hours. Energy restored!";


    clampStats();

    updateStats();

}


// =====================================================
// STUDY
// =====================================================

function study() {

    if (stats.energy < 10) {

        gameMessage.textContent =
            "😴 You are too tired to study.";

        return;

    }


    stats.study += 10;

    stats.energy -= 10;

    stats.hunger -= 5;

    stats.mood -= 2;


    addTime(60);


    gameMessage.textContent =
        "📚 You studied for 1 hour. Study +10";


    clampStats();

    updateStats();

}


// =====================================================
// ROOMMATE
// =====================================================

function talkToRoommate() {

    stats.mood += 5;

    addTime(15);


    const messages = [

        "👤 Rahul: Bro, canteen chale?",

        "👤 Rahul: Kal assignment submit karna hai!",

        "👤 Rahul: Evening cricket khelenge.",

        "👤 Rahul: Bhai Wi-Fi phir slow hai 😂",

        "👤 Rahul: Mess me aaj kya bana hai?",

        "👤 Rahul: Kal morning class bunk kare? 😅"

    ];


    const randomMessage =
        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];


    gameMessage.textContent =
        randomMessage;


    clampStats();

    updateStats();

}


// =====================================================
// ENTER CORRIDOR
// =====================================================

function enterCorridor() {

    currentScene =
        "corridor";


    player.x =
        170;

    player.y =
        115;


    gameMessage.textContent =
        "🚪 You entered the hostel corridor.";

}


// =====================================================
// ENTER ROOM
// =====================================================

function enterRoom() {

    currentScene =
        "room";


    player.x =
        420;

    player.y =
        380;


    gameMessage.textContent =
        "🛏️ You returned to Room 101.";

}


// =====================================================
// DRINK WATER
// =====================================================

function drinkWater() {

    stats.health += 2;

    stats.mood += 1;


    addTime(5);


    gameMessage.textContent =
        "💧 You drank some water.";


    clampStats();

    updateStats();

}


// =====================================================
// STAIRS
// =====================================================

function useStairs() {

    gameMessage.textContent =
        "🚧 Ground floor is under development. Coming next!";

}


// =====================================================
// GAME TIME
// =====================================================

function addTime(minutes) {

    gameMinute +=
        minutes;


    while (
        gameMinute >= 60
    ) {

        gameMinute -= 60;

        gameHour++;

    }


    while (
        gameHour >= 24
    ) {

        gameHour -= 24;

        day++;

    }


    updateTime();

}


// =====================================================
// UPDATE TIME
// =====================================================

function updateTime() {

    let displayHour =
        gameHour;


    let period =
        "AM";


    if (
        displayHour >= 12
    ) {

        period =
            "PM";

    }


    if (
        displayHour === 0
    ) {

        displayHour =
            12;

    }

    else if (
        displayHour > 12
    ) {

        displayHour -=
            12;

    }


    const minute =
        String(
            gameMinute
        ).padStart(
            2,
            "0"
        );


    timeText.textContent =
        `${displayHour}:${minute} ${period}`;


    dayText.textContent =
        day;

}


// =====================================================
// CLAMP STATS
// =====================================================

function clampStats() {

    stats.health =
        Math.max(
            0,
            Math.min(
                100,
                stats.health
            )
        );


    stats.hunger =
        Math.max(
            0,
            Math.min(
                100,
                stats.hunger
            )
        );


    stats.energy =
        Math.max(
            0,
            Math.min(
                100,
                stats.energy
            )
        );


    stats.mood =
        Math.max(
            0,
            Math.min(
                100,
                stats.mood
            )
        );


    stats.study =
        Math.max(
            0,
            Math.min(
                100,
                stats.study
            )
        );

}


// =====================================================
// UPDATE STATS
// =====================================================

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


// =====================================================
// DRAW ROOM
// =====================================================

function drawRoom() {

    // FLOOR

    ctx.fillStyle =
        "#d8cbb9";

    ctx.fillRect(
        room.x,
        room.y,
        room.width,
        room.height
    );


    // BORDER

    ctx.strokeStyle =
        "#555";

    ctx.lineWidth =
        8;

    ctx.strokeRect(
        room.x,
        room.y,
        room.width,
        room.height
    );


    ctx.fillStyle =
        "#555";

    ctx.font =
        "18px Arial";

    ctx.fillText(
        "Hostel Room 101",
        60,
        75
    );


    drawBed();

    drawTable();

    drawCupboard();

    drawRoomDoor();

    drawRoommate();

}


// =====================================================
// BED
// =====================================================

function drawBed() {

    ctx.fillStyle =
        "#856f5e";

    ctx.fillRect(
        bed.x,
        bed.y,
        bed.width,
        bed.height
    );


    ctx.fillStyle =
        "#f1f1f1";

    ctx.fillRect(
        bed.x + 10,
        bed.y + 10,
        60,
        70
    );


    ctx.fillStyle =
        "#aaa9a5";

    ctx.fillRect(
        bed.x + 70,
        bed.y + 10,
        100,
        70
    );


    ctx.fillStyle =
        "#333";

    ctx.font =
        "13px Arial";

    ctx.fillText(
        "BED",
        bed.x + 75,
        bed.y + 55
    );

}


// =====================================================
// TABLE
// =====================================================

function drawTable() {

    ctx.fillStyle =
        "#786957";

    ctx.fillRect(
        table.x,
        table.y,
        table.width,
        table.height
    );


    // Laptop

    ctx.fillStyle =
        "#333";

    ctx.fillRect(
        table.x + 40,
        table.y - 30,
        70,
        40
    );


    ctx.fillStyle =
        "#888";

    ctx.fillRect(
        table.x + 45,
        table.y - 25,
        60,
        30
    );


    ctx.fillStyle =
        "#222";

    ctx.font =
        "13px Arial";

    ctx.fillText(
        "STUDY TABLE",
        table.x + 30,
        table.y + 45
    );

}


// =====================================================
// CUPBOARD
// =====================================================

function drawCupboard() {

    ctx.fillStyle =
        "#827466";

    ctx.fillRect(
        cupboard.x,
        cupboard.y,
        cupboard.width,
        cupboard.height
    );


    ctx.fillStyle =
        "#444";

    ctx.beginPath();

    ctx.arc(
        cupboard.x + 55,
        cupboard.y + 75,
        4,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.font =
        "12px Arial";

    ctx.fillText(
        "CUPBOARD",
        cupboard.x + 20,
        cupboard.y + 95
    );

}


// =====================================================
// ROOM DOOR
// =====================================================

function drawRoomDoor() {

    ctx.fillStyle =
        "#675548";

    ctx.fillRect(
        roomDoor.x,
        roomDoor.y,
        roomDoor.width,
        roomDoor.height
    );


    ctx.fillStyle =
        "#eee";

    ctx.font =
        "14px Arial";

    ctx.fillText(
        "DOOR",
        roomDoor.x + 40,
        roomDoor.y + 28
    );

}


// =====================================================
// ROOMMATE
// =====================================================

function drawRoommate() {

    ctx.fillStyle =
        "#55616f";

    ctx.fillRect(
        roommate.x,
        roommate.y,
        roommate.width,
        roommate.height
    );


    ctx.fillStyle =
        "#c99670";

    ctx.beginPath();

    ctx.arc(
        roommate.x + 16,
        roommate.y - 7,
        12,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "#333";

    ctx.font =
        "12px Arial";

    ctx.fillText(
        "Rahul",
        roommate.x - 2,
        roommate.y - 25
    );

}


// =====================================================
// DRAW CORRIDOR
// =====================================================

function drawCorridor() {

    // FLOOR

    ctx.fillStyle =
        "#c9c4bb";

    ctx.fillRect(
        corridor.x,
        corridor.y,
        corridor.width,
        corridor.height
    );


    // BORDER

    ctx.strokeStyle =
        "#555";

    ctx.lineWidth =
        8;

    ctx.strokeRect(
        corridor.x,
        corridor.y,
        corridor.width,
        corridor.height
    );


    // TITLE

    ctx.fillStyle =
        "#444";

    ctx.font =
        "18px Arial";

    ctx.fillText(
        "Hostel - First Floor Corridor",
        60,
        465
    );


    drawCorridorDoor(
        corridorRoom101,
        "101"
    );


    drawCorridorDoor(
        corridorRoom102,
        "102"
    );


    drawCorridorDoor(
        corridorRoom103,
        "103"
    );


    drawWaterCooler();

    drawBench();

    drawStairs();

}


// =====================================================
// CORRIDOR DOORS
// =====================================================

function drawCorridorDoor(
    door,
    number
) {

    ctx.fillStyle =
        "#6e5848";

    ctx.fillRect(
        door.x,
        door.y,
        door.width,
        door.height
    );


    ctx.fillStyle =
        "#ffffff";

    ctx.font =
        "14px Arial";

    ctx.fillText(
        `ROOM ${number}`,
        door.x + 20,
        door.y + 23
    );

}


// =====================================================
// WATER COOLER
// =====================================================

function drawWaterCooler() {

    ctx.fillStyle =
        "#d5d9da";

    ctx.fillRect(
        waterCooler.x,
        waterCooler.y,
        waterCooler.width,
        waterCooler.height
    );


    ctx.fillStyle =
        "#777";

    ctx.fillRect(
        waterCooler.x + 7,
        waterCooler.y + 15,
        40,
        25
    );


    ctx.fillStyle =
        "#333";

    ctx.font =
        "11px Arial";

    ctx.fillText(
        "WATER",
        waterCooler.x + 8,
        waterCooler.y + 58
    );

}


// =====================================================
// BENCH
// =====================================================

function drawBench() {

    ctx.fillStyle =
        "#786957";

    ctx.fillRect(
        bench.x,
        bench.y,
        bench.width,
        bench.height
    );


    ctx.fillStyle =
        "#eee";

    ctx.font =
        "12px Arial";

    ctx.fillText(
        "BENCH",
        bench.x + 62,
        bench.y + 33
    );

}


// =====================================================
// STAIRS
// =====================================================

function drawStairs() {

    ctx.fillStyle =
        "#777";

    ctx.fillRect(
        stairs.x,
        stairs.y,
        stairs.width,
        stairs.height
    );


    ctx.strokeStyle =
        "#aaa";

    ctx.lineWidth =
        3;


    for (
        let y =
            stairs.y + 15;

        y <
            stairs.y +
            stairs.height;

        y += 18
    ) {

        ctx.beginPath();

        ctx.moveTo(
            stairs.x,
            y
        );

        ctx.lineTo(
            stairs.x +
            stairs.width,
            y
        );

        ctx.stroke();

    }


    ctx.fillStyle =
        "#fff";

    ctx.font =
        "12px Arial";

    ctx.fillText(
        "STAIRS",
        stairs.x + 22,
        stairs.y + 60
    );

}


// =====================================================
// PLAYER
// =====================================================

function drawPlayer() {

    // BODY

    ctx.fillStyle =
        "#333";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );


    // HEAD

    ctx.fillStyle =
        "#d5a57d";

    ctx.beginPath();

    ctx.arc(
        player.x + 16,
        player.y - 7,
        12,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // NAME

    ctx.fillStyle =
        "#222";

    ctx.font =
        "12px Arial";

    ctx.fillText(
        "You",
        player.x + 5,
        player.y - 24
    );

}


// =====================================================
// DRAW GAME
// =====================================================

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    if (
        currentScene === "room"
    ) {

        drawRoom();

    }


    if (
        currentScene === "corridor"
    ) {

        drawCorridor();

    }


    drawPlayer();

}


// =====================================================
// GAME LOOP
// =====================================================

function gameLoop() {

    movePlayer();

    updateInteractionPrompt();

    draw();


    requestAnimationFrame(
        gameLoop
    );

}


// =====================================================
// START GAME
// =====================================================

updateStats();

updateTime();

gameLoop();