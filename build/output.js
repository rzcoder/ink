"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slice_ansi_1 = __importDefault(require("slice-ansi"));
const string_width_1 = __importDefault(require("string-width"));
const widest_line_1 = __importDefault(require("widest-line"));
class Output {
    constructor(options) {
        this.operations = [];
        const { width, height } = options;
        this.width = width;
        this.height = height;
    }
    write(x, y, text, options) {
        const { transformers } = options;
        if (!text) {
            return;
        }
        this.operations.push({
            type: 'write',
            x,
            y,
            text,
            transformers
        });
    }
    clip(clip) {
        this.operations.push({
            type: 'clip',
            clip
        });
    }
    unclip() {
        this.operations.push({
            type: 'unclip'
        });
    }
    get() {
        // Initialize output array with a specific set of rows, so that margin/padding at the bottom is preserved
        const output = [];
        for (let y = 0; y < this.height; y++) {
            output.push(' '.repeat(this.width));
        }
        const clips = [];
        for (const operation of this.operations) {
            if (operation.type === 'clip') {
                clips.push(operation.clip);
            }
            if (operation.type === 'unclip') {
                clips.pop();
            }
            if (operation.type === 'write') {
                const { text, transformers } = operation;
                let { x, y } = operation;
                let lines = text.split('\n');
                const clip = clips[clips.length - 1];
                if (clip) {
                    const clipHorizontally = typeof (clip === null || clip === void 0 ? void 0 : clip.x1) === 'number' && typeof (clip === null || clip === void 0 ? void 0 : clip.x2) === 'number';
                    const clipVertically = typeof (clip === null || clip === void 0 ? void 0 : clip.y1) === 'number' && typeof (clip === null || clip === void 0 ? void 0 : clip.y2) === 'number';
                    // If text is positioned outside of clipping area altogether,
                    // skip to the next operation to avoid unnecessary calculations
                    if (clipHorizontally) {
                        const width = (0, widest_line_1.default)(text);
                        if (x + width < clip.x1 || x > clip.x2) {
                            continue;
                        }
                    }
                    if (clipVertically) {
                        const height = lines.length;
                        if (y + height < clip.y1 || y > clip.y2) {
                            continue;
                        }
                    }
                    if (clipHorizontally) {
                        lines = lines.map(line => {
                            const from = x < clip.x1 ? clip.x1 - x : 0;
                            const width = (0, string_width_1.default)(line);
                            const to = x + width > clip.x2 ? clip.x2 - x : width;
                            return (0, slice_ansi_1.default)(line, from, to);
                        });
                        if (x < clip.x1) {
                            x = clip.x1;
                        }
                    }
                    if (clipVertically) {
                        const from = y < clip.y1 ? clip.y1 - y : 0;
                        const height = lines.length;
                        const to = y + height > clip.y2 ? clip.y2 - y : height;
                        lines = lines.slice(from, to);
                        if (y < clip.y1) {
                            y = clip.y1;
                        }
                    }
                }
                let offsetY = 0;
                for (let line of lines) {
                    const currentLine = output[y + offsetY];
                    // Line can be missing if `text` is taller than height of pre-initialized `this.output`
                    if (!currentLine) {
                        continue;
                    }
                    const width = (0, string_width_1.default)(line);
                    for (const transformer of transformers) {
                        line = transformer(line);
                    }
                    output[y + offsetY] =
                        (0, slice_ansi_1.default)(currentLine, 0, x) +
                            line +
                            (0, slice_ansi_1.default)(currentLine, x + width);
                    offsetY++;
                }
            }
        }
        // eslint-disable-next-line unicorn/prefer-trim-start-end
        const generatedOutput = output.map(line => line.trimRight()).join('\n');
        return {
            output: generatedOutput,
            height: output.length
        };
    }
}
exports.default = Output;
//# sourceMappingURL=output.js.map