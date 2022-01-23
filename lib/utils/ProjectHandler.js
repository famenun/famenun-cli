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
exports.isDirectoryFamenunProject = exports.buildProject = exports.createProject = void 0;
var fs_1 = __importDefault(require("fs"));
var ncp_1 = __importDefault(require("ncp"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var figlet_1 = __importDefault(require("figlet"));
var listr_1 = __importDefault(require("listr"));
var jszip_1 = __importDefault(require("jszip"));
var FilesHandler_1 = require("./FilesHandler");
var createManifest = function (options) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var manifest, manifestFile;
        return __generator(this, function (_a) {
            manifest = {
                version: "1.0.0",
                id: options.data.id,
                name: options.data.name,
                color: options.data.color,
                entry: "./index.html"
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
    }); });
};
var copyTemplateFiles = function (options) {
    return new Promise(function (resolve, reject) {
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
    });
};
var createFAP = function (dir) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var zip, projectPath, files, _i, files_1, file, filePath, fapFilePath;
        return __generator(this, function (_a) {
            try {
                zip = new jszip_1.default();
                projectPath = dir !== undefined ? path_1.default.resolve(process.cwd(), dir) : process.cwd();
                files = (0, FilesHandler_1.getFilesRecursively)(projectPath);
                // console.log(JSON.stringify(files));
                for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                    file = files_1[_i];
                    filePath = file.split(projectPath)[1];
                    zip.file(filePath, fs_1.default.createReadStream(file));
                }
                fapFilePath = path_1.default.resolve(projectPath, "".concat(projectPath.split("/")[projectPath.split("/").length - 1], ".fap"));
                zip
                    .generateNodeStream({ type: 'nodebuffer', streamFiles: true }, function (metadata) {
                    var rawProg = metadata.percent || 0;
                    var progress = rawProg.toFixed(2);
                })
                    .pipe(fs_1.default.createWriteStream(fapFilePath))
                    .on('finish', function () {
                    resolve();
                });
            }
            catch (error) {
                reject(error);
            }
            return [2 /*return*/];
        });
    }); });
};
var createProject = function (options) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var tasks, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    (0, clear_1.default)();
                    console.log(chalk_1.default.yellow(figlet_1.default.textSync("Famenun", { horizontalLayout: "full" })));
                    options = __assign(__assign({}, options), { targetDirectory: options.targetDirectory || process.cwd(), templateDirectory: path_1.default.resolve(__dirname, "../../template") });
                    tasks = new listr_1.default([
                        {
                            title: "Copy project template files",
                            task: function () { return copyTemplateFiles(options); },
                        },
                        {
                            title: "Create f.app.json",
                            task: function () { return createManifest(options); },
                        }
                    ]);
                    return [4 /*yield*/, tasks.run()];
                case 1:
                    _a.sent();
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
exports.createProject = createProject;
var buildProject = function (path) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var tasks, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!(0, exports.isDirectoryFamenunProject)(path)) return [3 /*break*/, 2];
                    tasks = new listr_1.default([
                        {
                            title: "Build App",
                            task: function () { return createFAP(path); }
                        }
                    ]);
                    return [4 /*yield*/, tasks.run()];
                case 1:
                    _a.sent();
                    resolve();
                    return [3 /*break*/, 3];
                case 2:
                    reject("Not a Famenun project directory");
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    reject(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
exports.buildProject = buildProject;
var isDirectoryFamenunProject = function (dir) {
    var manifestFile = path_1.default.resolve(dir || process.cwd(), "f.app.json");
    return fs_1.default.existsSync(manifestFile);
};
exports.isDirectoryFamenunProject = isDirectoryFamenunProject;
