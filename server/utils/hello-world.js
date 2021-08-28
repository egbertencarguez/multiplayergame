/*
const helloWorld = () =>{
    console.log('hello world');
    
}

module.exports = helloWorld;
*/

const printHello = () => {
  console.log("hello world");
  return "I HAVE PRINTED OUT HELLO WORLD";
};

//const x = (helloWorld()).printHello()

//console.log(x)
module.exports = { printHello: printHello, maxDays: 12 }; //(helloWorld()).printHello;
