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
}

// empty cannons
var cannons;
var cannon;
var cannonTime = 0;
var keyboard;

function create() {
  // Maps
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, 'space-map');
  
  // Objects
  cannons = game.add.group();
  
  // Initial Functionanilities 
  initButton();
  
  // * TESTING PURPOSES *
  //game.add.sprite(485, 650, 'cannon');
  
  // Makes the cannon solid
  cannons.enableBody = true;
  // Adds physics to the cannon
  cannons.physicsBodyType = Phaser.Physics.ARCADE;
  
  // Generate 19 cannons
  for (var i = 0; i < 20; i++)
  {
    var b = cannons.create(485, 650, 'cannon');
    b.name = 'cannon' + i;
    b.exists = false;
    b.visible = false;
    
    // Checks for walls
    b.checkWorldBounds = true;
  }
    
  // Adds the key spacebar
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  
}

function update() {
  // Shoots a cannon everytime the space keyboard is down
  if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
  {
    fireCannon();
  }
}

function render() {}

function fireCannon() {
  if(game.time.now > cannonTime)
  {
    cannon = cannons.getFirstExists(false);

    if(cannon)
    {
      cannon.reset(cannon.x + 6, cannon.y - 8); // Deletes cannon after hiting wall
      cannon.body.velocity.y = -300; // Sets the velocity of the cannon
      cannonTime = game.time.now + 150;
    }
  }
}