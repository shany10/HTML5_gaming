class ExampleMap extends Phaser.Scene {
    constructor() {
        super("exampleMap")
    }

    preload() {
        this.load.image('tiles', "./assets/tiles/tiles_all.png")
        this.load.tilemapTiledJSON('map', "./assets/tiles/world1.tmj")
        this.texturesScene()
        this.animationScene()
        this.load.image('blue', 'assets/image/blue.png');
        // this.music = this.sound.add('scene1_music');
    }

    create() {


        // this.musicScene()

        this.life = 100

        this.add.tileSprite(0, 0, this.scale.width * 3, this.scale.height, "scene1_background")
            .setOrigin(0)
            .setScale(2)

        // this.box.body.enable = false

        this.keyboard = this.input.keyboard.addKeys("left, up, right, down, Space")

        this.mapScene()
        this.playerInit()
        this.enemiesInit()
        this.cameraScene()
        this.collider_objet()
        this.time.addEvent({
            delay: 3000,
            startAt: 3000,
            repeat: - 1,
            callback: () => this.enemisMouvement()
        });
    }

    update() {
        this.player.body.setVelocityX(0);
        // if (this.box.body) {
        //     this.box.body.setVelocityX(0)
        // }

        this.playerMouvement()
    }


    //method

    musicScene() {
        this.music.setLoop(true);
        this.music.play()
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


        //ENEMI

        this.textures.addSpriteSheetFromAtlas("enemi_idle", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "enemi1",
            frame: "idle",
        })
        this.textures.addSpriteSheetFromAtlas("enemi_walk", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "enemi1",
            frame: "walk",
        })

        this.textures.addSpriteSheetFromAtlas("enemi_hurt", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "enemi1",
            frame: "hurt",
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


        //ENEMIS

        this.anims.create({
            key: 'enemi_walk',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("enemi_walk", {
                frames: [0, 1, 2, 3, 4, 5]
            }),
            repeat: -1
        })

        this.anims.create({
            key: 'enemi_idle',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("enemi_idle", {
                frames: [0, 1, 2, 3]
            }),
            repeat: -1
        })

        this.anims.create({
            key: 'enemi_hurt',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers("enemi_hurt", {
                frames: [1, 0]
            }),
            repeat: 1
        })
    }

    playerInit() {

        // const emitter = this.add.particles(0, 0, 'blue', {
        //     speed: 100,
        //     scale: { start: 0.5, end: 0.6 },
        //     blendMode: 'ADD'
        // }).setPosition(20,16);

        this.player = this.physics.add.sprite(100, 528, "idle", 0).setScale(2).setSize(22, 36)
        this.player.body.offset.y = 12
        this.player.body.offset.x = 4
        this.player.body.collideWorldBounds = true;
        this.physics.add.existing(this.player);


        this.punchBox = this.add.rectangle(0, 0, 24, 10, "0xfffffff", 0)
        this.punchBox.setOrigin(0, 0)
        this.physics.add.existing(this.punchBox)
        this.punchBox.body.allowGravity = false;
        this.punchBox.body.enable = false
        this.physics.world.remove(this.punchBox.body)



        // emitter.startFollow(this.player.body);
    }

    enemiesInit() {
        this.enemiGroupe = this.physics.add.group({
            key: "enemi_idle",
            quantity: 3,
            collideWorldBounds: true,
        })

        const children = this.enemiGroupe.getChildren();

        this.arr_enemis = [
            [800, 272],
            [1600, 450],
            [2100, 400]
        ]

        for (let i = 0; i < children.length; i++) {
            children[i].setPosition(this.arr_enemis[i][0], this.arr_enemis[i][1])
                .setScale(2)
                .setSize(22, 36);
            children[i].body.offset.y = 12
            children[i].body.offset.x = 4
            children[i].life = 100
        }
    }

    mapScene() {
        const map = this.make.tilemap({ key: 'map' })
        const tileset = map.addTilesetImage("tiles1", "tiles")
        this.sol = map.createLayer("sol", tileset, 0, 0)
        // const rocher = map.createLayer("rocher", tileset, 0, 0)
        this.sol.setCollisionBetween(0, 1)
        this.sol.setCollisionBetween(24, 25)
        this.sol.setCollisionBetween(44, 45)
    }

    cameraScene() {
        this.cameras.main.setBounds(0, 0, this.scale.width * 3, this.scale.height)
        this.cameras.main.startFollow(this.player)
        this.physics.world.setBounds(0, 0, this.scale.width * 3, this.scale.height);
    }

    playerMouvement() {
        if (this.player.active === true) {
            const blocked = this.player.body.blocked;

            //ALLER A DROIT
            if (this.keyboard.right.isDown === true) {
                this.player.flipX = false;
                this.player.setVelocityX(260)
                this.player.body.offset.x = 4
                this.punchBox.body.enable = false
                this.physics.world.remove(this.punchBox.body)
                if (blocked.down && this.keyboard.Space.isDown === true) {
                    this.player.play("run_attack", true)
                    this.punchBox.x = this.player.x + 8
                    this.punchBox.y = this.player.y
                    this.punchBox.body.enable = true
                    this.physics.world.add(this.punchBox.body)
                }
                else if (blocked.down) {
                    this.player.play("run", true)
                }
            }

            //ALLER A GAUCHE
            else if (this.keyboard.left.isDown === true) {
                this.player.flipX = true;
                this.player.setVelocityX(-260)
                this.player.body.offset.x = 23
                this.punchBox.body.enable = false
                this.physics.world.remove(this.punchBox.body)
                if (blocked.down && this.keyboard.Space.isDown === true) {
                    this.player.play("run_attack", true)
                    this.punchBox.x = this.player.x - 32
                    this.punchBox.y = this.player.y
                    this.punchBox.body.enable = true
                    this.physics.world.add(this.punchBox.body)
                }
                else if (blocked.down) {
                    this.player.play("run", true)
                }
            }

            //ATTAQUER
            else if (this.keyboard.Space.isDown === true && blocked.down) {
                this.player.play("attack2", true)
                this.punchBox.body.enable = true
                this.physics.world.add(this.punchBox.body)
                if (this.player.flipX) {
                    this.punchBox.x = this.player.x - 16
                    this.punchBox.y = this.player.y
                } else {
                    this.punchBox.x = this.player.x - 6
                    this.punchBox.y = this.player.y
                }
            }

            //POSITION INACTIF
            else if (blocked.down) {
                this.player.play("idle", true)
                this.punchBox.body.enable = false
                this.physics.world.remove(this.punchBox.body)
            }

            //SAUTER
            if (this.keyboard.up.isDown === true && blocked.down) {
                this.player.setVelocityY(-400)
                this.player.play("doublejump", true)
                this.punchBox.body.enable = false
                this.physics.world.remove(this.punchBox.body)
            }
        }
    }

    enemisMouvement() {
        const children = this.enemiGroupe.getChildren();
        const enemi_zone = [
            [1200, 800],
            [1700, 1600],
            [2300, 2100]
        ]
        for (let i = 0; i < children.length; i++) {
            const x = Phaser.Math.Between(1, 3);
            if (x == 1 && children[i].x < enemi_zone[i][0]) {
                children[i].play('enemi_walk', true)
                children[i].setVelocityX(40)
                children[i].flipX = false
                children[i].body.offset.x = 4
            } else if (x == 2 && children[i].x > enemi_zone[i][1]) {
                children[i].play('enemi_walk', true)
                children[i].setVelocityX(-40)
                children[i].flipX = true;
                children[i].body.offset.x = 23
            }
            else {
                children[i].setVelocityX(0)
                children[i].play('enemi_idle', true)
            }
            // children[i].on('ANIMATION_START',  () => { console.log("object") })
        }
    }

    collider_objet() {
        this.physics.add.collider([this.player, this.punchBox], this.box)
        this.physics.add.collider([this.player, this.enemiGroupe], this.sol)
        this.physics.add.overlap(this.punchBox, this.enemiGroupe, this.handleCollide, null, this);
    }

    handleCollide(punchBox, enemi) {
        enemi.life--
        enemi.play('enemi_hurt')
        enemi.setVelocityX(0)
        if (enemi.life <= 0) {
            this.enemiGroupe.killAndHide(enemi)
            enemi.body.enable = false
        }
    }

}