const PIXI = require("pixi.js");

const rotates = {
    s: 2,
    z: 2,
    t: 4,
    l: 4,
    i: 2,
    j: 4,
    b: 1,
}

function getRandomColor() {
    const colors = [0xb32020, 0x60b320, 0xb39f20, 0x20b396, 0x202ab3, 0xb320b1];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomType() {
    const arr = Object.keys(rotates);
    return arr[Math.floor(Math.random() * arr.length)];
}

export class TetrisGame {
    constructor(width, height, backgroundColor, gridX, gridY, gridSize) {
        this.backgroundColor = backgroundColor;
        this.gridX = gridX;
        this.gridY = gridY;
        this.gridSize = gridSize;

        this.app = new PIXI.Application({ width, height, backgroundColor, resolution: window.devicePixelRatio || 1 });
        this.container = new PIXI.Container();
        this.container.width = Math.min(gridX * gridSize, width);
        this.container.height = Math.min(gridY * gridSize, height);
        this.app.stage.addChild(container);

        this.grids = new Array(gridX).map((_, x) => new Array(gridY).map((_, y) => {
            const sprite = new PIXI.Sprite.from(PIXI.Texture.WHITE);
            sprite.x = x * gridX;
            sprite.y = y * gridY;
            sprite.width = gridX;
            sprite.height = gridY;
            sprite.tint = backgroundColor;
            container.addChild(sprite);
            return { sprite, active: false };
        }));
    }

    remove(x, y) {
        this.grids[x][y].sprite.tint = this.backgroundColor;
        this.grids[x][y].active = false;
    }

    removeRow(y) {
        for (let i = 0; i < this.gridX; ++i) {
            this.remove(i, y);
        }
        for (let j = y; j < gridY; ++j) {
            for (let i = 0; i < this.gridX; ++i) {
                this.grids[i][j].sprite.tint = j == gridY - 1 ? this.backgroundColor : this.grids[i][j + 1].sprite.tint;
                this.grids[i][j].active = j == gridY - 1 ? false : this.grids[i][j + 1].active;
            }
        }
    }

    set(x, y, color) {
        this.grids[x][y].sprite.tint = color;
        this.grids[x][y].active = true;
    }

    draw(type, rot, x, y, draw) {
        const arr = getGrids(type, rot, x, y);
        const color = draw ? getRandomColor() : this.backgroundColor;
        arr.filter(([x, y]) => x >= 0 && x < this.gridX && y >= 0 && y < this.gridY).forEach(([x, y]) => this.grids[x][y].sprite.tint = color);
    }

    place(type, rot, x, y) {
        const arr = getGrids(type, rot, x, y);
        arr.filter(([x, y]) => x >= 0 && x < this.gridX && y >= 0 && y < this.gridY).forEach(([x, y]) => this.grids[x][y].active = true);
    }

    collides(type, rot, x, y) {
        const arr = getGrids(type, rot, x, y);
        return arr.find(grid => this.grids[grid[0]][grid[1] - 1].active);
    }

    start() {
        let type, rot, pos;
        let speed = 500;
        let placed = 0, placedNeededToNextLevel = 10;
        let currTime = 0;

        function reset() {
            pos = [gridX / 2, gridY];
            type = getRandomType();
            rot = Math.floor(Math.random() * rotates[type]);
            if (placed > placedNeededToNextLevel) {
                placed = 0;
                speed = Math.max(10, speed - 10);
            }
        }

        reset();

        this.app.ticker.add(delta => {
            currTime += delta;
            if (currTime > speed) {
                currTime %= speed;
                if (this.collides(type, rot, pos[0], pos[1])) {
                    reset();
                    this.place(type, rot, pos[0], pos[1]);
                } else {
                    this.draw(type, rot, pos[0], pos[1], false);
                    --pos[1];
                }
            }
            this.draw(type, rot, pos[0], pos[1], true);
        });
    }
}

class BlockBuilder {
    constructor(x, y) {
        this.last = [x, y];
        this.result = [];
    }

    add(dx, dy) {
        this.last[0] += dx;
        this.last[1] += dy;
        this.result.push([...this.last]);
        return this;
    }

    left() {
        --this.last[0];
        this.result.push([...this.last]);
        return this;
    }

    right() {
        ++this.last[0];
        this.result.push([...this.last]);
        return this;
    }

    down() {
        --this.last[1];
        this.result.push([...this.last]);
        return this;
    }
}

function getGrids(type, rot, x, y) {
    const builder = new BlockBuilder(x, y);
    switch (type) {
        case 's': {
            if (rot) {
                return builder.add(2, 0).left().down().left().result;
                // return [
                //     [x + 1, y],
                //     [x + 2, y],
                //     [x, y - 1],
                //     [x + 1, y - 1]
                // ];
            } else {
                return builder.add(0, 0).down().right().down().result;
                // return [
                //     [x, y],
                //     [x, y - 1],
                //     [x + 1, y - 1],
                //     [x + 1, y - 2]
                // ];
            }
        }
        case 'z': {
            if (rot) {
                return builder.add(0, 0).right().down().right().result;
                // return [
                //     [x, y],
                //     [x + 1, y],
                //     [x + 1, y - 1],
                //     [x + 2, y - 1]
                // ];
            } else {
                return builder.add(1, 0).down().left().down().result;
                // return [
                //     [x + 1, y],
                //     [x + 1, y - 1],
                //     [x, y - 1],
                //     [x, y - 2]
                // ];
            }
        }
        case 't': {
            if (rot == 3) {
                return builder.add(0, 0).right().right().add(-1, -1).result;
            } else if (rot == 2) {
                return builder.add(0, 0).down().down().add(1, 1).result;
            } else if (rot == 1) {
                return builder.add(0, -1).right().right().add(-1, 1).result;
            } else {
                return builder.add(1, 0).down().down().add(-1, 1).result;
            }
        }
        case 'l': {
            if (rot == 3) {
                return builder.add(0, 0).down().down().right().result;
            } else if (rot == 2) {
                return builder.add(2, 0).down().left().left().result;
            } else if (rot == 1) {
                return builder.add(0, 0).right().down().down().result;
            } else {
                return builder.add(2, 0).left().left().down().result;
            }
        }
        case 'i': {
            if (rot) {
                return builder.add(0, 0).down().down().down().result;
                // return [
                //     [x, y],
                //     [x, y - 1],
                //     [x, y - 2],
                //     [x, y - 3],
                // ];
            } else {
                return builder.add(0, 0).right().right().right().result;
                // return [
                //     [x, y],
                //     [x + 1, y],
                //     [x + 2, y],
                //     [x + 3, y],
                // ];
            }
        }
        case 'j': {
            if (rot == 3) {
                return builder.add(0, 0).down().down().left().result;
            } else if (rot == 2) {
                return builder.add(0, 0).right().right().down().result;
            } else if (rot == 1) {
                return builder.add(1, 0).left().down().down().result;
            } else {
                return builder.add(0, 0).down().right().right().result;
            }
        }
        case 'b': {
            return builder.add(0, 0).right().down().left().result;
            // return [
            //     [x, y],
            //     [x + 1, y],
            //     [x + 1, y - 1],
            //     [x, y - 1]
            // ]
        }
    }
}