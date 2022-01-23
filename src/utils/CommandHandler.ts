import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { table } from "table";
import { createProject, buildProject, isDirectoryFamenunProject } from "./ProjectHandler";

const COMMAND_CREATE = "create";
const COMMAND_BUILD = "build";
const COMMAND_HELP = "help";

const parseArgumentsIntoOptions = (rawArgs: any): any => {
    const args = arg({
        "--yes": Boolean,
        "--help": Boolean,
        "-y": "--yes",
        "-h": "--help",
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        command: args._[0],
        name: args._[1],
        skipPrompts: args["--yes"] || false,
        help: args["--help"] || false,
    };
}

const promptForMissingOptions = (options: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        if(!isDirectoryFamenunProject()){
            const defaultId = "com.example.app";
            const defaultName = path.basename(path.resolve(process.cwd()));
            const defaultColor = "#1df2a1";
            if (options.skipPrompts) {
                resolve({
                    ...options,
                    name: options.name,
                    runInstall: options.runInstall || false,
                    data: {
                        id: defaultId,
                        name: defaultName,
                        color: defaultColor
                    },
                });
            } else {
                const projectQuestions = [];

                projectQuestions.push({
                    type: "input",
                    name: "id",
                    message: `Id of the project (Ex. com.example.app) :"`,
                    default: defaultId,
                });

                if (options.name === undefined) {
                    projectQuestions.push({
                        type: "input",
                        name: "name",
                        message: `Name of the project:"`,
                        default: defaultName,
                    });
                }

                projectQuestions.push({
                    type: "input",
                    name: "color",
                    message: "Theme color (Ex. #1df2a1) :",
                    default: defaultColor,
                });

                const projectAnswers = await inquirer.prompt(projectQuestions);

                resolve({
                    ...options,
                    data: {
                        id: projectAnswers.id || defaultId,
                        name: options.name || projectAnswers.name || defaultName,
                        color: projectAnswers.color || "#1df2a1",
                    },
                });
            }
        }else{
            console.log(chalk.bgRed.bold("ERROR") + chalk.yellow(` This is already a project directory !`));
        }
        
    });
}

const showHelpTable = (): void => {
    console.log("");
    console.log(chalk.yellow.bold("@famenun/cli supports the follwoing commands : "));
    console.log("");
    const output = table([
        ["create", "Create new project", "Expects one optional argument i.e. project name"],
        ["build", "Build Famenun App Package (.fap) file ", "Expects one optional argument i.e. project directory"],
        ["help", "All Available commands", ""],
        ["-y or --yes", "Create project with default values", ""],
        ["-i or --install", "Install SDK by default", ""],
        ["-h or --help", "About command", ""]
    ], {
        columns: {
            0: {
                alignment: "left",
                width: 15
            },
            1: {
                alignment: "center",
                width: 35
            },
            2: {
                alignment: "center",
                width: 35
            }
        }
    });
    console.log(chalk.yellow.bold(output));
}

export const handle = (args: any) => {
    setTimeout(async () => {
        let options = parseArgumentsIntoOptions(args);
        if (options.command === undefined) {
            options.command = "";
            showHelpTable();
        }
        switch (options.command.toLowerCase()) {
            case COMMAND_CREATE:
                if (options.help) {
                    console.log(
                        chalk.bgYellow.bold("HELP") +
                        chalk.yellow(` With '${options.command}' you can create new famenun app template in the current directory`));
                } else {
                    if(!isDirectoryFamenunProject()){
                        try {
                            options = await promptForMissingOptions(options);
                            await createProject(options);

                            console.log(chalk.bgGreen.bold("SUCCESS") + chalk.green(" Project created successfully !"));

                        } catch (error) {
                            console.log(chalk.bgRed.bold("ERROR") + chalk.yellow(<any>error));
                        }
                    }else{
                        console.log(chalk.bgRed.bold("ERROR") + chalk.yellow("Current directory already contains a Famenun App"));
                    }
                }
                break;
            case COMMAND_BUILD:
                if (options.help) {
                    console.log(
                        chalk.bgYellow.bold("HELP") +
                        chalk.yellow(` With '${options.command}' you can build your famenun app in current directory. This command should be executed in the directory where the f.app.json file lies`));
                } else {
                    await buildProject(process.argv[3]);
                }
                break;
            case COMMAND_HELP:
                showHelpTable();
                break;
            default:
                console.log(chalk.bgRed.bold("ERROR") + chalk.yellow(` Unknown command '${options.command}'`));
                break;
        }
    }, 0);
}