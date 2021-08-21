exports.User = class User {
    constructor(username, password) {        
        this.username = username
        this.password = password
        this.abilities = []
    }
    async can(...abilities) {
        for(const ability of abilities) {
            this.abilities[ability.name] = ability.value
        }
    }
    async attemptsTo(...tasks) {
        for(const task of tasks) {
            await task.perform(this)
        }
    }
    async asks(...questions) {
        for(const question of questions) {
            return await question.perform(this)
        }
    }
}
