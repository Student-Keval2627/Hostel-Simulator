// =====================================================
// HOSTEL LIFE LIVE
// VERSION 0.4
// GROUND FLOOR + MESS SYSTEM
// =====================================================


// =====================================================
// CANVAS
// =====================================================

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");


// =====================================================
// HTML ELEMENTS
// =====================================================

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

const timeText =
    document.getElementById("time");

const dayText =
    document.getElementById("day");

const locationText =
    document.getElementById("location");

const interactionPrompt =
    document.getElementById(
        "interactionPrompt"
    );

const gameMessage =
    document.getElementById(
        "gameMessage"
    );


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


const corridorStairs = {

    x: 730,
    y: 330,

    width: 90,
    height: 110,

    interactionDistance: 95

};


// =====================================================
// GROUND FLOOR
// =====================================================

const groundFloor = {

    x: 40,
    y: 40,

    width: 820,
    height: 440

};


// =====================================================
// GROUND FLOOR OBJECTS
// =====================================================

const reception = {

    x: 90,
    y: 90,

    width: 180,
    height: 80

};


const groundStairs = {

    x: 700,
    y: 90,

    width: 100,
    height: 110,

    interactionDistance: 95

};


const messDoor = {

    x: 700,
    y: 350,

    width: 110,
    height: 70,

    interactionDistance: 90

};


const hostelEntrance = {

    x: 350,
    y: 435,

    width: 160,
    height: 45,

    interactionDistance: 80

};


const groundBench = {

    x: 300,
    y: 250,

    width: 180,
    height: 55

};


// =====================================================
// MESS AREA
// =====================================================

const mess = {

    x: 40,
    y: 40,

    width: 820,
    height: 440

};


// =====================================================
// MESS OBJECTS
// =====================================================

const messCounter = {

    x: 90,
    y: 80,

    width: 230,
    height: 80,

    interactionDistance: 100

};


const messTable1 = {

    x: 200,
    y: 260,

    width: 150,
    height: 70

};


const messTable2 = {

    x: 480,
    y: 260,

    width: 150,
    height: 70

};


const messExit = {

    x: 700,
    y: 400,

    width: 120,
    height: 70,

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


        if (
            key === "arrowup" ||
            key === "arrowdown" ||
            key === "arrowleft" ||
            key === "arrowright"
        ) {

            event.preventDefault();

        }


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
// ROOM COLLISION
// =====================================================

function isRoomBlocked(x, y) {

    const obstacles = [

        bed,
        table,
        cupboard,
        roommate

    ];


    return checkObstacles(
        x,
        y,
        obstacles
    );

}


// =====================================================
// CORRIDOR COLLISION
// =====================================================

function isCorridorBlocked(x, y) {

    const obstacles = [

        waterCooler,
        bench,
        corridorStairs

    ];


    return checkObstacles(
        x,
        y,
        obstacles
    );

}


// =====================================================
// GROUND FLOOR COLLISION
// =====================================================

function isGroundFloorBlocked(x, y) {

    const obstacles = [

        reception,
        groundStairs,
        groundBench

    ];


    return checkObstacles(
        x,
        y,
        obstacles
    );

}


// =====================================================
// MESS COLLISION
// =====================================================

function isMessBlocked(x, y) {

    const obstacles = [

        messCounter,
        messTable1,
        messTable2

    ];


    return checkObstacles(
        x,
        y,
        obstacles
    );

}


// =====================================================
// COMMON OBSTACLE CHECK
// =====================================================

function checkObstacles(
    x,
    y,
    obstacles
) {

    for (
        const obstacle
        of obstacles
    ) {

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
// PLAYER MOVEMENT
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


    if (
        currentScene === "room"
    ) {

        moveInsideArea(
            room,
            moveX,
            moveY,
            isRoomBlocked
        );

    }


    else if (
        currentScene === "corridor"
    ) {

        moveInsideArea(
            corridor,
            moveX,
            moveY,
            isCorridorBlocked
        );

    }


    else if (
        currentScene === "ground"
    ) {

        moveInsideArea(
            groundFloor,
            moveX,
            moveY,
            isGroundFloorBlocked
        );

    }


    else if (
        currentScene === "mess"
    ) {

        moveInsideArea(
            mess,
            moveX,
            moveY,
            isMessBlocked
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


    const dx =
        playerCenterX -
        objectCenterX;

    const dy =
        playerCenterY -
        objectCenterY;


    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}


// =====================================================
// FIND NEARBY OBJECT
// =====================================================

function getNearbyObject() {

    // ROOM

    if (
        currentScene === "room"
    ) {

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

    else if (
        currentScene === "corridor"
    ) {

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
            getDistance(corridorStairs) <
            corridorStairs.interactionDistance
        ) {

            return "corridorStairs";

        }

    }


    // GROUND FLOOR

    else if (
        currentScene === "ground"
    ) {

        if (
            getDistance(groundStairs) <
            groundStairs.interactionDistance
        ) {

            return "groundStairs";

        }


        if (
            getDistance(messDoor) <
            messDoor.interactionDistance
        ) {

            return "messDoor";

        }


        if (
            getDistance(hostelEntrance) <
            hostelEntrance.interactionDistance
        ) {

            return "hostelEntrance";

        }

    }


    // MESS

    else if (
        currentScene === "mess"
    ) {

        if (
            getDistance(messCounter) <
            messCounter.interactionDistance
        ) {

            return "messCounter";

        }


        if (
            getDistance(messExit) <
            messExit.interactionDistance
        ) {

            return "messExit";

        }

    }


    return null;

}


// =====================================================
// INTERACTION PROMPT
// =====================================================

function updateInteractionPrompt() {

    const nearby =
        getNearbyObject();


    const prompts = {

        bed:
            "Press E to Sleep 🛏️",

        table:
            "Press E to Study 📚",

        roommate:
            "Press E to Talk 👋",

        roomDoor:
            "Press E to Enter Corridor 🚪",

        room101:
            "Press E to Enter Room 101 🚪",

        water:
            "Press E to Drink Water 💧",

        corridorStairs:
            "Press E to Go Downstairs 🪜",

        groundStairs:
            "Press E to Go to First Floor 🪜",

        messDoor:
            "Press E to Enter Mess 🍽️",

        hostelEntrance:
            "Press E to Go Outside 🚪",

        messCounter:
            "Press E to Get Food 🍛",

        messExit:
            "Press E to Leave Mess 🚪"

    };


    if (
        nearby &&
        prompts[nearby]
    ) {

        showPrompt(
            prompts[nearby]
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


    else if (
        nearby === "table"
    ) {

        study();

    }


    else if (
        nearby === "roommate"
    ) {

        talkToRoommate();

    }


    else if (
        nearby === "roomDoor"
    ) {

        enterCorridor();

    }


    else if (
        nearby === "room101"
    ) {

        enterRoom();

    }


    else if (
        nearby === "water"
    ) {

        drinkWater();

    }


    else if (
        nearby === "corridorStairs"
    ) {

        enterGroundFloor();

    }


    else if (
        nearby === "groundStairs"
    ) {

        returnToFirstFloor();

    }


    else if (
        nearby === "messDoor"
    ) {

        enterMess();

    }


    else if (
        nearby === "hostelEntrance"
    ) {

        gameMessage.textContent =
            "🚧 Outside hostel area will be added later.";

    }


    else if (
        nearby === "messCounter"
    ) {

        buyFood();

    }


    else if (
        nearby === "messExit"
    ) {

        leaveMess();

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

    if (
        stats.energy < 10
    ) {

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


    gameMessage.textContent =
        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];


    clampStats();

    updateStats();

}


// =====================================================
// ROOM → CORRIDOR
// =====================================================

function enterCorridor() {

    currentScene =
        "corridor";


    player.x =
        170;

    player.y =
        115;


    updateLocation(
        "First Floor Corridor"
    );


    gameMessage.textContent =
        "🚪 You entered the first floor corridor.";

}


// =====================================================
// CORRIDOR → ROOM
// =====================================================

function enterRoom() {

    currentScene =
        "room";


    player.x =
        420;

    player.y =
        380;


    updateLocation(
        "Hostel Room 101"
    );


    gameMessage.textContent =
        "🛏️ You returned to Room 101.";

}


// =====================================================
// CORRIDOR → GROUND FLOOR
// =====================================================

function enterGroundFloor() {

    currentScene =
        "ground";


    player.x =
        650;

    player.y =
        220;


    updateLocation(
        "Hostel Ground Floor"
    );


    gameMessage.textContent =
        "🪜 You came down to the hostel ground floor.";

}


// =====================================================
// GROUND FLOOR → CORRIDOR
// =====================================================

function returnToFirstFloor() {

    currentScene =
        "corridor";


    player.x =
        650;

    player.y =
        280;


    updateLocation(
        "First Floor Corridor"
    );


    gameMessage.textContent =
        "🪜 You returned to the first floor.";

}


// =====================================================
// GROUND FLOOR → MESS
// =====================================================

function enterMess() {

    currentScene =
        "mess";


    player.x =
        650;

    player.y =
        350;


    updateLocation(
        "Hostel Mess"
    );


    gameMessage.textContent =
        "🍽️ You entered the hostel mess.";

}


// =====================================================
// MESS → GROUND FLOOR
// =====================================================

function leaveMess() {

    currentScene =
        "ground";


    player.x =
        620;

    player.y =
        350;


    updateLocation(
        "Hostel Ground Floor"
    );


    gameMessage.textContent =
        "🚪 You left the hostel mess.";

}


// =====================================================
// WATER
// =====================================================

function drinkWater() {

    stats.health += 2;

    stats.mood += 1;


    addTime(5);


    gameMessage.textContent =
        "💧 You drank fresh water.";


    clampStats();

    updateStats();

}


// =====================================================
// MESS FOOD SYSTEM
// =====================================================

function buyFood() {

    let foodName;
    let price;
    let hungerGain;
    let moodGain;


    // BREAKFAST
    // 7 AM - 10 AM

    if (
        gameHour >= 7 &&
        gameHour < 10
    ) {

        foodName =
            "Breakfast - Poha & Tea";

        price = 30;

        hungerGain = 25;

        moodGain = 4;

    }


    // LUNCH
    // 12 PM - 3 PM

    else if (
        gameHour >= 12 &&
        gameHour < 15
    ) {

        foodName =
            "Lunch - Dal, Rice, Roti & Sabji";

        price = 50;

        hungerGain = 45;

        moodGain = 5;

    }


    // DINNER
    // 7 PM - 10 PM

    else if (
        gameHour >= 19 &&
        gameHour < 22
    ) {

        foodName =
            "Dinner - Roti, Sabji & Rice";

        price = 60;

        hungerGain = 50;

        moodGain = 5;

    }


    // OTHER TIME

    else {

        foodName =
            "Maggi & Tea";

        price = 25;

        hungerGain = 18;

        moodGain = 6;

    }


    if (
        stats.money < price
    ) {

        gameMessage.textContent =
            "❌ You don't have enough money.";

        return;

    }


    if (
        stats.hunger >= 100
    ) {

        gameMessage.textContent =
            "😅 You are already full.";

        return;

    }


    stats.money -= price;

    stats.hunger += hungerGain;

    stats.mood += moodGain;

    stats.energy += 3;


    addTime(20);


    clampStats();

    updateStats();


    gameMessage.textContent =
        `🍛 ${foodName} eaten. ₹${price} spent. Hunger +${hungerGain}`;

}


// =====================================================
// UPDATE LOCATION
// =====================================================

function updateLocation(location) {

    locationText.textContent =
        location;

}


// =====================================================
// ADD TIME
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

        displayHour -= 12;

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
// LIMIT STATS
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

    drawArea(
        room,
        "#d8cbb9"
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

    drawStudyTable();

    drawCupboard();

    drawRoomDoor();

    drawRoommate();

}


// =====================================================
// DRAW BED
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


    drawLabel(
        "BED",
        bed.x + 75,
        bed.y + 55
    );

}


// =====================================================
// STUDY TABLE
// =====================================================

function drawStudyTable() {

    ctx.fillStyle =
        "#786957";

    ctx.fillRect(
        table.x,
        table.y,
        table.width,
        table.height
    );


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


    drawLabel(
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


    drawLabel(
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


    drawWhiteLabel(
        "DOOR",
        roomDoor.x + 40,
        roomDoor.y + 28
    );

}


// =====================================================
// ROOMMATE
// =====================================================

function drawRoommate() {

    drawCharacter(
        roommate.x,
        roommate.y,
        "#55616f",
        "#c99670",
        "Rahul"
    );

}


// =====================================================
// CORRIDOR
// =====================================================

function drawCorridor() {

    drawArea(
        corridor,
        "#c9c4bb"
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

    drawBench(
        bench,
        "BENCH"
    );

    drawStairs(
        corridorStairs,
        "DOWN"
    );


    ctx.fillStyle =
        "#444";

    ctx.font =
        "18px Arial";

    ctx.fillText(
        "First Floor Corridor",
        60,
        465
    );

}


// =====================================================
// GROUND FLOOR
// =====================================================

function drawGroundFloor() {

    drawArea(
        groundFloor,
        "#cfc8bb"
    );


    // Reception

    ctx.fillStyle =
        "#795f4d";

    ctx.fillRect(
        reception.x,
        reception.y,
        reception.width,
        reception.height
    );


    drawWhiteLabel(
        "RECEPTION",
        reception.x + 45,
        reception.y + 45
    );


    // Bench

    drawBench(
        groundBench,
        "WAITING BENCH"
    );


    // Stairs

    drawStairs(
        groundStairs,
        "UP"
    );


    // Mess door

    ctx.fillStyle =
        "#805c45";

    ctx.fillRect(
        messDoor.x,
        messDoor.y,
        messDoor.width,
        messDoor.height
    );


    drawWhiteLabel(
        "MESS",
        messDoor.x + 32,
        messDoor.y + 40
    );


    // Entrance

    ctx.fillStyle =
        "#555";

    ctx.fillRect(
        hostelEntrance.x,
        hostelEntrance.y,
        hostelEntrance.width,
        hostelEntrance.height
    );


    drawWhiteLabel(
        "MAIN ENTRANCE",
        hostelEntrance.x + 24,
        hostelEntrance.y + 28
    );


    ctx.fillStyle =
        "#444";

    ctx.font =
        "18px Arial";

    ctx.fillText(
        "Hostel Ground Floor",
        60,
        465
    );

}


// =====================================================
// MESS
// =====================================================

function drawMess() {

    drawArea(
        mess,
        "#d5c8ac"
    );


    // Counter

    ctx.fillStyle =
        "#805c45";

    ctx.fillRect(
        messCounter.x,
        messCounter.y,
        messCounter.width,
        messCounter.height
    );


    drawWhiteLabel(
        "MESS FOOD COUNTER",
        messCounter.x + 40,
        messCounter.y + 45
    );


    // Table 1

    drawMessTable(
        messTable1,
        "TABLE 1"
    );


    // Table 2

    drawMessTable(
        messTable2,
        "TABLE 2"
    );


    // Exit

    ctx.fillStyle =
        "#555";

    ctx.fillRect(
        messExit.x,
        messExit.y,
        messExit.width,
        messExit.height
    );


    drawWhiteLabel(
        "EXIT",
        messExit.x + 40,
        messExit.y + 40
    );


    // Meal timing

    ctx.fillStyle =
        "#333";

    ctx.font =
        "14px Arial";


    ctx.fillText(
        "Breakfast: 7 AM - 10 AM",
        420,
        100
    );


    ctx.fillText(
        "Lunch: 12 PM - 3 PM",
        420,
        125
    );


    ctx.fillText(
        "Dinner: 7 PM - 10 PM",
        420,
        150
    );


    ctx.fillText(
        "Other time: Maggi + Tea",
        420,
        175
    );

}


// =====================================================
// DRAW AREA
// =====================================================

function drawArea(
    area,
    color
) {

    ctx.fillStyle =
        color;

    ctx.fillRect(
        area.x,
        area.y,
        area.width,
        area.height
    );


    ctx.strokeStyle =
        "#555";

    ctx.lineWidth =
        8;

    ctx.strokeRect(
        area.x,
        area.y,
        area.width,
        area.height
    );

}


// =====================================================
// CORRIDOR DOOR
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


    drawWhiteLabel(
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


    drawLabel(
        "WATER",
        waterCooler.x + 8,
        waterCooler.y + 58
    );

}


// =====================================================
// BENCH
// =====================================================

function drawBench(
    object,
    label
) {

    ctx.fillStyle =
        "#786957";

    ctx.fillRect(
        object.x,
        object.y,
        object.width,
        object.height
    );


    drawWhiteLabel(
        label,
        object.x + 35,
        object.y + 33
    );

}


// =====================================================
// STAIRS
// =====================================================

function drawStairs(
    object,
    label
) {

    ctx.fillStyle =
        "#777";

    ctx.fillRect(
        object.x,
        object.y,
        object.width,
        object.height
    );


    ctx.strokeStyle =
        "#aaa";

    ctx.lineWidth =
        3;


    for (
        let y =
            object.y + 15;

        y <
            object.y +
            object.height;

        y += 18
    ) {

        ctx.beginPath();

        ctx.moveTo(
            object.x,
            y
        );

        ctx.lineTo(
            object.x +
            object.width,
            y
        );

        ctx.stroke();

    }


    drawWhiteLabel(
        label,
        object.x + 30,
        object.y + 60
    );

}


// =====================================================
// MESS TABLE
// =====================================================

function drawMessTable(
    object,
    label
) {

    ctx.fillStyle =
        "#8a6f55";

    ctx.fillRect(
        object.x,
        object.y,
        object.width,
        object.height
    );


    drawWhiteLabel(
        label,
        object.x + 45,
        object.y + 40
    );

}


// =====================================================
// CHARACTER
// =====================================================

function drawCharacter(
    x,
    y,
    bodyColor,
    skinColor,
    name
) {

    ctx.fillStyle =
        bodyColor;

    ctx.fillRect(
        x,
        y,
        32,
        42
    );


    ctx.fillStyle =
        skinColor;

    ctx.beginPath();

    ctx.arc(
        x + 16,
        y - 7,
        12,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "#222";

    ctx.font =
        "12px Arial";

    ctx.fillText(
        name,
        x,
        y - 25
    );

}


// =====================================================
// PLAYER
// =====================================================

function drawPlayer() {

    drawCharacter(
        player.x,
        player.y,
        "#333",
        "#d5a57d",
        "You"
    );

}


// =====================================================
// LABEL
// =====================================================

function drawLabel(
    text,
    x,
    y
) {

    ctx.fillStyle =
        "#222";

    ctx.font =
        "12px Arial";

    ctx.fillText(
        text,
        x,
        y
    );

}


// =====================================================
// WHITE LABEL
// =====================================================

function drawWhiteLabel(
    text,
    x,
    y
) {

    ctx.fillStyle =
        "#fff";

    ctx.font =
        "12px Arial";

    ctx.fillText(
        text,
        x,
        y
    );

}


// =====================================================
// DRAW
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


    else if (
        currentScene === "corridor"
    ) {

        drawCorridor();

    }


    else if (
        currentScene === "ground"
    ) {

        drawGroundFloor();

    }


    else if (
        currentScene === "mess"
    ) {

        drawMess();

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
// START
// =====================================================

updateStats();

updateTime();

updateLocation(
    "Hostel Room 101"
);

gameLoop();