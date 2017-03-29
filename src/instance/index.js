/**
 * @description IUStudio instance
 * @author wing
 */
import compile from '../compiler/compile';
import { getOuterHTML } from '../utils/';

export default class IUStudio {
    constructor(opts) {
        this.$$opts = opts || {};
        this.$$data = this.$$opts.data || {};
        const _el = this.$$el = document.querySelector(this.$$opts.el);
        const render = compile(getOuterHTML(_el));
    }
}