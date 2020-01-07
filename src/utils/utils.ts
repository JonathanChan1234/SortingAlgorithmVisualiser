export const generateRandomArray = (numberOfElement: number) => {
    const randomArray = [];
    for(let i = 0; i < numberOfElement; ++i) {
        randomArray.push(Math.floor(Math.random() * 10001));
    }
    return randomArray;
}