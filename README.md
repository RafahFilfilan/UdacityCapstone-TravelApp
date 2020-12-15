# Travel App - Udacity Capstone
This is a project developed by Rafah for the Udacity Front-End Development Nano-Degree course.

This project uses Geonames API to get cities names,<br />
then uses WeatherBit API to get the city's weather,<br />
then uses Pixabay API to get an image of this city.<br />

--------------

## Get Started
`cd` to your folder <br />

Check if Node.js is installed by `node -v`

Install loaders and plugins:<br />
```
npm install express
npm install body-parser
npm install cors
npm i webpack webpack-cli
npm i -D @babel/core @babel/preset-env babel-loader
npm i -D style-loader node-sass css-loader sass-loader
npm i -D clean-webpack-plugin
npm i -D html-webpack-plugin
npm install file-loader
npm install --save-dev html-loader
npm install webpack-dev-server --save-dev
npm install dotenv
npm install node-fetch
npm install workbox-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
npm i workbox-webpack-plugin
```

You may face a problem with webpack versions, the ones worked for me are the following:<br />
Downgrade the webpack package to 4.44.2<br />
use: `npm install webpack@4.44.2` <br />
and webpack-cli to 3.3.12<br />
use: `npm install webpack-cli@3.3.12`<br />

In the terminal, check that webpack is running by typing [npm run dev], then type [npm run start]

Then, create an API in:
Geo Names, which is a geographical database covers all countries and contains over eleven million placenames.<br />
Weather Bit, which returns a 16 day forecast in 1 day intervals from any point on the planet.<br />
Pixabay, which is a RESTful interface for searching and retrieving free images released under the Pixabay License.<br />

After that, you have to create a `.env` file and type:
```
username=**********
WEATHER_API_KEY=**********
PIXABAY_API_KEY=**********
```

For the testing part, I installed jest and supertest
```
npm install jest
npm install supertest
```


The feature I chose to extend my project to stand out is <b>Adding end date and display length of trip</b>.

