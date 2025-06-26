// this is a server component
// you can't make server components children of the client component, only the other way around
// hooks don't work on the server

import { Suspense } from "react";
import ServerComponent from "./ServerComponent";
import ClientComponent from "./ClientComponent";

export default function App() {
    console.log("rendering app server component")
    return (
        <Suspense fallback={<h1>Loading ...</h1>}>
            <h1>Notes App</h1>
            <ServerComponent />
            <ClientComponent />
        </Suspense>
    )
}
