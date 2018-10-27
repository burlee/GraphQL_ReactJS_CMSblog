module.exports = {
    firstCharToUpperCase: string => string.slice(0,1).toUpperCase() + string.slice(1, string.length),
    textToUpperCase: string => string.toUpperCase(),
    reverserString: string => string.split('').reverse().join(''),
    removeDuplicateValueFromArray: array => {
        let s = new Set(array);
        let it = s.values();
        return Array.from(it);
    },
    currentElementScroll: ref => {
        let scroller = ref;
        let height = scroller.clientHeight;
        let scrollHeight = scroller.scrollHeight - height;
        let scrollTop = scroller.scrollTop;
        let scrollPos = Math.floor(scrollTop / scrollHeight * 100);
        return scrollPos;
    },
    currentWindowScroll: () => {
        //currentWindowScroll return current window scroll value from 0 to 100
        let currentScroll = Math.round(window.scrollY / (document.documentElement.offsetHeight - window.innerHeight) * 100);
        return currentScroll;
    },
    hiddenWindowScroll: () => { window.document.body.style.overflow = "hidden" },
    showWindowScroll: () => { window.document.body.style.overflow = "visible" }
}