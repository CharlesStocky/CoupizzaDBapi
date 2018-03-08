import graph from 'fbgraph'
import dateFormatter from './dateFormatter.js'
import _ from 'underscore'

graph.setAccessToken(process.env.FB_UAT)

const dateStr = dateFormatter()

export default (FBAccountObj) => {
  return new Promise((resolve, reject)=>{
    FBAccountObj.forEach((obj)=>{
      graph.get('/' + obj.ID + '/feed', (res, err) =>{
        if(err)return console.log(err)
        console.log(res)
        let currentPosts = _.filter(res, (postObj)=>{
          if(postObj.createdTime.slice(0, 9) === dateStr){
            return true 
          }
        }) 
        resolve(console.log(currentPosts))
      })  
    })
  })
}
