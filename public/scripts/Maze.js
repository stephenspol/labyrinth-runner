class Maze {
	constructor(x, y, width, height, options) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		
		this.cellSize = options?.cellSize ?? 50;

		this.cells = this._generateMaze();
		this.entryPoints = this._createEntryPoints();
		this.composite = Matter.Composite.create();
		Matter.Composite.add(this.composite, this.cells.flat().map(cell => cell.composite));
		Matter.Composite.translate(this.composite, {x: this.x, y: this.y});
		
	}

	show() {
		for (const cell of this.cells.flat()) {
			cell.show();
		}
	}

	_generateMaze() {
		const cells = this._createCells();

		const genStack = [];

		let current = random(cells.flat());
		current.visited = true;

		do {
			let next = this._findNeighbors(current, cells);

			if (next) {
				next.visited = true;
				genStack.push(current);

				this._removeWalls(current, next);
				current = next;
			} else {
				current = genStack.pop();
			}
		} while (genStack.length > 0)

		return cells;
	}

	_createCells() {
		const cells = [];

		const cols = floor(this.width / this.cellSize);
		const rows = floor(this.height / this.cellSize);

		for (let i = 0; i < cols; i++) {
			cells[i] = [];
			for (let j = 0; j < rows; j++) {
				cells[i][j] = new Cell(this.x + (i * this.cellSize/2), this.y + (j * this.cellSize/2), this.cellSize, this.cellSize);
			}
		}

		return cells;
	}

	_findNeighbors(current, cells) {
		const neighbors = [];
		const calculatedCellIndex = this._calculateCellIndex(current);

		if (calculatedCellIndex.y - 1 >= 0) {
			const cell = cells[calculatedCellIndex.x][calculatedCellIndex.y - 1];

			if(!cell.visited) {
				neighbors.push(cell);
			}
		}

		if (calculatedCellIndex.x + 1 <= cells.length - 1) {
			const cell = cells[calculatedCellIndex.x + 1][calculatedCellIndex.y];

			if(!cell.visited) {
				neighbors.push(cell);
			}
		}

		if (calculatedCellIndex.y + 1 <= cells[0].length - 1) {
			const cell = cells[calculatedCellIndex.x][calculatedCellIndex.y + 1];

			if(!cell.visited) {
				neighbors.push(cell);
			}
		}

		if (calculatedCellIndex.x - 1 >= 0) {
			const cell = cells[calculatedCellIndex.x - 1][calculatedCellIndex.y];

			if(!cell.visited) {
				neighbors.push(cell);
			}
		}

		if (neighbors.length > 0) {
			return random(neighbors);
		} else {
			return null;
		}
	}

	_calculateCellIndex(cell) {
		return {x: (cell.x - this.x) / this.cellSize*2, y: (cell.y - this.y) / this.cellSize*2};
	}

	_removeWalls(currentCell, nextCell) {
		const diffX = nextCell.x - currentCell.x;
		const diffY = nextCell.y - currentCell.y;

		if (diffX > 0) {
			nextCell.removeWall('left');
			currentCell.removeWall('right');
		} else if (diffX < 0) {
			nextCell.removeWall('right');
			currentCell.removeWall('left');
		} else if (diffY > 0) {
			nextCell.removeWall('top');
			currentCell.removeWall('bottom');
		} else if (diffY < 0) {
			nextCell.removeWall('bottom');
			currentCell.removeWall('top');
		} else {
			throw new Error('Failed to remove wall. Next cell has the same position as current');
		}
	}

	_createEntryPoints() {
		const cols = this.cells.length;
		const rows = this.cells[0].length;

		let entranceCell = this.cells[0][floor(random(rows))];
		let exitCell = this.cells[cols - 1][floor(random(rows))];

		entranceCell.removeWall('left');
		exitCell.removeWall('right');

		return [entranceCell, exitCell];
	}
}