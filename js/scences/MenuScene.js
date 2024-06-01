class MenuScene extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    init(data) {
        this.isPlaying = false
    }

    preload() {
        this.music = this.sound.add('menu_music');
    }

    create() {

        let isPlaying = false
        this.sound.pauseOnBlur = false
        this.music.setLoop(true);
        this.music.play()

        const menu_background = this.add.video(0, 0, "menu_background")
        menu_background.setOrigin(0)
        menu_background.setScale(1)
        menu_background.setLoop(true)
        menu_background.play()

        this.add.image(this.game.renderer.width / 2 - 180, this.game.renderer.height / 2 - 220, "logo").setOrigin(0);


        const pistolet_image = this.add.image(0, 0, "pistolet").setOrigin(0)
        pistolet_image.setScale(0.2)
        pistolet_image.setVisible(false)

        // const warrior = this.add.sprite(100, 100, "warrior")

        const play_button = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Start', {
            fontSize: '40px',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const settings_button = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 60, 'Settings', {
            fontSize: '40px',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const music_button = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 120, 'Music', {
            fontSize: '40px',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const exit_button = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 180, 'Exit', {
            fontSize: '40px',
            fontStyle: 'bold'
        }).setOrigin(0.5);


        play_button.setInteractive()
        settings_button.setInteractive()
        music_button.setInteractive()
        exit_button.setInteractive()

        play_button.on("pointerover", () => {
            pistolet_image.setVisible(true)
            pistolet_image.x = play_button.x - play_button.width - 10
            pistolet_image.y = play_button.y - 30
        })
        play_button.on("pointerout", () => {
            pistolet_image.setVisible(false)
        })
        play_button.on("pointerup", () => {
            this.music.stop()
            this.scene.start("exampleMap")
        })

        settings_button.on("pointerover", () => {
            pistolet_image.setVisible(true)
            pistolet_image.x = settings_button.x - settings_button.width + 20
            pistolet_image.y = settings_button.y - 30
        })
        settings_button.on("pointerout", () => {
            pistolet_image.setVisible(false)
        })
        settings_button.on("pointerup", () => {
            // this.test(play_button, settings_button, exit_button, pistolet_image);
        })

        music_button.on("pointerover", () => {
            pistolet_image.setVisible(true)
            pistolet_image.x = music_button.x - music_button.width - 16
            pistolet_image.y = music_button.y - 30
        })
        music_button.on("pointerup", () => {
            if (!isPlaying) {
                music.stop()
                isPlaying = true
            } else {
                music.play()
                isPlaying = false
            }
        })
        music_button.on("pointerout", () => {
            pistolet_image.setVisible(false)
        })

        exit_button.on("pointerover", () => {
            pistolet_image.setVisible(true)
            pistolet_image.x = exit_button.x - exit_button.width - 30
            pistolet_image.y = exit_button.y - 30

        })
        exit_button.on("pointerout", () => {
            pistolet_image.setVisible(false)
        })

    }

    settings(play_button, settings_button, exit_button, pistolet_image) {
        play_button.setVisible(false)
        settings_button.setVisible(false)
        exit_button.setVisible(false)
        pistolet_image.setVisible(false)
    }

}