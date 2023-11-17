export function removeEmptyObjectKeys(obj: any) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            removeEmptyObjectKeys(obj[key]);
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
        }
    }
    return obj;
}
