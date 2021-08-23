const webdriver = require('selenium-webdriver')
const { BrowseTheWeb } = require('../abilities/browse-the-web')
const { User } = require('../actors/user')
const { AmISignedIn } = require('../questions/am-i-signed-in')
const { Navigate } = require('../tasks/navigate')
const { SignIn } = require('../tasks/sign-in')
const users = require('../test-data/users')
const { Homepage } = require('../website/homepage')
const { expect } = require('chai')
const { IsLockedOutErrorDisplayed } = require('../questions/is-locked-out-error-displayed')
const { IsUnmatchErrorDisplayed } = require('../questions/is-unmatch-error-displayed')
const { IsUsernameRequiredErrorDisplayed } = require('../questions/is-username-required-error-displayed')
const { IsPasswordRequiredErrorDisplayed } = require('../questions/is-password-required-error-displayed')

describe("Login test suite", function() {
    let driver

    beforeEach(async function() {        
        driver = await new webdriver.Builder()        
        .forBrowser(process.env.npm_config_browser || 'chrome')
        .build()
    })

    afterEach(async function() {
        await driver.quit()
    })

    it("Should login successfully with valid username and password by clicking on button", async function() {
        const user = new User(users.STANDARD_USER.username, users.STANDARD_USER.password)
        await user.can(BrowseTheWeb.with(driver))
        await user.attemptsTo(Navigate.to(Homepage.URL))
        await user.attemptsTo(SignIn.clickingButton())
        result = await user.asks(AmISignedIn.onInventoryPage())
        expect(result).to.be.true
    })

    it("Should login successfully with valid username and password by typing “Enter” key", async function() {
        const user = new User(users.STANDARD_USER.username, users.STANDARD_USER.password)
        await user.can(BrowseTheWeb.with(driver))
        await user.attemptsTo(Navigate.to(Homepage.URL))
        await user.attemptsTo(SignIn.typingEnterKey())
        result = await user.asks(AmISignedIn.onInventoryPage())
        expect(result).to.be.true
    })

    it("Should display locked out message with 'locked_out_user' username and valid password", async function() {
        const user = new User(users.LOCKED_OUT_USER.username, users.LOCKED_OUT_USER.password)
        await user.can(BrowseTheWeb.with(driver))
        await user.attemptsTo(Navigate.to(Homepage.URL))
        await user.attemptsTo(SignIn.clickingButton())
        result = await user.asks(IsLockedOutErrorDisplayed.onLoginComponent())
        expect(result).to.be.true
    })

    it("Should display error message when attempting to log in with valid username and invalid password", async function() {
        const user = new User(users.STANDARD_USER.username, 'invalid_password')
        await user.can(BrowseTheWeb.with(driver))
        await user.attemptsTo(Navigate.to(Homepage.URL))
        await user.attemptsTo(SignIn.typingEnterKey())
        result = await user.asks(IsUnmatchErrorDisplayed.onLoginComponent())
        expect(result).to.be.true
    })

    it("Should display error message when attempting to log in without username and password", async function() {
        const user = new User('', '')
        await user.can(BrowseTheWeb.with(driver))
        await user.attemptsTo(Navigate.to(Homepage.URL))
        await user.attemptsTo(SignIn.clickingButton())
        result = await user.asks(IsUsernameRequiredErrorDisplayed.onLoginComponent())
        expect(result).to.be.true
    })

    it("Should display error message when attempting to log in with valid username but without password", async function() {
        const user = new User(users.STANDARD_USER.username, '')
        await user.can(BrowseTheWeb.with(driver))
        await user.attemptsTo(Navigate.to(Homepage.URL))
        await user.attemptsTo(SignIn.clickingButton())
        result = await user.asks(IsPasswordRequiredErrorDisplayed.onLoginComponent())
        expect(result).to.be.true
    })

    it("Should display error message when attempting to log in without username but with valid password", async function() {
        const user = new User('', users.STANDARD_USER.password)
        await user.can(BrowseTheWeb.with(driver))
        await user.attemptsTo(Navigate.to(Homepage.URL))
        await user.attemptsTo(SignIn.clickingButton())
        result = await user.asks(IsUsernameRequiredErrorDisplayed.onLoginComponent())
        expect(result).to.be.true
    })
})
