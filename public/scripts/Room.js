class Room {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;

		this.walls = this._createWalls(10);
		this.composite = Matter.Composite.create();
		Matter.Composite.add(this.composite, this.walls.map(wall => wall.body));
		Matter.Composite.translate(this.composite, {x: this.x, y: this.y});
	}

	show() {
		for (const wall of this.walls) {
			wall.show();
		}
	}

	placeEntityInRoom(entity) {
		const randomX = random(this.x + entity.width, this.x + this.width - entity.width);
		const randomY = random(this.y + entity.height, this.y + this.height - entity.height);

		entity.setPos(randomX, randomY);
	}

	_createWalls(thickness) {
		const topEdge = new Wall(this.x, this.y - this.height / 2, this.width, thickness);
		const rightEdge = new Wall(this.x + this.width / 2, this.y, thickness, this.height);
		const bottomEdge = new Wall(this.x, this.y + this.height / 2, this.width, thickness);
		const leftEdge = new Wall(this.x - this.width / 2, this.y, thickness, this.height);

		return [topEdge, rightEdge, bottomEdge, leftEdge]
	}
}
