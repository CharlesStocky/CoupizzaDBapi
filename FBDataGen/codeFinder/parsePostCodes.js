
let posts = [
  { post:
   { created_time: '2018-03-26T12:48:12+0000',
     message: 'Carryout Specials!  Medium 2 Top $5.99/Large 2 Top $7.99',
     story: 'Papa John\'s Pizza - Rochester Hills (Rochester Hills, MI) posted an offer.',
     id: '169011400324235_225662321325809' },
  location: 'Rochester Hills MI, 48307' },
{ post:
   { created_time: '2018-03-26T19:46:40+0000',
     message: 'Thank you to the people of Jones County, MS. But, we are celebrating across all of south Mississippi. Use this code for 25% off your pizza order. Our way of saying thanks you.',
     story: 'Papa John\'s Pizza (Laurel, MS) updated their cover photo.',
     id: '156621231062500_1739592086098732' },
  location: 'Laurel MS, 39440' },
{ post:
   { created_time: '2018-03-26T21:47:27+0000',
     message: 'Eat more pizza!!!',
     id: '195990680421161_1722728451080702' },
  location: 'Branson MO, 65616' },
{ post:
   { created_time: '2018-03-26T11:51:05+0000',
     message: 'What\'s one nice thing you could do for someone today?  #SpreadKindness',
     id: '139953562738442_1760163237384125' },
  location: 'Colorado Springs CO, 80919' },
{ post:
   { created_time: '2018-03-26T11:51:08+0000',
     message: 'What\'s one nice thing you could do for someone today?  #SpreadKindness',
     id: '187482601290603_1662526740452841' },
  location: 'Colorado Springs CO, 80910' },
{ post:
   { created_time: '2018-03-26T11:51:03+0000',
     message: 'What\'s one nice thing you could do for someone today?  #SpreadKindness',
     id: '149975538396234_1662567213803718' },
  location: 'Fountain CO, 80817' },
{ post:
   { created_time: '2018-03-26T11:51:02+0000',
     message: 'What\'s one nice thing you could do for someone today?  #SpreadKindness',
     id: '193986550624747_1768070983216288' },
  location: 'Colorado Springs CO, 80922' },
{ post:
   { created_time: '2018-03-26T11:51:09+0000',
     message: 'What\'s one nice thing you could do for someone today?  #SpreadKindness',
     id: '475790862567923_1015448231935514' },
  location: 'Monument CO, 80132' }, 
{ post: 
  { 
    message:  'What\'s one nice thing you could do for someone today?  #SpreadKindness code 12ASDF',
  }
}
]


const parsePosts = (posts) =>{

  posts.forEach((post)=>{
  return new Promise((res)=>{
    //console.log("PARSING CODES FROM POSTS")
      if(post.post.message){
        console.log(post.post.message.toLowerCase())
        console.log()
        if(post.post.message.toLowerCase().match(/code/)){
          console.log(';lkaj;lsdkfj;lksajdf;lkjasl;dkfj;lskajf;lksjd;lfkjad;lf')
          let indxOfCodeStart = post.post.message.toLowerCase().indexOf('code')
          let promoSlice = post.post.message.slice(indxOfCodeStart + 4)
          console.log(promoSlice)
          if(promoSlice.match(/[A-Z\d]{3,}/)){
            let promoCode = promoSlice.match(/[A-Z\d]{3,}/)[0]
            if(promoCode === ''){
              res(false); 
            }
            let promoObj = {
              promoCode: promoCode, 
              promoLocation: locale
            }
            console.log(promoObj)
            res(promoObj)
          }else{
            let promoCode = post.message.slice(indxOfCodeStart + 5) //if the code isn't capitalized, match whatever comes after the string "code"
            console.log(promoCode)
            let promoObj= {
              promoCode: promoCode,
              promoLocation: locale
            }
            res(promoObj)
          }
        }else if(post.message.toLowerCase().match(/promo/) && !post.message.toLowerCase().match(/code/)){ //for matches that only use 'promo'
          let indxOfPromoStart = post.message.toLowerCase().indexOf('promo')
          let promoSlice = post.message.slice(indxOfPromoStart + 5) //+5 to exclude 'promo' from the slice
          if(promoSlice.match(/[A-Z\d]{3,}/)[0]){
            let promoCode = promoSlice.match(/[A-Z\d]{3,}/)[0] 
            if(promoCode === ''){
              res(false); 
            }
            let promoObj = {
              promoCode: promoCode,	
              promoLocation: locale
            }
            res(promoObj)
          }else{
            let promoCode = promoSlice.slice(indxOfPromoStart) 
          }
        }
      }else{
        res(';lkaj;lskdfj;lkj') 
      }
    })
  }) 
}

parsePosts(posts)
  .then((results)=>{
    console.log(results) 
  })
