const { Homepage } = require("../website/homepage")
const { By, Key } = require('selenium-webdriver')

exports.SignIn = class SignIn {
    constructor(submitMethod) {
        this.submitMethod = submitMethod
    }
    static clickingButton() {
        return new SignIn('clickingButton')
    }
    static typingEnterKey() {
        return new SignIn('typingEnterKey')
    }
    async perform(user) {        
        await user.abilities.browseTheWeb.driver.findElement(By.id(Homepage.USERNAME_INPUT_ID)).sendKeys(user.username)
        await user.abilities.browseTheWeb.driver.findElement(By.id(Homepage.PASSWORD_INPUT_ID)).sendKeys(user.password)
        let loginButton = await user.abilities.browseTheWeb.driver.findElement(By.id(Homepage.LOGIN_BUTTON_ID))
        if (this.submitMethod == 'clickingButton') {
            await loginButton.click()
        }
        if (this.submitMethod == 'typingEnterKey') {
            await loginButton.sendKeys(Key.RETURN)
        }
    }
}
