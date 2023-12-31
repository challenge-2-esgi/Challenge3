class Storage {
    constructor() {
        this.keys = {
            token: 'token',
        }
    }

    storeToken(token) {
        localStorage.setItem(this.keys.token, token)
    }
    getToken() {
        return localStorage.getItem(this.keys.token) ?? null
    }
    removeToken() {
        localStorage.removeItem(this.keys.token)
    }
}

const storage = new Storage()

export default storage
