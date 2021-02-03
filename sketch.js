var bg,bgImg
var bd1,bdImg
var bd2,bd2Img
var gd1,gd1Img
var gd2,gd2Img
var ob1,ob2,ob3,ob4,ob5,ob6
var girl,girl_run,girl_stop
var ground
var PLAY=1
var END=0,gameState=PLAY
var spray,sprayImg



function preload(){
bgImg=loadImage("images/ClipartKey_539664.png")

bdImg=loadAnimation("images/badperson1.png","images/badperson2.png","images/badperson3.png");
bd2Img=loadAnimation("images/bd3.png","images/bd2.png","images/bd1.png")

gd1Img=loadAnimation("images/gd1.png","images/gd2.png","images/gd2.png")

gd2Img=loadAnimation("images/gp1.png","images/gp2.png","images/gp3.png")

girl_stop=loadAnimation("images/girl1.png")

sprayImg=loadImage("images/spray.png")



ob1=loadImage("images/ob1.png")
ob2=loadImage("images/ob2.png")
ob3=loadImage("images/ob3.png")
ob4=loadImage("images/ob4.png")
ob5=loadImage("images/ob5.png")
ob6=loadImage("images/ob6.png")

girl_run=loadAnimation("images/girl1.png","images/girl2.png","images/girl3.png")

}






function setup() {
  createCanvas(800,1000);
  
  bg=createSprite(1000,400,1000,400);
  bg.addImage(bgImg)
  bg.velocityX=-2;
  bg.scale=1.5;

  
  girl=createSprite(400,650,100,100);
  girl.addAnimation("running",girl_run);
  girl.scale=0.9

  ground=createSprite(400,710,200,20);
  ground.visible=false;
  //girl.debug=true;
  girl.setCollider("circle",0,0,60)


obstaclesGroup=new Group();
  
  
  

}

function draw() {

  background(255,255,255);
  if(gameState===PLAY){
    if (bg.x < 0){
      bg.x=bg.width/2
    }
    if(keyDown("space") && girl.y >= 560) {
      girl.velocityY = -12;
    }
  
   girl.velocityY = girl.velocityY + 0.8
    girl.collide(ground);
   // console.log(girl.y)
  
   if(obstaclesGroup.isTouching(girl)){
     gameState=END
     girl.changeAnimation("collided",girl_stop)
   }
  
    spawnObstacles();
    spawnBadperson();
    spawnGoodperson();
    spawnSprays();  
  } 
  else if(gameState===END){
    bg.velocityX=0
    obstaclesGroup.setVelocityXEach(0)
    
    girl.x=400

  }
  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,680,10,40);
   
    //obstacle.debug = true;
    obstacle.velocityX = -(6);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(ob1);
              break;
      case 2: obstacle.addImage(ob2);
              break;
      case 3: obstacle.addImage(ob3);
              break;
      case 4: obstacle.addImage(ob4);
              break;
      case 5: obstacle.addImage(ob5);
              break;
      case 6: obstacle.addImage(ob6);
              break;
      default: break;
    }
    obstacle.scale=1.5;
    obstaclesGroup.add(obstacle)
    //obstacle.debug=true;
    obstacle.setCollider("circle",0,0,20)
  }
}

function spawnBadperson(){
  if(frameCount % 400 === 0){
    
    bd1=createSprite(Math.round(random(100,200)),600,100,100);
    bd1.addAnimation("badperson1",bdImg)
    bd1.velocityX=2
    bd1.lifetime=400
    bd1.scale=0.25
  
    bd2=createSprite(Math.round(random(300,400)),600,100,100)
    bd2.addAnimation("badperson2",bd2Img);
    bd2.velocityX=2
    bd2.lifetime=400
    bd2.scale=0.5
  
  }
}

function spawnGoodperson(){
  if(frameCount % 200 === 0){
    
    gd1=createSprite(Math.round(random(500,600)),600,100,100);
  gd1.addAnimation("goodperson1",gd1Img);
  gd1.scale=1.5;
  gd1.velocityX=2
    gd1.lifetime=400
    
  

  gd2=createSprite(Math.round(random(600,700)),600,100,100);
  gd2.addAnimation("goodperson2",gd2Img)
  gd2.velocityX=2
    gd2.lifetime=400
    
  

  }
}

 function spawnSprays(){
   if(frameCount % 120 === 0){
     spray=createSprite(800,500,50,50);
     spray.addImage(sprayImg);
     spray.velocityX=-3
     spray.scale=0.3
     spray.y=Math.round(random(500,600))

   }
 }
