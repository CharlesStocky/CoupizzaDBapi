var graph = require('fbgraph'); 
var MongoClient = require('mongodb').MongoClient;

var accountGetter = require('./accountGetter.js');
var accountInsert = require('../../utils/accountInsert.js');

console.log(process.env.FBAT);

(async () => {
  const fbObjArray = await accountGetter()
  return accountInsert('FBAccounts')
})()

