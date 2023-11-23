class LocalCatch {
    setCatch(key: string, value: any) {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
    getCatch(key: string) {
        const value = window.localStorage.getItem(key)
        if (value) {
            return JSON.parse(value)
        }
    }
    deleteCatch(key: string) {
        window.localStorage.removeItem(key)
    }
    clearCatch() {
        window.localStorage.clear()
    }
}

export default new LocalCatch()
