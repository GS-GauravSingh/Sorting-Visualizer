// Insertion Sort
async function insertionSort() {

    setColor(bars[0], selected);
    await pauseExection(delay);

    setColor(bars[0], sortedColor);

	for (let i = 1; i < arr.length; i++) {
        await pauseExection(delay);
        
        setColor(bars[i], selected);
        await pauseExection(delay);
        
		let j = i-1;
        let currVal = arr[i];
        while(j >= 0 && arr[j] > currVal)
        {
            setColor(bars[j], comparisonColor);
            await pauseExection(delay);
            
            let currBarHeight = setHeight(arr[j]);
            let nextBarHeight = setHeight(arr[j + 1]);
            swapHeight(bars[j], bars[j+1], currBarHeight, nextBarHeight);
            swap(j, j + 1);
            setColor(bars[j], selected);
            setColor(bars[j + 1], comparisonColor);
            await pauseExection(delay);

            setColor(bars[j + 1], sortedColor);
            await pauseExection(delay);
            
            j--;
        }

        setColor(bars[j + 1], sortedColor);
	}
}
