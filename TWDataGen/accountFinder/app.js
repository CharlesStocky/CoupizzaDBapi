require('dotenv').config()
const Twitter = require('twitter');
const accountsInsert = require('../../utils/accountInsert.js');
//const = require('../cursorFile.js');

console.log(process.env.TWAT);

const TWClient = new Twitter({
  consumer_key: process.env.TWCK,
  consumer_secret: process.env.TWCS,
  access_token_key: process.env.TWAT,
  access_token_secret: process.env.TWATS
});


(()=>{
  let accounts = [];
  TWClient.get('followers/list', {user_id: '18450106', cursor: process.env.TWCURSOR}, function callback(err, res){

    if(err){ 
      if(err[0].code === 88){
        console.log('setting timeout')

        setTimeout(async()=>{
          await accountInsert('TWAccounts', accounts);
          return res.next_cursor;
        }, 900000) 
      }
    };

    if(!res.users) return console.log(res);
    nextCursor = res.next_cursor;

    res.users.forEach((user)=>{
      if(user.screen_name.includes('PapaJohns')){
        console.log(user);
        accounts.push(user);
      }
    })

    if(res.next_cursor !== 0){
      TWClient.get('followers/list', {user_id: '18450106', cursor: nextCursor}, callback);
    }
  })
})()
