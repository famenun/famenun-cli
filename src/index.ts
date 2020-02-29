import request from "request";

import { AuthHandler } from "./utils/AuthHandler";
import { ServerHandler } from "./utils/ServerHandler";

setTimeout(async () => {

    /* request.post({
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "http://localhost:4200/login",
        form: {
            sessionToken: "M4utLhZgDvToRVo3MNGv"
        }
    }, (error, response, body) => {
        if (error) {
            console.log("error : " + error);
        } else {
            console.log("body : " + JSON.stringify(body));
        }
    }); */

    // create server

    // make a get request to server 

    // print results

    /* const firestoreHandler: FirestoreHandler = new FirestoreHandler(new FirebaseHandler());
    firestoreHandler.printUser(); */

    /*
    const authHandler: AuthHandler = new AuthHandler(new FirebaseHandler());
    authHandler.login("test-token").then((response) => {
        console.log("response: " + response);
    }).catch((error) => {
        console.log("error : " + error);
    }); */

    /* const collection = await new FirebaseHandler().getFirestore().collection("Test").get();
    collection.forEach((doc) => {
        console.log(JSON.stringify(doc.data()));
    }); */

}, 0);