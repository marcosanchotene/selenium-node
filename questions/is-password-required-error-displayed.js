const { Homepage } = require("../website/homepage")
const { By } = require('selenium-webdriver')
const fs = require('fs')
const PASSWORD_REQUIRED_ERROR_MESSAGE = 'Epic sadface: Password is required'

exports.IsPasswordRequiredErrorDisplayed = class IsPasswordRequiredErrorDisplayed {
    static onLoginComponent() {
        return new IsPasswordRequiredErrorDisplayed()
    }
    async perform(user) {
        let errorMessage = await user.abilities.browseTheWeb.driver.findElement(By.css(Homepage.LOGIN_ERROR_MESSAGE_CSS)).getText()        
        let result = Object.is(errorMessage, PASSWORD_REQUIRED_ERROR_MESSAGE)
        if (result != true) {
            let screenshot = await user.abilities.browseTheWeb.driver.takeScreenshot()
            await fs.writeFileSync('IsPasswordRequiredErrorDisplayed-screenshot' + Date.now() + '.png', screenshot, 'base64')
        }
        return result
    }
}
