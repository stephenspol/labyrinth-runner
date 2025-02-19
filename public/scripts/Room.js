class Room {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.outerVertices = this._createOuterVertices(x, y, width, height);
		this.innerVertices = this._createInnerVertices(x, y, width, height, 10).reverse();
		this.outerBody = Matter.Bodies.fromVertices(0, 0, this.outerVertices, {isStatic: true});
		this.innerBody = Matter.Bodies.fromVertices(0, 0, this.innerVertices, {isStatic: true});
		this.composite = Matter.Composite.create({bodies: [this.outerBody, this.innerBody], isStatic: true});
		this.height = height;
		this.width = width;

		Matter.Composite.translate(this.composite, {x: this.height, y: this.width})
	}

	show() {
		beginShape();

		for (const point of this.outerVertices) {
			vertex(point.x, point.y);
		}

		beginContour();
		for (const point of this.innerVertices) {
			vertex(point.x, point.y);
		}
		endContour();

		endShape(CLOSE);
	}

	placeEntityInRoom(entity) {
		const randomX = random(this.x + entity.width/2, this.x + this.width - entity.width/2);
		const randomY = random(this.y + entity.height/2, this.y + this.height - entity.height/2);

		entity.setPos(randomX, randomY);
	}

	_createOuterVertices(x, y, width, height) {
		return [
			{x: x, y: y},
			{x: x + width, y: y},
			{x: x + width, y: y + height},
			{x: x, y: y + height}
		]
	}

	_createInnerVertices(x, y, width, height, thickness) {
		return [
			{x: x + thickness, y: y + thickness},
			{x: x + width - thickness, y: y + thickness},
			{x: x + width - thickness, y: y + height - thickness},
			{x: x + thickness, y: y + height - thickness}
		]
	}
}
