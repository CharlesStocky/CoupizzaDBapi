var Twitter = require('twitter');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var client = new Twitter({
  consumer_key: process.env.tw_consumer_key,
  consumer_secret: process.env.tw_consumer_secret,
  access_token_key: process.env.tw_access_token,
  access_token_secret: process.env.tw_access_token_secret
})

console.log(process.env.tw_consumer_key[1])

let dbArr = (account)=>{
return MongoClient.connect('insert port/ db')
  .then((db)=>{
    return db.collection('AccountIDs').findOne({"ID": account})
  })
}

let currentCursor = 1501422998168016000;

client.get('friends/list', {user_id: '18450106', cursor: currentCursor},function  recurse(err, res){
  if(!res.users){
    console.log(res);
  }
  currentCursor = res.next_cursor_str;
  console.log(res.next_cursor);
  res.users.forEach((user)=>{
    if(user.screen_name.includes('PapaJohns')){
      dbArr(user.id_str).then((res)=>{
        if(res === null){
	        console.log(res)
          MongoClient.connect('insert port/ db')
            .then((db)=>{
              console.log('account found: ' + user.id_str)
              db.collection('AccountIDs').insert({'ID': user.id_str, "SN": user.screen_name, "location": user.location})
            })
	     }else if(res){
         return console.log(res); 	
	     }
     })
    }
  })
  if(res.next_cursor !== 0){ 
    client.get('followers/list', {user_id: '18450106', cursor: currentCursor}, rescurse)
  }
})
