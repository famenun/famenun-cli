"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = __importStar(require("firebase/app"));
require("firebase/auth");
require("firebase/firestore");
exports.PERSISTANCE_POLICY_LOCAL = firebase.auth.Auth.Persistence.LOCAL;
var FirebaseHandler = /** @class */ (function () {
    function FirebaseHandler() {
        this.app = firebase.initializeApp({
            apiKey: "AIzaSyCmNHYzjvDCbZdeO2IWJhYO55U6-3Hh-6M",
            authDomain: "famenun-2943.firebaseapp.com",
            databaseURL: "https://famenun-2943.firebaseio.com",
            projectId: "famenun-2943",
            storageBucket: "famenun-2943.appspot.com"
        });
    }
    FirebaseHandler.prototype.getApp = function () {
        return this.app;
    };
    FirebaseHandler.prototype.getAuth = function () {
        return this.app.auth();
    };
    FirebaseHandler.prototype.getFirestore = function () {
        return this.app.firestore();
    };
    FirebaseHandler.prototype.getStorage = function () {
        return this.app.storage();
    };
    return FirebaseHandler;
}());
exports.FirebaseHandler = FirebaseHandler;
