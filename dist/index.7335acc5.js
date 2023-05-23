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
})({"dUMw4":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "43125f8a7335acc5";
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

},{}],"llPCs":[function(require,module,exports) {
const controller = require("8bab40618d0f3261");
const documentEditor = require("8e175fe8e0f984e");
class OrderView {
    constructor(){
        documentEditor.createOrderTable();
        // this.rows = new Map();
        this.quantities = new Map();
        this.prices = new Map();
    }
    async renderQuantities() {
        return controller.getQuantities();
    }
    async changeQuantity(id, change) {
        return controller.changeQuantity(id, change);
    }
    async renderPrices() {
        return controller.getPrices();
    }
    renderTotalPrice() {
        this.totalPrice = 0;
        for (let [id, info] of this.quantities){
            let currSum = parseInt(info.qty) * this.prices.get(id);
            this.totalPrice += currSum;
        }
        return documentEditor.addTotalPrice(this.totalPrice);
    }
    updateQuantities(quantities) {
        this.quantities = quantities;
        // this.rows = new Map();
        documentEditor.clearOrderTable();
        for (let [id, info] of quantities)documentEditor.addQtyToOrderTable(id, info);
    }
    updatePrices(prices) {
        this.prices = prices;
        for (let [id, price] of prices)if (this.quantities.has(id)) documentEditor.addPriceToOrderTable(id, price);
    }
}
class PaymentView {
    constructor(){
        documentEditor.createPaymentDiv();
    }
    async processPayment(amount, card, expiry, cvv, email, bankVerification) {
        let validPaymentInfo = await this.checkPaymentInfo(card, expiry, cvv);
        if (validPaymentInfo) {
            if (bankVerification) {
                let successfulPayment = await this.chargePaymentWithBankVerification(amount, card, expiry, cvv);
                if (successfulPayment) await this.getDeliveryDate(email);
            } else {
                let delivery = this.getDeliveryDate(email);
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
            return controller.verifyPaymentInfo(encryptedCard, expiry, cvv);
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
        return await controller.chargePayment(amount, encryptedCard, expiry, cvv);
    }
    async chargePaymentWithBankVerification(amount, card, expiry, cvv) {
        let firstVerification = await controller.verifyPaymentWithBank(amount, card, expiry, cvv);
        let secondVerification = await controller.verifyPaymentWithBank(amount, card, expiry, cvv);
        if (firstVerification && secondVerification) return await controller.chargePayment(amount, card, expiry, cvv);
        return false;
    }
    async getDeliveryDate(email) {
        let displayed = controller.getDeliveryDate();
        let emailed = controller.emailDeliveryDate(email);
        return Promise.allSettled([
            displayed,
            emailed
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
const orderView = new OrderView();
orderView.renderQuantities();
orderView.renderPrices();
const paymentView = new PaymentView();
module.exports = {
    OrderView,
    PaymentView,
    orderView,
    paymentView
};

},{"8bab40618d0f3261":"gcvVo","8e175fe8e0f984e":"2Idh1"}],"gcvVo":[function(require,module,exports) {
const { orderView , paymentView  } = require("f1d8247c35fdcddc");
const { stockModel  } = require("fc155b4c4ede5435");
const { paymentModel  } = require("33f0685fa05a3bd4");
class Controller {
    async getQuantities() {
        return await stockModel.getQuantities();
    }
    async changeQuantity(id, change) {
        return await stockModel.changeQuantity(id, change);
    }
    async getPrices() {
        return await stockModel.getPrices();
    }
    verifyPaymentInfo(card, expiry, cvv) {
        return paymentModel.verifyPaymentInfo(card, expiry, cvv);
    }
    async chargePayment(amount, card, expiry, cvv) {
        return await paymentModel.chargePayment(amount, card, expiry, cvv);
    }
    async verifyPaymentWithBank(amount, card, expiry, cvv) {
        return await paymentModel.verifyPaymentWithBank(amount, card, expiry, cvv);
    }
    async getDeliveryDate() {
        return await paymentModel.getDeliveryDate();
    }
    async emailDeliveryDate(email) {
        return await paymentModel.emailDeliveryDate(email);
    }
}
const controller = new Controller();
module.exports = controller;

},{"f1d8247c35fdcddc":"llPCs","fc155b4c4ede5435":"fbF5v","33f0685fa05a3bd4":"94Ex8"}],"fbF5v":[function(require,module,exports) {
//dummy values
let QUANTITIES = new Map();
QUANTITIES.set("1", {
    name: "A Tale of Two Cities",
    qty: "1"
});
QUANTITIES.set("5", {
    name: "Pride and Prejudice",
    qty: "4"
});
QUANTITIES.set("110", {
    name: "Maurice",
    qty: "10"
});
let MODIFIED_QUANTITIES = new Map();
MODIFIED_QUANTITIES.set("1", {
    name: "A Tale of Two Cities",
    qty: "4"
});
MODIFIED_QUANTITIES.set("110", {
    name: "Maurice",
    qty: "14"
});
const { order  } = require("2b044e223957861e");
class StockModel {
    async getQuantities() {
        return order.updateQuantities(QUANTITIES);
    }
    async changeQuantity(id, change) {
        const oldInfo = QUANTITIES.get(id);
        const newQty = parseInt(oldInfo.qty) + parseInt(change);
        QUANTITIES.set(id, {
            name: oldInfo.name,
            qty: "" + newQty
        });
    }
    async getPrices() {
        return order.updatePrices(PRICES);
    }
}
const stockModel = new StockModel();
module.exports = {
    stockModel
};

},{"2b044e223957861e":"llPCs"}],"94Ex8":[function(require,module,exports) {
//dummy values
let PRICES = new Map();
PRICES.set("1", 8);
PRICES.set("5", 13);
PRICES.set("10", 9);
PRICES.set("100", 10);
PRICES.set("110", 8);
let PAYMENT_STATUS = 0;
const { paymentView  } = require("2f338f33f7fe6f4d");
class PaymentModel {
    verifyPaymentInfo(card, expiry, cvv) {
        if (PAYMENT_STATUS == 0) {
            paymentView.updatePaymentStatus(0, "Payment method invalid!");
            return false;
        } else return true;
    }
    async chargePayment(amount, card, expiry, cvv) {
        paymentView.updatePaymentStatus(2, "Payment successful!");
        return true;
    }
    async verifyPaymentWithBank(amount, card, expiry, cvv) {
        if (PAYMENT_STATUS == 1) {
            paymentView.updatePaymentStatus(1, "Payment invalidated by bank!");
            return false;
        } else return true;
    }
    async getDeliveryDate() {
        return paymentView.updateDeliveryDate(DATE);
    }
    async emailDeliveryDate(email) {}
}
const paymentModel = new PaymentModel();
module.exports = {
    paymentModel
};

},{"2f338f33f7fe6f4d":"llPCs"}],"2Idh1":[function(require,module,exports) {
var _checkoutViewJs = require("../caseStudy/checkoutView.js");
let BANK_VERIFICATION = true;
function submitPayment(event) {
    event.preventDefault();
    let card = document.getElementById("card").value;
    let exp = document.getElementById("exp").value;
    let cvv = document.getElementById("cvv").cvv;
    (0, _checkoutViewJs.paymentView).processPayment(this.totalPrice, card, exp, cvv, "", BANK_VERIFICATION);
}
function submitQtyChange(event) {
    event.preventDefault();
    let id = document.getElementById("id").value;
    let change = document.getElementById("change").value;
    (0, _checkoutViewJs.orderView).changeQuantity(id, change);
    (0, _checkoutViewJs.orderView).renderQuantities();
    (0, _checkoutViewJs.orderView).renderTotalPrice();
}
class DocumentEditor {
    constructor(){
        this.rows = new Map();
    }
    createOrderTable() {
        this.orderTable = document.createElement("table");
        let order = document.getElementById("order");
        order.appendChild(this.orderTable);
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
        s.setAttribute("type", "Submit Change");
        s.setAttribute("value", "Submit Change");
        s.addEventListener("submit", submitQtyChange);
        changeForm.appendChild(s);
        order.appendChild(changeForm);
    }
    clearOrderTable() {
        this.orderTable.replaceChildren();
    }
    addQtyToOrderTable(id, info) {
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
    }
    addPriceToOrderTable(id, price) {
        let row = this.rows.get(id);
        let priceCell = document.createElement("td");
        priceCell.innerText = price;
        row.appendChild(priceCell);
    }
    addTotalPrice(totalPrice) {
        this.totalPrice = totalPrice;
        let totalPriceInfo = document.createElement("div");
        totalPriceInfo.innerHTML = "Total price: " + totalPrice;
    }
    createPaymentDiv() {
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
        s.setAttribute("type", "Pay");
        s.setAttribute("value", "Pay");
        s.addEventListener("submit", submitPayment);
        form.appendChild(s);
        this.paymentView.appendChild(form);
        let payment = document.getElementById("payment");
        payment.appendChild(this.paymentView);
    }
    addPaymentStatus(message) {
        let confirmation = document.createElement("div");
        confirmation.innerText = message;
        this.paymentView.appendChild(confirmation);
    }
    addDeliveryDate(date) {
        let delivery = document.createElement("div");
        delivery.innerText = "Delivery date: " + date;
        this.paymentView.appendChild(delivery);
    }
}
const documentEditor = new DocumentEditor();
module.exports = documentEditor;

},{"../caseStudy/checkoutView.js":"llPCs"}]},["dUMw4","llPCs"], "llPCs", "parcelRequiredc4d")

//# sourceMappingURL=index.7335acc5.js.map