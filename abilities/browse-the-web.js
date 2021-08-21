module.exports.BrowseTheWeb = class BrowseTheWeb {
    constructor(driver) {
        this.driver = driver
    }
    static with(driver) {
        return {
            name: "browseTheWeb",
            value: new BrowseTheWeb(driver)
        }
    }
}
