export default function formatUtcString(date: Date, fmt: string): string {
    // 定义一个对象，用于存储日期格式化后的值
    const opt: { [key: string]: string } = {
        'Y+': date.getFullYear().toString(), // 年
        'M+': (date.getMonth() + 1).toString(), // 月
        'D+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'm+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString() // 秒
    }
    // 遍历 opt 对象
    for (const k in opt) {
        // 匹配 fmt 中的键
        const ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            if (/(y+)/.test(k)) {
                // 如果键匹配到了 'y+'，则将 fmt 中的年份部分替换为对应的年份值
                fmt = fmt.replace(ret[1], opt[k].substring(4 - ret[1].length))
                console.log(fmt)
            } else {
                fmt = fmt.replace(
                    ret[1],
                    ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
                )
            }
        }
    }
    // 返回格式化后的日期字符串
    return fmt
}
