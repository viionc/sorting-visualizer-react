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
