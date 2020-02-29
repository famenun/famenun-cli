import request from "request";
import os from "os";
import inquirer from "inquirer";
import Listr from "listr";

import { ServerHandler } from "./ServerHandler";
import chalk from "chalk";
import { PrefsHandler } from "./PrefsHandler";

class Device {
    public id: string | undefined;
    public os: string | undefined;
    public na: string | undefined;
    public ap: string | undefined;
}

export class AuthHandler {

    public login(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const sessionTokenResult = await this.promptForSessionToken();
            const sessionToken = sessionTokenResult.sessionToken;
            const tasks = new Listr([
                {
                    title: "Verify session token",
                    task: () => this.authorise(sessionToken)
                }
            ]);
            tasks.run()
                .then((value) => {
                    resolve();
                }, error => {
                    reject(error);
                });
        });
    }

    public logout(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const serverHandler: ServerHandler = new ServerHandler({
                onCallback(body: any): void {
                    serverHandler.stop();
                    resolve();
                },
                onError(error: string): void {
                    console.log(error);
                    serverHandler.stop();
                    reject(error);
                },
                onServerStarted(): void {
                    serverHandler.execute(`http://localhost:4200/firebase?action=logout`);
                },
                onServerStopped(): void {
                    resolve();
                }
            });
        });
    }

    public authorise(sessionToken: string): Promise<void> {
        const api = "http://us-central1-famenun-2943.cloudfunctions.net/apisGetSessionToken";
        return new Promise((resolve, reject) => {
            request.post(api, {
                json: JSON.parse(JSON.stringify({
                    "ky": sessionToken,
                    "de": JSON.stringify(this.getDevice())
                }))
              }, (error, res, body) => {
                if (error) {
                    reject(error);
                } else {
                    if (body.error) {
                        reject(body.message);
                    } else {
                        // TODO: get public profile here
                        new PrefsHandler().write({
                            "sessionToken": body.data
                        }).then(() => {
                            resolve();
                        }).catch(error => {
                            reject(error);
                        });
                    }
                }
            })
        });
    }

    private async promptForSessionToken(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const instruction = "For getting Session Token log into Famenun App, Go to Settings > Sessions and click on + to create a new session key.";
            console.log(chalk.bgYellow.black(instruction));
            const defaultSessionToken = "";
            const questions = [];
            questions.push({
                type: "input",
                name: "sessionToken",
                message: "Session key: "
            });
            const answers = await inquirer.prompt(questions);
            resolve({
                sessionToken: answers.sessionToken || defaultSessionToken
            });
        });
    }

    public getDevice(): Device {
        return {
            id: this.getIp(),
            os: this.getOs(),
            na: this.getName(),
            ap: this.getApp()
        };
    }

    private getIp(): string {
        let ip: string = "";
        const ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach((ifname) => {
            let alias = 0;

            ifaces[ifname].forEach((iface) => {
                if ("IPv4" !== iface.family || iface.internal !== false) {
                    return;
                }
                ip = iface.address;
                ++alias;
            });
        });
        return ip;
    }

    private getName(): string {
        return os.hostname();
    }

    private getOs(): string {
        return process.platform;
    }

    private getApp(): string {
        return "Famenun Cli";
    }

}