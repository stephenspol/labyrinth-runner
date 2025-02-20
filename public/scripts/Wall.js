class Wall {
	constructor(x, y, width, height) {
		this.height = height;
		this.width = width;
		this.body = Matter.Bodies.rectangle(x, y, width, height, {isStatic: true})
	}

	show() {
		push();
		noStroke();
		fill(0);
		translate(this.body.position.x, this.body.position.y);
		rotate(this.body.angle);
		rectMode(CENTER);
		rect(0, 0, this.width, this.height);
		pop();	
	}

}
