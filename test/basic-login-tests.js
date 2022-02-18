'use strict';

require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');

const driver = new Builder().forBrowser('chrome').build();

var LoginPageElements = {
  lnkLoginLink: '//a[contains(text(), "login")]',
  txtUserName: "//input[@name='username']",
  txtPassword: '//input[@name="password"]',
  btnSubmit: '//input[@value="Submit"]',
  objHeader: '//p',
  lnkLogoutLink: '//a[contains(text(), "logout")]'
}

var testData = {
  strUsername: 'jack',
  strPassword: 'secret',
  strExpectedPageTitle: 'Simple App',
  strExpectedLoginPageTitle: 'Simple App Login',
  strName: 'Jack'
}

describe('Simple App', function () {

  before(function () {
    var strURL = 'http://localhost:3000/';
    driver.get(strURL);
  });

  after(function () {
    driver.close(); // code to close the browser at the end of the execution
  });

  describe('Login Validations', function () {
    // Test Case 1
    it('Test Case 1: User is able to check login link', async function () {

      if (await funcIsElementVisible("Login link", LoginPageElements.lnkLoginLink)) {
        console.log("Step 1: PASSED");
      } else {
        assert.fail("Step 1: FAILED");
      }
    });

    // Test Case 2
    it('Test Case 2: User is able to check homepage title', async function () {

      // Step 2: Validate if homepage page title is displayed
      if (await funcValidatePageTitle(testData.strExpectedPageTitle)) {
        console.log("Step 1: PASSED");
      } else {
        assert.fail("Step 1: FAILED");
      }

    });

    // Test Case 3
    it('Test Case 3: User is able to login to Simple App successfully', async function () {

      // Step 1: Click login link
      if (await funcClickLink("Login", LoginPageElements.lnkLoginLink)) {
        console.log("Step 1: PASSED");
      } else {
        assert.fail("Step 1: FAILED");
      }

      // Step 2: Validate if login page title is displayed
      if (await funcValidatePageTitle(testData.strExpectedLoginPageTitle)) {
        console.log("Step 2: PASSED");
      } else {
        assert.fail("Step 2: FAILED");
      }

      // Step 3: Populate Username
      //var objTextfield = await driver.findElement(By.xpath(LoginPageElements.txtUserName))
      if (await funcSetText("Username", testData.strUsername, LoginPageElements.txtUserName)) {
        console.log("Step 3: PASSED");
      } else {
        assert.fail("Step 3: FAILED");
      }

      // Step 4: Populate Password
      if (await funcSetText("Password", testData.strPassword, LoginPageElements.txtPassword)) {
        console.log("Step 4: PASSED");
      } else {
        assert.fail("Step 4: FAILED");
      }

      // Step 5: Click Submit button
      if (await funcClickButton("Submit", LoginPageElements.btnSubmit)) {
        console.log("Step 5: PASSED");
      } else {
        assert.fail("Step 5: FAILED");
      }

    });

    // Test Case 4
    it('Test Case 4: User is able to validate the name of the user in the header', async function () {

      // Step 1: Validate if the name of the user in the header
      if (await funcValidateElementText(testData.strName, LoginPageElements.objHeader)) {
        console.log("Step 1: PASSED");
      } else {
        assert.fail("Step 1: FAILED");
      }

    });

    // Test Case 5
    it('Test Case 5: User is able to logout successfully', async function () {

      // Step 1: Click logout link
      if (await funcClickLink("Logout", LoginPageElements.lnkLogoutLink)) {
        console.log("Step 1: PASSED");
      } else {
        assert.fail("Step 1: FAILED");
      }

      // Step 2: Validate if login page title is displayed
      if (await funcValidatePageTitle(testData.strExpectedPageTitle)) {
        console.log("Step 2: PASSED");
      } else {
        assert.fail("Step 2: FAILED");
      }

      // Step 3: Validate if login link is displayed after logout
      if (await funcIsElementVisible("Login link", LoginPageElements.lnkLoginLink)) {
        console.log("Step 3: PASSED");
      } else {
        assert.fail("Step 3: FAILED");
      }

    });

  });

});

// Reusable function to click a button
async function funcClickButton(name, xpath) {
  var result = false;
  try {
    var objButton = driver.findElement(By.xpath(xpath))
    await driver.wait(until.elementIsVisible(objButton), 10 * 1000);
    await objButton.click();
    console.log("Successfully clicked [" + name + "] button");
    result = true;
  } catch (e) {
    console.log(e);
    assert.fail("Failed to click  [" + name + "] button");
  }

  return result;
}

// Reusable function to click a link
async function funcClickLink(name, xpath) {
  var result = false;

  try {
    var objlink = driver.findElement(By.xpath(xpath))
    await driver.wait(until.elementIsVisible(objlink), 10 * 1000);
    await objlink.click();
    console.log("Successfully clicked [" + name + "] link");
    result = true;
  } catch (e) {
    console.log(e);
    assert.fail("Failed to click  [" + name + "] link");
  }

  return result;
}

// Reusable function to set a text in textfield
async function funcSetText(name, textToSet, xpath) {
  var result = false;
  try {
    var objTextfield = driver.findElement(By.xpath(xpath))
    await driver.wait(until.elementIsVisible(objTextfield), 10 * 1000);
    await objTextfield.sendKeys(textToSet)
    console.log("Successfully set text: [" + textToSet + "] in [" + name + "] textfield");
    result = true;
  } catch (e) {
    console.log(e);
    assert.fail("Failed to set text: [" + textToSet + "] in [" + name + "] textfield");
  }

  return result
}

// Reusable function to validate Page Title
async function funcValidatePageTitle(strExpectedPageTitle) {
  var result = false;
  try {
    var strActualPageTitle = await driver.getTitle()
    if (strActualPageTitle === strExpectedPageTitle) {
      console.log(strExpectedPageTitle + " page title is displayed.");
      result = true;
    } else {
      assert.fail(strExpectedPageTitle + " page title is not displayed. Actual Page title: " + strActualPageTitle);
    }
  } catch (e) {
    console.log(e);
    assert.fail("Title is not displayed");
  }

  return result
}

// Reusable function to validate if an element is displayed
async function funcIsElementVisible(name, xpath) {
  var result = false;
  try {
    var objButton = driver.findElement(By.xpath(xpath))
    await driver.wait(until.elementIsVisible(objButton), 10 * 1000);
    console.log("[" + name + "] element is displayed.");
    result = true;
  } catch (e) {
    console.log(e);
    assert.fail("[" + name + "] element is NOT displayed.");
  }

  return result;
}


// Reusable function to validate text value of an element
async function funcValidateElementText(strExpectedText, xpath) {
  var result = false;
  try {
    var objElement = driver.findElement(By.xpath(xpath))
    await driver.wait(until.elementIsVisible(objElement), 10 * 1000);
    var strActualText = await objElement.getText();
    if (strActualText.includes(strExpectedText)) {
      console.log(strExpectedText + " is displayed.");
      result = true;
    } else {
      assert.fail(strExpectedText + " is NOT displayed. Actual element text: " + strActualText);
    }
  } catch (e) {
    console.log(e);
    assert.fail(strExpectedText + " is NOT displayed.");
  }

  return result
}

