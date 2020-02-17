const { Command } = require("../classes/command");

new Command("help", (message, database) => {
    let szCommands = "";
    let szAdminCommands = "";
    for(let command of Command.m_commands)
    {
        if (command.adminOnly)
            szAdminCommands += `${command.name}: ${command.desc ? `${command.desc}` : "No description"}\n`;
        else
            szCommands += `${command.name}: ${command.desc ? `${command.desc}` : "No description"}\n`;
    }
    message.channel.send(`Here is a list of commands: \`\`\`\n${szCommands}-- ADMIN ONLY --\n${szAdminCommands}\`\`\``);
}, "Lists all the available commands", true, true);