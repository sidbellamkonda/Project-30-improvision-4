const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var holder,polygon,ground;
var stand1,stand2;
var polygon;
var slingShot;
var polygon_img;
var score = 0;
var gameState = "onSling";

function preload(){
  polygon_img=loadImage("polygon.png");
}

function setup() {
  createCanvas(1200,700);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ground = new Ground();
  stand1 = new Stand(560,400,250,10);
  stand2 = new Stand(950,300,200,10);
 
  //level one
  block1 = new Block(470,375,30,40);
  block2 = new Block(500,375,30,40);
  block3 = new Block(530,375,30,40);
  block4 = new Block(560,375,30,40);
  block5 = new Block(590,375,30,40);
  block6 = new Block(620,375,30,40);
  block7 = new Block(650,375,30,40);
  //level two
  block8 = new Block(500,335,30,40);
  block9 = new Block(530,335,30,40);
  block10 = new Block(560,335,30,40);
  block11 = new Block(590,335,30,40);
  block12 = new Block(620,335,30,40);
  //level three
  block13 = new Block(530,295,30,40);
  block14 = new Block(560,295,30,40);
  block15 = new Block(590,295,30,40);
  //top
  block16 = new Block(560,255,30,40);

  //set 2 for second stand
  //level one
  blocks1 = new Block(890,275,30,40);
  blocks2 = new Block(920,275,30,40);
  blocks3 = new Block(950,275,30,40);
  blocks4 = new Block(980,275,30,40);
  blocks5 = new Block(1010,275,30,40);
  //level two
  blocks6 = new Block(920,235,30,40);
  blocks7 = new Block(950,235,30,40);
  blocks8 = new Block(980,235,30,40);
  //top
  blocks9 = new Block(950,195,30,40);

  //polygon holder with slings
  polygon = Bodies.circle(195,350,20);
  this.polygon.restitution = 0.3;
  this.polygon.friction = 0.001;
  World.add(world,polygon);
  
  slingShot = new Slingshot(this.polygon,{x:195,y:350});

}

function draw() {
  background(272,142,113); 
  //Engine.update(engine);
  fill("white");
  stroke(5);
  textSize(15);
  text(mouseX + ', ' + mouseY, 10, 15);
  textSize(30);
  stroke(5);
  text("Drag the polygon to destroy the blocks",300,30);
  text("Score: " + score, 900, 75);
  ground.display();
  stand1.display();
  stand2.display();
  strokeWeight(2);
  stroke(15);
  fill("skyblue");
  block1.display();
  block2.display();
  block3.display();
  block4.display();
  block5.display();
  block6.display();
  block7.display();
  fill("pink");
  block8.display();
  block9.display();
  block10.display();
  block11.display();
  block12.display();
  fill("turquoise");
  block13.display();
  block14.display();
  block15.display();
  fill("grey");
  block16.display();
  fill("skyblue");
  blocks1.display();
  blocks2.display();
  blocks3.display();
  blocks4.display();
  blocks5.display();
  fill("turquoise");
  blocks6.display();
  blocks7.display();
  blocks8.display();
  fill("pink")
  blocks9.display();
  fill("gold");
  imageMode(CENTER)
  image(polygon_img ,polygon.position.x,polygon.position.y,40,40);

  slingShot.display();
  
  block1.score();
  block2.score();
  block3.score();
  block4.score();
  block5.score();
  block6.score();
  block7.score();
  block8.score();
  block9.score();
  block10.score();
  block11.score();
  block12.score();
  block13.score();
  block14.score();
  block15.score();
  block16.score();

  blocks1.score();
  blocks2.score();
  blocks3.score();
  blocks4.score();
  blocks5.score();
  blocks6.score();
  blocks7.score();
  blocks8.score();
  blocks9.score();

  keyPressed();
  end();
}

function mouseDragged(){
  if (gameState === "onSling" || gameState === "onSling2"){
    Matter.Body.setPosition(this.polygon,{x:mouseX,y:mouseY});
  }
}

function mouseReleased(){
  if (gameState === "onSling"){
    slingShot.fly();
    gameState = "launched";
  }
  if (gameState === "onSling2"){
    slingShot.fly();
    gameState = "launched2";
  }
}

function keyPressed(){
  if(gameState === "launched"){
    fill("white");
    textSize(20);
    text("Press 'SPACE' to get a second chance to play!",775 ,630);
  }

  if(keyCode === 32 && gameState == "launched"){
    Matter.Body.setPosition(this.polygon, {x:195, y:350});
    slingShot.attach(this.polygon);
    gameState = "onSling2";
  }
}

function end(){
  if(gameState === "launched2"){
    fill("white");
    textSize(40);
    text("Final score: " + score, 80, 200);
    fill("white");
    textSize(15);
    text("Reload your screen to try again", 80, 230);
  }
}