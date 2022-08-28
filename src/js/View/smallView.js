import * as twinView from './twinView';

/*
export function renderSideLoader(num) {
    const markup = `
    <div class="icon-circle-small">
                <i class="fa-solid fa-circle-notch"></i>
            </div>
    `
    document.querySelector(`.${num}`).insertAdjacentHTML('afterbegin', markup);
}

export function clearSideLoader(num) {
    const loader = document.querySelector(`.${num}`);
    loader.parentElement.removeChild(loader);
}
*/

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
            <div class="box-cont" data-name = "${place.name}">
            <div class="cur-timely">
                <h6 class="small time-now-${num}">${twinView.getTime(place.time)}</h6>
                <i class="fa-regular fa-circle-stop"></i>
            </div>
            <div>
                <img src="${place.img}" alt="weather" height="60px" width="60px" class="small small-icon">
                <ul class="con-list-small">
                    <div class= "div-cons"><li class="small small-wetter-${num} small-cons">${place.condition}</li> </div>
                    <li class="small small-wetter-${num} small-temp-c">${place.temp_c}&#176C</li>
                </ul>
            </div>
            <div class="theHeading">
                <h3 class="small headings small-top">${place.name}</h3>
                <h5 class="small headings small-next">${place.country}</h5>
                <i class="fa-solid fa-${num} fa-circle-arrow-right"></i>
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



