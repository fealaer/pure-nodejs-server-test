# Simple web app on node.js & express

### App

##### Install App
**Note** For running you need to use node version which supports ES6 features.

```
git clone git@github.com:fealaer/pure-nodejs-server-test.git
cd pure-nodejs-server-test
nvm use 4.1.2
npm install
```

##### Run App

```
node app.js
```

### Tests

##### Install NightWatch

```
npm install nightwatch -g
```

##### Install Selenium

* Install Selenium [Installation Guide](http://nightwatchjs.org/guide#installation)
* Set up a correct path to a selenium jar file in nightwatch.json option `selenium.server_path`

##### Run Tests

```
nightwatch
```
