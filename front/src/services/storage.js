class Storage {
    constructor() {
        this.keys = {
            token: 'token',
        }
    }

    storeToken(token) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.keys.token, token)
        }
    }
    getToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.keys.token) ?? null
        }
    }
    removeToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.keys.token)
        }
    }
}

const storage = new Storage()

export default storage
