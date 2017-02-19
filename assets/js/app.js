/*
  * Phaser:
    - Tilemaps
    - Motion
  ---------------------------------
  https://phaser.io/examples/v2/category/tilemaps
  https://phaser.io/examples/v2/category/arcade-physics
*/

// Initialization
var playing = false;
var questioning = false;

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {
  // Background Images
  game.load.image('space-map', 'assets/img/space-background.png');

  // Objects Images
  game.load.image('cannon', 'assets/img/cannon.png');
  game.load.image('enemy', 'assets/img/alien.png');
  game.load.image('ship', 'assets/img/spaceship.png');

  // Buttons
  game.load.image('play', 'assets/img/play.png');
  game.load.audio('music', 'assets/music/bgmusic.mp3');
}

// empty cannons
var cannonTime = 75;
var keyboard;

// Initializers
var button;
var questions;
var score = 0;
var textScore;
var can_shoot = true;
    
// Enemy Values
var enemy;
var enemies;
var enemyTime = 150;


function create() {
  //Background Music
  //Music name: Jim Yosef - Firefly NCS Release
  music = game.add.audio('music');
	music.play();
	
  // Maps
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, 'space-map');
  
  // Enemy
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;
  
  // Objects
  questions = game.add.group();
  weapon = game.add.weapon(1, 'cannon');
  
  // Turrets
  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  weapon.bulletSpeed = 200;
  weapon.fireRate = 3;
  
  sprite = this.add.sprite(400, 300, 'ship');
  sprite.anchor.set(0.5);
  game.physics.arcade.enable(sprite);
   
  weapon.trackSprite(sprite, 0, 0, true);
  // Initial Functionalities
  gameIntro();
  

  // Adds the key spacebar
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

// Updater
var i = 0;

function update() {
  if(playing == true) {
    
    game.physics.arcade.overlap(weapon.bullets, enemies, collisionHandler, null, this);
    
    // Shoots a cannon everytime the space keyboard is down
    if(game.time.now - cannonTime > 250) {
      cannonTime = game.time.now;
      weapon.fire();
    }
    
    if(game.time.now - enemyTime > 1350) {
      releaseEnemy();
      enemyTime = game.time.now;
    }
    
    // Quiz Sections
    var quest = ["Is the Nucleus the brain of the Cell?", "Is the Mitochondria the powerhouse of the cell?",
                "Does the Mitochondria stores food, water, and waste in the cell?", "Does Ribosome turns amino acids into proteins?",
                "Does Endoplasmic Reticulum transports materials throughout the cell?"];  
      
    if(!questioning && i < quest.length) {
      getQuiz(quest[i]);
      i++;
    }
  }
}

function releaseEnemy() {
  enemy = enemies.getFirstExists(false);
  const enemyX = enemy.x+605;
  const enemyY = enemy.y-300;
  
  if(enemy) {
    enemy.reset(enemyX, enemyY-100); // Generate Enemy at position
    enemy.body.velocity.x = -85; // Sets the velocity of the Enemy
  }
}

function gameIntro() {
  console.log("introducing")
  
  button = game.add.button(game.world.centerX - 105, 495, 'play', initGame, this, 2, 1, 0);

  var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
  text = game.add.text(game.world.centerX, game.world.centerY, "Click Play To Begin !", style);
  text.anchor.set(0.5);

  //  And now we'll color in some of the letters
  text.addColor('#ffff00', 16);
  text.addColor('#ffffff', 25);

  text.addColor('#ff00ff', 28);
  text.addColor('#ffffff', 32);
  

  console.log("introduced")
}

function initGame() {
  button.kill();
  text.kill();
  
  playing = true;

  // Generated Enemies
  for (var i = 0; i < 25; i++) {
    var b = enemies.create(480, 650, 'enemy');
    b.name = 'enemy' + i;
    b.exists = false;
    b.visible = false;

    // Checks for walls
    b.checkWorldBounds = true;
  }
  
  // Creates Score
  var style = {font: "65px Arial", fill: "#fff", align: "left"};
  var scur = "Score: "+score;
  textScore = game.add.text(game.world.centerX-585, game.world.centerY-360, scur, style);
  
  weapon.autofire = true;
}

function getScore() {
  // adjust score for +10 per correct choice, +0 per incorrect choice
/*  if (answers = correct) {
    score += 10;
  } else {
    score * 1;
  }
 */
  textScore.setText("Score: " + score);
  
} 

function collisionHandler (bullet, enemies) {
  bullet.kill();
  enemies.kill();
  score+=1;
  getScore();
}

function getQuiz(quest) {
  var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
  
  quizText = game.add.text(game.world.centerX, game.world.centerY+185, quest, style);
  quizText.anchor.set(0.5);
  // Updates Question to current
  quizText.setText(quest);
  questioning = true;
}

//*************

/*
function Quiz(questions, answers) {
  var questions = questions;
  var answers = answers;
}
*/

/*
function getScore() {
  // adjust score for +10 per correct choice, +0 per incorrect choice
  if (answers == correct) {
    textScore += 10;
  } else {
    textScore * 1;
  }
  
  text.setText("Score: " + score);
}
*/