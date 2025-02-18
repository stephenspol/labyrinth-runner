class Player {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.width = 25;
		this.height = 25;

		this.friction = 0.92;
	}

	display() {
		fill(255, 0, 0);
		noStroke();
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);

		this.acc.mult(0);
		this.vel.mult(this.friction);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	setPos(x, y) {
		this.pos.set(x, y)
	}
}