import fs from "fs";
import ncp from "ncp";
import path from "path";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import Listr from "listr";

import JSZip from "jszip";
import { getFilesRecursively } from "./FilesHandler";

const createManifest = (options: any): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        const manifest = {
            version: "1.0.0",
            id: options.data.id,
            name: options.data.name,
            color: options.data.color,
            entry: "./index.html"
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
            const projectPath = dir !== undefined ? path.resolve(process.cwd(), dir) : process.cwd();
            // console.log(projectPath);
            const files: string[] = getFilesRecursively(projectPath);
            // console.log(JSON.stringify(files));
            for (const file of files) {
                const filePath = file.split(projectPath)[1];
                zip.file(filePath, fs.createReadStream(file));
            }
            const fapFilePath = path.resolve(projectPath, `${projectPath.split("/")[projectPath.split("/").length -1]}.fap`);
            zip
                .generateNodeStream({ type: 'nodebuffer', streamFiles: true }, (metadata: any) => {
                    let rawProg: number = metadata.percent || 0;
                    const progress = rawProg.toFixed(2);
                })
                .pipe(fs.createWriteStream(fapFilePath))
                .on('finish', () => {
                    resolve();
                });
        } catch (error) {
            reject(error);
        }
    });
}

export const createProject = (options: any): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
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
                    title: "Create f.app.json",
                    task: () => createManifest(options),
                }
            ]);
            await tasks.run();
            resolve();
        }catch(error){
            reject(error);
        }
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

export const isDirectoryFamenunProject = (dir?: string): boolean => {
    const manifestFile = path.resolve(dir || process.cwd(), "f.app.json");
    return fs.existsSync(manifestFile);
}