const graph = require('fbgraph'); 
const MongoClient = require('mongodb').MongoClient; 


graph.setAccessToken(process.env.FB_UAT) 
let counter = 0


let cursor = 'MjAwMDIwMjM2NjkzMTA5'  

graph.get('/34703237638/locations?fields=location&after=' + cursor, function dataParse(err, res){
  if(err)return console.log(err) 
  console.log(res.paging.cursors); 
  res.data.filter((obj)=>{
    if(obj.location.country === 'United States'){
      let locale = obj.location.city + ', ' + obj.location.state 
      return MongoClient.connect('mongodb://localhost:27017/papa') 
        .then((db)=>{
	  return db.collection('fbAccountIDs').findOne({'ID': obj.id}); 
	})
	.then((results)=>{
          if(results === null){
            return MongoClient.connect('mongodb://localhost:27017/papa')
	      .then((db)=>{
		console.log('doc inserted')
	        db.collection('fbAccountIDs').insert({'ID': obj.id, "location": locale }) 	  
	      }) 
	  }else{
	    console.log('doc not'); 
	  }	
	})
  .catch((err)=>{
	  console.log(err); 
	})
    }
  }); 
  graph.get(res.paging.next, dataParse);
})
