var load = function (id, src, callback) {
  callback = callback || function () {};

  var hasScript = !!(document.getElementById(id));
  if (!hasScript) {
    var node = document.createElement("script");
    node.id = id;
    node.src = src;
    node.type = "text/javascript";
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
};
