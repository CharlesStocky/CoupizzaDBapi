const Twitter = require('twitter');
const accountsInsert = require('../../utils/accountInsert.js');
const exit = require('../exit.js')

const TWClient = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

(()=>{
  let accounts = [];
  let nextCursor = -2
  TWClient.get('followers/list', {user_id: '18450106', cursor: process.env.nextCursor}, function callback(err, res){

    if(err){ 
      if(err[0].code === 88){
        console.log('setting timeout')

        setTimeout(async()=>{
          await accountInsert('TWAccounts', accounts);
          return TWClient.get('followers/list', {user_id: '18450106', cursor: nextCursor}, callback);
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
