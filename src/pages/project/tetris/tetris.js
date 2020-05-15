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
        this.grids = new Array(this.gridX);
        for (let i = 0; i < this.gridX; ++i) {
            this.grids[i] = new Array(this.gridY);
            for (let j = 0; j < this.gridY; ++j) {
                const sprite = new PIXI.Sprite.from(PIXI.Texture.WHITE);
                sprite.x = i * gridX;
                sprite.y = j * gridY;
                sprite.width = gridSize;
                sprite.height = gridSize;
                sprite.tint = backgroundColor;
                this.app.stage.addChild(sprite);
                this.grids[i][j] = { sprite, active: false };
            }
        }
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

    draw(type, rot, x, y, drawColor) {
        const arr = getGrids(type, rot, x, y);
        const color = drawColor || this.backgroundColor;
        arr.filter(([x, y]) => x >= 0 && x < this.gridX && y >= 0 && y < this.gridY).forEach(([x, y]) => this.grids[x][y].sprite.tint = color);
    }

    place(type, rot, x, y) {
        const arr = getGrids(type, rot, x, y);
        arr.filter(([x, y]) => x >= 0 && x < this.gridX && y >= 0 && y < this.gridY).forEach(([x, y]) => this.grids[x][y].active = true);
    }

    collides(type, rot, x, y) {
        const arr = getGrids(type, rot, x, y);
        return arr.find(grid => {
            if (grid[1] + 1 == this.gridY) {
                return true;
            }
            const obj = this.grids[grid[0]][grid[1] + 1];
            if (!obj) {
                return false;
            }
            return obj.active;
        });
    }

    start() {
        let type, rot, pos;
        let speed = 15;
        let placed = 0, placedNeededToNextLevel = 10;
        let currTime = 0;
        let gridX = this.gridX;
        let currColor;

        function reset() {
            pos = [gridX / 2, -2];
            type = getRandomType();
            rot = Math.floor(Math.random() * rotates[type]);
            currColor = getRandomColor();
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
                    this.place(type, rot, pos[0], pos[1]);
                    reset();
                } else {
                    ++pos[1];
                    this.draw(type, rot, pos[0], pos[1], null);
                }
            }
            this.draw(type, rot, pos[0], pos[1], currColor);
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
        ++this.last[1];
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
            } else {
                return builder.add(0, 0).down().right().down().result;
            }
        }
        case 'z': {
            if (rot) {
                return builder.add(0, 0).right().down().right().result;
            } else {
                return builder.add(1, 0).down().left().down().result;
            }
        }
        case 't': {
            if (rot == 3) {
                return builder.add(0, 0).right().right().add(-1, 1).result;
            } else if (rot == 2) {
                return builder.add(0, 0).down().down().add(1, -1).result;
            } else if (rot == 1) {
                return builder.add(0, 1).right().right().add(-1, -1).result;
            } else {
                return builder.add(1, 0).down().down().add(-1, -1).result;
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
            } else {
                return builder.add(0, 0).right().right().right().result;
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
        }
    }
}