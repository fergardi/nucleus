#Project Nucleus

<p align="center">
  <img src="https://img.shields.io/badge/nodejs-6.9.1-brightgreen.svg">
  <img src="https://img.shields.io/badge/npm-4.3.0-brightgreen.svg">
  <img src="https://img.shields.io/badge/vuejs-2.1.1-brightgreen.svg">
  <img src="https://img.shields.io/badge/vuematerial-0.7.1-brightgreen.svg">
  <img src="https://img.shields.io/badge/cordova-6.5.0-brightgreen.svg">
  <img src="https://img.shields.io/badge/electron-1.6.1-brightgreen.svg">
</p>

A starter scaffolded project to quickstart HTML5 + CSS3 + JS apps using [NodeJS](https://nodejs.org/), [Browserify](http://browserify.org/), [ESLint](http://eslint.org/), [VueJS](https://vuejs.org/) and [VueMaterial](https://vuematerial.github.io/#/).

It also can build and publish your app into Web, Mobile (using [Cordova](https://cordova.apache.org/)) and Desktop (using [Electron](https://electron.atom.io/)).

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
cordova run android
cordova run ios
```

### Desktop publishing

```
cd /web
npm run electron
cd /electron
npm install
npm run electron
```
