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
exports.validateManifest = exports.Manifest = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var mics_utils_1 = require("./mics.utils");
var Manifest = /** @class */ (function () {
    function Manifest() {
    }
    return Manifest;
}());
exports.Manifest = Manifest;
var validateManifest = function (dir) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var manifestFile, data, json, manifest, iconFile, entryFile, hooks, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    manifestFile = path_1.default.resolve(dir || process.cwd(), "f.app.json");
                    if (!fs_1.default.existsSync(manifestFile)) {
                        reject("f.app.json not found in the " + (dir || process.cwd()) + ". It seems, this directory is not a Famenun app project directory");
                        return [2 /*return*/];
                    }
                    data = fs_1.default.readFileSync(manifestFile, {
                        encoding: "utf8"
                    });
                    return [4 /*yield*/, mics_utils_1.parseJson(data)];
                case 1:
                    json = _a.sent();
                    manifest = JSON.parse(json);
                    // validate id
                    if (manifest.id === undefined || manifest.id == null || manifest.id.length === 0) {
                        reject("App id must be provided in f.app.json");
                        return [2 /*return*/];
                    }
                    if (!/^([a-zA-Z0-9-]+)$/.test(manifest.id)) {
                        reject("App id must follow the regex pattern /^([a-zA-Z0-9-]+)$/");
                        return [2 /*return*/];
                    }
                    // version
                    if (manifest.version === undefined || manifest.version == null || manifest.version.length === 0) {
                        console.log(chalk_1.default.bgRed.bold("WARN") + chalk_1.default.yellow(" App version not provided in f.app.json ! It will help in getting better app analytics in Devs Console."));
                    }
                    if (manifest.version !== undefined && manifest.version.length > 51) {
                        reject("App version must be less than 51 chars");
                        return [2 /*return*/];
                    }
                    // icon
                    if (manifest.icon === undefined || manifest.icon == null || manifest.icon.length === 0) {
                        reject("App icon file path must be provided in f.app.json");
                        return [2 /*return*/];
                    }
                    iconFile = path_1.default.resolve(dir || process.cwd(), manifest.icon);
                    if (!fs_1.default.existsSync(iconFile)) {
                        reject("App icon file does not exists at " + iconFile);
                        return [2 /*return*/];
                    }
                    if (manifest.name === undefined || manifest.name == null || manifest.name.length === 0) {
                        reject("App name must be provided in f.app.json");
                        return [2 /*return*/];
                    }
                    // name
                    if (manifest.name.length > 51) {
                        reject("App name must be less than 51 chars");
                        return [2 /*return*/];
                    }
                    // entry
                    if (manifest.entry === undefined || manifest.entry == null || manifest.entry.length === 0) {
                        reject("App entry file path must be provided in f.app.json");
                        return [2 /*return*/];
                    }
                    entryFile = path_1.default.resolve(dir || process.cwd(), manifest.entry);
                    if (!fs_1.default.existsSync(entryFile)) {
                        reject("App entry file does not exists at " + iconFile);
                        return [2 /*return*/];
                    }
                    // color
                    if (manifest.color === undefined || manifest.color == null || manifest.color.length === 0) {
                        console.log(chalk_1.default.bgRed.bold("WARN") + chalk_1.default.yellow(" App theme color not provided in f.app.json !"));
                    }
                    if (manifest.color !== undefined && !/^#[0-9a-f]{6}/.test(manifest.color)) {
                        reject("App color must follow the regex pattern /^#[0-9a-f]{6}/");
                        return [2 /*return*/];
                    }
                    // hooks
                    if (manifest.hooks === undefined) {
                        console.log(chalk_1.default.bgRed.bold("TIP") + chalk_1.default.yellow(" No hooks provided in f.app.json ! You could make your app more engaging by using hooks."));
                    }
                    if (manifest.hooks !== undefined) {
                        hooks = mics_utils_1.mapFromObject(manifest.hooks);
                        hooks.forEach(function (value, key) {
                            var hookFile = path_1.default.resolve(dir || process.cwd(), value);
                            if (!fs_1.default.existsSync(hookFile)) {
                                reject("App hook file for " + key + " does not exists at " + hookFile);
                                return;
                            }
                        });
                    }
                    resolve();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    reject(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.validateManifest = validateManifest;
