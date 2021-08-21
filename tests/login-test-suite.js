const { Builder } = require('selenium-webdriver')
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

    beforeEach(function() {
        driver = new Builder().forBrowser('chrome').build()
    })

    afterEach(function() {
        driver.quit()
    })

    it("Should login successfully with valid username and password", async function() {
        const user = new User(users.STANDARD_USER, users.PASSWORD)
        await user.can(BrowseTheWeb.with(driver))
        await user.attemptsTo(Navigate.to(Homepage.URL))
        await user.attemptsTo(SignIn.onHomepage())
        result = await user.asks(AmISignedIn.onInventoryPage())
        expect(result).to.be.true
    })
})
