import * as twinView from './twinView';


//FLIP BOX TO SHOW USER HAS CLICKED//

export const flipBox = (num) => {
    document.querySelector(`.${num}`).classList.toggle('flip');
}


//CHANGE COLOR TO DISTINGUISH BACKGROUND//

const changeAllColor = (num) => {
    const tempColor = Array.from(document.querySelectorAll(`.${num}, .fa-${num}`));
    tempColor.forEach(el => {
        el.style.color = '#ddf';
    })
}

export const changeSmallTimeColor = (num) => {
    const tempColor = Array.from(document.querySelectorAll(`.time-now-${num}`));
    tempColor.forEach(el => {
        el.style.color = '#ddf';
    })
}

export const changeTempColor = (num) => {
    const tempColor = Array.from(document.querySelectorAll(`.small-wetter-${num}`));
    tempColor.forEach(el => {
        el.style.color = '#ddf';
    })
}


//SET SIDE WEATHER BACKGROUND

export function setBackground(con, timer, num) {
    const newTime = twinView.getTime(timer);
    const display = document.querySelector(`.${num}`);


    if (newTime.endsWith('pm')) {
        let saa;
        if (newTime.length === 8) {
            saa = eval(`${newTime[0]}${newTime[1]}`);
            if (saa === 12) {
                twinView.conBackground(con, display, changeSmallTimeColor, changeTempColor);
            } else if (saa >= 7) {
                display.style.backgroundImage = "url('../img/night.jpg')";
                changeAllColor(num);
            }
        }
        else if (newTime.length === 7) {
            saa = eval(`${newTime[0]}`);
            if (saa >= 7) {
                display.style.backgroundImage = "url('../img/night.jpg')";
                changeAllColor(num);
            } else if (saa < 7) {
                twinView.conBackground(con, display, changeSmallTimeColor, changeTempColor);
            }
        }
    }

    else if (newTime.endsWith('am')) {
        let masaa;
        if (newTime.length === 8) {
            masaa = eval(`${newTime[0]}${newTime[1]}`);
            if (masaa === 12) {
                display.style.backgroundImage = "url('../img/night.jpg')";
                changeAllColor(num);
            } else if (masaa >= 7) {
                twinView.conBackground(con, display, changeSmallTimeColor, changeTempColor);
            }
        } else if (newTime.length === 7) {
            masaa = eval(`${newTime[0]}`)
            if (masaa >= 6) {
                twinView.conBackground(con, display, changeSmallTimeColor, changeTempColor);
            } else if (masaa < 6) {
                display.style.backgroundImage = "url('../img/night.jpg')";
                changeAllColor(num);
            }
        }
    }

}



// RENDER SIDE WEATHER TO UI /////

export function renderSmall(place, num) {
    const markup = `
            <div class="box-cont" data-name = "${place.name}" data-box = "${num}">
            <div class="cur-timely">
                <h6 class="small is-timely time-now-${num}">${twinView.getTime(place.time)}</h6>
                <i class="fa-solid fa-arrow-right-arrow-left"></i>
                <p class="city-change">Change City</p>
                    <p class="small date-is">${twinView.getDate(place.time)}</p>
            </div>    
            <div class= "weather-temp">
                <img src="${place.img}" alt="weather" height="60px" width="60px" class="small small-icon">
                <ul class="con-list-small">
                <li class="small small-wetter-${num} small-temp-c">${twinView.removeDecimal(place.temp_c)}&#176C</li>
                <div class= "div-cons"><li class="small small-wetter-${num} small-cons">${place.condition}</li> </div>
                </ul>
            </div>
            <div class="theHeading">
                <h3 class="small headings small-top">${place.name}</h3>
                <h5 class="small headings small-next">${place.country}</h5>
                <i class="fa-solid fa-${num} fa-circle-arrow-right"></i>
                <p class="show-more">More...</p>
            </div>
            </div>`

    document.querySelector(`.${num}`).insertAdjacentHTML('beforeend', markup);
}

// CLEAR SIDE WEATHER DATA FROM UI ///
export function clearAllUI(num) {
    document.querySelector(`.${num}`).innerHTML = '';
    document.querySelector(`.${num}`).style.backgroundImage = 'none';
    document.querySelector(`.${num}`).style.color = 'black';

}

//CLEAR ALL SIDE WEATHER AFTER FAILED SEARCH /// 
export function loopClear() {
    Array.from(document.querySelectorAll('.box')).forEach(cur => {
        clearAllUI(cur.id);
    });
}



