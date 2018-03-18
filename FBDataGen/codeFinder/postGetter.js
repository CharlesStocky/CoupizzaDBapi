import graph from 'fbgraph'
import dateFormatter from './dateFormatter.js'
import _ from 'underscore'

graph.setAccessToken(process.env.FB_UAT)

const dateStr = dateFormatter()
console.log(dateStr)

export default (FBAccountObj) => {
  return new Promise((resolve, reject)=>{
    let postArr = []
    let counter = 0
    FBAccountObj.forEach((obj)=>{
      counter++
      graph.get(obj.ID + '/feed', (err, res) =>{
        if(err) return
        if(!res.data || res.data.length === 0) return
        res.data.forEach((post) =>{
          if(post.created_time.includes(dateStr)){
            postArr.push(post)
          }
        })
        if(counter === FBAccountObj.length){
          console.log('Exhausted facebook accounts')
          resolve(postArr) 
        }
      })
    })
  })
}
