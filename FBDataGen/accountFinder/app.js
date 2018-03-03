import graph from 'fbgraph'; 
import { MongoClient } from 'mongodb'; 


graph.setAccessToken(process.env.fbAT) 

let cursor = 'MjAwMDIwMjM2NjkzMTA5'  

graph.get('/34703237638/locations?fields=location&after=', (err, res)=>{
  if(err) console.log(err); 
  res.data.filter((locale)=>{
    console.log(locale) 
  })
})
