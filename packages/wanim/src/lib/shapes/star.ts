import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

export class Star extends WPathObject {
    constructor(x = 0, y = 0, n = 1) {
        super(x, y);

        let h = -1;

        this.path = WPath.fromPoints([
            [h, -h],
            [-h, -h],
            [-h, h],
            [h, h],
        ]);
        this.renderPath();
    }
}
