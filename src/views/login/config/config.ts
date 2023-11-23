export const accountRules = {
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
            pattern: /^[a-z0-9]{3,10}$/,
            message: '用户名长度为3-10个字符',
            trigger: 'blur'
        }
    ],
    password: [
        { required: true, message: '请输入密码' },
        { pattern: /^[a-zA-Z0-9]{2,32}$/, message: '密码长度为2-32' }
    ]
}
