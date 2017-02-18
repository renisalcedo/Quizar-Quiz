/*
  * Phaser:
    - Tilemaps
    - Motion
  ---------------------------------
  https://phaser.io/examples/v2/category/tilemaps
  https://phaser.io/examples/v2/category/arcade-physics
*/

// Initialization
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  // Background Images
  game.load.image('space-map', 'assets/img/space-background.png');

  // Objects Images
  game.load.image('cannon', 'assets/img/cannon.png');

  // Buttons
  game.load.image('play', 'assets/img/play.png');
}

// empty cannons
var cannons;
var cannon;
var cannonTime = 0;
var keyboard;

// Initializers
var button;
var questions;
var score = 0;
var textScore;

function create() {

  // Maps
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, 'space-map');

  // Objects
  cannons = game.add.group();
  questions = game.add.group();

  // Initial Functionalities
  gameIntro();

  // Makes the cannon solid
  cannons.enableBody = true;

  // Adds physics to the cannon
  cannons.physicsBodyType = Phaser.Physics.ARCADE;

  // Adds the key spacebar
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
  
  // Shoots a cannon everytime the space keyboard is down
  if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
  {
    fireCannon();
  }
  
    getScore();
}

function render() {}

function fireCannon() {
  if(game.time.now > cannonTime) {
    cannon = cannons.getFirstExists(false);

    if(cannon) {
      cannon.reset(cannon.x + 6, cannon.y - 8); // Deletes cannon after hiting wall
      cannon.body.velocity.y = -300; // Sets the velocity of the cannon
      cannonTime = game.time.now + 150;
    }
  }
}

function gameIntro() {
  button = game.add.button(game.world.centerX - 105, 495, 'play', initGame, this, 2, 1, 0);

  var style = { font: "65px Arial", fill: "#ffffff", align: "center" };

  text = game.add.text(game.world.centerX, game.world.centerY, "Click Play To Begin !", style);

  text.anchor.set(0.5);

  //  And now we'll color in some of the letters
  text.addColor('#ffff00', 16);
  text.addColor('#ffffff', 25);

  text.addColor('#ff00ff', 28);
  text.addColor('#ffffff', 32);
}

function initGame() {
  button.kill();
  text.kill();

  for (var i = 0; i < 20; i++)
  {
    var b = cannons.create(485, 650, 'cannon');
    b.name = 'cannon' + i;
    b.exists = false;
    b.visible = false;

    // Checks for walls
    b.checkWorldBounds = true;
  }
    // Creates Score
 textScore = game.add.text(game.world.centerX, game.world.centerY, "Score: "+score, {
    font: "65px Arial",
    fill: "#fff",
    align: "left"
  });
}

/*
function getScore() {
  // adjust score for +10 per correct choice, +0 per incorrect choice
  if (answers = correct) {
    score += 10;
  } else {
    score * 1;
  }
  
  text.setText("Score: " + score);
} 
*/

function Quiz(questions, answers) {
  var questions = questions;
  var answers = answers;
}

function getScore() {
  // adjust score for +10 per correct choice, +0 per incorrect choice
  if (answers == correct) {
    textScore += 10;
  } else {
    textScore * 1;
  }
  
  text.setText("Score: " + score);
} 