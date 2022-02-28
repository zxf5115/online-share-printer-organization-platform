/**
 * 过滤数组对象key
 * @param {对象} obj 
 * @param {key数组} arr 
 * @returns 
 */
export function filterObj(obj, arr) {
    if (typeof (obj) !== "object" || !Array.isArray(arr)) {
        throw new Error("参数格式不正确")
    }
    const result = {}
    Object.keys(obj).filter((key) => arr.includes(key)).forEach((key) => {
        result[key] = obj[key]
    })
    return result
}