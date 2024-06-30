let array = [];
let timer = null;
let isSorting = false;

function startSorting() {
    if (isSorting) return;
    isSorting = true;
    mergeSort(array, 0, array.length - 1);
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
        arrayItem.className = 'array-item1';
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

async function mergeSort(arr, l, r) {
    if (l < r) {
        const m = Math.floor((l + r) / 2);

        updateDescription(`Dividing array at index ${m}`);
        highlightPartition(l, m, r);
        await delay(1500);

        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }
    isSorting = false;
    updateDescription('Sorting complete.');
}

async function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0,
        j = 0,
        k = l;

    while (i < n1 && j < n2) {
        updateDescription(`Merging elements ${L[i]} and ${R[j]}`);
        await delay(1500);
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
        displayArray();
        await delay(1500); // Delay after merging
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

    displayArray();
    await delay(1500); 
}

function highlightPartition(l, m, r) {
    const items = document.getElementsByClassName('array-item1');
    for (let i = l; i <= m; i++) {
        items[i].classList.add('partition-left1');
    }
    for (let i = m + 1; i <= r; i++) {
        items[i].classList.add('partition-right1');
    }
}

function clearPartition() {
    const items = document.getElementsByClassName('array-item1');
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('partition-left1', 'partition-right1');
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
