const Twitter = require('twitter');
const accountsInsert = require('../../utils/accountInsert.js');

const TWClient = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token,
  access_token_secret: process.env.access_token_secret
})

(()=>{
  let nextCursor = process.env.nextCursor; 
  let accounts = [];
  TWClient.get('followers/list', {user_id: '18450106', cursor: nextCursor}, function callback(err, res){

    const clientCallback = TWclient.get('followers/list', {user_id: '18450106', cursor: process.env.nextCursor}, callback); 
    console.log(res);
    if(err){ 
      if(err[0].code === 88){
        setTimeout(async()=>{
          await accountInsert(accounts) 
          return clientCallback()
        }, 900000) 
      };
      return console.log(err);
    };
    if(!res.users) return console.log(res);

    res.users.forEach((user)=>{
      if(user.screen_name.includes('PapaJohns')){
        console.log(user);
        accounts.push(user);
      }
    })
    if(res.next_cursor !== 0){
      TWclient.get('followers/list', {user_id: '18450106', cursor: nextCursor}, callback);
    }
  })
})()
