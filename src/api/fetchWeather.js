import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchWeather = async(query) => {
    //we destrucutre the response and take only the data object
    const {data} = await axios.get(URL, {
        //params is 2nd arg to axios get function and attaches
        //queries to teh end of the get url
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY
        }
    });

    return data;
}