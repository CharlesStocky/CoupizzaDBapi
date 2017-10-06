const graph = require('fbgraph');
const MongoClient = require('mongodb').MongoClient;
let IDs = [];

graph.setAccessToken(process.env.FB_UAT)

let d = new Date;

let currentMonth = d.getMonth() + 1 ;
let currentDate = d.getDate();
let currentYear = d.getFullYear();
let currentDateObj = {
  month: currentMonth,
  day: currentDate,
  year: currentYear
}

let dayAgoDateObj = {
  month: currentMonth, 
  day: currentDate - 1,
  year: currentYear
}

let dateFormatter = (object) => { //formats date to match the formatting of facebook dates
  if(object.month < 10){ 
    object.month = '0' + object.month;
  }
  if(object.day < 10){ 
    object.day = '0' + object.day;
  }
  let formattedDate = object.year + '-' + object.month + '-' + object.day  
  return formattedDate
}

let promoArr = []
let currentDateStr = dateFormatter(currentDateObj)
let dayAgoDateStr = dateFormatter(dayAgoDateObj)

let idArrLen = 3336;
let counter = 0;  

let getCodes = (posts, locale) =>{
  if(posts.created_time.includes(currentDateStr)){
    if(posts.message){
      console.log(posts.message)
      if(posts.message.toLowerCase().match(/code/)){
//Customer appreciation day 25% off regular menu prices. Use promo code Wayne25
        let indxOfCodeStart = posts.message.toLowerCase().indexOf('code')
        let promoSlice = posts.message.slice(indxOfCodeStart + 4)
        if(promoSlice.match(/[A-Z\d]{3,}/)){
          let promoCode = promoSlice.match(/[A-Z\d]{3,}/)[0]
          if(promoCode === ''){
            return false; 
          }
          let promoObj = {
            promoCode: promoCode, 
            promoLocation: locale
          }
          console.log(promoObj)
          return promoObj
        }else{
          let promoCode = posts.message.slice(indxOfCodeStart + 5) //if the code isn't capitalized, match whatever comes after the string "code"
          console.log(promoCode)
          let promoObj= {
            promoCode: promoCode,
            promoLocation: locale
          }
          return promoObj
        }
      }else if(posts.message.toLowerCase().match(/promo/) && !posts.message.toLowerCase().match(/code/)){ //for matches that only use 'promo'
        let indxOfPromoStart = posts.message.toLowerCase().indexOf('promo')
        let promoSlice = posts.message.slice(indxOfPromoStart + 5) //+5 to exclude 'promo' from the slice
        if(promoSlice.match(/[A-Z\d]{3,}/)[0]){
          let promoCode = promoSlice.match(/[A-Z\d]{3,}/)[0] 
          if(promoCode === ''){
            return false; 
          }
          let promoObj = {
            promoCode: promoCode,	
            promoLocation: locale
          }
          console.log(promoObj)
          return promoObj
        }else{
          let promoCode = promoSlice.slice(indxOfPromoStart) 
        }
      }
    }else{
	    console.log(posts) 
	  }
  }
}


let getFbIds = () =>{ //returns a list of facebook ids
  return MongoClient.connect('mongodb://localhost:27017/papa')
    .then((db)=>{
      return db.collection('fbAccountIDs').find().toArray();
    })
    .catch((err)=>{
      console.log(err)
    })
    .then((dbArr)=>{
      return dbArr
    })
}

getFbIds()
  .then((results)=>{
    let dataArr = []
    results.forEach((obj)=>{
      graph.get('/' + obj.ID + '/feed',(err, res)=>{
        if(err)console.log(err)
        counter += 1
        if(counter === idArrLen){
          console.log('ID list exauhsted')
          dataArr.forEach((obj)=>{
            MongoClient.connect('mongodb://localhost:27017/papa')
              .then((db)=>{
                return db.collection('codes').findOne({"code": obj.promoCode, "location": obj.promoLocation}) 
               })
              .then((results)=>{
                if(results === null){
                  console.log('inserting doc')
                  MongoClient.connect('mongodb://localhost:27017/papa')
                    .then((db)=>{
                      db.collection('codes').insert({"createdAt": new Date(), "code": obj.promoCode, "location": obj.promoLocation})                     
                    })
                }else{
                  console.log(results) 
                } 
              })
          })
        }
        res.data.forEach((post)=>{ 
          let code = getCodes(post, obj.location)
          if(code){ 
            if(code.promoCode){ 
              dataArr.push(code)
            }
          }
        })
      })
   })
  })
