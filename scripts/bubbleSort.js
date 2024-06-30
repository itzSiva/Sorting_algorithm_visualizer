let array = [];
let timer = null;
let isSorting = false;

function startSorting() {
    if (isSorting) return;
    isSorting = true;
    bubbleSort();
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

async function bubbleSort() {
    let n = array.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
        updateDescription(`Iteration ${i + 1}`);
        await delay(1500);
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            updateDescription(`Checking elements ${array[j]} and ${array[j + 1]}`);
            highlightComparing(j, j + 1);
            await delay(1500);
            if (array[j] > array[j + 1]) {
                updateDescription(`${array[j]} is greater than ${array[j + 1]}, so they are swapped.`);
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
                displayArray();
                await delay(1500); // Delay after swapping
            } else {
                updateDescription(`${array[j]} is smaller than ${array[j + 1]}, so they are not swapped.`);
                await delay(1500);
            }
            await delay(1500);
            removeHighlight(j, j + 1);
        }
        if (!swapped) break;
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
