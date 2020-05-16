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

        this.app = new PIXI.Application({ width, height, backgroundColor, resolution: 1 });
        this.grids = new Array(this.gridX);
        for (let i = 0; i < this.gridX; ++i) {
            this.grids[i] = new Array(this.gridY);
            for (let j = 0; j < this.gridY; ++j) {
                const graphics = new PIXI.Graphics();
                graphics.x = i * gridSize;
                graphics.y = j * gridSize;
                graphics.width = gridSize;
                graphics.height = gridSize;
                graphics.tint = backgroundColor;

                const borderSize = 2;

                graphics.beginFill(0xAAAAAA);
                graphics.drawRect(0, 0, gridSize, gridSize);
                graphics.endFill();

                graphics.beginFill(0xFFFFFF, 1);
                graphics.drawRect(borderSize, borderSize, gridSize - 2 * borderSize, gridSize - 2 * borderSize);
                graphics.endFill();

                this.app.stage.addChild(graphics);
                this.grids[i][j] = { sprite: graphics, active: false };
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
        let last = 0;
        for (let j = y; j > last; --j) {
            for (let i = 0; i < this.gridX; ++i) {
                if (this.grids[i][j].active) {
                    last = j - 2;
                }
                this.grids[i][j].sprite.tint = j == 0 ? this.backgroundColor : this.grids[i][j - 1].sprite.tint;
                this.grids[i][j].active = j == 0 ? false : this.grids[i][j - 1].active;
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
        arr.filter(([x, y]) => !this.isOutOfBounds(x, y)).forEach(([x, y]) => this.grids[x][y].active = true);
        let maxY = getSize(type, rot)[1] + y - 1;
        for (let j = Math.max(0, y); j <= maxY; ++j) {
            let full = true;
            for (let i = 0; i < this.gridX; ++i) {
                if (!this.grids[i][j].active) {
                    full = false;
                    break;
                }
            }
            if (full) {
                this.removeRow(j);
            }
        }
    }

    isOutOfBounds(x, y) {
        return x < 0 || x >= this.gridX || y < 0 || y >= this.gridY;
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

    isPlacementValid(type, rot, x, y) {
        let blocks = getGrids(type, rot, x, y);
        for (let pos of blocks) {
            if (this.isOutOfBounds(pos[0], pos[1]) || this.grids[pos[0]][pos[1]].active) {
                return false;
            }
        }
        return true;
    }

    start() {
        let type, rot, pos;
        let speed = 10;
        let placed = 0, placedNeededToNextLevel = 10;
        let currTime = 0;
        let gridX = this.gridX;
        let currColor;

        function reset() {
            pos = [gridX / 2 - 1, -1];
            type = getRandomType();
            rot = Math.floor(Math.random() * rotates[type]);
            currColor = getRandomColor();
            if (placed >= placedNeededToNextLevel) {
                placed = 0;
                speed = Math.max(10, speed - 1);
            }
        }

        reset();

        const eventHandler = (e) => {
            const k = e.key.toLowerCase();
            const l = k === "arrowleft";
            const r = k === "arrowright";
            const down = k === "s";
            const d = k === "d";
            const a = k === "a";
            if (l || r || down || d || a) {
                let width = getSize(type, rot)[0];
                this.draw(type, rot, pos[0], pos[1], null);
                if (l) {
                    let nextX = Math.max(0, pos[0] - 1);
                    let grids = getGrids(type, rot, nextX, pos[1]);
                    if (!grids.find(grid => this.grids[grid[0]][grid[1]] && this.grids[grid[0]][grid[1]].active)) {
                        pos[0] = nextX;
                    }
                } else if (r) {
                    let nextX = Math.min(this.gridX - width, pos[0] + 1);
                    let grids = getGrids(type, rot, nextX, pos[1]);
                    if (!grids.find(grid => this.grids[grid[0]][grid[1]] && this.grids[grid[0]][grid[1]].active)) {
                        pos[0] = nextX;
                    }
                } else if (down) {
                    while (!this.collides(type, rot, pos[0], pos[1])) {
                        ++pos[1];
                    }
                } else if (d) {
                    let nextRot = (rot + 1) % rotates[type];
                    if (this.isPlacementValid(type, nextRot, pos[0], pos[1])) {
                        rot = nextRot;
                    }
                } else if (a) {
                    const mod = rotates[type];
                    let nextRot = (((rot - 1) % mod) + mod) % mod;
                    if (this.isPlacementValid(type, nextRot, pos[0], pos[1])) {
                        rot = nextRot;
                    }
                }
                width = getSize(type, rot)[0];
                if (pos[0] + width >= this.gridX) {
                    pos[0] = this.gridX - width;
                }
                this.draw(type, rot, pos[0], pos[1], currColor);
            }
        }

        window.addEventListener("keydown", eventHandler);
        this.destroyKeyEvents = function () {
            window.removeEventListener("keydown", eventHandler);
        }

        this.app.ticker.add(delta => {
            if (this.grids[gridX / 2 - 1][0].active) {
                const text = new PIXI.Text("Game Over!", { fontFamily: 'Arial', fontSize: 24, fill: 0xFFFFFF, align: 'center', fontWeight: "bolder", dropShadow: true, dropShadowColor: 0, blur: 5 });
                text.x = (this.app.screen.width - text.width) / 2;
                text.y = (this.app.screen.height - text.height) / 2;
                this.app.stage.addChild(text);
                this.app.ticker.stop();
            }
            currTime += delta;
            if (currTime > speed) {
                let n = Math.floor(currTime / speed);
                currTime %= speed;
                while (n--) {
                    if (this.collides(type, rot, pos[0], pos[1])) {
                        this.place(type, rot, pos[0], pos[1]);
                        reset();
                        break;
                    } else {
                        this.draw(type, rot, pos[0], pos[1], null);
                        ++pos[1];
                    }
                }
            }
            this.draw(type, rot, pos[0], pos[1], currColor);
        });
    }

    destroy() {
        if (this.destroyKeyEvents) {
            this.destroyKeyEvents();
        }
        this.app.destroy();
    }
}

function getSize(type, rot) {
    const arr = getGrids(type, rot, 1, 1);
    let ansX = 1, ansY = 1;
    arr.forEach(e => {
        ansX = Math.max(e[0], ansX);
        ansY = Math.max(e[1], ansY);
    });
    return [ansX, ansY];
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
                return builder.add(1, 0).down().down().left().result;
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