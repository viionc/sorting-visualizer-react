import React, {useEffect} from "react";
import {ReactNode, createContext, useContext, useState} from "react";
import {bubbleSort, insertionSort, startMergeSort} from "../util/sorting";

export type SortType = "merge" | "bubble" | "quick" | "insertion";
export type Item = {
    value: number;
    moved: boolean;
    createdIndex: number;
};

type SortContextProps = {
    sortType: SortType;
    numberOfItems: number;
    items: Item[];
    isBusy: boolean;
    sortStates: Array<Item[]>;
    startSorting: () => void;
    changeNumberOfItems: (number: number) => void;
    setIsBusy: React.Dispatch<React.SetStateAction<boolean>>;
    changeSortType: (type: SortType) => void;
};

const SortContext = createContext<SortContextProps | null>(null);

export const useSortContext = () => {
    let context = useContext(SortContext);
    if (!context) throw new Error("no context");
    return context;
};

export default function SortContextProvider({children}: {children: ReactNode}) {
    const [sortType, setSortType] = useState<SortType>("bubble");
    const [numberOfItems, setNumberOfItems] = useState<number>(10);
    const [items, setItems] = useState<Item[]>([]);
    const [sortStates, setSortState] = useState<Array<Item[]>>([]);
    const [isBusy, setIsBusy] = useState<boolean>(false);

    const populateItems = () => {
        let newItems = Array(numberOfItems || 0)
            .fill({})
            .map((_, index) => {
                return {value: Math.floor(Math.random() * 100), moved: false, createdIndex: index};
            });
        setItems(newItems);
    };

    const startSorting = () => {
        if (numberOfItems < 2 || numberOfItems > 30) return;
        setIsBusy(true);
        let result = {
            newItems: [] as Item[],
            newSortingState: [] as Array<Item[]>,
        };
        switch (sortType) {
            case "bubble":
                result = bubbleSort(items);
                setItems(result.newItems);
                setSortState(result.newSortingState);
                break;
            case "merge":
                result = startMergeSort(items);
                setItems(result.newItems);
                setSortState(result.newSortingState);
                break;
            case "quick":
                break;
            case "insertion":
                result = insertionSort(items);
                setItems(result.newItems);
                setSortState(result.newSortingState);
                break;
        }
        setIsBusy(false);
    };

    const changeNumberOfItems = (number: number) => {
        setSortState([]);
        setNumberOfItems(number);
    };

    const changeSortType = (type: SortType) => {
        setSortType(type);
        setSortState([]);
        populateItems();
    };
    useEffect(() => {
        populateItems();
    }, [numberOfItems]);
    return (
        <SortContext.Provider
            value={{
                sortType,
                numberOfItems,
                items,
                startSorting,
                isBusy,
                sortStates,
                changeNumberOfItems,
                setIsBusy,
                changeSortType,
            }}
        >
            {children}
        </SortContext.Provider>
    );
}
