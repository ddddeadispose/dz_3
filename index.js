#!/usr/bin/env node
const { hideBin } = require('yargs/helpers')
const API_KEY = require('./config.js')
const http = require('http')
const location = hideBin(process.argv).toString()

const options = {
    hostname: 'api.weatherstack.com',
    path: `/current?access_key=${API_KEY.API_KEY}&query=${location}`,
    method: 'GET',
};


let data = '';

const result = http.get(options, (res) => {

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {

        const parsedData = JSON.parse(data);
        console.log(`Погода в: ${parsedData.location.name}`)
        console.log(`Температура: ${parsedData.current.temperature}`)
        console.log(`Ощущается как: ${parsedData.current.feelslike}`)
        console.log(`Погода: ${parsedData.current.weather_descriptions[0]}`)
        console.log(`Ветер: ${parsedData.current.wind_speed} м/с`)

    });
})

result.on('error', (error) => {
    console.error(error);
});
