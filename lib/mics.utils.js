"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectFromMap = exports.mapFromObject = exports.parseJson = void 0;
var minify = function (json) {
    var tokenizer = /"|(\/\*)|(\*\/)|(\/\/)|\n|\r/g, in_string = false, in_multiline_comment = false, in_singleline_comment = false, tmp, tmp2, new_str = [], ns = 0, from = 0, lc, rc;
    tokenizer.lastIndex = 0;
    while (tmp = tokenizer.exec(json)) {
        var regExp = RegExp;
        lc = regExp.leftContext;
        rc = regExp.rightContext;
        if (!in_multiline_comment && !in_singleline_comment) {
            tmp2 = lc.substring(from);
            if (!in_string) {
                tmp2 = tmp2.replace(/(\n|\r|\s)*/g, "");
            }
            new_str[ns++] = tmp2;
        }
        from = tokenizer.lastIndex;
        if (tmp[0] == "\"" && !in_multiline_comment && !in_singleline_comment) {
            tmp2 = lc.match(/(\\)*$/);
            if (!in_string || !tmp2 || (tmp2[0].length % 2) == 0) { // start of string with ", or unescaped " character found to end string
                in_string = !in_string;
            }
            from--; // include " character in next catch
            rc = json.substring(from);
        }
        else if (tmp[0] == "/*" && !in_string && !in_multiline_comment && !in_singleline_comment) {
            in_multiline_comment = true;
        }
        else if (tmp[0] == "*/" && !in_string && in_multiline_comment && !in_singleline_comment) {
            in_multiline_comment = false;
        }
        else if (tmp[0] == "//" && !in_string && !in_multiline_comment && !in_singleline_comment) {
            in_singleline_comment = true;
        }
        else if ((tmp[0] == "\n" || tmp[0] == "\r") && !in_string && !in_multiline_comment && in_singleline_comment) {
            in_singleline_comment = false;
        }
        else if (!in_multiline_comment && !in_singleline_comment && !(/\n|\r|\s/.test(tmp[0]))) {
            new_str[ns++] = tmp[0];
        }
    }
    new_str[ns++] = rc;
    return new_str.join("");
};
var parseJson = function (str) {
    return new Promise(function (resolve, reject) {
        try {
            var json = minify(str);
            resolve(json);
        }
        catch (error) {
            reject("Error parsing json :(");
        }
    });
};
exports.parseJson = parseJson;
var mapFromObject = function (object) {
    var map = new Map();
    if (object !== undefined) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                map.set(key, object[key]);
            }
            ;
        }
    }
    return map;
};
exports.mapFromObject = mapFromObject;
var objectFromMap = function (map) {
    var object = {};
    map.forEach(function (value, key) {
        object[key] = value;
    });
    return object;
};
exports.objectFromMap = objectFromMap;
