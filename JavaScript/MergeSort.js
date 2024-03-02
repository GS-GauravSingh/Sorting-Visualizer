// Merge Sort

async function merge(start, end) {

	let mid = Math.floor(start + (end - start) / 2);
	let sortedArray = [];

	let i = start,
		j = mid + 1;
	while (i <= mid && j <= end) {
		if (arr[i] < arr[j]) {
			sortedArray.push(arr[i]);
            setColor(bars[i], comparisonColor);
			i++;
		} else {
            sortedArray.push(arr[j]);
            setColor(bars[i], selected);
			j++;
		}
	}
    
	while (i <= mid) {
        setColor(bars[i], comparisonColor);
        sortedArray.push(arr[i++]);
	}
    
	while (j <= end) {
        setColor(bars[i], selected);
		sortedArray.push(arr[j++]);
	}
    await pauseExection(delay);

	let k = 0;
	for (let idx = start; idx <= end; idx++) {
		arr[idx] = sortedArray[k];
        bars[idx].style.height = setHeight(sortedArray[k]);
        setColor(bars[idx], mergedColor);
        await pauseExection(delay);
        k++;

	}
    setColorRange(bars, start, end, sortedColor);
    await pauseExection(delay);

	return;
}

async function mergeSort(start, end) {
	// Base Case
	if (start >= end) {
		return;
	}

	// Recursive Case
	let mid = Math.floor(start + (end - start) / 2);

	// Left Recursive Call
	await mergeSort(start, mid);
    
	// Right Recursive Call
	await mergeSort(mid + 1, end);

	// Merge both left and right half.
    setColorRange(bars,start, mid, comparisonColor);
    setColorRange(bars,mid + 1, end, selected);
	return await merge(start, end);
}
