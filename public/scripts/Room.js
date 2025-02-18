class Room {
	constructor(x, y, width, height) {
		this.pos = createVector(x, y);
		this.width = width;
		this.height = height;

		this.entities = [];
	}

	display() {
		fill(255);
		stroke(0);
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}

	handleCollision() {
		for (const entity of this.entities) {
			const newX = constrain(entity.pos.x, this.pos.x, this.pos.x + this.width - entity.width);
			const newY = constrain(entity.pos.y, this.pos.y, this.pos.y + this.height - entity.height);

			entity.setPos(newX, newY);
		}
	}

	update() {

	}

	spawnEntity(entity) {
		const randomX = random(this.pos.x, this.pos.x + this.width - entity.width);
		const randomY = random(this.pos.y, this.pos.y + this.height - entity.height);

		entity.setPos(randomX, randomY);
		this.entities.push(entity);
	}
}
