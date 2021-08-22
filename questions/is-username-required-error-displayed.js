const { Homepage } = require("../website/homepage")
const { By } = require('selenium-webdriver')
const fs = require('fs')
const USERNAME_REQUIRED_ERROR_MESSAGE = 'Epic sadface: Username is required'

exports.IsUsernameRequiredErrorDisplayed = class IsUsernameRequiredErrorDisplayed {
    static onLoginComponent() {
        return new IsUsernameRequiredErrorDisplayed()
    }
    async perform(user) {
        let errorMessage = await user.abilities.browseTheWeb.driver.findElement(By.css(Homepage.LOGIN_ERROR_MESSAGE_CSS)).getText()        
        let result = Object.is(errorMessage, USERNAME_REQUIRED_ERROR_MESSAGE)
        if (result != true) {
            let screenshot = await user.abilities.browseTheWeb.driver.takeScreenshot()
            await fs.writeFileSync('IsUsernameRequiredErrorDisplayed-screenshot' + Date.now() + '.png', screenshot, 'base64')
        }
        return result
    }
}
