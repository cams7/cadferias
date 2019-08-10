export abstract class Base {

    protected isNumber(value: string | number) {
        return (value && !isNaN(Number(value)));
    }

    protected isNumberOrNull(value: string | number) {
        return !value || this.isNumber(value);
    }

    protected getNumber(value: string | number) {
        if(!value)
            return null;
        
        return Number(value);
    }
}
