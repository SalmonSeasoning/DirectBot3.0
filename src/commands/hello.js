const { Command } = require("../classes/command");

new Command("hello", {
    callee: (message, database)=>{
        message.channel.send("HELLO!!!");
    }, 
    description: "A simple \"Hello\" command!"
});