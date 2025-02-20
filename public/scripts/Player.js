class Player {
	constructor(x, y) {
		this.width = 25;
		this.height = 25;
		this.body = Matter.Bodies.rectangle(x, y, this.width, this.height, {friction: 0.92, restitution: 0.8});
	}

	show() {
		push();
		noStroke();
		fill(255, 0, 0);
		translate(this.body.position.x, this.body.position.y);
		rotate(this.body.angle);
		rectMode(CENTER);
		rect(0, 0, this.width, this.height);
		pop();
	}

	applyForce(force) {
		Matter.Body.applyForce(this.body, this.body.position, force);
	}

	setPos(x, y) {
		Matter.Body.setPosition(this.body, {x: x, y: y});
	}
}