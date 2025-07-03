import { useEffect } from "react";
import { Circle, Create, Morph, Square, Uncreate, WanimScene, wanim } from "wanim";

export function App() {
    useEffect(() => {
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

        class AnimationTest extends WanimScene {
            async run() {
                const circle1 = this.add(new Circle());
                circle1.setFill("#ff0000", 0.5);

                const square = this.add(new Square(0, 0, 20));
                square.setFill("#00ff00");

                const circle2 = this.add(new Circle(0, 0, 15));
                circle2.setFill("#0000ff", 0.75);

                await this.play(Create(circle1));
                await sleep(500);
                await this.play(Morph(circle1, square));
                await sleep(500);
                await this.play(Morph(square, circle2));
                await sleep(500);
                await this.play(Uncreate(circle2));
            }
        }

        const w = wanim(AnimationTest);

        return () => {
            w.destroy();
        };
    }, []);

    return <div></div>;
}

export default App;
