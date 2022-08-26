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

//CHANGE COLOR TO DISTINGUISH BACKGROUND//

const changeAllColor = (num) => {
    const tempColor = Array.from(document.querySelectorAll(`.${num}`));
    tempColor.forEach(el => {
        el.style.color = '#ddf';
    })
}

export const changeTimeColor = () => {
    const tempColor = Array.from(document.querySelectorAll('.time-now'));
    tempColor.forEach(el => {
        el.style.color = '#ddf';
    })
}

export const changeTempColor = () => {
    const tempColor = Array.from(document.querySelectorAll('.small-wetter'));
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
                twinView.conBackground(con, display, changeTimeColor, changeTempColor);
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
                twinView.conBackground(con, display, changeTimeColor, changeTempColor);
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
                twinView.conBackground(con, display, changeTimeColor, changeTempColor);
            }
        } else if (newTime.length === 7) {
            masaa = eval(`${newTime[0]}`)
            if (masaa >= 6) {
                twinView.conBackground(con, display, changeTimeColor, changeTempColor);
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
                <div class="cur-timely">
                    <h6 class="small time-now">${twinView.getTime(place.time)}</h6>
                </div>
                <div>
                    <img src="${place.img}" alt="weather" height="60px" width="60px" class="small small-icon">
                    <ul class="con-list-small">
                        <li class="small small-wetter small-cons">${place.condition}</li>
                        <li class="small small-wetter small-temp-c">${place.temp_c}&#176C</li>
                    </ul>
                </div>
                <div class="theHeading">
                    <h3 class="small headings small-top">${place.name}</h3>
                    <h5 class="small headings small-next">${place.country}</h5>
                </div>`

    document.querySelector(`.${num}`).insertAdjacentHTML('beforeend', markup);
}

// CLEAR SIDE WEATHER DATA FROM UI ///
export function clearAllUI(num) {
    document.querySelector(`.${num}`).innerHTML = '';
    document.querySelector(`.${num}`).style.backgroundImage = 'none';
}

//CLEAR ALL SIDE WEATHER AFTER FAILED SEARCH /// 
export function loopClear() {
    Array.from(document.querySelectorAll('.box')).forEach(cur => {
        clearAllUI(cur.id);
    });
}



