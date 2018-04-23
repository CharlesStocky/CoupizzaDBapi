

const blah = () => {
  return new Promise((res)=>{
   res(console.log('blah'))
  })
}

(()=>{
  setTimeout(async()=>{
    return blah();  
  }, 300)
})()
