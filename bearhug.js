// bearhug.js
// ==========
// * GitHub: https://github.com/jharding/bearhug
// * Copyright (c) 2013 Jake Harding
// * Licensed under the MIT license

(function(doc) {

  var defaults = {
        node: null,
        pattern: null,
        tagName: 'strong',
        className: null,
        wordsOnly: false,
        caseSensitive: false
      };

  window.bearhug = function bearhug(o) {
    var regex;

    o = mixin({}, defaults, o);

    if (!o.node || !o.pattern) {
      throw new Error('both node and pattern must be set');
    }

    // support wrapping multiple patterns
    o.pattern = isArray(o.pattern) ? o.pattern : [o.pattern];

    regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
    traverse(o.node, bearhugTextNode);

    function bearhugTextNode(textNode) {
      var match, patternNode;

      if (match = regex.exec(textNode.data)) {
        wrapperNode = doc.createElement(o.tagName);
        o.className && (wrapperNode.className = o.className);

        patternNode = textNode.splitText(match.index);
        patternNode.splitText(match[0].length);
        wrapperNode.appendChild(patternNode.cloneNode(true));

        textNode.parentNode.replaceChild(wrapperNode, patternNode);
      }

      return !!match;
    }

    function traverse(el, bearhugTextNode) {
      var childNode, TEXT_NODE_TYPE = 3;

      for (var i = 0; i < el.childNodes.length; i++) {
        childNode = el.childNodes[i];

        if (childNode.nodeType === TEXT_NODE_TYPE) {
          i += bearhugTextNode(childNode) ? 1 : 0;
        }

        else {
          traverse(childNode, bearhugTextNode);
        }
      }
    }
  };

  function getRegex(patterns, caseSensitive, wordsOnly) {
    var escapedPatterns = [], regexStr;

    for (var i = 0; i < patterns.length; i++) {
      escapedPatterns.push(escapeRegexChars(patterns[i]));
    }

    regexStr = wordsOnly ?
      '\\b(' + escapedPatterns.join('|') + ')\\b' :
      '(' + escapedPatterns.join('|') + ')';

    return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, 'i');
  }


  function mixin(target) {
    var objs = [].slice.call(arguments, 1), obj;

    for (var i = 0; i < objs.length; i++) {
      obj = objs[i];

      for (var key in obj) {
        obj.hasOwnProperty(key) && (target[key] = obj[key]);
      }
    }

    return target;
  }

  // http://stackoverflow.com/a/6969486
  function escapeRegexChars(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

})(window.document);
