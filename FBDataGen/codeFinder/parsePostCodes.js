
export default (posts) =>{
  return new Promise((res)=>{
    console.log("PARSING CODES FROM POSTS")
    posts.forEach((post)=>{
      if(post.message){
        console.log(post.message)
        if(post.message.toLowerCase().match(/code/)){
          let indxOfCodeStart = post.message.toLowerCase().indexOf('code')
          let promoSlice = post.message.slice(indxOfCodeStart + 4)
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
            let promoCode = post.message.slice(indxOfCodeStart + 5) //if the code isn't capitalized, match whatever comes after the string "code"
            console.log(promoCode)
            let promoObj= {
              promoCode: promoCode,
              promoLocation: locale
            }
            return promoObj
          }
        }else if(post.message.toLowerCase().match(/promo/) && !post.message.toLowerCase().match(/code/)){ //for matches that only use 'promo'
          let indxOfPromoStart = post.message.toLowerCase().indexOf('promo')
          let promoSlice = post.message.slice(indxOfPromoStart + 5) //+5 to exclude 'promo' from the slice
          if(promoSlice.match(/[A-Z\d]{3,}/)[0]){
            let promoCode = promoSlice.match(/[A-Z\d]{3,}/)[0] 
            if(promoCode === ''){
              return false; 
            }
            let promoObj = {
              promoCode: promoCode,	
              promoLocation: locale
            }
            return promoObj
          }else{
            let promoCode = promoSlice.slice(indxOfPromoStart) 
          }
        }
      }else{
        console.log(post) 
      }
    })
  }) 
}
