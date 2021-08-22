const { InventoryPage } = require("../website/inventory-page")

exports.AmISignedIn = class AmISignedIn {
    static onInventoryPage() {
        return new AmISignedIn()
    }
    async perform(user) {
        let result = Object.is(await user.abilities.browseTheWeb.driver.getCurrentUrl(), InventoryPage.URL)
        if (result != true) {
            let screenshot = await user.abilities.browseTheWeb.driver.takeScreenshot()
            await fs.writeFileSync('AmISignedIn-screenshot' + Date.now() + '.png', screenshot, 'base64')
        }
        return result        
    }
}
