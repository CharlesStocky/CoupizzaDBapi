var MongoClient = require('mongodb').MongoClient

const accountsInsert = (dbCollection, ObjArray) =>{
  return MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
    if(err)return console.log(err)
    const db = client.db('papa')
    const collection = db.collection(dbCollection)
    ObjArray.forEach((obj)=>{
      collection.find({"ID": obj.id}).toArray((err, docs)=> {
        if(err) return console.log(err)
        if(docs.length === 0){
          collection.insert({"ID": obj.id, "zip": obj.location.zip, "city": obj.location.city}, (err, res)=>{
            client.close()
            if(err) return console.log(err)
            return console.log(res.insertCount + ' account(s) inserted') 
          }); 
        }
      })
    })
  })
}

module.exports = accountsInsert
