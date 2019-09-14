export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export const formatDate = dt => {
    const date = new Date(dt * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (
        day +
            '.' +
            (month + 1 < 10
                ? '0' + (month + 1)
                : month + 1) +
            '.' +
            date.getFullYear() +
            ' ' +
            (hours < 10 ? '0' + hours : hours) +
            ':' +
            (minutes < 9
                ? '0' + minutes
                : minutes) || ''
    );
};
