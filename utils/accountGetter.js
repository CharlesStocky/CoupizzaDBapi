import { MongoClient } from 'mongodb'

export default (accountCollection) =>{
  return new Promise((res, rej)=>{
    MongoClient.connect('mongodb://localhost:27017/papa', (err, client)=>{
      if(err) return console.log(err)
      const db = client.db('papa')
      const collection = db.collection(accountCollection)
      collection.find({}).toArray((err, docs)=>{
        if(err)return console.log(err)
        res(docs) 
      })
    })
  })
}
