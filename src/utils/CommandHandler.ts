import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { table } from "table";

import { AuthHandler } from "./AuthHandler";
import { createProject, buildProject, publishProject } from "./ProjectHandler";

const COMMAND_LOGIN = "login";
const COMMAND_LOGOUT = "logout";
const COMMAND_CREATE = "create";
const COMMAND_BUILD = "build";
const COMMAND_EMULATE = "emulate";
const COMMAND_PUBLISH = "publish";
const COMMAND_HELP = "help";
const COMMAND_ABOUT = "about";
const COMMAND_VERSION = "version";

const VERSION = "1.0.7";

const parseArgumentsIntoOptions = (rawArgs: any): any => {
    const args = arg({
        "--yes": Boolean,
        "--install": Boolean,
        "--help": Boolean,
        "-y": "--yes",
        "-i": "--install",
        "-h": "--help",
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        command: args._[0],
        name: args._[1],
        skipPrompts: args["--yes"] || false,
        runInstall: args["--install"] || false,
        help: args["--help"] || false,
    };
}

const promptForMissingOptions = (options: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {

        const manifestFile = path.resolve(process.cwd(), "f.app.json");

        if (fs.existsSync(manifestFile)) {
            console.log(chalk.bgRed.bold("ERROR") + chalk.yellow(` This is already a project directory !`));
        } else {
            const defaultId = "com.example.app";
            const defaultName = path.basename(path.resolve(process.cwd()));
            if (options.skipPrompts) {
                resolve({
                    ...options,
                    name: options.name,
                    runInstall: options.runInstall || false,
                    data: {
                        name: defaultName,
                        about: "",
                        tags: "",
                    },
                });
            } else {
                const questions = [];
                if (!options.runInstall) {
                    questions.push({
                        type: "confirm",
                        name: "runInstall",
                        message: "Install helpful dependencies?",
                        default: false,
                    });
                }
                const answers = await inquirer.prompt(questions);

                const projectQuestions = [];

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
                    name: "id",
                    message: `Id of the project (Ex. com.example.app) :"`,
                    default: defaultId,
                });

                projectQuestions.push({
                    type: "input",
                    name: "color",
                    message: "Theme color (Ex. #1df2a1) :",
                    default: "#1df2a1",
                });

                const projectAnswers = await inquirer.prompt(projectQuestions);

                resolve({
                    ...options,
                    runInstall: options.runInstall || answers.runInstall,
                    data: {
                        id: projectAnswers.id || defaultId,
                        name: options.name || projectAnswers.name || defaultName,
                        color: projectAnswers.color || "#1df2a1",
                    },
                });
            }
        }
    });
}

const showHelpTable = (): void => {
    console.log("");
    console.log(chalk.yellow.bold("@famenun/cli supports the follwoing commands : "));
    console.log("");
    const output = table([
        ["login", "Authorise and create new session", ""],
        ["logout", "Destroy ongoing session", ""],
        ["create", "Create new project", "Expects one optional argument i.e. project name"],
        ["publish", "Publish app in current directory", ""],
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
            case COMMAND_LOGIN:
                if (options.help) {
                    console.log(
                        chalk.bgYellow.bold("HELP") +
                        chalk.yellow(` With '${options.command}' you can log into your famenun account and verify your session`));
                } else {
                    new AuthHandler()
                        .login()
                        .then(() => {
                            console.log(chalk.bgGreen.bold("SUCCESS") + chalk.green(" Signed in successfully :)"));
                        }).catch((error) => {
                            console.log(chalk.bgRed.bold("ERROR") + chalk.yellow(" " + error));
                        });
                }
                break;
            case COMMAND_LOGOUT:
                if (options.help) {
                    console.log(
                        chalk.bgYellow.bold("HELP") +
                        chalk.yellow(` With '${options.command}' you can destroy your current famenun account session`));
                } else {
                    console.log("logout kr bnde ko");
                }
                break;
            case COMMAND_CREATE:
                if (options.help) {
                    console.log(
                        chalk.bgYellow.bold("HELP") +
                        chalk.yellow(` With '${options.command}' you can create new famenun app template in the current directory`));
                } else {

                    const manifestFile = path.resolve(process.cwd(), "f.app.json");
                    if (!fs.existsSync(manifestFile)) {
                        try {
                            options = await promptForMissingOptions(options);
                            await createProject(options);

                            console.log(chalk.bgGreen.bold("SUCCESS") + chalk.green(" Project created successfully !"));

                        } catch (error) {
                            console.log(chalk.bgRed.bold("ERROR") + chalk.yellow(error));
                        }
                    } else {
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
            case COMMAND_PUBLISH:
                if (options.help) {
                    console.log(
                        chalk.bgYellow.bold("HELP") +
                        chalk.yellow(` With '${options.command}' you can publish your famenun app in current directory. This command should be executed in the directory where the f.app.json file lies`));
                } else {
                    await publishProject();
                }
                break;
            case COMMAND_HELP:
                showHelpTable();
                break;
            case COMMAND_ABOUT:
                console.log(`Famenun apps template creation utility i.e. @famenun/cli@${VERSION}`);
                break;
            case COMMAND_VERSION:
                console.log(`v${VERSION}`);
                break;
            default:
                console.log(chalk.bgRed.bold("ERROR") + chalk.yellow(` Unknown command '${options.command}'`));
                break;
        }
    }, 0);
}