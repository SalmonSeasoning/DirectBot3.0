const { Command } = require("../classes/command");

new Command("hello", (message)=>{
    message.channel.send("HELLO!!!");
}, "A simple \"Hello\" command!", false, false);