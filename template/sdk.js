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
const ClubsHandler_1 = __webpack_require__(5);
const PaymentsHandler_1 = __webpack_require__(6);
const BroadcastHandler_1 = __webpack_require__(7);
const ChatroomsHandler_1 = __webpack_require__(8);
const LinksHandler_1 = __webpack_require__(9);
const AppGalaxyHandler_1 = __webpack_require__(10);
const NotificationsHandler_1 = __webpack_require__(11);
const RequestHandler_1 = __webpack_require__(2);
const DeviceHandler_1 = __webpack_require__(12);
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
            clubsHandler: new ClubsHandler_1.ClubsHandler(requestHandler),
            paymentsHandler: new PaymentsHandler_1.PaymentsHandler(requestHandler),
            broadcastHandler: new BroadcastHandler_1.BroadcastHandler(requestHandler),
            chatroomsHandler: new ChatroomsHandler_1.ChatroomsHandler(requestHandler),
            appGalaxyHandler: new AppGalaxyHandler_1.AppGalaxyHandler(requestHandler),
            toastHandler: new ToastHandler_1.ToastHandler(requestHandler),
            linksHandler: new LinksHandler_1.LinksHandler(requestHandler),
            notificationsHandler: new NotificationsHandler_1.NotificationsHandler(requestHandler),
            deviceHandler: new DeviceHandler_1.DeviceHandler(requestHandler)
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
                    profileShortcut.icon = yield (0, Utility_1.resolveImage)(profileShortcut.icon);
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
    * Get verified mobile number access token
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
exports.RequestHandler = exports.Requestable = exports.API_HOOK = exports.API_GET_DEVICE_INFO = exports.API_NOTIFY = exports.API_CREATE_DEEP_LINK = exports.API_OPEN_LINK = exports.API_SHOW_TOAST = exports.API_OPEN_APP = exports.API_OPEN_CHAT = exports.API_BROADCAST = exports.API_MAKE_PAYMENT = exports.API_GET_CLUB = exports.API_GET_PHONE_NUMBER = exports.API_GET_EMAIL = exports.API_CREATE_SHORTCUT = exports.API_GET_PROFILE = void 0;
const Utility_1 = __webpack_require__(3);
exports.API_GET_PROFILE = "API_GET_PROFILE";
exports.API_CREATE_SHORTCUT = "API_CREATE_SHORTCUT";
exports.API_GET_EMAIL = "API_GET_EMAIL";
exports.API_GET_PHONE_NUMBER = "API_GET_PHONE_NUMBER";
exports.API_GET_CLUB = "API_GET_CLUB";
exports.API_MAKE_PAYMENT = "API_MAKE_PAYMENT";
exports.API_BROADCAST = "API_BROADCAST";
exports.API_OPEN_CHAT = "API_OPEN_CHAT";
exports.API_OPEN_APP = "API_OPEN_APP";
exports.API_SHOW_TOAST = "API_SHOW_TOAST";
exports.API_OPEN_LINK = "API_OPEN_LINK";
exports.API_CREATE_DEEP_LINK = "API_CREATE_DEEP_LINK";
exports.API_NOTIFY = "API_NOTIFY";
exports.API_GET_DEVICE_INFO = "API_GET_DEVICE_INFO";
exports.API_HOOK = "API_HOOK";
const API_GET_PROFILE_RESPONSE = "API_GET_PROFILE_RESPONSE";
const API_CREATE_SHORTCUT_RESPONSE = "API_CREATE_SHORTCUT_RESPONSE";
const API_GET_EMAIL_RESPONSE = "API_GET_EMAIL_RESPONSE";
const API_GET_PHONE_NUMBER_RESPONSE = "API_GET_PHONE_NUMBER_RESPONSE";
const API_GET_CLUB_RESPONSE = "API_GET_CLUB_RESPONSE";
const API_MAKE_PAYMENT_RESPONSE = "API_MAKE_PAYMENT_RESPONSE";
const API_BROADCAST_RESPONSE = "API_BROADCAST_RESPONSE";
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
        if ((0, Utility_1.isLoadedInIframe)()) {
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
                                case API_GET_CLUB_RESPONSE:
                                case API_MAKE_PAYMENT_RESPONSE:
                                case API_BROADCAST_RESPONSE:
                                case API_OPEN_CHAT_RESPONSE:
                                case API_GET_INSTALLED_APPS_RESPONSE:
                                case API_OPEN_APP_RESPONSE:
                                case API_OPEN_APP_PROFILE_RESPONSE:
                                case API_SHOW_TOAST_RESPONSE:
                                case API_OPEN_LINK_RESPONSE:
                                case API_CREATE_DEEP_LINK_RESPONSE:
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
                            case API_GET_CLUB_RESPONSE:
                            case API_MAKE_PAYMENT_RESPONSE:
                            case API_BROADCAST_RESPONSE:
                            case API_OPEN_CHAT_RESPONSE:
                            case API_GET_INSTALLED_APPS_RESPONSE:
                            case API_OPEN_APP_RESPONSE:
                            case API_OPEN_APP_PROFILE_RESPONSE:
                            case API_SHOW_TOAST_RESPONSE:
                            case API_INSERT_DATA_RESPONSE:
                            case API_GET_DATA_RESPONSE:
                            case API_OPEN_LINK_RESPONSE:
                            case API_CREATE_DEEP_LINK_RESPONSE:
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
        if ((0, Utility_1.isLoadedInIframe)()) {
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
                    const base64 = yield (0, exports.blobUrlToBase64)(objectURL);
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
exports.ClubsHandler = void 0;
const RequestHandler_1 = __webpack_require__(2);
class ClubsHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Show prompt to user to get his circle
    */
    getClub() {
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
                        api: RequestHandler_1.API_GET_CLUB
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
exports.ClubsHandler = ClubsHandler;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsHandler = exports.Payable = exports.CURRENCY_USD = exports.CURRENCY_INR = void 0;
const RequestHandler_1 = __webpack_require__(2);
exports.CURRENCY_INR = "INR";
exports.CURRENCY_USD = "USD";
class Payable {
}
exports.Payable = Payable;
class PaymentsHandler {
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
exports.PaymentsHandler = PaymentsHandler;


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
exports.BroadcastHandler = void 0;
const RequestHandler_1 = __webpack_require__(2);
const Utility_1 = __webpack_require__(3);
class BroadcastHandler {
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
    * Prompt user to broadcast
    *
    * @param files - files to be broadcasted
    *
    */
    broadcast(files) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if ((_a = this.requestHandler) === null || _a === void 0 ? void 0 : _a.debug) {
                    resolve();
                }
                else {
                    const promises = new Array();
                    for (const file of files) {
                        promises.push((0, Utility_1.blobUrlToBase64)(file));
                    }
                    const result = yield Promise.all(promises);
                    (_b = this.requestHandler) === null || _b === void 0 ? void 0 : _b.request({
                        id: "request_id",
                        api: RequestHandler_1.API_BROADCAST,
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
exports.BroadcastHandler = BroadcastHandler;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatroomsHandler = void 0;
const RequestHandler_1 = __webpack_require__(2);
class ChatroomsHandler {
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
exports.ChatroomsHandler = ChatroomsHandler;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksHandler = exports.Linkable = void 0;
const RequestHandler_1 = __webpack_require__(2);
class Linkable {
}
exports.Linkable = Linkable;
class LinksHandler {
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
    createDeepLink(linkable) {
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
                        data: linkable
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
exports.LinksHandler = LinksHandler;


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
}
exports.AppGalaxyHandler = AppGalaxyHandler;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsHandler = exports.Notifiable = void 0;
const RequestHandler_1 = __webpack_require__(2);
class Notifiable {
}
exports.Notifiable = Notifiable;
class NotificationsHandler {
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
exports.NotificationsHandler = NotificationsHandler;


/***/ }),
/* 12 */
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