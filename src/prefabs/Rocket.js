class Rocket extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, inputLeft, inputRight, inputFire) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 4;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        
        this.inputLeft = inputLeft;
        this.inputRight = inputRight;
        this.inputFire = inputFire;
    }

    update() {
        if (this.inputLeft.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
            this.angle = -45;
        }
        if (this.inputRight.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
            this.angle = 45;
        }
        if (!this.inputLeft.isDown && !this.inputRight.isDown) {
            this.angle = 0;
        }

        if (Phaser.Input.Keyboard.JustDown(this.inputFire) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}