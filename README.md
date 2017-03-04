# Project Nucleus

A starter scaffolded project to quickstart web HTML5 + CSS3 + JS apps using [NodeJS](https://nodejs.org/), [Browserify](http://browserify.org/), [ESLint](http://eslint.org/), [VueJS](https://vuejs.org/) and [VueMaterial](https://vuematerial.github.io/#/).

It also can build and publish your web app into mobile (using [Cordova](https://cordova.apache.org/)) and desktop (using [Electron](https://electron.atom.io/)).

![Web](web.png?raw=true)
![Mobile](mobile.png?raw=true)
![Desktop](desktop.png?raw=true)

### Dependencies

I assume you have already installed NodeJS and NPM. If not, do it. After that, you need to install the following dependencies globally:
```
npm install -g cordova
npm install -g electron-forge
```

### Web developing

```
cd /web
npm install
npm run dev
```

### Web publishing

```
cd /web
npm install
npm run build
```

### Mobile publishing

```
cd /web
npm run cordova
cd /cordova
cordova platform add android
cordova platform add ios
cordova plugin add cordova-plugin-crosswalk-webview
npm run android
npm run ios
```

### Desktop publishing

```
cd /web
npm run electron
cd /electron
npm install
npm run dev
npm run build
```
