# React Frontend Dasboard

### Instructions

1. git clone `https://gitlab.sxchange.ph/meteor-frontend/react-pob-account-inquiry.git`
2. `npm install` if ssh did'nt work on your side go to package json change ssh to https
3. `npm run start-dev`

### App directory structure
```
|-- app
    |-- main.js => entry point for client
    |-- routes.js => add your containers/pages here
    |-- assets
    |   |-- css
    |   |   |-- overrides.css => modify this file if you want to override some styles
    |   |-- images
    |-- components => put your components here (plop will add generated React-components here)
    |-- config
    |   |-- ServerConfig.js => server configuration file
    |   |-- ClientConfig.js => client configuration file
    |-- containers
    |-- experimental => common/shared components/containers under development
    |   |-- App
    |   |   |-- App.js => React app wrapper
    |-- middlewares
    |   |-- ServerApiMiddleware.js => don't need to touch this either, this middleware relays request to the host specified in APIHOST env variable
    |   |-- auth.js
    |-- state
    |   |-- injectState.js => add your stores here (plop will modify this file upon store generation)
    |-- stores => put your mobx stores here (plop will add generated mobx stores here)
    |-- utils
```
### File generation using plop

* You can also generate file based on a template using plop.
* Be sure to install `plop` globally. To display global npm packages, execute `npm list -g --depth 0`.
* Just execute `plop` in a terminal while you are in the root directory of your project.
* After executing `plop`, available generators will be displayed. Just choose the generator that you need and press enter.


### Resources

* React https://facebook.github.io/react/
* Mobx state management https://github.com/mobxjs/mobx
* React Bootstrap https://react-bootstrap.github.io/
* React Router https://github.com/reactjs/react-router
* Webpack https://webpack.github.io/
* React Motion https://github.com/chenglou/react-motion
* plop https://github.com/amwmedia/plop
