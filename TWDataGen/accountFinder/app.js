import accountGetter from './accountGetter.js'; 
import { MongoClient } from 'mongodb';

(async()=>{
  let accounts = await accountGetter()
  return console.log(accounts)
})()
