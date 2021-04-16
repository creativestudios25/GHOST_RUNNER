//VARIABLE DECLARATION

//SPRITES
var ghost, ghost_pic;
var tower, tower_pic;
var door, door_pic, climber, climber_pic;

//GROUP
var door_grp;
var climber_grp;
var invisibleBlockGroup, invisibleBlock_1, invisibleBlock_2;

//SOUND
var sound;

//GAMESTATE
var PLAY = 1;
var END = 0;
var gamestate = PLAY;


//LOADING IMAGE
function preload() {

  //BACKGROUND
  tower_pic = loadImage("tower.png");

  //OBSTACLE
  door_pic = loadImage("door.png");
  climber_pic = loadImage("climber.png");

  //SPRITE
  ghost_pic = loadImage("ghost-standing.png")
}


//CREATING SPRITES
function setup() {

  createCanvas(600, 600);

  //CREATING BACKGROUND
  tower = createSprite(300, 300, 50, 50);
  tower.addImage("tower", tower_pic);
  tower.velocityY = 3;

  //CREATING SPRITE
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghost_pic);
  ghost.scale = 0.3299;

  //CREATING GROUP
  door_grp = new Group();
  climber_grp = new Group();
  invisibleBlockGroup = new Group();

  ghost.debug = true;
}


//ON EVENT CODE
function draw() {

  background(0);

  //GAMESTATE CODE
  if (gamestate === PLAY) {

    //RESET BACKGROUND
    if (tower.y > 400) {
      tower.y = 300;
    }

    //GHOST CODE

    //JUMP
    if (keyDown("space")) {
      ghost.velocityY = -5
    }

    //MOVE
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 5;
    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 5;
    }
    ghost.velocityY = ghost.velocityY + 0.5;
    ghost.depth = ghost.depth + 1;


    //OBSTACLE CODE
    if (climber_grp.isTouching(ghost) && door_grp.isTouching(ghost)) {
      ghost.velocityY = 0;

    } else if (climber_grp.isTouching(ghost)) {
      gamestate = END;
    }
    
    //END CODE
    if (ghost.y > 610) {
      gamestate = END;
    }


    //END CODE  
  } else if (gamestate === END) {

    //SHOW TEXT
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);

    //STOPING VELOCITY
    ghost.velocityY = ghost.velocityY + 0;

    //DESTROY SPRITE
    door_grp.destroyEach();
    climber_grp.destroyEach();

    //RESET BACKGROUND
    tower.y = 300;
    tower.velocityY = 0;
  }

  //CREATE EDGES
  var invisibleBlock_1 = createSprite(40, 300, 50, 600);
  var invisibleBlock_2 = createSprite(560, 300, 50, 600)

  //EDGE PROPERTY
  invisibleBlock_1.visible = false;
  invisibleBlock_2.visible = false;

  //ADDING TO GROUP
  invisibleBlockGroup.add(invisibleBlock_1);
  invisibleBlockGroup.add(invisibleBlock_2);

  ghost.collide(invisibleBlockGroup);

  createObstacle();

  drawSprites();
}



//CREATINGG OBSTACLE
function createObstacle() {

  if (frameCount % 240 === 0) {

    //CREATING SPRITE
    door = createSprite(200, -50);
    door.addImage("door", door_pic);

    climber = createSprite(200, 15);
    climber.addImage("climber", climber_pic);


    //OBSTACLE PROPERTIES
    door.velocityY = 1.4;
    door.x = Math.round(random(140, 470));
    door.lifetime = 800;

    climber.velocityY = 1.4;
    climber.x = door.x;
    climber.lifetime = 800;

    //ADDING TO GROUP
    door_grp.add(door);
    climber_grp.add(climber);
  }
}