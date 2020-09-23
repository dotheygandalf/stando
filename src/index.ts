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
  potential: number,
  name: string,
  master: string
): Promise<Buffer> => {
  const canvas = Canvas.createCanvas(750, 550);
  return new Promise((res, reject) => {
    const ctx = canvas.getContext("2d");
    const STAND_X_OFFSET = 0;
    const STAND_Y_OFFSET = 200;

    const X_OFFSET = 25;
    const Y_OFFSET = 25 + STAND_Y_OFFSET;

    ctx.font = "30px Arial";

    Canvas.loadImage("src/img/abstract-clouds.jpg").then((image) => {
      ctx.drawImage(image, 0, 0, 750, 550);

      ctx.globalAlpha = 1.0;
      ctx.fillText("「STAND NAME」", 40, 80);
      ctx.strokeText(name.toUpperCase(), 60, 120);

      ctx.fillText("「STAND MASTER」", 400, 420);
      ctx.strokeText(master.toUpperCase(), 420, 460);

      ctx.globalAlpha = 0.4;
      ctx.fillStyle = "green";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;

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

      Canvas.loadImage("src/img/stand-chart.png").then((image) => {
        ctx.drawImage(
          image,
          20 + STAND_X_OFFSET,
          -20 + STAND_Y_OFFSET,
          350,
          350
        );
        res(canvas.toBuffer());
      });
    });

    // ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
};

app.get("/stand.png", function(req, res) {
  let {
    power,
    speed,
    range,
    durability,
    precision,
    potential,
    name = "unknown",
    master = "unknown",
  } = req.query;
  if (
    typeof power !== "string" &&
    typeof speed !== "string" &&
    typeof range !== "string" &&
    typeof durability !== "string" &&
    typeof precision !== "string" &&
    typeof potential !== "string" &&
    typeof name !== "string" &&
    typeof master !== "string"
  ) {
    power = Math.floor(Math.random() * 6) + 1 + "";
    speed = Math.floor(Math.random() * 6) + 1 + "";
    range = Math.floor(Math.random() * 6) + 1 + "";
    durability = Math.floor(Math.random() * 6) + 1 + "";
    precision = Math.floor(Math.random() * 6) + 1 + "";
    potential = Math.floor(Math.random() * 6) + 1 + "";
  }

  drawImage(
    parseInt(power as string, 10),
    parseInt(speed as string, 10),
    parseInt(range as string, 10),
    parseInt(durability as string, 10),
    parseInt(precision as string, 10),
    parseInt(potential as string, 10),
    name as string,
    master as string
  )
    .then((result) => {
      res.contentType("image/png");
      return res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
});

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
