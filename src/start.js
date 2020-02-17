const Discord = require('discord.js');
const { Database } = require("./classes/database");
const { ClientHandler } = require("./classes/client_handler");
const { TernaryIf, ReadIfExistsSync } = require("./utils.js");

var g_database = null;
var g_administrators = [];

// Configure the bot
const g_fsConfig = ReadIfExistsSync("./config.json", "UTF-8");
const g_Config = g_fsConfig ? JSON.parse(g_fsConfig) : ()=>{
    console.log("Could not load config.json! Cannot start..");
    process.exit(0);
};
if (g_Config["database"])
{
    let dbData = ["localhost", "root", "password", "database"];
    dbData[0] = TernaryIf(g_Config["database"]["host"], dbData[0]);
    dbData[1] = TernaryIf(g_Config["database"]["username"], dbData[1]);
    dbData[2] = TernaryIf(["database"]["password"], dbData[2]);
    dbData[3] = TernaryIf(g_Config["database"]["database"], dbData[3]);
    g_database = new Database(...dbData);
    console.log(`Interpreted database connection to be : { ${dbData[0]}, ${dbData[1]}, ${dbData[2]}, ${dbData[3]} }`);
    console.log("NOTICE: Unhandled promise rejections exceptions are from the MySQL module! Please disregard them for now...");
}
if(g_Config["administrator_uids"])
    for(uid in g_Config["administrator_uids"])
    {
        console.log(`Found administrator UID : ${g_Config["administrator_uids"][uid]}`);
        g_administrators[uid] = g_Config["administrator_uids"][uid];

    }

const g_botPrefix = TernaryIf(g_Config["global_prefix"], "!");

const g_client = new Discord.Client();

require("fs").readdirSync("./src/commands").forEach(fileName => {
    if (fileName.substring(fileName.length, fileName.length - 3) === ".js")
    {
        console.log(`Found command file: ${fileName}`);
        require(`./commands/${fileName}`);
    }
});

const g_clientHandler = new ClientHandler(g_client, g_botPrefix, g_database, ...g_administrators);

g_client.on("ready", ()=>{
    if(g_Config["presence"])
    switch(g_Config["presence"].toLowerCase())
    {
        case "online":
            console.log("Set status to online");
            g_client.user.setStatus("online");
            break;
        case "idle":
            console.log("Set status to idle");
            g_client.user.setStatus("idle");
            break;
        case "dnd":
            console.log("Set status to do not disturb");
            g_client.user.setStatus("dnd");
            break;
        case "offline":
            console.log("Set status to offline");
            g_client.user.setStatus("invisible");
            break;
        default:
            console.log("Set default status");
            g_client.user.setStatus("online");
    }
    if(g_Config["activity"])
    {
        console.log(`Set activity to : ${g_Config["activity"]}`);
        g_client.user.setActivity(g_Config["activity"]);
    }
    else
    {
        console.log("Set default activity");
        g_client.user.setActivity(`${g_botPrefix}help`);
    }
    console.log("Ready!");
});

g_client.on("message", (message)=>g_clientHandler.handleCommand(message));

if(g_Config["private_token"]) g_client.login(g_Config["private_token"]);
else if(process.env.TOKEN) g_client.login(process.env.TOKEN);
else 
{
    console.log("No token found! Cannot start the bot!");
    process.exit(0);
}