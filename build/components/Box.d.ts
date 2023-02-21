import React from 'react';
import { Except } from 'type-fest';
import { Styles } from '../styles';
import { DOMElement } from '../dom';
export type Props = Except<Styles, 'textWrap'> & {
    /**
     * Margin on all sides. Equivalent to setting `marginTop`, `marginBottom`, `marginLeft` and `marginRight`.
     *
     * @default 0
     */
    readonly margin?: number;
    /**
     * Horizontal margin. Equivalent to setting `marginLeft` and `marginRight`.
     *
     * @default 0
     */
    readonly marginX?: number;
    /**
     * Vertical margin. Equivalent to setting `marginTop` and `marginBottom`.
     *
     * @default 0
     */
    readonly marginY?: number;
    /**
     * Padding on all sides. Equivalent to setting `paddingTop`, `paddingBottom`, `paddingLeft` and `paddingRight`.
     *
     * @default 0
     */
    readonly padding?: number;
    /**
     * Horizontal padding. Equivalent to setting `paddingLeft` and `paddingRight`.
     *
     * @default 0
     */
    readonly paddingX?: number;
    /**
     * Vertical padding. Equivalent to setting `paddingTop` and `paddingBottom`.
     *
     * @default 0
     */
    readonly paddingY?: number;
    /**
     * Behavior for an element's overflow in both directions.
     *
     * @default 'visible'
     */
    readonly overflow?: 'visible' | 'hidden';
    /**
     * Behavior for an element's overflow in horizontal direction.
     *
     * @default 'visible'
     */
    readonly overflowX?: 'visible' | 'hidden';
    /**
     * Behavior for an element's overflow in vertical direction.
     *
     * @default 'visible'
     */
    readonly overflowY?: 'visible' | 'hidden';
};
/**
 * `<Box>` is an essential Ink component to build your layout. It's like `<div style="display: flex">` in the browser.
 */
declare const Box: React.ForwardRefExoticComponent<Except<Styles, "textWrap"> & {
    /**
     * Margin on all sides. Equivalent to setting `marginTop`, `marginBottom`, `marginLeft` and `marginRight`.
     *
     * @default 0
     */
    readonly margin?: number | undefined;
    /**
     * Horizontal margin. Equivalent to setting `marginLeft` and `marginRight`.
     *
     * @default 0
     */
    readonly marginX?: number | undefined;
    /**
     * Vertical margin. Equivalent to setting `marginTop` and `marginBottom`.
     *
     * @default 0
     */
    readonly marginY?: number | undefined;
    /**
     * Padding on all sides. Equivalent to setting `paddingTop`, `paddingBottom`, `paddingLeft` and `paddingRight`.
     *
     * @default 0
     */
    readonly padding?: number | undefined;
    /**
     * Horizontal padding. Equivalent to setting `paddingLeft` and `paddingRight`.
     *
     * @default 0
     */
    readonly paddingX?: number | undefined;
    /**
     * Vertical padding. Equivalent to setting `paddingTop` and `paddingBottom`.
     *
     * @default 0
     */
    readonly paddingY?: number | undefined;
    /**
     * Behavior for an element's overflow in both directions.
     *
     * @default 'visible'
     */
    readonly overflow?: "visible" | "hidden" | undefined;
    /**
     * Behavior for an element's overflow in horizontal direction.
     *
     * @default 'visible'
     */
    readonly overflowX?: "visible" | "hidden" | undefined;
    /**
     * Behavior for an element's overflow in vertical direction.
     *
     * @default 'visible'
     */
    readonly overflowY?: "visible" | "hidden" | undefined;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<DOMElement>>;
export default Box;
