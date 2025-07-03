import{d as l,b as i,c as m,j as u,W as f,a as x}from"./wanim-scene-example.Cq1RX7Ki.js";import{C as S}from"./circle.BpxVWbw5.js";import{S as d}from"./square.BbMVU_wJ.js";import{S as w}from"./star.bYFGHpXs.js";import"./index.DRBQTP7f.js";class g extends l{constructor(e=0,t=0){super(e,t),this.element.setAttribute("r","0.1"),this.setFill("white"),this.updateTransform()}createElement(){return document.createElementNS("http://www.w3.org/2000/svg","circle")}}class E extends i{constructor(e,t){super(0,0),this.path=m.fromPoints([e,t]),this.renderPath(),this.updateTransform()}}class W extends i{n;r;constructor(e=0,t=0,n=5,a=1){super(e,t),this.n=n,this.r=a,this.path=b(a,a,n,a),this.renderPath()}get size(){return[this.r*2,this.r*2]}}function b(s,e,t,n){const a=2*Math.PI/t,o=[];for(let r=0;r<t;r++){const c=-r*a-Math.PI/2,h=s+n*Math.cos(c),p=e+n*Math.sin(c);o.push([h,p])}return m.fromPoints(o)}function P(s){return s.match(/class\s+(\w+)\s+extends\s+WanimScene\s*{([\s\S]*?)^}/m)?.[0]??""}const j=`import { Circle, Dot, Line, RegularNgon, Square, Star, WanimScene } from "wanim";

import { WanimSceneExample } from "../components/wanim-scene-example";
import { extractExampleSource } from "../lib/extract-example-source";
import code from "./shapes?raw";

class Shapes extends WanimScene {
    async run() {
        const shapes = [
            new Circle(-3, -3),
            new Square(0, -3),
            new Line([2, -2.5], [4, -3.5]),
            new RegularNgon(-3, 0, 5),
            new Star(0, 0, 5),
            new Dot(3, 0),
        ];
        const colors = ["#a8e6cf", "#dcedc1", "#ffd3b6", "#ffaaa5", "#ff8b94", "white"];

        for (let i = 0; i < shapes.length; i++) {
            this.add(shapes[i]);

            shapes[i].show();
            shapes[i].setFill(colors[i], 1);
        }
    }
}

export function ShapesExample() {
    return <WanimSceneExample scene={Shapes} source={extractExampleSource(code)} />;
}
`;class N extends x{async run(){const e=[new S(-3,-3),new d(0,-3),new E([2,-2.5],[4,-3.5]),new W(-3,0,5),new w(0,0,5),new g(3,0)],t=["#a8e6cf","#dcedc1","#ffd3b6","#ffaaa5","#ff8b94","white"];for(let n=0;n<e.length;n++)this.add(e[n]),e[n].show(),e[n].setFill(t[n],1)}}function D(){return u.jsx(f,{scene:N,source:P(j)})}export{D as ShapesExample};
