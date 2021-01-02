//Create variables here
var dogImage, happyDog, dog
var database
var foodS, foodStock
var fedTime, lastFed
function preload()
{
  dogImage=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
 
	//load images here
}

function setup() {
database=firebase.database();

  createCanvas(500,500);
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  dog=createSprite(200,200,10,10);
  dog.scale=0.25
  dog.addImage(dogImage);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
background(46,139,87);

fedTime=database.ref('feedTime');
fedTime.on('value',function(data){
  lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: 12 AM",350,30);
}else{
  text("Last Feed: "+ lastFed +"AM", 350,30)
}

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogHappy);
}
drawSprites();
fill("black")
stroke("white")
text("Food remaining:"+foodS,170,200)
text("Press the up arrow key to feed the dog!",200,10)


  
  //add styles here
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=-0){
    x=o;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
FoodS++;
database.ref('/').update({
  Food:foodS
})
}

function feedDog(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}
