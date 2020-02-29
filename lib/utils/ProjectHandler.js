"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var fs_1 = __importDefault(require("fs"));
var ncp_1 = __importDefault(require("ncp"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var figlet_1 = __importDefault(require("figlet"));
var listr_1 = __importDefault(require("listr"));
var child_process_1 = require("child_process");
var ServerHandler_1 = require("./ServerHandler");
var ProjectHandler = /** @class */ (function () {
    function ProjectHandler() {
    }
    ProjectHandler.installSDK = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            child_process_1.exec("npm init -y", function (error, stdout, stderr) {
                                if (!error) {
                                    child_process_1.exec("npm i @famenun/sdk", function (error, stdout, stderr) {
                                        if (!error) {
                                            resolve();
                                        }
                                        else {
                                            reject(stderr);
                                        }
                                    });
                                }
                                else {
                                    reject(stderr);
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ProjectHandler.createManifest = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var manifest, manifestFile;
                        return __generator(this, function (_a) {
                            manifest = {
                                version: "1.0.0",
                                id: options.data.id,
                                name: options.data.name,
                                about: options.data.about,
                                tags: options.data.tags.trim().split(" "),
                                entry: "index.html",
                                permissions: [],
                                handlers: []
                            };
                            manifestFile = path_1.default.resolve(process.cwd(), "f.app.json");
                            fs_1.default.writeFile(manifestFile, JSON.stringify(manifest), function (err) {
                                if (!err) {
                                    resolve();
                                }
                                else {
                                    reject(err);
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ProjectHandler.copyTemplateFiles = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        ncp_1.default.ncp(options.templateDirectory, options.targetDirectory, function (err) {
                            if (!err) {
                                resolve({
                                    clobber: false,
                                });
                            }
                            else {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    ProjectHandler.createProject = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var tasks;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    clear_1.default();
                                    console.log(chalk_1.default.yellow(figlet_1.default.textSync("Famenun", { horizontalLayout: "full" })));
                                    options = __assign(__assign({}, options), { targetDirectory: options.targetDirectory || process.cwd(), templateDirectory: path_1.default.resolve(__dirname, "../../templates", "app") });
                                    tasks = new listr_1.default([
                                        {
                                            title: "Copy project template files",
                                            task: function () { return ProjectHandler.copyTemplateFiles(options); },
                                        },
                                        {
                                            title: "Create manifest.json",
                                            task: function () { return ProjectHandler.createManifest(options); },
                                        },
                                        {
                                            title: "Install dependencies",
                                            task: function () { return ProjectHandler.installSDK(); },
                                            skip: function () {
                                                return !options.runInstall
                                                    ? "Pass --install to automatically install dependencies"
                                                    : undefined;
                                            },
                                        },
                                    ]);
                                    return [4 /*yield*/, tasks.run()];
                                case 1:
                                    _a.sent();
                                    resolve(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ProjectHandler.publish = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var tasks;
                        return __generator(this, function (_a) {
                            tasks = new listr_1.default([
                                {
                                    title: "Upload App",
                                    task: function () { return ProjectHandler.upload("C:\\Program Files\\NodeProjects\\famenun\\sdk\\app.zip"); }
                                }
                            ]);
                            tasks.run()
                                .then(function () {
                                resolve();
                            }).catch(function (error) {
                                reject(error);
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ProjectHandler.upload = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var serverHandler;
                        return __generator(this, function (_a) {
                            serverHandler = new ServerHandler_1.ServerHandler({
                                onCallback: function (body) {
                                    console.log("body : " + body);
                                    serverHandler.stop();
                                    resolve();
                                },
                                onError: function (error) {
                                    serverHandler.stop();
                                    reject(error);
                                },
                                onServerStarted: function () {
                                    serverHandler.execute("http://localhost:4200/firebase?action=upload&file=" + file);
                                },
                                onServerStopped: function () {
                                    //
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    return ProjectHandler;
}());
exports.ProjectHandler = ProjectHandler;
