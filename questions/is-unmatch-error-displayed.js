const { Homepage } = require("../website/homepage")
const { By } = require('selenium-webdriver')
const fs = require('fs')
const UNMATCH_ERROR_MESSAGE = 'Epic sadface: Username and password do not match any user in this service'

exports.IsUnmatchErrorDisplayed = class IsUnmatchErrorDisplayed {
    static onLoginComponent() {
        return new IsUnmatchErrorDisplayed()
    }
    async perform(user) {
        let errorMessage = await user.abilities.browseTheWeb.driver.findElement(By.css(Homepage.LOGIN_ERROR_MESSAGE_CSS)).getText()        
        let result = Object.is(errorMessage, UNMATCH_ERROR_MESSAGE)
        if (result != true) {
            let screenshot = await user.abilities.browseTheWeb.driver.takeScreenshot()
            await fs.writeFileSync('IsUnmatchErrorDisplayed-screenshot' + Date.now() + '.png', screenshot, 'base64')
        }
        return result
    }
}
