/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.runWebsite = exports.init = exports.FamenunApi = exports.Hookable = void 0;
const ProfileHandler_1 = __webpack_require__(1);
const ToastHandler_1 = __webpack_require__(4);
const CircleHandler_1 = __webpack_require__(5);
const PaymentHandler_1 = __webpack_require__(6);
const PublishHandler_1 = __webpack_require__(7);
const ChatroomHandler_1 = __webpack_require__(8);
const LinkHandler_1 = __webpack_require__(9);
const AppGalaxyHandler_1 = __webpack_require__(10);
const NotificationHandler_1 = __webpack_require__(11);
const RequestHandler_1 = __webpack_require__(2);
const HookHandler_1 = __webpack_require__(12);
const PageHandler_1 = __webpack_require__(13);
const DeviceHandler_1 = __webpack_require__(14);
class Hookable {
}
exports.Hookable = Hookable;
class FamenunApi {
}
exports.FamenunApi = FamenunApi;
const init = (debug) => {
    const requestHandler = new RequestHandler_1.RequestHandler(debug);
    // @ts-ignore
    if (window.__famenun_api__ === undefined) {
        // @ts-ignore
        window.__famenun_api__ = {
            debug: debug,
            profileHandler: new ProfileHandler_1.ProfileHandler(requestHandler),
            circleHandler: new CircleHandler_1.CircleHandler(requestHandler),
            paymentHandler: new PaymentHandler_1.PaymentHandler(requestHandler),
            publishHandler: new PublishHandler_1.PublishHandler(requestHandler),
            chatroomHandler: new ChatroomHandler_1.ChatroomHandler(requestHandler),
            appGalaxyHandler: new AppGalaxyHandler_1.AppGalaxyHandler(requestHandler),
            toastHandler: new ToastHandler_1.ToastHandler(requestHandler),
            linkHandler: new LinkHandler_1.LinkHandler(requestHandler),
            notificationHandler: new NotificationHandler_1.NotificationHandler(requestHandler),
            deviceHandler: new DeviceHandler_1.DeviceHandler(requestHandler),
            hookHandler: new HookHandler_1.HookHandler(requestHandler),
            pageHandler: new PageHandler_1.PageHandler(requestHandler)
        };
    }
    // @ts-ignore
    return window.__famenun_api__;
};
exports.init = init;
const runWebsite = (website) => {
    let domain = new URL(window.location.href).host;
    domain = domain === "pages.famenun.com" ? website : domain;
    fetch(`https://api.famenun.com/getWebsite?website=${website}&domain=${domain}`)
        .then(res => res.json())
        .then(response => {
        if (!response.error) {
            const websiteObject = response.data;
            const url = `https://famenun.com/run/${websiteObject.ap}?entry=${encodeURIComponent(websiteObject.pa)}`;
            var style = document.createElement("style");
            style.innerHTML = "*{margin: 0px; padding: 0px;} html, body {width: 100%; height: 100%; overflow:hidden; }";
            document.head.appendChild(style);
            var iframe = document.createElement("iframe");
            iframe.id = `website-${website}`;
            iframe.style = "width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 9999;";
            iframe.src = url;
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("hspace", "0");
            iframe.setAttribute("vspace", "0");
            document.body.append(iframe);
        }
        else {
            console.log(response.message);
        }
    }).catch(error => console.log(error));
};
exports.runWebsite = runWebsite;
(function () {
    try {
        const requestHandler = new RequestHandler_1.RequestHandler();
        var win = window;
        win.__famenun__ = {
            init: exports.init,
            emit: (emitable) => {
                requestHandler.request({
                    id: emitable.id,
                    api: RequestHandler_1.API_HOOK,
                    data: emitable
                });
            },
            registerHook: (code) => {
                var script = document.createElement("script");
                script.innerHTML = decodeURIComponent(code);
                document.body.append(script);
            },
            runWebsite: exports.runWebsite
        };
    }
    catch (e) { }
})();
// TODO: add dark mode support
// TODO: don't ask for app id instead the system should set the app id
// TODO: create camera api
// TODO: move out the page handler into @famenun/web


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileHandler = exports.ProfileShortcut = void 0;
const RequestHandler_1 = __webpack_require__(2);
const Utility_1 = __webpack_require__(3);
class ProfileShortcut {
}
exports.ProfileShortcut = ProfileShortcut;
class ProfileHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Get currently logged in user's Profile.
    */
    getProfile() {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve({
                        "accessToken": "uid_access_token",
                        "uId": "user_uid",
                        "dp": "user_dp",
                        "name": "user name"
                    });
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_GET_PROFILE
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve(requestable.data);
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
    * Create shortcut in profile
    */
    createShortcut(profileShortcut) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    profileShortcut.image = yield Utility_1.resolveImage(profileShortcut.image);
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_CREATE_SHORTCUT,
                        data: profileShortcut
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve();
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    /**
    * Get verified email access token
    */
    getEmailAccessToken() {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve({
                        "accessToken": "email_access_token"
                    });
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_GET_EMAIL
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve(requestable.data);
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
    * Get verified email access token
    */
    getPhoneNumberAccessToken() {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve({
                        "accessToken": "phone_access_token"
                    });
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_GET_PHONE_NUMBER
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve(requestable.data);
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.ProfileHandler = ProfileHandler;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = exports.Requestable = exports.API_HOOK = exports.API_GET_DEVICE_INFO = exports.API_NOTIFY = exports.API_CREATE_DEEP_LINK = exports.API_OPEN_LINK = exports.API_GET_DATA = exports.API_INSERT_DATA = exports.API_SHOW_TOAST = exports.API_OPEN_APP_PROFILE = exports.API_OPEN_APP = exports.API_GET_INSTALLED_APPS = exports.API_OPEN_CHAT = exports.API_PUBLISH = exports.API_MAKE_PAYMENT = exports.API_GET_CIRCLE = exports.API_GET_PHONE_NUMBER = exports.API_GET_EMAIL = exports.API_CREATE_SHORTCUT = exports.API_GET_PROFILE = void 0;
const Utility_1 = __webpack_require__(3);
exports.API_GET_PROFILE = "API_GET_PROFILE";
exports.API_CREATE_SHORTCUT = "API_CREATE_SHORTCUT";
exports.API_GET_EMAIL = "API_GET_EMAIL";
exports.API_GET_PHONE_NUMBER = "API_GET_PHONE_NUMBER";
exports.API_GET_CIRCLE = "API_GET_CIRCLE";
exports.API_MAKE_PAYMENT = "API_MAKE_PAYMENT";
exports.API_PUBLISH = "API_PUBLISH";
exports.API_OPEN_CHAT = "API_OPEN_CHAT";
exports.API_GET_INSTALLED_APPS = "API_GET_INSTALLED_APPS";
exports.API_OPEN_APP = "API_OPEN_APP";
exports.API_OPEN_APP_PROFILE = "API_OPEN_APP_PROFILE";
exports.API_SHOW_TOAST = "API_SHOW_TOAST";
exports.API_INSERT_DATA = "API_INSERT_DATA";
exports.API_GET_DATA = "API_GET_DATA";
exports.API_OPEN_LINK = "API_OPEN_LINK";
exports.API_CREATE_DEEP_LINK = "API_CREATE_DEEP_LINK";
exports.API_NOTIFY = "API_NOTIFY";
exports.API_GET_DEVICE_INFO = "API_GET_DEVICE_INFO";
exports.API_HOOK = "API_HOOK";
const API_GET_PROFILE_RESPONSE = "API_GET_PROFILE_RESPONSE";
const API_CREATE_SHORTCUT_RESPONSE = "API_CREATE_SHORTCUT_RESPONSE";
const API_GET_EMAIL_RESPONSE = "API_GET_EMAIL_RESPONSE";
const API_GET_PHONE_NUMBER_RESPONSE = "API_GET_PHONE_NUMBER_RESPONSE";
const API_GET_CIRCLE_RESPONSE = "API_GET_CIRCLE_RESPONSE";
const API_MAKE_PAYMENT_RESPONSE = "API_MAKE_PAYMENT_RESPONSE";
const API_PUBLISH_RESPONSE = "API_PUBLISH_RESPONSE";
const API_OPEN_CHAT_RESPONSE = "API_OPEN_CHAT_RESPONSE";
const API_GET_INSTALLED_APPS_RESPONSE = "API_GET_INSTALLED_APPS_RESPONSE";
const API_OPEN_APP_RESPONSE = "API_OPEN_APP_RESPONSE";
const API_OPEN_APP_PROFILE_RESPONSE = "API_OPEN_APP_PROFILE_RESPONSE";
const API_SHOW_TOAST_RESPONSE = "API_SHOW_TOAST_RESPONSE";
const API_INSERT_DATA_RESPONSE = "API_INSERT_DATA_RESPONSE";
const API_GET_DATA_RESPONSE = "API_GET_DATA_RESPONSE";
const API_OPEN_LINK_RESPONSE = "API_OPEN_LINK_RESPONSE";
const API_CREATE_DEEP_LINK_RESPONSE = "API_CREATE_DEEP_LINK_RESPONSE";
const API_NOTIFY_RESPONSE = "API_NOTIFY_RESPONSE";
const API_GET_DEVICE_INFO_RESPONSE = "API_GET_DEVICE_INFO_RESPONSE";
class Requestable {
}
exports.Requestable = Requestable;
class RequestHandler {
    constructor(debug) {
        this.debug = debug;
        this.listeners = new Map();
        try {
            this.init(this);
        }
        catch (error) { }
    }
    init(self) {
        if (Utility_1.isLoadedInIframe()) {
            console.log("loaded in iframe ;)");
            window.onmessage = (event) => {
                (() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const requestable = JSON.parse(event.data);
                        if (requestable.id !== undefined &&
                            requestable.id !== null &&
                            requestable.api !== undefined &&
                            requestable.api !== null) {
                            switch (requestable.api) {
                                case API_GET_PROFILE_RESPONSE:
                                case API_CREATE_SHORTCUT_RESPONSE:
                                case API_GET_EMAIL_RESPONSE:
                                case API_GET_PHONE_NUMBER_RESPONSE:
                                case API_GET_CIRCLE_RESPONSE:
                                case API_MAKE_PAYMENT_RESPONSE:
                                case API_PUBLISH_RESPONSE:
                                case API_OPEN_CHAT_RESPONSE:
                                case API_GET_INSTALLED_APPS_RESPONSE:
                                case API_OPEN_APP_RESPONSE:
                                case API_OPEN_APP_PROFILE_RESPONSE:
                                case API_SHOW_TOAST_RESPONSE:
                                case API_OPEN_LINK_RESPONSE:
                                case API_NOTIFY_RESPONSE:
                                case API_GET_DEVICE_INFO_RESPONSE:
                                    if (self.listeners.get(requestable.id) !== undefined) {
                                        self.listeners.get(requestable.id).onComplete(requestable);
                                    }
                                    break;
                            }
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                }))();
            };
        }
        else {
            console.log("loaded outside iframe ;)");
            const __famenun_logger__ = console.log;
            // @ts-ignore: 
            window.__famenun_logger_logs__ = [];
            console.log = (...args) => {
                let interceptable = false;
                try {
                    const requestable = JSON.parse(args);
                    if (requestable.id !== undefined &&
                        requestable.id !== null &&
                        requestable.api !== undefined &&
                        requestable.api !== null) {
                        switch (requestable.api) {
                            case API_GET_PROFILE_RESPONSE:
                            case API_CREATE_SHORTCUT_RESPONSE:
                            case API_GET_EMAIL_RESPONSE:
                            case API_GET_PHONE_NUMBER_RESPONSE:
                            case API_GET_CIRCLE_RESPONSE:
                            case API_MAKE_PAYMENT_RESPONSE:
                            case API_PUBLISH_RESPONSE:
                            case API_OPEN_CHAT_RESPONSE:
                            case API_GET_INSTALLED_APPS_RESPONSE:
                            case API_OPEN_APP_RESPONSE:
                            case API_OPEN_APP_PROFILE_RESPONSE:
                            case API_SHOW_TOAST_RESPONSE:
                            case API_INSERT_DATA_RESPONSE:
                            case API_GET_DATA_RESPONSE:
                            case API_OPEN_LINK_RESPONSE:
                            case API_NOTIFY_RESPONSE:
                                interceptable = true;
                                if (self.listeners.get(requestable.id) !== undefined) {
                                    self.listeners.get(requestable.id).onComplete(requestable);
                                }
                                break;
                        }
                    }
                }
                catch (error) { }
                if (!interceptable) {
                    // @ts-ignore: 
                    window.__famenun_logger_logs__.push(Array.from(args));
                    __famenun_logger__.apply(null, args);
                }
            };
        }
    }
    request(requestable, onRequestCompleteListener) {
        if (onRequestCompleteListener !== undefined) {
            this.listeners.set(requestable.id, onRequestCompleteListener);
        }
        if (Utility_1.isLoadedInIframe()) {
            window.parent.postMessage(JSON.stringify(requestable), "*");
        }
        else {
            console.log(JSON.stringify(requestable));
        }
    }
}
exports.RequestHandler = RequestHandler;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoadedInIframe = exports.resolveImage = exports.blobUrlToBase64 = exports.objectFromMap = exports.mapFromObject = void 0;
const mapFromObject = (object) => {
    const map = new Map();
    if (object !== undefined) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                map.set(key, object[key]);
            }
            ;
        }
    }
    return map;
};
exports.mapFromObject = mapFromObject;
const objectFromMap = (map) => {
    const object = {};
    map.forEach((value, key) => {
        object[key] = value;
    });
    return object;
};
exports.objectFromMap = objectFromMap;
const blobUrlToBase64 = (url) => {
    return new Promise((resolve, reject) => {
        try {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                const reader = new FileReader();
                reader.onerror = reject;
                reader.onloadend = function () {
                    resolve(reader.result.toString());
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.blobUrlToBase64 = blobUrlToBase64;
const resolveImage = (img) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (img.startsWith("data")) {
                resolve(img);
            }
            else {
                fetch(img)
                    .then(res => res.blob())
                    .then((blob) => __awaiter(void 0, void 0, void 0, function* () {
                    let objectURL = URL.createObjectURL(blob);
                    const base64 = yield exports.blobUrlToBase64(objectURL);
                    resolve(base64);
                })).catch(error => {
                    resolve(undefined);
                });
            }
        }
        catch (error) {
            resolve(undefined);
        }
    }));
};
exports.resolveImage = resolveImage;
const isLoadedInIframe = () => {
    try {
        return window.self !== window.top;
    }
    catch (error) {
        console.log(error);
        return true;
    }
};
exports.isLoadedInIframe = isLoadedInIframe;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastHandler = void 0;
const RequestHandler_1 = __webpack_require__(2);
class ToastHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Show a small toast message to user.
    *
    * @param message - The message you want to show to the user
    *
    */
    showToast(message) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_SHOW_TOAST,
                        data: {
                            message: message
                        }
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve();
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.ToastHandler = ToastHandler;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleHandler = void 0;
const RequestHandler_1 = __webpack_require__(2);
class CircleHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Show prompt to user to get his circle
    */
    getCircle() {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve([
                        "friend_uid_01",
                        "friend_uid_02"
                    ]);
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_GET_CIRCLE
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve(requestable.data);
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.CircleHandler = CircleHandler;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHandler = exports.Payable = exports.CURRENCY_USD = exports.CURRENCY_INR = void 0;
const RequestHandler_1 = __webpack_require__(2);
exports.CURRENCY_INR = "INR";
exports.CURRENCY_USD = "USD";
class Payable {
}
exports.Payable = Payable;
class PaymentHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Show prompt to user to make payment
    *
    * @param payable - The object with payment data
    *
    */
    makePayment(payable) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_MAKE_PAYMENT,
                        data: payable
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve();
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.PaymentHandler = PaymentHandler;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishHandler = void 0;
const RequestHandler_1 = __webpack_require__(2);
const Utility_1 = __webpack_require__(3);
class PublishHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Prompt user to publish broadcast
    *
    * @param files - files to be published
    *
    */
    publish(files) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    const promises = new Array();
                    for (const file of files) {
                        promises.push(Utility_1.blobUrlToBase64(file));
                    }
                    const result = yield Promise.all(promises);
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_PUBLISH,
                        data: {
                            files: result
                        }
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve();
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.PublishHandler = PublishHandler;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatroomHandler = void 0;
const RequestHandler_1 = __webpack_require__(2);
class ChatroomHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Open Famenun chat with @param users
    *
    * @param users - The people with whom you want to open chat
    *
    */
    openChat(...users) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_OPEN_CHAT,
                        data: users
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve();
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.ChatroomHandler = ChatroomHandler;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkHandler = void 0;
const RequestHandler_1 = __webpack_require__(2);
class LinkHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Open link in browser
    *
    * @param link - the link to be opened
    *
    */
    openLink(link) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_OPEN_LINK,
                        data: {
                            link: link
                        }
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve();
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
    * Create short link for your app
    *
    * @param path - the path of your app that ll be opened on click
    *
    */
    createDeepLink(path) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve("https://l.famenun.com/cjinr8u");
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_CREATE_DEEP_LINK,
                        data: {
                            path: path
                        }
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve(requestable.data);
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.LinkHandler = LinkHandler;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGalaxyHandler = void 0;
const RequestHandler_1 = __webpack_require__(2);
class AppGalaxyHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Get All Installed Apps of the user
    */
    getInstalledApps() {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve([
                        {
                            "id": "com.example.app",
                            "version": "1.0.0",
                            "name": "Test App",
                        }
                    ]);
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_GET_INSTALLED_APPS
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve(requestable.data);
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
    * Open app
    * @param app is the id of the app to be opened
    */
    openApp(app) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_OPEN_APP,
                        data: {
                            app: app
                        }
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve();
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
    * Open app profile in app galaxy
    * @param app is the id of the app
    */
    openAppProfile(app) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_OPEN_APP_PROFILE,
                        data: {
                            app: app
                        }
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve();
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.AppGalaxyHandler = AppGalaxyHandler;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationHandler = exports.Notifiable = void 0;
const RequestHandler_1 = __webpack_require__(2);
class Notifiable {
}
exports.Notifiable = Notifiable;
class NotificationHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Open link in browser
    *
    * @param notifiable - object containing notification data
    *
    */
    notify(notifiable) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_NOTIFY,
                        data: notifiable
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve();
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.NotificationHandler = NotificationHandler;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HookHandler = exports.FView = void 0;
class FView {
}
exports.FView = FView;
class HookHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    setContent(availableWidth, fView) {
        if (fView.type !== undefined && fView.type === "image") {
            const image = this.generateStyle(availableWidth, document.createElement("img"), fView);
            image.style.objectFit = fView.scaling === "content" ? 'contain' : 'cover';
            image.setAttribute("src", fView.content);
            return image;
        }
        else {
            if (fView.content !== undefined) {
                if (Array.isArray(fView.content)) {
                    let containerElement;
                    if (fView.flow !== undefined && fView.flow === "over") {
                        const div = this.generateStyle(availableWidth, document.createElement("div"), fView);
                        div.style.display = 'grid';
                        div.style.gridTemplateColumns = '1fr';
                        containerElement = div;
                    }
                    else {
                        const div = this.generateStyle(availableWidth, document.createElement("div"), fView);
                        containerElement = div;
                    }
                    const fViews = JSON.parse(JSON.stringify(fView.content));
                    let consumedWidth = 0;
                    let consumedHeight = 0;
                    let flow = "vertical";
                    if (fView.flow != null) {
                        if (fView.flow === "over") {
                            flow = "over";
                        }
                        if (fView.flow === "horizontal") {
                            flow = "horizontal";
                        }
                    }
                    for (const fView1 of fViews) {
                        if (flow === "horizontal") {
                            if (fView1.width !== undefined && fView1.width !== 0) {
                                consumedWidth = consumedWidth + fView1.width;
                            }
                            else {
                                fView1.width = 100 - consumedWidth > 100 ? 100 : 100 - consumedWidth;
                            }
                        }
                        if (flow === "vertical") {
                            if (fView1.height !== undefined && fView1.height !== 0) {
                                consumedHeight = consumedHeight + fView1.height;
                            }
                            else {
                                fView1.height = 100 - consumedHeight > 100 ? 100 : 100 - consumedHeight;
                            }
                        }
                        containerElement.append(this.setContent(Number(containerElement.style.width.split("px")[0]), fView1));
                    }
                    return containerElement;
                }
                else {
                    const textElement = this.generateStyle(availableWidth, document.createElement("div"), fView);
                    textElement.innerText = fView.content;
                    if (fView.fontSize !== undefined && fView.fontSize != 0) {
                        textElement.style.fontSize = `${fView.fontSize * Number(textElement.style.height.split("px")[0]) * 0.01 * 0.5}px`;
                    }
                    if (fView.fontColor != undefined) {
                        textElement.style.color = fView.fontColor;
                    }
                    return textElement;
                }
            }
        }
    }
    generateStyle(availableWidth, element, fView) {
        element.style.display = 'flex';
        element.style.gridRowStart = '1';
        element.style.gridColumnStart = '1';
        const style = element.style;
        style.contain = 'content';
        element.style.flexFlow = fView.flow === 'horizontal' ? 'row' : 'column';
        // element.style.flex = fView.width !== undefined && fView.width !== 0 ? `${fView.width / 100}` : `1`;
        element.style.width = fView.width !== undefined && fView.width !== 0 ? `${availableWidth * fView.width * 0.01}px` : `${availableWidth}px`;
        if (fView.height !== undefined && fView.height !== 0) {
            element.style.height = `${availableWidth * fView.height * 0.01}px`;
        }
        // margin
        const marginLeft = fView.marginLeft !== undefined && fView.marginLeft !== 0 ? fView.marginLeft : fView.margin !== undefined ? fView.margin : 0;
        const marginTop = fView.marginTop !== undefined && fView.marginTop !== 0 ? fView.marginTop : fView.margin !== undefined ? fView.margin : 0;
        const marginRight = fView.marginRight !== undefined && fView.marginRight !== 0 ? fView.marginRight : fView.margin !== undefined ? fView.margin : 0;
        const marginBottom = fView.marginBottom !== undefined && fView.marginBottom !== 0 ? fView.marginBottom : fView.margin !== undefined ? fView.margin : 0;
        element.style.marginLeft = `${marginLeft * availableWidth * 0.01}px`;
        element.style.marginTop = `${marginTop * availableWidth * 0.01}px`;
        element.style.marginRight = `${marginRight * availableWidth * 0.01}px`;
        element.style.marginBottom = `${marginBottom * availableWidth * 0.01}px`;
        // padding
        const paddingLeft = fView.paddingLeft !== undefined && fView.paddingLeft !== 0 ? fView.paddingLeft : fView.padding !== undefined ? fView.padding : 0;
        const paddingTop = fView.paddingTop !== undefined && fView.paddingTop !== 0 ? fView.paddingTop : fView.padding !== undefined ? fView.padding : 0;
        const paddingRight = fView.paddingRight !== undefined && fView.paddingRight !== 0 ? fView.paddingRight : fView.padding !== undefined ? fView.padding : 0;
        const paddingBottom = fView.paddingBottom !== undefined && fView.paddingBottom !== 0 ? fView.paddingBottom : fView.padding !== undefined ? fView.padding : 0;
        element.style.paddingLeft = `${paddingLeft * availableWidth * 0.01}px`;
        element.style.marginTop = `${paddingTop * availableWidth * 0.01}px`;
        element.style.marginRight = `${paddingRight * availableWidth * 0.01}px`;
        element.style.marginBottom = `${paddingBottom * availableWidth * 0.01}px`;
        // scale
        const scaleX = fView.scaleX != 0 ? fView.scaleX : fView.scale != 0 ? fView.scale : 1;
        const scaleY = fView.scaleY != 0 ? fView.scaleY : fView.scale != 0 ? fView.scale : 1;
        element.style.transform = `scale(${scaleX}, ${scaleY})`;
        // rotation
        const rotateX = fView.rotateX != 0 ? fView.rotateX : fView.rotate;
        const rotateY = fView.rotateY != 0 ? fView.rotateY : fView.rotate;
        element.style.transform = `${element.style.transform} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        const borderRadius = fView.cornerRadius !== undefined ? fView.cornerRadius : 0;
        element.style.borderRadius = `${borderRadius * availableWidth * 0.01}px`;
        // position
        element.style.alignSelf = 'center';
        if (fView.position != undefined) {
            switch (fView.position) {
                case "left":
                    break;
                case "leftTop":
                    break;
                case "top":
                    break;
                case "topRight":
                    break;
                case "right":
                    break;
                case "rightBottom":
                    break;
                case "bottom":
                    break;
                case "bottomLeft":
                    break;
                case "centerVertical":
                    break;
                case "centerHorizontal":
                    break;
            }
        }
        // position
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        element.style.textAlign = 'center';
        if (fView.gravity != undefined) {
            switch (fView.gravity) {
                case "left":
                    break;
                case "leftTop":
                    break;
                case "top":
                    break;
                case "topRight":
                    break;
                case "right":
                    break;
                case "rightBottom":
                    break;
                case "bottom":
                    break;
                case "bottomLeft":
                    break;
                case "centerVertical":
                    break;
                case "centerHorizontal":
                    break;
            }
        }
        return element;
    }
    fViewToHtml(rootView, fView) {
        const element = this.setContent(rootView.offsetWidth, fView);
        if (Number(element.style.height.split("px")[0]) > rootView.offsetWidth) {
            element.style.height = `${rootView.offsetWidth}px`;
        }
        return element;
    }
}
exports.HookHandler = HookHandler;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHandler = void 0;
class PageHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    run(id) {
        return new Promise((resolve, reject) => {
            try {
                console.log(`run : ${id}`);
                // get the default/specific property of the page
                // add famenun app iframe
                var iframe = document.createElement("iframe");
                iframe.setAttribute("id", "page");
                iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("hspace", "0");
                iframe.setAttribute("vspace", "0");
                iframe.setAttribute("src", "https://famenun.com/run/com.famenun.shotme");
                document.body.append(iframe);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.PageHandler = PageHandler;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceHandler = exports.DeviceInfo = void 0;
const RequestHandler_1 = __webpack_require__(2);
class DeviceInfo {
}
exports.DeviceInfo = DeviceInfo;
class DeviceHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Get basic data about the device on which the app is being used
    */
    getDeviceInfo() {
        return new Promise((resolve, reject) => {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve({
                        id: "test_device_id",
                        ip: "1.2.3.4",
                        app: "Famenun Web",
                        os: "Famenun Web OS",
                        theme: "system",
                        notificationAccessToken: "test_notification_access_token"
                    });
                }
                else {
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_GET_DEVICE_INFO
                    }, {
                        onComplete(requestable) {
                            if (!requestable.error) {
                                resolve(requestable.data);
                            }
                            else {
                                reject(requestable.message);
                            }
                        }
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.DeviceHandler = DeviceHandler;


/***/ })
/******/ ]);