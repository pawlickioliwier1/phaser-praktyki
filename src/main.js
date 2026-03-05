import Phaser from "phaser";

let player;
let keys;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  scene: {
    create: create,
    update: update
  }
};

new Phaser.Game(config);

function create() {

  player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);

  keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D
  });

}

function update() {

  const speed = 4;

  if (keys.W.isDown) player.y -= speed;
  if (keys.S.isDown) player.y += speed;
  if (keys.A.isDown) player.x -= speed;
  if (keys.D.isDown) player.x += speed;

}