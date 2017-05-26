function Cell(x, y, r, c){
    this.pos = createVector(x, y);
    this.r = r;
    this.c = c;

    this.show = function() {
	noStroke();
	fill(c);
	ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    this.update = function(){
	var vel = createVector(pmouseX, pmouseY);
	vel.sub(this.pos);
	vel.setMag(3);
	this.pos.add(vel);
    }
    
    this.eats = function(cell) {
	var d = dist(this.pos.x, this.pos.y, cell.pos.x, cell.pos.y);
	if (d < this.r + cell.r - this.r*0.5) {
	    var sum = PI * this.r * this.r + PI * cell.r * cell.r;
	    this.r = sqrt(sum / PI);
	    return true;
	} else {
	    return false;
	}
    }

    this.split = function(){
    	return new Cell(this.pos.x , this.pos.y, this.r/2, this.c);
    }
}

