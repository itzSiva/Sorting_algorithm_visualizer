let array = [];
let timer = null;
let isSorting = false;

function startSorting() {
    if (isSorting) return;
    isSorting = true;
    insertionSort();
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

async function insertionSort() {
    let n = array.length;
    for (let i = 1; i < n; i++) {
        updateDescription(`Iteration ${i}`);
        await delay(1500);
        let key = array[i];
        let j = i - 1;
        await delay(1500);
        updateDescription(`Considering element ${key}`);
        await delay(1500);
        while (j >= 0 && array[j] > key) {
            updateDescription(`${key} is stored in key variable`);
            await delay(1500);
            updateDescription(`Checking elements ${array[j]} and ${key}`);
            highlightComparing(j, j + 1);
            await delay(1500);
            updateDescription(`${array[j]} is greater than ${key}, so they are shifted.`);
            array[j + 1] = array[j];
            j = j - 1;
            displayArray();
            await delay(1500); // Delay after moving the element
            removeHighlight(j + 1, j + 2);
        }
        if (j >= 0) {
            updateDescription(`${array[j]} is smaller than ${key}, so no more shifting.`);
            await delay(1500);
        }
        array[j + 1] = key;
        displayArray();
        await delay(1500); // Additional 0.3 second delay
        updateDescription(`Inserted ${key} at its correct position`);
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
