import Twitter from 'twitter'
import { MongoClient } from 'mongodb'

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token,
  access_token_secret: process.env.access_token_secret
})

export default ()=>{
  return new Promise((resolve, reject)=>{
    let accounts = []
    client.get('followers/list', {user_id: '18450106'}, function callback(err, res){
      if(err) return console.log(err)
      let cursorNext = res.cursor_next
      if(!res.users) return console.log(res)

      res.users.forEach((user)=>{
        if(user.screen_name.includes('PapaJohns')){
          console.log(user)
          accounts.push(user)
        }
      })
      if(res.next_cursor !== 0){
        client.get('followers/list', {user_id: '18450106', cursor: cursorNext}, callback)
      }
    })
  })
}
