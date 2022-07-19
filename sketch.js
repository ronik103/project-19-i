var END = 0;
var PLAY = 1;
var gameState = PLAY;

var girl,zombie;
var ground, invisibleGround, groundImage;
var girlRunning, zombieRunning;
var gameOverImg;
var score;
var checkPointsound;

function preload(){
  girlRunning = loadImage("running girl.gif");
  zombieRunning = loadImage("zombie running.gif");
  
  groundImage = loadImage("ground2.png");
  gameOverImg = loadImage("Game Over.png");

  checkPointsound = loadSound("checkpoint.mp3");
}

function setup() {
 createCanvas(600,600);

 score = 0

 girl = createSprite(70, 150, 30, 30);
 girl.addImage(girlRunning);
 girl.scale = 0.5;

 zombie = createSprite(20, 150, 30, 30);
 zombie.addImage(zombieRunning);
 zombie.scale = 0.5;

 ground = createSprite(200,190,300,30);
 ground.addImage("ground", groundImage);
 ground.x = ground.width/2

 gameOverImg = createSprite(300,150);
 gameOverImg.addImage("Game Over.png");
 gameOverImg.scale = windowWidth, windowHeight;

 invisibleGround = createSprite(200,200,400,20);
 invisibleGround.visible = false;

 girl.debug = true;
 girl.setCollider("RECTANGLE",0,0,400,girl.height);

 obstacleGroup = createGroup();
}

function draw() {
  background(0);
  
  text("Score: "+ score, 550,50);

  if(gameState === PLAY) {
    gameOverImg.visible = false;

    ground.velocityX = -(2 + 1* score/100);
    
    score = score + Math.round(getFrameRate()/60);

    if(score>0 && score%100 === 0) {
      checkPointsound.play();
    }
    
    if(ground.x < 0) {
      ground.x = ground.width/2;
    }
    
    if(keyDown(SPACE) && girl.y >= 156){
      girl.velocityY = 12;
    }
    girl.velocityY = girl.velocityY + 1

    
  } 
  else if(gameState === END) {
    gameOverImg.visible = true;

    ground.velocityX = 0;
    girl.velocityY = 0;
  }
  drawSprites();
}