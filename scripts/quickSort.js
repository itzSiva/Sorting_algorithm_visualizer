let array = [];
let timer = null;
let isSorting = false;
let iterationCount = 0;

function startQuickSort() {
    if (isSorting) return;
    isSorting = true;
    iterationCount = 0;
    quickSort(array, 0, array.length - 1).then(() => {
        updateDescription('Sorting Completed.');
        isSorting = false;
    });
}

function resetArray() {
    array = generateRandomArray(8, 1, 20); // Generates an array of 8 random integers between 1 and 20
    displayArray();
    clearDescription();
}

function generateRandomArray(size, min, max) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

function stopSorting() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    isSorting = false;
    clearDescription();
}

function displayArray() {
    const visualizer = document.getElementById('visualizer');
    visualizer.innerHTML = '';
    array.forEach((value, index) => {
        const arrayItem = document.createElement('div');
        arrayItem.className = 'array-item2';
        arrayItem.textContent = value;
        visualizer.appendChild(arrayItem);
    });
}

function updateDescription(text) {
    const description = document.getElementById('description');
    description.textContent = text;
}

function clearDescription() {
    updateDescription('Procedure Explanation.');
}

async function quickSort(arr, low, high) {
    if (low < high) {
        iterationCount++;
        let pi = await partition(arr, low, high);

        updateDescription(`Iteration ${iterationCount}: Pivot is at index ${pi}`);
        highlightPivot(pi);
        await delay(1500);

        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);

        clearPivot();
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    highlightPivot(high);

    for (let j = low; j < high; j++) {
        highlightIndexes(i, j);
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
            displayArray();
            updateDescription(`Iteration ${iterationCount}: Swapping elements ${arr[i]} and ${arr[j]}`);
            await delay(1500);
        }
        clearIndexes();
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot
    displayArray();
    updateDescription(`Iteration ${iterationCount}: Swapping pivot element ${arr[high]} with ${arr[i + 1]}`);
    await delay(1500);

    clearPivot();
    return i + 1;
}

function highlightPivot(index) {
    const items = document.getElementsByClassName('array-item2');
    items[index].classList.add('pivot2');
}

function clearPivot() {
    const items = document.getElementsByClassName('array-item2');
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('pivot2');
    }
}

function highlightIndexes(i, j) {
    const items = document.getElementsByClassName('array-item2');
    if (i >= 0) items[i].classList.add('index-i2');
    items[j].classList.add('index-j2');
}

function clearIndexes() {
    const items = document.getElementsByClassName('array-item2');
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('index-i2');
        items[i].classList.remove('index-j2');
    }
}

function delay(ms) {
    return new Promise(resolve => {
        timer = setTimeout(resolve, ms);
    });
}

function showJavaCode() {
    const modal = document.getElementById('javaCodeModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('javaCodeModal');
    modal.style.display = 'none';
}

function showTimeComplexity() {
    const modal = document.getElementById('complexityModal');
    modal.style.display = 'block';
}

function closeComplexityModal() {
    const modal = document.getElementById('complexityModal');
    modal.style.display = 'none';
}

window.onload = function() {
    resetArray();
}
