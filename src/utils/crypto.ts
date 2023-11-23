import CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse('1234567890000000')
const iv = CryptoJS.enc.Utf8.parse('1234567890000000')

export default {
    encrypt(word: string | object) {
        let encrypted: any
        if (typeof word == 'string') {
            const srcs = CryptoJS.enc.Utf8.parse(word)
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })
        } else if (typeof word == 'object') {
            const data = JSON.stringify(word)
            const srcs = CryptoJS.enc.Utf8.parse(data)
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })
        }

        return encrypted.ciphertext.toString()
    },
    decrypt(word: any) {
        const enctryptedHexStr = CryptoJS.enc.Hex.parse(word)
        const srcs = CryptoJS.enc.Base64.stringify(enctryptedHexStr)
        const decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)

        return decryptedStr.toString()
    }
}
