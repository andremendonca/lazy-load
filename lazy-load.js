var Lazy = (function (doc) {
  var queue = [],
      load = function () {
        var script = queue.shift(),
            id = script[0],
            src = script[1],
            callback = script[2] || function () {};

        var hasScript = !!(doc.getElementById(id));
        if (!hasScript) {
          var node = doc.createElement("script");
          node.id = id;
          node.src = src;
          node.onload = callback;
          //if IE
          node.onreadystatechange = function () {
            if (/loaded|complete/.test(node.readyState)) {
              node.onreadystatechange = null;
              callback();
            }
          };
          doc.getElementsByTagName('head')[0].appendChild(node);
        } else {
          callback();
        }

        if (queue.length === 1) {
          load();
        }
      };

  return {
    enqueue: function (id, src, callback) {
      queue.push(Array.prototype.slice.call(arguments));
      if (queue.length === 1) {
        load();
      }
    }
  };
})(document);
