import { MongoClient } from 'mongodb'
import getDate from './dateFormatter.js' //formats dates according to output from facebook
import graph from 'fbgraph'
import postGetter from './postGetter.js'
import fbAccounts from './fbIDGetter.js'
import codeParser from './parsePostCodes.js'

(async() =>{
  const accounts = await fbAccounts() 
  const posts = await postGetter(accounts)
  const codes = await codeParser(posts)
  return MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
    if(err) return console.log(err)
    const db = client.db('papa')
    const collection = db.collection('codes')
    codes.forEach((code)=>{
      collection.findOne({"code": code.promo, "location": code.location, "dateCreated": code.creationDate}, (err, res)=>{
        if(err)return console.log(err)
        console.log(res)
      })
    })
  })
})()
