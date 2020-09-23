// lib/app.ts
import express = require("express");
import Canvas = require("canvas");

// Create a new express application instance
const app: express.Application = express();

/*                  S           A           B       C       D           E       NONE
    Power:      149,70 | 149,82 | 149,97 | 149,110 | 149,124 | 149,138 | 149,149
    Speed:      220,111| 209,117| 197,124| 186,131 | 173,138 | 161,145 | 149,149
    Range:      220,191| 209,187| 197,179| 186,172 | 173,166 | 161,159 | 149,149
    Durability: 149,232 | 149,220 | 149,192 | 149,179 | 149,138 | 149,166 | 149,149
    Precision:   79,191 |  89,187 | 100,179 | 114,172 | 126,166 | 137,159 | 149,149
    Potential:   79,111 |  89,117 | 100,124 | 114,131 | 126,138 | 137,145 | 149,149
*/
const PowerX = [149, 149, 149, 149, 149, 149, 149];
const PowerY = [149, 138, 124, 110, 95, 82, 70];
const SpeedX = [149, 161, 173, 186, 197, 209, 220];
const SpeedY = [149, 145, 138, 131, 124, 117, 111];
const RangeX = [149, 161, 173, 186, 197, 209, 220];
const RangeY = [149, 159, 166, 172, 179, 187, 191];
const DurabilityX = [149, 149, 149, 149, 149, 149, 149];
const DurabilityY = [149, 166, 179, 192, 207, 220, 232];
const PrecisionX = [149, 137, 126, 114, 100, 89, 79];
const PrecisionY = [149, 159, 166, 172, 179, 187, 191];
const PotentialX = [149, 137, 126, 114, 100, 89, 79];
const PotentialY = [149, 145, 138, 131, 124, 117, 111];

const drawImage = async (
  power: number,
  speed: number,
  range: number,
  durability: number,
  precision: number,
  potential: number
): Promise<string> => {
  const canvas = Canvas.createCanvas(400, 400);
  return new Promise((res, reject) => {
    const ctx = canvas.getContext("2d");
    const X_OFFSET = 25;
    const Y_OFFSET = 25;

    Canvas.loadImage("src/img/stand-chart.png").then((image) => {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo(PowerX[power] + X_OFFSET, PowerY[power] + Y_OFFSET);
      ctx.lineTo(SpeedX[speed] + X_OFFSET, SpeedY[speed] + Y_OFFSET);
      ctx.lineTo(RangeX[range] + X_OFFSET, RangeY[range] + Y_OFFSET);
      ctx.lineTo(
        DurabilityX[durability] + X_OFFSET,
        DurabilityY[durability] + Y_OFFSET
      );
      ctx.lineTo(
        PrecisionX[precision] + X_OFFSET,
        PrecisionY[precision] + Y_OFFSET
      );
      ctx.lineTo(
        PotentialX[potential] + X_OFFSET,
        PotentialY[potential] + Y_OFFSET
      );
      ctx.closePath();
      ctx.fill();

      ctx.drawImage(image, 0, 0, 350, 350);
      // console.log('<img src="' + canvas.toDataURL() + '" />');
      res('<img src="' + canvas.toDataURL() + '" />');
    });
  });
};

app.get("/", function(req, res) {
  const power = Math.floor(Math.random() * 6) + 1;
  const speed = Math.floor(Math.random() * 6) + 1;
  const range = Math.floor(Math.random() * 6) + 1;
  const durability = Math.floor(Math.random() * 6) + 1;
  const precision = Math.floor(Math.random() * 6) + 1;
  const potential = Math.floor(Math.random() * 6) + 1;

  drawImage(power, speed, range, durability, precision, potential)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
