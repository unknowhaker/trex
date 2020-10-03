var trex,trexAnim,ground,groundImage,invGround,cloudImage,cloudGroup,trapGroup,trap1,trap2,trap3,trap4,trap5,trap6;
var END=0;
var PLAY=1;
var gamestate=PLAY;
function preload(){
  trexAnim=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  trap1=loadImage("obstacle1.png");
  trap2=loadImage("obstacle2.png");
  trap3=loadImage("obstacle3.png");
  trap4=loadImage("obstacle4.png");
  trap5=loadImage("obstacle5.png");
  trap6=loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);
  trex=createSprite(50,170);
  trex.addAnimation("runningTrex",trexAnim);
  trex.scale=0.5;
  
  ground=createSprite(width/2,height-20);
  ground.addImage(groundImage);
  ground.x=ground.width/2
  
  invGround=createSprite(width/2,height-10,100000,5);
  invGround.visible=false;
  
  cloudGroup=new Group();
  trapGroup=new Group();
}

function draw(){
  background(180);
  trex.collide(invGround);
  if (gamestate===PLAY){
    if (keyDown ("space")&&trex.y>=164){
      trex. velocityY = -8;
    }
    trex.velocityY = trex.velocityY+0.5;
    ground. velocityX = -5;
    if (ground.x<=0){
      ground.x=ground.width/2;
    }

    if (frameCount%60===0){
      funCloud();
    }

    if (frameCount%70===0){
      funTrap();
    }
    
    if (trapGroup.isTouching(trex)){
      gamestate=END;
    }
  }
  else if(gamestate===END){
    ground.velocityX=0;
    cloudGroup.setVelocityXEach(0);
    trapGroup.setVelocityXEach(0);
    trex.velocityY=0;
    cloudGroup.setLifetimeEach(-1);
    trapGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
}
function funCloud(){
  var cloud;
  cloud=createSprite(700,100);
  cloud.addImage(cloudImage);
  cloud.scale=0.7;
  cloud.y=Math.round(random(5,150));
  cloud.velocityX= -3;
  cloud.lifetime=702/3;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloudGroup.add(cloud);
}
function funTrap(){
  var trap,randon;
  trap=createSprite(700,175);
  randon=Math.round(random(1,6));
  trap.scale=0.7;
  trap.velocityX= -4;
  trap.lifetime=700/4;
  trapGroup.add(trap);
  switch(randon){
    case 1: trap.addImage(trap1);
    break;
    case 2: trap.addImage(trap2);
    break;
    case 3: trap.addImage(trap3);
    break;
    case 4: trap.addImage(trap4);
    break;
    case 5: trap.addImage(trap5);
    break;
    case 6: trap.addImage(trap6);
    break;
    default:break;
  }
}