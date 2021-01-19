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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var os_1 = __importDefault(require("os"));
var inquirer_1 = __importDefault(require("inquirer"));
var listr_1 = __importDefault(require("listr"));
var ServerHandler_1 = require("./ServerHandler");
var chalk_1 = __importDefault(require("chalk"));
var PrefsHandler_1 = require("./PrefsHandler");
var Device = /** @class */ (function () {
    function Device() {
    }
    return Device;
}());
var AuthHandler = /** @class */ (function () {
    function AuthHandler() {
    }
    AuthHandler.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var sessionTokenResult, sessionToken, tasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.promptForSessionToken()];
                    case 1:
                        sessionTokenResult = _a.sent();
                        sessionToken = sessionTokenResult.sessionToken;
                        tasks = new listr_1.default([
                            {
                                title: "Verify session token",
                                task: function () { return _this.authorise(sessionToken); }
                            }
                        ]);
                        tasks.run()
                            .then(function (value) {
                            resolve();
                        }, function (error) {
                            reject(error);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AuthHandler.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var serverHandler;
            return __generator(this, function (_a) {
                serverHandler = new ServerHandler_1.ServerHandler({
                    onCallback: function (body) {
                        serverHandler.stop();
                        resolve();
                    },
                    onError: function (error) {
                        console.log(error);
                        serverHandler.stop();
                        reject(error);
                    },
                    onServerStarted: function () {
                        serverHandler.execute("http://localhost:4200/firebase?action=logout");
                    },
                    onServerStopped: function () {
                        resolve();
                    }
                });
                return [2 /*return*/];
            });
        }); });
    };
    AuthHandler.prototype.authorise = function (sessionToken) {
        var _this = this;
        var api = "http://us-central1-famenun-2943.cloudfunctions.net/apisGetSessionToken";
        return new Promise(function (resolve, reject) {
            request_1.default.post(api, {
                json: JSON.parse(JSON.stringify({
                    "ky": sessionToken,
                    "de": JSON.stringify(_this.getDevice())
                }))
            }, function (error, res, body) {
                if (error) {
                    reject(error);
                }
                else {
                    if (body.error) {
                        reject(body.message);
                    }
                    else {
                        // TODO: get public profile here
                        new PrefsHandler_1.PrefsHandler().write({
                            "sessionToken": body.data
                        }).then(function () {
                            resolve();
                        }).catch(function (error) {
                            reject(error);
                        });
                    }
                }
            });
        });
    };
    AuthHandler.prototype.promptForSessionToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var instruction, defaultSessionToken, questions, answers;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    instruction = "For getting Session Token log into Famenun App, Go to Settings > Sessions and click on + to create a new session key.";
                                    console.log(chalk_1.default.bgYellow.black(instruction));
                                    defaultSessionToken = "";
                                    questions = [];
                                    questions.push({
                                        type: "input",
                                        name: "sessionToken",
                                        message: "Session key: "
                                    });
                                    return [4 /*yield*/, inquirer_1.default.prompt(questions)];
                                case 1:
                                    answers = _a.sent();
                                    resolve({
                                        sessionToken: answers.sessionToken || defaultSessionToken
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    AuthHandler.prototype.getDevice = function () {
        return {
            id: this.getIp(),
            os: this.getOs(),
            na: this.getName(),
            ap: this.getApp()
        };
    };
    AuthHandler.prototype.getIp = function () {
        var ip = "";
        var ifaces = os_1.default.networkInterfaces();
        Object.keys(ifaces).forEach(function (ifname) {
            var alias = 0;
            ifaces[ifname].forEach(function (iface) {
                if ("IPv4" !== iface.family || iface.internal !== false) {
                    return;
                }
                ip = iface.address;
                ++alias;
            });
        });
        return ip;
    };
    AuthHandler.prototype.getName = function () {
        return os_1.default.hostname();
    };
    AuthHandler.prototype.getOs = function () {
        return process.platform;
    };
    AuthHandler.prototype.getApp = function () {
        return "Famenun Cli";
    };
    return AuthHandler;
}());
exports.AuthHandler = AuthHandler;
