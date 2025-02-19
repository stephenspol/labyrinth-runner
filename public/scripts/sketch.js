let runner;
let engine;
let world;

let room;
let player;
let playerMovement;

function setup() {
    playerMovement = Matter.Vector.create(0, 0);

    room = new Room(200, 200, 400, 400);
    player = new Player(0, 0);

    createCanvas(800, 800);

    runner = Matter.Runner.create();
    engine = Matter.Engine.create({gravity: {scale: 0}});
    world = engine.world;

    Matter.Runner.run(runner, engine);
    Matter.Composite.add(world, room.composite);
    Matter.Composite.add(world, player.body);

    room.placeEntityInRoom(player);

    Matter.Events.on(engine, "beforeUpdate", event => {
        player.applyForce(playerMovement);
    });

}
  
function draw() {
    background(220);

    room.show();
    player.show();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        playerMovement = Matter.Vector.add(playerMovement, {x: 0, y: -0.0001});
    } else if (keyCode === DOWN_ARROW) {
        playerMovement =Matter.Vector.add(playerMovement, {x: 0, y: 0.0001});
    } else if (keyCode === RIGHT_ARROW) {
        playerMovement = Matter.Vector.add(playerMovement, {x: 0.0001, y: 0});
    } else if (keyCode === LEFT_ARROW) {
        playerMovement = Matter.Vector.add(playerMovement, {x: -0.0001, y: 0});
    }
}

function keyReleased() {
    if (keyCode === UP_ARROW) {
        playerMovement = Matter.Vector.sub(playerMovement, {x: 0, y: -0.0001});
    } else if (keyCode === DOWN_ARROW) {
        playerMovement = Matter.Vector.sub(playerMovement, {x: 0, y: 0.0001});
    } else if (keyCode === RIGHT_ARROW) {
        playerMovement = Matter.Vector.sub(playerMovement, {x: 0.0001, y: 0});
    } else if (keyCode === LEFT_ARROW) {
        playerMovement = Matter.Vector.sub(playerMovement, {x: -0.0001, y: 0});
    }
}