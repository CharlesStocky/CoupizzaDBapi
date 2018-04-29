var fs = require('fs');

//start of cursor = 217

const writeCursorToFile = (cursor) =>{
  fs.readFile('../../.env', 'utf8', (err, data)=>{
    console.log('writing cursor to file .env')
    if(err) return console.log(err);

    let dataSplit = data.split("\n")
    dataSplit.splice(5, 1, "TWCURSOR=" + cursor); 
    let replacedCursor = dataSplit.join('\n')
    fs.writeFile('../../.env', replacedCursor, (err)=>{
      if(err) return console.log(err); 
      return; 
    })
  })
}

module.exports = writeCursorToFile;

