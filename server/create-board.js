const createBoard = (size) =>{

    let board;

    const clear = Array(size).fill().map(()=>Array(size).fill(null))

    const getBoard = board;

    const makeTurn = (x,y, color)=>{
        board[y][x] = color;
    };

    return {
        clear, 
        getBoard,
        makeTurn
    };


};

module.exports = createBoard;