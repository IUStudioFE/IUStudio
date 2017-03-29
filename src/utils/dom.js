/**
 * @description utils of dom
 * @author wing
 */
export function getOuterHTML(elem) {
    if(elem.outterHTML) {
        return elem.outterHTML;
    } else {
        const container = document.createElement('div');
        container.appendChild(elem.cloneNode(true));
        return container.innerHTML;
    }
}
