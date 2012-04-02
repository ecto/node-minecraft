var Minecraft = require('../');

var mc = new Minecraft({
  user: 'hello',
  pass: 'world',
  salt: 'salty'
});

mc.getPlayer('diffference', console.log);
