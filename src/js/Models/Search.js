import axios from "axios";
import * as searchView from "../View/searchView"

export default class Search {
    constructor() {
        this.items = {};
    }

    async getData(query) {
        try {
            const res = await axios(`https://api.weatherapi.com/v1/current.json?key=914a0de65e1642fe8b5132613221506&q=${query}`);
            this.item = res.data;

            this.img = this.item.current.condition.icon;
            this.name = this.item.location.name;
            this.country = this.item.location.country;
            this.condition = this.item.current.condition.text;
            this.temp_c = this.item.current.temp_c
            this.feelslike = this.item.current.feelslike_c;
            this.prec = this.item.current.precip_mm;
            this.pressure_mb = this.item.current.pressure_mb;
            this.uv = this.item.current.uv
            this.wind_degree = this.item.current.wind_degree
            this.wind_dir = this.item.current.wind_dir
            this.wind_kph = this.item.current.wind_kph
            this.gust_kph = this.item.current.gust_kph
            this.cloud = this.item.current.cloud;
            this.humidity = this.item.current.humidity;
            this.wind_degree = this.item.current.wind_degree;
            this.time = this.item.location.localtime;
        }

        catch (error) {
            alert('Error Processing Request!!!')
            searchView.clearUI();
        }
    }
}










