import { DOMElement } from './dom';
interface Output {
    /**
     * Element width.
     */
    width: number;
    /**
     * Element height.
     */
    height: number;
}
/**
 * Measure the dimensions of a particular `<Box>` element.
 */
declare const _default: (node: DOMElement) => Output;
export default _default;
