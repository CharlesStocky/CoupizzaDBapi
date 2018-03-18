import { MongoClient } from 'mongodb'
import getDate from './dateFormatter.js' //formats dates according to output from facebook
import graph from 'fbgraph'
import postGetter from './postGetter.js'
import fbAccounts from './fbIDGetter.js'

//const date = getDate()

(async() =>{
  const accounts = await fbAccounts() 
  const posts = await postGetter(accounts)
})()
