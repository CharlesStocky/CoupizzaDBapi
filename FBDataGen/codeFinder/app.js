import { MongoClient } from 'mongodb'
import getDate from './dateFormatter.js' //formats dates according to output from facebook
import graph from 'fbgraph'
import postGetter from './postGetter.js'
import codeParser from '../../utils/parsePostCodes.js'
import codeInsert from '../../utils/codeInsert.js'
import accountGetter from '../../utils/accountGetter.js'

(async() =>{
  const accounts = await accountGetter('FBAccounts') 
  const posts = await postGetter(accounts) 
  const codes = await codeParser(posts)
  return codeInsert(codes) 
})()
