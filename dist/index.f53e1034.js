// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"f9f5V":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "01de888bf53e1034";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"fpUvQ":[function(require,module,exports) {
const { OrderView , PaymentView  } = require("a81f4ed0c4090467");
let orderView = new OrderView();
orderView.startingRender();
let paymentView = new PaymentView();

},{"a81f4ed0c4090467":"llPCs"}],"llPCs":[function(require,module,exports) {
const controller = require("8bab40618d0f3261");
const documentEditor = require("8e175fe8e0f984e");
class OrderView {
    constructor(){
        documentEditor.createOrderTable(this);
        this.quantities = new Map();
        this.prices = new Map();
        this.pricesAdded = false;
    }
    async renderQuantities() {
        return controller.getQuantities(this);
    }
    async changeQuantities(changes) {
        await this.changeQuantity("test", 0);
        let toAwait = [];
        for (let i of changes)toAwait.push(this.changeQuantity(i.id, i.change));
        await Promise.allSettled(toAwait);
    }
    async changeQuantity(id, change) {
        return controller.changeQuantity(id, change);
    }
    async renderPrices() {
        return controller.getPrices(this);
    }
    async startingRender() {
        let quantities = this.renderQuantities();
        let prices = this.renderPrices();
        await Promise.allSettled([
            quantities,
            prices
        ]);
        this.renderTotalPrice();
    }
    renderTotalPrice() {
        this.totalPrice = 0;
        for (let [id, info] of this.quantities){
            let currSum = parseInt(info.qty) * this.prices.get(id);
            this.totalPrice += currSum;
        }
        documentEditor.addTotalPrice(this.totalPrice);
    }
    updateQuantities(quantities) {
        this.quantities = quantities;
        documentEditor.clearOrderTable();
        let pricesAddedHere = false;
        for (let [id, info] of quantities){
            documentEditor.addQtyToOrderTable(id, info);
            if (this.prices.has(id) && !this.pricesAdded) {
                console.log("Adding prices");
                pricesAddedHere = true;
                documentEditor.addPriceToOrderTable(id, this.prices.get(id));
            }
        }
        this.pricesAdded = this.pricesAdded || pricesAddedHere;
    }
    updatePrices(prices) {
        this.prices = prices;
        let pricesAddedHere = false;
        for (let [id, price] of prices)if (this.quantities.has(id) && !this.pricesAdded) {
            pricesAddedHere = true;
            documentEditor.addPriceToOrderTable(id, price);
        }
        this.pricesAdded = this.pricesAdded || pricesAddedHere;
    }
}
class PaymentView {
    constructor(){
        documentEditor.createPaymentDiv(this);
    }
    async processPayment(amount, card, expiry, cvv, bankVerification) {
        let validPaymentInfo = await this.checkPaymentInfo(card, expiry, cvv);
        if (validPaymentInfo) {
            if (bankVerification) {
                let successfulPayment = await this.chargePaymentWithBankVerification(amount, card, expiry, cvv);
                if (successfulPayment) await this.getDeliveryDate();
            } else {
                let delivery = this.getDeliveryDate();
                let payment = this.chargePayment(amount, card, expiry, cvv);
                await Promise.allSettled([
                    payment,
                    delivery
                ]);
            }
        }
    }
    async checkPaymentInfo(card, expiry, cvv) {
        let syntaxCorrect = this.syntaxCheck(card, expiry, cvv);
        if (syntaxCorrect) {
            let encryptedCard = this.encryptCardInfo();
            return await controller.verifyPaymentInfo(this, encryptedCard, expiry, cvv);
        } else {
            this.updatePaymentStatus(0, "Payment method invalid!");
            return false;
        }
    }
    syntaxCheck(card, expiry, cvv) {
        let cardLen = card.length == 16;
        let expiryLen = expiry.length == 4;
        let cvvLen = cvv.length == 3;
        return cardLen && expiryLen && cvvLen;
    }
    encryptCardInfo(card) {
        let encryptedCard = card;
        for(var i = 0; i < 500000; i++)encryptedCard++;
        return encryptedCard;
    }
    async chargePayment(amount, card, expiry, cvv) {
        let encryptedCard = this.encryptCardInfo(card);
        return await controller.chargePayment(this, amount, encryptedCard, expiry, cvv);
    }
    async chargePaymentWithBankVerification(amount, card, expiry, cvv) {
        let firstVerification = await controller.verifyPaymentWithBank(this, amount, card, expiry, cvv);
        let secondVerification = await controller.verifyPaymentWithBank(this, amount, card, expiry, cvv);
        if (firstVerification && secondVerification) return await controller.chargePayment(this, amount, card, expiry, cvv);
        return false;
    }
    async getDeliveryDate() {
        let displayed = controller.getDeliveryDate(this);
        return Promise.allSettled([
            displayed
        ]);
    }
    updatePaymentStatus(status, message) {
        this.paymentStatus = status;
        documentEditor.addPaymentStatus(message);
    }
    updateDeliveryDate(date) {
        this.deliveryDate = date;
        documentEditor.addDeliveryDate(date);
    }
}
module.exports = {
    OrderView,
    PaymentView
};

},{"8bab40618d0f3261":"gcvVo","8e175fe8e0f984e":"2Idh1"}],"gcvVo":[function(require,module,exports) {
const { stockModel  } = require("fc155b4c4ede5435");
const { paymentModel  } = require("33f0685fa05a3bd4");
class Controller {
    /* Commented out code is to log time taken for code to run 
        for evaluation purposes */ async getQuantities(view) {
        // const timingStart = window.performance.now();
        let res = await stockModel.getQuantities(view);
        // const timing = window.performance.now() - timingStart;
        // console.log("getQuantities: " + timing);
        return res;
    }
    async changeQuantity(id, change) {
        // const timingStart = window.performance.now();
        let res = await stockModel.changeQuantity(id, change);
        // const timing = window.performance.now() - timingStart;
        // console.log("changeQuantity: " + timing);
        return res;
    }
    async getPrices(view) {
        // const timingStart = window.performance.now();
        let res = await stockModel.getPrices(view);
        // const timing = window.performance.now() - timingStart;
        // console.log("getPrices: " + timing);
        return res;
    }
    async verifyPaymentInfo(view, card, expiry, cvv) {
        // const timingStart = window.performance.now();
        let res = await paymentModel.verifyPaymentInfo(view, card, expiry, cvv);
        // const timing = window.performance.now() - timingStart;
        // console.log("verifyPaymentInfo: " + timing);
        return res;
    }
    async chargePayment(view, amount, card, expiry, cvv) {
        // const timingStart = window.performance.now();
        let res = await paymentModel.chargePayment(view, amount, card, expiry, cvv);
        // const timing = window.performance.now() - timingStart;
        // console.log("chargePayment: " + timing);
        return res;
    }
    async verifyPaymentWithBank(view, amount, card, expiry, cvv) {
        // const timingStart = window.performance.now();
        let res = await paymentModel.verifyPaymentWithBank(view, amount, card, expiry, cvv);
        // const timing = window.performance.now() - timingStart;
        // console.log("verifyPaymentWithBank: " + timing);
        return res;
    }
    async getDeliveryDate(view) {
        // const timingStart = window.performance.now();
        let res = await paymentModel.getDeliveryDate(view);
        // const timing = window.performance.now() - timingStart;
        // console.log("getDeliveryDate: " + timing);
        return res;
    }
}
const controller = new Controller();
module.exports = controller;

},{"fc155b4c4ede5435":"fbF5v","33f0685fa05a3bd4":"94Ex8"}],"fbF5v":[function(require,module,exports) {
const supabase = require("26e3bcc752043e66");
class StockModel {
    constructor(){
        this.supabase = supabase.createClient("https://ohmidvwmuxmfxouxiekr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obWlkdndtdXhtZnhvdXhpZWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0NzkxNjIsImV4cCI6MjAwMTA1NTE2Mn0.-usktHgBo9kmeDKTugyatBelOXlds5I4wFNhhiNRi_Y");
    }
    async getQuantities(view) {
        let { data , error  } = await this.supabase.from("Books").select("*");
        let quantities = new Map();
        for (let row of data)quantities.set(row.id, {
            name: row.name,
            qty: row.qty
        });
        return view.updateQuantities(quantities);
    }
    async changeQuantity(id, change) {
        let { data , error  } = await this.supabase.from("Books").select("*").eq("id", parseInt(id));
        const oldInfo = data[0];
        console.log(oldInfo);
        const newQty = parseInt(oldInfo.qty ?? "0") + parseInt(change);
        console.log(newQty);
        const { deleteError  } = await this.supabase.from("Books").delete().eq("id", parseInt(id));
        const { insertError  } = await this.supabase.from("Books").insert({
            id: parseInt(id),
            name: oldInfo.name,
            qty: newQty.toString()
        });
    // QUANTITIES.set(id, {name: oldInfo.name, qty: newQty.toString()});
    }
    async getPrices(view) {
        let { data , error  } = await this.supabase.from("Prices").select("*");
        let prices = new Map();
        for (let row of data)prices.set(row.id, row.price);
        return view.updatePrices(prices);
    }
}
const stockModel = new StockModel();
module.exports = {
    stockModel
};

},{"26e3bcc752043e66":"04ZJL"}],"04ZJL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FunctionsHttpError", ()=>(0, _functionsJs.FunctionsHttpError));
parcelHelpers.export(exports, "FunctionsFetchError", ()=>(0, _functionsJs.FunctionsFetchError));
parcelHelpers.export(exports, "FunctionsRelayError", ()=>(0, _functionsJs.FunctionsRelayError));
parcelHelpers.export(exports, "FunctionsError", ()=>(0, _functionsJs.FunctionsError));
parcelHelpers.export(exports, "SupabaseClient", ()=>(0, _supabaseClientDefault.default));
parcelHelpers.export(exports, "createClient", ()=>createClient);
var _supabaseClient = require("./SupabaseClient");
var _supabaseClientDefault = parcelHelpers.interopDefault(_supabaseClient);
var _gotrueJs = require("@supabase/gotrue-js");
parcelHelpers.exportAll(_gotrueJs, exports);
var _functionsJs = require("@supabase/functions-js");
var _realtimeJs = require("@supabase/realtime-js");
parcelHelpers.exportAll(_realtimeJs, exports);
const createClient = (supabaseUrl, supabaseKey, options)=>{
    return new (0, _supabaseClientDefault.default)(supabaseUrl, supabaseKey, options);
};

},{"./SupabaseClient":"66Vb3","@supabase/gotrue-js":"26DbQ","@supabase/functions-js":"7mhif","@supabase/realtime-js":"ii5aX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"66Vb3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _functionsJs = require("@supabase/functions-js");
var _postgrestJs = require("@supabase/postgrest-js");
var _realtimeJs = require("@supabase/realtime-js");
var _storageJs = require("@supabase/storage-js");
var _constants = require("./lib/constants");
var _fetch = require("./lib/fetch");
var _helpers = require("./lib/helpers");
var _supabaseAuthClient = require("./lib/SupabaseAuthClient");
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DEFAULT_GLOBAL_OPTIONS = {
    headers: (0, _constants.DEFAULT_HEADERS)
};
const DEFAULT_DB_OPTIONS = {
    schema: "public"
};
const DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "implicit"
};
const DEFAULT_REALTIME_OPTIONS = {};
class SupabaseClient {
    /**
     * Create a new client for use in the browser.
     * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
     * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
     * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
     * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
     * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
     * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
     * @param options.realtime Options passed along to realtime-js constructor.
     * @param options.global.fetch A custom fetch implementation.
     * @param options.global.headers Any additional headers to send with each network request.
     */ constructor(supabaseUrl, supabaseKey, options){
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl) throw new Error("supabaseUrl is required.");
        if (!supabaseKey) throw new Error("supabaseKey is required.");
        const _supabaseUrl = (0, _helpers.stripTrailingSlash)(supabaseUrl);
        this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, "ws");
        this.authUrl = `${_supabaseUrl}/auth/v1`;
        this.storageUrl = `${_supabaseUrl}/storage/v1`;
        this.functionsUrl = `${_supabaseUrl}/functions/v1`;
        // default storage key uses the supabase project ref as a namespace
        const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
            db: DEFAULT_DB_OPTIONS,
            realtime: DEFAULT_REALTIME_OPTIONS,
            auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), {
                storageKey: defaultStorageKey
            }),
            global: DEFAULT_GLOBAL_OPTIONS
        };
        const settings = (0, _helpers.applySettingDefaults)(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_b = (_a = settings.auth) === null || _a === void 0 ? void 0 : _a.storageKey) !== null && _b !== void 0 ? _b : "";
        this.headers = (_d = (_c = settings.global) === null || _c === void 0 ? void 0 : _c.headers) !== null && _d !== void 0 ? _d : {};
        this.auth = this._initSupabaseAuthClient((_e = settings.auth) !== null && _e !== void 0 ? _e : {}, this.headers, (_f = settings.global) === null || _f === void 0 ? void 0 : _f.fetch);
        this.fetch = (0, _fetch.fetchWithAuth)(supabaseKey, this._getAccessToken.bind(this), (_g = settings.global) === null || _g === void 0 ? void 0 : _g.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({
            headers: this.headers
        }, settings.realtime));
        this.rest = new (0, _postgrestJs.PostgrestClient)(`${_supabaseUrl}/rest/v1`, {
            headers: this.headers,
            schema: (_h = settings.db) === null || _h === void 0 ? void 0 : _h.schema,
            fetch: this.fetch
        });
        this._listenForAuthEvents();
    }
    /**
     * Supabase Functions allows you to deploy and invoke edge functions.
     */ get functions() {
        return new (0, _functionsJs.FunctionsClient)(this.functionsUrl, {
            headers: this.headers,
            customFetch: this.fetch
        });
    }
    /**
     * Supabase Storage allows you to manage user-generated content, such as photos or videos.
     */ get storage() {
        return new (0, _storageJs.StorageClient)(this.storageUrl, this.headers, this.fetch);
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */ from(relation) {
        return this.rest.from(relation);
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ rpc(fn, args = {}, options) {
        return this.rest.rpc(fn, args, options);
    }
    /**
     * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
     *
     * @param {string} name - The name of the Realtime channel.
     * @param {Object} opts - The options to pass to the Realtime channel.
     *
     */ channel(name, opts = {
        config: {}
    }) {
        return this.realtime.channel(name, opts);
    }
    /**
     * Returns all Realtime channels.
     */ getChannels() {
        return this.realtime.getChannels();
    }
    /**
     * Unsubscribes and removes Realtime channel from Realtime client.
     *
     * @param {RealtimeChannel} channel - The name of the Realtime channel.
     *
     */ removeChannel(channel) {
        return this.realtime.removeChannel(channel);
    }
    /**
     * Unsubscribes and removes all Realtime channels from Realtime client.
     */ removeAllChannels() {
        return this.realtime.removeAllChannels();
    }
    _getAccessToken() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function*() {
            const { data  } = yield this.auth.getSession();
            return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
        });
    }
    _initSupabaseAuthClient({ autoRefreshToken , persistSession , detectSessionInUrl , storage , storageKey , flowType  }, headers, fetch) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`
        };
        return new (0, _supabaseAuthClient.SupabaseAuthClient)({
            url: this.authUrl,
            headers: Object.assign(Object.assign({}, authHeaders), headers),
            storageKey: storageKey,
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            storage,
            flowType,
            fetch
        });
    }
    _initRealtimeClient(options) {
        return new (0, _realtimeJs.RealtimeClient)(this.realtimeUrl, Object.assign(Object.assign({}, options), {
            params: Object.assign({
                apikey: this.supabaseKey
            }, options === null || options === void 0 ? void 0 : options.params)
        }));
    }
    _listenForAuthEvents() {
        let data = this.auth.onAuthStateChange((event, session)=>{
            this._handleTokenChanged(event, session === null || session === void 0 ? void 0 : session.access_token, "CLIENT");
        });
        return data;
    }
    _handleTokenChanged(event, token, source) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
            // Token has changed
            this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
            this.changedAccessToken = token;
        } else if (event === "SIGNED_OUT") {
            // Token is removed
            this.realtime.setAuth(this.supabaseKey);
            if (source == "STORAGE") this.auth.signOut();
            this.changedAccessToken = undefined;
        }
    }
}
exports.default = SupabaseClient;

},{"@supabase/functions-js":"7mhif","@supabase/postgrest-js":"115bT","@supabase/realtime-js":"ii5aX","@supabase/storage-js":"8f7kf","./lib/constants":"17il3","./lib/fetch":"8ZZRj","./lib/helpers":"lD7E0","./lib/SupabaseAuthClient":"bmkFW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7mhif":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FunctionsClient", ()=>(0, _functionsClient.FunctionsClient));
parcelHelpers.export(exports, "FunctionsError", ()=>(0, _types.FunctionsError));
parcelHelpers.export(exports, "FunctionsFetchError", ()=>(0, _types.FunctionsFetchError));
parcelHelpers.export(exports, "FunctionsHttpError", ()=>(0, _types.FunctionsHttpError));
parcelHelpers.export(exports, "FunctionsRelayError", ()=>(0, _types.FunctionsRelayError));
var _functionsClient = require("./FunctionsClient");
var _types = require("./types");

},{"./FunctionsClient":"d6XiJ","./types":"d69d9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d6XiJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FunctionsClient", ()=>FunctionsClient);
var _helper = require("./helper");
var _types = require("./types");
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class FunctionsClient {
    constructor(url, { headers ={} , customFetch  } = {}){
        this.url = url;
        this.headers = headers;
        this.fetch = (0, _helper.resolveFetch)(customFetch);
    }
    /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     */ setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
    }
    /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     */ invoke(functionName, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { headers , method , body: functionArgs  } = options;
                let _headers = {};
                let body;
                if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
                    if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
                        // will work for File as File inherits Blob
                        // also works for ArrayBuffer as it is the same underlying structure as a Blob
                        _headers["Content-Type"] = "application/octet-stream";
                        body = functionArgs;
                    } else if (typeof functionArgs === "string") {
                        // plain string
                        _headers["Content-Type"] = "text/plain";
                        body = functionArgs;
                    } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) // don't set content-type headers
                    // Request will automatically add the right boundary value
                    body = functionArgs;
                    else {
                        // default, assume this is JSON
                        _headers["Content-Type"] = "application/json";
                        body = JSON.stringify(functionArgs);
                    }
                }
                const response = yield this.fetch(`${this.url}/${functionName}`, {
                    method: method || "POST",
                    // headers priority is (high to low):
                    // 1. invoke-level headers
                    // 2. client-level headers
                    // 3. default Content-Type header
                    headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
                    body
                }).catch((fetchError)=>{
                    throw new (0, _types.FunctionsFetchError)(fetchError);
                });
                const isRelayError = response.headers.get("x-relay-error");
                if (isRelayError && isRelayError === "true") throw new (0, _types.FunctionsRelayError)(response);
                if (!response.ok) throw new (0, _types.FunctionsHttpError)(response);
                let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim();
                let data;
                if (responseType === "application/json") data = yield response.json();
                else if (responseType === "application/octet-stream") data = yield response.blob();
                else if (responseType === "multipart/form-data") data = yield response.formData();
                else // default to text
                data = yield response.text();
                return {
                    data,
                    error: null
                };
            } catch (error) {
                return {
                    data: null,
                    error
                };
            }
        });
    }
}

},{"./helper":"d4OOV","./types":"d69d9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d4OOV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resolveFetch", ()=>resolveFetch);
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resolveFetch = (customFetch)=>{
    let _fetch;
    if (customFetch) _fetch = customFetch;
    else if (typeof fetch === "undefined") _fetch = (...args)=>__awaiter(void 0, void 0, void 0, function*() {
            return yield (yield require("4bbdcb3f59f195")).fetch(...args);
        });
    else _fetch = fetch;
    return (...args)=>_fetch(...args);
};

},{"4bbdcb3f59f195":"dQm8Z","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dQm8Z":[function(require,module,exports) {
module.exports = Promise.resolve(module.bundle.root("j4ah4"));

},{}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"d69d9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FunctionsError", ()=>FunctionsError);
parcelHelpers.export(exports, "FunctionsFetchError", ()=>FunctionsFetchError);
parcelHelpers.export(exports, "FunctionsRelayError", ()=>FunctionsRelayError);
parcelHelpers.export(exports, "FunctionsHttpError", ()=>FunctionsHttpError);
class FunctionsError extends Error {
    constructor(message, name = "FunctionsError", context){
        super(message);
        super.name = name;
        this.context = context;
    }
}
class FunctionsFetchError extends FunctionsError {
    constructor(context){
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
    }
}
class FunctionsRelayError extends FunctionsError {
    constructor(context){
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
    }
}
class FunctionsHttpError extends FunctionsError {
    constructor(context){
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"115bT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PostgrestClient", ()=>(0, _postgrestClientDefault.default));
parcelHelpers.export(exports, "PostgrestQueryBuilder", ()=>(0, _postgrestQueryBuilderDefault.default));
parcelHelpers.export(exports, "PostgrestFilterBuilder", ()=>(0, _postgrestFilterBuilderDefault.default));
parcelHelpers.export(exports, "PostgrestTransformBuilder", ()=>(0, _postgrestTransformBuilderDefault.default));
parcelHelpers.export(exports, "PostgrestBuilder", ()=>(0, _postgrestBuilderDefault.default));
var _postgrestClient = require("./PostgrestClient");
var _postgrestClientDefault = parcelHelpers.interopDefault(_postgrestClient);
var _postgrestQueryBuilder = require("./PostgrestQueryBuilder");
var _postgrestQueryBuilderDefault = parcelHelpers.interopDefault(_postgrestQueryBuilder);
var _postgrestFilterBuilder = require("./PostgrestFilterBuilder");
var _postgrestFilterBuilderDefault = parcelHelpers.interopDefault(_postgrestFilterBuilder);
var _postgrestTransformBuilder = require("./PostgrestTransformBuilder");
var _postgrestTransformBuilderDefault = parcelHelpers.interopDefault(_postgrestTransformBuilder);
var _postgrestBuilder = require("./PostgrestBuilder");
var _postgrestBuilderDefault = parcelHelpers.interopDefault(_postgrestBuilder);

},{"./PostgrestClient":"bEwso","./PostgrestQueryBuilder":"7VyN8","./PostgrestFilterBuilder":"6Prbt","./PostgrestTransformBuilder":"bztnC","./PostgrestBuilder":"dCZYJ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bEwso":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _postgrestQueryBuilder = require("./PostgrestQueryBuilder");
var _postgrestQueryBuilderDefault = parcelHelpers.interopDefault(_postgrestQueryBuilder);
var _postgrestFilterBuilder = require("./PostgrestFilterBuilder");
var _postgrestFilterBuilderDefault = parcelHelpers.interopDefault(_postgrestFilterBuilder);
var _constants = require("./constants");
class PostgrestClient {
    // TODO: Add back shouldThrowOnError once we figure out the typings
    /**
     * Creates a PostgREST client.
     *
     * @param url - URL of the PostgREST endpoint
     * @param options - Named parameters
     * @param options.headers - Custom headers
     * @param options.schema - Postgres schema to switch to
     * @param options.fetch - Custom fetch
     */ constructor(url, { headers ={} , schema , fetch  } = {}){
        this.url = url;
        this.headers = Object.assign(Object.assign({}, (0, _constants.DEFAULT_HEADERS)), headers);
        this.schema = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */ from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new (0, _postgrestQueryBuilderDefault.default)(url, {
            headers: Object.assign({}, this.headers),
            schema: this.schema,
            fetch: this.fetch
        });
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ rpc(fn, args = {}, { head =false , count  } = {}) {
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head) {
            method = "HEAD";
            Object.entries(args).forEach(([name, value])=>{
                url.searchParams.append(name, `${value}`);
            });
        } else {
            method = "POST";
            body = args;
        }
        const headers = Object.assign({}, this.headers);
        if (count) headers["Prefer"] = `count=${count}`;
        return new (0, _postgrestFilterBuilderDefault.default)({
            method,
            url,
            headers,
            schema: this.schema,
            body,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
}
exports.default = PostgrestClient;

},{"./PostgrestQueryBuilder":"7VyN8","./PostgrestFilterBuilder":"6Prbt","./constants":"3cetg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7VyN8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _postgrestFilterBuilder = require("./PostgrestFilterBuilder");
var _postgrestFilterBuilderDefault = parcelHelpers.interopDefault(_postgrestFilterBuilder);
class PostgrestQueryBuilder {
    constructor(url, { headers ={} , schema , fetch  }){
        this.url = url;
        this.headers = headers;
        this.schema = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a SELECT query on the table or view.
     *
     * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
     *
     * @param options - Named parameters
     *
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     *
     * @param options.count - Count algorithm to use to count rows in the table or view.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ select(columns, { head =false , count  } = {}) {
        const method = head ? "HEAD" : "GET";
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c)=>{
            if (/\s/.test(c) && !quoted) return "";
            if (c === '"') quoted = !quoted;
            return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (count) this.headers["Prefer"] = `count=${count}`;
        return new (0, _postgrestFilterBuilderDefault.default)({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
    /**
     * Perform an INSERT into the table or view.
     *
     * By default, inserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to insert. Pass an object to insert a single row
     * or an array to insert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count inserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column.
     */ insert(values, { count , defaultToNull =true  } = {}) {
        const method = "POST";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) prefersHeaders.push(this.headers["Prefer"]);
        if (count) prefersHeaders.push(`count=${count}`);
        if (!defaultToNull) prefersHeaders.push("missing=default");
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x)=>acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [
                    ...new Set(columns)
                ].map((column)=>`"${column}"`);
                this.url.searchParams.set("columns", uniqueColumns.join(","));
            }
        }
        return new (0, _postgrestFilterBuilderDefault.default)({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
    /**
     * Perform an UPSERT on the table or view. Depending on the column(s) passed
     * to `onConflict`, `.upsert()` allows you to perform the equivalent of
     * `.insert()` if a row with the corresponding `onConflict` columns doesn't
     * exist, or if it does exist, perform an alternative action depending on
     * `ignoreDuplicates`.
     *
     * By default, upserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to upsert with. Pass an object to upsert a
     * single row or an array to upsert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
     * duplicate rows are determined. Two rows are duplicates if all the
     * `onConflict` columns are equal.
     *
     * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
     * `false`, duplicate rows are merged with existing rows.
     *
     * @param options.count - Count algorithm to use to count upserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. This only applies when
     * inserting new rows, not when merging with existing rows under
     * `ignoreDuplicates: false`.
     */ upsert(values, { onConflict , ignoreDuplicates =false , count , defaultToNull =true  } = {}) {
        const method = "POST";
        const prefersHeaders = [
            `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`
        ];
        if (onConflict !== undefined) this.url.searchParams.set("on_conflict", onConflict);
        if (this.headers["Prefer"]) prefersHeaders.push(this.headers["Prefer"]);
        if (count) prefersHeaders.push(`count=${count}`);
        if (!defaultToNull) prefersHeaders.push("missing=default");
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x)=>acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [
                    ...new Set(columns)
                ].map((column)=>`"${column}"`);
                this.url.searchParams.set("columns", uniqueColumns.join(","));
            }
        }
        return new (0, _postgrestFilterBuilderDefault.default)({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
    /**
     * Perform an UPDATE on the table or view.
     *
     * By default, updated rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param values - The values to update with
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count updated rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ update(values, { count  } = {}) {
        const method = "PATCH";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) prefersHeaders.push(this.headers["Prefer"]);
        if (count) prefersHeaders.push(`count=${count}`);
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new (0, _postgrestFilterBuilderDefault.default)({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
    /**
     * Perform a DELETE on the table or view.
     *
     * By default, deleted rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count deleted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ delete({ count  } = {}) {
        const method = "DELETE";
        const prefersHeaders = [];
        if (count) prefersHeaders.push(`count=${count}`);
        if (this.headers["Prefer"]) prefersHeaders.unshift(this.headers["Prefer"]);
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new (0, _postgrestFilterBuilderDefault.default)({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
}
exports.default = PostgrestQueryBuilder;

},{"./PostgrestFilterBuilder":"6Prbt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6Prbt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _postgrestTransformBuilder = require("./PostgrestTransformBuilder");
var _postgrestTransformBuilderDefault = parcelHelpers.interopDefault(_postgrestTransformBuilder);
class PostgrestFilterBuilder extends (0, _postgrestTransformBuilderDefault.default) {
    /**
     * Match only rows where `column` is equal to `value`.
     *
     * To check if the value of `column` is NULL, you should use `.is()` instead.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is not equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-sensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */ like(column, pattern) {
        this.url.searchParams.append(column, `like.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */ likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */ likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-insensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */ ilike(column, pattern) {
        this.url.searchParams.append(column, `ilike.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */ ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */ ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
        return this;
    }
    /**
     * Match only rows where `column` IS `value`.
     *
     * For non-boolean columns, this is only relevant for checking if the value of
     * `column` is NULL by setting `value` to `null`.
     *
     * For boolean columns, you can also set `value` to `true` or `false` and it
     * will behave the same way as `.eq()`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is included in the `values` array.
     *
     * @param column - The column to filter on
     * @param values - The values array to filter with
     */ in(column, values) {
        const cleanedValues = values.map((s)=>{
            // handle postgrest reserved characters
            // https://postgrest.org/en/v7.0.0/api.html#reserved-characters
            if (typeof s === "string" && new RegExp("[,()]").test(s)) return `"${s}"`;
            else return `${s}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * `column` contains every element appearing in `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */ contains(column, value) {
        if (typeof value === "string") // range types can be inclusive '[', ']' or exclusive '(', ')' so just
        // keep it simple and accept a string
        this.url.searchParams.append(column, `cs.${value}`);
        else if (Array.isArray(value)) // array
        this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
        else // json
        this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * every element appearing in `column` is contained by `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */ containedBy(column, value) {
        if (typeof value === "string") // range
        this.url.searchParams.append(column, `cd.${value}`);
        else if (Array.isArray(value)) // array
        this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
        else // json
        this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is greater than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or greater than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is less than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or less than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where `column` is
     * mutually exclusive to `range` and there can be no element between the two
     * ranges.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
    }
    /**
     * Only relevant for array and range columns. Match only rows where
     * `column` and `value` have an element in common.
     *
     * @param column - The array or range column to filter on
     * @param value - The array or range value to filter with
     */ overlaps(column, value) {
        if (typeof value === "string") // range
        this.url.searchParams.append(column, `ov.${value}`);
        else // array
        this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
        return this;
    }
    /**
     * Only relevant for text and tsvector columns. Match only rows where
     * `column` matches the query string in `query`.
     *
     * @param column - The text or tsvector column to filter on
     * @param query - The query text to match with
     * @param options - Named parameters
     * @param options.config - The text search configuration to use
     * @param options.type - Change how the `query` text is interpreted
     */ textSearch(column, query, { config , type  } = {}) {
        let typePart = "";
        if (type === "plain") typePart = "pl";
        else if (type === "phrase") typePart = "ph";
        else if (type === "websearch") typePart = "w";
        const configPart = config === undefined ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
    }
    /**
     * Match only rows where each column in `query` keys is equal to its
     * associated value. Shorthand for multiple `.eq()`s.
     *
     * @param query - The object to filter with, with column names as keys mapped
     * to their filter values
     */ match(query) {
        Object.entries(query).forEach(([column, value])=>{
            this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
    }
    /**
     * Match only rows which doesn't satisfy the filter.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to be negated to filter with, following
     * PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */ not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
    }
    /**
     * Match only rows which satisfy at least one of the filters.
     *
     * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure it's properly sanitized.
     *
     * It's currently not possible to do an `.or()` filter across multiple tables.
     *
     * @param filters - The filters to use, following PostgREST syntax
     * @param foreignTable - Set this to filter on foreign tables instead of the
     * current table
     */ or(filters, { foreignTable  } = {}) {
        const key = foreignTable ? `${foreignTable}.or` : "or";
        this.url.searchParams.append(key, `(${filters})`);
        return this;
    }
    /**
     * Match only rows which satisfy the filter. This is an escape hatch - you
     * should use the specific filter methods wherever possible.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to filter with, following PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */ filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
    }
}
exports.default = PostgrestFilterBuilder;

},{"./PostgrestTransformBuilder":"bztnC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bztnC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _postgrestBuilder = require("./PostgrestBuilder");
var _postgrestBuilderDefault = parcelHelpers.interopDefault(_postgrestBuilder);
class PostgrestTransformBuilder extends (0, _postgrestBuilderDefault.default) {
    /**
     * Perform a SELECT on the query result.
     *
     * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
     * return modified rows. By calling this method, modified rows are returned in
     * `data`.
     *
     * @param columns - The columns to retrieve, separated by commas
     */ select(columns) {
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c)=>{
            if (/\s/.test(c) && !quoted) return "";
            if (c === '"') quoted = !quoted;
            return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (this.headers["Prefer"]) this.headers["Prefer"] += ",";
        this.headers["Prefer"] += "return=representation";
        return this;
    }
    /**
     * Order the query result by `column`.
     *
     * You can call this method multiple times to order by multiple columns.
     *
     * You can order foreign tables, but it doesn't affect the ordering of the
     * current table.
     *
     * @param column - The column to order by
     * @param options - Named parameters
     * @param options.ascending - If `true`, the result will be in ascending order
     * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
     * `null`s appear last.
     * @param options.foreignTable - Set this to order a foreign table by foreign
     * columns
     */ order(column, { ascending =true , nullsFirst , foreignTable  } = {}) {
        const key = foreignTable ? `${foreignTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key);
        this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === undefined ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
    }
    /**
     * Limit the query result by `count`.
     *
     * @param count - The maximum number of rows to return
     * @param options - Named parameters
     * @param options.foreignTable - Set this to limit rows of foreign tables
     * instead of the current table
     */ limit(count, { foreignTable  } = {}) {
        const key = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
        this.url.searchParams.set(key, `${count}`);
        return this;
    }
    /**
     * Limit the query result by `from` and `to` inclusively.
     *
     * @param from - The starting index from which to limit the result
     * @param to - The last index to which to limit the result
     * @param options - Named parameters
     * @param options.foreignTable - Set this to limit rows of foreign tables
     * instead of the current table
     */ range(from, to, { foreignTable  } = {}) {
        const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
        const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        // Range is inclusive, so add 1
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
    }
    /**
     * Set the AbortSignal for the fetch request.
     *
     * @param signal - The AbortSignal to use for the fetch request
     */ abortSignal(signal) {
        this.signal = signal;
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be one row (e.g. using `.limit(1)`), otherwise this
     * returns an error.
     */ single() {
        this.headers["Accept"] = "application/vnd.pgrst.object+json";
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
     * this returns an error.
     */ maybeSingle() {
        // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
        // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
        if (this.method === "GET") this.headers["Accept"] = "application/json";
        else this.headers["Accept"] = "application/vnd.pgrst.object+json";
        this.isMaybeSingle = true;
        return this;
    }
    /**
     * Return `data` as a string in CSV format.
     */ csv() {
        this.headers["Accept"] = "text/csv";
        return this;
    }
    /**
     * Return `data` as an object in [GeoJSON](https://geojson.org) format.
     */ geojson() {
        this.headers["Accept"] = "application/geo+json";
        return this;
    }
    /**
     * Return `data` as the EXPLAIN plan for the query.
     *
     * @param options - Named parameters
     *
     * @param options.analyze - If `true`, the query will be executed and the
     * actual run time will be returned
     *
     * @param options.verbose - If `true`, the query identifier will be returned
     * and `data` will include the output columns of the query
     *
     * @param options.settings - If `true`, include information on configuration
     * parameters that affect query planning
     *
     * @param options.buffers - If `true`, include information on buffer usage
     *
     * @param options.wal - If `true`, include information on WAL record generation
     *
     * @param options.format - The format of the output, can be `"text"` (default)
     * or `"json"`
     */ explain({ analyze =false , verbose =false , settings =false , buffers =false , wal =false , format ="text"  } = {}) {
        const options = [
            analyze ? "analyze" : null,
            verbose ? "verbose" : null,
            settings ? "settings" : null,
            buffers ? "buffers" : null,
            wal ? "wal" : null
        ].filter(Boolean).join("|");
        // An Accept header can carry multiple media types but postgrest-js always sends one
        const forMediatype = this.headers["Accept"];
        this.headers["Accept"] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`;
        if (format === "json") return this;
        else return this;
    }
    /**
     * Rollback the query.
     *
     * `data` will still be returned, but the query is not committed.
     */ rollback() {
        var _a;
        if (((_a = this.headers["Prefer"]) !== null && _a !== void 0 ? _a : "").trim().length > 0) this.headers["Prefer"] += ",tx=rollback";
        else this.headers["Prefer"] = "tx=rollback";
        return this;
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     */ returns() {
        return this;
    }
}
exports.default = PostgrestTransformBuilder;

},{"./PostgrestBuilder":"dCZYJ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dCZYJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _crossFetch = require("cross-fetch");
var _crossFetchDefault = parcelHelpers.interopDefault(_crossFetch);
class PostgrestBuilder {
    constructor(builder){
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = builder.shouldThrowOnError;
        this.signal = builder.signal;
        this.isMaybeSingle = builder.isMaybeSingle;
        if (builder.fetch) this.fetch = builder.fetch;
        else if (typeof fetch === "undefined") this.fetch = (0, _crossFetchDefault.default);
        else this.fetch = fetch;
    }
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */ throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    then(onfulfilled, onrejected) {
        // https://postgrest.org/en/stable/api.html#switching-schemas
        if (this.schema === undefined) ;
        else if ([
            "GET",
            "HEAD"
        ].includes(this.method)) this.headers["Accept-Profile"] = this.schema;
        else this.headers["Content-Profile"] = this.schema;
        if (this.method !== "GET" && this.method !== "HEAD") this.headers["Content-Type"] = "application/json";
        // NOTE: Invoke w/o `this` to avoid illegal invocation error.
        // https://github.com/supabase/postgrest-js/pull/247
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal
        }).then(async (res)=>{
            var _a, _b, _c;
            let error = null;
            let data = null;
            let count = null;
            let status = res.status;
            let statusText = res.statusText;
            if (res.ok) {
                if (this.method !== "HEAD") {
                    const body = await res.text();
                    if (body === "") ;
                    else if (this.headers["Accept"] === "text/csv") data = body;
                    else if (this.headers["Accept"] && this.headers["Accept"].includes("application/vnd.pgrst.plan+text")) data = body;
                    else data = JSON.parse(body);
                }
                const countHeader = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
                const contentRange = (_b = res.headers.get("content-range")) === null || _b === void 0 ? void 0 : _b.split("/");
                if (countHeader && contentRange && contentRange.length > 1) count = parseInt(contentRange[1]);
                // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
                // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
                if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data)) {
                    if (data.length > 1) {
                        error = {
                            // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                            code: "PGRST116",
                            details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                            hint: null,
                            message: "JSON object requested, multiple (or no) rows returned"
                        };
                        data = null;
                        count = null;
                        status = 406;
                        statusText = "Not Acceptable";
                    } else if (data.length === 1) data = data[0];
                    else data = null;
                }
            } else {
                const body = await res.text();
                try {
                    error = JSON.parse(body);
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (Array.isArray(error) && res.status === 404) {
                        data = [];
                        error = null;
                        status = 200;
                        statusText = "OK";
                    }
                } catch (_d) {
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (res.status === 404 && body === "") {
                        status = 204;
                        statusText = "No Content";
                    } else error = {
                        message: body
                    };
                }
                if (error && this.isMaybeSingle && ((_c = error === null || error === void 0 ? void 0 : error.details) === null || _c === void 0 ? void 0 : _c.includes("Results contain 0 rows"))) {
                    error = null;
                    status = 200;
                    statusText = "OK";
                }
                if (error && this.shouldThrowOnError) throw error;
            }
            const postgrestResponse = {
                error,
                data,
                count,
                status,
                statusText
            };
            return postgrestResponse;
        });
        if (!this.shouldThrowOnError) res = res.catch((fetchError)=>{
            var _a, _b, _c;
            return {
                error: {
                    message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                    details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
                    hint: "",
                    code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`
                },
                data: null,
                count: null,
                status: 0,
                statusText: ""
            };
        });
        return res.then(onfulfilled, onrejected);
    }
}
exports.default = PostgrestBuilder;

},{"cross-fetch":"j4ah4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j4ah4":[function(require,module,exports) {
var global = typeof self !== "undefined" ? self : this;
var __self__ = function() {
    function F() {
        this.fetch = false;
        this.DOMException = global.DOMException;
    }
    F.prototype = global;
    return new F();
}();
(function(self1) {
    var irrelevant = function(exports1) {
        var support = {
            searchParams: "URLSearchParams" in self1,
            iterable: "Symbol" in self1 && "iterator" in Symbol,
            blob: "FileReader" in self1 && "Blob" in self1 && function() {
                try {
                    new Blob();
                    return true;
                } catch (e) {
                    return false;
                }
            }(),
            formData: "FormData" in self1,
            arrayBuffer: "ArrayBuffer" in self1
        };
        function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
            var viewClasses = [
                "[object Int8Array]",
                "[object Uint8Array]",
                "[object Uint8ClampedArray]",
                "[object Int16Array]",
                "[object Uint16Array]",
                "[object Int32Array]",
                "[object Uint32Array]",
                "[object Float32Array]",
                "[object Float64Array]"
            ];
            var isArrayBufferView = ArrayBuffer.isView || function(obj) {
                return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
            };
        }
        function normalizeName(name) {
            if (typeof name !== "string") name = String(name);
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) throw new TypeError("Invalid character in header field name");
            return name.toLowerCase();
        }
        function normalizeValue(value) {
            if (typeof value !== "string") value = String(value);
            return value;
        }
        // Build a destructive iterator for the value list
        function iteratorFor(items) {
            var iterator = {
                next: function() {
                    var value = items.shift();
                    return {
                        done: value === undefined,
                        value: value
                    };
                }
            };
            if (support.iterable) iterator[Symbol.iterator] = function() {
                return iterator;
            };
            return iterator;
        }
        function Headers(headers) {
            this.map = {};
            if (headers instanceof Headers) headers.forEach(function(value, name) {
                this.append(name, value);
            }, this);
            else if (Array.isArray(headers)) headers.forEach(function(header) {
                this.append(header[0], header[1]);
            }, this);
            else if (headers) Object.getOwnPropertyNames(headers).forEach(function(name) {
                this.append(name, headers[name]);
            }, this);
        }
        Headers.prototype.append = function(name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name) {
            delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
            name = normalizeName(name);
            return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
            for(var name in this.map)if (this.map.hasOwnProperty(name)) callback.call(thisArg, this.map[name], name, this);
        };
        Headers.prototype.keys = function() {
            var items = [];
            this.forEach(function(value, name) {
                items.push(name);
            });
            return iteratorFor(items);
        };
        Headers.prototype.values = function() {
            var items = [];
            this.forEach(function(value) {
                items.push(value);
            });
            return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
            var items = [];
            this.forEach(function(value, name) {
                items.push([
                    name,
                    value
                ]);
            });
            return iteratorFor(items);
        };
        if (support.iterable) Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        function consumed(body) {
            if (body.bodyUsed) return Promise.reject(new TypeError("Already read"));
            body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
            return new Promise(function(resolve, reject) {
                reader.onload = function() {
                    resolve(reader.result);
                };
                reader.onerror = function() {
                    reject(reader.error);
                };
            });
        }
        function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob);
            return promise;
        }
        function readBlobAsText(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsText(blob);
            return promise;
        }
        function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf);
            var chars = new Array(view.length);
            for(var i = 0; i < view.length; i++)chars[i] = String.fromCharCode(view[i]);
            return chars.join("");
        }
        function bufferClone(buf) {
            if (buf.slice) return buf.slice(0);
            else {
                var view = new Uint8Array(buf.byteLength);
                view.set(new Uint8Array(buf));
                return view.buffer;
            }
        }
        function Body() {
            this.bodyUsed = false;
            this._initBody = function(body) {
                this._bodyInit = body;
                if (!body) this._bodyText = "";
                else if (typeof body === "string") this._bodyText = body;
                else if (support.blob && Blob.prototype.isPrototypeOf(body)) this._bodyBlob = body;
                else if (support.formData && FormData.prototype.isPrototypeOf(body)) this._bodyFormData = body;
                else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) this._bodyText = body.toString();
                else if (support.arrayBuffer && support.blob && isDataView(body)) {
                    this._bodyArrayBuffer = bufferClone(body.buffer);
                    // IE 10-11 can't handle a DataView body.
                    this._bodyInit = new Blob([
                        this._bodyArrayBuffer
                    ]);
                } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) this._bodyArrayBuffer = bufferClone(body);
                else this._bodyText = body = Object.prototype.toString.call(body);
                if (!this.headers.get("content-type")) {
                    if (typeof body === "string") this.headers.set("content-type", "text/plain;charset=UTF-8");
                    else if (this._bodyBlob && this._bodyBlob.type) this.headers.set("content-type", this._bodyBlob.type);
                    else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                }
            };
            if (support.blob) {
                this.blob = function() {
                    var rejected = consumed(this);
                    if (rejected) return rejected;
                    if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                    else if (this._bodyArrayBuffer) return Promise.resolve(new Blob([
                        this._bodyArrayBuffer
                    ]));
                    else if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                    else return Promise.resolve(new Blob([
                        this._bodyText
                    ]));
                };
                this.arrayBuffer = function() {
                    if (this._bodyArrayBuffer) return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                    else return this.blob().then(readBlobAsArrayBuffer);
                };
            }
            this.text = function() {
                var rejected = consumed(this);
                if (rejected) return rejected;
                if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
                else if (this._bodyArrayBuffer) return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
                else if (this._bodyFormData) throw new Error("could not read FormData body as text");
                else return Promise.resolve(this._bodyText);
            };
            if (support.formData) this.formData = function() {
                return this.text().then(decode);
            };
            this.json = function() {
                return this.text().then(JSON.parse);
            };
            return this;
        }
        // HTTP methods whose capitalization should be normalized
        var methods = [
            "DELETE",
            "GET",
            "HEAD",
            "OPTIONS",
            "POST",
            "PUT"
        ];
        function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
            options = options || {};
            var body = options.body;
            if (input instanceof Request) {
                if (input.bodyUsed) throw new TypeError("Already read");
                this.url = input.url;
                this.credentials = input.credentials;
                if (!options.headers) this.headers = new Headers(input.headers);
                this.method = input.method;
                this.mode = input.mode;
                this.signal = input.signal;
                if (!body && input._bodyInit != null) {
                    body = input._bodyInit;
                    input.bodyUsed = true;
                }
            } else this.url = String(input);
            this.credentials = options.credentials || this.credentials || "same-origin";
            if (options.headers || !this.headers) this.headers = new Headers(options.headers);
            this.method = normalizeMethod(options.method || this.method || "GET");
            this.mode = options.mode || this.mode || null;
            this.signal = options.signal || this.signal;
            this.referrer = null;
            if ((this.method === "GET" || this.method === "HEAD") && body) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(body);
        }
        Request.prototype.clone = function() {
            return new Request(this, {
                body: this._bodyInit
            });
        };
        function decode(body) {
            var form = new FormData();
            body.trim().split("&").forEach(function(bytes) {
                if (bytes) {
                    var split = bytes.split("=");
                    var name = split.shift().replace(/\+/g, " ");
                    var value = split.join("=").replace(/\+/g, " ");
                    form.append(decodeURIComponent(name), decodeURIComponent(value));
                }
            });
            return form;
        }
        function parseHeaders(rawHeaders) {
            var headers = new Headers();
            // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
            // https://tools.ietf.org/html/rfc7230#section-3.2
            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
            preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
                var parts = line.split(":");
                var key = parts.shift().trim();
                if (key) {
                    var value = parts.join(":").trim();
                    headers.append(key, value);
                }
            });
            return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
            if (!options) options = {};
            this.type = "default";
            this.status = options.status === undefined ? 200 : options.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = "statusText" in options ? options.statusText : "OK";
            this.headers = new Headers(options.headers);
            this.url = options.url || "";
            this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
            return new Response(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new Headers(this.headers),
                url: this.url
            });
        };
        Response.error = function() {
            var response = new Response(null, {
                status: 0,
                statusText: ""
            });
            response.type = "error";
            return response;
        };
        var redirectStatuses = [
            301,
            302,
            303,
            307,
            308
        ];
        Response.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) throw new RangeError("Invalid status code");
            return new Response(null, {
                status: status,
                headers: {
                    location: url
                }
            });
        };
        exports1.DOMException = self1.DOMException;
        try {
            new exports1.DOMException();
        } catch (err) {
            exports1.DOMException = function(message, name) {
                this.message = message;
                this.name = name;
                var error = Error(message);
                this.stack = error.stack;
            };
            exports1.DOMException.prototype = Object.create(Error.prototype);
            exports1.DOMException.prototype.constructor = exports1.DOMException;
        }
        function fetch(input, init) {
            return new Promise(function(resolve, reject) {
                var request = new Request(input, init);
                if (request.signal && request.signal.aborted) return reject(new exports1.DOMException("Aborted", "AbortError"));
                var xhr = new XMLHttpRequest();
                function abortXhr() {
                    xhr.abort();
                }
                xhr.onload = function() {
                    var options = {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                    };
                    options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
                    var body = "response" in xhr ? xhr.response : xhr.responseText;
                    resolve(new Response(body, options));
                };
                xhr.onerror = function() {
                    reject(new TypeError("Network request failed"));
                };
                xhr.ontimeout = function() {
                    reject(new TypeError("Network request failed"));
                };
                xhr.onabort = function() {
                    reject(new exports1.DOMException("Aborted", "AbortError"));
                };
                xhr.open(request.method, request.url, true);
                if (request.credentials === "include") xhr.withCredentials = true;
                else if (request.credentials === "omit") xhr.withCredentials = false;
                if ("responseType" in xhr && support.blob) xhr.responseType = "blob";
                request.headers.forEach(function(value, name) {
                    xhr.setRequestHeader(name, value);
                });
                if (request.signal) {
                    request.signal.addEventListener("abort", abortXhr);
                    xhr.onreadystatechange = function() {
                        // DONE (success or failure)
                        if (xhr.readyState === 4) request.signal.removeEventListener("abort", abortXhr);
                    };
                }
                xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
            });
        }
        fetch.polyfill = true;
        if (!self1.fetch) {
            self1.fetch = fetch;
            self1.Headers = Headers;
            self1.Request = Request;
            self1.Response = Response;
        }
        exports1.Headers = Headers;
        exports1.Request = Request;
        exports1.Response = Response;
        exports1.fetch = fetch;
        Object.defineProperty(exports1, "__esModule", {
            value: true
        });
        return exports1;
    }({});
})(__self__);
__self__.fetch.ponyfill = true;
// Remove "polyfill" property added by whatwg-fetch
delete __self__.fetch.polyfill;
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
exports = ctx.fetch // To enable: import fetch from 'cross-fetch'
;
exports.default = ctx.fetch // For TypeScript consumers without esModuleInterop.
;
exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'
;
exports.Headers = ctx.Headers;
exports.Request = ctx.Request;
exports.Response = ctx.Response;
module.exports = exports;

},{}],"3cetg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_HEADERS", ()=>DEFAULT_HEADERS);
var _version = require("./version");
const DEFAULT_HEADERS = {
    "X-Client-Info": `postgrest-js/${(0, _version.version)}`
};

},{"./version":"98teW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"98teW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "version", ()=>version);
const version = "1.7.0";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ii5aX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RealtimePresence", ()=>(0, _realtimePresenceDefault.default));
parcelHelpers.export(exports, "RealtimeChannel", ()=>(0, _realtimeChannelDefault.default));
parcelHelpers.export(exports, "RealtimeClient", ()=>(0, _realtimeClientDefault.default));
parcelHelpers.export(exports, "REALTIME_LISTEN_TYPES", ()=>(0, _realtimeChannel.REALTIME_LISTEN_TYPES));
parcelHelpers.export(exports, "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT", ()=>(0, _realtimeChannel.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT));
parcelHelpers.export(exports, "REALTIME_PRESENCE_LISTEN_EVENTS", ()=>(0, _realtimePresence.REALTIME_PRESENCE_LISTEN_EVENTS));
parcelHelpers.export(exports, "REALTIME_SUBSCRIBE_STATES", ()=>(0, _realtimeChannel.REALTIME_SUBSCRIBE_STATES));
var _realtimeClient = require("./RealtimeClient");
var _realtimeClientDefault = parcelHelpers.interopDefault(_realtimeClient);
var _realtimeChannel = require("./RealtimeChannel");
var _realtimeChannelDefault = parcelHelpers.interopDefault(_realtimeChannel);
var _realtimePresence = require("./RealtimePresence");
var _realtimePresenceDefault = parcelHelpers.interopDefault(_realtimePresence);

},{"./RealtimeClient":"40Ac7","./RealtimeChannel":"7VOkr","./RealtimePresence":"7hJI0","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"40Ac7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _websocket = require("websocket");
var _constants = require("./lib/constants");
var _timer = require("./lib/timer");
var _timerDefault = parcelHelpers.interopDefault(_timer);
var _serializer = require("./lib/serializer");
var _serializerDefault = parcelHelpers.interopDefault(_serializer);
var _realtimeChannel = require("./RealtimeChannel");
var _realtimeChannelDefault = parcelHelpers.interopDefault(_realtimeChannel);
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const noop = ()=>{};
class RealtimeClient {
    /**
     * Initializes the Socket.
     *
     * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
     * @param options.transport The Websocket Transport, for example WebSocket.
     * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
     * @param options.params The optional params to pass when connecting.
     * @param options.headers The optional headers to pass when connecting.
     * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
     * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
     * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
     * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
     * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
     */ constructor(endPoint, options){
        var _a;
        this.accessToken = null;
        this.channels = [];
        this.endPoint = "";
        this.headers = (0, _constants.DEFAULT_HEADERS);
        this.params = {};
        this.timeout = (0, _constants.DEFAULT_TIMEOUT);
        this.transport = (0, _websocket.w3cwebsocket);
        this.heartbeatIntervalMs = 30000;
        this.heartbeatTimer = undefined;
        this.pendingHeartbeatRef = null;
        this.ref = 0;
        this.logger = noop;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new (0, _serializerDefault.default)();
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: []
        };
        this.eventsPerSecondLimitMs = 100;
        this.inThrottle = false;
        this.endPoint = `${endPoint}/${(0, _constants.TRANSPORTS).websocket}`;
        if (options === null || options === void 0 ? void 0 : options.params) this.params = options.params;
        if (options === null || options === void 0 ? void 0 : options.headers) this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
        if (options === null || options === void 0 ? void 0 : options.timeout) this.timeout = options.timeout;
        if (options === null || options === void 0 ? void 0 : options.logger) this.logger = options.logger;
        if (options === null || options === void 0 ? void 0 : options.transport) this.transport = options.transport;
        if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) this.heartbeatIntervalMs = options.heartbeatIntervalMs;
        const eventsPerSecond = (_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.eventsPerSecond;
        if (eventsPerSecond) this.eventsPerSecondLimitMs = Math.floor(1000 / eventsPerSecond);
        this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : (tries)=>{
            return [
                1000,
                2000,
                5000,
                10000
            ][tries - 1] || 10000;
        };
        this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback)=>{
            return callback(JSON.stringify(payload));
        };
        this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
        this.reconnectTimer = new (0, _timerDefault.default)(()=>__awaiter(this, void 0, void 0, function*() {
                this.disconnect();
                this.connect();
            }), this.reconnectAfterMs);
    }
    /**
     * Connects the socket, unless already connected.
     */ connect() {
        if (this.conn) return;
        this.conn = new this.transport(this._endPointURL(), [], null, this.headers);
        if (this.conn) {
            this.conn.binaryType = "arraybuffer";
            this.conn.onopen = ()=>this._onConnOpen();
            this.conn.onerror = (error)=>this._onConnError(error);
            this.conn.onmessage = (event)=>this._onConnMessage(event);
            this.conn.onclose = (event)=>this._onConnClose(event);
        }
    }
    /**
     * Disconnects the socket.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     */ disconnect(code, reason) {
        if (this.conn) {
            this.conn.onclose = function() {}; // noop
            if (code) this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
            else this.conn.close();
            this.conn = null;
            // remove open handles
            this.heartbeatTimer && clearInterval(this.heartbeatTimer);
            this.reconnectTimer.reset();
        }
    }
    /**
     * Returns all created channels
     */ getChannels() {
        return this.channels;
    }
    /**
     * Unsubscribes and removes a single channel
     * @param channel A RealtimeChannel instance
     */ removeChannel(channel) {
        return __awaiter(this, void 0, void 0, function*() {
            const status = yield channel.unsubscribe();
            if (this.channels.length === 0) this.disconnect();
            return status;
        });
    }
    /**
     * Unsubscribes and removes all channels
     */ removeAllChannels() {
        return __awaiter(this, void 0, void 0, function*() {
            const values_1 = yield Promise.all(this.channels.map((channel)=>channel.unsubscribe()));
            this.disconnect();
            return values_1;
        });
    }
    /**
     * Logs the message.
     *
     * For customized logging, `this.logger` can be overridden.
     */ log(kind, msg, data) {
        this.logger(kind, msg, data);
    }
    /**
     * Returns the current state of the socket.
     */ connectionState() {
        switch(this.conn && this.conn.readyState){
            case (0, _constants.SOCKET_STATES).connecting:
                return (0, _constants.CONNECTION_STATE).Connecting;
            case (0, _constants.SOCKET_STATES).open:
                return (0, _constants.CONNECTION_STATE).Open;
            case (0, _constants.SOCKET_STATES).closing:
                return (0, _constants.CONNECTION_STATE).Closing;
            default:
                return (0, _constants.CONNECTION_STATE).Closed;
        }
    }
    /**
     * Returns `true` is the connection is open.
     */ isConnected() {
        return this.connectionState() === (0, _constants.CONNECTION_STATE).Open;
    }
    channel(topic, params = {
        config: {}
    }) {
        if (!this.isConnected()) this.connect();
        const chan = new (0, _realtimeChannelDefault.default)(`realtime:${topic}`, params, this);
        this.channels.push(chan);
        return chan;
    }
    /**
     * Push out a message if the socket is connected.
     *
     * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
     */ push(data) {
        const { topic , event , payload , ref  } = data;
        let callback = ()=>{
            this.encode(data, (result)=>{
                var _a;
                (_a = this.conn) === null || _a === void 0 || _a.send(result);
            });
        };
        this.log("push", `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
            if ([
                "broadcast",
                "presence",
                "postgres_changes"
            ].includes(event)) {
                const isThrottled = this._throttle(callback)();
                if (isThrottled) return "rate limited";
            } else callback();
        } else this.sendBuffer.push(callback);
    }
    /**
     * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
     *
     * @param token A JWT string.
     */ setAuth(token) {
        this.accessToken = token;
        this.channels.forEach((channel)=>{
            token && channel.updateJoinPayload({
                access_token: token
            });
            if (channel.joinedOnce && channel._isJoined()) channel._push((0, _constants.CHANNEL_EVENTS).access_token, {
                access_token: token
            });
        });
    }
    /**
     * Return the next message ref, accounting for overflows
     *
     * @internal
     */ _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) this.ref = 0;
        else this.ref = newRef;
        return this.ref.toString();
    }
    /**
     * Unsubscribe from channels with the specified topic.
     *
     * @internal
     */ _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c)=>c.topic === topic && (c._isJoined() || c._isJoining()));
        if (dupChannel) {
            this.log("transport", `leaving duplicate topic "${topic}"`);
            dupChannel.unsubscribe();
        }
    }
    /**
     * Removes a subscription from the socket.
     *
     * @param channel An open subscription.
     *
     * @internal
     */ _remove(channel) {
        this.channels = this.channels.filter((c)=>c._joinRef() !== channel._joinRef());
    }
    /**
     * Returns the URL of the websocket.
     *
     * @internal
     */ _endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, {
            vsn: (0, _constants.VSN)
        }));
    }
    /** @internal */ _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg)=>{
            let { topic , event , payload , ref  } = msg;
            if (ref && ref === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) this.pendingHeartbeatRef = null;
            this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
            this.channels.filter((channel)=>channel._isMember(topic)).forEach((channel)=>channel._trigger(event, payload, ref));
            this.stateChangeCallbacks.message.forEach((callback)=>callback(msg));
        });
    }
    /** @internal */ _onConnOpen() {
        this.log("transport", `connected to ${this._endPointURL()}`);
        this._flushSendBuffer();
        this.reconnectTimer.reset();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(()=>this._sendHeartbeat(), this.heartbeatIntervalMs);
        this.stateChangeCallbacks.open.forEach((callback)=>callback());
    }
    /** @internal */ _onConnClose(event) {
        this.log("transport", "close", event);
        this._triggerChanError();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach((callback)=>callback(event));
    }
    /** @internal */ _onConnError(error) {
        this.log("transport", error.message);
        this._triggerChanError();
        this.stateChangeCallbacks.error.forEach((callback)=>callback(error));
    }
    /** @internal */ _triggerChanError() {
        this.channels.forEach((channel)=>channel._trigger((0, _constants.CHANNEL_EVENTS).error));
    }
    /** @internal */ _appendParams(url, params) {
        if (Object.keys(params).length === 0) return url;
        const prefix = url.match(/\?/) ? "&" : "?";
        const query = new URLSearchParams(params);
        return `${url}${prefix}${query}`;
    }
    /** @internal */ _flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback)=>callback());
            this.sendBuffer = [];
        }
    }
    /** @internal */ _sendHeartbeat() {
        var _a;
        if (!this.isConnected()) return;
        if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            (_a = this.conn) === null || _a === void 0 || _a.close((0, _constants.WS_CLOSE_NORMAL), "hearbeat timeout");
            return;
        }
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: this.pendingHeartbeatRef
        });
        this.setAuth(this.accessToken);
    }
    /** @internal */ _throttle(callback, eventsPerSecondLimitMs = this.eventsPerSecondLimitMs) {
        return ()=>{
            if (this.inThrottle) return true;
            callback();
            if (eventsPerSecondLimitMs > 0) {
                this.inThrottle = true;
                setTimeout(()=>{
                    this.inThrottle = false;
                }, eventsPerSecondLimitMs);
            }
            return false;
        };
    }
}
exports.default = RealtimeClient;

},{"websocket":"aRycB","./lib/constants":"jdaS4","./lib/timer":"2kNsn","./lib/serializer":"4eoeK","./RealtimeChannel":"7VOkr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aRycB":[function(require,module,exports) {
var _globalThis;
if (typeof globalThis === "object") _globalThis = globalThis;
else try {
    _globalThis = require("772c5c366cfb9f50");
} catch (error) {} finally{
    if (!_globalThis && typeof window !== "undefined") _globalThis = window;
    if (!_globalThis) throw new Error("Could not determine global this");
}
var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
var websocket_version = require("49801c05d6bae04a");
/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */ function W3CWebSocket(uri, protocols) {
    var native_instance;
    if (protocols) native_instance = new NativeWebSocket(uri, protocols);
    else native_instance = new NativeWebSocket(uri);
    /**
	 * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
	 * class). Since it is an Object it will be returned as it is when creating an
	 * instance of W3CWebSocket via 'new W3CWebSocket()'.
	 *
	 * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
	 */ return native_instance;
}
if (NativeWebSocket) [
    "CONNECTING",
    "OPEN",
    "CLOSING",
    "CLOSED"
].forEach(function(prop) {
    Object.defineProperty(W3CWebSocket, prop, {
        get: function() {
            return NativeWebSocket[prop];
        }
    });
});
/**
 * Module exports.
 */ module.exports = {
    "w3cwebsocket": NativeWebSocket ? W3CWebSocket : null,
    "version": websocket_version
};

},{"772c5c366cfb9f50":"i0Mdn","49801c05d6bae04a":"itgdA"}],"i0Mdn":[function(require,module,exports) {
var naiveFallback = function() {
    if (typeof self === "object" && self) return self;
    if (typeof window === "object" && window) return window;
    throw new Error("Unable to resolve global `this`");
};
module.exports = function() {
    if (this) return this;
    // Unexpected strict mode (may happen if e.g. bundled into ESM module)
    // Fallback to standard globalThis if available
    if (typeof globalThis === "object" && globalThis) return globalThis;
    // Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
    // In all ES5+ engines global object inherits from Object.prototype
    // (if you approached one that doesn't please report)
    try {
        Object.defineProperty(Object.prototype, "__global__", {
            get: function() {
                return this;
            },
            configurable: true
        });
    } catch (error) {
        // Unfortunate case of updates to Object.prototype being restricted
        // via preventExtensions, seal or freeze
        return naiveFallback();
    }
    try {
        // Safari case (window.__global__ works, but __global__ does not)
        if (!__global__) return naiveFallback();
        return __global__;
    } finally{
        delete Object.prototype.__global__;
    }
}();

},{}],"itgdA":[function(require,module,exports) {
module.exports = require("2d469872620b12c6").version;

},{"2d469872620b12c6":"fCYcm"}],"fCYcm":[function(require,module,exports) {
module.exports = JSON.parse('{"name":"websocket","description":"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.","keywords":["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],"author":"Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)","contributors":["I\xf1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"],"version":"1.0.34","repository":{"type":"git","url":"https://github.com/theturtle32/WebSocket-Node.git"},"homepage":"https://github.com/theturtle32/WebSocket-Node","engines":{"node":">=4.0.0"},"dependencies":{"bufferutil":"^4.0.1","debug":"^2.2.0","es5-ext":"^0.10.50","typedarray-to-buffer":"^3.1.5","utf-8-validate":"^5.0.2","yaeti":"^0.0.6"},"devDependencies":{"buffer-equal":"^1.0.0","gulp":"^4.0.2","gulp-jshint":"^2.0.4","jshint-stylish":"^2.2.1","jshint":"^2.0.0","tape":"^4.9.1"},"config":{"verbose":false},"scripts":{"test":"tape test/unit/*.js","gulp":"gulp"},"main":"index","directories":{"lib":"./lib"},"browser":"lib/browser.js","license":"Apache-2.0"}');

},{}],"jdaS4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_HEADERS", ()=>DEFAULT_HEADERS);
parcelHelpers.export(exports, "VSN", ()=>VSN);
parcelHelpers.export(exports, "DEFAULT_TIMEOUT", ()=>DEFAULT_TIMEOUT);
parcelHelpers.export(exports, "WS_CLOSE_NORMAL", ()=>WS_CLOSE_NORMAL);
parcelHelpers.export(exports, "SOCKET_STATES", ()=>SOCKET_STATES);
parcelHelpers.export(exports, "CHANNEL_STATES", ()=>CHANNEL_STATES);
parcelHelpers.export(exports, "CHANNEL_EVENTS", ()=>CHANNEL_EVENTS);
parcelHelpers.export(exports, "TRANSPORTS", ()=>TRANSPORTS);
parcelHelpers.export(exports, "CONNECTION_STATE", ()=>CONNECTION_STATE);
var _version = require("./version");
const DEFAULT_HEADERS = {
    "X-Client-Info": `realtime-js/${(0, _version.version)}`
};
const VSN = "1.0.0";
const DEFAULT_TIMEOUT = 10000;
const WS_CLOSE_NORMAL = 1000;
var SOCKET_STATES;
(function(SOCKET_STATES) {
    SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
    SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
    SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
    SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function(CHANNEL_STATES) {
    CHANNEL_STATES["closed"] = "closed";
    CHANNEL_STATES["errored"] = "errored";
    CHANNEL_STATES["joined"] = "joined";
    CHANNEL_STATES["joining"] = "joining";
    CHANNEL_STATES["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function(CHANNEL_EVENTS) {
    CHANNEL_EVENTS["close"] = "phx_close";
    CHANNEL_EVENTS["error"] = "phx_error";
    CHANNEL_EVENTS["join"] = "phx_join";
    CHANNEL_EVENTS["reply"] = "phx_reply";
    CHANNEL_EVENTS["leave"] = "phx_leave";
    CHANNEL_EVENTS["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function(TRANSPORTS) {
    TRANSPORTS["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function(CONNECTION_STATE) {
    CONNECTION_STATE["Connecting"] = "connecting";
    CONNECTION_STATE["Open"] = "open";
    CONNECTION_STATE["Closing"] = "closing";
    CONNECTION_STATE["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));

},{"./version":"eUdX4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eUdX4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "version", ()=>version);
const version = "2.7.2";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2kNsn":[function(require,module,exports) {
/**
 * Creates a timer that accepts a `timerCalc` function to perform calculated timeout retries, such as exponential backoff.
 *
 * @example
 *    let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *      return [1000, 5000, 10000][tries - 1] || 10000
 *    })
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 *    reconnectTimer.scheduleTimeout() // fires after 5000
 *    reconnectTimer.reset()
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Timer {
    constructor(callback, timerCalc){
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = undefined;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
    }
    reset() {
        this.tries = 0;
        clearTimeout(this.timer);
    }
    // Cancels any previous scheduleTimeout and schedules callback
    scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.tries = this.tries + 1;
            this.callback();
        }, this.timerCalc(this.tries + 1));
    }
}
exports.default = Timer;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4eoeK":[function(require,module,exports) {
// This file draws heavily from https://github.com/phoenixframework/phoenix/commit/cf098e9cf7a44ee6479d31d911a97d3c7430c6fe
// License: https://github.com/phoenixframework/phoenix/blob/master/LICENSE.md
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Serializer {
    constructor(){
        this.HEADER_LENGTH = 1;
    }
    decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) return callback(this._binaryDecode(rawPayload));
        if (typeof rawPayload === "string") return callback(JSON.parse(rawPayload));
        return callback({});
    }
    _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder);
    }
    _decodeBroadcast(buffer, view, decoder) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
        return {
            ref: null,
            topic: topic,
            event: event,
            payload: data
        };
    }
}
exports.default = Serializer;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7VOkr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT", ()=>REALTIME_POSTGRES_CHANGES_LISTEN_EVENT);
parcelHelpers.export(exports, "REALTIME_LISTEN_TYPES", ()=>REALTIME_LISTEN_TYPES);
parcelHelpers.export(exports, "REALTIME_SUBSCRIBE_STATES", ()=>REALTIME_SUBSCRIBE_STATES);
var _constants = require("./lib/constants");
var _push = require("./lib/push");
var _pushDefault = parcelHelpers.interopDefault(_push);
var _timer = require("./lib/timer");
var _timerDefault = parcelHelpers.interopDefault(_timer);
var _realtimePresence = require("./RealtimePresence");
var _realtimePresenceDefault = parcelHelpers.interopDefault(_realtimePresence);
var _transformers = require("./lib/transformers");
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function(REALTIME_LISTEN_TYPES) {
    REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
    REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
    /**
     * listen to Postgres changes.
     */ REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function(REALTIME_SUBSCRIBE_STATES) {
    REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
    REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
    REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
    REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
class RealtimeChannel {
    constructor(/** Topic name can be any string. */ topic, params = {
        config: {}
    }, socket){
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = (0, _constants.CHANNEL_STATES).closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.params.config = Object.assign({
            broadcast: {
                ack: false,
                self: false
            },
            presence: {
                key: ""
            }
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new (0, _pushDefault.default)(this, (0, _constants.CHANNEL_EVENTS).join, this.params, this.timeout);
        this.rejoinTimer = new (0, _timerDefault.default)(()=>this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive("ok", ()=>{
            this.state = (0, _constants.CHANNEL_STATES).joined;
            this.rejoinTimer.reset();
            this.pushBuffer.forEach((pushEvent)=>pushEvent.send());
            this.pushBuffer = [];
        });
        this._onClose(()=>{
            this.rejoinTimer.reset();
            this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
            this.state = (0, _constants.CHANNEL_STATES).closed;
            this.socket._remove(this);
        });
        this._onError((reason)=>{
            if (this._isLeaving() || this._isClosed()) return;
            this.socket.log("channel", `error ${this.topic}`, reason);
            this.state = (0, _constants.CHANNEL_STATES).errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive("timeout", ()=>{
            if (!this._isJoining()) return;
            this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
            this.state = (0, _constants.CHANNEL_STATES).errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this._on((0, _constants.CHANNEL_EVENTS).reply, {}, (payload, ref)=>{
            this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new (0, _realtimePresenceDefault.default)(this);
    }
    /** Subscribe registers your client with the server */ subscribe(callback, timeout = this.timeout) {
        var _a, _b;
        if (this.joinedOnce) throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
        else {
            const { config: { broadcast , presence  }  } = this.params;
            this._onError((e)=>callback && callback("CHANNEL_ERROR", e));
            this._onClose(()=>callback && callback("CLOSED"));
            const accessTokenPayload = {};
            const config = {
                broadcast,
                presence,
                postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r)=>r.filter)) !== null && _b !== void 0 ? _b : []
            };
            if (this.socket.accessToken) accessTokenPayload.access_token = this.socket.accessToken;
            this.updateJoinPayload(Object.assign({
                config
            }, accessTokenPayload));
            this.joinedOnce = true;
            this._rejoin(timeout);
            this.joinPush.receive("ok", ({ postgres_changes: serverPostgresFilters  })=>{
                var _a;
                this.socket.accessToken && this.socket.setAuth(this.socket.accessToken);
                if (serverPostgresFilters === undefined) {
                    callback && callback("SUBSCRIBED");
                    return;
                } else {
                    const clientPostgresBindings = this.bindings.postgres_changes;
                    const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
                    const newPostgresBindings = [];
                    for(let i = 0; i < bindingsLen; i++){
                        const clientPostgresBinding = clientPostgresBindings[i];
                        const { filter: { event , schema , table , filter  }  } = clientPostgresBinding;
                        const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i];
                        if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), {
                            id: serverPostgresFilter.id
                        }));
                        else {
                            this.unsubscribe();
                            callback && callback("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                            return;
                        }
                    }
                    this.bindings.postgres_changes = newPostgresBindings;
                    callback && callback("SUBSCRIBED");
                    return;
                }
            }).receive("error", (error)=>{
                callback && callback("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
                return;
            }).receive("timeout", ()=>{
                callback && callback("TIMED_OUT");
                return;
            });
        }
        return this;
    }
    presenceState() {
        return this.presence.state;
    }
    track(payload, opts = {}) {
        return __awaiter(this, void 0, void 0, function*() {
            return yield this.send({
                type: "presence",
                event: "track",
                payload
            }, opts.timeout || this.timeout);
        });
    }
    untrack(opts = {}) {
        return __awaiter(this, void 0, void 0, function*() {
            return yield this.send({
                type: "presence",
                event: "untrack"
            }, opts);
        });
    }
    on(type, filter, callback) {
        return this._on(type, filter, callback);
    }
    send(payload, opts = {}) {
        return new Promise((resolve)=>{
            var _a, _b, _c;
            const push = this._push(payload.type, payload, opts.timeout || this.timeout);
            if (push.rateLimited) resolve("rate limited");
            if (payload.type === "broadcast" && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) resolve("ok");
            push.receive("ok", ()=>resolve("ok"));
            push.receive("timeout", ()=>resolve("timed out"));
        });
    }
    updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
    }
    /**
     * Leaves the channel.
     *
     * Unsubscribes from server events, and instructs channel to terminate on server.
     * Triggers onClose() hooks.
     *
     * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
     * channel.unsubscribe().receive("ok", () => alert("left!") )
     */ unsubscribe(timeout = this.timeout) {
        this.state = (0, _constants.CHANNEL_STATES).leaving;
        const onClose = ()=>{
            this.socket.log("channel", `leave ${this.topic}`);
            this._trigger((0, _constants.CHANNEL_EVENTS).close, "leave", this._joinRef());
        };
        this.rejoinTimer.reset();
        // Destroy joinPush to avoid connection timeouts during unscription phase
        this.joinPush.destroy();
        return new Promise((resolve)=>{
            const leavePush = new (0, _pushDefault.default)(this, (0, _constants.CHANNEL_EVENTS).leave, {}, timeout);
            leavePush.receive("ok", ()=>{
                onClose();
                resolve("ok");
            }).receive("timeout", ()=>{
                onClose();
                resolve("timed out");
            }).receive("error", ()=>{
                resolve("error");
            });
            leavePush.send();
            if (!this._canPush()) leavePush.trigger("ok", {});
        });
    }
    /** @internal */ _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        let pushEvent = new (0, _pushDefault.default)(this, event, payload, timeout);
        if (this._canPush()) pushEvent.send();
        else {
            pushEvent.startTimeout();
            this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling before dispatching to the channel callbacks.
     * Must return the payload, modified or unmodified.
     *
     * @internal
     */ _onMessage(_event, payload, _ref) {
        return payload;
    }
    /** @internal */ _isMember(topic) {
        return this.topic === topic;
    }
    /** @internal */ _joinRef() {
        return this.joinPush.ref;
    }
    /** @internal */ _trigger(type, payload, ref) {
        var _a, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close , error , leave , join  } = (0, _constants.CHANNEL_EVENTS);
        const events = [
            close,
            error,
            leave,
            join
        ];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) return;
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) throw "channel onMessage callbacks must return the payload, modified or unmodified";
        if ([
            "insert",
            "update",
            "delete"
        ].includes(typeLower)) (_a = this.bindings.postgres_changes) === null || _a === void 0 || _a.filter((bind)=>{
            var _a, _b, _c;
            return ((_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event) === "*" || ((_c = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
        }).map((bind)=>bind.callback(handledPayload, ref));
        else (_b = this.bindings[typeLower]) === null || _b === void 0 || _b.filter((bind)=>{
            var _a, _b, _c, _d, _e, _f;
            if ([
                "broadcast",
                "presence",
                "postgres_changes"
            ].includes(typeLower)) {
                if ("id" in bind) {
                    const bindId = bind.id;
                    const bindEvent = (_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event;
                    return bindId && ((_b = payload.ids) === null || _b === void 0 ? void 0 : _b.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
                } else {
                    const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                    return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
                }
            } else return bind.type.toLocaleLowerCase() === typeLower;
        }).map((bind)=>{
            if (typeof handledPayload === "object" && "ids" in handledPayload) {
                const postgresChanges = handledPayload.data;
                const { schema , table , commit_timestamp , type , errors  } = postgresChanges;
                const enrichedPayload = {
                    schema: schema,
                    table: table,
                    commit_timestamp: commit_timestamp,
                    eventType: type,
                    new: {},
                    old: {},
                    errors: errors
                };
                handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
            }
            bind.callback(handledPayload, ref);
        });
    }
    /** @internal */ _isClosed() {
        return this.state === (0, _constants.CHANNEL_STATES).closed;
    }
    /** @internal */ _isJoined() {
        return this.state === (0, _constants.CHANNEL_STATES).joined;
    }
    /** @internal */ _isJoining() {
        return this.state === (0, _constants.CHANNEL_STATES).joining;
    }
    /** @internal */ _isLeaving() {
        return this.state === (0, _constants.CHANNEL_STATES).leaving;
    }
    /** @internal */ _replyEventName(ref) {
        return `chan_reply_${ref}`;
    }
    /** @internal */ _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
            type: typeLower,
            filter: filter,
            callback: callback
        };
        if (this.bindings[typeLower]) this.bindings[typeLower].push(binding);
        else this.bindings[typeLower] = [
            binding
        ];
        return this;
    }
    /** @internal */ _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        this.bindings[typeLower] = this.bindings[typeLower].filter((bind)=>{
            var _a;
            return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && RealtimeChannel.isEqual(bind.filter, filter));
        });
        return this;
    }
    /** @internal */ static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
        for(const k in obj1){
            if (obj1[k] !== obj2[k]) return false;
        }
        return true;
    }
    /** @internal */ _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) this._rejoin();
    }
    /**
     * Registers a callback that will be executed when the channel closes.
     *
     * @internal
     */ _onClose(callback) {
        this._on((0, _constants.CHANNEL_EVENTS).close, {}, callback);
    }
    /**
     * Registers a callback that will be executed when the channel encounteres an error.
     *
     * @internal
     */ _onError(callback) {
        this._on((0, _constants.CHANNEL_EVENTS).error, {}, (reason)=>callback(reason));
    }
    /**
     * Returns `true` if the socket is connected and the channel has been joined.
     *
     * @internal
     */ _canPush() {
        return this.socket.isConnected() && this._isJoined();
    }
    /** @internal */ _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) return;
        this.socket._leaveOpenTopic(this.topic);
        this.state = (0, _constants.CHANNEL_STATES).joining;
        this.joinPush.resend(timeout);
    }
    /** @internal */ _getPayloadRecords(payload) {
        const records = {
            new: {},
            old: {}
        };
        if (payload.type === "INSERT" || payload.type === "UPDATE") records.new = _transformers.convertChangeData(payload.columns, payload.record);
        if (payload.type === "UPDATE" || payload.type === "DELETE") records.old = _transformers.convertChangeData(payload.columns, payload.old_record);
        return records;
    }
}
exports.default = RealtimeChannel;

},{"./lib/constants":"jdaS4","./lib/push":"9YEgh","./lib/timer":"2kNsn","./RealtimePresence":"7hJI0","./lib/transformers":"iXNeD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9YEgh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../lib/constants");
class Push {
    /**
     * Initializes the Push
     *
     * @param channel The Channel
     * @param event The event, for example `"phx_join"`
     * @param payload The payload, for example `{user_id: 123}`
     * @param timeout The push timeout in milliseconds
     */ constructor(channel, event, payload = {}, timeout = (0, _constants.DEFAULT_TIMEOUT)){
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = undefined;
        this.ref = "";
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
        this.rateLimited = false;
    }
    resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = "";
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
    }
    send() {
        if (this._hasReceived("timeout")) return;
        this.startTimeout();
        this.sent = true;
        const status = this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload,
            ref: this.ref,
            join_ref: this.channel._joinRef()
        });
        if (status === "rate limited") this.rateLimited = true;
    }
    updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
    }
    receive(status, callback) {
        var _a;
        if (this._hasReceived(status)) callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
        this.recHooks.push({
            status,
            callback
        });
        return this;
    }
    startTimeout() {
        if (this.timeoutTimer) return;
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = (payload)=>{
            this._cancelRefEvent();
            this._cancelTimeout();
            this.receivedResp = payload;
            this._matchReceive(payload);
        };
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(()=>{
            this.trigger("timeout", {});
        }, this.timeout);
    }
    trigger(status, response) {
        if (this.refEvent) this.channel._trigger(this.refEvent, {
            status,
            response
        });
    }
    destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
    }
    _cancelRefEvent() {
        if (!this.refEvent) return;
        this.channel._off(this.refEvent, {});
    }
    _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = undefined;
    }
    _matchReceive({ status , response  }) {
        this.recHooks.filter((h)=>h.status === status).forEach((h)=>h.callback(response));
    }
    _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
    }
}
exports.default = Push;

},{"../lib/constants":"jdaS4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7hJI0":[function(require,module,exports) {
/*
  This file draws heavily from https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/assets/js/phoenix/presence.js
  License: https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/LICENSE.md
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "REALTIME_PRESENCE_LISTEN_EVENTS", ()=>REALTIME_PRESENCE_LISTEN_EVENTS);
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function(REALTIME_PRESENCE_LISTEN_EVENTS) {
    REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
    REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
    REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
class RealtimePresence {
    /**
     * Initializes the Presence.
     *
     * @param channel - The RealtimeChannel
     * @param opts - The options,
     *        for example `{events: {state: 'state', diff: 'diff'}}`
     */ constructor(channel, opts){
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.caller = {
            onJoin: ()=>{},
            onLeave: ()=>{},
            onSync: ()=>{}
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
            state: "presence_state",
            diff: "presence_diff"
        };
        this.channel._on(events.state, {}, (newState)=>{
            const { onJoin , onLeave , onSync  } = this.caller;
            this.joinRef = this.channel._joinRef();
            this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
            this.pendingDiffs.forEach((diff)=>{
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            });
            this.pendingDiffs = [];
            onSync();
        });
        this.channel._on(events.diff, {}, (diff)=>{
            const { onJoin , onLeave , onSync  } = this.caller;
            if (this.inPendingSyncState()) this.pendingDiffs.push(diff);
            else {
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
                onSync();
            }
        });
        this.onJoin((key, currentPresences, newPresences)=>{
            this.channel._trigger("presence", {
                event: "join",
                key,
                currentPresences,
                newPresences
            });
        });
        this.onLeave((key, currentPresences, leftPresences)=>{
            this.channel._trigger("presence", {
                event: "leave",
                key,
                currentPresences,
                leftPresences
            });
        });
        this.onSync(()=>{
            this.channel._trigger("presence", {
                event: "sync"
            });
        });
    }
    /**
     * Used to sync the list of presences on the server with the
     * client's state.
     *
     * An optional `onJoin` and `onLeave` callback can be provided to
     * react to changes in the client's local presences across
     * disconnects and reconnects with the server.
     *
     * @internal
     */ static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key, presences)=>{
            if (!transformedState[key]) leaves[key] = presences;
        });
        this.map(transformedState, (key, newPresences)=>{
            const currentPresences = state[key];
            if (currentPresences) {
                const newPresenceRefs = newPresences.map((m)=>m.presence_ref);
                const curPresenceRefs = currentPresences.map((m)=>m.presence_ref);
                const joinedPresences = newPresences.filter((m)=>curPresenceRefs.indexOf(m.presence_ref) < 0);
                const leftPresences = currentPresences.filter((m)=>newPresenceRefs.indexOf(m.presence_ref) < 0);
                if (joinedPresences.length > 0) joins[key] = joinedPresences;
                if (leftPresences.length > 0) leaves[key] = leftPresences;
            } else joins[key] = newPresences;
        });
        return this.syncDiff(state, {
            joins,
            leaves
        }, onJoin, onLeave);
    }
    /**
     * Used to sync a diff of presence join and leave events from the
     * server, as they happen.
     *
     * Like `syncState`, `syncDiff` accepts optional `onJoin` and
     * `onLeave` callbacks to react to a user joining or leaving from a
     * device.
     *
     * @internal
     */ static syncDiff(state, diff, onJoin, onLeave) {
        const { joins , leaves  } = {
            joins: this.transformState(diff.joins),
            leaves: this.transformState(diff.leaves)
        };
        if (!onJoin) onJoin = ()=>{};
        if (!onLeave) onLeave = ()=>{};
        this.map(joins, (key, newPresences)=>{
            var _a;
            const currentPresences = (_a = state[key]) !== null && _a !== void 0 ? _a : [];
            state[key] = this.cloneDeep(newPresences);
            if (currentPresences.length > 0) {
                const joinedPresenceRefs = state[key].map((m)=>m.presence_ref);
                const curPresences = currentPresences.filter((m)=>joinedPresenceRefs.indexOf(m.presence_ref) < 0);
                state[key].unshift(...curPresences);
            }
            onJoin(key, currentPresences, newPresences);
        });
        this.map(leaves, (key, leftPresences)=>{
            let currentPresences = state[key];
            if (!currentPresences) return;
            const presenceRefsToRemove = leftPresences.map((m)=>m.presence_ref);
            currentPresences = currentPresences.filter((m)=>presenceRefsToRemove.indexOf(m.presence_ref) < 0);
            state[key] = currentPresences;
            onLeave(key, currentPresences, leftPresences);
            if (currentPresences.length === 0) delete state[key];
        });
        return state;
    }
    /** @internal */ static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key)=>func(key, obj[key]));
    }
    /**
     * Remove 'metas' key
     * Change 'phx_ref' to 'presence_ref'
     * Remove 'phx_ref' and 'phx_ref_prev'
     *
     * @example
     * // returns {
     *  abc123: [
     *    { presence_ref: '2', user_id: 1 },
     *    { presence_ref: '3', user_id: 2 }
     *  ]
     * }
     * RealtimePresence.transformState({
     *  abc123: {
     *    metas: [
     *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
     *      { phx_ref: '3', user_id: 2 }
     *    ]
     *  }
     * })
     *
     * @internal
     */ static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key)=>{
            const presences = state[key];
            if ("metas" in presences) newState[key] = presences.metas.map((presence)=>{
                presence["presence_ref"] = presence["phx_ref"];
                delete presence["phx_ref"];
                delete presence["phx_ref_prev"];
                return presence;
            });
            else newState[key] = presences;
            return newState;
        }, {});
    }
    /** @internal */ static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    /** @internal */ onJoin(callback) {
        this.caller.onJoin = callback;
    }
    /** @internal */ onLeave(callback) {
        this.caller.onLeave = callback;
    }
    /** @internal */ onSync(callback) {
        this.caller.onSync = callback;
    }
    /** @internal */ inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
    }
}
exports.default = RealtimePresence;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iXNeD":[function(require,module,exports) {
/**
 * Helpers to convert the change Payload into native JS types.
 */ // Adapted from epgsql (src/epgsql_binary.erl), this module licensed under
// 3-clause BSD found here: https://raw.githubusercontent.com/epgsql/epgsql/devel/LICENSE
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PostgresTypes", ()=>PostgresTypes);
parcelHelpers.export(exports, "convertChangeData", ()=>convertChangeData);
parcelHelpers.export(exports, "convertColumn", ()=>convertColumn);
parcelHelpers.export(exports, "convertCell", ()=>convertCell);
parcelHelpers.export(exports, "toBoolean", ()=>toBoolean);
parcelHelpers.export(exports, "toNumber", ()=>toNumber);
parcelHelpers.export(exports, "toJson", ()=>toJson);
parcelHelpers.export(exports, "toArray", ()=>toArray);
parcelHelpers.export(exports, "toTimestampString", ()=>toTimestampString);
var PostgresTypes;
(function(PostgresTypes) {
    PostgresTypes["abstime"] = "abstime";
    PostgresTypes["bool"] = "bool";
    PostgresTypes["date"] = "date";
    PostgresTypes["daterange"] = "daterange";
    PostgresTypes["float4"] = "float4";
    PostgresTypes["float8"] = "float8";
    PostgresTypes["int2"] = "int2";
    PostgresTypes["int4"] = "int4";
    PostgresTypes["int4range"] = "int4range";
    PostgresTypes["int8"] = "int8";
    PostgresTypes["int8range"] = "int8range";
    PostgresTypes["json"] = "json";
    PostgresTypes["jsonb"] = "jsonb";
    PostgresTypes["money"] = "money";
    PostgresTypes["numeric"] = "numeric";
    PostgresTypes["oid"] = "oid";
    PostgresTypes["reltime"] = "reltime";
    PostgresTypes["text"] = "text";
    PostgresTypes["time"] = "time";
    PostgresTypes["timestamp"] = "timestamp";
    PostgresTypes["timestamptz"] = "timestamptz";
    PostgresTypes["timetz"] = "timetz";
    PostgresTypes["tsrange"] = "tsrange";
    PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
const convertChangeData = (columns, record, options = {})=>{
    var _a;
    const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
    return Object.keys(record).reduce((acc, rec_key)=>{
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
    }, {});
};
const convertColumn = (columnName, columns, record, skipTypes)=>{
    const column = columns.find((x)=>x.name === columnName);
    const colType = column === null || column === void 0 ? void 0 : column.type;
    const value = record[columnName];
    if (colType && !skipTypes.includes(colType)) return convertCell(colType, value);
    return noop(value);
};
const convertCell = (type, value)=>{
    // if data type is an array
    if (type.charAt(0) === "_") {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
    }
    // If not null, convert to correct type.
    switch(type){
        case PostgresTypes.bool:
            return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
            return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
            return toJson(value);
        case PostgresTypes.timestamp:
            return toTimestampString(value); // Format to be consistent with PostgREST
        case PostgresTypes.abstime:
        case PostgresTypes.date:
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime:
        case PostgresTypes.text:
        case PostgresTypes.time:
        case PostgresTypes.timestamptz:
        case PostgresTypes.timetz:
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
            return noop(value);
        default:
            // Return the value for remaining types
            return noop(value);
    }
};
const noop = (value)=>{
    return value;
};
const toBoolean = (value)=>{
    switch(value){
        case "t":
            return true;
        case "f":
            return false;
        default:
            return value;
    }
};
const toNumber = (value)=>{
    if (typeof value === "string") {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) return parsedValue;
    }
    return value;
};
const toJson = (value)=>{
    if (typeof value === "string") try {
        return JSON.parse(value);
    } catch (error) {
        console.log(`JSON parse error: ${error}`);
        return value;
    }
    return value;
};
const toArray = (value, type)=>{
    if (typeof value !== "string") return value;
    const lastIdx = value.length - 1;
    const closeBrace = value[lastIdx];
    const openBrace = value[0];
    // Confirm value is a Postgres array by checking curly brackets
    if (openBrace === "{" && closeBrace === "}") {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        // TODO: find a better solution to separate Postgres array data
        try {
            arr = JSON.parse("[" + valTrim + "]");
        } catch (_) {
            // WARNING: splitting on comma does not cover all edge cases
            arr = valTrim ? valTrim.split(",") : [];
        }
        return arr.map((val)=>convertCell(type, val));
    }
    return value;
};
const toTimestampString = (value)=>{
    if (typeof value === "string") return value.replace(" ", "T");
    return value;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8f7kf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StorageClient", ()=>(0, _storageClient.StorageClient));
var _storageClient = require("./StorageClient");
var _types = require("./lib/types");
parcelHelpers.exportAll(_types, exports);
var _errors = require("./lib/errors");
parcelHelpers.exportAll(_errors, exports);

},{"./StorageClient":"6gdt1","./lib/types":"gbNv2","./lib/errors":"4rF0F","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6gdt1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StorageClient", ()=>StorageClient);
var _storageFileApi = require("./packages/StorageFileApi");
var _storageFileApiDefault = parcelHelpers.interopDefault(_storageFileApi);
var _storageBucketApi = require("./packages/StorageBucketApi");
var _storageBucketApiDefault = parcelHelpers.interopDefault(_storageBucketApi);
class StorageClient extends (0, _storageBucketApiDefault.default) {
    constructor(url, headers = {}, fetch){
        super(url, headers, fetch);
    }
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */ from(id) {
        return new (0, _storageFileApiDefault.default)(this.url, this.headers, id, this.fetch);
    }
}

},{"./packages/StorageFileApi":"5ZKVd","./packages/StorageBucketApi":"caYeW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5ZKVd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _errors = require("../lib/errors");
var _fetch = require("../lib/fetch");
var _helpers = require("../lib/helpers");
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DEFAULT_SEARCH_OPTIONS = {
    limit: 100,
    offset: 0,
    sortBy: {
        column: "name",
        order: "asc"
    }
};
const DEFAULT_FILE_OPTIONS = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: false
};
class StorageFileApi {
    constructor(url, headers = {}, bucketId, fetch){
        this.url = url;
        this.headers = headers;
        this.bucketId = bucketId;
        this.fetch = (0, _helpers.resolveFetch)(fetch);
    }
    /**
     * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
     *
     * @param method HTTP method.
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */ uploadOrUpdate(method, path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                let body;
                const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
                const headers = Object.assign(Object.assign({}, this.headers), method === "POST" && {
                    "x-upsert": String(options.upsert)
                });
                if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append("cacheControl", options.cacheControl);
                    body.append("", fileBody);
                } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append("cacheControl", options.cacheControl);
                } else {
                    body = fileBody;
                    headers["cache-control"] = `max-age=${options.cacheControl}`;
                    headers["content-type"] = options.contentType;
                }
                const cleanPath = this._removeEmptyFolders(path);
                const _path = this._getFinalPath(cleanPath);
                const res = yield this.fetch(`${this.url}/object/${_path}`, Object.assign({
                    method,
                    body: body,
                    headers
                }, (options === null || options === void 0 ? void 0 : options.duplex) ? {
                    duplex: options.duplex
                } : {}));
                if (res.ok) return {
                    data: {
                        path: cleanPath
                    },
                    error: null
                };
                else {
                    const error = yield res.json();
                    return {
                        data: null,
                        error
                    };
                }
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Uploads a file to an existing bucket.
     *
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */ upload(path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
        });
    }
    /**
     * Upload a file with a token generated from `createSignedUploadUrl`.
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param token The token generated from `createSignedUploadUrl`
     * @param fileBody The body of the file to be stored in the bucket.
     */ uploadToSignedUrl(path, token, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const url = new URL(this.url + `/object/upload/sign/${_path}`);
            url.searchParams.set("token", token);
            try {
                let body;
                const options = Object.assign({
                    upsert: DEFAULT_FILE_OPTIONS.upsert
                }, fileOptions);
                const headers = Object.assign(Object.assign({}, this.headers), {
                    "x-upsert": String(options.upsert)
                });
                if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append("cacheControl", options.cacheControl);
                    body.append("", fileBody);
                } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append("cacheControl", options.cacheControl);
                } else {
                    body = fileBody;
                    headers["cache-control"] = `max-age=${options.cacheControl}`;
                    headers["content-type"] = options.contentType;
                }
                const res = yield this.fetch(url.toString(), {
                    method: "PUT",
                    body: body,
                    headers
                });
                if (res.ok) return {
                    data: {
                        path: cleanPath
                    },
                    error: null
                };
                else {
                    const error = yield res.json();
                    return {
                        data: null,
                        error
                    };
                }
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Creates a signed upload URL.
     * Signed upload URLs can be used to upload files to the bucket without further authentication.
     * They are valid for one minute.
     * @param path The file path, including the current file name. For example `folder/image.png`.
     */ createSignedUploadUrl(path) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                let _path = this._getFinalPath(path);
                const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, {
                    headers: this.headers
                });
                const url = new URL(this.url + data.url);
                const token = url.searchParams.get("token");
                if (!token) throw new (0, _errors.StorageError)("No token returned by API");
                return {
                    data: {
                        signedUrl: url.toString(),
                        path,
                        token
                    },
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Replaces an existing file at the specified path with a new one.
     *
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
     * @param fileBody The body of the file to be stored in the bucket.
     */ update(path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function*() {
            return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
        });
    }
    /**
     * Moves an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
     */ move(fromPath, toPath) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/move`, {
                    bucketId: this.bucketId,
                    sourceKey: fromPath,
                    destinationKey: toPath
                }, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Copies an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
     */ copy(fromPath, toPath) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/copy`, {
                    bucketId: this.bucketId,
                    sourceKey: fromPath,
                    destinationKey: toPath
                }, {
                    headers: this.headers
                });
                return {
                    data: {
                        path: data.Key
                    },
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */ createSignedUrl(path, expiresIn, options) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                let _path = this._getFinalPath(path);
                let data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({
                    expiresIn
                }, (options === null || options === void 0 ? void 0 : options.transform) ? {
                    transform: options.transform
                } : {}), {
                    headers: this.headers
                });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
                const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
                data = {
                    signedUrl
                };
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
     * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     */ createSignedUrls(paths, expiresIn, options) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/sign/${this.bucketId}`, {
                    expiresIn,
                    paths
                }, {
                    headers: this.headers
                });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
                return {
                    data: data.map((datum)=>Object.assign(Object.assign({}, datum), {
                            signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null
                        })),
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
     *
     * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
     * @param options.transform Transform the asset before serving it to the client.
     */ download(path, options) {
        return __awaiter(this, void 0, void 0, function*() {
            const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
            const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
            const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
            const queryString = transformationQuery ? `?${transformationQuery}` : "";
            try {
                const _path = this._getFinalPath(path);
                const res = yield (0, _fetch.get)(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
                    headers: this.headers,
                    noResolveJson: true
                });
                const data = yield res.blob();
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
     * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
     *
     * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
     * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */ getPublicUrl(path, options) {
        const _path = this._getFinalPath(path);
        const _queryString = [];
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `download=${options.download === true ? "" : options.download}` : "";
        if (downloadQueryParam !== "") _queryString.push(downloadQueryParam);
        const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
        const renderPath = wantsTransformation ? "render/image" : "object";
        const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
        if (transformationQuery !== "") _queryString.push(transformationQuery);
        let queryString = _queryString.join("&");
        if (queryString !== "") queryString = `?${queryString}`;
        return {
            data: {
                publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`)
            }
        };
    }
    /**
     * Deletes files within the same bucket
     *
     * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
     */ remove(paths) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.remove)(this.fetch, `${this.url}/object/${this.bucketId}`, {
                    prefixes: paths
                }, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Get file metadata
     * @param id the file id to retrieve metadata
     */ // async getMetadata(
    //   id: string
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Update file metadata
     * @param id the file id to update metadata
     * @param meta the new file metadata
     */ // async updateMetadata(
    //   id: string,
    //   meta: Metadata
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await post(
    //       this.fetch,
    //       `${this.url}/metadata/${id}`,
    //       { ...meta },
    //       { headers: this.headers }
    //     )
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Lists all the files within a bucket.
     * @param path The folder path.
     */ list(path, options, parameters) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), {
                    prefix: path || ""
                });
                const data = yield (0, _fetch.post)(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, {
                    headers: this.headers
                }, parameters);
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    _getFinalPath(path) {
        return `${this.bucketId}/${path}`;
    }
    _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
    }
    transformOptsToQueryString(transform) {
        const params = [];
        if (transform.width) params.push(`width=${transform.width}`);
        if (transform.height) params.push(`height=${transform.height}`);
        if (transform.resize) params.push(`resize=${transform.resize}`);
        if (transform.format) params.push(`format=${transform.format}`);
        if (transform.quality) params.push(`quality=${transform.quality}`);
        return params.join("&");
    }
}
exports.default = StorageFileApi;

},{"../lib/errors":"4rF0F","../lib/fetch":"ixSSW","../lib/helpers":"lqpHX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4rF0F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StorageError", ()=>StorageError);
parcelHelpers.export(exports, "isStorageError", ()=>isStorageError);
parcelHelpers.export(exports, "StorageApiError", ()=>StorageApiError);
parcelHelpers.export(exports, "StorageUnknownError", ()=>StorageUnknownError);
class StorageError extends Error {
    constructor(message){
        super(message);
        this.__isStorageError = true;
        this.name = "StorageError";
    }
}
function isStorageError(error) {
    return typeof error === "object" && error !== null && "__isStorageError" in error;
}
class StorageApiError extends StorageError {
    constructor(message, status){
        super(message);
        this.name = "StorageApiError";
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        };
    }
}
class StorageUnknownError extends StorageError {
    constructor(message, originalError){
        super(message);
        this.name = "StorageUnknownError";
        this.originalError = originalError;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ixSSW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "get", ()=>get);
parcelHelpers.export(exports, "post", ()=>post);
parcelHelpers.export(exports, "put", ()=>put);
parcelHelpers.export(exports, "remove", ()=>remove);
var _errors = require("./errors");
var _helpers = require("./helpers");
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _getErrorMessage = (err)=>err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject)=>__awaiter(void 0, void 0, void 0, function*() {
        const Res = yield (0, _helpers.resolveResponse)();
        if (error instanceof Res) error.json().then((err)=>{
            reject(new (0, _errors.StorageApiError)(_getErrorMessage(err), error.status || 500));
        }).catch((err)=>{
            reject(new (0, _errors.StorageUnknownError)(_getErrorMessage(err), err));
        });
        else reject(new (0, _errors.StorageUnknownError)(_getErrorMessage(error), error));
    });
const _getRequestParams = (method, options, parameters, body)=>{
    const params = {
        method,
        headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
    };
    if (method === "GET") return params;
    params.headers = Object.assign({
        "Content-Type": "application/json"
    }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest(fetcher, method, url, options, parameters, body) {
    return __awaiter(this, void 0, void 0, function*() {
        return new Promise((resolve, reject)=>{
            fetcher(url, _getRequestParams(method, options, parameters, body)).then((result)=>{
                if (!result.ok) throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
                return result.json();
            }).then((data)=>resolve(data)).catch((error)=>handleError(error, reject));
        });
    });
}
function get(fetcher, url, options, parameters) {
    return __awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, "GET", url, options, parameters);
    });
}
function post(fetcher, url, body, options, parameters) {
    return __awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, "POST", url, options, parameters, body);
    });
}
function put(fetcher, url, body, options, parameters) {
    return __awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, "PUT", url, options, parameters, body);
    });
}
function remove(fetcher, url, body, options, parameters) {
    return __awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, "DELETE", url, options, parameters, body);
    });
}

},{"./errors":"4rF0F","./helpers":"lqpHX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lqpHX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resolveFetch", ()=>resolveFetch);
parcelHelpers.export(exports, "resolveResponse", ()=>resolveResponse);
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resolveFetch = (customFetch)=>{
    let _fetch;
    if (customFetch) _fetch = customFetch;
    else if (typeof fetch === "undefined") _fetch = (...args)=>__awaiter(void 0, void 0, void 0, function*() {
            return yield (yield require("cf3c5fb32127c884")).fetch(...args);
        });
    else _fetch = fetch;
    return (...args)=>_fetch(...args);
};
const resolveResponse = ()=>__awaiter(void 0, void 0, void 0, function*() {
        if (typeof Response === "undefined") return (yield require("cf3c5fb32127c884")).Response;
        return Response;
    });

},{"cf3c5fb32127c884":"dQm8Z","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"caYeW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("../lib/constants");
var _errors = require("../lib/errors");
var _fetch = require("../lib/fetch");
var _helpers = require("../lib/helpers");
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class StorageBucketApi {
    constructor(url, headers = {}, fetch){
        this.url = url;
        this.headers = Object.assign(Object.assign({}, (0, _constants.DEFAULT_HEADERS)), headers);
        this.fetch = (0, _helpers.resolveFetch)(fetch);
    }
    /**
     * Retrieves the details of all Storage buckets within an existing project.
     */ listBuckets() {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.get)(this.fetch, `${this.url}/bucket`, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Retrieves the details of an existing Storage bucket.
     *
     * @param id The unique identifier of the bucket you would like to retrieve.
     */ getBucket(id) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.get)(this.fetch, `${this.url}/bucket/${id}`, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Creates a new Storage bucket
     *
     * @param id A unique identifier for the bucket you are creating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     * @returns newly created bucket id
     */ createBucket(id, options = {
        public: false
    }) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.post)(this.fetch, `${this.url}/bucket`, {
                    id,
                    name: id,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes
                }, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Updates a Storage bucket
     *
     * @param id A unique identifier for the bucket you are updating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     */ updateBucket(id, options) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.put)(this.fetch, `${this.url}/bucket/${id}`, {
                    id,
                    name: id,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes
                }, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Removes all objects inside a single bucket.
     *
     * @param id The unique identifier of the bucket you would like to empty.
     */ emptyBucket(id) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.post)(this.fetch, `${this.url}/bucket/${id}/empty`, {}, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
     * You must first `empty()` the bucket.
     *
     * @param id The unique identifier of the bucket you would like to delete.
     */ deleteBucket(id) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch.remove)(this.fetch, `${this.url}/bucket/${id}`, {}, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isStorageError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
}
exports.default = StorageBucketApi;

},{"../lib/constants":"3R5FU","../lib/errors":"4rF0F","../lib/fetch":"ixSSW","../lib/helpers":"lqpHX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3R5FU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_HEADERS", ()=>DEFAULT_HEADERS);
var _version = require("./version");
const DEFAULT_HEADERS = {
    "X-Client-Info": `storage-js/${(0, _version.version)}`
};

},{"./version":"fa2S0","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fa2S0":[function(require,module,exports) {
// generated by genversion
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "version", ()=>version);
const version = "2.5.1";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gbNv2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"17il3":[function(require,module,exports) {
// constants.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_HEADERS", ()=>DEFAULT_HEADERS);
var _version = require("./version");
const DEFAULT_HEADERS = {
    "X-Client-Info": `supabase-js/${(0, _version.version)}`
};

},{"./version":"kFF6c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kFF6c":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "version", ()=>version);
const version = "2.24.0";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8ZZRj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resolveFetch", ()=>resolveFetch);
parcelHelpers.export(exports, "resolveHeadersConstructor", ()=>resolveHeadersConstructor);
parcelHelpers.export(exports, "fetchWithAuth", ()=>fetchWithAuth);
var _crossFetch = require("cross-fetch");
var _crossFetchDefault = parcelHelpers.interopDefault(_crossFetch);
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resolveFetch = (customFetch)=>{
    let _fetch;
    if (customFetch) _fetch = customFetch;
    else if (typeof fetch === "undefined") _fetch = (0, _crossFetchDefault.default);
    else _fetch = fetch;
    return (...args)=>_fetch(...args);
};
const resolveHeadersConstructor = ()=>{
    if (typeof Headers === "undefined") return 0, _crossFetch.Headers;
    return Headers;
};
const fetchWithAuth = (supabaseKey, getAccessToken, customFetch)=>{
    const fetch1 = resolveFetch(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    return (input, init)=>__awaiter(void 0, void 0, void 0, function*() {
            var _a;
            const accessToken = (_a = yield getAccessToken()) !== null && _a !== void 0 ? _a : supabaseKey;
            let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
            if (!headers.has("apikey")) headers.set("apikey", supabaseKey);
            if (!headers.has("Authorization")) headers.set("Authorization", `Bearer ${accessToken}`);
            return fetch1(input, Object.assign(Object.assign({}, init), {
                headers
            }));
        });
};

},{"cross-fetch":"j4ah4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lD7E0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "uuid", ()=>uuid);
parcelHelpers.export(exports, "stripTrailingSlash", ()=>stripTrailingSlash);
parcelHelpers.export(exports, "isBrowser", ()=>isBrowser);
parcelHelpers.export(exports, "applySettingDefaults", ()=>applySettingDefaults);
function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
function stripTrailingSlash(url) {
    return url.replace(/\/$/, "");
}
const isBrowser = ()=>typeof window !== "undefined";
function applySettingDefaults(options, defaults) {
    const { db: dbOptions , auth: authOptions , realtime: realtimeOptions , global: globalOptions  } = options;
    const { db: DEFAULT_DB_OPTIONS , auth: DEFAULT_AUTH_OPTIONS , realtime: DEFAULT_REALTIME_OPTIONS , global: DEFAULT_GLOBAL_OPTIONS  } = defaults;
    return {
        db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS), dbOptions),
        auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), authOptions),
        realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS), realtimeOptions),
        global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS), globalOptions)
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bmkFW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SupabaseAuthClient", ()=>SupabaseAuthClient);
var _gotrueJs = require("@supabase/gotrue-js");
class SupabaseAuthClient extends (0, _gotrueJs.GoTrueClient) {
    constructor(options){
        super(options);
    }
}

},{"@supabase/gotrue-js":"26DbQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"26DbQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GoTrueAdminApi", ()=>(0, _goTrueAdminApiDefault.default));
parcelHelpers.export(exports, "GoTrueClient", ()=>(0, _goTrueClientDefault.default));
var _goTrueAdminApi = require("./GoTrueAdminApi");
var _goTrueAdminApiDefault = parcelHelpers.interopDefault(_goTrueAdminApi);
var _goTrueClient = require("./GoTrueClient");
var _goTrueClientDefault = parcelHelpers.interopDefault(_goTrueClient);
var _types = require("./lib/types");
parcelHelpers.exportAll(_types, exports);
var _errors = require("./lib/errors");
parcelHelpers.exportAll(_errors, exports);

},{"./GoTrueAdminApi":"baL5s","./GoTrueClient":"26r9B","./lib/types":"32h29","./lib/errors":"bDFnv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"baL5s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _fetch = require("./lib/fetch");
var _helpers = require("./lib/helpers");
var _errors = require("./lib/errors");
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
class GoTrueAdminApi {
    constructor({ url ="" , headers ={} , fetch  }){
        this.url = url;
        this.headers = headers;
        this.fetch = (0, _helpers.resolveFetch)(fetch);
        this.mfa = {
            listFactors: this._listFactors.bind(this),
            deleteFactor: this._deleteFactor.bind(this)
        };
    }
    /**
     * Removes a logged-in session.
     * @param jwt A valid, logged-in JWT.
     */ signOut(jwt) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/logout`, {
                    headers: this.headers,
                    jwt,
                    noResolveJson: true
                });
                return {
                    data: null,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Sends an invite link to an email address.
     * @param email The email address of the user.
     * @param options Additional options to be included when inviting.
     */ inviteUserByEmail(email, options = {}) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                return yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/invite`, {
                    body: {
                        email,
                        data: options.data
                    },
                    headers: this.headers,
                    redirectTo: options.redirectTo,
                    xform: (0, _fetch._userResponse)
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Generates email links and OTPs to be sent via a custom email provider.
     * @param email The user's email.
     * @param options.password User password. For signup only.
     * @param options.data Optional user metadata. For signup only.
     * @param options.redirectTo The redirect url which should be appended to the generated link
     */ generateLink(params) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { options  } = params, rest = __rest(params, [
                    "options"
                ]);
                const body = Object.assign(Object.assign({}, rest), options);
                if ("newEmail" in rest) {
                    // replace newEmail with new_email in request body
                    body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
                    delete body["newEmail"];
                }
                return yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/admin/generate_link`, {
                    body: body,
                    headers: this.headers,
                    xform: (0, _fetch._generateLinkResponse),
                    redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        properties: null,
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    // User Admin API
    /**
     * Creates a new user.
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */ createUser(attributes) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                return yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/admin/users`, {
                    body: attributes,
                    headers: this.headers,
                    xform: (0, _fetch._userResponse)
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Get a list of users.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
     */ listUsers(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const pagination = {
                    nextPage: null,
                    lastPage: 0,
                    total: 0
                };
                const response = yield (0, _fetch._request)(this.fetch, "GET", `${this.url}/admin/users`, {
                    headers: this.headers,
                    noResolveJson: true,
                    query: {
                        page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
                        per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
                    },
                    xform: (0, _fetch._noResolveJsonResponse)
                });
                if (response.error) throw response.error;
                const users = yield response.json();
                const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
                const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
                if (links.length > 0) {
                    links.forEach((link)=>{
                        const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
                        const rel = JSON.parse(link.split(";")[1].split("=")[1]);
                        pagination[`${rel}Page`] = page;
                    });
                    pagination.total = parseInt(total);
                }
                return {
                    data: Object.assign(Object.assign({}, users), pagination),
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        users: []
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Get user by id.
     *
     * @param uid The user's unique identifier
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */ getUserById(uid) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                return yield (0, _fetch._request)(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
                    headers: this.headers,
                    xform: (0, _fetch._userResponse)
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Updates the user data.
     *
     * @param attributes The data you want to update.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */ updateUserById(uid, attributes) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                return yield (0, _fetch._request)(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
                    body: attributes,
                    headers: this.headers,
                    xform: (0, _fetch._userResponse)
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Delete a user. Requires a `service_role` key.
     *
     * @param id The user id you want to remove.
     * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema.
     * Defaults to false for backward compatibility.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */ deleteUser(id, shouldSoftDelete = false) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                return yield (0, _fetch._request)(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
                    headers: this.headers,
                    body: {
                        should_soft_delete: shouldSoftDelete
                    },
                    xform: (0, _fetch._userResponse)
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    _listFactors(params) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { data , error  } = yield (0, _fetch._request)(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
                    headers: this.headers,
                    xform: (factors)=>{
                        return {
                            data: {
                                factors
                            },
                            error: null
                        };
                    }
                });
                return {
                    data,
                    error
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    _deleteFactor(params) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield (0, _fetch._request)(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
}
exports.default = GoTrueAdminApi;

},{"./lib/fetch":"4qm8y","./lib/helpers":"eALwT","./lib/errors":"bDFnv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4qm8y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_request", ()=>_request);
parcelHelpers.export(exports, "_sessionResponse", ()=>_sessionResponse);
parcelHelpers.export(exports, "_userResponse", ()=>_userResponse);
parcelHelpers.export(exports, "_ssoResponse", ()=>_ssoResponse);
parcelHelpers.export(exports, "_generateLinkResponse", ()=>_generateLinkResponse);
parcelHelpers.export(exports, "_noResolveJsonResponse", ()=>_noResolveJsonResponse);
var _helpers = require("./helpers");
var _errors = require("./errors");
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
const _getErrorMessage = (err)=>err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject)=>__awaiter(void 0, void 0, void 0, function*() {
        const NETWORK_ERROR_CODES = [
            502,
            503,
            504
        ];
        if (!(0, _helpers.looksLikeFetchResponse)(error)) reject(new (0, _errors.AuthRetryableFetchError)(_getErrorMessage(error), 0));
        else if (NETWORK_ERROR_CODES.includes(error.status)) // status in 500...599 range - server had an error, request might be retryed.
        reject(new (0, _errors.AuthRetryableFetchError)(_getErrorMessage(error), error.status));
        else // got a response from server that is not in the 500...599 range - should not retry
        error.json().then((err)=>{
            reject(new (0, _errors.AuthApiError)(_getErrorMessage(err), error.status || 500));
        }).catch((e)=>{
            // not a valid json response
            reject(new (0, _errors.AuthUnknownError)(_getErrorMessage(e), e));
        });
    });
const _getRequestParams = (method, options, parameters, body)=>{
    const params = {
        method,
        headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
    };
    if (method === "GET") return params;
    params.headers = Object.assign({
        "Content-Type": "application/json;charset=UTF-8"
    }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
};
function _request(fetcher, method, url, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function*() {
        const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
        if (options === null || options === void 0 ? void 0 : options.jwt) headers["Authorization"] = `Bearer ${options.jwt}`;
        const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
        if (options === null || options === void 0 ? void 0 : options.redirectTo) qs["redirect_to"] = options.redirectTo;
        const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
        const data = yield _handleRequest(fetcher, method, url + queryString, {
            headers,
            noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson
        }, {}, options === null || options === void 0 ? void 0 : options.body);
        return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : {
            data: Object.assign({}, data),
            error: null
        };
    });
}
function _handleRequest(fetcher, method, url, options, parameters, body) {
    return __awaiter(this, void 0, void 0, function*() {
        return new Promise((resolve, reject)=>{
            fetcher(url, _getRequestParams(method, options, parameters, body)).then((result)=>{
                if (!result.ok) throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
                return result.json();
            }).then((data)=>resolve(data)).catch((error)=>handleError(error, reject));
        });
    });
}
function _sessionResponse(data) {
    var _a;
    let session = null;
    if (hasSession(data)) {
        session = Object.assign({}, data);
        session.expires_at = (0, _helpers.expiresAt)(data.expires_in);
    }
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return {
        data: {
            session,
            user
        },
        error: null
    };
}
function _userResponse(data) {
    var _a;
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return {
        data: {
            user
        },
        error: null
    };
}
function _ssoResponse(data) {
    return {
        data,
        error: null
    };
}
function _generateLinkResponse(data) {
    const { action_link , email_otp , hashed_token , redirect_to , verification_type  } = data, rest = __rest(data, [
        "action_link",
        "email_otp",
        "hashed_token",
        "redirect_to",
        "verification_type"
    ]);
    const properties = {
        action_link,
        email_otp,
        hashed_token,
        redirect_to,
        verification_type
    };
    const user = Object.assign({}, rest);
    return {
        data: {
            properties,
            user
        },
        error: null
    };
}
function _noResolveJsonResponse(data) {
    return data;
}
/**
 * hasSession checks if the response object contains a valid session
 * @param data A response object
 * @returns true if a session is in the response
 */ function hasSession(data) {
    return data.access_token && data.refresh_token && data.expires_in;
}

},{"./helpers":"eALwT","./errors":"bDFnv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eALwT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "expiresAt", ()=>expiresAt);
parcelHelpers.export(exports, "uuid", ()=>uuid);
parcelHelpers.export(exports, "isBrowser", ()=>isBrowser);
parcelHelpers.export(exports, "supportsLocalStorage", ()=>supportsLocalStorage);
parcelHelpers.export(exports, "getParameterByName", ()=>getParameterByName);
parcelHelpers.export(exports, "resolveFetch", ()=>resolveFetch);
parcelHelpers.export(exports, "looksLikeFetchResponse", ()=>looksLikeFetchResponse);
parcelHelpers.export(exports, "setItemAsync", ()=>setItemAsync);
parcelHelpers.export(exports, "getItemAsync", ()=>getItemAsync);
parcelHelpers.export(exports, "removeItemAsync", ()=>removeItemAsync);
parcelHelpers.export(exports, "decodeBase64URL", ()=>decodeBase64URL);
/**
 * A deferred represents some asynchronous work that is not yet finished, which
 * may or may not culminate in a value.
 * Taken from: https://github.com/mike-north/types/blob/master/src/async.ts
 */ parcelHelpers.export(exports, "Deferred", ()=>Deferred);
// Taken from: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
parcelHelpers.export(exports, "decodeJWTPayload", ()=>decodeJWTPayload);
/**
 * Creates a promise that resolves to null after some time.
 */ parcelHelpers.export(exports, "sleep", ()=>sleep);
/**
 * Converts the provided async function into a retryable function. Each result
 * or thrown error is sent to the isRetryable function which should return true
 * if the function should run again.
 */ parcelHelpers.export(exports, "retryable", ()=>retryable);
// Functions below taken from: https://stackoverflow.com/questions/63309409/creating-a-code-verifier-and-challenge-for-pkce-auth-on-spotify-api-in-reactjs
parcelHelpers.export(exports, "generatePKCEVerifier", ()=>generatePKCEVerifier);
parcelHelpers.export(exports, "generatePKCEChallenge", ()=>generatePKCEChallenge);
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1000);
    return timeNow + expiresIn;
}
function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
const isBrowser = ()=>typeof document !== "undefined";
const localStorageWriteTests = {
    tested: false,
    writable: false
};
const supportsLocalStorage = ()=>{
    if (!isBrowser()) return false;
    try {
        if (typeof globalThis.localStorage !== "object") return false;
    } catch (e) {
        // DOM exception when accessing `localStorage`
        return false;
    }
    if (localStorageWriteTests.tested) return localStorageWriteTests.writable;
    const randomKey = `lswt-${Math.random()}${Math.random()}`;
    try {
        globalThis.localStorage.setItem(randomKey, randomKey);
        globalThis.localStorage.removeItem(randomKey);
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = true;
    } catch (e) {
        // localStorage can't be written to
        // https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = false;
    }
    return localStorageWriteTests.writable;
};
function getParameterByName(name, url) {
    var _a;
    if (!url) url = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || "";
    // eslint-disable-next-line no-useless-escape
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const resolveFetch = (customFetch)=>{
    let _fetch;
    if (customFetch) _fetch = customFetch;
    else if (typeof fetch === "undefined") _fetch = (...args)=>__awaiter(void 0, void 0, void 0, function*() {
            return yield (yield require("89d5d76f9ebf3f7a")).fetch(...args);
        });
    else _fetch = fetch;
    return (...args)=>_fetch(...args);
};
const looksLikeFetchResponse = (maybeResponse)=>{
    return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
};
const setItemAsync = (storage, key, data)=>__awaiter(void 0, void 0, void 0, function*() {
        yield storage.setItem(key, JSON.stringify(data));
    });
const getItemAsync = (storage, key)=>__awaiter(void 0, void 0, void 0, function*() {
        const value = yield storage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch (_a) {
            return value;
        }
    });
const removeItemAsync = (storage, key)=>__awaiter(void 0, void 0, void 0, function*() {
        yield storage.removeItem(key);
    });
function decodeBase64URL(value) {
    const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let base64 = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    value = value.replace("-", "+").replace("_", "/");
    while(i < value.length){
        enc1 = key.indexOf(value.charAt(i++));
        enc2 = key.indexOf(value.charAt(i++));
        enc3 = key.indexOf(value.charAt(i++));
        enc4 = key.indexOf(value.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        base64 = base64 + String.fromCharCode(chr1);
        if (enc3 != 64 && chr2 != 0) base64 = base64 + String.fromCharCode(chr2);
        if (enc4 != 64 && chr3 != 0) base64 = base64 + String.fromCharCode(chr3);
    }
    return base64;
}
class Deferred {
    constructor(){
        this.promise = new Deferred.promiseConstructor((res, rej)=>{
            this.resolve = res;
            this.reject = rej;
        });
    }
}
Deferred.promiseConstructor = Promise;
function decodeJWTPayload(token) {
    // Regex checks for base64url format
    const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("JWT is not valid: not a JWT structure");
    if (!base64UrlRegex.test(parts[1])) throw new Error("JWT is not valid: payload is not in base64url format");
    const base64Url = parts[1];
    return JSON.parse(decodeBase64URL(base64Url));
}
function sleep(time) {
    return new Promise((accept)=>{
        setTimeout(()=>accept(null), time);
    });
}
function retryable(fn, isRetryable) {
    const promise = new Promise((accept, reject)=>{
        (()=>__awaiter(this, void 0, void 0, function*() {
                for(let attempt = 0; attempt < Infinity; attempt++)try {
                    const result = yield fn(attempt);
                    if (!isRetryable(attempt, null, result)) {
                        accept(result);
                        return;
                    }
                } catch (e) {
                    if (!isRetryable(attempt, e)) {
                        reject(e);
                        return;
                    }
                }
            }))();
    });
    return promise;
}
function dec2hex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
}
function generatePKCEVerifier() {
    const verifierLength = 56;
    const array = new Uint32Array(verifierLength);
    if (typeof crypto === "undefined") {
        const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
        const charSetLen = charSet.length;
        let verifier = "";
        for(let i = 0; i < verifierLength; i++)verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
        return verifier;
    }
    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
}
function sha256(randomString) {
    return __awaiter(this, void 0, void 0, function*() {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(randomString);
        const hash = yield crypto.subtle.digest("SHA-256", encodedData);
        const bytes = new Uint8Array(hash);
        return Array.from(bytes).map((c)=>String.fromCharCode(c)).join("");
    });
}
function base64urlencode(str) {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function generatePKCEChallenge(verifier) {
    return __awaiter(this, void 0, void 0, function*() {
        if (typeof crypto === "undefined") {
            console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
            return verifier;
        }
        const hashed = yield sha256(verifier);
        return base64urlencode(hashed);
    });
}

},{"89d5d76f9ebf3f7a":"dQm8Z","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bDFnv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AuthError", ()=>AuthError);
parcelHelpers.export(exports, "isAuthError", ()=>isAuthError);
parcelHelpers.export(exports, "AuthApiError", ()=>AuthApiError);
parcelHelpers.export(exports, "isAuthApiError", ()=>isAuthApiError);
parcelHelpers.export(exports, "AuthUnknownError", ()=>AuthUnknownError);
parcelHelpers.export(exports, "CustomAuthError", ()=>CustomAuthError);
parcelHelpers.export(exports, "AuthSessionMissingError", ()=>AuthSessionMissingError);
parcelHelpers.export(exports, "AuthInvalidCredentialsError", ()=>AuthInvalidCredentialsError);
parcelHelpers.export(exports, "AuthImplicitGrantRedirectError", ()=>AuthImplicitGrantRedirectError);
parcelHelpers.export(exports, "AuthPKCEGrantCodeExchangeError", ()=>AuthPKCEGrantCodeExchangeError);
parcelHelpers.export(exports, "AuthRetryableFetchError", ()=>AuthRetryableFetchError);
class AuthError extends Error {
    constructor(message, status){
        super(message);
        this.__isAuthError = true;
        this.name = "AuthError";
        this.status = status;
    }
}
function isAuthError(error) {
    return typeof error === "object" && error !== null && "__isAuthError" in error;
}
class AuthApiError extends AuthError {
    constructor(message, status){
        super(message, status);
        this.name = "AuthApiError";
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        };
    }
}
function isAuthApiError(error) {
    return isAuthError(error) && error.name === "AuthApiError";
}
class AuthUnknownError extends AuthError {
    constructor(message, originalError){
        super(message);
        this.name = "AuthUnknownError";
        this.originalError = originalError;
    }
}
class CustomAuthError extends AuthError {
    constructor(message, name, status){
        super(message);
        this.name = name;
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        };
    }
}
class AuthSessionMissingError extends CustomAuthError {
    constructor(){
        super("Auth session missing!", "AuthSessionMissingError", 400);
    }
}
class AuthInvalidCredentialsError extends CustomAuthError {
    constructor(message){
        super(message, "AuthInvalidCredentialsError", 400);
    }
}
class AuthImplicitGrantRedirectError extends CustomAuthError {
    constructor(message, details = null){
        super(message, "AuthImplicitGrantRedirectError", 500);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details
        };
    }
}
class AuthPKCEGrantCodeExchangeError extends CustomAuthError {
    constructor(message, details = null){
        super(message, "AuthPKCEGrantCodeExchangeError", 500);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details
        };
    }
}
class AuthRetryableFetchError extends CustomAuthError {
    constructor(message, status){
        super(message, "AuthRetryableFetchError", status);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"26r9B":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _goTrueAdminApi = require("./GoTrueAdminApi");
var _goTrueAdminApiDefault = parcelHelpers.interopDefault(_goTrueAdminApi);
var _constants = require("./lib/constants");
var _errors = require("./lib/errors");
var _fetch = require("./lib/fetch");
var _helpers = require("./lib/helpers");
var _localStorage = require("./lib/local-storage");
var _localStorageDefault = parcelHelpers.interopDefault(_localStorage);
var _polyfills = require("./lib/polyfills");
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(0, _polyfills.polyfillGlobalThis)(); // Make "globalThis" available
const DEFAULT_OPTIONS = {
    url: (0, _constants.GOTRUE_URL),
    storageKey: (0, _constants.STORAGE_KEY),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    headers: (0, _constants.DEFAULT_HEADERS),
    flowType: "implicit"
};
/** Current session will be checked for refresh at this interval. */ const AUTO_REFRESH_TICK_DURATION = 30000;
/**
 * A token refresh will be attempted this many ticks before the current session expires. */ const AUTO_REFRESH_TICK_THRESHOLD = 3;
class GoTrueClient {
    /**
     * Create a new client for use in the browser.
     */ constructor(options){
        var _a;
        this.stateChangeEmitters = new Map();
        this.autoRefreshTicker = null;
        this.visibilityChangedCallback = null;
        this.refreshingDeferred = null;
        /**
         * Keeps track of the async client initialization.
         * When null or not yet resolved the auth state is `unknown`
         * Once resolved the the auth state is known and it's save to call any further client methods.
         * Keep extra care to never reject or throw uncaught errors
         */ this.initializePromise = null;
        this.detectSessionInUrl = true;
        /**
         * Used to broadcast state change events to other tabs listening.
         */ this.broadcastChannel = null;
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.inMemorySession = null;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.persistSession = settings.persistSession;
        this.storage = settings.storage || (0, _localStorageDefault.default);
        this.admin = new (0, _goTrueAdminApiDefault.default)({
            url: settings.url,
            headers: settings.headers,
            fetch: settings.fetch
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = (0, _helpers.resolveFetch)(settings.fetch);
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.flowType = settings.flowType;
        this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
        };
        if ((0, _helpers.isBrowser)() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
                this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            } catch (e) {
                console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
            }
            (_a = this.broadcastChannel) === null || _a === void 0 || _a.addEventListener("message", (event)=>{
                this._notifyAllSubscribers(event.data.event, event.data.session, false); // broadcast = false so we don't get an endless loop of messages
            });
        }
        this.initialize();
    }
    /**
     * Initializes the client session either from the url or from storage.
     * This method is automatically called when instantiating the client, but should also be called
     * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
     */ initialize() {
        if (!this.initializePromise) this.initializePromise = this._initialize();
        return this.initializePromise;
    }
    /**
     * IMPORTANT:
     * 1. Never throw in this method, as it is called from the constructor
     * 2. Never return a session from this method as it would be cached over
     *    the whole lifetime of the client
     */ _initialize() {
        return __awaiter(this, void 0, void 0, function*() {
            if (this.initializePromise) return this.initializePromise;
            try {
                const isPKCEFlow = yield this._isPKCEFlow();
                if (this.detectSessionInUrl && this._isImplicitGrantFlow() || isPKCEFlow) {
                    const { data , error  } = yield this._getSessionFromUrl(isPKCEFlow);
                    if (error) {
                        // failed login attempt via url,
                        // remove old session as in verifyOtp, signUp and signInWith*
                        yield this._removeSession();
                        return {
                            error
                        };
                    }
                    const { session , redirectType  } = data;
                    yield this._saveSession(session);
                    setTimeout(()=>{
                        if (redirectType === "recovery") this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
                        else this._notifyAllSubscribers("SIGNED_IN", session);
                    }, 0);
                    return {
                        error: null
                    };
                }
                // no login attempt via callback url try to recover session from storage
                yield this._recoverAndRefresh();
                return {
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    error
                };
                return {
                    error: new (0, _errors.AuthUnknownError)("Unexpected error during initialization", error)
                };
            } finally{
                yield this._handleVisibilityChange();
            }
        });
    }
    /**
     * Creates a new user.
     *
     * Be aware that if a user account exists in the system you may get back an
     * error message that attempts to hide this information from the user.
     * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
     *
     * @returns A logged-in session if the server has "autoconfirm" ON
     * @returns A user if the server has "autoconfirm" OFF
     */ signUp(credentials) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                let res;
                if ("email" in credentials) {
                    const { email , password , options  } = credentials;
                    let codeChallenge = null;
                    let codeChallengeMethod = null;
                    if (this.flowType === "pkce") {
                        const codeVerifier = (0, _helpers.generatePKCEVerifier)();
                        yield (0, _helpers.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                        codeChallenge = yield (0, _helpers.generatePKCEChallenge)(codeVerifier);
                        codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
                    }
                    res = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/signup`, {
                        headers: this.headers,
                        redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                        body: {
                            email,
                            password,
                            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            },
                            code_challenge: codeChallenge,
                            code_challenge_method: codeChallengeMethod
                        },
                        xform: (0, _fetch._sessionResponse)
                    });
                } else if ("phone" in credentials) {
                    const { phone , password , options  } = credentials;
                    res = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/signup`, {
                        headers: this.headers,
                        body: {
                            phone,
                            password,
                            data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
                            channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : "sms",
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        },
                        xform: (0, _fetch._sessionResponse)
                    });
                } else throw new (0, _errors.AuthInvalidCredentialsError)("You must provide either an email or phone number and a password");
                const { data , error  } = res;
                if (error || !data) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error: error
                };
                const session = data.session;
                const user = data.user;
                if (data.session) {
                    yield this._saveSession(data.session);
                    this._notifyAllSubscribers("SIGNED_IN", session);
                }
                return {
                    data: {
                        user,
                        session
                    },
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Log in an existing user with an email and password or phone and password.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or that the
     * email/phone and password combination is wrong or that the account can only
     * be accessed via social login.
     */ signInWithPassword(credentials) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                let res;
                if ("email" in credentials) {
                    const { email , password , options  } = credentials;
                    res = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            email,
                            password,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        },
                        xform: (0, _fetch._sessionResponse)
                    });
                } else if ("phone" in credentials) {
                    const { phone , password , options  } = credentials;
                    res = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            phone,
                            password,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        },
                        xform: (0, _fetch._sessionResponse)
                    });
                } else throw new (0, _errors.AuthInvalidCredentialsError)("You must provide either an email or phone number and a password");
                const { data , error  } = res;
                if (error || !data) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                if (data.session) {
                    yield this._saveSession(data.session);
                    this._notifyAllSubscribers("SIGNED_IN", data.session);
                }
                return {
                    data,
                    error
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Log in an existing user via a third-party provider.
     * This method supports the PKCE flow.
     */ signInWithOAuth(credentials) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function*() {
            yield this._removeSession();
            return yield this._handleProviderSignIn(credentials.provider, {
                redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
                scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
                queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
                skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
            });
        });
    }
    /**
     * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
     */ exchangeCodeForSession(authCode) {
        return __awaiter(this, void 0, void 0, function*() {
            const codeVerifier = yield (0, _helpers.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            const { data , error  } = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
                headers: this.headers,
                body: {
                    auth_code: authCode,
                    code_verifier: codeVerifier
                },
                xform: (0, _fetch._sessionResponse)
            });
            yield (0, _helpers.removeItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            if (error || !data) return {
                data: {
                    user: null,
                    session: null
                },
                error
            };
            if (data.session) {
                yield this._saveSession(data.session);
                this._notifyAllSubscribers("SIGNED_IN", data.session);
            }
            return {
                data,
                error
            };
        });
    }
    /**
     * Allows signing in with an ID token issued by certain supported providers.
     * The ID token is verified for validity and a new session is established.
     *
     * @experimental
     */ signInWithIdToken(credentials) {
        return __awaiter(this, void 0, void 0, function*() {
            yield this._removeSession();
            try {
                const { options , provider , token , nonce  } = credentials;
                const res = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
                    headers: this.headers,
                    body: {
                        provider,
                        id_token: token,
                        nonce,
                        gotrue_meta_security: {
                            captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                        }
                    },
                    xform: (0, _fetch._sessionResponse)
                });
                const { data , error  } = res;
                if (error || !data) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                if (data.session) {
                    yield this._saveSession(data.session);
                    this._notifyAllSubscribers("SIGNED_IN", data.session);
                }
                return {
                    data,
                    error
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Log in a user using magiclink or a one-time password (OTP).
     *
     * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
     * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
     * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or, that the account
     * can only be accessed via social login.
     *
     * Do note that you will need to configure a Whatsapp sender on Twilio
     * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
     * channel is not supported on other providers
     * at this time.
     * This method supports PKCE when an email is passed.
     */ signInWithOtp(credentials) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                if ("email" in credentials) {
                    const { email , options  } = credentials;
                    let codeChallenge = null;
                    let codeChallengeMethod = null;
                    if (this.flowType === "pkce") {
                        const codeVerifier = (0, _helpers.generatePKCEVerifier)();
                        yield (0, _helpers.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                        codeChallenge = yield (0, _helpers.generatePKCEChallenge)(codeVerifier);
                        codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
                    }
                    const { error  } = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            email,
                            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                            create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            },
                            code_challenge: codeChallenge,
                            code_challenge_method: codeChallengeMethod
                        },
                        redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                if ("phone" in credentials) {
                    const { phone , options  } = credentials;
                    const { error  } = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            phone,
                            data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
                            create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            },
                            channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : "sms"
                        }
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw new (0, _errors.AuthInvalidCredentialsError)("You must provide either an email or phone number.");
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Log in a user given a User supplied OTP received via mobile.
     */ verifyOtp(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                const { data , error  } = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/verify`, {
                    headers: this.headers,
                    body: Object.assign(Object.assign({}, params), {
                        gotrue_meta_security: {
                            captcha_token: (_a = params.options) === null || _a === void 0 ? void 0 : _a.captchaToken
                        }
                    }),
                    redirectTo: (_b = params.options) === null || _b === void 0 ? void 0 : _b.redirectTo,
                    xform: (0, _fetch._sessionResponse)
                });
                if (error) throw error;
                if (!data) throw new Error("An error occurred on token verification.");
                const session = data.session;
                const user = data.user;
                if (session === null || session === void 0 ? void 0 : session.access_token) {
                    yield this._saveSession(session);
                    this._notifyAllSubscribers("SIGNED_IN", session);
                }
                return {
                    data: {
                        user,
                        session
                    },
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Attempts a single-sign on using an enterprise Identity Provider. A
     * successful SSO attempt will redirect the current page to the identity
     * provider authorization page. The redirect URL is implementation and SSO
     * protocol specific.
     *
     * You can use it by providing a SSO domain. Typically you can extract this
     * domain by asking users for their email address. If this domain is
     * registered on the Auth instance the redirect will use that organization's
     * currently active SSO Identity Provider for the login.
     *
     * If you have built an organization-specific login page, you can use the
     * organization's SSO Identity Provider UUID directly instead.
     */ signInWithSSO(params) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                return yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/sso`, {
                    body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? {
                        provider_id: params.providerId
                    } : null), "domain" in params ? {
                        domain: params.domain
                    } : null), {
                        redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : undefined
                    }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? {
                        gotrue_meta_security: {
                            captcha_token: params.options.captchaToken
                        }
                    } : null), {
                        skip_http_redirect: true
                    }),
                    headers: this.headers,
                    xform: (0, _fetch._ssoResponse)
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Sends a reauthentication OTP to the user's email or phone number.
     * Requires the user to be signed-in.
     */ reauthenticate() {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { data: { session  } , error: sessionError  } = yield this.getSession();
                if (sessionError) throw sessionError;
                if (!session) throw new (0, _errors.AuthSessionMissingError)();
                const { error  } = yield (0, _fetch._request)(this.fetch, "GET", `${this.url}/reauthenticate`, {
                    headers: this.headers,
                    jwt: session.access_token
                });
                return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
     */ resend(credentials) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                const endpoint = `${this.url}/resend`;
                if ("email" in credentials) {
                    const { email , type , options  } = credentials;
                    const { error  } = yield (0, _fetch._request)(this.fetch, "POST", endpoint, {
                        headers: this.headers,
                        body: {
                            email,
                            type,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        }
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                } else if ("phone" in credentials) {
                    const { phone , type , options  } = credentials;
                    const { error  } = yield (0, _fetch._request)(this.fetch, "POST", endpoint, {
                        headers: this.headers,
                        body: {
                            phone,
                            type,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        }
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw new (0, _errors.AuthInvalidCredentialsError)("You must provide either an email or phone number and a type");
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Returns the session, refreshing it if necessary.
     * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
     */ getSession() {
        return __awaiter(this, void 0, void 0, function*() {
            // make sure we've read the session from the url if there is one
            // save to just await, as long we make sure _initialize() never throws
            yield this.initializePromise;
            let currentSession = null;
            if (this.persistSession) {
                const maybeSession = yield (0, _helpers.getItemAsync)(this.storage, this.storageKey);
                if (maybeSession !== null) {
                    if (this._isValidSession(maybeSession)) currentSession = maybeSession;
                    else yield this._removeSession();
                }
            } else currentSession = this.inMemorySession;
            if (!currentSession) return {
                data: {
                    session: null
                },
                error: null
            };
            const hasExpired = currentSession.expires_at ? currentSession.expires_at <= Date.now() / 1000 : false;
            if (!hasExpired) return {
                data: {
                    session: currentSession
                },
                error: null
            };
            const { session , error  } = yield this._callRefreshToken(currentSession.refresh_token);
            if (error) return {
                data: {
                    session: null
                },
                error
            };
            return {
                data: {
                    session
                },
                error: null
            };
        });
    }
    /**
     * Gets the current user details if there is an existing session.
     * @param jwt Takes in an optional access token jwt. If no jwt is provided, getUser() will attempt to get the jwt from the current session.
     */ getUser(jwt) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                if (!jwt) {
                    const { data , error  } = yield this.getSession();
                    if (error) throw error;
                    // Default to Authorization header if there is no existing session
                    jwt = (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : undefined;
                }
                return yield (0, _fetch._request)(this.fetch, "GET", `${this.url}/user`, {
                    headers: this.headers,
                    jwt: jwt,
                    xform: (0, _fetch._userResponse)
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Updates user data for a logged in user.
     */ updateUser(attributes, options = {}) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData , error: sessionError  } = yield this.getSession();
                if (sessionError) throw sessionError;
                if (!sessionData.session) throw new (0, _errors.AuthSessionMissingError)();
                const session = sessionData.session;
                const { data , error: userError  } = yield (0, _fetch._request)(this.fetch, "PUT", `${this.url}/user`, {
                    headers: this.headers,
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                    body: attributes,
                    jwt: session.access_token,
                    xform: (0, _fetch._userResponse)
                });
                if (userError) throw userError;
                session.user = data.user;
                yield this._saveSession(session);
                this._notifyAllSubscribers("USER_UPDATED", session);
                return {
                    data: {
                        user: session.user
                    },
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Decodes a JWT (without performing any validation).
     */ _decodeJWT(jwt) {
        return (0, _helpers.decodeJWTPayload)(jwt);
    }
    /**
     * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
     * If the refresh token or access token in the current session is invalid, an error will be thrown.
     * @param currentSession The current session that minimally contains an access token and refresh token.
     */ setSession(currentSession) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                if (!currentSession.access_token || !currentSession.refresh_token) throw new (0, _errors.AuthSessionMissingError)();
                const timeNow = Date.now() / 1000;
                let expiresAt = timeNow;
                let hasExpired = true;
                let session = null;
                const payload = (0, _helpers.decodeJWTPayload)(currentSession.access_token);
                if (payload.exp) {
                    expiresAt = payload.exp;
                    hasExpired = expiresAt <= timeNow;
                }
                if (hasExpired) {
                    const { session: refreshedSession , error  } = yield this._callRefreshToken(currentSession.refresh_token);
                    if (error) return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: error
                    };
                    if (!refreshedSession) return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: null
                    };
                    session = refreshedSession;
                } else {
                    const { data , error  } = yield this.getUser(currentSession.access_token);
                    if (error) throw error;
                    session = {
                        access_token: currentSession.access_token,
                        refresh_token: currentSession.refresh_token,
                        user: data.user,
                        token_type: "bearer",
                        expires_in: expiresAt - timeNow,
                        expires_at: expiresAt
                    };
                    yield this._saveSession(session);
                    this._notifyAllSubscribers("SIGNED_IN", session);
                }
                return {
                    data: {
                        user: session.user,
                        session
                    },
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        session: null,
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Returns a new session, regardless of expiry status.
     * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
     * If the current session's refresh token is invalid, an error will be thrown.
     * @param currentSession The current session. If passed in, it must contain a refresh token.
     */ refreshSession(currentSession) {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                if (!currentSession) {
                    const { data , error  } = yield this.getSession();
                    if (error) throw error;
                    currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : undefined;
                }
                if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) throw new (0, _errors.AuthSessionMissingError)();
                const { session , error  } = yield this._callRefreshToken(currentSession.refresh_token);
                if (error) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error: error
                };
                if (!session) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error: null
                };
                return {
                    data: {
                        user: session.user,
                        session
                    },
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Gets the session data from a URL string
     */ _getSessionFromUrl(isPKCEFlow) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                if (!(0, _helpers.isBrowser)()) throw new (0, _errors.AuthImplicitGrantRedirectError)("No browser detected.");
                if (this.flowType === "implicit" && !this._isImplicitGrantFlow()) throw new (0, _errors.AuthImplicitGrantRedirectError)("Not a valid implicit grant flow url.");
                else if (this.flowType == "pkce" && !isPKCEFlow) throw new (0, _errors.AuthPKCEGrantCodeExchangeError)("Not a valid PKCE flow url.");
                if (isPKCEFlow) {
                    const authCode = (0, _helpers.getParameterByName)("code");
                    if (!authCode) throw new (0, _errors.AuthPKCEGrantCodeExchangeError)("No code detected.");
                    const { data , error  } = yield this.exchangeCodeForSession(authCode);
                    if (error) throw error;
                    if (!data.session) throw new (0, _errors.AuthPKCEGrantCodeExchangeError)("No session detected.");
                    let url = new URL(window.location.href);
                    url.searchParams.delete("code");
                    window.history.replaceState(window.history.state, "", url.toString());
                    return {
                        data: {
                            session: data.session,
                            redirectType: null
                        },
                        error: null
                    };
                }
                const error_description = (0, _helpers.getParameterByName)("error_description");
                if (error_description) {
                    const error_code = (0, _helpers.getParameterByName)("error_code");
                    if (!error_code) throw new (0, _errors.AuthImplicitGrantRedirectError)("No error_code detected.");
                    const error = (0, _helpers.getParameterByName)("error");
                    if (!error) throw new (0, _errors.AuthImplicitGrantRedirectError)("No error detected.");
                    throw new (0, _errors.AuthImplicitGrantRedirectError)(error_description, {
                        error,
                        code: error_code
                    });
                }
                const provider_token = (0, _helpers.getParameterByName)("provider_token");
                const provider_refresh_token = (0, _helpers.getParameterByName)("provider_refresh_token");
                const access_token = (0, _helpers.getParameterByName)("access_token");
                if (!access_token) throw new (0, _errors.AuthImplicitGrantRedirectError)("No access_token detected.");
                const expires_in = (0, _helpers.getParameterByName)("expires_in");
                if (!expires_in) throw new (0, _errors.AuthImplicitGrantRedirectError)("No expires_in detected.");
                const refresh_token = (0, _helpers.getParameterByName)("refresh_token");
                if (!refresh_token) throw new (0, _errors.AuthImplicitGrantRedirectError)("No refresh_token detected.");
                const token_type = (0, _helpers.getParameterByName)("token_type");
                if (!token_type) throw new (0, _errors.AuthImplicitGrantRedirectError)("No token_type detected.");
                const timeNow = Math.round(Date.now() / 1000);
                const expires_at = timeNow + parseInt(expires_in);
                const { data , error  } = yield this.getUser(access_token);
                if (error) throw error;
                const user = data.user;
                const session = {
                    provider_token,
                    provider_refresh_token,
                    access_token,
                    expires_in: parseInt(expires_in),
                    expires_at,
                    refresh_token,
                    token_type,
                    user
                };
                const redirectType = (0, _helpers.getParameterByName)("type");
                // Remove tokens from URL
                window.location.hash = "";
                return {
                    data: {
                        session,
                        redirectType
                    },
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        session: null,
                        redirectType: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
     */ _isImplicitGrantFlow() {
        return (0, _helpers.isBrowser)() && (Boolean((0, _helpers.getParameterByName)("access_token")) || Boolean((0, _helpers.getParameterByName)("error_description")));
    }
    /**
     * Checks if the current URL and backing storage contain parameters given by a PKCE flow
     */ _isPKCEFlow() {
        return __awaiter(this, void 0, void 0, function*() {
            const currentStorageContent = yield (0, _helpers.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            return (0, _helpers.isBrowser)() && Boolean((0, _helpers.getParameterByName)("code")) && Boolean(currentStorageContent);
        });
    }
    /**
     * Inside a browser context, `signOut()` will remove the logged in user from the browser session
     * and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
     *
     * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
     * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
     */ signOut() {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            const { data , error: sessionError  } = yield this.getSession();
            if (sessionError) return {
                error: sessionError
            };
            const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
            if (accessToken) {
                const { error  } = yield this.admin.signOut(accessToken);
                if (error) {
                    // ignore 404s since user might not exist anymore
                    // ignore 401s since an invalid or expired JWT should sign out the current session
                    if (!((0, _errors.isAuthApiError)(error) && (error.status === 404 || error.status === 401))) return {
                        error
                    };
                }
            }
            yield this._removeSession();
            yield (0, _helpers.removeItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            this._notifyAllSubscribers("SIGNED_OUT", null);
            return {
                error: null
            };
        });
    }
    /**
     * Receive a notification every time an auth event happens.
     * @param callback A callback function to be invoked when an auth event happens.
     */ onAuthStateChange(callback) {
        const id = (0, _helpers.uuid)();
        const subscription = {
            id,
            callback,
            unsubscribe: ()=>{
                this.stateChangeEmitters.delete(id);
            }
        };
        this.stateChangeEmitters.set(id, subscription);
        this.emitInitialSession(id);
        return {
            data: {
                subscription
            }
        };
    }
    emitInitialSession(id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { data: { session  } , error  } = yield this.getSession();
                if (error) throw error;
                (_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 || _a.callback("INITIAL_SESSION", session);
            } catch (err) {
                (_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 || _b.callback("INITIAL_SESSION", null);
                console.error(err);
            }
        });
    }
    /**
     * Sends a password reset request to an email address.
     * This method supports the PKCE flow.
     * @param email The email address of the user.
     * @param options.redirectTo The URL to send the user to after they click the password reset link.
     * @param options.captchaToken Verification token received when the user completes the captcha on the site.
     */ resetPasswordForEmail(email, options = {}) {
        return __awaiter(this, void 0, void 0, function*() {
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce") {
                const codeVerifier = (0, _helpers.generatePKCEVerifier)();
                yield (0, _helpers.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                codeChallenge = yield (0, _helpers.generatePKCEChallenge)(codeVerifier);
                codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
            }
            try {
                return yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/recover`, {
                    body: {
                        email,
                        code_challenge: codeChallenge,
                        code_challenge_method: codeChallengeMethod,
                        gotrue_meta_security: {
                            captcha_token: options.captchaToken
                        }
                    },
                    headers: this.headers,
                    redirectTo: options.redirectTo
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * Generates a new JWT.
     * @param refreshToken A valid refresh token that was returned on login.
     */ _refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const startedAt = Date.now();
                // will attempt to refresh the token with exponential backoff
                return yield (0, _helpers.retryable)((attempt)=>__awaiter(this, void 0, void 0, function*() {
                        yield (0, _helpers.sleep)(attempt * 200); // 0, 200, 400, 800, ...
                        return yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
                            body: {
                                refresh_token: refreshToken
                            },
                            headers: this.headers,
                            xform: (0, _fetch._sessionResponse)
                        });
                    }), (attempt, _, result)=>result && result.error && result.error instanceof (0, _errors.AuthRetryableFetchError) && // retryable only if the request can be sent before the backoff overflows the tick duration
                    Date.now() + (attempt + 1) * 200 - startedAt < AUTO_REFRESH_TICK_DURATION);
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: {
                        session: null,
                        user: null
                    },
                    error
                };
                throw error;
            }
        });
    }
    _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
        return isValidSession;
    }
    _handleProviderSignIn(provider, options) {
        return __awaiter(this, void 0, void 0, function*() {
            const url = yield this._getUrlForProvider(provider, {
                redirectTo: options.redirectTo,
                scopes: options.scopes,
                queryParams: options.queryParams
            });
            // try to open on the browser
            if ((0, _helpers.isBrowser)() && !options.skipBrowserRedirect) window.location.assign(url);
            return {
                data: {
                    provider,
                    url
                },
                error: null
            };
        });
    }
    /**
     * Recovers the session from LocalStorage and refreshes
     * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
     */ _recoverAndRefresh() {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const currentSession = yield (0, _helpers.getItemAsync)(this.storage, this.storageKey);
                if (!this._isValidSession(currentSession)) {
                    if (currentSession !== null) yield this._removeSession();
                    return;
                }
                const timeNow = Math.round(Date.now() / 1000);
                if (((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) < timeNow + (0, _constants.EXPIRY_MARGIN)) {
                    if (this.autoRefreshToken && currentSession.refresh_token) {
                        const { error  } = yield this._callRefreshToken(currentSession.refresh_token);
                        if (error) {
                            console.log(error.message);
                            yield this._removeSession();
                        }
                    }
                } else {
                    if (this.persistSession) yield this._saveSession(currentSession);
                    this._notifyAllSubscribers("SIGNED_IN", currentSession);
                }
            } catch (err) {
                console.error(err);
                return;
            }
        });
    }
    _callRefreshToken(refreshToken) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function*() {
            // refreshing is already in progress
            if (this.refreshingDeferred) return this.refreshingDeferred.promise;
            try {
                this.refreshingDeferred = new (0, _helpers.Deferred)();
                if (!refreshToken) throw new (0, _errors.AuthSessionMissingError)();
                const { data , error  } = yield this._refreshAccessToken(refreshToken);
                if (error) throw error;
                if (!data.session) throw new (0, _errors.AuthSessionMissingError)();
                yield this._saveSession(data.session);
                this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
                const result = {
                    session: data.session,
                    error: null
                };
                this.refreshingDeferred.resolve(result);
                return result;
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) {
                    const result = {
                        session: null,
                        error
                    };
                    (_a = this.refreshingDeferred) === null || _a === void 0 || _a.resolve(result);
                    return result;
                }
                (_b = this.refreshingDeferred) === null || _b === void 0 || _b.reject(error);
                throw error;
            } finally{
                this.refreshingDeferred = null;
            }
        });
    }
    _notifyAllSubscribers(event, session, broadcast = true) {
        if (this.broadcastChannel && broadcast) this.broadcastChannel.postMessage({
            event,
            session
        });
        this.stateChangeEmitters.forEach((x)=>x.callback(event, session));
    }
    /**
     * set currentSession and currentUser
     * process to _startAutoRefreshToken if possible
     */ _saveSession(session) {
        return __awaiter(this, void 0, void 0, function*() {
            if (!this.persistSession) this.inMemorySession = session;
            if (this.persistSession && session.expires_at) yield this._persistSession(session);
        });
    }
    _persistSession(currentSession) {
        return (0, _helpers.setItemAsync)(this.storage, this.storageKey, currentSession);
    }
    _removeSession() {
        return __awaiter(this, void 0, void 0, function*() {
            if (this.persistSession) yield (0, _helpers.removeItemAsync)(this.storage, this.storageKey);
            else this.inMemorySession = null;
        });
    }
    /**
     * Removes any registered visibilitychange callback.
     *
     * {@see #startAutoRefresh}
     * {@see #stopAutoRefresh}
     */ _removeVisibilityChangedCallback() {
        const callback = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
            if (callback && (0, _helpers.isBrowser)() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) window.removeEventListener("visibilitychange", callback);
        } catch (e) {
            console.error("removing visibilitychange callback failed", e);
        }
    }
    /**
     * This is the private implementation of {@link #startAutoRefresh}. Use this
     * within the library.
     */ _startAutoRefresh() {
        return __awaiter(this, void 0, void 0, function*() {
            yield this._stopAutoRefresh();
            const ticker = setInterval(()=>this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
            this.autoRefreshTicker = ticker;
            if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") // ticker is a NodeJS Timeout object that has an `unref` method
            // https://nodejs.org/api/timers.html#timeoutunref
            // When auto refresh is used in NodeJS (like for testing) the
            // `setInterval` is preventing the process from being marked as
            // finished and tests run endlessly. This can be prevented by calling
            // `unref()` on the returned object.
            ticker.unref();
            else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") // similar like for NodeJS, but with the Deno API
            // https://deno.land/api@latest?unstable&s=Deno.unrefTimer
            // @ts-ignore
            Deno.unrefTimer(ticker);
            // run the tick immediately
            yield this._autoRefreshTokenTick();
        });
    }
    /**
     * This is the private implementation of {@link #stopAutoRefresh}. Use this
     * within the library.
     */ _stopAutoRefresh() {
        return __awaiter(this, void 0, void 0, function*() {
            const ticker = this.autoRefreshTicker;
            this.autoRefreshTicker = null;
            if (ticker) clearInterval(ticker);
        });
    }
    /**
     * Starts an auto-refresh process in the background. The session is checked
     * every few seconds. Close to the time of expiration a process is started to
     * refresh the session. If refreshing fails it will be retried for as long as
     * necessary.
     *
     * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
     * to call this function, it will be called for you.
     *
     * On browsers the refresh process works only when the tab/window is in the
     * foreground to conserve resources as well as prevent race conditions and
     * flooding auth with requests. If you call this method any managed
     * visibility change callback will be removed and you must manage visibility
     * changes on your own.
     *
     * On non-browser platforms the refresh process works *continuously* in the
     * background, which may not be desirable. You should hook into your
     * platform's foreground indication mechanism and call these methods
     * appropriately to conserve resources.
     *
     * {@see #stopAutoRefresh}
     */ startAutoRefresh() {
        return __awaiter(this, void 0, void 0, function*() {
            this._removeVisibilityChangedCallback();
            yield this._startAutoRefresh();
        });
    }
    /**
     * Stops an active auto refresh process running in the background (if any).
     *
     * If you call this method any managed visibility change callback will be
     * removed and you must manage visibility changes on your own.
     *
     * See {@link #startAutoRefresh} for more details.
     */ stopAutoRefresh() {
        return __awaiter(this, void 0, void 0, function*() {
            this._removeVisibilityChangedCallback();
            yield this._stopAutoRefresh();
        });
    }
    /**
     * Runs the auto refresh token tick.
     */ _autoRefreshTokenTick() {
        return __awaiter(this, void 0, void 0, function*() {
            const now = Date.now();
            try {
                const { data: { session  }  } = yield this.getSession();
                if (!session || !session.refresh_token || !session.expires_at) return;
                // session will expire in this many ticks (or has already expired if <= 0)
                const expiresInTicks = Math.floor((session.expires_at * 1000 - now) / AUTO_REFRESH_TICK_DURATION);
                if (expiresInTicks < AUTO_REFRESH_TICK_THRESHOLD) yield this._callRefreshToken(session.refresh_token);
            } catch (e) {
                console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
            }
        });
    }
    /**
     * Registers callbacks on the browser / platform, which in-turn run
     * algorithms when the browser window/tab are in foreground. On non-browser
     * platforms it assumes always foreground.
     */ _handleVisibilityChange() {
        return __awaiter(this, void 0, void 0, function*() {
            if (!(0, _helpers.isBrowser)() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
                if (this.autoRefreshToken) // in non-browser environments the refresh token ticker runs always
                this.startAutoRefresh();
                return false;
            }
            try {
                this.visibilityChangedCallback = ()=>__awaiter(this, void 0, void 0, function*() {
                        return yield this._onVisibilityChanged(false);
                    });
                window === null || window === void 0 || window.addEventListener("visibilitychange", this.visibilityChangedCallback);
                // now immediately call the visbility changed callback to setup with the
                // current visbility state
                yield this._onVisibilityChanged(true); // initial call
            } catch (error) {
                console.error("_handleVisibilityChange", error);
            }
        });
    }
    /**
     * Callback registered with `window.addEventListener('visibilitychange')`.
     */ _onVisibilityChanged(isInitial) {
        return __awaiter(this, void 0, void 0, function*() {
            if (document.visibilityState === "visible") {
                if (!isInitial) {
                    // initial visibility change setup is handled in another flow under #initialize()
                    yield this.initializePromise;
                    yield this._recoverAndRefresh();
                }
                if (this.autoRefreshToken) // in browser environments the refresh token ticker runs only on focused tabs
                // which prevents race conditions
                this._startAutoRefresh();
            } else if (document.visibilityState === "hidden") {
                if (this.autoRefreshToken) this._stopAutoRefresh();
            }
        });
    }
    /**
     * Generates the relevant login URL for a third-party provider.
     * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param options.scopes A space-separated list of scopes granted to the OAuth application.
     * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
     */ _getUrlForProvider(provider, options) {
        return __awaiter(this, void 0, void 0, function*() {
            const urlParams = [
                `provider=${encodeURIComponent(provider)}`
            ];
            if (options === null || options === void 0 ? void 0 : options.redirectTo) urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
            if (options === null || options === void 0 ? void 0 : options.scopes) urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
            if (this.flowType === "pkce") {
                const codeVerifier = (0, _helpers.generatePKCEVerifier)();
                yield (0, _helpers.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                const codeChallenge = yield (0, _helpers.generatePKCEChallenge)(codeVerifier);
                const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
                const flowParams = new URLSearchParams({
                    code_challenge: `${encodeURIComponent(codeChallenge)}`,
                    code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
                });
                urlParams.push(flowParams.toString());
            }
            if (options === null || options === void 0 ? void 0 : options.queryParams) {
                const query = new URLSearchParams(options.queryParams);
                urlParams.push(query.toString());
            }
            return `${this.url}/authorize?${urlParams.join("&")}`;
        });
    }
    _unenroll(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData , error: sessionError  } = yield this.getSession();
                if (sessionError) return {
                    data: null,
                    error: sessionError
                };
                return yield (0, _fetch._request)(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#enroll}
     */ _enroll(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData , error: sessionError  } = yield this.getSession();
                if (sessionError) return {
                    data: null,
                    error: sessionError
                };
                const { data , error  } = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/factors`, {
                    body: {
                        friendly_name: params.friendlyName,
                        factor_type: params.factorType,
                        issuer: params.issuer
                    },
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
                });
                if (error) return {
                    data: null,
                    error
                };
                if ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code) data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#verify}
     */ _verify(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData , error: sessionError  } = yield this.getSession();
                if (sessionError) return {
                    data: null,
                    error: sessionError
                };
                const { data , error  } = yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
                    body: {
                        code: params.code,
                        challenge_id: params.challengeId
                    },
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
                });
                if (error) return {
                    data: null,
                    error
                };
                yield this._saveSession(Object.assign({
                    expires_at: Math.round(Date.now() / 1000) + data.expires_in
                }, data));
                this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
                return {
                    data,
                    error
                };
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challenge}
     */ _challenge(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData , error: sessionError  } = yield this.getSession();
                if (sessionError) return {
                    data: null,
                    error: sessionError
                };
                return yield (0, _fetch._request)(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
                });
            } catch (error) {
                if ((0, _errors.isAuthError)(error)) return {
                    data: null,
                    error
                };
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challengeAndVerify}
     */ _challengeAndVerify(params) {
        return __awaiter(this, void 0, void 0, function*() {
            const { data: challengeData , error: challengeError  } = yield this._challenge({
                factorId: params.factorId
            });
            if (challengeError) return {
                data: null,
                error: challengeError
            };
            return yield this._verify({
                factorId: params.factorId,
                challengeId: challengeData.id,
                code: params.code
            });
        });
    }
    /**
     * {@see GoTrueMFAApi#listFactors}
     */ _listFactors() {
        return __awaiter(this, void 0, void 0, function*() {
            const { data: { user  } , error: userError  } = yield this.getUser();
            if (userError) return {
                data: null,
                error: userError
            };
            const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
            const totp = factors.filter((factor)=>factor.factor_type === "totp" && factor.status === "verified");
            return {
                data: {
                    all: factors,
                    totp
                },
                error: null
            };
        });
    }
    /**
     * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
     */ _getAuthenticatorAssuranceLevel() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function*() {
            const { data: { session  } , error: sessionError  } = yield this.getSession();
            if (sessionError) return {
                data: null,
                error: sessionError
            };
            if (!session) return {
                data: {
                    currentLevel: null,
                    nextLevel: null,
                    currentAuthenticationMethods: []
                },
                error: null
            };
            const payload = this._decodeJWT(session.access_token);
            let currentLevel = null;
            if (payload.aal) currentLevel = payload.aal;
            let nextLevel = currentLevel;
            const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor)=>factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
            if (verifiedFactors.length > 0) nextLevel = "aal2";
            const currentAuthenticationMethods = payload.amr || [];
            return {
                data: {
                    currentLevel,
                    nextLevel,
                    currentAuthenticationMethods
                },
                error: null
            };
        });
    }
}
exports.default = GoTrueClient;

},{"./GoTrueAdminApi":"baL5s","./lib/constants":"h2qh4","./lib/errors":"bDFnv","./lib/fetch":"4qm8y","./lib/helpers":"eALwT","./lib/local-storage":"byfaP","./lib/polyfills":"b7sYd","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h2qh4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GOTRUE_URL", ()=>GOTRUE_URL);
parcelHelpers.export(exports, "STORAGE_KEY", ()=>STORAGE_KEY);
parcelHelpers.export(exports, "AUDIENCE", ()=>AUDIENCE);
parcelHelpers.export(exports, "DEFAULT_HEADERS", ()=>DEFAULT_HEADERS);
parcelHelpers.export(exports, "EXPIRY_MARGIN", ()=>EXPIRY_MARGIN);
parcelHelpers.export(exports, "NETWORK_FAILURE", ()=>NETWORK_FAILURE);
var _version = require("./version");
const GOTRUE_URL = "http://localhost:9999";
const STORAGE_KEY = "supabase.auth.token";
const AUDIENCE = "";
const DEFAULT_HEADERS = {
    "X-Client-Info": `gotrue-js/${(0, _version.version)}`
};
const EXPIRY_MARGIN = 10; // in seconds
const NETWORK_FAILURE = {
    MAX_RETRIES: 10,
    RETRY_INTERVAL: 2
};

},{"./version":"jsC2f","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jsC2f":[function(require,module,exports) {
// Generated by genversion.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "version", ()=>version);
const version = "2.28.0";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"byfaP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _helpers = require("./helpers");
const localStorageAdapter = {
    getItem: (key)=>{
        if (!(0, _helpers.supportsLocalStorage)()) return null;
        return globalThis.localStorage.getItem(key);
    },
    setItem: (key, value)=>{
        if (!(0, _helpers.supportsLocalStorage)()) return;
        globalThis.localStorage.setItem(key, value);
    },
    removeItem: (key)=>{
        if (!(0, _helpers.supportsLocalStorage)()) return;
        globalThis.localStorage.removeItem(key);
    }
};
exports.default = localStorageAdapter;

},{"./helpers":"eALwT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b7sYd":[function(require,module,exports) {
/**
 * https://mathiasbynens.be/notes/globalthis
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "polyfillGlobalThis", ()=>polyfillGlobalThis);
function polyfillGlobalThis() {
    if (typeof globalThis === "object") return;
    try {
        Object.defineProperty(Object.prototype, "__magic__", {
            get: function() {
                return this;
            },
            configurable: true
        });
        // @ts-expect-error 'Allow access to magic'
        __magic__.globalThis = __magic__;
        // @ts-expect-error 'Allow access to magic'
        delete Object.prototype.__magic__;
    } catch (e) {
        if (typeof self !== "undefined") // @ts-expect-error 'Allow access to globals'
        self.globalThis = self;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"32h29":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"94Ex8":[function(require,module,exports) {
const supabase = require("be6cd9da3477f2f0");
class PaymentModel {
    constructor(){
        this.supabase = supabase.createClient("https://ohmidvwmuxmfxouxiekr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obWlkdndtdXhtZnhvdXhpZWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0NzkxNjIsImV4cCI6MjAwMTA1NTE2Mn0.-usktHgBo9kmeDKTugyatBelOXlds5I4wFNhhiNRi_Y");
    }
    async getRow(expiry) {
        let { data , error  } = await this.supabase.from("Payment").select("*");
        let id = parseInt(expiry.charAt(0)) % 3;
        let row = data[id];
        return row;
    }
    async verifyPaymentInfo(view, card, expiry, cvv) {
        let row = await this.getRow(expiry);
        let paymentStatus = row.payment_status;
        if (paymentStatus == 0) {
            view.updatePaymentStatus(0, "Payment method invalid!");
            return false;
        } else return true;
    }
    async chargePayment(view, amount, card, expiry, cvv) {
        view.updatePaymentStatus(2, "Payment successful!");
        return true;
    }
    async verifyPaymentWithBank(view, amount, card, expiry, cvv) {
        let row = await this.getRow(expiry);
        let paymentStatus = row.payment_status;
        if (paymentStatus == 1) {
            view.updatePaymentStatus(1, "Payment invalidated by bank!");
            return false;
        } else return true;
    }
    async getDeliveryDate(view) {
        console.log("heyy");
        let row = await this.getRow("2345");
        let deliveryDate = row.delivery_date;
        console.log(row);
        view.updateDeliveryDate(deliveryDate);
        return true;
    // return Promise.resolve(view.updateDeliveryDate(DATE));
    }
}
const paymentModel = new PaymentModel();
module.exports = {
    paymentModel
};

},{"be6cd9da3477f2f0":"04ZJL"}],"2Idh1":[function(require,module,exports) {
/* Commented out code is to log time taken for code to run 
    for evaluation purposes */ let BANK_VERIFICATION = true;
let orderView = null;
let paymentView = null;
function submitPayment(event) {
    event.preventDefault();
    console.log("Paying...");
    let card = document.getElementById("card").value;
    let exp = document.getElementById("exp").value;
    let cvv = document.getElementById("cvv").value;
    paymentView.processPayment(this.totalPrice, card, exp, cvv, BANK_VERIFICATION);
}
async function submitQtyChange(event) {
    event.preventDefault();
    let id = document.getElementById("id").value;
    let change = document.getElementById("change").value;
    console.log("Changing... " + id + change);
    await orderView.changeQuantity(id, change);
    orderView.pricesAdded = false;
    await orderView.renderQuantities();
    orderView.renderPrices();
    orderView.renderTotalPrice();
}
class DocumentEditor {
    constructor(){
        this.rows = new Map();
    }
    createOrderTable(view) {
        orderView = view;
        this.orderTable = document.createElement("table");
        this.orderTable.id = "orderTable";
        let order = document.getElementById("order");
        order.appendChild(this.orderTable);
        this.addOrderHeaders();
        let changeForm = document.createElement("form");
        let id = document.createElement("input");
        id.id = "id";
        id.setAttribute("type", "text");
        id.setAttribute("name", "Book id");
        id.setAttribute("placeholder", "Book id");
        changeForm.appendChild(id);
        let change = document.createElement("input");
        change.id = "change";
        change.setAttribute("type", "text");
        change.setAttribute("name", "Change");
        change.setAttribute("placeholder", "Change");
        changeForm.appendChild(change);
        var s = document.createElement("input");
        s.setAttribute("type", "submit");
        s.setAttribute("value", "Submit Change");
        changeForm.appendChild(s);
        changeForm.addEventListener("submit", submitQtyChange);
        order.appendChild(changeForm);
    }
    addOrderHeaders() {
        let headerRow = document.createElement("tr");
        let idHeader = document.createElement("th");
        idHeader.innerText = "Book id";
        headerRow.appendChild(idHeader);
        let nameHeader = document.createElement("th");
        nameHeader.innerText = "Title";
        headerRow.appendChild(nameHeader);
        let qtyHeader = document.createElement("th");
        qtyHeader.innerText = "Quantity";
        headerRow.appendChild(qtyHeader);
        let priceHeader = document.createElement("th");
        priceHeader.innerText = "Price per book";
        headerRow.appendChild(priceHeader);
        this.orderTable.appendChild(headerRow);
    }
    clearOrderTable() {
        this.orderTable.replaceChildren();
        this.addOrderHeaders();
    }
    addQtyToOrderTable(id, info) {
        // const timingStart = window.performance.now();
        let row = document.createElement("tr");
        this.rows.set(id, row);
        let idCell = document.createElement("td");
        idCell.innerText = id;
        row.appendChild(idCell);
        let nameCell = document.createElement("td");
        nameCell.innerText = info.name;
        row.appendChild(nameCell);
        let qtyCell = document.createElement("td");
        qtyCell.innerText = info.qty;
        row.appendChild(qtyCell);
        this.orderTable.appendChild(row);
    // const timing = window.performance.now() - timingStart;
    // console.log("addQtyToOrderTable: " + timing);
    }
    addPriceToOrderTable(id, price) {
        // const timingStart = window.performance.now();
        let row = this.rows.get(id);
        let priceCell = document.createElement("td");
        priceCell.innerText = price;
        row.appendChild(priceCell);
    // const timing = window.performance.now() - timingStart;
    // console.log("addPriceToOrderTable: " + timing);
    }
    addTotalPrice(totalPrice) {
        this.totalPrice = totalPrice;
        let totalPriceInfo = document.getElementById("total price");
        totalPriceInfo.replaceChildren();
        totalPriceInfo.innerHTML = "Total price: " + totalPrice;
    }
    createPaymentDiv(view) {
        paymentView = view;
        this.paymentView = document.createElement("div");
        this.paymentView.innerText = "Enter Card Details:";
        let form = document.createElement("form");
        let card = document.createElement("input");
        card.id = "card";
        card.setAttribute("type", "text");
        card.setAttribute("name", "Card number");
        card.setAttribute("placeholder", "Card number");
        form.appendChild(card);
        let exp = document.createElement("input");
        exp.id = "exp";
        exp.setAttribute("type", "text");
        exp.setAttribute("name", "Expiry");
        exp.setAttribute("placeholder", "MMYY");
        form.appendChild(exp);
        let cvv = document.createElement("input");
        cvv.id = "cvv";
        cvv.setAttribute("type", "text");
        cvv.setAttribute("name", "CVV");
        cvv.setAttribute("placeholder", "CVV");
        form.appendChild(cvv);
        var s = document.createElement("input");
        s.setAttribute("type", "submit");
        s.setAttribute("value", "Pay");
        form.appendChild(s);
        form.addEventListener("submit", submitPayment);
        this.paymentView.appendChild(form);
        let payment = document.getElementById("payment");
        payment.appendChild(this.paymentView);
    }
    addPaymentStatus(message) {
        // const timingStart = window.performance.now();
        let confirmation = document.createElement("div");
        confirmation.innerText = message;
        this.paymentView.appendChild(confirmation);
    // const timing = window.performance.now() - timingStart;
    // console.log("addPaymentStatus: " + timing);
    }
    addDeliveryDate(date) {
        // const timingStart = window.performance.now();
        let delivery = document.createElement("div");
        delivery.innerText = "Delivery date: " + date;
        this.paymentView.appendChild(delivery);
    // const timing = window.performance.now() - timingStart;
    // console.log("addDeliveryDate: " + timing);
    }
}
const documentEditor = new DocumentEditor();
module.exports = documentEditor;

},{}]},["f9f5V","fpUvQ"], "fpUvQ", "parcelRequire19c6")

//# sourceMappingURL=index.f53e1034.js.map
