import { useEffect } from "react";
import wanim, { Circle, Create, WanimScene } from "wanim";

export function App() {
    useEffect(() => {
        // class CreateCircle(Scene):
        //     def construct(self):
        //         circle = Circle()  # create a circle
        //         circle.set_fill(PINK, opacity=0.5)  # set the color and transparency
        //         self.play(Create(circle))  # show the circle on screen

        class CreateCircle extends WanimScene {
            construct() {
                const circle = this.add(new Circle());
                circle.setFill("pink", 0.5);

                this.play(Create(circle));
            }
        }

        const w = wanim(CreateCircle);

        return () => {
            w.destroy();
        };
    }, []);

    return <div></div>;
}

export default App;
