const { Homepage } = require("../website/homepage")
const { By } = require('selenium-webdriver')

exports.SignIn = class SignIn {    
    static onHomepage() {
        return new SignIn()
    }
    async perform(user) {        
        await user.abilities.browseTheWeb.driver.findElement(By.id(Homepage.USERNAME_INPUT_ID)).sendKeys(user.username)
        await user.abilities.browseTheWeb.driver.findElement(By.id(Homepage.PASSWORD_INPUT_ID)).sendKeys(user.password)
        await user.abilities.browseTheWeb.driver.findElement(By.id(Homepage.LOGIN_BUTTON_ID)).click()
    }
}
