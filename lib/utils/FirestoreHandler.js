"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FirestoreHandler = /** @class */ (function () {
    function FirestoreHandler(firebaseHandler) {
        this.firebaseHandler = firebaseHandler;
    }
    FirestoreHandler.prototype.printUser = function () {
        console.log(this.firebaseHandler.getAuth());
        /* this.firebaseHandler
            .getFirestore()
            .doc(`Accounts/${this.firebaseHandler.getAuth().currentUser}`)
            .get().then((doc) => {
                console.log(JSON.stringify(doc.data()));
            }).catch((error) => {
                console.log(error);
            }); */
    };
    return FirestoreHandler;
}());
exports.FirestoreHandler = FirestoreHandler;
