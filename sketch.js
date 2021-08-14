var gameState = PLAY, PLAY = 1, END = 0;
function preload(){
forest_background = loadImage("forest.jpg");
spottedDeer = loadImage("deer/spotteddeer.png");
cheetahImage = loadImage("cheetah/cheetah.png");
log = loadImage("log_cartoon.png");
rock = loadImage("rock.png");
gameOver = loadImage("gameOver.png");
}

function setup() {
 createCanvas(windowWidth, windowHeight);
 forest =  createSprite(width/2, 320);
 forest.addImage(forest_background);
 forest.scale = 1.7;

 spotted_deer = createSprite(700,height-100,20,50);
 spotted_deer.addImage(spottedDeer);
 spotted_deer.scale = 0.15;

 cheetah = createSprite(220, height-75, 20, 50);
 cheetah.addImage(cheetahImage);
 cheetah.scale = 0.4;

 obstaclesGroup = createGroup();
 secondGround = createSprite(700, height-30, 400, 20);
 secondGround.visible = false;
}

function draw() {
 background(0);
 if (gameState==PLAY){
  forest.velocityX = -3;
 if(forest.x<0){
     forest.x = forest.width/2;
 }
 if ((keyDown("space")) && (spotted_deer.y>=100)){
 spotted_deer.velocityY = -10;
}
 spotted_deer.velocityY = spotted_deer.velocityY + 0.8;
 spawnObstacles();
 if(obstacleGroup.isTouching(spotted_deer)){
  gameState = END;
}
}
 
 drawSprites();
 spotted_deer.collide(secondGround);
}
function spawnObstacles() {
    if(frameCount % 100 === 0) {
      var obstacle = createSprite(970,height-54,20,30);
      obstacle.setCollider('circle',0,0,45)
      // obstacle.debug = true
    
      obstacle.velocityX = (-3);
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(log);
                break;
        case 2: obstacle.addImage(rock);
                break;
        default: break;
      }
      }
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.15;
      obstacle.lifetime = 176;
      obstacle.depth = spotted_deer.depth;
      spotted_deer.depth +=1;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
