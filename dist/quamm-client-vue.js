'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;
/**
 * auth0-js v9.8.2
 * Author: Auth0
 * Date: 2018-11-13
 * License: MIT
 */

var commonjsGlobal$1 = "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : {};

function createCommonjsModule$1(fn, module) {
  return fn(module = {
    exports: {}
  }, module.exports), module.exports;
}

var urlJoin = createCommonjsModule$1(function (module) {
  var context, definition;
  context = commonjsGlobal$1, definition = function () {
    return function () {
      return function (strArray) {
        var resultArray = [];

        if (strArray[0].match(/^[^\/:]+:\/*$/) && strArray.length > 1) {
          var first = strArray.shift();
          strArray[0] = first + strArray[0];
        }

        strArray[0].match(/^file:\/\/\//) ? strArray[0] = strArray[0].replace(/^([^\/:]+):\/*/, "$1:///") : strArray[0] = strArray[0].replace(/^([^\/:]+):\/*/, "$1://");

        for (var i = 0; i < strArray.length; i++) {
          var component = strArray[i];
          if ("string" != typeof component) throw new TypeError("Url must be a string. Received " + component);
          "" !== component && (i > 0 && (component = component.replace(/^[\/]+/, "")), component = i < strArray.length - 1 ? component.replace(/[\/]+$/, "") : component.replace(/[\/]+$/, "/"), resultArray.push(component));
        }

        var str = resultArray.join("/"),
            parts = (str = str.replace(/\/(\?|&|#[^!])/g, "$1")).split("?");
        return str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");
      }("object" == typeof arguments[0] ? arguments[0] : [].slice.call(arguments));
    };
  }, module.exports ? module.exports = definition() : context.urljoin = definition();
}),
    utils = createCommonjsModule$1(function (module, exports) {
  var has = Object.prototype.hasOwnProperty,
      hexTable = function () {
    for (var array = [], i = 0; i < 256; ++i) array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());

    return array;
  }();

  exports.arrayToObject = function (source, options) {
    for (var obj = options && options.plainObjects ? Object.create(null) : {}, i = 0; i < source.length; ++i) void 0 !== source[i] && (obj[i] = source[i]);

    return obj;
  }, exports.merge = function (target, source, options) {
    if (!source) return target;

    if ("object" != typeof source) {
      if (Array.isArray(target)) target.push(source);else {
        if ("object" != typeof target) return [target, source];
        (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) && (target[source] = !0);
      }
      return target;
    }

    if ("object" != typeof target) return [target].concat(source);
    var mergeTarget = target;
    return Array.isArray(target) && !Array.isArray(source) && (mergeTarget = exports.arrayToObject(target, options)), Array.isArray(target) && Array.isArray(source) ? (source.forEach(function (item, i) {
      has.call(target, i) ? target[i] && "object" == typeof target[i] ? target[i] = exports.merge(target[i], item, options) : target.push(item) : target[i] = item;
    }), target) : Object.keys(source).reduce(function (acc, key) {
      var value = source[key];
      return Object.prototype.hasOwnProperty.call(acc, key) ? acc[key] = exports.merge(acc[key], value, options) : acc[key] = value, acc;
    }, mergeTarget);
  }, exports.decode = function (str) {
    try {
      return decodeURIComponent(str.replace(/\+/g, " "));
    } catch (e) {
      return str;
    }
  }, exports.encode = function (str) {
    if (0 === str.length) return str;

    for (var string = "string" == typeof str ? str : String(str), out = "", i = 0; i < string.length; ++i) {
      var c = string.charCodeAt(i);
      45 === c || 46 === c || 95 === c || 126 === c || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 ? out += string.charAt(i) : c < 128 ? out += hexTable[c] : c < 2048 ? out += hexTable[192 | c >> 6] + hexTable[128 | 63 & c] : c < 55296 || c >= 57344 ? out += hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | 63 & c] : (i += 1, c = 65536 + ((1023 & c) << 10 | 1023 & string.charCodeAt(i)), out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | 63 & c]);
    }

    return out;
  }, exports.compact = function (obj, references) {
    if ("object" != typeof obj || null === obj) return obj;
    var refs = references || [],
        lookup = refs.indexOf(obj);
    if (-1 !== lookup) return refs[lookup];

    if (refs.push(obj), Array.isArray(obj)) {
      for (var compacted = [], i = 0; i < obj.length; ++i) obj[i] && "object" == typeof obj[i] ? compacted.push(exports.compact(obj[i], refs)) : void 0 !== obj[i] && compacted.push(obj[i]);

      return compacted;
    }

    return Object.keys(obj).forEach(function (key) {
      obj[key] = exports.compact(obj[key], refs);
    }), obj;
  }, exports.isRegExp = function (obj) {
    return "[object RegExp]" === Object.prototype.toString.call(obj);
  }, exports.isBuffer = function (obj) {
    return null != obj && !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };
}),
    utils_1 = utils.arrayToObject,
    utils_2 = utils.merge,
    utils_3 = utils.decode,
    utils_4 = utils.encode,
    utils_5 = utils.compact,
    utils_6 = utils.isRegExp,
    utils_7 = utils.isBuffer,
    replace = String.prototype.replace,
    percentTwenties = /%20/g,
    formats = {
  default: "RFC3986",
  formatters: {
    RFC1738: function (value) {
      return replace.call(value, percentTwenties, "+");
    },
    RFC3986: function (value) {
      return value;
    }
  },
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
},
    arrayPrefixGenerators = {
  brackets: function (prefix) {
    return prefix + "[]";
  },
  indices: function (prefix, key) {
    return prefix + "[" + key + "]";
  },
  repeat: function (prefix) {
    return prefix;
  }
},
    toISO = Date.prototype.toISOString,
    defaults = {
  delimiter: "&",
  encode: !0,
  encoder: utils.encode,
  encodeValuesOnly: !1,
  serializeDate: function (date) {
    return toISO.call(date);
  },
  skipNulls: !1,
  strictNullHandling: !1
},
    stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly) {
  var obj = object;
  if ("function" == typeof filter) obj = filter(prefix, obj);else if (obj instanceof Date) obj = serializeDate(obj);else if (null === obj) {
    if (strictNullHandling) return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
    obj = "";
  }
  if ("string" == typeof obj || "number" == typeof obj || "boolean" == typeof obj || utils.isBuffer(obj)) return encoder ? [formatter(encodeValuesOnly ? prefix : encoder(prefix)) + "=" + formatter(encoder(obj))] : [formatter(prefix) + "=" + formatter(String(obj))];
  var objKeys,
      values = [];
  if (void 0 === obj) return values;
  if (Array.isArray(filter)) objKeys = filter;else {
    var keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }

  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    skipNulls && null === obj[key] || (values = Array.isArray(obj) ? values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly)) : values.concat(stringify(obj[key], prefix + (allowDots ? "." + key : "[" + key + "]"), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly)));
  }

  return values;
},
    stringify_1 = function (object, opts) {
  var obj = object,
      options = opts || {};
  if (null !== options.encoder && void 0 !== options.encoder && "function" != typeof options.encoder) throw new TypeError("Encoder has to be a function.");
  var delimiter = void 0 === options.delimiter ? defaults.delimiter : options.delimiter,
      strictNullHandling = "boolean" == typeof options.strictNullHandling ? options.strictNullHandling : defaults.strictNullHandling,
      skipNulls = "boolean" == typeof options.skipNulls ? options.skipNulls : defaults.skipNulls,
      encode = "boolean" == typeof options.encode ? options.encode : defaults.encode,
      encoder = "function" == typeof options.encoder ? options.encoder : defaults.encoder,
      sort = "function" == typeof options.sort ? options.sort : null,
      allowDots = void 0 !== options.allowDots && options.allowDots,
      serializeDate = "function" == typeof options.serializeDate ? options.serializeDate : defaults.serializeDate,
      encodeValuesOnly = "boolean" == typeof options.encodeValuesOnly ? options.encodeValuesOnly : defaults.encodeValuesOnly;
  if (void 0 === options.format) options.format = formats.default;else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) throw new TypeError("Unknown format option provided.");
  var objKeys,
      filter,
      formatter = formats.formatters[options.format];
  "function" == typeof options.filter ? obj = (filter = options.filter)("", obj) : Array.isArray(options.filter) && (objKeys = filter = options.filter);
  var arrayFormat,
      keys = [];
  if ("object" != typeof obj || null === obj) return "";
  arrayFormat = options.arrayFormat in arrayPrefixGenerators ? options.arrayFormat : "indices" in options ? options.indices ? "indices" : "repeat" : "indices";
  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
  objKeys || (objKeys = Object.keys(obj)), sort && objKeys.sort(sort);

  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    skipNulls && null === obj[key] || (keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode ? encoder : null, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly)));
  }

  return keys.join(delimiter);
},
    has = Object.prototype.hasOwnProperty,
    defaults$1 = {
  allowDots: !1,
  allowPrototypes: !1,
  arrayLimit: 20,
  decoder: utils.decode,
  delimiter: "&",
  depth: 5,
  parameterLimit: 1e3,
  plainObjects: !1,
  strictNullHandling: !1
},
    parseValues = function (str, options) {
  for (var obj = {}, parts = str.split(options.delimiter, options.parameterLimit === 1 / 0 ? void 0 : options.parameterLimit), i = 0; i < parts.length; ++i) {
    var key,
        val,
        part = parts[i],
        pos = -1 === part.indexOf("]=") ? part.indexOf("=") : part.indexOf("]=") + 1;
    -1 === pos ? (key = options.decoder(part), val = options.strictNullHandling ? null : "") : (key = options.decoder(part.slice(0, pos)), val = options.decoder(part.slice(pos + 1))), has.call(obj, key) ? obj[key] = [].concat(obj[key]).concat(val) : obj[key] = val;
  }

  return obj;
},
    parseObject = function (chain, val, options) {
  if (!chain.length) return val;
  var obj,
      root = chain.shift();
  if ("[]" === root) obj = (obj = []).concat(parseObject(chain, val, options));else {
    obj = options.plainObjects ? Object.create(null) : {};
    var cleanRoot = "[" === root.charAt(0) && "]" === root.charAt(root.length - 1) ? root.slice(1, -1) : root,
        index = parseInt(cleanRoot, 10);
    !isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit ? (obj = [])[index] = parseObject(chain, val, options) : obj[cleanRoot] = parseObject(chain, val, options);
  }
  return obj;
},
    parseKeys = function (givenKey, val, options) {
  if (givenKey) {
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey,
        child = /(\[[^[\]]*])/g,
        segment = /(\[[^[\]]*])/.exec(key),
        parent = segment ? key.slice(0, segment.index) : key,
        keys = [];

    if (parent) {
      if (!options.plainObjects && has.call(Object.prototype, parent) && !options.allowPrototypes) return;
      keys.push(parent);
    }

    for (var i = 0; null !== (segment = child.exec(key)) && i < options.depth;) {
      if (i += 1, !options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1)) && !options.allowPrototypes) return;
      keys.push(segment[1]);
    }

    return segment && keys.push("[" + key.slice(segment.index) + "]"), parseObject(keys, val, options);
  }
},
    parse = function (str, opts) {
  var options = opts || {};
  if (null !== options.decoder && void 0 !== options.decoder && "function" != typeof options.decoder) throw new TypeError("Decoder has to be a function.");
  if (options.delimiter = "string" == typeof options.delimiter || utils.isRegExp(options.delimiter) ? options.delimiter : defaults$1.delimiter, options.depth = "number" == typeof options.depth ? options.depth : defaults$1.depth, options.arrayLimit = "number" == typeof options.arrayLimit ? options.arrayLimit : defaults$1.arrayLimit, options.parseArrays = !1 !== options.parseArrays, options.decoder = "function" == typeof options.decoder ? options.decoder : defaults$1.decoder, options.allowDots = "boolean" == typeof options.allowDots ? options.allowDots : defaults$1.allowDots, options.plainObjects = "boolean" == typeof options.plainObjects ? options.plainObjects : defaults$1.plainObjects, options.allowPrototypes = "boolean" == typeof options.allowPrototypes ? options.allowPrototypes : defaults$1.allowPrototypes, options.parameterLimit = "number" == typeof options.parameterLimit ? options.parameterLimit : defaults$1.parameterLimit, options.strictNullHandling = "boolean" == typeof options.strictNullHandling ? options.strictNullHandling : defaults$1.strictNullHandling, "" === str || null == str) return options.plainObjects ? Object.create(null) : {};

  for (var tempObj = "string" == typeof str ? parseValues(str, options) : str, obj = options.plainObjects ? Object.create(null) : {}, keys = Object.keys(tempObj), i = 0; i < keys.length; ++i) {
    var key = keys[i],
        newObj = parseKeys(key, tempObj[key], options);
    obj = utils.merge(obj, newObj, options);
  }

  return utils.compact(obj);
},
    lib = {
  formats: formats,
  parse: parse,
  stringify: stringify_1
},
    componentEmitter = createCommonjsModule$1(function (module) {
  function Emitter(obj) {
    if (obj) return function (obj) {
      for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];

      return obj;
    }(obj);
  }

  module.exports = Emitter, Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
    return this._callbacks = this._callbacks || {}, (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn), this;
  }, Emitter.prototype.once = function (event, fn) {
    function on() {
      this.off(event, on), fn.apply(this, arguments);
    }

    return on.fn = fn, this.on(event, on), this;
  }, Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
    if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
    var cb,
        callbacks = this._callbacks["$" + event];
    if (!callbacks) return this;
    if (1 == arguments.length) return delete this._callbacks["$" + event], this;

    for (var i = 0; i < callbacks.length; i++) if ((cb = callbacks[i]) === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }

    return this;
  }, Emitter.prototype.emit = function (event) {
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1),
        callbacks = this._callbacks["$" + event];
    if (callbacks) for (var i = 0, len = (callbacks = callbacks.slice(0)).length; i < len; ++i) callbacks[i].apply(this, args);
    return this;
  }, Emitter.prototype.listeners = function (event) {
    return this._callbacks = this._callbacks || {}, this._callbacks["$" + event] || [];
  }, Emitter.prototype.hasListeners = function (event) {
    return !!this.listeners(event).length;
  };
});

function isObject(obj) {
  return null !== obj && "object" == typeof obj;
}

var isObject_1 = isObject,
    requestBase = RequestBase;

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

function mixin(obj) {
  for (var key in RequestBase.prototype) obj[key] = RequestBase.prototype[key];

  return obj;
}

RequestBase.prototype.clearTimeout = function () {
  return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, this;
}, RequestBase.prototype.parse = function (fn) {
  return this._parser = fn, this;
}, RequestBase.prototype.responseType = function (val) {
  return this._responseType = val, this;
}, RequestBase.prototype.serialize = function (fn) {
  return this._serializer = fn, this;
}, RequestBase.prototype.timeout = function (options) {
  if (!options || "object" != typeof options) return this._timeout = options, this._responseTimeout = 0, this;

  for (var option in options) switch (option) {
    case "deadline":
      this._timeout = options.deadline;
      break;

    case "response":
      this._responseTimeout = options.response;
      break;

    default:
      console.warn("Unknown timeout option", option);
  }

  return this;
}, RequestBase.prototype.retry = function (count, fn) {
  return 0 !== arguments.length && !0 !== count || (count = 1), count <= 0 && (count = 0), this._maxRetries = count, this._retries = 0, this._retryCallback = fn, this;
};
var ERROR_CODES = ["ECONNRESET", "ETIMEDOUT", "EADDRINFO", "ESOCKETTIMEDOUT"];
RequestBase.prototype._shouldRetry = function (err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) return !1;
  if (this._retryCallback) try {
    var override = this._retryCallback(err, res);

    if (!0 === override) return !0;
    if (!1 === override) return !1;
  } catch (e) {
    console.error(e);
  }
  if (res && res.status && res.status >= 500 && 501 != res.status) return !0;

  if (err) {
    if (err.code && ~ERROR_CODES.indexOf(err.code)) return !0;
    if (err.timeout && "ECONNABORTED" == err.code) return !0;
    if (err.crossDomain) return !0;
  }

  return !1;
}, RequestBase.prototype._retry = function () {
  return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this._end();
}, RequestBase.prototype.then = function (resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"), this._fullfilledPromise = new Promise(function (innerResolve, innerReject) {
      self.end(function (err, res) {
        err ? innerReject(err) : innerResolve(res);
      });
    });
  }

  return this._fullfilledPromise.then(resolve, reject);
}, RequestBase.prototype.catch = function (cb) {
  return this.then(void 0, cb);
}, RequestBase.prototype.use = function (fn) {
  return fn(this), this;
}, RequestBase.prototype.ok = function (cb) {
  if ("function" != typeof cb) throw Error("Callback required");
  return this._okCallback = cb, this;
}, RequestBase.prototype._isResponseOK = function (res) {
  return !!res && (this._okCallback ? this._okCallback(res) : res.status >= 200 && res.status < 300);
}, RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
}, RequestBase.prototype.getHeader = RequestBase.prototype.get, RequestBase.prototype.set = function (field, val) {
  if (isObject_1(field)) {
    for (var key in field) this.set(key, field[key]);

    return this;
  }

  return this._header[field.toLowerCase()] = val, this.header[field] = val, this;
}, RequestBase.prototype.unset = function (field) {
  return delete this._header[field.toLowerCase()], delete this.header[field], this;
}, RequestBase.prototype.field = function (name, val) {
  if (null == name) throw new Error(".field(name, val) name can not be empty");

  if (this._data && console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"), isObject_1(name)) {
    for (var key in name) this.field(key, name[key]);

    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) this.field(name, val[i]);

    return this;
  }

  if (null == val) throw new Error(".field(name, val) val can not be empty");
  return "boolean" == typeof val && (val = "" + val), this._getFormData().append(name, val), this;
}, RequestBase.prototype.abort = function () {
  return this._aborted ? this : (this._aborted = !0, this.xhr && this.xhr.abort(), this.req && this.req.abort(), this.clearTimeout(), this.emit("abort"), this);
}, RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
  switch (options.type) {
    case "basic":
      this.set("Authorization", "Basic " + base64Encoder(user + ":" + pass));
      break;

    case "auto":
      this.username = user, this.password = pass;
      break;

    case "bearer":
      this.set("Authorization", "Bearer " + user);
  }

  return this;
}, RequestBase.prototype.withCredentials = function (on) {
  return null == on && (on = !0), this._withCredentials = on, this;
}, RequestBase.prototype.redirects = function (n) {
  return this._maxRedirects = n, this;
}, RequestBase.prototype.maxResponseSize = function (n) {
  if ("number" != typeof n) throw TypeError("Invalid argument");
  return this._maxResponseSize = n, this;
}, RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
}, RequestBase.prototype.send = function (data) {
  var isObj = isObject_1(data),
      type = this._header["content-type"];
  if (this._formData && console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"), isObj && !this._data) Array.isArray(data) ? this._data = [] : this._isHost(data) || (this._data = {});else if (data && this._data && this._isHost(this._data)) throw Error("Can't merge these send calls");
  if (isObj && isObject_1(this._data)) for (var key in data) this._data[key] = data[key];else "string" == typeof data ? (type || this.type("form"), type = this._header["content-type"], this._data = "application/x-www-form-urlencoded" == type ? this._data ? this._data + "&" + data : data : (this._data || "") + data) : this._data = data;
  return !isObj || this._isHost(data) ? this : (type || this.type("json"), this);
}, RequestBase.prototype.sortQuery = function (sort) {
  return this._sort = void 0 === sort || sort, this;
}, RequestBase.prototype._finalizeQueryString = function () {
  var query = this._query.join("&");

  if (query && (this.url += (this.url.indexOf("?") >= 0 ? "&" : "?") + query), this._query.length = 0, this._sort) {
    var index = this.url.indexOf("?");

    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split("&");
      "function" == typeof this._sort ? queryArr.sort(this._sort) : queryArr.sort(), this.url = this.url.substring(0, index) + "?" + queryArr.join("&");
    }
  }
}, RequestBase.prototype._appendQueryString = function () {
  console.trace("Unsupported");
}, RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (!this._aborted) {
    var err = new Error(reason + timeout + "ms exceeded");
    err.timeout = timeout, err.code = "ECONNABORTED", err.errno = errno, this.timedout = !0, this.abort(), this.callback(err);
  }
}, RequestBase.prototype._setTimeouts = function () {
  var self = this;
  this._timeout && !this._timer && (this._timer = setTimeout(function () {
    self._timeoutError("Timeout of ", self._timeout, "ETIME");
  }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(function () {
    self._timeoutError("Response timeout of ", self._responseTimeout, "ETIMEDOUT");
  }, this._responseTimeout));
};

var type = function (str) {
  return str.split(/ *; */).shift();
},
    params = function (str) {
  return str.split(/ *; */).reduce(function (obj, str) {
    var parts = str.split(/ *= */),
        key = parts.shift(),
        val = parts.shift();
    return key && val && (obj[key] = val), obj;
  }, {});
},
    parseLinks = function (str) {
  return str.split(/ *, */).reduce(function (obj, str) {
    var parts = str.split(/ *; */),
        url = parts[0].slice(1, -1);
    return obj[parts[1].split(/ *= */)[1].slice(1, -1)] = url, obj;
  }, {});
},
    cleanHeader = function (header, changesOrigin) {
  return delete header["content-type"], delete header["content-length"], delete header["transfer-encoding"], delete header.host, changesOrigin && (delete header.authorization, delete header.cookie), header;
},
    utils$1 = {
  type: type,
  params: params,
  parseLinks: parseLinks,
  cleanHeader: cleanHeader
},
    responseBase = ResponseBase;

function ResponseBase(obj) {
  if (obj) return mixin$1(obj);
}

function mixin$1(obj) {
  for (var key in ResponseBase.prototype) obj[key] = ResponseBase.prototype[key];

  return obj;
}

function Agent() {
  this._defaults = [];
}

ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
}, ResponseBase.prototype._setHeaderProperties = function (header) {
  var ct = header["content-type"] || "";
  this.type = utils$1.type(ct);
  var params = utils$1.params(ct);

  for (var key in params) this[key] = params[key];

  this.links = {};

  try {
    header.link && (this.links = utils$1.parseLinks(header.link));
  } catch (err) {}
}, ResponseBase.prototype._setStatusProperties = function (status) {
  var type = status / 100 | 0;
  this.status = this.statusCode = status, this.statusType = type, this.info = 1 == type, this.ok = 2 == type, this.redirect = 3 == type, this.clientError = 4 == type, this.serverError = 5 == type, this.error = (4 == type || 5 == type) && this.toError(), this.accepted = 202 == status, this.noContent = 204 == status, this.badRequest = 400 == status, this.unauthorized = 401 == status, this.notAcceptable = 406 == status, this.forbidden = 403 == status, this.notFound = 404 == status;
}, ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function (fn) {
  Agent.prototype[fn] = function () {
    return this._defaults.push({
      fn: fn,
      arguments: arguments
    }), this;
  };
}), Agent.prototype._setDefaults = function (req) {
  this._defaults.forEach(function (def) {
    req[def.fn].apply(req, def.arguments);
  });
};

for (var agentBase = Agent, client = createCommonjsModule$1(function (module, exports) {
  var root;

  function noop() {}

  "undefined" != typeof window ? root = window : "undefined" != typeof self ? root = self : (console.warn("Using browser-only version of superagent in non-browser environment"), root = commonjsGlobal$1);

  var request = exports = module.exports = function (method, url) {
    return "function" == typeof url ? new exports.Request("GET", method).end(url) : 1 == arguments.length ? new exports.Request("GET", method) : new exports.Request(method, url);
  };

  exports.Request = Request, request.getXHR = function () {
    if (!(!root.XMLHttpRequest || root.location && "file:" == root.location.protocol && root.ActiveXObject)) return new XMLHttpRequest();

    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}

    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}

    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}

    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}

    throw Error("Browser-only version of superagent could not find XHR");
  };
  var trim = "".trim ? function (s) {
    return s.trim();
  } : function (s) {
    return s.replace(/(^\s*|\s*$)/g, "");
  };

  function serialize(obj) {
    if (!isObject_1(obj)) return obj;
    var pairs = [];

    for (var key in obj) pushEncodedKeyValuePair(pairs, key, obj[key]);

    return pairs.join("&");
  }

  function pushEncodedKeyValuePair(pairs, key, val) {
    if (null != val) {
      if (Array.isArray(val)) val.forEach(function (v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });else if (isObject_1(val)) for (var subkey in val) pushEncodedKeyValuePair(pairs, key + "[" + subkey + "]", val[subkey]);else pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
    } else null === val && pairs.push(encodeURIComponent(key));
  }

  function parseString(str) {
    for (var pair, pos, obj = {}, pairs = str.split("&"), i = 0, len = pairs.length; i < len; ++i) -1 == (pos = (pair = pairs[i]).indexOf("=")) ? obj[decodeURIComponent(pair)] = "" : obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));

    return obj;
  }

  function isJSON(mime) {
    return /[\/+]json($|[^-\w])/.test(mime);
  }

  function Response(req) {
    this.req = req, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || void 0 === this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;
    var status = this.xhr.status;
    1223 === status && (status = 204), this._setStatusProperties(status), this.header = this.headers = function (str) {
      for (var index, line, field, val, lines = str.split(/\r?\n/), fields = {}, i = 0, len = lines.length; i < len; ++i) -1 !== (index = (line = lines[i]).indexOf(":")) && (field = line.slice(0, index).toLowerCase(), val = trim(line.slice(index + 1)), fields[field] = val);

      return fields;
    }(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), null === this.text && req._responseType ? this.body = this.xhr.response : this.body = "HEAD" != this.req.method ? this._parseBody(this.text ? this.text : this.xhr.response) : null;
  }

  function Request(method, url) {
    var self = this;
    this._query = this._query || [], this.method = method, this.url = url, this.header = {}, this._header = {}, this.on("end", function () {
      var new_err,
          err = null,
          res = null;

      try {
        res = new Response(self);
      } catch (e) {
        return (err = new Error("Parser is unable to parse the response")).parse = !0, err.original = e, self.xhr ? (err.rawResponse = void 0 === self.xhr.responseType ? self.xhr.responseText : self.xhr.response, err.status = self.xhr.status ? self.xhr.status : null, err.statusCode = err.status) : (err.rawResponse = null, err.status = null), self.callback(err);
      }

      self.emit("response", res);

      try {
        self._isResponseOK(res) || (new_err = new Error(res.statusText || "Unsuccessful HTTP response"));
      } catch (custom_err) {
        new_err = custom_err;
      }

      new_err ? (new_err.original = err, new_err.response = res, new_err.status = res.status, self.callback(new_err, res)) : self.callback(null, res);
    });
  }

  function del(url, data, fn) {
    var req = request("DELETE", url);
    return "function" == typeof data && (fn = data, data = null), data && req.send(data), fn && req.end(fn), req;
  }

  request.serializeObject = serialize, request.parseString = parseString, request.types = {
    html: "text/html",
    json: "application/json",
    xml: "text/xml",
    urlencoded: "application/x-www-form-urlencoded",
    form: "application/x-www-form-urlencoded",
    "form-data": "application/x-www-form-urlencoded"
  }, request.serialize = {
    "application/x-www-form-urlencoded": serialize,
    "application/json": JSON.stringify
  }, request.parse = {
    "application/x-www-form-urlencoded": parseString,
    "application/json": JSON.parse
  }, responseBase(Response.prototype), Response.prototype._parseBody = function (str) {
    var parse = request.parse[this.type];
    return this.req._parser ? this.req._parser(this, str) : (!parse && isJSON(this.type) && (parse = request.parse["application/json"]), parse && str && (str.length || str instanceof Object) ? parse(str) : null);
  }, Response.prototype.toError = function () {
    var req = this.req,
        method = req.method,
        url = req.url,
        msg = "cannot " + method + " " + url + " (" + this.status + ")",
        err = new Error(msg);
    return err.status = this.status, err.method = method, err.url = url, err;
  }, request.Response = Response, componentEmitter(Request.prototype), requestBase(Request.prototype), Request.prototype.type = function (type) {
    return this.set("Content-Type", request.types[type] || type), this;
  }, Request.prototype.accept = function (type) {
    return this.set("Accept", request.types[type] || type), this;
  }, Request.prototype.auth = function (user, pass, options) {
    1 === arguments.length && (pass = ""), "object" == typeof pass && null !== pass && (options = pass, pass = ""), options || (options = {
      type: "function" == typeof btoa ? "basic" : "auto"
    });
    return this._auth(user, pass, options, function (string) {
      if ("function" == typeof btoa) return btoa(string);
      throw new Error("Cannot use basic auth, btoa is not a function");
    });
  }, Request.prototype.query = function (val) {
    return "string" != typeof val && (val = serialize(val)), val && this._query.push(val), this;
  }, Request.prototype.attach = function (field, file, options) {
    if (file) {
      if (this._data) throw Error("superagent can't mix .send() and .attach()");

      this._getFormData().append(field, file, options || file.name);
    }

    return this;
  }, Request.prototype._getFormData = function () {
    return this._formData || (this._formData = new root.FormData()), this._formData;
  }, Request.prototype.callback = function (err, res) {
    if (this._shouldRetry(err, res)) return this._retry();
    var fn = this._callback;
    this.clearTimeout(), err && (this._maxRetries && (err.retries = this._retries - 1), this.emit("error", err)), fn(err, res);
  }, Request.prototype.crossDomainError = function () {
    var err = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
    err.crossDomain = !0, err.status = this.status, err.method = this.method, err.url = this.url, this.callback(err);
  }, Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function () {
    return console.warn("This is not supported in browser version of superagent"), this;
  }, Request.prototype.pipe = Request.prototype.write = function () {
    throw Error("Streaming is not supported in browser version of superagent");
  }, Request.prototype._isHost = function (obj) {
    return obj && "object" == typeof obj && !Array.isArray(obj) && "[object Object]" !== Object.prototype.toString.call(obj);
  }, Request.prototype.end = function (fn) {
    return this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = fn || noop, this._finalizeQueryString(), this._end();
  }, Request.prototype._end = function () {
    var self = this,
        xhr = this.xhr = request.getXHR(),
        data = this._formData || this._data;
    this._setTimeouts(), xhr.onreadystatechange = function () {
      var readyState = xhr.readyState;

      if (readyState >= 2 && self._responseTimeoutTimer && clearTimeout(self._responseTimeoutTimer), 4 == readyState) {
        var status;

        try {
          status = xhr.status;
        } catch (e) {
          status = 0;
        }

        if (!status) {
          if (self.timedout || self._aborted) return;
          return self.crossDomainError();
        }

        self.emit("end");
      }
    };

    var handleProgress = function (direction, e) {
      e.total > 0 && (e.percent = e.loaded / e.total * 100), e.direction = direction, self.emit("progress", e);
    };

    if (this.hasListeners("progress")) try {
      xhr.onprogress = handleProgress.bind(null, "download"), xhr.upload && (xhr.upload.onprogress = handleProgress.bind(null, "upload"));
    } catch (e) {}

    try {
      this.username && this.password ? xhr.open(this.method, this.url, !0, this.username, this.password) : xhr.open(this.method, this.url, !0);
    } catch (err) {
      return this.callback(err);
    }

    if (this._withCredentials && (xhr.withCredentials = !0), !this._formData && "GET" != this.method && "HEAD" != this.method && "string" != typeof data && !this._isHost(data)) {
      var contentType = this._header["content-type"],
          serialize = this._serializer || request.serialize[contentType ? contentType.split(";")[0] : ""];
      !serialize && isJSON(contentType) && (serialize = request.serialize["application/json"]), serialize && (data = serialize(data));
    }

    for (var field in this.header) null != this.header[field] && this.header.hasOwnProperty(field) && xhr.setRequestHeader(field, this.header[field]);

    return this._responseType && (xhr.responseType = this._responseType), this.emit("request", this), xhr.send(void 0 !== data ? data : null), this;
  }, request.agent = function () {
    return new agentBase();
  }, ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function (method) {
    agentBase.prototype[method.toLowerCase()] = function (url, fn) {
      var req = new request.Request(method, url);
      return this._setDefaults(req), fn && req.end(fn), req;
    };
  }), agentBase.prototype.del = agentBase.prototype.delete, request.get = function (url, data, fn) {
    var req = request("GET", url);
    return "function" == typeof data && (fn = data, data = null), data && req.query(data), fn && req.end(fn), req;
  }, request.head = function (url, data, fn) {
    var req = request("HEAD", url);
    return "function" == typeof data && (fn = data, data = null), data && req.query(data), fn && req.end(fn), req;
  }, request.options = function (url, data, fn) {
    var req = request("OPTIONS", url);
    return "function" == typeof data && (fn = data, data = null), data && req.send(data), fn && req.end(fn), req;
  }, request.del = del, request.delete = del, request.patch = function (url, data, fn) {
    var req = request("PATCH", url);
    return "function" == typeof data && (fn = data, data = null), data && req.send(data), fn && req.end(fn), req;
  }, request.post = function (url, data, fn) {
    var req = request("POST", url);
    return "function" == typeof data && (fn = data, data = null), data && req.send(data), fn && req.end(fn), req;
  }, request.put = function (url, data, fn) {
    var req = request("PUT", url);
    return "function" == typeof data && (fn = data, data = null), data && req.send(data), fn && req.end(fn), req;
  };
}), client_1 = client.Request, byteLength_1 = byteLength, toByteArray_1 = toByteArray, fromByteArray_1 = fromByteArray, lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup[i] = code[i], revLookup[code.charCodeAt(i)] = i;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
  return "=" === b64[len - 2] ? 2 : "=" === b64[len - 1] ? 1 : 0;
}

function byteLength(b64) {
  return 3 * b64.length / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i,
      j,
      l,
      tmp,
      placeHolders,
      arr,
      len = b64.length;
  placeHolders = placeHoldersCount(b64), arr = new Arr(3 * len / 4 - placeHolders), l = placeHolders > 0 ? len - 4 : len;
  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)], arr[L++] = tmp >> 16 & 255, arr[L++] = tmp >> 8 & 255, arr[L++] = 255 & tmp;

  return 2 === placeHolders ? (tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4, arr[L++] = 255 & tmp) : 1 === placeHolders && (tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2, arr[L++] = tmp >> 8 & 255, arr[L++] = 255 & tmp), arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
}

function encodeChunk(uint8, start, end) {
  for (var tmp, output = [], i = start; i < end; i += 3) tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2], output.push(tripletToBase64(tmp));

  return output.join("");
}

function fromByteArray(uint8) {
  for (var tmp, len = uint8.length, extraBytes = len % 3, output = "", parts = [], i = 0, len2 = len - extraBytes; i < len2; i += 16383) parts.push(encodeChunk(uint8, i, i + 16383 > len2 ? len2 : i + 16383));

  return 1 === extraBytes ? (tmp = uint8[len - 1], output += lookup[tmp >> 2], output += lookup[tmp << 4 & 63], output += "==") : 2 === extraBytes && (tmp = (uint8[len - 2] << 8) + uint8[len - 1], output += lookup[tmp >> 10], output += lookup[tmp >> 4 & 63], output += lookup[tmp << 2 & 63], output += "="), parts.push(output), parts.join("");
}

revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
var base64Js = {
  byteLength: byteLength_1,
  toByteArray: toByteArray_1,
  fromByteArray: fromByteArray_1
};

function padding(str) {
  var mod = str.length % 4;
  return 0 === mod ? str : str + new Array(1 + (4 - mod)).join("=");
}

function stringToByteArray(str) {
  for (var arr = new Array(str.length), a = 0; a < str.length; a++) arr[a] = str.charCodeAt(a);

  return arr;
}

function byteArrayToString(array) {
  for (var result = "", i = 0; i < array.length; i++) result += String.fromCharCode(array[i]);

  return result;
}

function encode(str) {
  return base64Js.fromByteArray(stringToByteArray(str)).replace(/\+/g, "-").replace(/\//g, "_");
}

function decode(str) {
  return str = padding(str).replace(/-/g, "+").replace(/_/g, "/"), byteArrayToString(base64Js.toByteArray(str));
}

var base64Url = {
  encode: encode,
  decode: decode
},
    version = {
  raw: "9.8.2"
};

function RequestWrapper(req) {
  this.request = req, this.method = req.method, this.url = req.url, this.body = req._data, this.headers = req._header;
}

function RequestObj(req) {
  this.request = req;
}

function RequestBuilder(options) {
  this._sendTelemetry = !1 !== options._sendTelemetry || options._sendTelemetry, this._telemetryInfo = options._telemetryInfo || null, this._timesToRetryFailedRequests = options._timesToRetryFailedRequests, this.headers = options.headers || {};
}

RequestWrapper.prototype.abort = function () {
  this.request.abort();
}, RequestWrapper.prototype.getMethod = function () {
  return this.method;
}, RequestWrapper.prototype.getBody = function () {
  return this.body;
}, RequestWrapper.prototype.getUrl = function () {
  return this.url;
}, RequestWrapper.prototype.getHeaders = function () {
  return this.headers;
}, RequestObj.prototype.set = function (key, value) {
  return this.request = this.request.set(key, value), this;
}, RequestObj.prototype.send = function (body) {
  return this.request = this.request.send(body), this;
}, RequestObj.prototype.withCredentials = function () {
  return this.request = this.request.withCredentials(), this;
}, RequestObj.prototype.end = function (cb) {
  return this.request = this.request.end(cb), new RequestWrapper(this.request);
}, RequestBuilder.prototype.setCommonConfiguration = function (ongoingRequest, options) {
  if (options = options || {}, this._timesToRetryFailedRequests > 0 && (ongoingRequest = ongoingRequest.retry(this._timesToRetryFailedRequests)), options.noHeaders) return ongoingRequest;
  var headers = this.headers;
  ongoingRequest = ongoingRequest.set("Content-Type", "application/json");

  for (var keys = Object.keys(this.headers), a = 0; a < keys.length; a++) ongoingRequest = ongoingRequest.set(keys[a], headers[keys[a]]);

  return this._sendTelemetry && (ongoingRequest = ongoingRequest.set("Auth0-Client", this.getTelemetryData())), ongoingRequest;
}, RequestBuilder.prototype.getTelemetryData = function () {
  var clientInfo = this._telemetryInfo || {
    name: "auth0.js",
    version: version.raw
  },
      jsonClientInfo = JSON.stringify(clientInfo);
  return base64Url.encode(jsonClientInfo);
}, RequestBuilder.prototype.get = function (url, options) {
  return new RequestObj(this.setCommonConfiguration(client.get(url), options));
}, RequestBuilder.prototype.post = function (url, options) {
  return new RequestObj(this.setCommonConfiguration(client.post(url), options));
}, RequestBuilder.prototype.patch = function (url, options) {
  return new RequestObj(this.setCommonConfiguration(client.patch(url), options));
};
var toString = Object.prototype.toString;

function attribute(o, attr, type, text) {
  if (type = "array" === type ? "object" : type, o && typeof o[attr] !== type) throw new Error(text);
}

function variable(o, type, text) {
  if (typeof o !== type) throw new Error(text);
}

function value(o, values, text) {
  if (-1 === values.indexOf(o)) throw new Error(text);
}

function check(o, config, attributes) {
  if (config.optional && !o || variable(o, config.type, config.message), "object" === config.type && attributes) for (var keys = Object.keys(attributes), index = 0; index < keys.length; index++) {
    var a = keys[index];
    attributes[a].optional && !o[a] || attributes[a].condition && !attributes[a].condition(o) || (attribute(o, a, attributes[a].type, attributes[a].message), attributes[a].values && value(o[a], attributes[a].values, attributes[a].value_message));
  }
}

function isArray(array) {
  return this.supportsIsArray() ? Array.isArray(array) : "[object Array]" === toString.call(array);
}

function supportsIsArray() {
  return null != Array.isArray;
}

var assert = {
  check: check,
  attribute: attribute,
  variable: variable,
  value: value,
  isArray: isArray,
  supportsIsArray: supportsIsArray
};

function get() {
  return Object.assign ? Object.assign : objectAssignPolyfill;
}

function objectAssignPolyfill(target) {
  if (null == target) throw new TypeError("Cannot convert first argument to object");

  for (var to = Object(target), i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (null != nextSource) for (var keysArray = Object.keys(Object(nextSource)), nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex],
          desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      void 0 !== desc && desc.enumerable && (to[nextKey] = nextSource[nextKey]);
    }
  }

  return to;
}

var objectAssign = {
  get: get,
  objectAssignPolyfill: objectAssignPolyfill
};

function pick(object, keys) {
  return keys.reduce(function (prev, key) {
    return object[key] && (prev[key] = object[key]), prev;
  }, {});
}

function getKeysNotIn(obj, allowedKeys) {
  var notAllowed = [];

  for (var key in obj) -1 === allowedKeys.indexOf(key) && notAllowed.push(key);

  return notAllowed;
}

function objectValues(obj) {
  var values = [];

  for (var key in obj) values.push(obj[key]);

  return values;
}

function extend() {
  var params = objectValues(arguments);
  return params.unshift({}), objectAssign.get().apply(void 0, params);
}

function merge(object, keys) {
  return {
    base: keys ? pick(object, keys) : object,
    with: function (object2, keys2) {
      return object2 = keys2 ? pick(object2, keys2) : object2, extend(this.base, object2);
    }
  };
}

function blacklist(object, blacklistedKeys) {
  return Object.keys(object).reduce(function (p, key) {
    return -1 === blacklistedKeys.indexOf(key) && (p[key] = object[key]), p;
  }, {});
}

function camelToSnake(str) {
  for (var code, newKey = "", index = 0, wasPrevNumber = !0, wasPrevUppercase = !0; index < str.length;) code = str.charCodeAt(index), !wasPrevUppercase && code >= 65 && code <= 90 || !wasPrevNumber && code >= 48 && code <= 57 ? (newKey += "_", newKey += str[index].toLowerCase()) : newKey += str[index].toLowerCase(), wasPrevNumber = code >= 48 && code <= 57, wasPrevUppercase = code >= 65 && code <= 90, index++;

  return newKey;
}

function snakeToCamel(str) {
  var parts = str.split("_");
  return parts.reduce(function (p, c) {
    return p + c.charAt(0).toUpperCase() + c.slice(1);
  }, parts.shift());
}

function toSnakeCase(object, exceptions) {
  return "object" != typeof object || assert.isArray(object) || null === object ? object : (exceptions = exceptions || [], Object.keys(object).reduce(function (p, key) {
    return p[-1 === exceptions.indexOf(key) ? camelToSnake(key) : key] = toSnakeCase(object[key]), p;
  }, {}));
}

function toCamelCase(object, exceptions) {
  return "object" != typeof object || assert.isArray(object) || null === object ? object : (exceptions = exceptions || [], Object.keys(object).reduce(function (p, key) {
    return p[-1 === exceptions.indexOf(key) ? snakeToCamel(key) : key] = toCamelCase(object[key]), p;
  }, {}));
}

function getLocationFromUrl(href) {
  var match = href.match(/^(https?:|file:)\/\/(([^:\/?#]*)(?::([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
    href: href,
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  };
}

function getOriginFromUrl(url) {
  if (url) {
    var parsed = getLocationFromUrl(url),
        origin = parsed.protocol + "//" + parsed.hostname;
    return parsed.port && (origin += ":" + parsed.port), origin;
  }
}

var objectHelper = {
  toSnakeCase: toSnakeCase,
  toCamelCase: toCamelCase,
  blacklist: blacklist,
  merge: merge,
  pick: pick,
  getKeysNotIn: getKeysNotIn,
  extend: extend,
  getOriginFromUrl: getOriginFromUrl,
  getLocationFromUrl: getLocationFromUrl
};

function redirect(url) {
  getWindow().location = url;
}

function getDocument() {
  return getWindow().document;
}

function getWindow() {
  return window;
}

function getOrigin() {
  var location = getWindow().location,
      origin = location.origin;
  return origin || (origin = objectHelper.getOriginFromUrl(location.href)), origin;
}

var windowHandler = {
  redirect: redirect,
  getDocument: getDocument,
  getWindow: getWindow,
  getOrigin: getOrigin
};

function DummyStorage() {}

DummyStorage.prototype.getItem = function () {
  return null;
}, DummyStorage.prototype.removeItem = function () {}, DummyStorage.prototype.setItem = function () {};
var js_cookie = createCommonjsModule$1(function (module, exports) {
  !function (factory) {
    if (module.exports = factory(), !!0) ;
  }(function () {
    function extend() {
      for (var i = 0, result = {}; i < arguments.length; i++) {
        var attributes = arguments[i];

        for (var key in attributes) result[key] = attributes[key];
      }

      return result;
    }

    return function init(converter) {
      function api(key, value, attributes) {
        var result;

        if ("undefined" != typeof document) {
          if (arguments.length > 1) {
            if ("number" == typeof (attributes = extend({
              path: "/"
            }, api.defaults, attributes)).expires) {
              var expires = new Date();
              expires.setMilliseconds(expires.getMilliseconds() + 864e5 * attributes.expires), attributes.expires = expires;
            }

            attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";

            try {
              result = JSON.stringify(value), /^[\{\[]/.test(result) && (value = result);
            } catch (e) {}

            value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), key = (key = (key = encodeURIComponent(String(key))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
            var stringifiedAttributes = "";

            for (var attributeName in attributes) attributes[attributeName] && (stringifiedAttributes += "; " + attributeName, !0 !== attributes[attributeName] && (stringifiedAttributes += "=" + attributes[attributeName]));

            return document.cookie = key + "=" + value + stringifiedAttributes;
          }

          key || (result = {});

          for (var cookies = document.cookie ? document.cookie.split("; ") : [], rdecode = /(%[0-9A-Z]{2})+/g, i = 0; i < cookies.length; i++) {
            var parts = cookies[i].split("="),
                cookie = parts.slice(1).join("=");
            this.json || '"' !== cookie.charAt(0) || (cookie = cookie.slice(1, -1));

            try {
              var name = parts[0].replace(rdecode, decodeURIComponent);
              if (cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent), this.json) try {
                cookie = JSON.parse(cookie);
              } catch (e) {}

              if (key === name) {
                result = cookie;
                break;
              }

              key || (result[name] = cookie);
            } catch (e) {}
          }

          return result;
        }
      }

      return api.set = api, api.get = function (key) {
        return api.call(api, key);
      }, api.getJSON = function () {
        return api.apply({
          json: !0
        }, [].slice.call(arguments));
      }, api.defaults = {}, api.remove = function (key, attributes) {
        api(key, "", extend(attributes, {
          expires: -1
        }));
      }, api.withConverter = init, api;
    }(function () {});
  });
});

function CookieStorage() {}

function Warn(options) {
  this.disableWarnings = options.disableWarnings;
}

function StorageHandler(options) {
  if (this.warn = new Warn({}), this.storage = new CookieStorage(), !0 === options.__tryLocalStorageFirst) try {
    var localStorage = windowHandler.getWindow().localStorage;
    localStorage && (this.storage = localStorage);
  } catch (e) {
    this.warn.warning(e), this.warn.warning("Can't use localStorage. Using CookieStorage instead.");
  }
}

function Storage(options) {
  this.handler = new StorageHandler(options);
}

function SSODataStorage(options) {
  this.storage = new Storage(options);
}

function buildResponse(error, description) {
  return {
    error: error,
    errorDescription: description
  };
}

function invalidToken(description) {
  return buildResponse("invalid_token", description);
}

CookieStorage.prototype.getItem = function (key) {
  return js_cookie.get(key);
}, CookieStorage.prototype.removeItem = function (key) {
  js_cookie.remove(key);
}, CookieStorage.prototype.setItem = function (key, value, options) {
  var params = objectHelper.extend({
    expires: 1
  }, options);
  js_cookie.set(key, value, params);
}, Warn.prototype.warning = function (message) {
  this.disableWarnings || console.warn(message);
}, StorageHandler.prototype.failover = function () {
  this.storage instanceof DummyStorage ? this.warn.warning("DummyStorage: ignore failover") : this.storage instanceof CookieStorage ? (this.warn.warning("CookieStorage: failing over DummyStorage"), this.storage = new DummyStorage()) : (this.warn.warning("LocalStorage: failing over CookieStorage"), this.storage = new CookieStorage());
}, StorageHandler.prototype.getItem = function (key) {
  try {
    return this.storage.getItem(key);
  } catch (e) {
    return this.warn.warning(e), this.failover(), this.getItem(key);
  }
}, StorageHandler.prototype.removeItem = function (key) {
  try {
    return this.storage.removeItem(key);
  } catch (e) {
    return this.warn.warning(e), this.failover(), this.removeItem(key);
  }
}, StorageHandler.prototype.setItem = function (key, value, options) {
  try {
    return this.storage.setItem(key, value, options);
  } catch (e) {
    return this.warn.warning(e), this.failover(), this.setItem(key, value, options);
  }
}, Storage.prototype.getItem = function (key) {
  var value = this.handler.getItem(key);

  try {
    return JSON.parse(value);
  } catch (_) {
    return value;
  }
}, Storage.prototype.removeItem = function (key) {
  return this.handler.removeItem(key);
}, Storage.prototype.setItem = function (key, value, options) {
  var json = JSON.stringify(value);
  return this.handler.setItem(key, json, options);
}, SSODataStorage.prototype.set = function (connection, sub) {
  var ssodata = {
    lastUsedConnection: connection,
    lastUsedSub: sub
  };
  this.storage.setItem("auth0.ssodata", JSON.stringify(ssodata));
}, SSODataStorage.prototype.get = function () {
  var ssodata = this.storage.getItem("auth0.ssodata");
  if (ssodata) return JSON.parse(ssodata);
};
var error = {
  buildResponse: buildResponse,
  invalidToken: invalidToken
};

function wrapCallback(cb, options) {
  return (options = options || {}).ignoreCasing = !!options.ignoreCasing && options.ignoreCasing, function (err, data) {
    var errObj;
    return err || data ? (!err && data.err && (err = data.err, data = null), !err && data.error && (err = data, data = null), err ? (errObj = {
      original: err
    }, err.response && err.response.statusCode && (errObj.statusCode = err.response.statusCode), err.response && err.response.statusText && (errObj.statusText = err.response.statusText), err.response && err.response.body && (err = err.response.body), err.err && (err = err.err), errObj.code = err.code || err.error || err.error_code || err.status || null, errObj.description = err.errorDescription || err.error_description || err.description || err.error || err.details || err.err || null, options.forceLegacyError && (errObj.error = errObj.code, errObj.error_description = errObj.description), err.name && (errObj.name = err.name), err.policy && (errObj.policy = err.policy), cb(errObj)) : !data.type || "text/html" !== data.type && "text/plain" !== data.type ? options.ignoreCasing ? cb(null, data.body || data) : cb(null, objectHelper.toCamelCase(data.body || data)) : cb(null, data.text)) : cb(error.buildResponse("generic_error", "Something went wrong"));
  };
}

var tokenParams = ["realm", "audience", "client_id", "client_secret", "redirect_uri", "scope", "code", "grant_type", "username", "password", "refresh_token", "assertion", "client_assertion", "client_assertion_type", "code_verifier"],
    authorizeParams = ["connection", "connection_scope", "auth0Client", "owp", "device", "realm", "protocol", "_csrf", "_intstate", "login_ticket", "client_id", "response_type", "response_mode", "redirect_uri", "audience", "scope", "state", "nonce", "display", "prompt", "max_age", "ui_locales", "claims_locales", "id_token_hint", "login_hint", "acr_values", "claims", "registration", "request", "request_uri", "code_challenge", "code_challenge_method", "access_type", "display"];

function oauthAuthorizeParams(warn, params) {
  var notAllowed = objectHelper.getKeysNotIn(params, authorizeParams);
  return notAllowed.length > 0 && warn.warning("Following parameters are not allowed on the `/authorize` endpoint: [" + notAllowed.join(",") + "]"), params;
}

function oauthTokenParams(warn, params) {
  return objectHelper.pick(params, tokenParams);
}

var parametersWhitelist = {
  oauthTokenParams: oauthTokenParams,
  oauthAuthorizeParams: oauthAuthorizeParams
},
    core = createCommonjsModule$1(function (module, exports) {
  var CryptoJS;
  module.exports = (CryptoJS = CryptoJS || function (Math, undefined) {
    var create = Object.create || function () {
      function F() {}

      return function (obj) {
        var subtype;
        return F.prototype = obj, subtype = new F(), F.prototype = null, subtype;
      };
    }(),
        C = {},
        C_lib = C.lib = {},
        Base = C_lib.Base = {
      extend: function (overrides) {
        var subtype = create(this);
        return overrides && subtype.mixIn(overrides), subtype.hasOwnProperty("init") && this.init !== subtype.init || (subtype.init = function () {
          subtype.$super.init.apply(this, arguments);
        }), subtype.init.prototype = subtype, subtype.$super = this, subtype;
      },
      create: function () {
        var instance = this.extend();
        return instance.init.apply(instance, arguments), instance;
      },
      init: function () {},
      mixIn: function (properties) {
        for (var propertyName in properties) properties.hasOwnProperty(propertyName) && (this[propertyName] = properties[propertyName]);

        properties.hasOwnProperty("toString") && (this.toString = properties.toString);
      },
      clone: function () {
        return this.init.prototype.extend(this);
      }
    },
        WordArray = C_lib.WordArray = Base.extend({
      init: function (words, sigBytes) {
        words = this.words = words || [], this.sigBytes = null != sigBytes ? sigBytes : 4 * words.length;
      },
      toString: function (encoder) {
        return (encoder || Hex).stringify(this);
      },
      concat: function (wordArray) {
        var thisWords = this.words,
            thatWords = wordArray.words,
            thisSigBytes = this.sigBytes,
            thatSigBytes = wordArray.sigBytes;
        if (this.clamp(), thisSigBytes % 4) for (var i = 0; i < thatSigBytes; i++) {
          var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
          thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
        } else for (var i = 0; i < thatSigBytes; i += 4) thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
        return this.sigBytes += thatSigBytes, this;
      },
      clamp: function () {
        var words = this.words,
            sigBytes = this.sigBytes;
        words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8, words.length = Math.ceil(sigBytes / 4);
      },
      clone: function () {
        var clone = Base.clone.call(this);
        return clone.words = this.words.slice(0), clone;
      },
      random: function (nBytes) {
        for (var rcache, words = [], r = function (m_w) {
          var m_w = m_w,
              m_z = 987654321,
              mask = 4294967295;
          return function () {
            var result = ((m_z = 36969 * (65535 & m_z) + (m_z >> 16) & mask) << 16) + (m_w = 18e3 * (65535 & m_w) + (m_w >> 16) & mask) & mask;
            return result /= 4294967296, (result += .5) * (Math.random() > .5 ? 1 : -1);
          };
        }, i = 0; i < nBytes; i += 4) {
          var _r = r(4294967296 * (rcache || Math.random()));

          rcache = 987654071 * _r(), words.push(4294967296 * _r() | 0);
        }

        return new WordArray.init(words, nBytes);
      }
    }),
        C_enc = C.enc = {},
        Hex = C_enc.Hex = {
      stringify: function (wordArray) {
        for (var words = wordArray.words, sigBytes = wordArray.sigBytes, hexChars = [], i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
          hexChars.push((bite >>> 4).toString(16)), hexChars.push((15 & bite).toString(16));
        }

        return hexChars.join("");
      },
      parse: function (hexStr) {
        for (var hexStrLength = hexStr.length, words = [], i = 0; i < hexStrLength; i += 2) words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;

        return new WordArray.init(words, hexStrLength / 2);
      }
    },
        Latin1 = C_enc.Latin1 = {
      stringify: function (wordArray) {
        for (var words = wordArray.words, sigBytes = wordArray.sigBytes, latin1Chars = [], i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
          latin1Chars.push(String.fromCharCode(bite));
        }

        return latin1Chars.join("");
      },
      parse: function (latin1Str) {
        for (var latin1StrLength = latin1Str.length, words = [], i = 0; i < latin1StrLength; i++) words[i >>> 2] |= (255 & latin1Str.charCodeAt(i)) << 24 - i % 4 * 8;

        return new WordArray.init(words, latin1StrLength);
      }
    },
        Utf8 = C_enc.Utf8 = {
      stringify: function (wordArray) {
        try {
          return decodeURIComponent(escape(Latin1.stringify(wordArray)));
        } catch (e) {
          throw new Error("Malformed UTF-8 data");
        }
      },
      parse: function (utf8Str) {
        return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
      }
    },
        BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
      reset: function () {
        this._data = new WordArray.init(), this._nDataBytes = 0;
      },
      _append: function (data) {
        "string" == typeof data && (data = Utf8.parse(data)), this._data.concat(data), this._nDataBytes += data.sigBytes;
      },
      _process: function (doFlush) {
        var data = this._data,
            dataWords = data.words,
            dataSigBytes = data.sigBytes,
            blockSize = this.blockSize,
            blockSizeBytes = 4 * blockSize,
            nBlocksReady = dataSigBytes / blockSizeBytes,
            nWordsReady = (nBlocksReady = doFlush ? Math.ceil(nBlocksReady) : Math.max((0 | nBlocksReady) - this._minBufferSize, 0)) * blockSize,
            nBytesReady = Math.min(4 * nWordsReady, dataSigBytes);

        if (nWordsReady) {
          for (var offset = 0; offset < nWordsReady; offset += blockSize) this._doProcessBlock(dataWords, offset);

          var processedWords = dataWords.splice(0, nWordsReady);
          data.sigBytes -= nBytesReady;
        }

        return new WordArray.init(processedWords, nBytesReady);
      },
      clone: function () {
        var clone = Base.clone.call(this);
        return clone._data = this._data.clone(), clone;
      },
      _minBufferSize: 0
    }),
        C_algo = (C_lib.Hasher = BufferedBlockAlgorithm.extend({
      cfg: Base.extend(),
      init: function (cfg) {
        this.cfg = this.cfg.extend(cfg), this.reset();
      },
      reset: function () {
        BufferedBlockAlgorithm.reset.call(this), this._doReset();
      },
      update: function (messageUpdate) {
        return this._append(messageUpdate), this._process(), this;
      },
      finalize: function (messageUpdate) {
        messageUpdate && this._append(messageUpdate);

        var hash = this._doFinalize();

        return hash;
      },
      blockSize: 16,
      _createHelper: function (hasher) {
        return function (message, cfg) {
          return new hasher.init(cfg).finalize(message);
        };
      },
      _createHmacHelper: function (hasher) {
        return function (message, key) {
          return new C_algo.HMAC.init(hasher, key).finalize(message);
        };
      }
    }), C.algo = {});

    return C;
  }(Math), CryptoJS);
}),
    sha256 = createCommonjsModule$1(function (module, exports) {
  var CryptoJS;
  module.exports = (CryptoJS = core, function (Math) {
    var C = CryptoJS,
        C_lib = C.lib,
        WordArray = C_lib.WordArray,
        Hasher = C_lib.Hasher,
        C_algo = C.algo,
        H = [],
        K = [];
    !function () {
      function isPrime(n) {
        for (var sqrtN = Math.sqrt(n), factor = 2; factor <= sqrtN; factor++) if (!(n % factor)) return !1;

        return !0;
      }

      function getFractionalBits(n) {
        return 4294967296 * (n - (0 | n)) | 0;
      }

      for (var n = 2, nPrime = 0; nPrime < 64;) isPrime(n) && (nPrime < 8 && (H[nPrime] = getFractionalBits(Math.pow(n, .5))), K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3)), nPrime++), n++;
    }();
    var W = [],
        SHA256 = C_algo.SHA256 = Hasher.extend({
      _doReset: function () {
        this._hash = new WordArray.init(H.slice(0));
      },
      _doProcessBlock: function (M, offset) {
        for (var H = this._hash.words, a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7], i = 0; i < 64; i++) {
          if (i < 16) W[i] = 0 | M[offset + i];else {
            var gamma0x = W[i - 15],
                gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3,
                gamma1x = W[i - 2],
                gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
            W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
          }
          var maj = a & b ^ a & c ^ b & c,
              sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22),
              t1 = h + ((e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25)) + (e & f ^ ~e & g) + K[i] + W[i];
          h = g, g = f, f = e, e = d + t1 | 0, d = c, c = b, b = a, a = t1 + (sigma0 + maj) | 0;
        }

        H[0] = H[0] + a | 0, H[1] = H[1] + b | 0, H[2] = H[2] + c | 0, H[3] = H[3] + d | 0, H[4] = H[4] + e | 0, H[5] = H[5] + f | 0, H[6] = H[6] + g | 0, H[7] = H[7] + h | 0;
      },
      _doFinalize: function () {
        var data = this._data,
            dataWords = data.words,
            nBitsTotal = 8 * this._nDataBytes,
            nBitsLeft = 8 * data.sigBytes;
        return dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32, dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = Math.floor(nBitsTotal / 4294967296), dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = nBitsTotal, data.sigBytes = 4 * dataWords.length, this._process(), this._hash;
      },
      clone: function () {
        var clone = Hasher.clone.call(this);
        return clone._hash = this._hash.clone(), clone;
      }
    });
    C.SHA256 = Hasher._createHelper(SHA256), C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
  }(Math), CryptoJS.SHA256);
}),
    encBase64 = createCommonjsModule$1(function (module, exports) {
  var CryptoJS, C, WordArray;
  module.exports = (WordArray = (C = CryptoJS = core).lib.WordArray, C.enc.Base64 = {
    stringify: function (wordArray) {
      var words = wordArray.words,
          sigBytes = wordArray.sigBytes,
          map = this._map;
      wordArray.clamp();

      for (var base64Chars = [], i = 0; i < sigBytes; i += 3) for (var triplet = (words[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, j = 0; j < 4 && i + .75 * j < sigBytes; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));

      var paddingChar = map.charAt(64);
      if (paddingChar) for (; base64Chars.length % 4;) base64Chars.push(paddingChar);
      return base64Chars.join("");
    },
    parse: function (base64Str) {
      var base64StrLength = base64Str.length,
          map = this._map,
          reverseMap = this._reverseMap;

      if (!reverseMap) {
        reverseMap = this._reverseMap = [];

        for (var j = 0; j < map.length; j++) reverseMap[map.charCodeAt(j)] = j;
      }

      var paddingChar = map.charAt(64);

      if (paddingChar) {
        var paddingIndex = base64Str.indexOf(paddingChar);
        -1 !== paddingIndex && (base64StrLength = paddingIndex);
      }

      return function (base64Str, base64StrLength, reverseMap) {
        for (var words = [], nBytes = 0, i = 0; i < base64StrLength; i++) if (i % 4) {
          var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2,
              bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
          words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8, nBytes++;
        }

        return WordArray.create(words, nBytes);
      }(base64Str, base64StrLength, reverseMap);
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  }, CryptoJS.enc.Base64);
}),
    encHex = createCommonjsModule$1(function (module, exports) {
  module.exports = core.enc.Hex;
}),
    jsbn = createCommonjsModule$1(function (module, exports) {
  (function () {
    var dbits;

    function BigInteger(a, b, c) {
      null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b));
    }

    function nbi() {
      return new BigInteger(null);
    }

    var inBrowser = "undefined" != typeof navigator;
    inBrowser && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = function (i, x, w, j, c, n) {
      for (var xl = 32767 & x, xh = x >> 15; --n >= 0;) {
        var l = 32767 & this[i],
            h = this[i++] >> 15,
            m = xh * l + h * xl;
        c = ((l = xl * l + ((32767 & m) << 15) + w[j] + (1073741823 & c)) >>> 30) + (m >>> 15) + xh * h + (c >>> 30), w[j++] = 1073741823 & l;
      }

      return c;
    }, dbits = 30) : inBrowser && "Netscape" != navigator.appName ? (BigInteger.prototype.am = function (i, x, w, j, c, n) {
      for (; --n >= 0;) {
        var v = x * this[i++] + w[j] + c;
        c = Math.floor(v / 67108864), w[j++] = 67108863 & v;
      }

      return c;
    }, dbits = 26) : (BigInteger.prototype.am = function (i, x, w, j, c, n) {
      for (var xl = 16383 & x, xh = x >> 14; --n >= 0;) {
        var l = 16383 & this[i],
            h = this[i++] >> 14,
            m = xh * l + h * xl;
        c = ((l = xl * l + ((16383 & m) << 14) + w[j] + c) >> 28) + (m >> 14) + xh * h, w[j++] = 268435455 & l;
      }

      return c;
    }, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
    BigInteger.prototype.FV = Math.pow(2, 52), BigInteger.prototype.F1 = 52 - dbits, BigInteger.prototype.F2 = 2 * dbits - 52;
    var rr,
        vv,
        BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
        BI_RC = new Array();

    for (rr = "0".charCodeAt(0), vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;

    for (rr = "a".charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

    for (rr = "A".charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

    function int2char(n) {
      return BI_RM.charAt(n);
    }

    function intAt(s, i) {
      var c = BI_RC[s.charCodeAt(i)];
      return null == c ? -1 : c;
    }

    function nbv(i) {
      var r = nbi();
      return r.fromInt(i), r;
    }

    function nbits(x) {
      var t,
          r = 1;
      return 0 != (t = x >>> 16) && (x = t, r += 16), 0 != (t = x >> 8) && (x = t, r += 8), 0 != (t = x >> 4) && (x = t, r += 4), 0 != (t = x >> 2) && (x = t, r += 2), 0 != (t = x >> 1) && (x = t, r += 1), r;
    }

    function Classic(m) {
      this.m = m;
    }

    function Montgomery(m) {
      this.m = m, this.mp = m.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << m.DB - 15) - 1, this.mt2 = 2 * m.t;
    }

    function op_and(x, y) {
      return x & y;
    }

    function op_or(x, y) {
      return x | y;
    }

    function op_xor(x, y) {
      return x ^ y;
    }

    function op_andnot(x, y) {
      return x & ~y;
    }

    function lbit(x) {
      if (0 == x) return -1;
      var r = 0;
      return 0 == (65535 & x) && (x >>= 16, r += 16), 0 == (255 & x) && (x >>= 8, r += 8), 0 == (15 & x) && (x >>= 4, r += 4), 0 == (3 & x) && (x >>= 2, r += 2), 0 == (1 & x) && ++r, r;
    }

    function cbit(x) {
      for (var r = 0; 0 != x;) x &= x - 1, ++r;

      return r;
    }

    function NullExp() {}

    function nNop(x) {
      return x;
    }

    function Barrett(m) {
      this.r2 = nbi(), this.q3 = nbi(), BigInteger.ONE.dlShiftTo(2 * m.t, this.r2), this.mu = this.r2.divide(m), this.m = m;
    }

    Classic.prototype.convert = function (x) {
      return x.s < 0 || x.compareTo(this.m) >= 0 ? x.mod(this.m) : x;
    }, Classic.prototype.revert = function (x) {
      return x;
    }, Classic.prototype.reduce = function (x) {
      x.divRemTo(this.m, null, x);
    }, Classic.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r), this.reduce(r);
    }, Classic.prototype.sqrTo = function (x, r) {
      x.squareTo(r), this.reduce(r);
    }, Montgomery.prototype.convert = function (x) {
      var r = nbi();
      return x.abs().dlShiftTo(this.m.t, r), r.divRemTo(this.m, null, r), x.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(r, r), r;
    }, Montgomery.prototype.revert = function (x) {
      var r = nbi();
      return x.copyTo(r), this.reduce(r), r;
    }, Montgomery.prototype.reduce = function (x) {
      for (; x.t <= this.mt2;) x[x.t++] = 0;

      for (var i = 0; i < this.m.t; ++i) {
        var j = 32767 & x[i],
            u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;

        for (x[j = i + this.m.t] += this.m.am(0, u0, x, i, 0, this.m.t); x[j] >= x.DV;) x[j] -= x.DV, x[++j]++;
      }

      x.clamp(), x.drShiftTo(this.m.t, x), x.compareTo(this.m) >= 0 && x.subTo(this.m, x);
    }, Montgomery.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r), this.reduce(r);
    }, Montgomery.prototype.sqrTo = function (x, r) {
      x.squareTo(r), this.reduce(r);
    }, BigInteger.prototype.copyTo = function (r) {
      for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];

      r.t = this.t, r.s = this.s;
    }, BigInteger.prototype.fromInt = function (x) {
      this.t = 1, this.s = x < 0 ? -1 : 0, x > 0 ? this[0] = x : x < -1 ? this[0] = x + this.DV : this.t = 0;
    }, BigInteger.prototype.fromString = function (s, b) {
      var k;
      if (16 == b) k = 4;else if (8 == b) k = 3;else if (256 == b) k = 8;else if (2 == b) k = 1;else if (32 == b) k = 5;else {
        if (4 != b) return void this.fromRadix(s, b);
        k = 2;
      }
      this.t = 0, this.s = 0;

      for (var i = s.length, mi = !1, sh = 0; --i >= 0;) {
        var x = 8 == k ? 255 & s[i] : intAt(s, i);
        x < 0 ? "-" == s.charAt(i) && (mi = !0) : (mi = !1, 0 == sh ? this[this.t++] = x : sh + k > this.DB ? (this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh, this[this.t++] = x >> this.DB - sh) : this[this.t - 1] |= x << sh, (sh += k) >= this.DB && (sh -= this.DB));
      }

      8 == k && 0 != (128 & s[0]) && (this.s = -1, sh > 0 && (this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh)), this.clamp(), mi && BigInteger.ZERO.subTo(this, this);
    }, BigInteger.prototype.clamp = function () {
      for (var c = this.s & this.DM; this.t > 0 && this[this.t - 1] == c;) --this.t;
    }, BigInteger.prototype.dlShiftTo = function (n, r) {
      var i;

      for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];

      for (i = n - 1; i >= 0; --i) r[i] = 0;

      r.t = this.t + n, r.s = this.s;
    }, BigInteger.prototype.drShiftTo = function (n, r) {
      for (var i = n; i < this.t; ++i) r[i - n] = this[i];

      r.t = Math.max(this.t - n, 0), r.s = this.s;
    }, BigInteger.prototype.lShiftTo = function (n, r) {
      var i,
          bs = n % this.DB,
          cbs = this.DB - bs,
          bm = (1 << cbs) - 1,
          ds = Math.floor(n / this.DB),
          c = this.s << bs & this.DM;

      for (i = this.t - 1; i >= 0; --i) r[i + ds + 1] = this[i] >> cbs | c, c = (this[i] & bm) << bs;

      for (i = ds - 1; i >= 0; --i) r[i] = 0;

      r[ds] = c, r.t = this.t + ds + 1, r.s = this.s, r.clamp();
    }, BigInteger.prototype.rShiftTo = function (n, r) {
      r.s = this.s;
      var ds = Math.floor(n / this.DB);
      if (ds >= this.t) r.t = 0;else {
        var bs = n % this.DB,
            cbs = this.DB - bs,
            bm = (1 << bs) - 1;
        r[0] = this[ds] >> bs;

        for (var i = ds + 1; i < this.t; ++i) r[i - ds - 1] |= (this[i] & bm) << cbs, r[i - ds] = this[i] >> bs;

        bs > 0 && (r[this.t - ds - 1] |= (this.s & bm) << cbs), r.t = this.t - ds, r.clamp();
      }
    }, BigInteger.prototype.subTo = function (a, r) {
      for (var i = 0, c = 0, m = Math.min(a.t, this.t); i < m;) c += this[i] - a[i], r[i++] = c & this.DM, c >>= this.DB;

      if (a.t < this.t) {
        for (c -= a.s; i < this.t;) c += this[i], r[i++] = c & this.DM, c >>= this.DB;

        c += this.s;
      } else {
        for (c += this.s; i < a.t;) c -= a[i], r[i++] = c & this.DM, c >>= this.DB;

        c -= a.s;
      }

      r.s = c < 0 ? -1 : 0, c < -1 ? r[i++] = this.DV + c : c > 0 && (r[i++] = c), r.t = i, r.clamp();
    }, BigInteger.prototype.multiplyTo = function (a, r) {
      var x = this.abs(),
          y = a.abs(),
          i = x.t;

      for (r.t = i + y.t; --i >= 0;) r[i] = 0;

      for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);

      r.s = 0, r.clamp(), this.s != a.s && BigInteger.ZERO.subTo(r, r);
    }, BigInteger.prototype.squareTo = function (r) {
      for (var x = this.abs(), i = r.t = 2 * x.t; --i >= 0;) r[i] = 0;

      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);
        (r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV && (r[i + x.t] -= x.DV, r[i + x.t + 1] = 1);
      }

      r.t > 0 && (r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1)), r.s = 0, r.clamp();
    }, BigInteger.prototype.divRemTo = function (m, q, r) {
      var pm = m.abs();

      if (!(pm.t <= 0)) {
        var pt = this.abs();
        if (pt.t < pm.t) return null != q && q.fromInt(0), void (null != r && this.copyTo(r));
        null == r && (r = nbi());
        var y = nbi(),
            ts = this.s,
            ms = m.s,
            nsh = this.DB - nbits(pm[pm.t - 1]);
        nsh > 0 ? (pm.lShiftTo(nsh, y), pt.lShiftTo(nsh, r)) : (pm.copyTo(y), pt.copyTo(r));
        var ys = y.t,
            y0 = y[ys - 1];

        if (0 != y0) {
          var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0),
              d1 = this.FV / yt,
              d2 = (1 << this.F1) / yt,
              e = 1 << this.F2,
              i = r.t,
              j = i - ys,
              t = null == q ? nbi() : q;

          for (y.dlShiftTo(j, t), r.compareTo(t) >= 0 && (r[r.t++] = 1, r.subTo(t, r)), BigInteger.ONE.dlShiftTo(ys, t), t.subTo(y, y); y.t < ys;) y[y.t++] = 0;

          for (; --j >= 0;) {
            var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) for (y.dlShiftTo(j, t), r.subTo(t, r); r[i] < --qd;) r.subTo(t, r);
          }

          null != q && (r.drShiftTo(ys, q), ts != ms && BigInteger.ZERO.subTo(q, q)), r.t = ys, r.clamp(), nsh > 0 && r.rShiftTo(nsh, r), ts < 0 && BigInteger.ZERO.subTo(r, r);
        }
      }
    }, BigInteger.prototype.invDigit = function () {
      if (this.t < 1) return 0;
      var x = this[0];
      if (0 == (1 & x)) return 0;
      var y = 3 & x;
      return (y = (y = (y = (y = y * (2 - (15 & x) * y) & 15) * (2 - (255 & x) * y) & 255) * (2 - ((65535 & x) * y & 65535)) & 65535) * (2 - x * y % this.DV) % this.DV) > 0 ? this.DV - y : -y;
    }, BigInteger.prototype.isEven = function () {
      return 0 == (this.t > 0 ? 1 & this[0] : this.s);
    }, BigInteger.prototype.exp = function (e, z) {
      if (e > 4294967295 || e < 1) return BigInteger.ONE;
      var r = nbi(),
          r2 = nbi(),
          g = z.convert(this),
          i = nbits(e) - 1;

      for (g.copyTo(r); --i >= 0;) if (z.sqrTo(r, r2), (e & 1 << i) > 0) z.mulTo(r2, g, r);else {
        var t = r;
        r = r2, r2 = t;
      }

      return z.revert(r);
    }, BigInteger.prototype.toString = function (b) {
      if (this.s < 0) return "-" + this.negate().toString(b);
      var k;
      if (16 == b) k = 4;else if (8 == b) k = 3;else if (2 == b) k = 1;else if (32 == b) k = 5;else {
        if (4 != b) return this.toRadix(b);
        k = 2;
      }
      var d,
          km = (1 << k) - 1,
          m = !1,
          r = "",
          i = this.t,
          p = this.DB - i * this.DB % k;
      if (i-- > 0) for (p < this.DB && (d = this[i] >> p) > 0 && (m = !0, r = int2char(d)); i >= 0;) p < k ? (d = (this[i] & (1 << p) - 1) << k - p, d |= this[--i] >> (p += this.DB - k)) : (d = this[i] >> (p -= k) & km, p <= 0 && (p += this.DB, --i)), d > 0 && (m = !0), m && (r += int2char(d));
      return m ? r : "0";
    }, BigInteger.prototype.negate = function () {
      var r = nbi();
      return BigInteger.ZERO.subTo(this, r), r;
    }, BigInteger.prototype.abs = function () {
      return this.s < 0 ? this.negate() : this;
    }, BigInteger.prototype.compareTo = function (a) {
      var r = this.s - a.s;
      if (0 != r) return r;
      var i = this.t;
      if (0 != (r = i - a.t)) return this.s < 0 ? -r : r;

      for (; --i >= 0;) if (0 != (r = this[i] - a[i])) return r;

      return 0;
    }, BigInteger.prototype.bitLength = function () {
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
    }, BigInteger.prototype.mod = function (a) {
      var r = nbi();
      return this.abs().divRemTo(a, null, r), this.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && a.subTo(r, r), r;
    }, BigInteger.prototype.modPowInt = function (e, m) {
      var z;
      return z = e < 256 || m.isEven() ? new Classic(m) : new Montgomery(m), this.exp(e, z);
    }, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), NullExp.prototype.convert = nNop, NullExp.prototype.revert = nNop, NullExp.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
    }, NullExp.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
    }, Barrett.prototype.convert = function (x) {
      if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
      if (x.compareTo(this.m) < 0) return x;
      var r = nbi();
      return x.copyTo(r), this.reduce(r), r;
    }, Barrett.prototype.revert = function (x) {
      return x;
    }, Barrett.prototype.reduce = function (x) {
      for (x.drShiftTo(this.m.t - 1, this.r2), x.t > this.m.t + 1 && (x.t = this.m.t + 1, x.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); x.compareTo(this.r2) < 0;) x.dAddOffset(1, this.m.t + 1);

      for (x.subTo(this.r2, x); x.compareTo(this.m) >= 0;) x.subTo(this.m, x);
    }, Barrett.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r), this.reduce(r);
    }, Barrett.prototype.sqrTo = function (x, r) {
      x.squareTo(r), this.reduce(r);
    };
    var rng_state,
        rng_pool,
        rng_pptr,
        lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
        lplim = (1 << 26) / lowprimes[lowprimes.length - 1];

    function rng_seed_time() {
      var x;
      x = new Date().getTime(), rng_pool[rng_pptr++] ^= 255 & x, rng_pool[rng_pptr++] ^= x >> 8 & 255, rng_pool[rng_pptr++] ^= x >> 16 & 255, rng_pool[rng_pptr++] ^= x >> 24 & 255, rng_pptr >= rng_psize && (rng_pptr -= rng_psize);
    }

    if (BigInteger.prototype.chunkSize = function (r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    }, BigInteger.prototype.toRadix = function (b) {
      if (null == b && (b = 10), 0 == this.signum() || b < 2 || b > 36) return "0";
      var cs = this.chunkSize(b),
          a = Math.pow(b, cs),
          d = nbv(a),
          y = nbi(),
          z = nbi(),
          r = "";

      for (this.divRemTo(d, y, z); y.signum() > 0;) r = (a + z.intValue()).toString(b).substr(1) + r, y.divRemTo(d, y, z);

      return z.intValue().toString(b) + r;
    }, BigInteger.prototype.fromRadix = function (s, b) {
      this.fromInt(0), null == b && (b = 10);

      for (var cs = this.chunkSize(b), d = Math.pow(b, cs), mi = !1, j = 0, w = 0, i = 0; i < s.length; ++i) {
        var x = intAt(s, i);
        x < 0 ? "-" == s.charAt(i) && 0 == this.signum() && (mi = !0) : (w = b * w + x, ++j >= cs && (this.dMultiply(d), this.dAddOffset(w, 0), j = 0, w = 0));
      }

      j > 0 && (this.dMultiply(Math.pow(b, j)), this.dAddOffset(w, 0)), mi && BigInteger.ZERO.subTo(this, this);
    }, BigInteger.prototype.fromNumber = function (a, b, c) {
      if ("number" == typeof b) {
        if (a < 2) this.fromInt(1);else for (this.fromNumber(a, c), this.testBit(a - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b);) this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
      } else {
        var x = new Array(),
            t = 7 & a;
        x.length = 1 + (a >> 3), b.nextBytes(x), t > 0 ? x[0] &= (1 << t) - 1 : x[0] = 0, this.fromString(x, 256);
      }
    }, BigInteger.prototype.bitwiseTo = function (a, op, r) {
      var i,
          f,
          m = Math.min(a.t, this.t);

      for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);

      if (a.t < this.t) {
        for (f = a.s & this.DM, i = m; i < this.t; ++i) r[i] = op(this[i], f);

        r.t = this.t;
      } else {
        for (f = this.s & this.DM, i = m; i < a.t; ++i) r[i] = op(f, a[i]);

        r.t = a.t;
      }

      r.s = op(this.s, a.s), r.clamp();
    }, BigInteger.prototype.changeBit = function (n, op) {
      var r = BigInteger.ONE.shiftLeft(n);
      return this.bitwiseTo(r, op, r), r;
    }, BigInteger.prototype.addTo = function (a, r) {
      for (var i = 0, c = 0, m = Math.min(a.t, this.t); i < m;) c += this[i] + a[i], r[i++] = c & this.DM, c >>= this.DB;

      if (a.t < this.t) {
        for (c += a.s; i < this.t;) c += this[i], r[i++] = c & this.DM, c >>= this.DB;

        c += this.s;
      } else {
        for (c += this.s; i < a.t;) c += a[i], r[i++] = c & this.DM, c >>= this.DB;

        c += a.s;
      }

      r.s = c < 0 ? -1 : 0, c > 0 ? r[i++] = c : c < -1 && (r[i++] = this.DV + c), r.t = i, r.clamp();
    }, BigInteger.prototype.dMultiply = function (n) {
      this[this.t] = this.am(0, n - 1, this, 0, 0, this.t), ++this.t, this.clamp();
    }, BigInteger.prototype.dAddOffset = function (n, w) {
      if (0 != n) {
        for (; this.t <= w;) this[this.t++] = 0;

        for (this[w] += n; this[w] >= this.DV;) this[w] -= this.DV, ++w >= this.t && (this[this.t++] = 0), ++this[w];
      }
    }, BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
      var j,
          i = Math.min(this.t + a.t, n);

      for (r.s = 0, r.t = i; i > 0;) r[--i] = 0;

      for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);

      for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);

      r.clamp();
    }, BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
      --n;
      var i = r.t = this.t + a.t - n;

      for (r.s = 0; --i >= 0;) r[i] = 0;

      for (i = Math.max(n - this.t, 0); i < a.t; ++i) r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);

      r.clamp(), r.drShiftTo(1, r);
    }, BigInteger.prototype.modInt = function (n) {
      if (n <= 0) return 0;
      var d = this.DV % n,
          r = this.s < 0 ? n - 1 : 0;
      if (this.t > 0) if (0 == d) r = this[0] % n;else for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
      return r;
    }, BigInteger.prototype.millerRabin = function (t) {
      var n1 = this.subtract(BigInteger.ONE),
          k = n1.getLowestSetBit();
      if (k <= 0) return !1;
      var r = n1.shiftRight(k);
      (t = t + 1 >> 1) > lowprimes.length && (t = lowprimes.length);

      for (var a = nbi(), i = 0; i < t; ++i) {
        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y = a.modPow(r, this);

        if (0 != y.compareTo(BigInteger.ONE) && 0 != y.compareTo(n1)) {
          for (var j = 1; j++ < k && 0 != y.compareTo(n1);) if (0 == (y = y.modPowInt(2, this)).compareTo(BigInteger.ONE)) return !1;

          if (0 != y.compareTo(n1)) return !1;
        }
      }

      return !0;
    }, BigInteger.prototype.clone = function () {
      var r = nbi();
      return this.copyTo(r), r;
    }, BigInteger.prototype.intValue = function () {
      if (this.s < 0) {
        if (1 == this.t) return this[0] - this.DV;
        if (0 == this.t) return -1;
      } else {
        if (1 == this.t) return this[0];
        if (0 == this.t) return 0;
      }

      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    }, BigInteger.prototype.byteValue = function () {
      return 0 == this.t ? this.s : this[0] << 24 >> 24;
    }, BigInteger.prototype.shortValue = function () {
      return 0 == this.t ? this.s : this[0] << 16 >> 16;
    }, BigInteger.prototype.signum = function () {
      return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1;
    }, BigInteger.prototype.toByteArray = function () {
      var i = this.t,
          r = new Array();
      r[0] = this.s;
      var d,
          p = this.DB - i * this.DB % 8,
          k = 0;
      if (i-- > 0) for (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p && (r[k++] = d | this.s << this.DB - p); i >= 0;) p < 8 ? (d = (this[i] & (1 << p) - 1) << 8 - p, d |= this[--i] >> (p += this.DB - 8)) : (d = this[i] >> (p -= 8) & 255, p <= 0 && (p += this.DB, --i)), 0 != (128 & d) && (d |= -256), 0 == k && (128 & this.s) != (128 & d) && ++k, (k > 0 || d != this.s) && (r[k++] = d);
      return r;
    }, BigInteger.prototype.equals = function (a) {
      return 0 == this.compareTo(a);
    }, BigInteger.prototype.min = function (a) {
      return this.compareTo(a) < 0 ? this : a;
    }, BigInteger.prototype.max = function (a) {
      return this.compareTo(a) > 0 ? this : a;
    }, BigInteger.prototype.and = function (a) {
      var r = nbi();
      return this.bitwiseTo(a, op_and, r), r;
    }, BigInteger.prototype.or = function (a) {
      var r = nbi();
      return this.bitwiseTo(a, op_or, r), r;
    }, BigInteger.prototype.xor = function (a) {
      var r = nbi();
      return this.bitwiseTo(a, op_xor, r), r;
    }, BigInteger.prototype.andNot = function (a) {
      var r = nbi();
      return this.bitwiseTo(a, op_andnot, r), r;
    }, BigInteger.prototype.not = function () {
      for (var r = nbi(), i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];

      return r.t = this.t, r.s = ~this.s, r;
    }, BigInteger.prototype.shiftLeft = function (n) {
      var r = nbi();
      return n < 0 ? this.rShiftTo(-n, r) : this.lShiftTo(n, r), r;
    }, BigInteger.prototype.shiftRight = function (n) {
      var r = nbi();
      return n < 0 ? this.lShiftTo(-n, r) : this.rShiftTo(n, r), r;
    }, BigInteger.prototype.getLowestSetBit = function () {
      for (var i = 0; i < this.t; ++i) if (0 != this[i]) return i * this.DB + lbit(this[i]);

      return this.s < 0 ? this.t * this.DB : -1;
    }, BigInteger.prototype.bitCount = function () {
      for (var r = 0, x = this.s & this.DM, i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);

      return r;
    }, BigInteger.prototype.testBit = function (n) {
      var j = Math.floor(n / this.DB);
      return j >= this.t ? 0 != this.s : 0 != (this[j] & 1 << n % this.DB);
    }, BigInteger.prototype.setBit = function (n) {
      return this.changeBit(n, op_or);
    }, BigInteger.prototype.clearBit = function (n) {
      return this.changeBit(n, op_andnot);
    }, BigInteger.prototype.flipBit = function (n) {
      return this.changeBit(n, op_xor);
    }, BigInteger.prototype.add = function (a) {
      var r = nbi();
      return this.addTo(a, r), r;
    }, BigInteger.prototype.subtract = function (a) {
      var r = nbi();
      return this.subTo(a, r), r;
    }, BigInteger.prototype.multiply = function (a) {
      var r = nbi();
      return this.multiplyTo(a, r), r;
    }, BigInteger.prototype.divide = function (a) {
      var r = nbi();
      return this.divRemTo(a, r, null), r;
    }, BigInteger.prototype.remainder = function (a) {
      var r = nbi();
      return this.divRemTo(a, null, r), r;
    }, BigInteger.prototype.divideAndRemainder = function (a) {
      var q = nbi(),
          r = nbi();
      return this.divRemTo(a, q, r), new Array(q, r);
    }, BigInteger.prototype.modPow = function (e, m) {
      var k,
          z,
          i = e.bitLength(),
          r = nbv(1);
      if (i <= 0) return r;
      k = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6, z = i < 8 ? new Classic(m) : m.isEven() ? new Barrett(m) : new Montgomery(m);
      var g = new Array(),
          n = 3,
          k1 = k - 1,
          km = (1 << k) - 1;

      if (g[1] = z.convert(this), k > 1) {
        var g2 = nbi();

        for (z.sqrTo(g[1], g2); n <= km;) g[n] = nbi(), z.mulTo(g2, g[n - 2], g[n]), n += 2;
      }

      var w,
          t,
          j = e.t - 1,
          is1 = !0,
          r2 = nbi();

      for (i = nbits(e[j]) - 1; j >= 0;) {
        for (i >= k1 ? w = e[j] >> i - k1 & km : (w = (e[j] & (1 << i + 1) - 1) << k1 - i, j > 0 && (w |= e[j - 1] >> this.DB + i - k1)), n = k; 0 == (1 & w);) w >>= 1, --n;

        if ((i -= n) < 0 && (i += this.DB, --j), is1) g[w].copyTo(r), is1 = !1;else {
          for (; n > 1;) z.sqrTo(r, r2), z.sqrTo(r2, r), n -= 2;

          n > 0 ? z.sqrTo(r, r2) : (t = r, r = r2, r2 = t), z.mulTo(r2, g[w], r);
        }

        for (; j >= 0 && 0 == (e[j] & 1 << i);) z.sqrTo(r, r2), t = r, r = r2, r2 = t, --i < 0 && (i = this.DB - 1, --j);
      }

      return z.revert(r);
    }, BigInteger.prototype.modInverse = function (m) {
      var ac = m.isEven();
      if (this.isEven() && ac || 0 == m.signum()) return BigInteger.ZERO;

      for (var u = m.clone(), v = this.clone(), a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1); 0 != u.signum();) {
        for (; u.isEven();) u.rShiftTo(1, u), ac ? (a.isEven() && b.isEven() || (a.addTo(this, a), b.subTo(m, b)), a.rShiftTo(1, a)) : b.isEven() || b.subTo(m, b), b.rShiftTo(1, b);

        for (; v.isEven();) v.rShiftTo(1, v), ac ? (c.isEven() && d.isEven() || (c.addTo(this, c), d.subTo(m, d)), c.rShiftTo(1, c)) : d.isEven() || d.subTo(m, d), d.rShiftTo(1, d);

        u.compareTo(v) >= 0 ? (u.subTo(v, u), ac && a.subTo(c, a), b.subTo(d, b)) : (v.subTo(u, v), ac && c.subTo(a, c), d.subTo(b, d));
      }

      return 0 != v.compareTo(BigInteger.ONE) ? BigInteger.ZERO : d.compareTo(m) >= 0 ? d.subtract(m) : d.signum() < 0 ? (d.addTo(m, d), d.signum() < 0 ? d.add(m) : d) : d;
    }, BigInteger.prototype.pow = function (e) {
      return this.exp(e, new NullExp());
    }, BigInteger.prototype.gcd = function (a) {
      var x = this.s < 0 ? this.negate() : this.clone(),
          y = a.s < 0 ? a.negate() : a.clone();

      if (x.compareTo(y) < 0) {
        var t = x;
        x = y, y = t;
      }

      var i = x.getLowestSetBit(),
          g = y.getLowestSetBit();
      if (g < 0) return x;

      for (i < g && (g = i), g > 0 && (x.rShiftTo(g, x), y.rShiftTo(g, y)); x.signum() > 0;) (i = x.getLowestSetBit()) > 0 && x.rShiftTo(i, x), (i = y.getLowestSetBit()) > 0 && y.rShiftTo(i, y), x.compareTo(y) >= 0 ? (x.subTo(y, x), x.rShiftTo(1, x)) : (y.subTo(x, y), y.rShiftTo(1, y));

      return g > 0 && y.lShiftTo(g, y), y;
    }, BigInteger.prototype.isProbablePrime = function (t) {
      var i,
          x = this.abs();

      if (1 == x.t && x[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i) if (x[0] == lowprimes[i]) return !0;

        return !1;
      }

      if (x.isEven()) return !1;

      for (i = 1; i < lowprimes.length;) {
        for (var m = lowprimes[i], j = i + 1; j < lowprimes.length && m < lplim;) m *= lowprimes[j++];

        for (m = x.modInt(m); i < j;) if (m % lowprimes[i++] == 0) return !1;
      }

      return x.millerRabin(t);
    }, BigInteger.prototype.square = function () {
      var r = nbi();
      return this.squareTo(r), r;
    }, BigInteger.prototype.Barrett = Barrett, null == rng_pool) {
      var t;
      if (rng_pool = new Array(), rng_pptr = 0, "undefined" != typeof window && window.crypto) if (window.crypto.getRandomValues) {
        var ua = new Uint8Array(32);

        for (window.crypto.getRandomValues(ua), t = 0; t < 32; ++t) rng_pool[rng_pptr++] = ua[t];
      } else if ("Netscape" == navigator.appName && navigator.appVersion < "5") {
        var z = window.crypto.random(32);

        for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = 255 & z.charCodeAt(t);
      }

      for (; rng_pptr < rng_psize;) t = Math.floor(65536 * Math.random()), rng_pool[rng_pptr++] = t >>> 8, rng_pool[rng_pptr++] = 255 & t;

      rng_pptr = 0, rng_seed_time();
    }

    function rng_get_byte() {
      if (null == rng_state) {
        for (rng_seed_time(), (rng_state = new Arcfour()).init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;

        rng_pptr = 0;
      }

      return rng_state.next();
    }

    function SecureRandom() {}

    function Arcfour() {
      this.i = 0, this.j = 0, this.S = new Array();
    }

    SecureRandom.prototype.nextBytes = function (ba) {
      var i;

      for (i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
    }, Arcfour.prototype.init = function (key) {
      var i, j, t;

      for (i = 0; i < 256; ++i) this.S[i] = i;

      for (j = 0, i = 0; i < 256; ++i) j = j + this.S[i] + key[i % key.length] & 255, t = this.S[i], this.S[i] = this.S[j], this.S[j] = t;

      this.i = 0, this.j = 0;
    }, Arcfour.prototype.next = function () {
      var t;
      return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255];
    };
    var rng_psize = 256;
    BigInteger.SecureRandom = SecureRandom, BigInteger.BigInteger = BigInteger, module.exports = BigInteger;
  }).call(commonjsGlobal$1);
}),
    BigInteger = jsbn.BigInteger,
    DigestInfoHead = {
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  ripemd160: "3021300906052b2403020105000414"
},
    DigestAlgs = {
  sha256: sha256
};

function RSAVerifier(modulus, exp) {
  if (this.n = null, this.e = 0, !(null != modulus && null != exp && modulus.length > 0 && exp.length > 0)) throw new Error("Invalid key data");
  this.n = new BigInteger(modulus, 16), this.e = parseInt(exp, 16);
}

function getAlgorithmFromDigest(hDigestInfo) {
  for (var algName in DigestInfoHead) {
    var head = DigestInfoHead[algName],
        len = head.length;
    if (hDigestInfo.substring(0, len) === head) return {
      alg: algName,
      hash: hDigestInfo.substring(len)
    };
  }

  return [];
}

RSAVerifier.prototype.verify = function (msg, encsig) {
  encsig = encsig.replace(/[^0-9a-f]|[\s\n]]/gi, "");
  var sig = new BigInteger(encsig, 16);
  if (sig.bitLength() > this.n.bitLength()) throw new Error("Signature does not match with the key modulus.");
  var digestInfo = getAlgorithmFromDigest(sig.modPowInt(this.e, this.n).toString(16).replace(/^1f+00/, ""));
  if (0 === digestInfo.length) return !1;
  if (!DigestAlgs.hasOwnProperty(digestInfo.alg)) throw new Error("Hashing algorithm is not supported.");
  var msgHash = DigestAlgs[digestInfo.alg](msg).toString();
  return digestInfo.hash === msgHash;
};

var rsaVerifier = RSAVerifier;

function padding$1(str) {
  var mod = str.length % 4;
  return 0 === mod ? str : str + new Array(1 + (4 - mod)).join("=");
}

function byteArrayToString$1(array) {
  for (var result = "", i = 0; i < array.length; i++) result += String.fromCharCode(array[i]);

  return result;
}

function stringToByteArray$1(str) {
  for (var arr = new Array(str.length), a = 0; a < str.length; a++) arr[a] = str.charCodeAt(a);

  return arr;
}

function byteArrayToHex(raw) {
  for (var HEX = "", i = 0; i < raw.length; i++) {
    var _hex = raw[i].toString(16);

    HEX += 2 === _hex.length ? _hex : "0" + _hex;
  }

  return HEX;
}

function encodeString(str) {
  return base64Js.fromByteArray(stringToByteArray$1(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode("0x" + p1);
  }))).replace(/\+/g, "-").replace(/\//g, "_");
}

function decodeToString(str) {
  return str = padding$1(str).replace(/\-/g, "+").replace(/_/g, "/"), decodeURIComponent(byteArrayToString$1(base64Js.toByteArray(str)).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}

function decodeToHEX(str) {
  return byteArrayToHex(base64Js.toByteArray(padding$1(str)));
}

function base64ToBase64Url(base64String) {
  var SAFE_URL_ENCODING_MAPPING = {
    "+": "-",
    "/": "_",
    "=": ""
  };
  return base64String.replace(/[+\/=]/g, function (m) {
    return SAFE_URL_ENCODING_MAPPING[m];
  });
}

var base64_1 = {
  encodeString: encodeString,
  decodeToString: decodeToString,
  byteArrayToString: byteArrayToString$1,
  stringToByteArray: stringToByteArray$1,
  padding: padding$1,
  byteArrayToHex: byteArrayToHex,
  decodeToHEX: decodeToHEX,
  base64ToBase64Url: base64ToBase64Url
},
    urlJoin$1 = createCommonjsModule$1(function (module) {
  var context, definition;
  context = commonjsGlobal$1, definition = function () {
    return function () {
      var input = arguments;
      "object" == typeof arguments[0] && (input = arguments[0], arguments[1]);
      var joined = [].slice.call(input, 0).join("/");
      return joined.replace(/:\//g, "://").replace(/([^:\s])\/+/g, "$1/").replace(/\/(\?|&|#[^!])/g, "$1").replace(/(\?.+)\?/g, "$1&");
    };
  }, module.exports ? module.exports = definition() : context.urljoin = definition();
});

function process$1(jwks) {
  return {
    modulus: base64_1.decodeToHEX(jwks.n),
    exp: base64_1.decodeToHEX(jwks.e)
  };
}

function getJWKS(options, cb) {
  var url = options.jwksURI || urlJoin$1(options.iss, ".well-known", "jwks.json");
  return client.get(url).end(function (err, data) {
    var a,
        key,
        matchingKey = null;
    if (err) return cb(err);

    for (a = 0; a < data.body.keys.length && null === matchingKey; a++) (key = data.body.keys[a]).kid === options.kid && (matchingKey = key);

    return cb(null, process$1(matchingKey));
  });
}

var jwks = {
  process: process$1,
  getJWKS: getJWKS
};

function ConfigurationError(message) {
  this.name = "ConfigurationError", this.message = message || "";
}

function TokenValidationError(message) {
  this.name = "TokenValidationError", this.message = message || "";
}

ConfigurationError.prototype = Error.prototype, TokenValidationError.prototype = Error.prototype;
var error$1 = {
  ConfigurationError: ConfigurationError,
  TokenValidationError: TokenValidationError
};

function DummyCache() {}

DummyCache.prototype.get = function () {
  return null;
}, DummyCache.prototype.has = function () {
  return !1;
}, DummyCache.prototype.set = function () {};
var dummyCache = DummyCache,
    supportedAlgs = ["RS256"];

function IdTokenVerifier(parameters) {
  var options = parameters || {};
  if (this.jwksCache = options.jwksCache || new dummyCache(), this.expectedAlg = options.expectedAlg || "RS256", this.issuer = options.issuer, this.audience = options.audience, this.leeway = options.leeway || 0, this.__disableExpirationCheck = options.__disableExpirationCheck || !1, this.jwksURI = options.jwksURI, this.leeway < 0 || this.leeway > 60) throw new error$1.ConfigurationError("The leeway should be positive and lower than a minute.");
  if (-1 === supportedAlgs.indexOf(this.expectedAlg)) throw new error$1.ConfigurationError("Algorithm " + this.expectedAlg + " is not supported. (Expected algs: [" + supportedAlgs.join(",") + "])");
}

IdTokenVerifier.prototype.verify = function (token, nonce, cb) {
  var jwt = this.decode(token);
  if (jwt instanceof Error) return cb(jwt, !1);
  var headAndPayload = jwt.encoded.header + "." + jwt.encoded.payload,
      signature = base64_1.decodeToHEX(jwt.encoded.signature),
      alg = jwt.header.alg,
      kid = jwt.header.kid,
      aud = jwt.payload.aud,
      iss = jwt.payload.iss,
      exp = jwt.payload.exp,
      nbf = jwt.payload.nbf,
      tnonce = jwt.payload.nonce || null;
  if (this.issuer !== iss) return cb(new error$1.TokenValidationError("Issuer " + iss + " is not valid."), !1);
  if (this.audience !== aud) return cb(new error$1.TokenValidationError("Audience " + aud + " is not valid."), !1);
  if (this.expectedAlg !== alg) return cb(new error$1.TokenValidationError("Algorithm " + alg + " is not supported. (Expected algs: [" + supportedAlgs.join(",") + "])"), !1);
  if (tnonce !== nonce) return cb(new error$1.TokenValidationError("Nonce does not match."), !1);
  var expirationError = this.verifyExpAndNbf(exp, nbf);
  return expirationError ? cb(expirationError, !1) : this.getRsaVerifier(iss, kid, function (err, rsaVerifier$$1) {
    return err ? cb(err) : rsaVerifier$$1.verify(headAndPayload, signature) ? cb(null, jwt.payload) : cb(new error$1.TokenValidationError("Invalid signature."));
  });
}, IdTokenVerifier.prototype.verifyExpAndNbf = function (exp, nbf) {
  var now = new Date(),
      expDate = new Date(0),
      nbfDate = new Date(0);
  return this.__disableExpirationCheck ? null : (expDate.setUTCSeconds(exp + this.leeway), now > expDate ? new error$1.TokenValidationError("Expired token.") : void 0 === nbf ? null : (nbfDate.setUTCSeconds(nbf - this.leeway), now < nbfDate ? new error$1.TokenValidationError("The token is not valid until later in the future. Please check your computed clock.") : null));
}, IdTokenVerifier.prototype.verifyExpAndIat = function (exp, iat) {
  var now = new Date(),
      expDate = new Date(0),
      iatDate = new Date(0);
  return this.__disableExpirationCheck ? null : (expDate.setUTCSeconds(exp + this.leeway), now > expDate ? new error$1.TokenValidationError("Expired token.") : (iatDate.setUTCSeconds(iat - this.leeway), now < iatDate ? new error$1.TokenValidationError("The token was issued in the future. Please check your computed clock.") : null));
}, IdTokenVerifier.prototype.getRsaVerifier = function (iss, kid, cb) {
  var _this = this,
      cachekey = iss + kid;

  if (this.jwksCache.has(cachekey)) {
    var keyInfo = this.jwksCache.get(cachekey);
    cb(null, new rsaVerifier(keyInfo.modulus, keyInfo.exp));
  } else jwks.getJWKS({
    jwksURI: this.jwksURI,
    iss: iss,
    kid: kid
  }, function (err, keyInfo) {
    return err ? cb(err) : (_this.jwksCache.set(cachekey, keyInfo), cb(null, new rsaVerifier(keyInfo.modulus, keyInfo.exp)));
  });
}, IdTokenVerifier.prototype.decode = function (token) {
  var header,
      payload,
      parts = token.split(".");
  if (3 !== parts.length) return new error$1.TokenValidationError("Cannot decode a malformed JWT");

  try {
    header = JSON.parse(base64_1.decodeToString(parts[0])), payload = JSON.parse(base64_1.decodeToString(parts[1]));
  } catch (e) {
    return new error$1.TokenValidationError("Token header or payload is not valid JSON");
  }

  return {
    header: header,
    payload: payload,
    encoded: {
      header: parts[0],
      payload: parts[1],
      signature: parts[2]
    }
  };
}, IdTokenVerifier.prototype.validateAccessToken = function (accessToken, alg, atHash, cb) {
  if (this.expectedAlg !== alg) return cb(new error$1.TokenValidationError("Algorithm " + alg + " is not supported. (Expected alg: " + this.expectedAlg + ")"));
  var sha256AccessToken = sha256(accessToken),
      hashToHex = encHex.stringify(sha256AccessToken),
      hashToHexFirstHalf = hashToHex.substring(0, hashToHex.length / 2),
      hashFirstHalfWordArray = encHex.parse(hashToHexFirstHalf),
      hashFirstHalfBase64 = encBase64.stringify(hashFirstHalfWordArray);
  return cb(base64_1.base64ToBase64Url(hashFirstHalfBase64) !== atHash ? new error$1.TokenValidationError("Invalid access_token") : null);
};
var src = IdTokenVerifier;

function PluginHandler(webAuth, plugins) {
  this.plugins = plugins;

  for (var a = 0; a < this.plugins.length; a++) {
    if (this.plugins[a].version !== version.raw) {
      var pluginName = "";
      throw this.plugins[a].constructor && this.plugins[a].constructor.name && (pluginName = this.plugins[a].constructor.name), new Error("Plugin " + pluginName + " version (" + this.plugins[a].version + ") is not compatible with the SDK version (" + version.raw + ")");
    }

    this.plugins[a].setWebAuth(webAuth);
  }
}

function randomString(length) {
  var bytes = new Uint8Array(length),
      result = [],
      charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~",
      cryptoObj = windowHandler.getWindow().crypto || windowHandler.getWindow().msCrypto;
  if (!cryptoObj) return null;

  for (var random = cryptoObj.getRandomValues(bytes), a = 0; a < random.length; a++) result.push(charset[random[a] % charset.length]);

  return result.join("");
}

PluginHandler.prototype.get = function (extensibilityPoint) {
  for (var a = 0; a < this.plugins.length; a++) if (this.plugins[a].supports(extensibilityPoint)) return this.plugins[a].init();

  return null;
};

var random = {
  randomString: randomString
},
    MINUTES_15 = 1 / 96,
    MINUTES_30 = 1 / 48,
    DEFAULT_NAMESPACE = "com.auth0.auth.";

function TransactionManager(options) {
  var transaction = options.transaction || {};
  this.namespace = transaction.namespace || DEFAULT_NAMESPACE, this.keyLength = transaction.keyLength || 32, this.storage = new Storage(options);
}

function IframeHandler(options) {
  if (this.url = options.url, this.callback = options.callback, this.timeout = options.timeout || 6e4, this.timeoutCallback = options.timeoutCallback || null, this.eventListenerType = options.eventListenerType || "message", this.iframe = null, this.timeoutHandle = null, this._destroyTimeout = null, this.transientMessageEventListener = null, this.proxyEventListener = null, this.eventValidator = options.eventValidator || {
    isValid: function () {
      return !0;
    }
  }, "function" != typeof this.callback) throw new Error("options.callback must be a function");
}

function runWebMessageFlow(authorizeUrl, options, callback) {
  new IframeHandler({
    url: authorizeUrl,
    eventListenerType: "message",
    callback: function (eventData) {
      callback(null, eventData);
    },
    timeout: options.timeout,
    eventValidator: {
      isValid: function (eventData) {
        return "authorization_response" === eventData.event.data.type && options.state === eventData.event.data.response.state;
      }
    },
    timeoutCallback: function () {
      callback({
        error: "timeout",
        error_description: "Timeout during executing web_message communication",
        state: options.state
      });
    }
  }).init();
}

function WebMessageHandler(webAuth) {
  this.webAuth = webAuth, this.warn = new Warn(webAuth.baseOptions);
}

function CrossOriginAuthentication(webAuth, options) {
  this.webAuth = webAuth, this.baseOptions = options, this.request = new RequestBuilder(options), this.webMessageHandler = new WebMessageHandler(webAuth), this.storage = new Storage(options);
}

function getFragment(name) {
  var parts = ("&" + windowHandler.getWindow().location.hash.substring(1)).split("&" + name + "=");
  if (2 === parts.length) return parts.pop().split("&").shift();
}

function createKey(origin, coId) {
  return ["co/verifier", encodeURIComponent(origin), encodeURIComponent(coId)].join("/");
}

function tryGetVerifier(storage, key) {
  try {
    var verifier = storage.getItem(key);
    return storage.removeItem(key), verifier || "";
  } catch (e) {
    return "";
  }
}

function Redirect(auth0, options) {
  this.webAuth = auth0, this.baseOptions = options, this.crossOriginAuthentication = new CrossOriginAuthentication(auth0, this.baseOptions), this.warn = new Warn({
    disableWarnings: !!options._disableDeprecationWarnings
  });
}

TransactionManager.prototype.process = function (options) {
  if (!options.responseType) throw new Error("responseType is required");
  var lastUsedConnection = options.realm || options.connection,
      responseTypeIncludesIdToken = -1 !== options.responseType.indexOf("id_token"),
      transaction = this.generateTransaction(options.appState, options.state, options.nonce, lastUsedConnection, responseTypeIncludesIdToken);
  return options.state || (options.state = transaction.state), responseTypeIncludesIdToken && !options.nonce && (options.nonce = transaction.nonce), options;
}, TransactionManager.prototype.generateTransaction = function (appState, state, nonce, lastUsedConnection, generateNonce) {
  return state = state || random.randomString(this.keyLength), nonce = nonce || (generateNonce ? random.randomString(this.keyLength) : null), this.storage.setItem(this.namespace + state, {
    nonce: nonce,
    appState: appState,
    state: state,
    lastUsedConnection: lastUsedConnection
  }, {
    expires: MINUTES_30
  }), {
    state: state,
    nonce: nonce
  };
}, TransactionManager.prototype.getStoredTransaction = function (state) {
  var transactionData;
  return transactionData = this.storage.getItem(this.namespace + state), this.clearTransaction(state), transactionData;
}, TransactionManager.prototype.clearTransaction = function (state) {
  this.storage.removeItem(this.namespace + state);
}, IframeHandler.prototype.init = function () {
  var _this = this,
      _window = windowHandler.getWindow();

  switch (this.iframe = _window.document.createElement("iframe"), this.iframe.style.display = "none", this.proxyEventListener = function (e) {
    _this.eventListener(e);
  }, this.eventListenerType) {
    case "message":
      this.eventSourceObject = _window;
      break;

    case "load":
      this.eventSourceObject = this.iframe;
      break;

    default:
      throw new Error("Unsupported event listener type: " + this.eventListenerType);
  }

  this.eventSourceObject.addEventListener(this.eventListenerType, this.proxyEventListener, !1), _window.document.body.appendChild(this.iframe), this.iframe.src = this.url, this.timeoutHandle = setTimeout(function () {
    _this.timeoutHandler();
  }, this.timeout);
}, IframeHandler.prototype.eventListener = function (event) {
  var eventData = {
    event: event,
    sourceObject: this.eventSourceObject
  };
  this.eventValidator.isValid(eventData) && (this.destroy(), this.callback(eventData));
}, IframeHandler.prototype.timeoutHandler = function () {
  this.destroy(), this.timeoutCallback && this.timeoutCallback();
}, IframeHandler.prototype.destroy = function () {
  var _this = this;

  clearTimeout(this.timeoutHandle), this._destroyTimeout = setTimeout(function () {
    _this.eventSourceObject.removeEventListener(_this.eventListenerType, _this.proxyEventListener, !1), _this.iframe.parentNode && _this.iframe.parentNode.removeChild(_this.iframe);
  }, 0);
}, WebMessageHandler.prototype.run = function (options, cb) {
  var _this = this;

  options.responseMode = "web_message", options.prompt = "none";
  var currentOrigin = windowHandler.getOrigin(),
      redirectUriOrigin = objectHelper.getOriginFromUrl(options.redirectUri);
  if (redirectUriOrigin && currentOrigin !== redirectUriOrigin) return cb({
    error: "origin_mismatch",
    error_description: "The redirectUri's origin (" + redirectUriOrigin + ") should match the window's origin (" + currentOrigin + ")."
  });
  runWebMessageFlow(this.webAuth.client.buildAuthorizeUrl(options), options, function (err, eventData) {
    var error = err;

    if (!err && eventData.event.data.response.error && (error = eventData.event.data.response), !error) {
      var parsedHash = eventData.event.data.response;
      return _this.webAuth.validateAuthenticationResponse(options, parsedHash, cb);
    }

    return "consent_required" === error.error && "localhost" === windowHandler.getWindow().location.hostname && _this.warn.warning("Consent Required. Consent can't be skipped on localhost. Read more here: https://auth0.com/docs/api-auth/user-consent#skipping-consent-for-first-party-clients"), _this.webAuth.transactionManager.clearTransaction(error.state), cb(objectHelper.pick(error, ["error", "error_description"]));
  });
}, CrossOriginAuthentication.prototype.login = function (options, cb) {
  var _this = this,
      url = urlJoin(this.baseOptions.rootUrl, "/co/authenticate");

  options.username = options.username || options.email, delete options.email;
  var authenticateBody = {
    client_id: options.clientID || this.baseOptions.clientID,
    username: options.username
  };
  options.password && (authenticateBody.password = options.password), options.otp && (authenticateBody.otp = options.otp);
  var realm = options.realm || this.baseOptions.realm;

  if (realm) {
    var credentialType = options.credentialType || this.baseOptions.credentialType || "http://auth0.com/oauth/grant-type/password-realm";
    authenticateBody.realm = realm, authenticateBody.credential_type = credentialType;
  } else authenticateBody.credential_type = "password";

  this.request.post(url).withCredentials().send(authenticateBody).end(function (err, data) {
    if (err) {
      var errorObject = err.response && err.response.body || {
        error: "request_error",
        error_description: JSON.stringify(err)
      };
      return wrapCallback(cb, {
        forceLegacyError: !0
      })(errorObject);
    }

    var popupMode = !0 === options.popup;
    options = objectHelper.blacklist(options, ["password", "credentialType", "otp", "popup"]);
    var authorizeOptions = objectHelper.merge(options).with({
      loginTicket: data.body.login_ticket
    }),
        key = createKey(_this.baseOptions.rootUrl, data.body.co_id);
    _this.storage.setItem(key, data.body.co_verifier, {
      expires: MINUTES_15
    }), popupMode ? _this.webMessageHandler.run(authorizeOptions, wrapCallback(cb, {
      forceLegacyError: !0
    })) : _this.webAuth.authorize(authorizeOptions);
  });
}, CrossOriginAuthentication.prototype.callback = function () {
  var targetOrigin = decodeURIComponent(getFragment("origin")),
      theWindow = windowHandler.getWindow(),
      _this = this;

  theWindow.addEventListener("message", function (evt) {
    if ("co_verifier_request" === evt.data.type) {
      var key = createKey(evt.origin, evt.data.request.id),
          verifier = tryGetVerifier(_this.storage, key);
      evt.source.postMessage({
        type: "co_verifier_response",
        response: {
          verifier: verifier
        }
      }, evt.origin);
    }
  }), theWindow.parent.postMessage({
    type: "ready"
  }, targetOrigin);
}, Redirect.prototype.loginWithCredentials = function (options, cb) {
  options.realm = options.realm || options.connection, delete options.connection, this.crossOriginAuthentication.login(options, cb);
}, Redirect.prototype.signupAndLogin = function (options, cb) {
  var _this = this;

  return this.webAuth.client.dbConnection.signup(options, function (err) {
    return err ? cb(err) : (options.realm = options.realm || options.connection, delete options.connection, _this.webAuth.login(options, cb));
  });
};
var winchan = createCommonjsModule$1(function (module) {
  var WinChan = function () {
    var RELAY_FRAME_NAME = "__winchan_relay_frame",
        CLOSE_CMD = "die";

    function addListener(w, event, cb) {
      w.attachEvent ? w.attachEvent("on" + event, cb) : w.addEventListener && w.addEventListener(event, cb, !1);
    }

    function removeListener(w, event, cb) {
      w.detachEvent ? w.detachEvent("on" + event, cb) : w.removeEventListener && w.removeEventListener(event, cb, !1);
    }

    function extractOrigin(url) {
      /^https?:\/\//.test(url) || (url = window.location.href);
      var m = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(url);
      return m ? m[1] : url;
    }

    var isIE = function () {
      if ("undefined" == typeof navigator) return !1;
      var rv = -1,
          ua = navigator.userAgent;
      "Microsoft Internet Explorer" === navigator.appName ? null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(ua) && (rv = parseFloat(RegExp.$1)) : ua.indexOf("Trident") > -1 && null !== new RegExp("rv:([0-9]{2,2}[.0-9]{0,})").exec(ua) && (rv = parseFloat(RegExp.$1));
      return rv >= 8;
    }();

    return "undefined" != typeof window && window.JSON && window.JSON.stringify && window.JSON.parse && window.postMessage ? {
      open: function (opts, cb) {
        if (!cb) throw "missing required callback argument";
        var err, iframe;
        opts.url || (err = "missing required 'url' parameter"), opts.relay_url || (err = "missing required 'relay_url' parameter"), err && setTimeout(function () {
          cb(err);
        }, 0), opts.window_name || (opts.window_name = null), opts.window_features && !function () {
          try {
            var userAgent = navigator.userAgent;
            return -1 != userAgent.indexOf("Fennec/") || -1 != userAgent.indexOf("Firefox/") && -1 != userAgent.indexOf("Android");
          } catch (e) {}

          return !1;
        }() || (opts.window_features = void 0);
        var messageTarget,
            origin = opts.origin || extractOrigin(opts.url);
        if (origin !== extractOrigin(opts.relay_url)) return setTimeout(function () {
          cb("invalid arguments: origin of url and relay_url must match");
        }, 0);
        isIE && ((iframe = document.createElement("iframe")).setAttribute("src", opts.relay_url), iframe.style.display = "none", iframe.setAttribute("name", RELAY_FRAME_NAME), document.body.appendChild(iframe), messageTarget = iframe.contentWindow);
        var w = opts.popup || window.open(opts.url, opts.window_name, opts.window_features);
        opts.popup && (w.location.href = opts.url), messageTarget || (messageTarget = w);
        var closeInterval = setInterval(function () {
          w && w.closed && (cleanup(), cb && (cb("User closed the popup window"), cb = null));
        }, 500),
            req = JSON.stringify({
          a: "request",
          d: opts.params
        });

        function cleanup() {
          if (iframe && document.body.removeChild(iframe), iframe = void 0, closeInterval && (closeInterval = clearInterval(closeInterval)), removeListener(window, "message", onMessage), removeListener(window, "unload", cleanup), w) try {
            w.close();
          } catch (securityViolation) {
            messageTarget.postMessage(CLOSE_CMD, origin);
          }
          w = messageTarget = void 0;
        }

        function onMessage(e) {
          if (e.origin === origin) {
            try {
              var d = JSON.parse(e.data);
            } catch (err) {
              if (cb) return cb(err);
              throw err;
            }

            "ready" === d.a ? messageTarget.postMessage(req, origin) : "error" === d.a ? (cleanup(), cb && (cb(d.d), cb = null)) : "response" === d.a && (cleanup(), cb && (cb(null, d.d), cb = null));
          }
        }

        return addListener(window, "unload", cleanup), addListener(window, "message", onMessage), {
          close: cleanup,
          focus: function () {
            if (w) try {
              w.focus();
            } catch (e) {}
          }
        };
      },
      onOpen: function (cb) {
        var o = "*",
            msgTarget = isIE ? function () {
          window.location;

          for (var frames = window.opener.frames, i = frames.length - 1; i >= 0; i--) try {
            if (frames[i].location.protocol === window.location.protocol && frames[i].location.host === window.location.host && frames[i].name === RELAY_FRAME_NAME) return frames[i];
          } catch (e) {}
        }() : window.opener;
        if (!msgTarget) throw "can't find relay frame";

        function doPost(msg) {
          msg = JSON.stringify(msg), isIE ? msgTarget.doPost(msg, o) : msgTarget.postMessage(msg, o);
        }

        function onDie(e) {
          if (e.data === CLOSE_CMD) try {
            window.close();
          } catch (o_O) {}
        }

        addListener(isIE ? msgTarget : window, "message", function onMessage(e) {
          var d;

          try {
            d = JSON.parse(e.data);
          } catch (err) {}

          d && "request" === d.a && (removeListener(window, "message", onMessage), o = e.origin, cb && setTimeout(function () {
            cb(o, d.d, function (r) {
              cb = void 0, doPost({
                a: "response",
                d: r
              });
            });
          }, 0));
        }), addListener(isIE ? msgTarget : window, "message", onDie);

        try {
          doPost({
            a: "ready"
          });
        } catch (e) {
          addListener(msgTarget, "load", function (e) {
            doPost({
              a: "ready"
            });
          });
        }

        var onUnload = function () {
          try {
            removeListener(isIE ? msgTarget : window, "message", onDie);
          } catch (ohWell) {}

          cb && doPost({
            a: "error",
            d: "client closed window"
          }), cb = void 0;

          try {
            window.close();
          } catch (e) {}
        };

        return addListener(window, "unload", onUnload), {
          detach: function () {
            removeListener(window, "unload", onUnload);
          }
        };
      }
    } : {
      open: function (url, winopts, arg, cb) {
        setTimeout(function () {
          cb("unsupported browser");
        }, 0);
      },
      onOpen: function (cb) {
        setTimeout(function () {
          cb("unsupported browser");
        }, 0);
      }
    };
  }();

  module.exports && (module.exports = WinChan);
});

function extractOrigin(url) {
  /^https?:\/\//.test(url) || (url = window.location.href);
  var m = /^(https?:\/\/[-_a-zA-Z.0-9:]+)/.exec(url);
  return m ? m[1] : url;
}

var urlHelper = {
  extractOrigin: extractOrigin
};

function PopupHandler() {
  this._current_popup = null;
}

function Popup(webAuth, options) {
  this.baseOptions = options, this.baseOptions.popupOrigin = options.popupOrigin, this.client = webAuth.client, this.webAuth = webAuth, this.transactionManager = new TransactionManager(this.baseOptions), this.crossOriginAuthentication = new CrossOriginAuthentication(webAuth, this.baseOptions), this.warn = new Warn({
    disableWarnings: !!options._disableDeprecationWarnings
  });
}

function SilentAuthenticationHandler(options) {
  this.authenticationUrl = options.authenticationUrl, this.timeout = options.timeout || 6e4, this.handler = null, this.postMessageDataType = options.postMessageDataType || !1, this.postMessageOrigin = options.postMessageOrigin || windowHandler.getWindow().location.origin || windowHandler.getWindow().location.protocol + "//" + windowHandler.getWindow().location.hostname + (windowHandler.getWindow().location.port ? ":" + windowHandler.getWindow().location.port : "");
}

function UsernamePassword(options) {
  this.baseOptions = options, this.request = new RequestBuilder(options), this.transactionManager = new TransactionManager(this.baseOptions);
}

function HostedPages(client, options) {
  this.baseOptions = options, this.client = client, this.request = new RequestBuilder(this.baseOptions), this.warn = new Warn({
    disableWarnings: !!options._disableDeprecationWarnings
  });
}

function WebAuth(options) {
  assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    domain: {
      type: "string",
      message: "domain option is required"
    },
    clientID: {
      type: "string",
      message: "clientID option is required"
    },
    responseType: {
      optional: !0,
      type: "string",
      message: "responseType is not valid"
    },
    responseMode: {
      optional: !0,
      type: "string",
      message: "responseMode is not valid"
    },
    redirectUri: {
      optional: !0,
      type: "string",
      message: "redirectUri is not valid"
    },
    scope: {
      optional: !0,
      type: "string",
      message: "scope is not valid"
    },
    audience: {
      optional: !0,
      type: "string",
      message: "audience is not valid"
    },
    popupOrigin: {
      optional: !0,
      type: "string",
      message: "popupOrigin is not valid"
    },
    leeway: {
      optional: !0,
      type: "number",
      message: "leeway is not valid"
    },
    plugins: {
      optional: !0,
      type: "array",
      message: "plugins is not valid"
    },
    _disableDeprecationWarnings: {
      optional: !0,
      type: "boolean",
      message: "_disableDeprecationWarnings option is not valid"
    },
    _sendTelemetry: {
      optional: !0,
      type: "boolean",
      message: "_sendTelemetry option is not valid"
    },
    _telemetryInfo: {
      optional: !0,
      type: "object",
      message: "_telemetryInfo option is not valid"
    },
    _timesToRetryFailedRequests: {
      optional: !0,
      type: "number",
      message: "_timesToRetryFailedRequests option is not valid"
    }
  }), options.overrides && assert.check(options.overrides, {
    type: "object",
    message: "overrides option is not valid"
  }, {
    __tenant: {
      optional: !0,
      type: "string",
      message: "__tenant option is required"
    },
    __token_issuer: {
      optional: !0,
      type: "string",
      message: "__token_issuer option is required"
    },
    __jwks_uri: {
      optional: !0,
      type: "string",
      message: "__jwks_uri is required"
    }
  }), this.baseOptions = options, this.baseOptions.plugins = new PluginHandler(this, this.baseOptions.plugins || []), this.baseOptions._sendTelemetry = !1 !== this.baseOptions._sendTelemetry || this.baseOptions._sendTelemetry, this.baseOptions._timesToRetryFailedRequests = options._timesToRetryFailedRequests ? parseInt(options._timesToRetryFailedRequests, 0) : 0, this.baseOptions.tenant = this.baseOptions.overrides && this.baseOptions.overrides.__tenant || this.baseOptions.domain.split(".")[0], this.baseOptions.token_issuer = this.baseOptions.overrides && this.baseOptions.overrides.__token_issuer || "https://" + this.baseOptions.domain + "/", this.baseOptions.jwksURI = this.baseOptions.overrides && this.baseOptions.overrides.__jwks_uri, this.transactionManager = new TransactionManager(this.baseOptions), this.client = new Authentication(this.baseOptions), this.redirect = new Redirect(this, this.baseOptions), this.popup = new Popup(this, this.baseOptions), this.crossOriginAuthentication = new CrossOriginAuthentication(this, this.baseOptions), this.webMessageHandler = new WebMessageHandler(this), this._universalLogin = new HostedPages(this, this.baseOptions), this.ssodataStorage = new SSODataStorage(this.baseOptions);
}

function buildParseHashResponse(qsParams, appState, token) {
  return {
    accessToken: qsParams.access_token || null,
    idToken: qsParams.id_token || null,
    idTokenPayload: token || null,
    appState: appState || null,
    refreshToken: qsParams.refresh_token || null,
    state: qsParams.state || null,
    expiresIn: qsParams.expires_in ? parseInt(qsParams.expires_in, 10) : null,
    tokenType: qsParams.token_type || null,
    scope: qsParams.scope || null
  };
}

function PasswordlessAuthentication(request, options) {
  this.baseOptions = options, this.request = request;
}

function DBConnection(request, options) {
  this.baseOptions = options, this.request = request;
}

function Authentication(auth0, options) {
  2 === arguments.length ? this.auth0 = auth0 : options = auth0, assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    domain: {
      type: "string",
      message: "domain option is required"
    },
    clientID: {
      type: "string",
      message: "clientID option is required"
    },
    responseType: {
      optional: !0,
      type: "string",
      message: "responseType is not valid"
    },
    responseMode: {
      optional: !0,
      type: "string",
      message: "responseMode is not valid"
    },
    redirectUri: {
      optional: !0,
      type: "string",
      message: "redirectUri is not valid"
    },
    scope: {
      optional: !0,
      type: "string",
      message: "scope is not valid"
    },
    audience: {
      optional: !0,
      type: "string",
      message: "audience is not valid"
    },
    _disableDeprecationWarnings: {
      optional: !0,
      type: "boolean",
      message: "_disableDeprecationWarnings option is not valid"
    },
    _sendTelemetry: {
      optional: !0,
      type: "boolean",
      message: "_sendTelemetry option is not valid"
    },
    _telemetryInfo: {
      optional: !0,
      type: "object",
      message: "_telemetryInfo option is not valid"
    }
  }), this.baseOptions = options, this.baseOptions._sendTelemetry = !1 !== this.baseOptions._sendTelemetry || this.baseOptions._sendTelemetry, this.baseOptions.rootUrl = "https://" + this.baseOptions.domain, this.request = new RequestBuilder(this.baseOptions), this.passwordless = new PasswordlessAuthentication(this.request, this.baseOptions), this.dbConnection = new DBConnection(this.request, this.baseOptions), this.warn = new Warn({
    disableWarnings: !!options._disableDeprecationWarnings
  }), this.ssodataStorage = new SSODataStorage(this.baseOptions);
}

function Management(options) {
  assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    domain: {
      type: "string",
      message: "domain option is required"
    },
    token: {
      type: "string",
      message: "token option is required"
    },
    _sendTelemetry: {
      optional: !0,
      type: "boolean",
      message: "_sendTelemetry option is not valid"
    },
    _telemetryInfo: {
      optional: !0,
      type: "object",
      message: "_telemetryInfo option is not valid"
    }
  }), this.baseOptions = options, this.baseOptions.headers = {
    Authorization: "Bearer " + this.baseOptions.token
  }, this.request = new RequestBuilder(this.baseOptions), this.baseOptions.rootUrl = urlJoin("https://" + this.baseOptions.domain, "api", "v2");
}

PopupHandler.prototype.calculatePosition = function (options) {
  var width = options.width || 500,
      height = options.height || 600,
      _window = windowHandler.getWindow(),
      screenX = void 0 !== _window.screenX ? _window.screenX : _window.screenLeft,
      screenY = void 0 !== _window.screenY ? _window.screenY : _window.screenTop;

  return {
    width: width,
    height: height,
    left: screenX + ((void 0 !== _window.outerWidth ? _window.outerWidth : _window.document.body.clientWidth) - width) / 2,
    top: screenY + ((void 0 !== _window.outerHeight ? _window.outerHeight : _window.document.body.clientHeight) - height) / 2
  };
}, PopupHandler.prototype.preload = function (options) {
  var _this = this,
      _window = windowHandler.getWindow(),
      popupPosition = this.calculatePosition(options.popupOptions || {}),
      popupOptions = objectHelper.merge(popupPosition).with(options.popupOptions),
      url = options.url || "about:blank",
      windowFeatures = lib.stringify(popupOptions, {
    encode: !1,
    delimiter: ","
  });

  return this._current_popup && !this._current_popup.closed ? this._current_popup : (this._current_popup = _window.open(url, "auth0_signup_popup", windowFeatures), this._current_popup.kill = function () {
    this.close(), _this._current_popup = null;
  }, this._current_popup);
}, PopupHandler.prototype.load = function (url, relayUrl, options, cb) {
  var _this = this,
      popupPosition = this.calculatePosition(options.popupOptions || {}),
      popupOptions = objectHelper.merge(popupPosition).with(options.popupOptions),
      winchanOptions = objectHelper.merge({
    url: url,
    relay_url: relayUrl,
    window_features: lib.stringify(popupOptions, {
      delimiter: ",",
      encode: !1
    }),
    popup: this._current_popup
  }).with(options),
      popup = winchan.open(winchanOptions, function (err, data) {
    return _this._current_popup = null, cb(err, data);
  });

  return popup.focus(), popup;
}, Popup.prototype.buildPopupHandler = function () {
  var pluginHandler = this.baseOptions.plugins.get("popup.getPopupHandler");
  return pluginHandler ? pluginHandler.getPopupHandler() : new PopupHandler();
}, Popup.prototype.preload = function (options) {
  options = options || {};
  var popup = this.buildPopupHandler();
  return popup.preload(options), popup;
}, Popup.prototype.getPopupHandler = function (options, preload) {
  return options.popupHandler ? options.popupHandler : preload ? this.preload(options) : this.buildPopupHandler();
}, Popup.prototype.callback = function (options) {
  var _this = this,
      theWindow = windowHandler.getWindow(),
      originUrl = (options = options || {}).popupOrigin || this.baseOptions.popupOrigin || windowHandler.getOrigin();

  theWindow.opener ? winchan.onOpen(function (popupOrigin, r, cb) {
    if (popupOrigin !== originUrl) return cb({
      error: "origin_mismatch",
      error_description: "The popup's origin (" + popupOrigin + ") should match the `popupOrigin` parameter (" + originUrl + ")."
    });

    _this.webAuth.parseHash(options || {}, function (err, data) {
      return cb(err || data);
    });
  }) : theWindow.doPost = function (msg) {
    theWindow.parent && theWindow.parent.postMessage(msg, originUrl);
  };
}, Popup.prototype.authorize = function (options, cb) {
  var url,
      relayUrl,
      popOpts = {},
      pluginHandler = this.baseOptions.plugins.get("popup.authorize"),
      params = objectHelper.merge(this.baseOptions, ["clientID", "scope", "domain", "audience", "tenant", "responseType", "redirectUri", "_csrf", "state", "_intstate", "nonce"]).with(objectHelper.blacklist(options, ["popupHandler"]));
  return assert.check(params, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    responseType: {
      type: "string",
      message: "responseType option is required"
    }
  }), relayUrl = urlJoin(this.baseOptions.rootUrl, "relay.html"), options.owp ? params.owp = !0 : (popOpts.origin = urlHelper.extractOrigin(params.redirectUri), relayUrl = params.redirectUri), options.popupOptions && (popOpts.popupOptions = objectHelper.pick(options.popupOptions, ["width", "height"])), pluginHandler && (params = pluginHandler.processParams(params)), (params = this.transactionManager.process(params)).scope = params.scope || "openid profile email", delete params.domain, url = this.client.buildAuthorizeUrl(params), this.getPopupHandler(options).load(url, relayUrl, popOpts, wrapCallback(cb));
}, Popup.prototype.loginWithCredentials = function (options, cb) {
  options.realm = options.realm || options.connection, options.popup = !0, options = objectHelper.merge(this.baseOptions, ["redirectUri", "responseType", "state", "nonce"]).with(objectHelper.blacklist(options, ["popupHandler", "connection"])), options = this.transactionManager.process(options), this.crossOriginAuthentication.login(options, cb);
}, Popup.prototype.passwordlessVerify = function (options, cb) {
  var _this = this;

  return this.client.passwordless.verify(objectHelper.blacklist(options, ["popupHandler"]), function (err) {
    if (err) return cb(err);
    options.username = options.phoneNumber || options.email, options.password = options.verificationCode, delete options.email, delete options.phoneNumber, delete options.verificationCode, delete options.type, _this.client.loginWithResourceOwner(options, cb);
  });
}, Popup.prototype.signupAndLogin = function (options, cb) {
  var _this = this,
      popupHandler = this.getPopupHandler(options, !0);

  return options.popupHandler = popupHandler, this.client.dbConnection.signup(objectHelper.blacklist(options, ["popupHandler"]), function (err) {
    if (err) return popupHandler._current_popup && popupHandler._current_popup.kill(), cb(err);

    _this.loginWithCredentials(options, cb);
  });
}, SilentAuthenticationHandler.create = function (options) {
  return new SilentAuthenticationHandler(options);
}, SilentAuthenticationHandler.prototype.login = function (usePostMessage, callback) {
  this.handler = new IframeHandler({
    auth0: this.auth0,
    url: this.authenticationUrl,
    eventListenerType: usePostMessage ? "message" : "load",
    callback: this.getCallbackHandler(callback, usePostMessage),
    timeout: this.timeout,
    eventValidator: this.getEventValidator(),
    timeoutCallback: function () {
      callback(null, "#error=timeout&error_description=Timeout+during+authentication+renew.");
    },
    usePostMessage: usePostMessage || !1
  }), this.handler.init();
}, SilentAuthenticationHandler.prototype.getEventValidator = function () {
  var _this = this;

  return {
    isValid: function (eventData) {
      switch (eventData.event.type) {
        case "message":
          return eventData.event.origin === _this.postMessageOrigin && eventData.event.source === _this.handler.iframe.contentWindow && (!1 === _this.postMessageDataType || eventData.event.data.type && eventData.event.data.type === _this.postMessageDataType);

        case "load":
          if ("about:" === eventData.sourceObject.contentWindow.location.protocol) return !1;

        default:
          return !0;
      }
    }
  };
}, SilentAuthenticationHandler.prototype.getCallbackHandler = function (callback, usePostMessage) {
  return function (eventData) {
    var callbackValue;
    callbackValue = usePostMessage ? "object" == typeof eventData.event.data && eventData.event.data.hash ? eventData.event.data.hash : eventData.event.data : eventData.sourceObject.contentWindow.location.hash, callback(null, callbackValue);
  };
}, UsernamePassword.prototype.login = function (options, cb) {
  var url, body;
  return url = urlJoin(this.baseOptions.rootUrl, "usernamepassword", "login"), options.username = options.username || options.email, options = objectHelper.blacklist(options, ["email"]), body = objectHelper.merge(this.baseOptions, ["clientID", "redirectUri", "tenant", "responseType", "responseMode", "scope", "audience"]).with(options), body = this.transactionManager.process(body), body = objectHelper.toSnakeCase(body, ["auth0Client"]), this.request.post(url).send(body).end(wrapCallback(cb));
}, UsernamePassword.prototype.callback = function (formHtml) {
  var div,
      _document = windowHandler.getDocument();

  (div = _document.createElement("div")).innerHTML = formHtml, _document.body.appendChild(div).children[0].submit();
}, HostedPages.prototype.login = function (options, cb) {
  if (windowHandler.getWindow().location.host !== this.baseOptions.domain) throw new Error("This method is meant to be used only inside the Universal Login Page.");
  var usernamePassword,
      params = objectHelper.merge(this.baseOptions, ["clientID", "redirectUri", "tenant", "responseType", "responseMode", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(options);
  return assert.check(params, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    responseType: {
      type: "string",
      message: "responseType option is required"
    }
  }), (usernamePassword = new UsernamePassword(this.baseOptions)).login(params, function (err, data) {
    return err ? cb(err) : usernamePassword.callback(data);
  });
}, HostedPages.prototype.signupAndLogin = function (options, cb) {
  var _this = this;

  return _this.client.client.dbConnection.signup(options, function (err) {
    return err ? cb(err) : _this.login(options, cb);
  });
}, HostedPages.prototype.getSSOData = function (withActiveDirectories, cb) {
  var url,
      params = "";
  return "function" == typeof withActiveDirectories && (cb = withActiveDirectories, withActiveDirectories = !1), assert.check(withActiveDirectories, {
    type: "boolean",
    message: "withActiveDirectories parameter is not valid"
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), withActiveDirectories && (params = "?" + lib.stringify({
    ldaps: 1,
    client_id: this.baseOptions.clientID
  })), url = urlJoin(this.baseOptions.rootUrl, "user", "ssodata", params), this.request.get(url, {
    noHeaders: !0
  }).withCredentials().end(wrapCallback(cb));
}, WebAuth.prototype.parseHash = function (options, cb) {
  var parsedQs, err;
  cb || "function" != typeof options ? options = options || {} : (cb = options, options = {});

  var _window = windowHandler.getWindow(),
      hashStr = void 0 === options.hash ? _window.location.hash : options.hash;

  if (hashStr = hashStr.replace(/^#?\/?/, ""), (parsedQs = lib.parse(hashStr)).hasOwnProperty("error")) return err = error.buildResponse(parsedQs.error, parsedQs.error_description), parsedQs.state && (err.state = parsedQs.state), cb(err);
  if (!parsedQs.hasOwnProperty("access_token") && !parsedQs.hasOwnProperty("id_token") && !parsedQs.hasOwnProperty("refresh_token")) return cb(null, null);
  var responseTypes = (this.baseOptions.responseType || options.responseType || "").split(" ");
  return responseTypes.length > 0 && -1 !== responseTypes.indexOf("token") && !parsedQs.hasOwnProperty("access_token") ? cb(error.buildResponse("invalid_hash", "response_type contains `token`, but the parsed hash does not contain an `access_token` property")) : responseTypes.length > 0 && -1 !== responseTypes.indexOf("id_token") && !parsedQs.hasOwnProperty("id_token") ? cb(error.buildResponse("invalid_hash", "response_type contains `id_token`, but the parsed hash does not contain an `id_token` property")) : this.validateAuthenticationResponse(options, parsedQs, cb);
}, WebAuth.prototype.validateAuthenticationResponse = function (options, parsedHash, cb) {
  var _this = this;

  options.__enableIdPInitiatedLogin = options.__enableIdPInitiatedLogin || options.__enableImpersonation;
  var state = parsedHash.state,
      transaction = this.transactionManager.getStoredTransaction(state),
      transactionState = options.state || transaction && transaction.state || null,
      transactionStateMatchesState = transactionState === state;
  if (!(!state && !transactionState && options.__enableIdPInitiatedLogin) && !transactionStateMatchesState) return cb({
    error: "invalid_token",
    errorDescription: "`state` does not match."
  });

  var transactionNonce = options.nonce || transaction && transaction.nonce || null,
      appState = options.state || transaction && transaction.appState || null,
      callback = function (err, payload) {
    if (err) return cb(err);
    var sub;
    transaction && transaction.lastUsedConnection && (payload && (sub = payload.sub), _this.ssodataStorage.set(transaction.lastUsedConnection, sub));
    return cb(null, buildParseHashResponse(parsedHash, appState, payload));
  };

  return parsedHash.id_token ? this.validateToken(parsedHash.id_token, transactionNonce, function (validationError, payload) {
    if (!validationError) return parsedHash.access_token && payload.at_hash ? new src().validateAccessToken(parsedHash.access_token, "RS256", payload.at_hash, function (err) {
      return err ? callback(error.invalidToken(err.message)) : callback(null, payload);
    }) : callback(null, payload);
    if ("invalid_token" !== validationError.error) return callback(validationError);
    if ("HS256" !== new src().decode(parsedHash.id_token).header.alg) return callback(validationError);

    if (!parsedHash.access_token) {
      return callback({
        error: "invalid_token",
        description: "The id_token cannot be validated because it was signed with the HS256 algorithm and public clients (like a browser) can’t store secrets. Please read the associated doc for possible ways to fix this. Read more: https://auth0.com/docs/errors/libraries/auth0-js/invalid-token#parsing-an-hs256-signed-id-token-without-an-access-token"
      });
    }

    return _this.client.userInfo(parsedHash.access_token, function (errUserInfo, profile) {
      return errUserInfo ? callback(errUserInfo) : callback(null, profile);
    });
  }) : callback(null, null);
}, WebAuth.prototype.validateToken = function (token, nonce, cb) {
  new src({
    issuer: this.baseOptions.token_issuer,
    jwksURI: this.baseOptions.jwksURI,
    audience: this.baseOptions.clientID,
    leeway: this.baseOptions.leeway || 0,
    __disableExpirationCheck: this.baseOptions.__disableExpirationCheck
  }).verify(token, nonce, function (err, payload) {
    if (err) return cb(error.invalidToken(err.message));
    cb(null, payload);
  });
}, WebAuth.prototype.renewAuth = function (options, cb) {
  var usePostMessage = !!options.usePostMessage,
      postMessageDataType = options.postMessageDataType || !1,
      postMessageOrigin = options.postMessageOrigin || windowHandler.getWindow().origin,
      timeout = options.timeout,
      _this = this,
      params = objectHelper.merge(this.baseOptions, ["clientID", "redirectUri", "responseType", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(options);

  params.responseType = params.responseType || "token", params.responseMode = params.responseMode || "fragment", params = this.transactionManager.process(params), assert.check(params, {
    type: "object",
    message: "options parameter is not valid"
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), params.prompt = "none", params = objectHelper.blacklist(params, ["usePostMessage", "tenant", "postMessageDataType", "postMessageOrigin"]), SilentAuthenticationHandler.create({
    authenticationUrl: this.client.buildAuthorizeUrl(params),
    postMessageDataType: postMessageDataType,
    postMessageOrigin: postMessageOrigin,
    timeout: timeout
  }).login(usePostMessage, function (err, hash) {
    if ("object" == typeof hash) return cb(err, hash);

    _this.parseHash({
      hash: hash
    }, cb);
  });
}, WebAuth.prototype.checkSession = function (options, cb) {
  var params = objectHelper.merge(this.baseOptions, ["clientID", "responseType", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(options);
  return "code" === params.responseType ? cb({
    error: "error",
    error_description: "responseType can't be `code`"
  }) : (options.nonce || (params = this.transactionManager.process(params)), params.redirectUri ? (assert.check(params, {
    type: "object",
    message: "options parameter is not valid"
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), params = objectHelper.blacklist(params, ["usePostMessage", "tenant", "postMessageDataType"]), void this.webMessageHandler.run(params, cb)) : cb({
    error: "error",
    error_description: "redirectUri can't be empty"
  }));
}, WebAuth.prototype.changePassword = function (options, cb) {
  return this.client.dbConnection.changePassword(options, cb);
}, WebAuth.prototype.passwordlessStart = function (options, cb) {
  var authParams = objectHelper.merge(this.baseOptions, ["responseType", "responseMode", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(options.authParams);
  return options.authParams = this.transactionManager.process(authParams), this.client.passwordless.start(options, cb);
}, WebAuth.prototype.signup = function (options, cb) {
  return this.client.dbConnection.signup(options, cb);
}, WebAuth.prototype.authorize = function (options) {
  var params = objectHelper.merge(this.baseOptions, ["clientID", "responseType", "responseMode", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(options);
  assert.check(params, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    responseType: {
      type: "string",
      message: "responseType option is required"
    }
  }), (params = this.transactionManager.process(params)).scope = params.scope || "openid profile email", windowHandler.redirect(this.client.buildAuthorizeUrl(params));
}, WebAuth.prototype.signupAndAuthorize = function (options, cb) {
  var _this = this;

  return this.client.dbConnection.signup(objectHelper.blacklist(options, ["popupHandler"]), function (err) {
    if (err) return cb(err);
    options.realm = options.connection, options.username || (options.username = options.email), _this.client.login(options, cb);
  });
}, WebAuth.prototype.login = function (options, cb) {
  var params = objectHelper.merge(this.baseOptions, ["clientID", "responseType", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(options);
  params = this.transactionManager.process(params), windowHandler.getWindow().location.host === this.baseOptions.domain ? (params.connection = params.realm, delete params.realm, this._universalLogin.login(params, cb)) : this.crossOriginAuthentication.login(params, cb);
}, WebAuth.prototype.passwordlessLogin = function (options, cb) {
  var params = objectHelper.merge(this.baseOptions, ["clientID", "responseType", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(options);
  if (params = this.transactionManager.process(params), windowHandler.getWindow().location.host === this.baseOptions.domain) this.passwordlessVerify(params, cb);else {
    var crossOriginOptions = objectHelper.extend({
      credentialType: "http://auth0.com/oauth/grant-type/passwordless/otp",
      realm: params.connection,
      username: params.email || params.phoneNumber,
      otp: params.verificationCode
    }, objectHelper.blacklist(params, ["connection", "email", "phoneNumber", "verificationCode"]));
    this.crossOriginAuthentication.login(crossOriginOptions, cb);
  }
}, WebAuth.prototype.crossOriginAuthenticationCallback = function () {
  this.crossOriginVerification();
}, WebAuth.prototype.crossOriginVerification = function () {
  this.crossOriginAuthentication.callback();
}, WebAuth.prototype.logout = function (options) {
  windowHandler.redirect(this.client.buildLogoutUrl(options));
}, WebAuth.prototype.passwordlessVerify = function (options, cb) {
  var _this = this,
      params = objectHelper.merge(this.baseOptions, ["clientID", "responseType", "responseMode", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "nonce"]).with(options);

  return assert.check(params, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    responseType: {
      type: "string",
      message: "responseType option is required"
    }
  }), params = this.transactionManager.process(params), this.client.passwordless.verify(params, function (err) {
    return err ? cb(err) : windowHandler.redirect(_this.client.passwordless.buildVerifyUrl(params));
  });
}, PasswordlessAuthentication.prototype.buildVerifyUrl = function (options) {
  var params, qString;
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    connection: {
      type: "string",
      message: "connection option is required"
    },
    verificationCode: {
      type: "string",
      message: "verificationCode option is required"
    },
    phoneNumber: {
      optional: !1,
      type: "string",
      message: "phoneNumber option is required",
      condition: function (o) {
        return !o.email;
      }
    },
    email: {
      optional: !1,
      type: "string",
      message: "email option is required",
      condition: function (o) {
        return !o.phoneNumber;
      }
    }
  }), params = objectHelper.merge(this.baseOptions, ["clientID", "responseType", "responseMode", "redirectUri", "scope", "audience", "_csrf", "state", "_intstate", "protocol", "nonce"]).with(options), this.baseOptions._sendTelemetry && (params.auth0Client = this.request.getTelemetryData()), params = objectHelper.toSnakeCase(params, ["auth0Client"]), qString = lib.stringify(params), urlJoin(this.baseOptions.rootUrl, "passwordless", "verify_redirect", "?" + qString);
}, PasswordlessAuthentication.prototype.start = function (options, cb) {
  var url, body;
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    connection: {
      type: "string",
      message: "connection option is required"
    },
    send: {
      type: "string",
      message: "send option is required",
      values: ["link", "code"],
      value_message: "send is not valid ([link, code])"
    },
    phoneNumber: {
      optional: !0,
      type: "string",
      message: "phoneNumber option is required",
      condition: function (o) {
        return "code" === o.send || !o.email;
      }
    },
    email: {
      optional: !0,
      type: "string",
      message: "email option is required",
      condition: function (o) {
        return "link" === o.send || !o.phoneNumber;
      }
    },
    authParams: {
      optional: !0,
      type: "object",
      message: "authParams option is required"
    }
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "passwordless", "start"), (body = objectHelper.merge(this.baseOptions, ["clientID", "responseType", "redirectUri", "scope"]).with(options)).scope && (body.authParams = body.authParams || {}, body.authParams.scope = body.scope), body.redirectUri && (body.authParams = body.authParams || {}, body.authParams.redirect_uri = body.redirectUri), body.responseType && (body.authParams = body.authParams || {}, body.authParams.response_type = body.responseType), delete body.redirectUri, delete body.responseType, delete body.scope, body = objectHelper.toSnakeCase(body, ["auth0Client", "authParams"]), this.request.post(url).send(body).end(wrapCallback(cb));
}, PasswordlessAuthentication.prototype.verify = function (options, cb) {
  var url, cleanOption;
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    connection: {
      type: "string",
      message: "connection option is required"
    },
    verificationCode: {
      type: "string",
      message: "verificationCode option is required"
    },
    phoneNumber: {
      optional: !1,
      type: "string",
      message: "phoneNumber option is required",
      condition: function (o) {
        return !o.email;
      }
    },
    email: {
      optional: !1,
      type: "string",
      message: "email option is required",
      condition: function (o) {
        return !o.phoneNumber;
      }
    }
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), cleanOption = objectHelper.pick(options, ["connection", "verificationCode", "phoneNumber", "email", "auth0Client"]), cleanOption = objectHelper.toSnakeCase(cleanOption, ["auth0Client"]), url = urlJoin(this.baseOptions.rootUrl, "passwordless", "verify"), this.request.post(url).send(cleanOption).end(wrapCallback(cb));
}, DBConnection.prototype.signup = function (options, cb) {
  var url, body, metadata;
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    connection: {
      type: "string",
      message: "connection option is required"
    },
    email: {
      type: "string",
      message: "email option is required"
    },
    password: {
      type: "string",
      message: "password option is required"
    }
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "dbconnections", "signup"), metadata = (body = objectHelper.merge(this.baseOptions, ["clientID"]).with(options)).user_metadata || body.userMetadata, body = objectHelper.blacklist(body, ["scope", "userMetadata", "user_metadata"]), body = objectHelper.toSnakeCase(body, ["auth0Client"]), metadata && (body.user_metadata = metadata), this.request.post(url).send(body).end(wrapCallback(cb));
}, DBConnection.prototype.changePassword = function (options, cb) {
  var url, body;
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    connection: {
      type: "string",
      message: "connection option is required"
    },
    email: {
      type: "string",
      message: "email option is required"
    }
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "dbconnections", "change_password"), body = objectHelper.merge(this.baseOptions, ["clientID"]).with(options, ["email", "connection"]), body = objectHelper.toSnakeCase(body, ["auth0Client"]), this.request.post(url).send(body).end(wrapCallback(cb));
}, Authentication.prototype.buildAuthorizeUrl = function (options) {
  var params, qString;
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }), params = objectHelper.merge(this.baseOptions, ["clientID", "responseType", "responseMode", "redirectUri", "scope", "audience"]).with(options), assert.check(params, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    clientID: {
      type: "string",
      message: "clientID option is required"
    },
    redirectUri: {
      optional: !0,
      type: "string",
      message: "redirectUri option is required"
    },
    responseType: {
      type: "string",
      message: "responseType option is required"
    },
    nonce: {
      type: "string",
      message: "nonce option is required",
      condition: function (o) {
        return -1 === o.responseType.indexOf("code") && -1 !== o.responseType.indexOf("id_token");
      }
    },
    scope: {
      optional: !0,
      type: "string",
      message: "scope option is required"
    },
    audience: {
      optional: !0,
      type: "string",
      message: "audience option is required"
    }
  }), this.baseOptions._sendTelemetry && (params.auth0Client = this.request.getTelemetryData()), params.connection_scope && assert.isArray(params.connection_scope) && (params.connection_scope = params.connection_scope.join(",")), params = objectHelper.blacklist(params, ["username", "popupOptions", "domain", "tenant", "timeout"]), params = objectHelper.toSnakeCase(params, ["auth0Client"]), params = parametersWhitelist.oauthAuthorizeParams(this.warn, params), qString = lib.stringify(params), urlJoin(this.baseOptions.rootUrl, "authorize", "?" + qString);
}, Authentication.prototype.buildLogoutUrl = function (options) {
  var params, qString;
  return assert.check(options, {
    optional: !0,
    type: "object",
    message: "options parameter is not valid"
  }), params = objectHelper.merge(this.baseOptions, ["clientID"]).with(options || {}), this.baseOptions._sendTelemetry && (params.auth0Client = this.request.getTelemetryData()), params = objectHelper.toSnakeCase(params, ["auth0Client", "returnTo"]), qString = lib.stringify(objectHelper.blacklist(params, ["federated"])), options && void 0 !== options.federated && !1 !== options.federated && "false" !== options.federated && (qString += "&federated"), urlJoin(this.baseOptions.rootUrl, "v2", "logout", "?" + qString);
}, Authentication.prototype.loginWithDefaultDirectory = function (options, cb) {
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    username: {
      type: "string",
      message: "username option is required"
    },
    password: {
      type: "string",
      message: "password option is required"
    },
    scope: {
      optional: !0,
      type: "string",
      message: "scope option is required"
    },
    audience: {
      optional: !0,
      type: "string",
      message: "audience option is required"
    }
  }), options.grantType = "password", this.oauthToken(options, cb);
}, Authentication.prototype.login = function (options, cb) {
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    username: {
      type: "string",
      message: "username option is required"
    },
    password: {
      type: "string",
      message: "password option is required"
    },
    realm: {
      type: "string",
      message: "realm option is required"
    },
    scope: {
      optional: !0,
      type: "string",
      message: "scope option is required"
    },
    audience: {
      optional: !0,
      type: "string",
      message: "audience option is required"
    }
  }), options.grantType = "http://auth0.com/oauth/grant-type/password-realm", this.oauthToken(options, cb);
}, Authentication.prototype.oauthToken = function (options, cb) {
  var url, body;
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "oauth", "token"), body = objectHelper.merge(this.baseOptions, ["clientID", "scope", "audience"]).with(options), assert.check(body, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    clientID: {
      type: "string",
      message: "clientID option is required"
    },
    grantType: {
      type: "string",
      message: "grantType option is required"
    },
    scope: {
      optional: !0,
      type: "string",
      message: "scope option is required"
    },
    audience: {
      optional: !0,
      type: "string",
      message: "audience option is required"
    }
  }), body = objectHelper.toSnakeCase(body, ["auth0Client"]), body = parametersWhitelist.oauthTokenParams(this.warn, body), this.request.post(url).send(body).end(wrapCallback(cb));
}, Authentication.prototype.loginWithResourceOwner = function (options, cb) {
  var url, body;
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    username: {
      type: "string",
      message: "username option is required"
    },
    password: {
      type: "string",
      message: "password option is required"
    },
    connection: {
      type: "string",
      message: "connection option is required"
    },
    scope: {
      optional: !0,
      type: "string",
      message: "scope option is required"
    }
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "oauth", "ro"), body = objectHelper.merge(this.baseOptions, ["clientID", "scope"]).with(options, ["username", "password", "scope", "connection", "device"]), (body = objectHelper.toSnakeCase(body, ["auth0Client"])).grant_type = body.grant_type || "password", this.request.post(url).send(body).end(wrapCallback(cb));
}, Authentication.prototype.getSSOData = function (withActiveDirectories, cb) {
  if (this.auth0 || (this.auth0 = new WebAuth(this.baseOptions)), windowHandler.getWindow().location.host === this.baseOptions.domain) return this.auth0._universalLogin.getSSOData(withActiveDirectories, cb);
  "function" == typeof withActiveDirectories && (cb = withActiveDirectories), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  });
  var clientId = this.baseOptions.clientID,
      ssodataInformation = this.ssodataStorage.get() || {};
  this.auth0.checkSession({
    responseType: "token id_token",
    scope: "openid profile email",
    connection: ssodataInformation.lastUsedConnection,
    timeout: 5e3
  }, function (err, result) {
    return err ? "login_required" === err.error ? cb(null, {
      sso: !1
    }) : ("consent_required" === err.error && (err.error_description = "Consent required. When using `getSSOData`, the user has to be authenticated with the following scope: `openid profile email`."), cb(err, {
      sso: !1
    })) : ssodataInformation.lastUsedSub && ssodataInformation.lastUsedSub !== result.idTokenPayload.sub ? cb(err, {
      sso: !1
    }) : cb(null, {
      lastUsedConnection: {
        name: ssodataInformation.lastUsedConnection
      },
      lastUsedUserID: result.idTokenPayload.sub,
      lastUsedUsername: result.idTokenPayload.email || result.idTokenPayload.name,
      lastUsedClientID: clientId,
      sessionClients: [clientId],
      sso: !0
    });
  });
}, Authentication.prototype.userInfo = function (accessToken, cb) {
  var url;
  return assert.check(accessToken, {
    type: "string",
    message: "accessToken parameter is not valid"
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "userinfo"), this.request.get(url).set("Authorization", "Bearer " + accessToken).end(wrapCallback(cb, {
    ignoreCasing: !0
  }));
}, Authentication.prototype.delegation = function (options, cb) {
  var url, body;
  return assert.check(options, {
    type: "object",
    message: "options parameter is not valid"
  }, {
    grant_type: {
      type: "string",
      message: "grant_type option is required"
    }
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "delegation"), body = objectHelper.merge(this.baseOptions, ["clientID"]).with(options), body = objectHelper.toSnakeCase(body, ["auth0Client"]), this.request.post(url).send(body).end(wrapCallback(cb));
}, Authentication.prototype.getUserCountry = function (cb) {
  var url;
  return assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "user", "geoloc", "country"), this.request.get(url).end(wrapCallback(cb));
}, Management.prototype.getUser = function (userId, cb) {
  var url;
  return assert.check(userId, {
    type: "string",
    message: "userId parameter is not valid"
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "users", userId), this.request.get(url).end(wrapCallback(cb, {
    ignoreCasing: !0
  }));
}, Management.prototype.patchUserMetadata = function (userId, userMetadata, cb) {
  var url;
  return assert.check(userId, {
    type: "string",
    message: "userId parameter is not valid"
  }), assert.check(userMetadata, {
    type: "object",
    message: "userMetadata parameter is not valid"
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "users", userId), this.request.patch(url).send({
    user_metadata: userMetadata
  }).end(wrapCallback(cb, {
    ignoreCasing: !0
  }));
}, Management.prototype.linkUser = function (userId, secondaryUserToken, cb) {
  var url;
  return assert.check(userId, {
    type: "string",
    message: "userId parameter is not valid"
  }), assert.check(secondaryUserToken, {
    type: "string",
    message: "secondaryUserToken parameter is not valid"
  }), assert.check(cb, {
    type: "function",
    message: "cb parameter is not valid"
  }), url = urlJoin(this.baseOptions.rootUrl, "users", userId, "identities"), this.request.post(url).send({
    link_with: secondaryUserToken
  }).end(wrapCallback(cb, {
    ignoreCasing: !0
  }));
};
var index = {
  Authentication: Authentication,
  Management: Management,
  WebAuth: WebAuth,
  version: version
};
var defaultOptions = {
  domain: 'quamm.eu.auth0.com'
};

var WebAuth$1 =
/*#__PURE__*/
function () {
  function WebAuth(clientID) {
    var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions.domain;
    classCallCheck(this, WebAuth);
    if (typeof window === 'undefined') throw new Error('Not a browser');
    var auth = new index.WebAuth({
      domain: domain,
      clientID: clientID,
      responseType: 'token id_token'
    });
    this.auth0 = auth;
  }

  createClass(WebAuth, [{
    key: "login",
    value: function login(audience, scope, username, password) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.auth0.client.login({
          realm: 'Username-Password-Authentication',
          username: username,
          password: password,
          audience: audience,
          scope: scope
        }, function (err, authResult) {
          if (err) return reject(err);
          resolve(authResult);
        });
      });
    }
  }], [{
    key: "getAuth",
    value: function getAuth(auth) {
      if (typeof auth !== 'undefined' && typeof auth.accessToken !== 'undefined' && typeof auth.tokenType !== 'undefined') return auth;
      var clientID = auth.clientID,
          username = auth.username,
          password = auth.password,
          audience = auth.audience,
          scope = auth.scope;
      var client = new WebAuth(clientID);
      return client.login(audience, scope, username, password);
    }
  }]);
  return WebAuth;
}();

var WebAuth_1 = WebAuth$1;

function createCommonjsModule$1$1(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

var runtime = createCommonjsModule$1$1(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  !function (global) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var runtime = global.regeneratorRuntime;

    if (runtime) {
      {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      } // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.

      return;
    } // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.


    runtime = global.regeneratorRuntime = module.exports;

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    runtime.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    runtime.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    runtime.values = values;

    function doneResult() {
      return {
        value: undefined,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
      stop: function () {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
  }( // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  function () {
    return this || typeof self === "object" && self;
  }() || Function("return this")());
});
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js

var g = function () {
  return this || typeof self === "object" && self;
}() || Function("return this")(); // Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.


var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0; // Save the old regeneratorRuntime in case it needs to be restored later.

var oldRuntime = hadRuntime && g.regeneratorRuntime; // Force reevalutation of runtime.js.

g.regeneratorRuntime = undefined;
var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually


var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
} // For Node v0.10 support. Remove this eventually.


function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}
/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString$1 = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray$1(val) {
  return toString$1.call(val) === '[object Array]';
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString$1.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject$1(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString$1.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString$1.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString$1.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString$1.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject$1(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray$1(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge$1()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge$1(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend$1(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

var utils$2 = {
  isArray: isArray$1,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer_1,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject$1,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge$1,
  extend: extend$1,
  trim: trim
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils$2.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */


var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  return error;
};
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus; // Note: status is not exposed by XDomainRequest

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

function encode$1(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$2.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$2.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils$2.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils$2.forEach(val, function parseValue(v) {
        if (utils$2.isDate(v)) {
          v = v.toISOString();
        } else if (utils$2.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode$1(key) + '=' + encode$1(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}; // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils$2.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils$2.trim(line.substr(0, i)).toLowerCase();
    val = utils$2.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

var isURLSameOrigin = utils$2.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils$2.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}(); // btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}

E.prototype = new Error();
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa$1(input) {
  var str = String(input);
  var output = '';

  for ( // initialize result and counter
  var block, charCode, idx = 0, map = chars; // if the next str index does not exist:
  //   change the mapping table to "="
  //   check if d has no fractional digits
  str.charAt(idx | 0) || (map = '=', idx % 1); // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
  output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
    charCode = str.charCodeAt(idx += 3 / 4);

    if (charCode > 0xFF) {
      throw new E();
    }

    block = block << 8 | charCode;
  }

  return output;
}

var btoa_1 = btoa$1;
var cookies = utils$2.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils$2.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils$2.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils$2.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();
var btoa$2 = typeof window !== 'undefined' && window.btoa && window.btoa.bind(window) || btoa_1;

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils$2.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false; // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.

    if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;

      request.onprogress = function handleProgress() {};

      request.ontimeout = function handleTimeout() {};
    } // HTTP basic authentication


    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa$2(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request[loadEvent] = function handleLoad() {
      if (!request || request.readyState !== 4 && !xDomain) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils$2.isStandardBrowserEnv()) {
      var cookies$$1 = cookies; // Add xsrf header

      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies$$1.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils$2.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (config.withCredentials) {
      request.withCredentials = true;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils$2.isUndefined(headers) && utils$2.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = xhr;
  }

  return adapter;
}

var defaults$2 = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');

    if (utils$2.isFormData(data) || utils$2.isArrayBuffer(data) || utils$2.isBuffer(data) || utils$2.isStream(data) || utils$2.isFile(data) || utils$2.isBlob(data)) {
      return data;
    }

    if (utils$2.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils$2.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils$2.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults$2.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils$2.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults$2.headers[method] = {};
});
utils$2.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults$2.headers[method] = utils$2.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$2;

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils$2.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */

var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils$2.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */


var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};
/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */


var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Support baseURL config

  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  } // Ensure headers exist


  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils$2.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});
  utils$2.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults_1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils$2.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils$2.merge(defaults_1, {
    method: 'get'
  }, this.defaults, config);
  config.method = config.method.toLowerCase(); // Hook up interceptors middleware

  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
}; // Provide aliases for supported request methods


utils$2.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils$2.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils$2.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils$2.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
var Axios_1 = Axios;
/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
var Cancel_1 = Cancel;
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */

function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;
/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context); // Copy axios.prototype to instance

  utils$2.extend(instance, Axios_1.prototype, context); // Copy context to instance

  utils$2.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults_1); // Expose Axios class to allow class inheritance

axios.Axios = Axios_1; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(utils$2.merge(defaults_1, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel; // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;
var axios_1 = axios; // Allow use of default import syntax in TypeScript

var default_1 = axios;
axios_1.default = default_1;
var axios$1 = axios_1;
var defaultOptions$1 = {
  domain: 'https://quamm.eu.auth0.com/oauth/token'
};

var MachineAuth =
/*#__PURE__*/
function () {
  function MachineAuth(clientID) {
    var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions$1.domain;
    classCallCheck(this, MachineAuth);
    this._clientID = clientID;
    this._domain = domain;
  }

  createClass(MachineAuth, [{
    key: "login",
    value: function () {
      var _login = asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee(clientSecret, audience) {
        var _ref, data;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios$1({
                  url: this._domain,
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                    client_id: this._clientID,
                    client_secret: clientSecret,
                    audience: audience,
                    grant_type: 'client_credentials'
                  })
                });

              case 2:
                _ref = _context.sent;
                data = _ref.data;
                return _context.abrupt("return", {
                  accessToken: data.access_token,
                  tokenType: data.token_type,
                  scope: data.scope,
                  expiresIn: data.expires_in
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }], [{
    key: "getAuth",
    value: function getAuth(auth) {
      if (typeof auth !== 'undefined' && typeof auth.accessToken !== 'undefined' && typeof auth.tokenType !== 'undefined') return auth;
      var clientID = auth.clientID,
          clientSecret = auth.clientSecret,
          audience = auth.audience;
      var client = new MachineAuth(clientID);
      return client.login(clientSecret, audience);
    }
  }]);
  return MachineAuth;
}();

var MachineAuth_1 = MachineAuth;
var auth = {
  WebAuth: WebAuth_1,
  MachineAuth: MachineAuth_1
};
var WebAuth$2 = auth.WebAuth,
    MachineAuth$1 = auth.MachineAuth;
var defaultOptions$2 = {
  token: '6LeCD24UAAAAAFMvAwTfy11CzcYxucevLfjFMHaC',
  ttl: 10000
};

var checkGRecaptcha = function checkGRecaptcha(resolve, timeout) {
  // TODO trasformare a request animation frame
  var interval = window.setInterval(function () {
    if (gRecaptchaReady()) {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
      return resolve();
    }
  }, 16);
};

var gRecaptchaReady = function gRecaptchaReady() {
  return typeof window.grecaptcha !== 'undefined' && typeof window.grecaptcha.execute === 'function';
};

var install =
/*#__PURE__*/
function () {
  var _ref = asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee2() {
    var token,
        ttl,
        script,
        scriptReady,
        _args2 = arguments;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : defaultOptions$2.token;
            ttl = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : defaultOptions$2.ttl;

            if (!(typeof window.grecaptcha !== 'undefined')) {
              _context2.next = 4;
              break;
            }

            throw new Error('Already installed');

          case 4:
            if (!(typeof window === 'undefined')) {
              _context2.next = 6;
              break;
            }

            throw new Error('Not a browser');

          case 6:
            // install script to head
            script = document.createElement('script');
            script.setAttribute('src', "https://www.google.com/recaptcha/api.js?render=".concat(token));
            document.head.appendChild(script); // wait until grecaptcha element is ready

            scriptReady = new Promise(function (resolve, reject) {
              var timeout = window.setTimeout(reject, ttl);
              checkGRecaptcha(resolve, timeout);
            });
            _context2.next = 12;
            return scriptReady;

          case 12:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var timeout = window.setTimeout(reject, ttl);
              window.grecaptcha.ready(
              /*#__PURE__*/
              asyncToGenerator(
              /*#__PURE__*/
              regenerator.mark(function _callee() {
                return regenerator.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        window.clearTimeout(timeout);
                        return _context.abrupt("return", resolve(true));

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })));
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function install() {
    return _ref.apply(this, arguments);
  };
}();

var getToken = function getToken() {
  var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'defaultAction';
  var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions$2.token;
  if (typeof window === 'undefined') throw new Error('Not a browser');
  return window.grecaptcha.execute(token, {
    action: action
  });
};

var saveToken =
/*#__PURE__*/
function () {
  var _ref3 = asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee3(token, uniqueData, auth$$1) {
    var recaptchaService,
        login,
        _ref4,
        data,
        _args3 = arguments;

    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            recaptchaService = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : 'https://recaptcha.quamm.it';
            _context3.next = 3;
            return WebAuth$2.getAuth(Object.assign({}, auth$$1, {
              audience: recaptchaService,
              scope: 'create:token'
            }));

          case 3:
            login = _context3.sent;

            if (!(typeof login.accessToken === 'undefined' || typeof login.tokenType === 'undefined')) {
              _context3.next = 6;
              break;
            }

            throw new Error('Bad credetials.');

          case 6:
            _context3.prev = 6;
            _context3.next = 9;
            return axios$1({
              url: "".concat(recaptchaService, "/validate"),
              method: 'post',
              headers: {
                Authorization: "".concat(login.tokenType, " ").concat(login.accessToken),
                'Content-Type': 'application/json'
              },
              data: JSON.stringify({
                code: token,
                data: uniqueData
              })
            });

          case 9:
            _ref4 = _context3.sent;
            data = _ref4.data;

            if (!(data.status === 'pass')) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", data.hash);

          case 13:
            _context3.next = 17;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](6);

          case 17:
            return _context3.abrupt("return", false);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[6, 15]]);
  }));

  return function saveToken(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var verifyToken =
/*#__PURE__*/
function () {
  var _ref5 = asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee4(hash, auth$$1) {
    var recaptchaService,
        login,
        _ref6,
        data,
        _args4 = arguments;

    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            recaptchaService = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 'https://recaptcha.quamm.it';
            _context4.next = 3;
            return MachineAuth$1.getAuth(Object.assign({}, auth$$1, {
              audience: recaptchaService
            }));

          case 3:
            login = _context4.sent;

            if (!(typeof login.accessToken === 'undefined' || typeof login.tokenType === 'undefined' || !login.scope.includes('read:token'))) {
              _context4.next = 6;
              break;
            }

            throw new Error('Bad credetials.');

          case 6:
            _context4.prev = 6;
            _context4.next = 9;
            return axios$1({
              url: "".concat(recaptchaService, "/verify/").concat(hash),
              method: 'get',
              headers: {
                Authorization: "".concat(login.tokenType, " ").concat(login.accessToken),
                'Content-Type': 'application/json'
              }
            });

          case 9:
            _ref6 = _context4.sent;
            data = _ref6.data;
            return _context4.abrupt("return", data.status === 'pass');

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](6);

          case 16:
            return _context4.abrupt("return", false);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[6, 14]]);
  }));

  return function verifyToken(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

var recaptcha = {
  install: install,
  getToken: getToken,
  saveToken: saveToken,
  verifyToken: verifyToken
};
var exports$1 = {
  auth: auth,
  recaptcha: recaptcha
};
var src$1 = exports$1;
var quammClientJavascript = src$1;

var index$1 = {
  install: function install(Vue) {
    Vue.prototype.$quammServices = quammClientJavascript;
  }
};

module.exports = index$1;
