// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/MediaPlayer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//CLASE MEDIA PLAYER
//Se crea una clase la cual manejará el comportamiento del reproductor de video.
var MediaPlayer = /** @class */function () {
  function MediaPlayer(config) {
    this.video = config.video;
    this.plugins = config.plugin || [];
    //cualquier instancia de esta clase llamará a la función iniciadora de plugins apenas sea declarada
    this.initMediaPlayer();
    this.initPlugins();
  }
  //Métodos de la clase
  MediaPlayer.prototype.playVideo = function () {
    this.video.play();
  };
  MediaPlayer.prototype.pauseVideo = function () {
    this.video.pause();
  };
  MediaPlayer.prototype.muted = function () {
    this.video.muted = true;
  };
  MediaPlayer.prototype.unmuted = function () {
    this.video.muted = false;
  };
  MediaPlayer.prototype.initMediaPlayer = function () {
    var _a;
    this.container = document.createElement("div");
    this.container.classList.add("VideoContainer");
    this.container.style.position = "relative";
    (_a = this.video.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(this.container, this.video);
    this.container.appendChild(this.video);
  };
  //Este método inicializa todos los plugins asociados con el reproductor de video
  MediaPlayer.prototype.initPlugins = function () {
    var _this = this;
    this.plugins.forEach(function (plugin) {
      plugin.run(_this);
    });
  };
  return MediaPlayer;
}();
exports.default = MediaPlayer;
},{}],"src/plugins/AutoPlay.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//y así poder tipar con él.
//CLASE AUTOPLAY
//Se crea la clase AutoPlay la cual es un plugin para generar una reproducción automática al cargar el sito web
var AutoPlay = /** @class */function () {
  function AutoPlay() {}
  //Enviamos un objeto "player" que contiene las propiedades y métodos de la clase MediaPlayer
  AutoPlay.prototype.run = function (player) {
    //Auto play busca que el video esté en muted para poderlo reproducir
    !player.video.muted ? player.video.muted = true : false; //si el video no está muted, se establece en muted
    player.playVideo();
  };
  return AutoPlay;
}();
exports.default = AutoPlay;
},{}],"src/plugins/AutoPause.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//y así poder tipar con él.
var AutoPause = /** @class */function () {
  function AutoPause(video) {
    this.video = video;
  }
  AutoPause.prototype.run = function (player) {
    //Definimos el objeto que llevará las opciones o configuración del observador
    var ratio = {
      threshold: 0.25
    };
    //Luego creamos una instancia de la clase InstersectionObserver
    //En este caso la funciñon callback es definidad directamente como parámetro
    var observer = new IntersectionObserver(function (entries) {
      //Extraemos la entrada en la primera posición(ya que sólo hay una)
      var entry = entries[0];
      //Se compara si la cantidad de piixeles visibles del video es mayor menor a su 25%
      var isVisible = entry.intersectionRatio >= ratio.threshold;
      //Si es mayor, hará play; si menor, hará pause.
      if (isVisible) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }, ratio /*Aquí va el objeto de configuración */);
    //Observamos la etiqueta video de la página
    observer.observe(this.video);
    document.addEventListener("visibilitychange", function () {
      //Si el estado es visible hará play al video, de lo contrario será pause
      if (document.visibilityState === "visible") player.playVideo();else player.pauseVideo();
    });
  };
  return AutoPause;
}();
exports.default = AutoPause;
},{}],"src/plugins/Ads/Ads.ts":[function(require,module,exports) {
"use strict";

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var ALL_ADS = [{
  imageUrl: 'https://static.platzi.com/media/achievements/badge-profesional-javascript-13538df2-24ce-433f-9aa6-e34eed608e70.png',
  title: 'Curso Profesional de JavaScript',
  body: 'Mejora tus habilidades en Javascript. Conoce Typescript y cómo puedes ocuparlo para mejorar el control de tus variables.',
  url: 'https://platzi.com/cursos/javascript-profesional/'
}, {
  imageUrl: 'https://static.platzi.com/media/achievements/badge-frontend-developer-8a49e681-3e22-408d-b886-2f47dfc9953a.png',
  title: 'Curso de Frontend Developer',
  body: 'Domina las bases de HTML y CSS. Define la arquitectura de tu código y construye un sitio web usando componentes estáticos. ',
  url: 'https://platzi.com/cursos/frontend-developer/'
}, {
  imageUrl: 'https://static.platzi.com/media/achievements/badge-backend-node-8e6aa8a9-f7cd-42b7-bf4a-e1ee916a942b.png',
  title: 'Curso de Backend con Node.js',
  body: 'Crea aplicaciones backend utilizando Node.js, Express y Mongo. Entiende cómo funciona Javascript en un servidor y escribe aplicaciones con Node.js.',
  url: 'https://platzi.com/cursos/backend-nodejs/'
}, {
  imageUrl: 'https://static.platzi.com/media/achievements/badge-prework-da6b0493-9908-40f3-ad53-f5d330b995b8.png',
  title: 'Comienza tus proyectos de desarrollo para JavaScript configurando un entorno de desarrollo cómodo y adaptado a tus necesidades.',
  body: 'Mejora tus habilidades en Javascript. Conoce Typescript y cómo puedes ocuparlo para mejorar el control de tus variables.',
  url: 'https://platzi.com/cursos/prework/'
}, {
  imageUrl: 'https://static.platzi.com/media/achievements/badge-autenticacion-passport-6d45426a-2b24-4757-8927-7bfaf54529dd.png',
  title: 'Curso de Autenticación con Passport.js',
  body: 'Genera estrategias de autenticación Sign-In y Sign-Out usando Passport.js. Agrega autenticación con Facebook, Twitter y Google a tus desarrollos.',
  url: 'https://platzi.com/cursos/passport/'
}, {
  imageUrl: 'https://static.platzi.com/media/achievements/badge-backend-frontend-02b2ac18-331a-4959-85bf-0bd3c2aa009c.png',
  title: 'Curso de Backend for Frontend',
  body: 'La ingeniería de software evoluciona día a día, no te quedes atrás. Ahora que eres un Desarrollador FullStack JavaScript necesitas evolucionar con el software, construye arquitecturas de software modernas.',
  url: 'https://platzi.com/cursos/bff/'
}, {
  imageUrl: 'https://static.platzi.com/media/achievements/badge-react-adec89d0-1c35-4c9c-847e-18c284dc79dd.png',
  title: 'Curso Práctico de React JS',
  body: 'React es una de las librerías más utilizadas hoy para crear aplicaciones web. Aprende a través de la creación de la interfaz de PlatziVideo todo lo que necesitas para crear increíbles componentes con React.      ',
  url: 'https://platzi.com/cursos/react-ejs/'
}, {
  imageUrl: 'https://static.platzi.com/media/achievements/badge-react-redux-2ca3c0a5-fc53-437f-bfba-69e9ddd5a803.png',
  title: 'Curso de React Router y Redux',
  body: 'Aprende de forma práctica a implementar React Router para manejar rutas en tus proyectos de frontend como un profesional.',
  url: 'https://platzi.com/cursos/react-router-redux/'
}];
var Ads = /** @class */function () {
  function Ads() {
    this.initAds();
  }
  Ads.getInstance = function () {
    if (!Ads.instance) {
      Ads.instance = new Ads();
    }
    return Ads.instance;
  };
  Ads.prototype.initAds = function () {
    this.ads = __spreadArray([], ALL_ADS, true);
  };
  //Este método obtiene los ads 1 a 1.
  Ads.prototype.getAds = function () {
    if (this.ads.length === 0) {
      this.initAds();
    }
    return this.ads.pop();
  };
  return Ads;
}();
exports.default = Ads;
},{}],"src/plugins/Ads/AdsPlugin.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Ads_1 = __importDefault(require("./Ads"));
var AdsPlugin = /** @class */function () {
  function AdsPlugin() {
    this.ads = Ads_1.default.getInstance();
    this.adsContainer = document.createElement("div");
  }
  AdsPlugin.prototype.run = function (player) {
    var _this = this;
    player.container.appendChild(this.adsContainer);
    player.video.addEventListener("timeupdate", function () {
      var currentTime = Math.floor(player.video.currentTime);
      if (currentTime % 30 === 0) {
        _this.renderAd();
      }
    });
  };
  AdsPlugin.prototype.renderAd = function () {
    var _this = this;
    if (this.currentAd) {
      return;
    }
    var ad = this.ads.getAds();
    this.currentAd = ad;
    this.adsContainer.innerHTML = "\n        <div class=\"ads\">\n            <a class=\"ads__links\" href=\"".concat(this.currentAd.url, "\" target=\"_blank\">\n                <img class=\"ads__img\" src=\"").concat(this.currentAd.imageUrl, "\"/>\n                <div class=\"ads__info\">\n                    <h5 class=\"ads__title\">").concat(this.currentAd.title, "</h5>\n                    <p class=\"ads__body\">").concat(this.currentAd.body, "</p>\n                </div>\n            </a>\n        </div>\n        ");
    setTimeout(function () {
      _this.currentAd = null;
      _this.adsContainer.innerText = "";
    }, 10000);
  };
  return AdsPlugin;
}();
exports.default = AdsPlugin;
},{"./Ads":"src/plugins/Ads/Ads.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var MediaPlayer_1 = __importDefault(require("./MediaPlayer"));
var AutoPlay_1 = __importDefault(require("./plugins/AutoPlay"));
var AutoPause_1 = __importDefault(require("./plugins/AutoPause"));
var AdsPlugin_1 = __importDefault(require("./plugins/Ads/AdsPlugin"));
//Se define una constante que guarda un selector de nodos en el html
var node = function (id) {
  return document.querySelector(id);
};
//NODOS A MANIPULAR
//etiqueta video
var video = node(".video-player");
//etiqueta de botón de play
var btnPlay = node("#video-play");
var btnMuted = node("#video-muted");
//Objeto reproductor de video
var player = new MediaPlayer_1.default({
  video: video,
  plugin: [new AutoPlay_1.default(), new AutoPause_1.default(video), new AdsPlugin_1.default()]
});
//Al darle click al botón ejecutará acción de reproducir o pausar el video
btnPlay.addEventListener("click", function () {
  //Si está pausado reproduce, si está reproduciendo entonces lo pausa.
  player.video.paused ? player.playVideo() : player.pauseVideo();
});
btnMuted.addEventListener("click", function () {
  //Si el video está silenciado, entonces activa el sonido, de lo contrario lo silencia
  player.video.muted ? player.video.muted = false : player.video.muted = true;
});
//SERVICE WORKER
//Dentro del objeto navigator hay una propiedad llamada serviceWorker y dentro del prototy
//Tiene una propiedad register; con ella vamos a registrar un serviworker el cual será creado
//En el archivo sw.js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(function (error) {
    return console.log(error.message);
  });
}
},{"./MediaPlayer":"src/MediaPlayer.ts","./plugins/AutoPlay":"src/plugins/AutoPlay.ts","./plugins/AutoPause":"src/plugins/AutoPause.ts","./plugins/Ads/AdsPlugin":"src/plugins/Ads/AdsPlugin.ts","./../sw.js":[["sw.js","sw.js"],"sw.js.map","sw.js"]}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "32779" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map