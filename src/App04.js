import './App.css'
import React from "react";
import { Counter, Difference, Focus, HOCRef, ScrollIntoView, Stopwatch, Todos,DifferenceRefAndState, PlayerApp, Dependencies, ChatApp, IgnoreData, GetName } from "./components/04-Escape-Hatches";

function App04() {
    return (
        <div className='App04'>
            <Counter />
            <Stopwatch />
            <Difference />
            <Focus />
            <ScrollIntoView />
            <HOCRef />
            <Todos />
            <DifferenceRefAndState />
            <PlayerApp />
            <Dependencies />
            <ChatApp />
            <IgnoreData />
            <GetName />
        </div>
    )
}

export default App04;