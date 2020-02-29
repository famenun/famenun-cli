import express from "express";
import bodyParser from "body-parser";
import path from "path";
import open from "open";
import { Callback } from "../models/Callback";

const PUBLIC_DIR = path.resolve(__dirname, "../../public");

export interface ServerCallbackListener {

    onCallback(body: any): void;
    onError(error: string): void;

    onServerStarted(): void;
    onServerStopped(): void;

}

export class ServerHandler {

    private server: any;
    private serverCallbackListener: ServerCallbackListener;

    constructor(serverCallbackListener: ServerCallbackListener) {
        this.serverCallbackListener = serverCallbackListener;
        const app = express();
        app.use(express.static(PUBLIC_DIR));
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(bodyParser.json());

        app.get("/firebase", (req: any, res: any) => {
            res.sendFile("firebase.html", { root: PUBLIC_DIR });
        });
        app.post("/firebase-callback", (req: any, res: any) => {
            const error = (req.body.error === "true");
            if (error) {
                this.serverCallbackListener.onError(req.body.message);
            } else {
                this.serverCallbackListener.onCallback(req.body.data);
            }
        });
        this.server = app.listen(4200, () => {
            this.serverCallbackListener.onServerStarted();
        });
    }

    public execute(url: string): void {
        setTimeout(async () => {
            await open(url);
        }, 0);
    }

    public stop(): void {
        this.server.close(() => {
            this.serverCallbackListener.onServerStopped();
        });
    }

}