# Speech Therapy App UI

Report tool for assisting in speech therapy evaluations.
This tool now enables the following features:
- Register / Login / Logout (Session is maintained in localstorage until you logout)
- Create evaluations (MASA test for now only, but in the future we will add many more)
- View your patients and your patients details
- View your history of evaluations performed and details about past evaluations

Technologies used:
- `react v15.6.1`
- `redux v3.7.1`
- `react-redux v5.0.5`
- `react-router-dom v4.1.1`
- `redux-form v6.8.0`
- `bootstrap v4.0.0-beta`
- `reactstrap v4.8.0`
- `webpack v3.0.0`
- `webpack-dev-server v2.5.0`

## Starting the dev server

1. Run `npm install` or `yarn install`
2. Start the dev server using `npm start`
3. Open [http://localhost:8080](http://localhost:8080)

## Available Commands

- `npm start` - start the dev server
- `npm clean` - delete the dist folder
- `npm run production` - create a production ready build in `dist` folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests

## Production code

Run `npm run production`. The production-ready code will be located under `dist` folder.