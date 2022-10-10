import { docs } from '../Models/Display';
import * as twinView from './twinView'


//Render the loader on Main display 

export function renderLoader() {
    const markup = `
    <div class="icon-circle">
                <i class="fa-solid fa-circle-notch"></i>
            </div>
    `
    docs.alt.insertAdjacentHTML('beforeend', markup);
}

//Clear SearchView Loader
export function clearLoader() {
    const loader = document.querySelector('.icon-circle');
    if (loader) loader.parentElement.removeChild(loader);
}

//Fitting display of long worded City Names
export function limitTitle(title) {
    if (title.length > 27) {
        document.querySelector('.top').style.left = '25%';
        document.querySelector('.next').style.left = '25%';
    }
}

function UVIndex(uv) {
    if (uv <= 2) {
        return `Low`;
    } else if (uv > 2 && uv <= 5) {
        return `Moderate`;
    } else if (uv > 5 && uv <= 7) {
        return `High`;
    } else if (uv > 7 && uv <= 10) {
        return `Very High`;
    } else if (uv > 10) {
        return `Extreme`;
    }
}

const changeAllColor = () => {
    const tempColor = Array.from(document.querySelectorAll('.wetter, .cur-time, .heading, .wet'));
    tempColor.forEach(el => {
        el.style.color = '#ddf';
    })
}


export const changeTimeColor = () => {
    const tempColor = Array.from(document.querySelectorAll('.cur-time, .wetter, .wet'));
    tempColor.forEach(el => {
        el.style.color = '#ddf';
    })
}

// export const changeTempColor = () => {
//     const tempColor = Array.from(document.querySelectorAll('.wetter'));
//     tempColor.forEach(el => {
//         el.style.color = '#ddf';
//     })
// }

export const changeColor = () => {
    const connyNew = Array.from(document.querySelectorAll('.wet'));
    connyNew.forEach(el => {
        el.style.color = '#ddf';
    });
}




/* 
Setting the Main display Background
*/

const display = document.querySelector('.display');

export function setBackground(con, timer) {
    const newTime = twinView.getTime(timer);

    if (newTime.endsWith('pm')) {
        let saa;
        if (newTime.length === 8) {
            saa = eval(`${newTime[0]}${newTime[1]}`);
            if (saa === 12) {
                twinView.conBackground(con, display, changeColor, changeTimeColor);
            } else if (saa >= 7) {
                display.style.backgroundImage = "url('../img/night.jpg')";
                changeAllColor();
            }
        }
        else if (newTime.length === 7) {
            saa = eval(`${newTime[0]}`);
            if (saa >= 7) {
                display.style.backgroundImage = "url('../img/night.jpg')";
                changeAllColor();
            } else if (saa < 7) {
                twinView.conBackground(con, display, changeColor, changeTimeColor);
            }
        }
    }

    else if (newTime.endsWith('am')) {
        let masaa;
        if (newTime.length === 8) {
            masaa = eval(`${newTime[0]}${newTime[1]}`);
            if (masaa === 12) {
                display.style.backgroundImage = "url('../img/night.jpg')";
                changeAllColor();
            } else if (masaa >= 7) {
                twinView.conBackground(con, display, changeColor, changeTimeColor);
            }
        } else if (newTime.length === 7) {
            masaa = eval(`${newTime[0]}`)
            if (masaa >= 6) {
                twinView.conBackground(con, display, changeColor, changeTimeColor);
            } else if (masaa < 6) {
                display.style.backgroundImage = "url('../img/night.jpg')";
                changeAllColor();
            }
        }
    }

}


//Render Search to UI

export function renderItem(town) {
    const markup = `<div class= "disp">
                <div class="cur-time">
                    <h6 class="current">Current Weather</h6>
                    <h6 class="time">${twinView.getTime(town.time)}</h6>
                    <p class="date">${twinView.getDate(town.time)}</p>
                </div>
                <div class= "con-temp">
                <ul class="con-list-1">
                <li> <img src="${town.img}" alt="weather" class="weather"></li >
                <li  class="wetter temp-c">${twinView.removeDecimal(town.temp_c)}<span class= "deg">&#176</span>c</li >
                <li class="wetter cons">${town.condition}</li >
                    </ul>
                </div>
                <div>
                    <h1 class="heading top">${town.name}</h1>
                    <h3 class="heading next">${town.country}</h3>
                </div>
                <div class="all-con">
                            <ul class="con-list">
                                <li class="wet temp-f">Feels Like => ${twinView.removeDecimal(town.feelslike)}&#176c</li >
                                <li class="wet wind-speed-kph">Wind Speed => ${town.wind_kph} km/h</li >
                                <li class="wet wind-speed-kph">Gust => ${town.gust_kph} km/h</li >
                                <li class="wet wind-direction">Wind Direction => ${town.wind_dir}</li >
                                <li class="wet wind-degree">Wind Degree => ${town.wind_degree}&#176</li >
                                <li class="wet pressure">Pressure => ${town.pressure_mb} mb</li >
                                <li class="wet prec">Precipitation => ${town.prec} mm</li >
                                <li class="wet humidity">Humidity =>${town.humidity}%</li >
                                <li class="wet cloud">Cloud=> ${town.cloud}</li >
                                <li class="wet uv">UV => ${UVIndex(town.uv)}</li >
                            </ul>
                </div>`

    document.querySelector('.alt-disp').insertAdjacentHTML('beforeend', markup);
}


//Clear Main city UI

export function clearUI() {
    docs.city.value = '';
    docs.alt.innerHTML = ' ';
    display.style.backgroundImage = 'none';
    display.classList.remove('overcast');
}