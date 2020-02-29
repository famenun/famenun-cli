import fs from "fs";
import ncp from "ncp";
import path from "path";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import Listr from "listr";

import { exec } from "child_process";
import { ServerHandler } from "./ServerHandler";

export class ProjectHandler {

    private static async installSDK(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            exec("npm init -y", (error, stdout, stderr) => {
                if (!error) {
                    exec("npm i @famenun/sdk", (error, stdout, stderr) => {
                        if (!error) {
                            resolve();
                        } else {
                            reject(stderr);
                        }
                    });
                } else {
                    reject(stderr);
                }
            });
        });
    }

    private static async createManifest(options: any): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const manifest = {
                version: "1.0.0",
                id: options.data.id,
                name: options.data.name,
                about: options.data.about,
                tags: options.data.tags.trim().split(" "),
                entry: "index.html",
                permissions: [],
                handlers: []
            };
            const manifestFile = path.resolve(process.cwd(), "f.app.json");
            fs.writeFile(manifestFile, JSON.stringify(manifest), (err) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

    private static async copyTemplateFiles(options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            ncp.ncp(options.templateDirectory, options.targetDirectory, (err) => {
                if (!err) {
                    resolve({
                        clobber: false,
                    });
                } else {
                    reject(err);
                }
            });
        });
    }

    public static async createProject(options: any): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            clear();
            console.log(
                chalk.yellow(
                    figlet.textSync("Famenun", { horizontalLayout: "full" })
                )
            );
            options = {
                ...options,
                targetDirectory: options.targetDirectory || process.cwd(),
                templateDirectory: path.resolve(__dirname, "../../templates", "app"),
            };
            const tasks = new Listr([
                {
                    title: "Copy project template files",
                    task: () => ProjectHandler.copyTemplateFiles(options),
                },
                {
                    title: "Create manifest.json",
                    task: () => ProjectHandler.createManifest(options),
                },
                {
                    title: "Install dependencies",
                    task: () => ProjectHandler.installSDK(),
                    skip: () =>
                        !options.runInstall
                            ? "Pass --install to automatically install dependencies"
                            : undefined,
                },
            ]);
            await tasks.run();
            resolve(true);
        });
    }

    public static async publish(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tasks = new Listr([
                {
                    title: "Upload App",
                    task: () => ProjectHandler.upload("C:\\Program Files\\NodeProjects\\famenun\\sdk\\app.zip")
                }
            ]);
            tasks.run()
                .then(() => {
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    private static async upload(file: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const serverHandler: ServerHandler = new ServerHandler({
                onCallback(body: any): void {
                    console.log("body : " + body);
                    serverHandler.stop();
                    resolve();
                },
                onError(error: string): void {
                    serverHandler.stop();
                    reject(error);
                },
                onServerStarted(): void {
                    serverHandler.execute(`http://localhost:4200/firebase?action=upload&file=${file}`);
                },
                onServerStopped(): void {
                    //
                }
            });
        });
    }

}