function httpGet(theUrl)
{
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function date_array(date){
    let date_str_array=[]
    for(let i=357;i>0; i--){
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        date.setDate(date.getDate() - 1)
        const date_str = year + "-" + month + "-" + day;
        date_str_array.unshift(date_str)
    }
    return date_str_array
}

function get_color(contributions){
    if (contributions===0) return color="#EDEDED"
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
        const left =22*parseInt(i/7)+"px"
        const top =22*parseInt(i%7)+"px"
        let contributions=json_dict[date]
        if (contributions===undefined) contributions=0
        const color=get_color(contributions)
            html+=`
<div data-cell="${i}" aria-label="${date}" class="su-cell" style="top: ${top}; left: ${left}; width: ${size}px; height: ${size}px; background-color: ${color}">
<span class="tooltiptext">
<div style="color: white" >${contributions} contributions
</div >${date}</span>
</div>`
        i++
    })
    const board=document.querySelector(".su-board")
    board.insertAdjacentHTML("afterbegin", html)


}


const response=httpGet("https://dpg.gg/test/calendar.json")
const json_dict = JSON.parse(response);
var date = new Date();
const delay_week=7-date.getDay()
date.setDate(date.getDate() + delay_week)
const date_str_array = date_array(date)
console.log(date_str_array)

create_game_board(date_str_array)


