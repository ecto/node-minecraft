var Minecraft = require('../');

var mc = new Minecraft({
  user: 'hello',
  pass: 'world',
  salt: 'salty'
});

mc.call('getWorlds', function (err, data) {
  console.log(data);
});
