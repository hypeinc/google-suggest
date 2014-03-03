(function() {
  var query, request, suggest, iconv;

  request = require('request');
  iconv = conv = require('iconv-lite');

  suggest = function(query, cb) {
    var url;
    url = "http://suggestqueries.google.com/complete/search?hl=tr&client=firefox&q=" + (encodeURIComponent(query));
    return request.get({
      uri: url,
      encoding: null
    }, function(err, response, body) {
      body = iconv.decode(new Buffer(body), "ISO-8859-9");
      var result;
      if (err) {
        cb(err);
        return;
      }
      if (response.statusCode === 200 && body) {
        result = JSON.parse(body);
        return cb(null, result[1]);
      }
    });
  };

  module.exports = suggest;

  if (!(module.parent != null)) {
    query = process.argv.slice(2);
    suggest(query, function(err, result) {
      var r, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        r = result[_i];
        _results.push(console.log(r));
      }
      return _results;
    });
  }

}).call(this);