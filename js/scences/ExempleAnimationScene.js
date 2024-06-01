class ExampleAnimationScene extends Phaser.Scene {
    constructor() {
        super("exampleAnimationScene")
    }

    preload() {

        this.textures.addSpriteSheetFromAtlas("attack1", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_attack1"
        })
        this.textures.addSpriteSheetFromAtlas("attack2", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_attack2"
        })
        this.textures.addSpriteSheetFromAtlas("attack3", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_attack3"
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
        this.textures.addSpriteSheetFromAtlas("jump", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_jump"
        })
        this.textures.addSpriteSheetFromAtlas("doublejump", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_doublejump"
        })
        this.textures.addSpriteSheetFromAtlas("death", {
            frameWidth: 48,
            frameHeight: 48,
            atlas: "biker",
            frame: "biker_death"
        })

        this.anims.create({
            key: "attack1",
            frameRate: 14,
            frames: this.anims.generateFrameNumbers("attack1", {
                frames: [0,1,2,3,4,5]
            }),
            repeat : -1
        })
        this.anims.create({
            key: "attack2",
            frameRate: 14,
            frames: this.anims.generateFrameNumbers("attack2", {
                frames: [0,1,2,3,4,5,6,7]
            }),
            repeat : -1
        })
        this.anims.create({
            key: "attack3",
            frameRate: 14,
            frames: this.anims.generateFrameNumbers("attack3", {
                frames: [0,1,2,3,4,5]
            }),
            repeat : -1
        })
        this.anims.create({
            key: "run",
            frameRate: 14,
            frames: this.anims.generateFrameNumbers("run", {
                frames: [0,1,2,3,4,5]
            }),
            repeat : -1
        })
        this.anims.create({
            key: "run_attack",
            frameRate: 14,
            frames: this.anims.generateFrameNumbers("run_attack", {
                frames: [0,1,2,3,4,5]
            }),
            repeat : -1
        })
        this.anims.create({
            key: "jump",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("jump", {
                frames: [0,1,2,3]
            }),
            repeat : -1
        })
        this.anims.create({
            key: "doublejump",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("doublejump", {
                frames: [0,1,2,3,4,5]
            }),
            repeat : -1
        })
        this.anims.create({
            key: "death",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("death", {
                frames: [0,1,2,3,4,5]
            }),
            repeat : -1
        })

    }

    create() {
        this.add.sprite(100, 100, "biker", "biker_attack1").setScale(2).play("attack1")
        this.add.sprite(200, 100, "biker", "biker_attack2").setScale(2).play("attack2")
        this.add.sprite(300, 100, "biker", "biker_attack3").setScale(2).play("attack3")
        this.add.sprite(400, 100, "biker", "biker_run").setScale(2).play("run")
        this.add.sprite(500, 100, "biker", "biker_run_attack").setScale(2).play("run_attack")
        this.add.sprite(600, 100, "biker", "biker_jump").setScale(2).play("jump")
        this.add.sprite(700, 100, "biker", "biker_doublejump").setScale(2).play("doublejump")
        this.add.sprite(800, 100, "biker", "biker_death").setScale(2).play("death")
    }
}