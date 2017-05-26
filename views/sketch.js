var food = [];
var splits = false;
var seconds = 0;
var gameTime = 0;
var splittedCells = [];
var sum = 0;
var zoom = 1;

function setup() {
    createCanvas(1000, 600);
    cell = new Cell(width/2, height/2, 60 , color(random(10, 255), random(10, 255), 0));

    for (var i = 0; i < 1000 ; i++){
	c = color(random(100, 255), random(100, 255), 200);
	food.push(new Cell(random(0, width), random(0, height), 10, c));
    }
    
}
function draw(){
    background(300);

    // translate(width / 2, height / 2);
    // var newzoom = 64 / cell.r;
    // zoom = lerp(zoom, newzoom, 0.1);
    // scale(zoom);
    // translate(-cell.pos.x, -cell.pos.y);

    for (var i = 0; i < food.length - 1 ; i++){
	food[i].show();
    }
    if (!splits){
	cell.show();
	cell.update();
	fill(1);
	textSize(cell.r/5);
	text("Receita Federal", cell.pos.x - cell.r/2, cell.pos.y, 1);
	
    }

    for (var i = 0; i < food.length - 1 ; i++){
	if (cell.eats(food[i])){
	    food.splice(i,1);
	}
    }

    if (splits){

	for (var j = 0; j < splittedCells.length ; j++){
	    splittedCells[j].update();
	    splittedCells[j].show();
	    fill(1);
	    textSize(splittedCells[j].r/5);
	    text("Receita Federal", splittedCells[j].pos.x - splittedCells[j].r/2, splittedCells[j].pos.y, 1);

	    
	    for (var i = 0; i < food.length - 1 ; i++){
		if (splittedCells[j].eats(food[i])){
		    food.splice(i,1);
		}
	    }
	}
	
	if (seconds >= 30*60){
	    splits = false;

	    for (var i = 0; i < splittedCells.length; i++){
		sum += PI * splittedCells[i].r * splittedCells[i].r;
		cell.r = sqrt(sum / PI);
	    }
	}
	seconds += 1;
    }

    if (gameTime >= 10*60){
	for (var i = 0; i < 50 ; i++){
	    c = color(random(100, 255), random(100, 255), 200);
	    food.push(new Cell(random(0, width), random(0, height), 10, c));
	}
	gameTime = 0;
    }
    gameTime += 1;
    
}
function keyPressed(){
    if (key == ' '){
	splits = true;
	splittedCells.push(cell.split());
	splittedCells.push(cell.split());
	splittedCells[0].pos.x += splittedCells[1].r;
	seconds = 0;
	
    }
}
