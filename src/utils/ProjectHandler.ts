import fs from "fs";
import ncp from "ncp";
import path from "path";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import Listr from "listr";

import JSZip from "jszip";

import { exec } from "child_process";
import { ServerHandler } from "./ServerHandler";

const installSDK = (): Promise<void> => {
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

const createManifest = (options: any): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        const manifest = {
            version: "1.0.0",
            id: options.data.id,
            name: options.data.name,
            color: options.data.color,
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

const copyTemplateFiles = (options: any): Promise<any> => {
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

const createFAP = (dir?: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const zip = new JSZip();
            const files = fs.readdirSync(dir || process.cwd());
            for (const file of files) {
                zip.file(file);
            }
            const appFilePath = path.resolve(dir || process.cwd(), 'app.fap');
            zip
                .generateNodeStream({ type: 'nodebuffer', streamFiles: true }, (metadata: any) => {
                    let rawProg: number = metadata.percent || 0;
                    const progress = rawProg.toFixed(2);
                })
                .pipe(fs.createWriteStream(appFilePath))
                .on('finish', () => {
                    resolve();
                });
        } catch (error) {
            reject(error);
        }
    });
}

const upload = (file: string): Promise<void> => {
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

export const createProject = (options: any): Promise<boolean> => {
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
            templateDirectory: path.resolve(__dirname, "../../template"),
        };
        const tasks = new Listr([
            {
                title: "Copy project template files",
                task: () => copyTemplateFiles(options),
            },
            {
                title: "Create manifest.json",
                task: () => createManifest(options),
            },
            {
                title: "Install dependencies",
                task: () => installSDK(),
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

export const buildProject = (path?: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isDirectoryFamenunProject(path)) {
                const tasks = new Listr([
                    {
                        title: "Build App",
                        task: () => createFAP(path)
                    }
                ]);
                await tasks.run();
                resolve();
            } else {
                reject("Not a Famenun project directory");
            }
        } catch (error) {
            reject(error);
        }
    });
}

export const publishProject = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        const tasks = new Listr([
            {
                title: "Upload App",
                task: () => upload("C:\\Program Files\\NodeProjects\\famenun\\sdk\\app.zip")
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

export const isDirectoryFamenunProject = (dir?: string): boolean => {
    const manifestFile = path.resolve(dir || process.cwd(), "f.app.json");
    return fs.existsSync(manifestFile);
}