const arrayContainer = document.querySelector(".array-elements-container");
const rangeInputArraySize = document.querySelector("#arraySize");
const rangeInputSortingSpeed = document.querySelector("#speedOfSorting");
const randomizeArrayBtn = document.querySelector(".randomize-button");
const algoButtons = document.querySelectorAll(".algo-buttons");
const sortButton = document.querySelector(".sort-button");
const warningElement = document.querySelector(".warning");
const bars = document.getElementsByClassName("array-elements");

const comparisonColor = "#FFC40C";
const unsortedColor = "red";
const sortedColor = "#00FF7F";
const defaultBarColor = "aqua";
const selected = "orangered";
const left = "#1640D6";
const right = "#7752FE";
const pivotColor = "#B000B9";
const mergedColor = "#0070BB";

let arraySize = 20;
let arr = undefined;
let whichAlgoToUse = undefined;

let maxDelay = parseInt(rangeInputSortingSpeed.max) + 10;
let delay = maxDelay;

// Delay to show swapping of bars heights.
rangeInputSortingSpeed.addEventListener("input", function () {
	delay = maxDelay - rangeInputSortingSpeed.value;
});

// Cursor transition on range input.
rangeInputArraySize.addEventListener("mousedown", function () {
	rangeInputArraySize.style.cursor = "grabbing";
});
rangeInputArraySize.addEventListener("mouseup", function () {
	rangeInputArraySize.style.cursor = "grab";
});

rangeInputSortingSpeed.addEventListener("mousedown", function () {
	rangeInputSortingSpeed.style.cursor = "grabbing";
});
rangeInputSortingSpeed.addEventListener("mouseup", function () {
	rangeInputSortingSpeed.style.cursor = "grab";
});

// The "DOMContentLoaded" event listener is used to execute a function after the HTML document has been completely loaded.
document.addEventListener("DOMContentLoaded", function () {
	arr = new Array(arraySize);
	console.log("Document Loaded");
	generateRandomArray();
	renderBars();
	whichAlgoToUse = "";
});

// Function to check whether array is already sorted or not.
function isArraySorted() {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i - 1] > arr[i]) {
			return false;
		}
	}

	return true;
}

// Display Warning
function displayWarning(warning) {
	warningElement.innerHTML = warning;
	warningElement.style.display = "block";
}

// Remove Warning
function removeWarning() {
	warningElement.innerHTML = "";
	warningElement.style.display = "none";
}

// To detect array size.
rangeInputArraySize.addEventListener("input", function () {
	resetRandomArray();
	arraySize = rangeInputArraySize.value;
	arr = new Array(arraySize);
	generateRandomArray();
	renderBars();
	removeWarning();
});

// Function to generate random number in the range of 1 to 100.
function generateRandomNumber() {
	let randomNumber = parseInt(Math.random() * 36 + 1);
	return randomNumber;
}

// Function to generate array of randome element of size "arraySize".
function generateRandomArray() {
	for (let i = 0; i < arraySize; i++) {
		const element = generateRandomNumber();
		arr[i] = element;
	}
}

// Function to set height of bar.
function setHeight(value) {
	return value * 10 + "px";
}

// Function to generate bars (visual bars).
function renderBars() {
	for (let index = 0; index < arr.length; index++) {
		const element = arr[index];
		const newBar = document.createElement("div");
		// newBar.setAttribute("class", "array-elements");
		newBar.classList.add("array-elements");
		newBar.style.height = setHeight(element);
		arrayContainer.appendChild(newBar);
	}
}

// Function to reset old random array.
function resetRandomArray() {
	arr = [];
	arrayContainer.innerHTML = "";
}

// Function to generate random array when random button is clicked by user.
randomizeArrayBtn.addEventListener("click", function () {
	resetRandomArray();
	generateRandomArray();
	renderBars();
	removeWarning();
});

// Function to enable buttons.
function enableButtons() {
	algoButtons.forEach(function (button) {
		button.removeAttribute("disabled");
		button.style.cursor = "pointer";
	});

	sortButton.removeAttribute("disabled");
	sortButton.style.cursor = "pointer";

	randomizeArrayBtn.removeAttribute("disabled");
	randomizeArrayBtn.style.cursor = "pointer";

	rangeInputArraySize.removeAttribute("disabled");
	rangeInputArraySize.style.cursor = "pointer";

	// rangeInputSortingSpeed.removeAttribute("disabled");
	// rangeInputSortingSpeed.style.cursor = "pointer";
}

// Function to disable buttons.
function disableButtons() {
	algoButtons.forEach(function (button) {
		button.setAttribute("disabled", "");
		button.style.cursor = "no-drop";
	});

	sortButton.setAttribute("disabled", "");
	sortButton.style.cursor = "no-drop";

	randomizeArrayBtn.setAttribute("disabled", "");
	randomizeArrayBtn.style.cursor = "no-drop";

	rangeInputArraySize.setAttribute("disabled", "");
	rangeInputArraySize.style.cursor = "no-drop";

	// rangeInputSortingSpeed.setAttribute("disabled", "");
	// rangeInputSortingSpeed.style.cursor = "no-drop";
}

// Sorting Algorithms

// Identifying which sorting algorithm to use.
algoButtons.forEach(function (button) {
	// console.log(button.innerHTML);
	button.addEventListener("click", function () {
		removeWarning();
		removeAllSelections();
		whichAlgoToUse = button.innerHTML;
		markSelectedAlgorithm(whichAlgoToUse);
	});
});

sortButton.addEventListener("click", async function () {
	if (whichAlgoToUse === "") {
		displayWarning("No Algorithm Selected");
	} else if (isArraySorted()) {
		displayWarning("Array is Already Sorted");
	} else {
		removeWarning();
		if (whichAlgoToUse === "Bubble Sort") {
			disableButtons();
			await bubbleSort();
			enableButtons();
		} else if (whichAlgoToUse === "Selection Sort") {
			disableButtons();
			await selectionSort();
			enableButtons();
		} else if (whichAlgoToUse === "Insertion Sort") {
			disableButtons();
			await insertionSort();
			enableButtons();
		} else if (whichAlgoToUse === "Quick Sort") {
			disableButtons();
			await quickSort(0, arr.length - 1);
			enableButtons();
		} else if (whichAlgoToUse === "Merge Sort") {
			disableButtons();
			await mergeSort(0, arr.length - 1);
			enableButtons();
		} else if (whichAlgoToUse === "Heap Sort") {
			disableButtons();
			await heapSort();
			enableButtons();
		}
	}
});

// Mark selected alsorithm.
function markSelectedAlgorithm(algo) {
	if (algo === "Bubble Sort") {
		document.querySelector("#bubbleSort").style.backgroundColor = "white";
		document.querySelector("#bubbleSort").style.color = "black";
	} else if (algo === "Selection Sort") {
		document.querySelector("#selectionSort").style.backgroundColor =
			"white";
		document.querySelector("#selectionSort").style.color = "black";
	} else if (algo === "Insertion Sort") {
		document.querySelector("#insertionSort").style.backgroundColor =
			"white";
		document.querySelector("#insertionSort").style.color = "black";
	} else if (algo === "Quick Sort") {
		document.querySelector("#quickSort").style.backgroundColor = "white";
		document.querySelector("#quickSort").style.color = "black";
	} else if (algo === "Merge Sort") {
		document.querySelector("#mergeSort").style.backgroundColor = "white";
		document.querySelector("#mergeSort").style.color = "black";
	} else if (algo === "Heap Sort") {
		document.querySelector("#heapSort").style.backgroundColor = "white";
		document.querySelector("#heapSort").style.color = "black";
	}
}

// Remove selected alsorithm.
function removeAllSelections() {
	document.querySelector("#bubbleSort").style.backgroundColor = "transparent";
	document.querySelector("#bubbleSort").style.color = "white";

	document.querySelector("#selectionSort").style.backgroundColor =
		"transparent";
	document.querySelector("#selectionSort").style.color = "white";

	document.querySelector("#insertionSort").style.backgroundColor =
		"transparent";
	document.querySelector("#insertionSort").style.color = "white";

	document.querySelector("#quickSort").style.backgroundColor = "transparent";
	document.querySelector("#quickSort").style.color = "white";

	document.querySelector("#mergeSort").style.backgroundColor = "transparent";
	document.querySelector("#mergeSort").style.color = "white";

	document.querySelector("#heapSort").style.backgroundColor = "transparent";
	document.querySelector("#heapSort").style.color = "white";
}

// Function to Swap to values.
function swap(i, j) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

// Function to swap heights and colors of bars.
function swapHeightsAndSwapColors(
	currBar,
	nextBar,
	currBarHeight,
	nextBarHeight
) {
	currBar.style.height = nextBarHeight;
	nextBar.style.height = currBarHeight;

	let temp = currBar.style.backgroundColor;
	currBar.style.backgroundColor = nextBar.style.backgroundColor;
	nextBar.style.backgroundColor = temp;
}

// Function to swap heights of two bars.
function swapHeight(currBar, nextBar, currBarHeight, nextBarHeight) {
	currBar.style.height = nextBarHeight;
	nextBar.style.height = currBarHeight;
}

// Function to set color bars.
function setColor(bar, color) {
	bar.style.backgroundColor = color;
}

// Function to set color of bars in range.
function setColorRange(bars, start, end, color) {
	for (let idx = start; idx <= end; idx++) {
		bars[idx].style.backgroundColor = color;
	}
}

// const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
function pauseExection(time) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve();
		}, time);
	});
}
