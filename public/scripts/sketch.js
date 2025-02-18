let room;
let player;
let playerMovement;

function setup() {
    playerMovement = createVector(0, 0);

    room = new Room(200, 200, 400, 400);
    player = new Player(0, 0);

    createCanvas(800, 800);

    room.spawnEntity(player);
}
  
function draw() {
    background(220);

    player.applyForce(playerMovement);

    player.update();
    room.handleCollision();

    room.display();
    player.display();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        playerMovement.add(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        playerMovement.add(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        playerMovement.add(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        playerMovement.add(-1, 0);
    }
}

function keyReleased() {
    if (keyCode === UP_ARROW) {
        playerMovement.sub(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        playerMovement.sub(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        playerMovement.sub(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        playerMovement.sub(-1, 0);
    }
}