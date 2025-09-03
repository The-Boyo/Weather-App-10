import _ from 'lodash';
import Search from "./Models/Search";
import * as searchView from "./View/searchView";
import * as smallView from "./View/smallView";
import * as dateView from "./View/dateView";

///Search Controller ////

const state = {};


async function controlSearch(query) {
    //Clear Previous search from UI
    if (query) {
        searchView.clearUI();
        searchView.renderLoader();

        //Get New Search
        try {
            state.citySearch = new Search();

            await state.citySearch.getData(query);

            //Display new Search on UI
            searchView.clearLoader();
            searchView.renderItem(state.citySearch);
            searchView.limitTitle(state.citySearch.name);
            searchView.setBackground(state.citySearch.condition, state.citySearch.time);

        } catch (error) {
            alert(`Ooops!! there was an error..Please Try again`);
            searchView.clearUI();
            smallView.loopClear();
            init();
        }
    }

}


/////// CONTROL SIDE WEATHER/////

async function asideWeather(asideCity, num) {
    state.aside = new Search;
    try {
        await state.aside.getData(asideCity);
        smallView.flipBox(num);
        smallView.renderSmall(state.aside, num);

    } catch (error) {
        alert(`Oops!! Refresh...`);
        smallView.loopClear();
        init();
    }
}



async function callCities() {

    if (localStorage.length > 0) {
        for (const key in localStorage) {
            if (key === 'one') {
                if ( localStorage[key] !== "undefined") {
                    await asideWeather(localStorage.getItem('one'), 'one');
                } else  {
                    await asideWeather('Accra', 'one');
                    localStorage.setItem('one', 'Accra');
                }
            } else if (key === 'two') {
                if ( localStorage[key] !== "undefined") {
                    await asideWeather(localStorage.getItem('two'), 'two');
                } else  {
                    await asideWeather('Rio', 'two');
                    localStorage.setItem('two', 'Rio');
                }
            } else if (key === 'three') {
                if ( localStorage[key] !== "undefined") {
                    await asideWeather(localStorage.getItem('three'), 'three');
                } else  {
                    await asideWeather('London', 'three');
                    localStorage.setItem('three', 'London');
                }
            } else if (key === 'four') {
                if ( localStorage[key] !== "undefined") {
                    await asideWeather(localStorage.getItem('four'), 'four');
                } else  {
                    await asideWeather('Delhi', 'four');
                    localStorage.setItem('four', 'Delhi');
                }
            } else if (key === 'five') {
                if ( localStorage[key] !== "undefined") {
                    await asideWeather(localStorage.getItem('five'), 'five');
                } else  {
                    await asideWeather('Kampala', 'five');
                    localStorage.setItem('five', 'Kampala');
                }
            } else if (key === 'six') {
                if ( localStorage[key] !== "undefined") {
                    await asideWeather(localStorage.getItem('six'), 'six');
                } else  {
                    await asideWeather('Chicago', 'six');
                    localStorage.setItem('six', 'Chicago');
                }
            }
        }
    }

    else {
        await asideWeather('Accra', 'one');
        localStorage.setItem('one', state.aside.name);
        await asideWeather('Rio', 'two');
        localStorage.setItem('two', state.aside.name);
        await asideWeather('London', 'three');
        localStorage.setItem('three', state.aside.name);
        await asideWeather('Delhi', 'four');
        localStorage.setItem('four', state.aside.name);
        await asideWeather('Kampala', 'five');
        localStorage.setItem('five', state.aside.name);
        await asideWeather('Chicago', 'six');
        localStorage.setItem('six', state.aside.name);
    }
}


async function boxRefresh(el) {
    const id = el.target.closest('.box').id;
    if(!el.target.className.includes('fa')){
        smallView.clearAllUI(id);
        smallView.flipBox(id);
        if (id === 'one') {
            await asideWeather(localStorage.getItem('one'), id);
        } else if (id === 'two') {
            await asideWeather(localStorage.getItem('two'), id);
        } else if (id === 'three') {
            await asideWeather(localStorage.getItem('three'), id);
        } else if (id === 'four') {
            await asideWeather(localStorage.getItem('four'), id);
        } else if (id === 'five') {
            await asideWeather(localStorage.getItem('five'), id);
        } else if (id === 'six') {
            await asideWeather(localStorage.getItem('six'), id);
        }
        smallView.setBackground(state.aside.condition, state.aside.time, id);
    }
}

async function showMore(e) {
    if (e.target.matches('.fa-circle-arrow-right')) {
        const name = e.target.parentElement.parentElement.dataset.name;
        await controlSearch(name);
    }
}


async function changeCity(el) {
    if (el.target.matches('.fa-arrow-right-arrow-left')) {
        const ans = confirm(`Do you really want to change this city?`);
        if (ans === true) {
            const smallQuery = prompt('Enter new city name');
            try {
                if (smallQuery) {
                    const num = el.target.parentElement.parentElement.dataset.box;
                    smallView.clearAllUI(num);
                    await asideWeather(smallQuery, num);
                    if (num === 'one') {
                        localStorage.removeItem('one');
                        localStorage.setItem('one', state.aside.name);
                    } else if (num === 'two') {
                        localStorage.removeItem('two');
                        localStorage.setItem('two', state.aside.name);
                    } else if (num === 'three') {
                        localStorage.removeItem('three');
                        localStorage.setItem('three', state.aside.name);
                    } else if (num === 'four') {
                        localStorage.removeItem('four');
                        localStorage.setItem('four', state.aside.name);
                    } else if (num === 'five') {
                        localStorage.removeItem('five');
                        localStorage.setItem('five', state.aside.name);
                    } else if (num === 'six') {
                        localStorage.removeItem('six');
                        localStorage.setItem('six', state.aside.name);
                    }
                }
            } catch (error) {
                alert(`error loading request.Please try again!!`)
                console.log(error)
            }
        }
    }
}

//Removing smallView UI from small screens(Phones)
function changeAppView() {
    if (window.innerWidth < 568) {
        Array.from(document.querySelectorAll('.box')).forEach(cur => cur.style.display = 'none');
        document.querySelector('.fa-circle-info').style.visibility = 'hidden';
    } else {
        Array.from(document.querySelectorAll('.box')).forEach(cur => cur.style.display = 'block')
        document.querySelector('.fa-circle-info').style.visibility = 'visible';
    }
}


/* 
APP INITIALIZATION FUNCTION
*/

async function init() {

    searchView.clearUI();
    state.begin = new Search;

    try {
        await state.begin.getData('Nairobi');
        searchView.renderItem(state.begin);
        searchView.setBackground(state.begin.condition, state.begin.time);

        await callCities();

        dateView.clearFooter();
        dateView.renderDateFooter();

        window.addEventListener('resize', changeAppView);

        document.querySelector('.search-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            controlSearch(document.querySelector('.city').value);
        })

        Array.from(document.querySelectorAll('.box')).forEach(cur => {
            cur.addEventListener('click', boxRefresh);
        })

        Array.from(document.querySelectorAll('.box')).forEach(ele => {
            ele.addEventListener('click', showMore);
        })

        Array.from(document.querySelectorAll('.box')).forEach(cur => {
            cur.addEventListener('click', changeCity);
        })

    } catch (error) {
        alert(`App Not Started!!..Refresh Or Check Internet Connection`)
        searchView.clearUI();
    }

}
init();




