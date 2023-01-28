import React from "react";
import { greet } from "./greeter";

export function App() {
    return (
        <div>
            {greet("World")} from React!
        </div>
    )
}