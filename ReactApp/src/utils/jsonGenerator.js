// file system module to perform file operations
const fs = require("fs");

const police = [];

const initialPosition = {
  z: -7.39,
  y: 0.4,
  x: -6,
};

const position = { ...initialPosition };

const rows = 10;
const columns = 6;
const numberOfBookshelfs = 10;

for (let i = 0; i < numberOfBookshelfs; i++) {
  for (let j = 0; j < rows; j++) {
    for (let k = 0; k < columns; k++) {
      police.push({
        udk: [i * columns * rows + j * columns + k],
        pozicija: { ...position },
        rotacija: i % 2 === 0 ? 0 : 180,
      });
      position.y = Math.round((position.y + 0.64) * 100) / 100;
    }
    position.y = initialPosition.y;
    position.x = Math.round((position.x + 2) * 100) / 100;
  }
  position.x = initialPosition.x;
  let premik = 2.39;
  if (i % 2 === 1) premik = 0.5;
  position.z = Math.round((position.z + premik) * 100) / 100;
}

fs.writeFile("../data.json", JSON.stringify({ police }), "utf8", (err) => {});
