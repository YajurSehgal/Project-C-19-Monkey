//Global Variables
var monkey,monkey_img,obstacle,obstacle_img,banana,banana_img;

var ground,ground_moving,backg,backg_img;

var gameState,PLAY,END,gameOver,gameOver_img,restart,restart_img;

var count;

var bananaGroup,obstaclesGroup;

function preload(){
  
  monkey_img = loadImage("Monkey_01.png");
  
  obstacle_img = loadImage("stone.png");
  
  banana_img = loadImage("Banana.png");
  
  ground_moving = loadImage("ground.jpg");
  
  backg_img = loadImage("jungle.jpg");
  
  gameOver_img=loadImage("gameOver.png");
  
  restart_img = loadImage("restart.png");
  
}


function setup() {
  createCanvas(600,300);
 var monkey = createSprite(40,350,20,50);
monkey.addAnimation("monkey",monkey_img);
monkey.scale = 0.1;

var invisibleGround = createSprite(200,385,400,20);
invisibleGround.visible = false;
monkey.setCollider("rectangle",0,0,250,50);
monkey.debug= false;

var count = 0;

var ObstaclesGroup = new Group();
var bananaGroup = new Group();

textSize(18);
textFont("Georgia");
textStyle(BOLD);

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver = createSprite(200,200,10,10);
gameOver.addAnimation("gameOver",gameOver_img);
var restart = createSprite(200,280,10,10);
restart.addAnimation("restart",restart_img);
}


function draw(){
  if (gameState === PLAY){
    
    count = count + Math.round(getFrameRate()/60);

    monkey.visible = true;
    restart.visible = false;
    
    gameOver.visible = false;
    
     if (keyWentDown("space")&& monkey.y >= 359){
    monkey.velocityY =  -12 ;

  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
  
  
  spawnObstacles();
  spawnBananas();
  
  
  if (ObstaclesGroup.isTouching(monkey)){
  
  gameState= END;
  
     }
    
  }
  
  else if (gameState === END){
    
    ObstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    monkey.visible=false;
    gameOver.visible = true;
    restart.visible = true;
   
    if (mousePressedOver(restart)){
     gameState = PLAY;
     World.frameRate = 0;
     count=0;
    }
    
  }
  
 background(255); 
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,380,10,40);
    obstacle.velocityX = -(6 + 3*count/100);

    obstacle.addAnimation("Stone",stone_img);
    obstacle.scale = 0.09;
    obstacle.lifetime = 100;
    ObstaclesGroup.add(obstacle);
    
  }
}

function spawnBananas() {
  if(  frameCount % 90 === 0) {
  var banana = createSprite(400,380,10,40);
    banana.velocityX = -(6 + 3*count/100);
    banana.addAnimation("Banana",banana_img);
    banana.scale = 0.05;
    banana.lifetime = 100;
    bananaGroup.add(banana);
    var rand=randomNumber(300,390);
    banana.y = rand;
    
  }
}


