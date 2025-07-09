import{j as r,W as c,e as t,a as s,b as i,A as l,C as m,S as w,R as u,c as p}from"./extract-example-source.C_sV8dJJ.js";import"./index.DRBQTP7f.js";const x=`import { Anchor, Circle, Create, RegularNgon, Square, WGroup, WTex, WanimScene } from "wanim";

import { WanimSceneExample } from "@/components/wanim-scene-example";
import { extractExampleSource } from "@/lib/extract-example-source";

import code from "./wanim-logo?raw";

class WanimLogo extends WanimScene {
    async run() {
        this.background = "#ece6e2";

        const w = new WTex("\\\\mathbb{W}", { fontScale: 2.5 });
        await w.rendered;
        w.position([-2, -1]);
        w.anchor(Anchor.Center);
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
    return <WanimSceneExample scene={WanimLogo} source={extractExampleSource(code)} />;
}
`;class g extends s{async run(){this.background="#ece6e2";const n=new i("\\mathbb{W}",{fontScale:2.5});await n.rendered,n.position([-2,-1]),n.anchor(l.Center),n.fill("#343434"),n.stroke("transparent"),n.show();const e=new m(-1,0);e.fill("#87c2a5"),e.show();const o=new w(0,-1,2);o.fill("#525893"),o.show();const a=new u(1,0,3,1);a.fill("#e07a5f"),a.show(),this.add(new p).add(a,o,e,n)}}function S(){return r.jsx(c,{scene:g,source:t(x)})}export{S as WanimLogoExample};
