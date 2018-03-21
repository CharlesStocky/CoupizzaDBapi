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
      counter++
      graph.get(obj.ID + '/feed', (err, res) =>{
        if(err) return console.log(err)
        if(!res.data) return console.log(res)
        res.data.forEach((post) =>{
          if(post.created_time.includes(dateStr)){
            postArr.push(post)
          }
        })
        if(postArr.length !== 0){
          console.log(postArr) 
          resolve(postArr)
        }
      })
    })
  })
}
