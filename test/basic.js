var Minecraft = require('./minecraft');

var mc = new Minecraft({
  host: 'caprica.onswipe.com',
  user: 'hello',
  pass: 'world',
  salt: 'salty'
});

mc.call('getServer', function (err, data) {
  console.log(data);
});
