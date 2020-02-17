class Command {
    constructor(name, func, desc, adminOnly, requireDB)
    {
        this.name = name.toLowerCase().split(' ')[0]; // for parsing reasons
        this.func = func;
        this.desc = desc;
        this.adminOnly = adminOnly ? true : false;
        this.requireDB = requireDB ? true : false;
        Command.m_commands.push(this);
    }
    exec(message, database)
    {
        this.func(message, database);
    }
}

Command.m_commands = [];

module.exports = {
    Command: Command
};