import graph from 'fbgraph'
import dateFormatter from './dateFormatter.js'
import _ from 'underscore'

graph.setAccessToken(process.env.FB_UAT)

const dateStr = dateFormatter()

export default (FBAccountObj) => {
  return new Promise((resolve, reject)=>{
    let postArr = []
    let counter = 0
    FBAccountObj.forEach((obj)=>{
      graph.get(obj.ID + '/feed', (err, res) =>{
        counter++
        console.log(counter)
        if(err && counter === FBAccountObj.length) console.log(err, "ID list exhausted"), resolve(postArr) 
        if(err) return console.log(err) 
        if(!res.data) return console.log(res)
        res.data.forEach((post) =>{
          if(post.created_time.includes(dateStr)){
            const postAndLocation = Object.assign(post, {location: obj.city + ", " + obj.state + " " + obj.zip, createdAt: post.created_time}) //added created time to readd codes posted on date after the first code 
            postArr.push(postAndLocation)
          }
        })
      })
      if(counter === FBAccountObj.length){
        console.log('ID list exhausted') 
        resolve(postArr)
      }
    })
  })
}
