exports.Navigate = class Navigate {
    constructor(url) {
        this.url = url
    }
    static to(url) {
        return new Navigate(url)
    }
    async perform(user) {
        await user.abilities.browseTheWeb.driver.get(this.url)
    }
}
