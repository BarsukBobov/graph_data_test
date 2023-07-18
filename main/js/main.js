
function create_rows_array(){
    let cross_array_board=[]
    for(let i = 0; i < 357; i++){
        cross_array_board[i]=i
    }
    return cross_array_board
}

function create_game_board(BASE_BOARD){
    let i=0
    let html=''
    size=20
    BASE_BOARD.forEach((num)=>{
        let left=25*parseInt((i/7))
        let top =25*parseInt(i%7)
        // if (left>104) left+=4
        // if (left>264) left+=4
        // if (top>104) top+=4
        // if (top>264) top+=4
            html+=`
<div data-cell="${i}" aria-label="${num}" class="su-cell" style="top: ${top}px; left: ${left}px; width: ${size}px; height: ${size}px;">
</div>`

        i++
    })
    let board=document.querySelector(".su-board")
    board.insertAdjacentHTML("afterbegin", html)


}

BASE_BOARD=create_rows_array()
create_game_board(BASE_BOARD)


