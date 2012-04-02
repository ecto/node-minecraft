var crypto = require('crypto');
var request = require('request');

var Minecraft = module.exports = function (options) {
  var defaults = {
    host: 'localhost',
    port: 20059
  }

  this._ = options || {};

  for (var i in defaults) {
    if (!this._[i]) {
      this._[i] = defaults[i];
    }
  }
}

Minecraft.prototype.generateUrl = function (method, args) {
  var key = this.generateKey(method);
  var url = 'http://' + this._.host + ':' + this._.port + '/api/call' +
    '?method=' + method +
    '&key=' + key +
    '&tag=null';
  if (args) {
    if (typeof args != 'object') {
      args = [args];
    }
    url += '&args=' + escape(JSON.stringify(args));
  }
  return url;
}

Minecraft.prototype.generateKey = function (method) {
    return crypto.createHash('sha256')
      .update(this._.user + method + this._.pass + this._.salt)
      .digest('hex');
}

Minecraft.prototype.call = function (method, args, cb) {
  if (typeof args == 'function') {
    cb = args;
    args = undefined;
  }

  var url = this.generateUrl(method, args);
  request(url, function (err, res, body) {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.log('Could not parse: ' + body);
    }

    if (cb) cb(err, body && body[body.result] || body);
  });
}

