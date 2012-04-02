var Minecraft = require('../');

var mc = new Minecraft({
  user: 'hello',
  pass: 'world',
  salt: 'salty'
});

mc.call('getPlayer', 'diffference', function (err, player) {
  if (err) throw err;
  var pos = player.location;
  var blocks = [];
  for (var x = -5; x < 5; x++) {
    for (var y = -5; y < 5; y++) {
      for (var z = -5; z < 5; z++) {
        var block = [
          player.worldInfo.name,
          Math.floor(pos.x) + x,
          Math.floor(pos.y) + y,
          Math.floor(pos.z) + z
        ];
        blocks.push(block);
      }
    }
  }

  blocks.forEach(function (block) {
    mc.call('getBlock', block, function (err, type) {
      block.push(type);
      console.log(block);
    });
  });
});
