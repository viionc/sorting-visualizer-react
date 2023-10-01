import "./App.css";
import Menu from "./components/Menu";
import Visualizer from "./components/Visualizer";
import SortContextProvider from "./context/sortContext";

function App() {
    return (
        <section className="flex w-full gap-24 h-[90vh] justify-center ">
            <SortContextProvider>
                <Menu></Menu>
                <Visualizer></Visualizer>
            </SortContextProvider>
        </section>
    );
}

export default App;
