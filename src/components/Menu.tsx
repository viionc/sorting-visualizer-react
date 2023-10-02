import {ChangeEvent} from "react";
import {useSortContext} from "../context/sortContext";

function Menu() {
    const {startSorting, numberOfItems, sortType, isBusy, changeNumberOfItems, changeSortType, speed, setSpeed, sortStates} = useSortContext();

    const handleChangeItems = (e: ChangeEvent<HTMLInputElement>) => {
        let number = parseInt(e.target.value);
        if (number > 50) number = 50;
        if (number < 1) number = 1;

        changeNumberOfItems(number);
    };

    const handleChangeSpeed = (e: ChangeEvent<HTMLInputElement>) => {
        let number = parseInt(e.target.value);
        if (number > 1000) number = 1000;
        if (number < 1) number = 1;

        setSpeed(number);
    };

    return (
        <div className="flex flex-col justify-start items-start gap-2 text-lg ">
            <div>Sort Type:</div>
            <div className="flex flex-col items-start gap-1">
                <button
                    className="py-1 w-full cursor-pointer rounded-md px-3 hover:bg-gray-400 hover:bg-opacity-25"
                    style={{backgroundColor: sortType === "bubble" ? "gray" : ""}}
                    onClick={() => changeSortType("bubble")}
                    disabled={isBusy}
                >
                    Bubble Sort
                </button>
                <button
                    className="py-1 w-full cursor-pointer rounded-md px-3 hover:bg-gray-400 hover:bg-opacity-25"
                    style={{backgroundColor: sortType === "insertion" ? "gray" : ""}}
                    onClick={() => changeSortType("insertion")}
                    disabled={isBusy}
                >
                    Insertion Sort
                </button>
                <button
                    className="py-1 w-full cursor-pointer rounded-md px-3 hover:bg-gray-400 hover:bg-opacity-25"
                    style={{backgroundColor: sortType === "merge" ? "gray" : ""}}
                    onClick={() => changeSortType("merge")}
                    disabled={isBusy}
                >
                    Merge Sort
                </button>
                <button
                    className="py-1 w-full cursor-pointer rounded-md px-3 hover:bg-gray-400 hover:bg-opacity-25"
                    style={{backgroundColor: sortType === "quick" ? "gray" : ""}}
                    onClick={() => changeSortType("quick")}
                    disabled={isBusy}
                >
                    Quick Sort
                </button>
            </div>
            <div className="flex items-start gap-2">
                <label>Number of items (2-50):</label>
                <input
                    type="number"
                    inputMode="numeric"
                    value={numberOfItems}
                    disabled={isBusy}
                    onChange={e => handleChangeItems(e)}
                    className="w-[3rem] rounded-md"
                ></input>
            </div>
            <div className="flex items-start gap-2">
                <label>Speed (1-1000ms):</label>
                <input type="number" inputMode="numeric" value={speed} onChange={e => handleChangeSpeed(e)} className="w-[4rem] rounded-md"></input>
            </div>
            <button className="py-1" onClick={startSorting} disabled={isBusy || sortStates.length > 1}>
                Start
            </button>
        </div>
    );
}

export default Menu;
