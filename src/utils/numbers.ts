export const arrayRange = (start: number, stop: number, step: number, isString = false) => {
    const newArray = Array.from({ length: (stop - start) / step + 1 }, (value, index) => {
        return isString ? (start + index * step).toString() : start + index * step;
    });
    return newArray;
};
