"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var isDirectory = function (path) { return fs_1.statSync(path).isDirectory(); };
var getDirectories = function (path) {
    return fs_1.readdirSync(path).map(function (name) { return path_1.join(path, name); }).filter(isDirectory);
};
var isFile = function (path) { return fs_1.statSync(path).isFile(); };
var getFiles = function (path) {
    return fs_1.readdirSync(path).map(function (name) { return path_1.join(path, name); }).filter(isFile);
};
exports.getFilesRecursively = function (path) {
    var dirs = getDirectories(path);
    var files = dirs
        .map(function (dir) { return exports.getFilesRecursively(dir); }) // go through each directory
        .reduce(function (a, b) { return a.concat(b); }, []); // map returns a 2d array (array of file arrays) so flatten
    return files.concat(getFiles(path));
};
