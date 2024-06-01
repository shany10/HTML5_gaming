
class LoadScene extends Phaser.Scene {
    constructor() {
        super("Boot Game")
    }

    init() {

    }

    preload() {

        //IMAGE
        this.imageScene()

        //ATLAS
        this.atlasScene()

        //AUDIO
        this.musicScene()

        //video
        this.videoScene()

        const loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        // for (let i = 0; i < 100; i++) {
        //     this.load.spritesheet("warrior" + i, "./image/sprite_player_2.png", {
        //         frameWidth: 96,
        //         frameHeight: 96
        //     });  
        // }

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.renderer.width * percent, 50)
        })
    }

    create() {
        this.add.text(20, 20, "Loading game...")
        this.scene.start("menuScene")
    }


    imageScene() {
        this.load.image('scene1_background', './assets/image/Background/scene1_background.png');
        this.load.image('pistolet', './assets/image/pistolet.png');
        this.load.image('logo', './assets/image/logo.png')
        this.load.image('tils_01', './assets/image/Tiles/Tile_01.png')
    }

    musicScene() {
        this.load.audio("menu_music", "./assets/music/menu_sound.mp3")
        this.load.audio("scene1_music", "./assets/music/scene1_sound.mp3")
    }

    videoScene() {
        this.load.video({
            key: "menu_background",
            url: ["./assets/video/menu_video.mp4"],
            asBlob: false,
            noAudio: true,
            loop: true
        })
    }

    atlasScene() {
        this.load.atlas("biker", "./assets/json/biker.png", "./assets/json/biker_atlas.json")
        this.load.atlas("enemi1", "./assets/json/enemi_1.png", "./assets/json/enemi_1_atlas.json")
    }
}