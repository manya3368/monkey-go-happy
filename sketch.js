var monkey;
var gameState="PLAY";
var stonegroup, stoneImage;
var food;
var foodgroup;
var score=0;
var back;


function preload(){
  monkeyimg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_09.png");
 backImage = loadImage("jungle.jpg");
  stoneImage = loadImage("stone.png"); 
 foodimg     = loadImage("banana.png");
  
}

function setup() {
  createCanvas(600,400);
  
  back = createSprite(300,200,1000,800);
  back.addImage("back",backImage);
  back.x = back.width /2;
  back.velocityX = -4;
  back.scale=1.2 ;
  
  monkey = createSprite(50,390,20,50);
  monkey.addAnimation("monkey", monkeyimg)
  monkey.scale = 1/8;
  
  Ground = createSprite(200,390,1000,10);
 Ground.visible = false;
  

foodgroup = new Group();
  stonegroup = new Group();
  
}

function draw() {
  background(220);
  monkey.debug=true;
  
  if(gameState==="PLAY"){
if (back.x < 0){
    back.x = back.width/2;   
  }
    back.velocityX = -5;
  if(keyDown("space") && monkey.y>=330) {
    monkey.velocityY = -20;
  
}
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(foodgroup.isTouching(monkey)){
    foodgroup.destroyEach();
    score=score+2;
  }
  if(stonegroup.isTouching(monkey)){
    monkey.scale=1/8 ;
  }
  switch(score){
    case 10 : monkey.scale=0.14;
      break;
      case 20 : monkey.scale=0.16;
      break;
      case 30 : monkey.scale=0.18;
      break;
        case 40 : monkey.scale=0.20;
      break;
      default:break;      
  }
   if(stonegroup.isTouching(monkey) && monkey.scale===1/8){ 
     gameState="END";
   }
  }
  else if(gameState==="END"){
    stonegroup.destroyEach();
 foodgroup.destroyEach();
     back.velocityX=0;
      monkey.velocityY=0;
      monkey.velocityX =0;
      stonegroup.setVelocityXEach(0);
      foodgroup.setVelocityXEach(0);
        stonegroup.setLifetimeEach(-1);
      foodgroup.setLifetimeEach(-1); 
    if(keyDown("r")){
     reset();
    }
    }
  
  createEdgeSprites();
   monkey.collide(Ground); 

  obstacles();
  banana();
  
  drawSprites();
  
  fill("white");
  textSize(25);
  text("Score: "+ score, 280,50);
  
}

function banana() {
  if (frameCount % 60 === 0) {
   food = createSprite(600,280,40,10);
    food.y = Math.round(random(100,200));
    food.addImage("food",foodimg);
    food.scale = 1/14;
    food.velocityX = -8   ;
    food.lifetime = 200;
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   foodgroup.add(food);
  }}

function obstacles() {
  if(frameCount % 120 === 0) {
     stone = createSprite(600,360,10,40);  
   stone.velocityX = -5 ;
   stone.scale = 1/8;
    stone.lifetime = 300;
    stone.addImage("stone",stoneImage);
  stonegroup.add(stone);
  
  }}

function reset(){
  monkey.x=50;
  monkey.y=390;
  gameState="PLAY"  ;
stonegroup.destroyEach();
 foodgroup.destroyEach();
score=0;
}