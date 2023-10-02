import {Item} from "../context/sortContext";

export const bubbleSort = (items: Item[]) => {
    let newItems = [...items];
    let newSortingState = [items];
    let movedItem = true;
    do {
        movedItem = false;
        for (let i = 0; i < newItems.length - 1; i++) {
            newItems = newItems.map(item => {
                return {...item, moved: false};
            });
            if (newItems[i + 1] && newItems[i].value > newItems[i + 1].value) {
                let temp = {...newItems[i], moved: true};
                newItems[i] = {...newItems[i + 1]};
                newItems[i + 1] = temp;

                newSortingState.push([...newItems]);

                movedItem = true;
            }
        }
    } while (movedItem);
    newItems = newItems.map(item => {
        return {...item, moved: false};
    });
    return {newItems, newSortingState};
};

function mergeSort(newItems: Item[]) {
    if (newItems.length <= 1) return newItems;
    let mid = Math.floor(newItems.length / 2);
    let left = mergeSort(newItems.slice(0, mid)) as Item[];
    let right = mergeSort(newItems.slice(mid)) as Item[];
    return merge(left, right);
}

let newSortingState: Array<Item[]>;
let iteration = 0;

function merge(left: Item[], right: Item[]) {
    let sortedArr = [];
    let moved = [] as Item[];
    let startingIndex = newSortingState[iteration].findIndex(i => i.createdIndex === left[0].createdIndex);
    // let endingIndex = newSortingState[0].findIndex(i => i.createdIndex === right[right.length - 1].createdIndex);
    while (left.length && right.length) {
        if (left[0].value < right[0].value) {
            let item = left.shift();
            if (item) {
                moved.push({...item});
                item = {...item};
                sortedArr.push(item);
            }
        } else {
            let item = right.shift();
            if (item) {
                moved.push({...item});
                item = {...item};
                sortedArr.push(item);
            }
        }
    }
    if (left.length) {
        left.forEach(i => moved.push({...i}));
    }
    if (right.length) {
        right.forEach(i => moved.push({...i}));
    }

    let temp = [...newSortingState[iteration]];
    temp = temp.map(i => {
        return {...i, moved: false};
    });

    if (moved.length) {
        for (let i = 0; i < moved.length; i++) {
            temp[startingIndex] = {...moved[i], moved: true};
            startingIndex++;
        }
        newSortingState.push([...temp]);
    }
    iteration++;
    return [...sortedArr, ...left, ...right];
}

export const startMergeSort = (items: Item[]) => {
    iteration = 0;
    newSortingState = [[...items]];
    let newItems = [...items];
    newItems = mergeSort(newItems);
    console.log(newSortingState);
    return {newItems, newSortingState};
};

export const insertionSort = (items: Item[]) => {
    let newItems = [...items];
    let newSortingState = [[...items]];
    for (let i = 1; i < newItems.length; i++) {
        for (let j = i - 1; j > -1; j--) {
            newItems = newItems.map(item => {
                return {...item, moved: false};
            });
            if (newItems[j + 1].value < newItems[j].value) {
                let temp = {...newItems[j]};
                newItems[j] = {...newItems[j + 1], moved: true};
                newItems[j + 1] = temp;
                newSortingState.push([...newItems]);
            }
        }
    }
    return {newItems, newSortingState};
};
