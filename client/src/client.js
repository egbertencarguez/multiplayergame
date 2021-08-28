//const { Console } = require("console");

//const { emit } = require("process");
const log = (text) => {
  const parent = document.querySelector('#events');
  const el = document.createElement('li');
  el.innerHTML = text

  parent.appendChild(el);
  parent.scrollTop = parent.scrollHeight;
}

const onChatSubmitted = (sock) => (e) => {
  e.preventDefault();

  const input = document.querySelector('#chat')
  const text = input.value;

  input.value = '';

  //log(text)
  //
  sock.emit('clientText', text)
}

const getBoard = (canvas, size = 20) => {
  const ctx = canvas.getContext('2d');
  const squareSize = Math.floor(canvas.width / size)

  const fillCell = (x, y, color) => {
      ctx.fillStyle = color;
      //ctx.fillRect(x*squareSize, y*squareSize , squareSize, squareSize);
      ctx.fillRect(x*squareSize,y*squareSize,squareSize,squareSize);

      //console.log(`fill cell ${x} ${y} ${squareSize}`)
  }

  const drawBoard = () => {
      ctx.strokeStyle = '#333'
      for (let i = 0; i < size + 1; i++) {
          ctx.beginPath();

          ctx.moveTo(i * squareSize, 0);
          ctx.lineTo(i * squareSize, size * squareSize);

          ctx.moveTo(0, i * squareSize);
          ctx.lineTo(size * squareSize, i * squareSize);
          ctx.stroke();
      }

  }

  const clear = () =>{
    ctx.clearRect(0,0,canvas.width, canvas.scrollHeight)
  }

  const renderBoard = (board=[]) =>{
    board.forEach((row,y)=>{
      row.forEach((color,x) =>{
        color && fillCell(x,y,color)
      });
    })
  }

  const reset  = (board) => {
    clear();
    drawBoard();
    renderBoard(board)
    
  }
  
  const getCellCoordinate  = (x,y) =>{
    return {
      x: Math.floor(x/squareSize),
      y: Math.floor(y/squareSize)
    }
  }

  return {
      fillCell,
      reset,
      getCellCoordinate
  }

}

const getCoordinates = (element, ev) => {
  const {
      top,
      left
  } = element.getBoundingClientRect();
  const {
      clientX,
      clientY
  } = ev;

  return {
      x: clientX - left,
      y: clientY - top
  }


}

(() => {
  //console.log('there');

  log('welcome');
  const sock = io();


  const canvas = document.querySelector('canvas')


  const {
      fillCell,
      reset,
      getCellCoordinate
  } = getBoard(canvas);

  reset();



  const OnCLick = (ev) => {
    const { x,y } = getCoordinates(canvas, ev)


    sock.emit('turn', getCellCoordinate(x, y));

   
  }

  //drawBoard()



  //fillRect(0,0,'red')
  //const ctx = canvas.getContext('2d');

  canvas.addEventListener('click', OnCLick)

  //ctx.fillStyle =  'red';
  //ctx.fillRect(0,0,50,50);

  sock.on('msg', log);

  sock.on('drawRec', ({x,y,color}) => {
    fillCell(x, y, color)
  })

  document
      .querySelector('#chat-form')
      .addEventListener('submit', onChatSubmitted(sock))
})();