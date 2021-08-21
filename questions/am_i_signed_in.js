const { InventoryPage } = require("../website/inventory-page")

exports.AmISignedIn = class AmISignedIn {
    static onInventoryPage() {
        return new AmISignedIn()
    }
    async perform(user) {        
        return Object.is(await user.abilities.browseTheWeb.driver.getCurrentUrl(), InventoryPage.URL)
    }
}
