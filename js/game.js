const config = {
    type: Phaser.AUTO,
    width: 1504,
    height: 640,
    scene: [
        LoadScene,
        MenuScene,
        ExampleAnimationScene,
        ExampleMap,
        Scene1
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    render: {
        pixelArt: true
    }

};

const game = new Phaser.Game(config);