

const blah = () => {
  return new Promise((res)=>{
   res(console.log('blah'))
  })
}

(()=>{
  setTimeout(async()=>{
    await blah();  
    return console.log(';lkas;dlfkj')
  }, 300)
})()
