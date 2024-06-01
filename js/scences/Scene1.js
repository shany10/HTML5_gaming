class Scene1 extends Phaser.Scene {
    constructor() {
        super("scene1")
    }

    preload() {
        this.background()
        this.texturesScene()
        this.animationScene()
        this.music = this.sound.add('scene1_music');
    }


    create() {
        this.music.setLoop(true);
        this.music.play()

        this.cameras.main.setBounds(0, 0, this.scale.width, 100);
        this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
        this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "scene1_background")
        .setOrigin(0)
        .setScale(2)
        // .setScrollFactor(1.5)

        this.keyboard = this.input.keyboard.addKeys("left, up, right, down, Space")
        this.player = this.physics.add.sprite(400, 300, "idle", 0).setScale(2).setSize(24, 36)
        this.player.body.offset.y = 12
        this.player.body.offset.x = 4
        this.player.body.collideWorldBounds = true;
        window.player = this.player

        this.cameras.main.setBounds(0, 0, this.scale.width * 2, this.scale.height)
        this.cameras.main.startFollow(this.player)
    }


    update() {
        // game.physics.arcade.collide(this.player, this.layer);
        if (this.player.active === true) {

            const camera = this.cameras.main
            const speed = 3

            const blocked = this.player.body.blocked;
            //ALLER A GAUCHE
            if (this.keyboard.right.isDown === true) {
                camera.scrollX += speed
                this.player.flipX = false;
                this.player.x = this.player.x + 260 * (16.666 / 1000)
                this.player.body.offset.x = 4
                if (blocked.down && this.keyboard.Space.isDown === true) {
                    this.player.play("run_attack", true)
                }
                else if (blocked.down) {
                    this.player.play("run", true)
                }
            }
            //ALLER A DROIT
            else if (this.keyboard.left.isDown === true) {
                camera.scrollX -= speed
                this.player.flipX = true;
                this.player.x = this.player.x - 260 * (16.666 / 1000)
                this.player.body.offset.x = 20
                if (blocked.down && this.keyboard.Space.isDown === true) {
                    this.player.play("run_attack", true)
                }
                else if (blocked.down) {
                    this.player.play("run", true)
                }
            }
            //ATTAQUER
            else if (this.keyboard.Space.isDown === true && blocked.down) {
                this.player.play("attack2", true)
            }
            //POSITION INACTIF
            else if (blocked.down) {
                this.player.play("idle", true)
            }
            //SAUTER
            if (this.keyboard.up.isDown === true && blocked.down) {
                this.player.setVelocityY(-360)
                this.player.play("doublejump", true)
            }

        }
    }

    background() {

    }

    texturesScene() {
        this.textures.addSpriteSheetFromAtlas("idle", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_idle"
        })
        this.textures.addSpriteSheetFromAtlas("run", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_run"
        })
        this.textures.addSpriteSheetFromAtlas("run_attack", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_run_attack"
        })
        this.textures.addSpriteSheetFromAtlas("doublejump", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_doublejump"
        })
        this.textures.addSpriteSheetFromAtlas("attack2", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_attack2"
        })
    }


    animationScene() {
        this.anims.create({
            key: "idle",
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("idle", {
                frames: [0, 1, 2, 3]
            }),
        })
        this.anims.create({
            key: "run",
            frameRate: 14,
            frames: this.anims.generateFrameNumbers("run", {
                frames: [0, 1, 2, 3, 4, 5]
            }),
        })
        this.anims.create({
            key: "run_attack",
            frameRate: 14,
            frames: this.anims.generateFrameNumbers("run_attack", {
                frames: [0, 1, 2, 3, 4, 5]
            }),
        })
        this.anims.create({
            key: "doublejump",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("doublejump", {
                frames: [0, 1, 2, 3, 4, 5]
            }),
        })
        this.anims.create({
            key: "attack2",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("attack2", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            }),
        })
    }

}