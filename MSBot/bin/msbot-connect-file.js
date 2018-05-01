"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const program = require("commander");
const path = require("path");
const BotConfig_1 = require("./BotConfig");
const fileService_1 = require("./models/fileService");
const schema_1 = require("./schema");
program.Command.prototype.unknownOption = function (flag) {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    program.help();
};
program
    .name('msbot connect file <path>')
    .description('Connect a file to the bot')
    .option('-b, --bot <path>', 'path to bot file.  If omitted, local folder will look for a .bot file')
    .option('--secret <secret>', 'bot file secret password for encrypting service secrets')
    .action((filePath, actions) => {
    if (filePath)
        actions.filePath = filePath;
});
let args = program.parse(process.argv);
if (process.argv.length < 3) {
    program.help();
}
else {
    if (!args.bot) {
        BotConfig_1.BotConfig.LoadBotFromFolder(process.cwd(), args.secret)
            .then(processConnectFile)
            .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            program.help();
        });
    }
    else {
        BotConfig_1.BotConfig.Load(args.bot, args.secret)
            .then(processConnectFile)
            .catch((reason) => {
            console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
            program.help();
        });
    }
}
async function processConnectFile(config) {
    args.name = args.hasOwnProperty('name') ? args.name : config.name;
    if (!args.hasOwnProperty('filePath'))
        throw new Error('Bad or missing file');
    // add the service
    let newService = new fileService_1.FileService({
        type: schema_1.ServiceType.File,
        id: args.filePath,
        name: path.basename(args.filePath),
        filePath: args.filePath
    });
    config.connectService(newService);
    await config.save();
    process.stdout.write(`Connected ${newService.type}:${newService.name} ${newService.filePath}`);
    return config;
}
//# sourceMappingURL=msbot-connect-file.js.map