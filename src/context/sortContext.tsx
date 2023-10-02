import React, {useEffect} from "react";
import {ReactNode, createContext, useContext, useState} from "react";
import {startMergeSort} from "../util/mergeSort";
import {insertionSort} from "../util/insertionSort";
import {bubbleSort} from "../util/bubbleSort";
import {startQuickSort} from "../util/quickSort";

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
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    timeNeededToSort: string;
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
    const [speed, setSpeed] = useState<number>(100);
    const [timeNeededToSort, setTimeNeededToSort] = useState<string>("0");

    const populateItems = () => {
        let newItems = Array(numberOfItems || 0)
            .fill({})
            .map((_, index) => {
                return {value: Math.floor(Math.random() * 100), moved: false, createdIndex: index};
            });
        setSortState([newItems]);
        setItems(newItems);
    };

    const startSorting = () => {
        if (numberOfItems < 2 || numberOfItems > 50) return;
        setIsBusy(true);
        let result = {
            newItems: [] as Item[],
            newSortingState: [] as Array<Item[]>,
        };
        let start = window.performance.now();
        switch (sortType) {
            case "bubble":
                result = bubbleSort(items);
                break;
            case "merge":
                result = startMergeSort(items);
                break;
            case "quick":
                result = startQuickSort(items);
                break;
            case "insertion":
                result = insertionSort(items);
                break;
        }
        let end = window.performance.now();
        setTimeNeededToSort((end - start).toFixed(2));
        setIsBusy(false);
        setItems(result.newItems);
        setSortState([...result.newSortingState, [...result.newItems]]);
    };

    const changeNumberOfItems = (number: number) => {
        setNumberOfItems(number);
        setSortState([items]);
        setTimeNeededToSort("0");
    };

    const changeSortType = (type: SortType) => {
        setSortType(type);
        populateItems();
        setTimeNeededToSort("0");
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
                setSpeed,
                speed,
                timeNeededToSort,
            }}
        >
            {children}
        </SortContext.Provider>
    );
}
