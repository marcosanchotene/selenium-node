const webdriver = require('selenium-webdriver')
const { BrowseTheWeb } = require('../abilities/browse-the-web')
const { User } = require('../actors/user')
const { AmISignedIn } = require('../questions/am_i_signed_in')
const { Navigate } = require('../tasks/navigate')
const { SignIn } = require('../tasks/sign-in')
const users = require('../test-data/users')
const { Homepage } = require('../website/homepage')
const { expect } = require('chai')

describe("Login test suite", function() {
    let driver

    beforeEach(async function() {        
        driver = await new webdriver.Builder()        
        .forBrowser('chrome')
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
})
