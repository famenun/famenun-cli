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
exports.handle = void 0;
var arg_1 = __importDefault(require("arg"));
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var table_1 = require("table");
var ProjectHandler_1 = require("./ProjectHandler");
var COMMAND_CREATE = "create";
var COMMAND_BUILD = "build";
var COMMAND_HELP = "help";
var parseArgumentsIntoOptions = function (rawArgs) {
    var args = (0, arg_1.default)({
        "--yes": Boolean,
        "--help": Boolean,
        "-y": "--yes",
        "-h": "--help",
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        command: args._[0],
        name: args._[1],
        skipPrompts: args["--yes"] || false,
        help: args["--help"] || false,
    };
};
var promptForMissingOptions = function (options) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var defaultId, defaultName, defaultColor, projectQuestions, projectAnswers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!(0, ProjectHandler_1.isDirectoryFamenunProject)()) return [3 /*break*/, 4];
                    defaultId = "com.example.app";
                    defaultName = path_1.default.basename(path_1.default.resolve(process.cwd()));
                    defaultColor = "#1df2a1";
                    if (!options.skipPrompts) return [3 /*break*/, 1];
                    resolve(__assign(__assign({}, options), { name: options.name, runInstall: options.runInstall || false, data: {
                            id: defaultId,
                            name: defaultName,
                            color: defaultColor
                        } }));
                    return [3 /*break*/, 3];
                case 1:
                    projectQuestions = [];
                    projectQuestions.push({
                        type: "input",
                        name: "id",
                        message: "Id of the project (Ex. com.example.app) :\"",
                        default: defaultId,
                    });
                    if (options.name === undefined) {
                        projectQuestions.push({
                            type: "input",
                            name: "name",
                            message: "Name of the project:\"",
                            default: defaultName,
                        });
                    }
                    projectQuestions.push({
                        type: "input",
                        name: "color",
                        message: "Theme color (Ex. #1df2a1) :",
                        default: defaultColor,
                    });
                    return [4 /*yield*/, inquirer_1.default.prompt(projectQuestions)];
                case 2:
                    projectAnswers = _a.sent();
                    resolve(__assign(__assign({}, options), { data: {
                            id: projectAnswers.id || defaultId,
                            name: options.name || projectAnswers.name || defaultName,
                            color: projectAnswers.color || "#1df2a1",
                        } }));
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    console.log(chalk_1.default.bgRed.bold("ERROR") + chalk_1.default.yellow(" This is already a project directory !"));
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
var showHelpTable = function () {
    console.log("");
    console.log(chalk_1.default.yellow.bold("@famenun/cli supports the follwoing commands : "));
    console.log("");
    var output = (0, table_1.table)([
        ["create", "Create new project", "Expects one optional argument i.e. project name"],
        ["build", "Build Famenun App Package (.fap) file ", "Expects one optional argument i.e. project directory"],
        ["help", "All Available commands", ""],
        ["-y or --yes", "Create project with default values", ""],
        ["-i or --install", "Install SDK by default", ""],
        ["-h or --help", "About command", ""]
    ], {
        columns: {
            0: {
                alignment: "left",
                width: 15
            },
            1: {
                alignment: "center",
                width: 35
            },
            2: {
                alignment: "center",
                width: 35
            }
        }
    });
    console.log(chalk_1.default.yellow.bold(output));
};
var handle = function (args) {
    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = parseArgumentsIntoOptions(args);
                    if (options.command === undefined) {
                        options.command = "";
                        showHelpTable();
                    }
                    _a = options.command.toLowerCase();
                    switch (_a) {
                        case COMMAND_CREATE: return [3 /*break*/, 1];
                        case COMMAND_BUILD: return [3 /*break*/, 10];
                        case COMMAND_HELP: return [3 /*break*/, 14];
                    }
                    return [3 /*break*/, 15];
                case 1:
                    if (!options.help) return [3 /*break*/, 2];
                    console.log(chalk_1.default.bgYellow.bold("HELP") +
                        chalk_1.default.yellow(" With '".concat(options.command, "' you can create new famenun app template in the current directory")));
                    return [3 /*break*/, 9];
                case 2:
                    if (!!(0, ProjectHandler_1.isDirectoryFamenunProject)()) return [3 /*break*/, 8];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, promptForMissingOptions(options)];
                case 4:
                    options = _b.sent();
                    return [4 /*yield*/, (0, ProjectHandler_1.createProject)(options)];
                case 5:
                    _b.sent();
                    console.log(chalk_1.default.bgGreen.bold("SUCCESS") + chalk_1.default.green(" Project created successfully !"));
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    console.log(chalk_1.default.bgRed.bold("ERROR") + chalk_1.default.yellow(error_1));
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.log(chalk_1.default.bgRed.bold("ERROR") + chalk_1.default.yellow("Current directory already contains a Famenun App"));
                    _b.label = 9;
                case 9: return [3 /*break*/, 16];
                case 10:
                    if (!options.help) return [3 /*break*/, 11];
                    console.log(chalk_1.default.bgYellow.bold("HELP") +
                        chalk_1.default.yellow(" With '".concat(options.command, "' you can build your famenun app in current directory. This command should be executed in the directory where the f.app.json file lies")));
                    return [3 /*break*/, 13];
                case 11: return [4 /*yield*/, (0, ProjectHandler_1.buildProject)(process.argv[3])];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [3 /*break*/, 16];
                case 14:
                    showHelpTable();
                    return [3 /*break*/, 16];
                case 15:
                    console.log(chalk_1.default.bgRed.bold("ERROR") + chalk_1.default.yellow(" Unknown command '".concat(options.command, "'")));
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    }); }, 0);
};
exports.handle = handle;
