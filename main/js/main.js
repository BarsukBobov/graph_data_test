const week_days={
    0:"Понедельник",
    1:"Вторник",
    2:"Среда",
    3:"Четверг",
    4:"Пятница",
    5:"Суббота",
    6:"Воскресение",
}

const rus_months={
    1:"Январь",
    2:"Февраль",
    3:"Март",
    4:"Апрель",
    5:"Май",
    6:"Июнь",
    7:"Июль",
    8:"Август",
    9:"Сентябрь",
    10:"Октябрь",
    11:"Ноябрь",
    12:"Декабрь"
}

const short_rus_months={
    1:"Янв.",
    2:"Февр.",
    3:"Март",
    4:"Апр.",
    5:"Май",
    6:"Июнь",
    7:"Июль",
    8:"Авг.",
    9:"Сент.",
    10:"Окт.",
    11:"Нояб.",
    12:"Дек."
}

function httpGet(theUrl)
{
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function date_array(date){
    let date_str_array=[]
    let date_tips_array=[]
    for(let i=357;i>0; i--){
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        date.setDate(date.getDate() - 1)
        const date_str = year + "-" + month + "-" + day;
        date_str_array.unshift(date_str)
        const date_tip=  `${rus_months[month]} ${day}, ${year}`;
        date_tips_array.unshift(date_tip)
    }
    date.setDate(date.getDate() + 1)
    const first_month=date.getMonth() + 1;
    return [date_str_array, date_tips_array, first_month]
}

function get_color(contributions){
    if (contributions===0) return color="#EDEDED"
    if (contributions>=1&&contributions<10) return color="#ACD5F2"
    if (contributions>=10&&contributions<20) return color="#7FA8C9"
    if (contributions>=20&&contributions<30) return color="#527BA0"
    if (contributions>=30) return color="#254E77"
}

function create_game_board(date_str_array, date_tips_array, first_month){
    let i=0
    let html=''
    const size=20
    date_str_array.forEach((date)=>{
        const left =22*parseInt(i/7)+"px"
        const top =22*parseInt(i%7)+"px"
        let contributions=json_dict[date]
        if (contributions===undefined) contributions=0
        const color=get_color(contributions)


            html+=`
<div data-cell="${i}" aria-label="${date}" class="su-cell" style="top: ${top}; left: ${left}; width: ${size}px; height: ${size}px; background-color: ${color}">
<span class="tooltiptext">
<div style="color: white" >${contributions} contributions</div>
<div style="font-size: 80%">${week_days[i%7]}, ${date_tips_array[i]}</div>
</span>
</div>`
        i++
    })
    const board=document.querySelector(".su-board")
    board.insertAdjacentHTML("afterbegin", html)
    const days_of_week=["Пн","Cр", "Пт"]

    // дни недели
    const edge=document.querySelector(".edge")
    html_days=""
    i=0
    for (let day of days_of_week){
        html_days+=`<div style="position: relative; top: ${i*25}px">${day}</div>`
        i++
    }
    edge.insertAdjacentHTML("afterbegin", html_days)

    // месяцы
    const edge2=document.querySelector(".edge2")
    console.log(first_month)
    html_month=""
    i=first_month-1
    for (let j=0;j<12;j++){
        html_month+=`<div style="position: absolute; top: -20px; left: ${j*94}px">${short_rus_months[i%12+1]}</div>`
        i++
    }
    edge2.insertAdjacentHTML("afterbegin", html_month)


}


const response=httpGet("https://dpg.gg/test/calendar.json")
const json_dict = JSON.parse(response);
var date = new Date();
const delay_week=7-date.getDay()
date.setDate(date.getDate() + delay_week)
const [date_str_array, date_tips_array, first_month] = date_array(date)
console.log(date_str_array)

create_game_board(date_str_array, date_tips_array, first_month)


