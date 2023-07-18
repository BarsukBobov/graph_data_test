function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function date_array(date){
    let date_str_array=[]
    for(let i=357;i>0; i--){
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        date.setDate(date.getDate() - 1)
        let date_str = year + "-" + month + "-" + day;
        console.log(date_str)
        date_str_array.unshift(date_str)
    }
    return date_str_array
}
function create_rows_array(){
    let cross_array_board=[]
    for(let i = 0; i < 357; i++){
        cross_array_board[i]=i
    }
    return cross_array_board
}

function get_color(contributions){
    if (contributions===undefined) return color="#EDEDED"
    if (contributions>=1&&contributions<10) return color="#ACD5F2"
    if (contributions>=10&&contributions<20) return color="#7FA8C9"
    if (contributions>=20&&contributions<30) return color="#527BA0"
    if (contributions>=30) return color="#254E77"
}

function create_game_board(BASE_BOARD){
    let i=0
    let html=''
    const size=20
    BASE_BOARD.forEach((date)=>{
        const left =25*parseInt(i/7)
        const top =25*parseInt(i%7)+"px"
        const contributions=json_dict[date]
        console.log(contributions)
        const color=get_color(contributions)
            html+=`
<div data-cell="${i}" aria-label="${date}" class="su-cell" style="top: ${top}; left: ${left}px; width: ${size}px; height: ${size}px; background-color: ${color}">
</div>`
        i++
    })
    const board=document.querySelector(".su-board")
    board.insertAdjacentHTML("afterbegin", html)


}

BASE_BOARD=create_rows_array()
response=httpGet("https://dpg.gg/test/calendar.json")
console.log(response)
var json_dict = JSON.parse(response);
console.log(json_dict["2022-05-31"])
var date = new Date();
delay_week=7-date.getDay()
date.setDate(date.getDate() + delay_week)
date_str_array = date_array(date)
console.log(date_str_array)

create_game_board(date_str_array)


