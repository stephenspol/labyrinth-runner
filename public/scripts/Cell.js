class Cell {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;

		this.visited = false;

		this.walls = this._createWalls(10);
		this.composite = Matter.Composite.create();
		Matter.Composite.add(this.composite, Object.values(this.walls).map(wall => wall.body));
		Matter.Composite.translate(this.composite, {x: this.x, y: this.y});
	}

	show() {
		for (const wall of Object.values(this.walls)) {
			wall.show();
		}
	}

	removeWall(edge) {
		const wall = this.walls[edge];
		Matter.Composite.remove(this.composite, wall.body);
		delete this.walls[edge];
	}

	_createWalls(thickness) {
		const top = new Wall(this.x, this.y - this.height / 2, this.width, thickness);
		const right = new Wall(this.x + this.width / 2, this.y, thickness, this.height);
		const bottom = new Wall(this.x, this.y + this.height / 2, this.width, thickness);
		const left = new Wall(this.x - this.width / 2, this.y, thickness, this.height);

		return {top, right, bottom, left};
	}
}
