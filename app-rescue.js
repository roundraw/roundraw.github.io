function crutch() {
  process.env["NTBA_FIX_319"] = 1;
  D = {};
  F = {}; 
  F.bot = new(require('node-telegram-bot-api'))(process.env.TOKEN, {
    polling: true
  });
  
  F.bot.onText(/\/return/, (msg, match) => {
  	if (msg.chat.id + "" == "-1001609661635") {
    F.bot.sendMessage(msg.chat.id, 'Rescue mode activated ' + msg.chat.id);
    }
  });
}
crutch();
