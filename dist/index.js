#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const { exec } = require("child_process");
const runCommands = (commands, platform, progress, finished) => {
    if (commands && commands.length) {
        let i = 0;
        const run = () => {
            if (commands && commands[i] && commands[i].dependencies.length > 0) {
                runCommands(commands[i].dependencies, platform, () => {
                    const childProcess = exec(commands[i][platform], (err, stdout, stderr) => {
                        if (err) {
                            console.error(err);
                            childProcess.kill();
                            return;
                        }
                        console.log(stdout);
                        progress(i, commands.length);
                        i++;
                        if (i < commands.length) {
                            childProcess.kill();
                            run();
                        }
                        else {
                            childProcess.kill();
                            finished();
                        }
                    });
                }, () => {
                    // this progress is left unimplemented cuz, this is called when dependency commands are running
                });
            }
            else {
                const childProcess = exec(commands[i][platform], (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        childProcess.kill();
                        return;
                    }
                    console.log(stdout);
                    progress(i + 1, commands.length);
                    i++;
                    if (i < commands.length) {
                        childProcess.kill();
                        run();
                    }
                    else {
                        childProcess.kill();
                        finished();
                    }
                });
            }
        };
        run();
    }
};
const getPlatform = () => {
    switch (process.platform) {
        case "linux":
            return "linux";
        case "darwin":
            return "mac";
        case "win32":
            return "windows";
        default:
            console.log("unknown platform");
            return null;
    }
};
const run = (commandsArray, progress, finished) => {
    if (commandsArray != null &&
        typeof commandsArray == "object" &&
        commandsArray.length > 0) {
        const currentPlatform = getPlatform();
        runCommands(commandsArray, currentPlatform, progress, finished);
    }
    else {
        console.log("please provide correct input format");
    }
};
exports.run = run;
//# sourceMappingURL=index.js.map