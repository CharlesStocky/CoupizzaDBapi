import graph from 'fbgraph'
import dateFormatter from './dateFormatter.js'
import _ from 'underscore'

graph.setAccessToken('EAACEdEose0cBALDlwd1KxulTrxZBe1ph3rYCWmWgfvhSyKKnG5o40ADPgKeHXSbvQtlasZCFSF6ZAJqqE9TkXGlT8cZB0QnelCv6T8ZAI3Ssmg86et8gRDFwXh7FhvlIyhjt7BnYJfRwbIjBmrc64nUk4lie5h1w1pfaZCRCW4lMCE9KVSJs71G6Xl8sI4RDH9Eedv2MyYcgXxG8Xr8BIW')

const dateStr = dateFormatter()

export default (FBAccountObj) => {
  return new Promise((resolve, reject)=>{
    let postArr = []
    let counter = 0
    FBAccountObj.forEach((obj)=>{
      graph.get(obj.ID + '/feed', (err, res) =>{
        counter++
        console.log(counter)
        if(err) return console.log(err) 
        if(err && counter === FBAccountObj.length) conole.log(';lakjs;ldfkj;lskjf;alllj'), resolve(postArr) 
        if(!res.data) return console.log(res)
        res.data.forEach((post) =>{
          if(post.created_time.includes(dateStr)){
            console.log(post)
            postArr.push({"post": post, "location": obj.city + " " + obj.state + ", " + obj.zip })
          }
        })
      })
    })
    if(counter === FBAccountObj.length){
      console.log('Account ID list exhausted')
      resolve(postArr)
    }
  })
}
