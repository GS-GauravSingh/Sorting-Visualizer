// Heap Sort

// Max Heapify
async function maxHeapify(index, n) {

	let currNodeIdx = index;
	setColor(bars[index], comparisonColor);
	await pauseExection(delay);
	
	let leftChildIdx = 2 * index + 1;
	let rightChildIdx = 2 * index + 2;
	
	// Compare
	if (leftChildIdx < n && arr[currNodeIdx] < arr[leftChildIdx]) {
		currNodeIdx = leftChildIdx;
		setColor(bars[leftChildIdx], left);
		await pauseExection(delay);
		setColor(bars[leftChildIdx], defaultBarColor);
	}
	if (rightChildIdx < n && arr[currNodeIdx] < arr[rightChildIdx]) {
		currNodeIdx = rightChildIdx;
		setColor(bars[rightChildIdx], right);
		await pauseExection(delay);
		setColor(bars[rightChildIdx], defaultBarColor);
	}
	
	
	
	if (currNodeIdx != index) {
		swapHeight(bars[currNodeIdx], bars[index], setHeight(arr[currNodeIdx]), setHeight(arr[index]));
		setColor(bars[currNodeIdx], selected);
		await pauseExection(delay);
		setColor(bars[currNodeIdx], defaultBarColor);
		setColor(bars[index], selected);
		await pauseExection(delay);
		setColor(bars[index], defaultBarColor);
		
		
		swap(currNodeIdx, index);
		await maxHeapify(currNodeIdx, n);
	}
	else{
		setColor(bars[index], defaultBarColor);
	}
}

async function heapSortAlgorithm(n) {

    let size = n - 1;
    while(size > 0)
    {
		swapHeight(bars[0], bars[size], setHeight(arr[0]), setHeight(arr[size]));
		setColor(bars[size], sortedColor);
        swap(0, size);
		await pauseExection(delay);
        await maxHeapify(0, size);
        size--;
    }

	setColor(bars[0], sortedColor);
}

async function heapSort() {
	// Max-Heap Creation.
	let n = arr.length;
	let leafNodeStartingIdx = Math.floor(n / 2);
	for (let i = leafNodeStartingIdx - 1; i >= 0; i--) {
		await maxHeapify(i, arr.length);
	}

	// Sorting - Heap Sort
	await heapSortAlgorithm(n);
}
