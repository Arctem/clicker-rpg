window.addEventListener('load',function(e) {

  var TILEWIDTH = 200;
  var TILEHEIGHT = 100;

  // Now set up your game (most games will load a separate .js file)
  var Q = Quintus({ development: true })
    .include("Sprites, Scenes, Input, 2D, Touch")
  Q.setup({ maximize: true })          // Add a canvas element onto the page
    .controls()                        // Add in default controls (keyboard, buttons)
    .touch(Q.SPRITE_ALL);              // Add in touch support (for the UI)

  Q.Sprite.extend("Tile", {
    init: function(p, x, y) {
      console.log(x, y);
      this._super(p, {
        asset: "grass.png",
        x: x,
        y: y,
        w: TILEWIDTH,
        h: TILEHEIGHT,
        points: [[TILEWIDTH / 2, 0], [TILEHEIGHT / 2, TILEHEIGHT / 2],
          [-TILEHEIGHT / 2, TILEHEIGHT / 2], [-TILEWIDTH / 2, 0],
          [-TILEHEIGHT / 2, -TILEHEIGHT / 2], [TILEHEIGHT / 2, -TILEHEIGHT / 2]],
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
    var x_spacing = TILEWIDTH * 1.5;
    for(row = 0; row < 10; row += 1) {
      for(col = 0; col < 10; col += 1) {
        stage.insert(new Q.Tile({
          x: x_spacing * col + (row % 2 == 0 ? 0 : x_spacing / 2),
          y: row * TILEHEIGHT / 2
        }));
      }
    }
    //stage.insert(new Q.Tile());
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
