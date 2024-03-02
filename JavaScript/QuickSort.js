// Quick Sort
async function partition(start, end) {
	// Pivot Selection.
	let pivot = arr[end];
	setColor(bars[end], pivotColor);
	await pauseExection(delay);

	let i = start - 1;
	for (let j = start; j < end; j++) {

        
        if (arr[j] > pivot) {
            setColor(bars[j], selected);
            await pauseExection(delay);
            continue;
		} else {
            // arr[j] < pivot
			i++;
            if(i-1 >= start) setColorRange(bars, start, i-1, comparisonColor);

            swapHeight(bars[i], bars[j], setHeight(arr[i]), setHeight(arr[j]));
            setColor(bars[i], comparisonColor);
            setColor(bars[j], selected);
			swap(i, j);
            await pauseExection(delay);
		}

	}

    // setColor(bars[end], defaultBarColor);
    swapHeight(bars[i+1], bars[end], setHeight(arr[i+1]), setHeight(arr[end]));
    setColor(bars[i+1], pivotColor);
    setColor(bars[end], selected);
    await pauseExection(delay);

	swap(i + 1, end);
    setColorRange(bars, start, end, defaultBarColor);
	return i + 1;
}

async function quickSort(start, end) {
	// Base Case
	if (start >= end) {
		return;
	}

	// Recursive Case
	setColor(bars[start], left);
	setColor(bars[end], right);
	await pauseExection(delay);

	let pivotIdx = await partition(start, end);

	// Left Recursive Call
	await quickSort(start, pivotIdx - 1);
	setColorRange(bars, start, pivotIdx, sortedColor);

	// Right Recursive Call
	await quickSort(pivotIdx + 1, end);
	setColorRange(bars, pivotIdx + 1, end, sortedColor);
}
