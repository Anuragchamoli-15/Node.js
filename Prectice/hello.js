const fs = require('fs');
fs.writeFile('anurag.txt', 'hello my name is anurag', (err) =>{
  if(err) {
    console.log('error aa gya')
  }else {console.log('file run succesfully')}
})