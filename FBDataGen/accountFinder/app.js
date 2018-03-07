import graph from 'fbgraph'; 
import { MongoClient } from 'mongodb';  

import accountGetter from './accountGetter.js'

(async () => {
  const fbObjArray = await accountGetter()

  return await MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
    const db = client.db('papa')
    const collection = db.collection('FBAccounts')
    fbObjArray.forEach((obj)=>{
      collection.find({"ID": obj.id}).toArray((err, docs)=> {
        if(err) return console.log(err)
        if(docs.length === 0){
          collection.insert({"ID": obj.id, "zip": obj.location.zip, "city": obj.location.city, "state": obj.location.state, "lat": obj.location.latitude, "long": obj.location.longitude}); 
        }
      })
    })
    console.log('completed')
  })
})()

