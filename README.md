# COVID-19 Tracker

#### A React application for tracking COVID-19.

#### By _**Supriya M Venkatachala**_

## Description:

This tracker provides the number of confirmed cases and deaths from novel coronavirus by country, the trend in confirmed case and death counts by country, and a global map showing which countries are infected.

<!-- [Click here](https://priyaraj7.github.io/Covid-19-Tracker/#/) to see Live Server -->

## Use Case

- In home page, user can track/see the details of COVID-19 infection.
- User can search specific country and USA state to see the details of COVID-19 infection.
- User can navigate to the map page using navingation bar.
- In map page, user can see the zoomable choropleth world-map based on number of active-cases of COVID-19.
- If mouseover/hover the country, user can see the tooltip providing the data of COVID-19.

## Component diagram:

![Component Diagram](https://raw.githubusercontent.com/priyaraj7/Covid-19-Tracker/master/component-diagram.png)

## Minimum Viable Product

- The project is to fetch the live data from the API.

- Application parses API response and displays response data in the UI.

- If there’s no access to the server, user will receive an error message.

## In progress

- Support saving user preference using [local-storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Add unit test.
- In future, I want to fetch more country data.

## Technologies Used

- APIs
- React-hooks
- D3.js
- Axios
- React Router
- React Bootstrap
- CSS
- NPM

## Setup

- Open the Terminal
- Clone this repository
- Navigate to the directory
- Install npm package `npm install`
- In the project directory run `npm start`.
- Open http://localhost:3000 to view it in the browser.

## Reference:

API: https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest

Custom Map: https://geojson-maps.ash.ms

## Acknowledgement:

https://www.epicodus.com

Copyright (c) 2020 (Supriya)
