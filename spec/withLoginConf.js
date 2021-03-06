// This is the configuration file showing how a suite of tests might
// handle log-in using the onPrepare field.
var port =  + (process.env.HTTP_PORT || '8000'),
    baseUrl = 'http://localhost:8000';

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'login/login_spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  onPrepare: function() {
    browser.driver.get(baseUrl + '/login.html');

    browser.driver.findElement(by.id('username')).sendKeys('Jane');
    browser.driver.findElement(by.id('password')).sendKeys('1234');
    browser.driver.findElement(by.id('clickme')).click();

    // Login takes some time, so wait until it's done.
    // For the test app's login, we know it's done when it redirects to
    // index.html.
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return /index/.test(url);
      });
    });
  },

  baseUrl: baseUrl,
};
