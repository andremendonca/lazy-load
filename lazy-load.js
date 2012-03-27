var Lazy = (function (doc) {
  var queue = [],
      loadFinished = function (callback) {
        callback();
        queue.shift();
        if (queue.length > 0) {
          load();
        }
      },
      load = function () {
        var script = queue[0],
            id = script[0],
            src = script[1],
            callback = script[2] || function () {};

        var hasScript = !!(doc.getElementById(id));
        if (!hasScript) {
          var node = doc.createElement("script");
          node.id = id;
          node.src = src;
          node.type = "text/javascript";
          if (!/MSIE/.test(navigator.userAgent)) {
            node.onload = function () {
              loadFinished(callback, node);
            };
          } else {
            //if IE
            node.onreadystatechange = function () {
              if (/loaded|complete/.test(node.readyState)) {
                node.onreadystatechange = null;
                loadFinished(callback);
              }
            };
          }
          doc.getElementsByTagName('head')[0].appendChild(node);
        } else {
          loadFinished(callback);
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
