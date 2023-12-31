import {useEffect, useState} from "react";
import {Item, useSortContext} from "../context/sortContext";
import React from "react";

function Visualizer() {
    const {sortStates, isBusy, setIsBusy, speed, timeNeededToSort} = useSortContext();
    const [index, setIndex] = useState(0);
    const [visualizerItems, setVisualizerItems] = useState<Item[]>([]);

    const handleChange = (add: boolean, reset?: boolean) => {
        if (index === 0 && !add) return;
        if (index === sortStates.length - 1 && add) return;
        if (!reset) add ? setIndex(prev => (prev += 1)) : setIndex(prev => (prev -= 1));
        else setIndex(0);
    };

    const play = () => {
        setIsBusy(true);
        for (let i = index, j = index; i < sortStates.length; i++) {
            setTimeout(() => {
                setIndex(i);
                if (i === sortStates.length - 1) setIsBusy(false);
            }, (i - j) * speed);
        }
    };

    useEffect(() => {
        if (sortStates.length > 1) {
            setIndex(0);
            play();
        } else {
            setVisualizerItems(sortStates[0]);
        }
    }, [sortStates]);

    useEffect(() => {
        if (index === 0) {
            setVisualizerItems(sortStates[0]);
        } else {
            setVisualizerItems(sortStates[index]);
        }
    }, [index]);

    return (
        <div className="w-[80rem] flex flex-col items-center gap-3">
            <div className="flex gap-5">
                <div className="flex gap-3 items-center" style={{visibility: sortStates.length > 1 ? "visible" : "hidden"}}>
                    <button disabled={index === 0 || isBusy} onClick={() => handleChange(false, true)}>
                        Stage 0
                    </button>
                    Stage: {index} / {sortStates.length - 1}
                </div>

                <button id="prev" disabled={!sortStates.length || isBusy} onClick={() => handleChange(false)}>
                    Prev
                </button>
                <button id="next" disabled={!sortStates.length || isBusy} onClick={() => handleChange(true)}>
                    Next
                </button>
                <button disabled={!sortStates.length || isBusy} onClick={play}>
                    Play
                </button>
            </div>
            <div className="h-[30rem] w-[70rem] border-b flex gap-2 justify-center items-end relative ">
                {visualizerItems &&
                    visualizerItems.map(item => {
                        return (
                            <React.Fragment key={item.createdIndex}>
                                <div
                                    className="bg-gray-500 text-white w-[1rem] relative flex"
                                    style={{height: `${10 + item.value * 4}px`, backgroundColor: item.moved ? "green" : ""}}
                                >
                                    <span className="absolute bottom-[-2rem] left-1/2 -translate-x-[50%] text-sm">{item.value}</span>
                                </div>
                                {timeNeededToSort !== "0" && (
                                    <div className="absolute top-2 left-1/2 -translate-x-[50%] text-xl font-extralight">
                                        {`Sorted in ${timeNeededToSort}ms`}{" "}
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
            </div>
        </div>
    );
}

export default Visualizer;
