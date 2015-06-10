window.addEventListener('load',function(e) {

  // Now set up your game (most games will load a separate .js file)
  var Q = Quintus({ development: true })
    .include("Sprites, Scenes, Input, 2D, Touch")
  Q.setup({ maximize: true })          // Add a canvas element onto the page
    .controls()                        // Add in default controls (keyboard, buttons)
    .touch(Q.SPRITE_ALL);              // Add in touch support (for the UI)

  Q.Sprite.extend("Tile", {
    init: function(p) {
      this._super(p, {
        asset: "grass.png",
        x: 100,
        y: 100,
        w: 200,
        h: 100,
        points: [[100, 0], [50, 50], [-50, 50], [-100, 0], [-50, -50], [50, -50]],
      });

      this.on("drag");
      this.on("touchEnd");
    },

    drag: function(touch) {
      this.dragging = true;
      this.p.x = touch.origX + touch.dx;
      this.p.y = touch.origY + touch.dy;
    },

    touchEnd: function(touch) {
      this.dragging = false;
    },

    step: function(dt) {
      if(this.p.over) {
        this.p.scale = 1.2;
      } else {
        this.p.scale = 1.;
      }
    },
  });

  Q.scene("map", function(stage) {
    // for(x = 0; x < 500; x += 10) {
    //   for(y = 0; y < 500; y += 10) {
    //     stage.insert(new Q.Tile());
    //   }
    // }
    stage.insert(new Q.Tile());
    // stage.moveTo(0, 0);
  });

  Q.load("grass.png", function() {
    Q.stageScene("map");
  });

  Q.debug = true;
  Q.debugFill = true;

  var currentObj = null;

  Q.el.addEventListener('mousemove', function(e) {
    var x = e.offsetX || e.layerX,
        y = e.offsetY || e.layerY,
        stage = Q.stage();

    var stageX = Q.canvasToStageX(x, stage),
        stageY = Q.canvasToStageY(y, stage);


    var obj = stage.locate(stageX, stageY);

    if(currentObj) {
      currentObj.p.over = false;
    }
    if(obj) {
      currentObj = obj;
      obj.p.over = true;
    }
  });
});
