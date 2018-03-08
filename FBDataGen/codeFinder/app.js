import { MongoClient } from 'mongodb'
import getDate from './dateFormatter.js' //formats dates according to output from facebook
import graph from 'fbgraph'
import postGetter from './postGetter.js'

//const date = getDate()

(async() =>{
  const client = await MongoClient.connect('mongodb://localhost:27017/'); 
  const FBIdArr  = await client.db('papa').collection('FBAccounts').find().toArray()
  return postGetter(FBIdArr) 
})()
