#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const { exec } = require("child_process");
const runCommands = (commands, progress, finished) => {
    if (commands && commands.length) {
        let i = 0;
        const run = () => {
            if (commands && commands[i] && commands[i].dependencies.length > 0) {
                runCommands(commands[i].dependencies, () => {
                    const childProcess = exec(commands[i].linux, (err, stdout, stderr) => {
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
                const childProcess = exec(commands[i].linux, (err, stdout, stderr) => {
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
// Example usage:
const run = (commandsArray, progress, finished) => {
    if (commandsArray != null &&
        typeof commandsArray == "object" &&
        commandsArray.length > 0) {
        runCommands(commandsArray, progress, finished);
    }
    else {
        console.log("please provide correct input format");
    }
};
exports.run = run;
//# sourceMappingURL=index.js.map