export const arrayRange = (start: number, stop: number, step: number): string[] => {
    const newArray = Array.from({ length: (stop - start) / step + 1 }, (value, index) => {
        return (start + index * step).toString();
        // return start + index * step;
    });
    return newArray;
};
