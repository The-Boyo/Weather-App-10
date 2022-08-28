import Search from "./Models/Search";
import * as searchView from "./View/searchView";
import * as smallView from "./View/smallView";

///Search Controller ////

const state = {};


async function controlSearch(query) {
    // Get User Input

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

            // document.querySelector('.city').textContent = '';
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
    // smallView.clearAllUI(num);
    // smallView.renderSideLoader(num);
    try {
        await state.aside.getData(asideCity);
        // smallView.clearSideLoader(num);
        smallView.flipBox(num);
        smallView.renderSmall(state.aside, num);
        // smallView.setBackground(state.aside.condition, state.aside.time, num);


    } catch (error) {
        alert(`Oops!! Refresh...`);
    }

}

async function callCities() {
    await asideWeather('Paris', 'one');
    await asideWeather('Sydney', 'two');
    await asideWeather('Sao', 'three');
    await asideWeather('Douala', 'four');
    await asideWeather('Siberia', 'five');
    await asideWeather('Dubai', 'six');
}

async function boxRefresh(el) {
    const id = el.target.closest('.box').id;
    smallView.clearAllUI(id);
    smallView.flipBox(id);
    // smallView.renderSideLoader(id);
    console.log(id);
    if (id === 'one') {
        await asideWeather('Paris', id);
    } else if (id === 'two') {
        await asideWeather('Sydney', id);
    } else if (id === 'three') {
        await asideWeather('Sao', id);
    } else if (id === 'four') {
        await asideWeather('Douala', id);
    } else if (id === 'five') {
        await asideWeather('Siberia', id);
    } else if (id === 'six') {
        await asideWeather('Dubai', id);
    }
    smallView.setBackground(state.aside.condition, state.aside.time, id);
}

async function showMore(e) {

    if (e.target.matches('.fa-circle-arrow-right')) {
        const name = e.target.parentElement.parentElement.dataset.name;
        controlSearch(name);
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

        console.log('App is working')

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


    } catch (error) {
        alert(`App Not Started!!..Refresh Or Check Internet Connection`)
        searchView.clearUI();
    }

}
init();





