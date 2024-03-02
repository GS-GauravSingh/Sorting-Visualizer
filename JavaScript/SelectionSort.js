// Selection Sort
async function selectionSort() {

	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			for (let k = i; k < bars.length; k++) {
				if (k != i && k != j) {
					setColor(bars[k], defaultBarColor);
				}
			}
			setColor(bars[i], comparisonColor);
			setColor(bars[j], comparisonColor);
			await pauseExection(delay);

			if (arr[i] >= arr[j]) {
				let currBarHeight = setHeight(arr[i]);
				let nextBarHeight = setHeight(arr[j]);
				swapHeight(bars[i], bars[j], currBarHeight, nextBarHeight);
				setColor(bars[i], unsortedColor);
				setColor(bars[j], unsortedColor);
				swap(i, j);
				await pauseExection(delay);
			}
		}

		setColor(bars[i], sortedColor);
	}
}
