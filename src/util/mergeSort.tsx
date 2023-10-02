import {Item} from "../context/sortContext";

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
