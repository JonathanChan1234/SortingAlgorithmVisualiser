export const ELEMENT_MAX_SIZE = 100;
export const generateRandomArray = (numberOfElement: number) => {
	const randomArray = [];
	for (let i = 0; i < numberOfElement; ++i) {
		randomArray.push(Math.floor(Math.random() * ELEMENT_MAX_SIZE));
	}
	return randomArray;
};

export const throttle = (func: Function, thresold: number = 250) => {
	let isCalled = false;
	return (...args: any) => {
		if (!isCalled) {
			func(...args);
			isCalled = true;
			setTimeout(() => {
				isCalled = false;
			}, thresold);
		}
	};
};

export const throttleQueue = (func: Function, thresold: number = 250) => {
	let isCalled = false;
	let queueValues: any[] = [];
	return (...args: any) => {
		if (!isCalled) {
			queueValues.push(...args);
			func(queueValues);
			isCalled = true;
			setTimeout(() => {
				isCalled = false;
				queueValues = [];
			}, thresold);
		} else {
			queueValues.push(...args);
		}
	};
};
