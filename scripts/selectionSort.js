let array = [];
let timer = null;
let isSorting = false;

function startSorting() {
    if (isSorting) return;
    isSorting = true;
    selectionSort();
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
        arrayItem.className = 'array-item';
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

async function selectionSort() {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        updateDescription(`Iteration ${i + 1}: Considering subarray starting from index ${i}`);
        await delay(1500);
        for (let j = i + 1; j < n; j++) {
            updateDescription(`Checking elements ${array[j]} and ${array[minIdx]}`);
            highlightComparing(j, minIdx);
            await delay(1500);
            if (array[j] < array[minIdx]) {
                updateDescription(`${array[j]} is smaller than ${array[minIdx]}, so new minimum is found at index ${j}.`);
                minIdx = j;
                await delay(1500);
            } else {
                updateDescription(`${array[j]} is not smaller than ${array[minIdx]}.`);
                await delay(1500);
            }
            removeHighlight(j, minIdx);
        }
        if (minIdx !== i) {
            updateDescription(`Swapping ${array[i]} and ${array[minIdx]}`);
            let temp = array[minIdx];
            array[minIdx] = array[i];
            array[i] = temp;
            displayArray();
            await delay(1500); // Delay after swapping
        }
        await delay(1500); // Additional 1.5 second delay
    }
    isSorting = false;
    updateDescription('Sorting complete.');
}

function highlightComparing(index1, index2) {
    const items = document.getElementsByClassName('array-item');
    items[index1].classList.add('comparing');
    items[index2].classList.add('comparing');
}

function removeHighlight(index1, index2) {
    const items = document.getElementsByClassName('array-item');
    items[index1].classList.remove('comparing');
    items[index2].classList.remove('comparing');
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
    const modal = document.getElementById('timeComplexityModal');
    modal.style.display = 'block';
}

function closeTimeComplexityModal() {
    const modal = document.getElementById('timeComplexityModal');
    modal.style.display = 'none';
}

window.onload = function() {
    resetArray();
}
