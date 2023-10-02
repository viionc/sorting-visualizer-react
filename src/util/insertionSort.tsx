import {Item} from "../context/sortContext";
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
