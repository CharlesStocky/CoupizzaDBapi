import accountGetter from './accountGetter.js'; 
import { MongoClient } from 'mongodb';

(async()=>{
  let accounts = await accountFinder()
  return console.log(accounts)
})()
