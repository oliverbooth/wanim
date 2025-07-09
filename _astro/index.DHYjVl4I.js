import{d as o,b as d,f as p,t as u,g as W,h as x,j as c,W as l,a as h,C as w,c as q,S as g,e as C,R}from"./extract-example-source.C_sV8dJJ.js";import"./index.DRBQTP7f.js";class L extends o{timeline=[];_timelineIndex=0;_delayTimer=0;_promisePending=!1;_promiseResolved=!1;play(){this._timelineIndex=-1,this.queueNextItem(),super.play()}update(e){if(!this._running||this._timelineIndex>=this.timeline.length)return;const t=this.timeline[this._timelineIndex];if(t instanceof o)t.update(e),t.isRunning||this.queueNextItem();else if(Array.isArray(t)){let n=!0;for(const i of t)i instanceof o&&(i.update(e),i.isRunning&&(n=!1));n&&this.queueNextItem()}else if(typeof t=="function")if(this._promisePending)this._promiseResolved&&(this._promisePending=!1,this._promiseResolved=!1,this.queueNextItem());else{const n=t();n instanceof Promise&&(this._promisePending=!0,this._promiseResolved=!1,n.then(()=>{this._promiseResolved=!0}))}else typeof t=="number"&&(this._delayTimer+=e,this._delayTimer>=t&&(this._delayTimer=0,this.queueNextItem()))}queueNextItem(){if(this._timelineIndex++,this._timelineIndex>=this.timeline.length){this.complete();return}const e=this.timeline[this._timelineIndex];if(e instanceof o)e.play();else if(Array.isArray(e))for(const t of e)t instanceof o&&t.play()}append(e){return this.timeline.push(e),this}join(e){const t=this.timeline[this.timeline.length-1];if(t instanceof o)this.timeline.splice(this.timeline.length-1,1,[t,e]);else if(Array.isArray(t))t.push(e);else throw new Error("Cannot join to a non-tween item in the sequence.");return this}wait(e){return this.timeline.push(e),this}callback(e){return this.timeline.push(e),this}}function y(){return new L}function S(s){if(s instanceof d){const e=s.children.filter(i=>i instanceof p);if(e.length===0)throw new Error("Create animation can only be applied to groups containing WPathObjects.");const t=e.map(i=>i.path.clone()),n=e.map(i=>i.path.getLength());return y().onPlay(()=>{s.fillOpacity(0),s.stroke(s.fill()),s.strokeWidth(.05),s.strokeOpacity(1),e.forEach(i=>i.show())}).onComplete(()=>{}).append(u().onUpdate(i=>{console.log(1,i),e.forEach((a,r)=>{a.path=t[r].truncate(i*n[r]),a.renderPath()})}).duration(.5)).append(u().onUpdate(i=>{console.log(2,i),e.forEach(a=>{a.fillOpacity(i).strokeWidth(.05*(1-i))})}).duration(.5))}if(s instanceof p){const e=s.path.clone(),t=e.getLength();return u().onPlay(()=>s.show()).onUpdate(n=>{s.path=e.truncate(n*t),s.renderPath()}).duration(.5)}throw new Error("")}class N extends W{constructor(e=0,t=0){super(e,t),this.element.setAttribute("r",(1/10).toString()),this.fill("white"),this.updateTransform()}createElement(){return document.createElementNS("http://www.w3.org/2000/svg","circle")}}class T extends p{constructor(e,t){super(0,0),this.path=x.fromPoints([e,t]),this.renderPath(),this.updateTransform()}}class E extends p{r;n;constructor(e=0,t=0,n=5,i=1){super(e,t),this.n=n,this.r=i,this.path=O(0,0,n,i),this.renderPath()}}function O(s,e,t,n){const i=2*Math.PI/(2*t),a=[];for(let r=0;r<2*t;r++){const _=r%2===1,f=-r*i-Math.PI/2,m=_?n*.5:n,P=s+m*Math.cos(f),I=e+m*Math.sin(f);a.push([P,I])}return x.fromPoints(a)}class A extends h{async run(){const e=this.add(new w(0,0,2));e.stroke("#ec6e74"),e.fill("#68245f"),await this.play(S(e))}}function U(){return c.jsx(l,{scene:A})}class k extends h{async run(){const e=new q;this.add(e);for(let t=0;t<3;t++){const n=new E(-3+t*3,0);n.fill("#FDDA0D"),n.show(),e.add(n)}}}function b(){return c.jsx(l,{scene:k})}class v extends h{async run(){const e=this.add(new d("f(z) = \\frac{1}{2 \\pi i} \\oint_C \\frac{f(\\zeta)}{\\zeta - z} \\, d\\zeta"));await e.rendered,await this.play(S(e))}}function X(){return c.jsx(l,{scene:v})}class D extends h{async run(){const e=this.add(new g(-2,0,2));e.fill("red"),e.scale([0,0]),e.show(),await this.play(y().append(e.animate.scale([1,1],1).ease("outElastic")).wait(.5).append(e.animate.x(2,1).ease("inOutSine")).join(e.animate.fill("green",.5)).append(e.animate.scale([0,0],1).ease("inOutSine")).join(e.animate.rotate(180,1).ease("inOutSine")))}}function F(){return c.jsx(l,{scene:D})}const z=`import { Circle, Dot, Line, RegularNgon, Square, Star, WanimScene } from "wanim";

import { WanimSceneExample } from "@/components/wanim-scene-example";
import { extractExampleSource } from "@/lib/extract-example-source";

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

            shapes[i].fill(colors[i]);
            shapes[i].show();
        }
    }
}

export function ShapesExample() {
    return <WanimSceneExample scene={Shapes} source={extractExampleSource(code)} />;
}
`;class M extends h{async run(){const e=[new w(-3,-3),new g(0,-3),new T([2,-2.5],[4,-3.5]),new R(-3,0,5),new E(0,0,5),new N(3,0)],t=["#a8e6cf","#dcedc1","#ffd3b6","#ffaaa5","#ff8b94","white"];for(let n=0;n<e.length;n++)this.add(e[n]),e[n].fill(t[n]),e[n].show()}}function B(){return c.jsx(l,{scene:M,source:C(z)})}export{U as CreateCircleExample,b as GroupsExample,X as LaTeXExample,F as SequencesExample,B as ShapesExample};
