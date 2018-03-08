import { MongoClient } from 'mongodb'

(export default async() =>{
  return await MongoClient.connect('mongodb://localhost:27017/papa', (err, client)=>{
    const collection = db.collection('FBAccounts')
    console.log(collection)
  })
})()
