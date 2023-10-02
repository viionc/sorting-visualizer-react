import {Item} from "../context/sortContext";

let newSortingState: Array<Item[]>;
let iteration = 0;

export const startQuickSort = (items: Item[]) => {
    iteration = 0;
    newSortingState = [[...items]];
    let newItems = quickSort([...items]);
    newSortingState.push(newItems);
    return {newItems, newSortingState};
};

const quickSort = (items: Item[]): Item[] => {
    if (items.length <= 1) {
        return items;
    }

    let pivot = items[0];
    let leftArr = [] as Item[];
    let rightArr = [] as Item[];

    for (let i = 1; i < items.length; i++) {
        if (items[i].value < pivot.value) {
            leftArr.push(items[i]);
        } else {
            rightArr.push(items[i]);
        }
    }

    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};
