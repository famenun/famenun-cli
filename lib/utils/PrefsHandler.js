"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var PREFS_FILE = path_1.default.resolve(__dirname, "../../prefs/prefs.json");
var PrefsHandler = /** @class */ (function () {
    function PrefsHandler() {
    }
    PrefsHandler.prototype.write = function (data) {
        return new Promise(function (resolve, reject) {
            fs_1.default.writeFile(PREFS_FILE, JSON.stringify(data), function (err) {
                if (!err) {
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    };
    PrefsHandler.prototype.read = function () {
        return new Promise(function (resolve, reject) {
            fs_1.default.readFile(PREFS_FILE, { encoding: "utf-8" }, function (err, data) {
                if (!err) {
                    resolve(JSON.parse(data));
                }
                else {
                    reject(err);
                }
            });
        });
    };
    return PrefsHandler;
}());
exports.PrefsHandler = PrefsHandler;
