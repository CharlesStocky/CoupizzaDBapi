import graph from 'fbgraph'; 
import { MongoClient } from 'mongodb';  

import accountGetter from './accountGetter.js'
import accountInsert from '../../utils/accountInsert.js'

(async () => {
  const fbObjArray = await accountGetter()
  return accountInsert('FBAccounts')
})()

