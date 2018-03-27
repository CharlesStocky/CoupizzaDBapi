
export default (posts) =>{
  let codes = []
  posts.forEach((post)=>{
  return new Promise((res)=>{
    //console.log("PARSING CODES FROM POSTS")
      if(post.post.message){
        if(post.post.message.toLowerCase().match(/code/)){
          let indxOfCodeStart = post.post.message.toLowerCase().indexOf('code')
          let promoSlice = post.post.message.slice(indxOfCodeStart + 4)
          if(promoSlice.match(/[A-Z\d]{3,}/)){
            let promoCode = promoSlice.match(/[A-Z\d]{3,}/)[0]
            if(promoCode === ''){
              return false; 
            }
            let promoObj = {
              promoCode: promoCode, 
              promoLocation: locale
            }
            codes.push(promoObj)
          }else{
            let promoCode = post.message.slice(indxOfCodeStart + 5) //if the code isn't capitalized, match whatever comes after the string "code"
            let promoObj= {
              promoCode: promoCode,
              promoLocation: locale
            }
            codes.push(promoObj)
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
            codes.push(promoObj)
          }else{
            let promoCode = promoSlice.slice(indxOfPromoStart) 
          }
        }
      }else{
        console.log('no code found') 
      }
    })
  }) 
  console.log(codes)
  resolve(codes)
}
