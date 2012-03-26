var Lazy = {
  queue: [],
  enqueue: function (id, src, callback) {
    this.queue.push(Array.prototype.slice.call(arguments));
    if (this.queue.length === 1) {
      this.load();
    }
  },
  load: function () {
    var script = this.queue.shift(),
        id = script[0],
        src = script[1],
        callback = script[2] || function () {};

    var hasScript = !!(document.getElementById(id));
    if (!hasScript) {
      var node = document.createElement("script");
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
      document.getElementsByTagName('head')[0].appendChild(node);
    } else {
      callback();
    }

    if (this.queue.length === 1) {
      this.load();
    }
  }
};
