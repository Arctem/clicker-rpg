// Now set up your game (most games will load a separate .js file)
var Q = Quintus({ development: true })
  .include("Sprites, Scenes, Input, 2D, Touch, UI")
  .setup({ maximize: true })                           // Add a canvas element onto the page
  .controls()                        // Add in default controls (keyboard, buttons)
  .touch();                          // Add in touch support (for the UI)


Q.Sprite.extend("Tile", {
    init: function(p) {
        this._super(p, {
            asset: "not_cylon.png",
            x: 5,
            y: 100
        });
    }
});

Q.load(["not_cylon.png"], function() {
    var tile = new Q.Tile();
    Q.gameLoop(function(dt) {
        tile.update(dt);
        Q.clear();
        tile.render(Q.ctx);
    })
})

Q.scene("map", function(stage) {
    for(x = 0; x < 500; x += 10) {
        for(y = 0; y < 500; y += 10) {
            stage.insert(new Q.Tile());
        }
    }
});

Q.stageScene("map");
