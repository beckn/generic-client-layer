export class ObjectUtil {

    static removeEmptyObjectKeys(obj: any) {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                this.removeEmptyObjectKeys(obj[key]);
                if (Object.keys(obj[key]).length === 0) delete obj[key];
            }
        }
        return obj;
    }

}
