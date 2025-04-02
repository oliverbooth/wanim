import { useEffect } from "react";
import wanim, { WanimScene } from "wanim";

export function App() {
    useEffect(() => {
        class CreateCircle extends WanimScene {}

        wanim(CreateCircle);
    }, []);

    return <div></div>;
}

export default App;
