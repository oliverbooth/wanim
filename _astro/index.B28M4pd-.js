import{j as r,W as t,e as s,a as i,b as c,C as l,S as m,R as w,c as g}from"./extract-example-source.CtwtkG-B.js";import"./index.DRBQTP7f.js";const p=`import { Circle, RegularNgon, Square, WGroup, WTex, WanimScene } from "wanim";

import { WanimSceneExample } from "@/components/wanim-scene-example";
import { extractExampleSource } from "@/lib/extract-example-source";

import code from "./wanim-logo?raw";

class WanimLogo extends WanimScene {
    async run() {
        this.background = "#ece6e2";

        const w = new WTex("\\\\mathbb{W}", { fontScale: 2.5 });
        await w.rendered;
        w.position([-2, -1]);
        w.fill("#343434");
        w.stroke("transparent");
        w.show();

        const circle = new Circle(-1, 0);
        circle.fill("#87c2a5");
        circle.show();

        const square = new Square(0, -1, 2);
        square.fill("#525893");
        square.show();

        const triangle = new RegularNgon(1, 0, 3, 1);
        triangle.fill("#e07a5f");
        triangle.show();

        const logo = this.add(new WGroup());
        logo.add(triangle, square, circle, w); // order matters!
    }
}

export function WanimLogoExample() {
    return (
        <WanimSceneExample
            scene={WanimLogo}
            id="wanimlogo"
            title="WanimLogo"
            code={extractExampleSource(code)}
            tags={["TeX", "Shapes"]}
        />
    );
}
`;class u extends i{async run(){this.background="#ece6e2";const n=new c("\\mathbb{W}",{fontScale:2.5});await n.rendered,n.position([-2,-1]),n.fill("#343434"),n.stroke("transparent"),n.show();const e=new l(-1,0);e.fill("#87c2a5"),e.show();const o=new m(0,-1,2);o.fill("#525893"),o.show();const a=new w(1,0,3,1);a.fill("#e07a5f"),a.show(),this.add(new g).add(a,o,e,n)}}function S(){return r.jsx(t,{scene:u,id:"wanimlogo",title:"WanimLogo",code:s(p),tags:["TeX","Shapes"]})}export{S as WanimLogoExample};
