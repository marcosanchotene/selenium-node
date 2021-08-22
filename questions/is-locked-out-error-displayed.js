const { Homepage } = require("../website/homepage")
const { By } = require('selenium-webdriver')
const fs = require('fs')
const LOCKED_OUT_ERROR_MESSAGE = 'Epic sadface: Sorry, this user has been locked out.'

exports.IsLockedOutErrorDisplayed = class IsLockedOutErrorDisplayed {
    static onLoginComponent() {
        return new IsLockedOutErrorDisplayed()
    }
    async perform(user) {
        let errorMessage = await user.abilities.browseTheWeb.driver.findElement(By.css(Homepage.LOGIN_ERROR_MESSAGE_CSS)).getText()        
        let result = Object.is(errorMessage, LOCKED_OUT_ERROR_MESSAGE)
        if (result != true) {
            let screenshot = await user.abilities.browseTheWeb.driver.takeScreenshot()
            await fs.writeFileSync('IsLockedOutErrorDisplayed-screenshot' + Date.now() + '.png', screenshot, 'base64')
        }
        return result
    }
}
