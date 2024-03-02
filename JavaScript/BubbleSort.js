// Bubble Sort
async function bubbleSort() {

	let alreadySorted = true;

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {

			
			for (let k = 0; k < bars.length - i; k++) {
				if (k != j && k != j + 1) {
					setColor(bars[k], defaultBarColor);
				}
			}

			setColor(bars[j], comparisonColor);
			setColor(bars[j + 1], comparisonColor);
			await pauseExection(delay);

			if (arr[j] >= arr[j + 1]) {
				alreadySorted = false;
				let currBarHeight = setHeight(arr[j]);
				let nextBarHeight = setHeight(arr[j + 1]);
				swapHeight(bars[j], bars[j + 1], currBarHeight, nextBarHeight);
				setColor(bars[j], unsortedColor);
				setColor(bars[j + 1], unsortedColor);
				swap(j, j + 1);
				await pauseExection(delay);
			}
		}

		setColor(bars[arr.length - i - 1], sortedColor);

		if (alreadySorted) {
			break;
		}
	}
}
