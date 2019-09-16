
export function getRandomNumberString() {
    const randomNumStr = Math.random().toString();
    return randomNumStr.slice(2, randomNumStr.length - 1);
}

export function turnTimeStamp(timeStr) {
    const time = timeStr.toString();
    let result = '';
    let year = '';
    let month = '';
    let date = '';
    if (time.length <= 8) { // for 20180607 and 201806
        year = time.slice(0, 4);
        month = time.slice(4, 6);
        date = time.slice(6, 8);
    } else if (time.length <= 10) { // for 2018-06-07 and 2018-06
        year = time.slice(0, 4);
        month = time.slice(5, 7);
        date = time.slice(8, 10);
    }
    year = parseInt(year, 10);
    month = parseInt(month, 10) - 1;
    month = month > 0 ? month : 0;

    if (date) {
        date = parseInt(date, 10);
        result = new Date(year, month, date).getTime();
    } else {
        result = new Date(year, month).getTime();
    }
    return result;
}

export function truncateString(target, digit) {
    const str = target.toString();
    const num = parseInt(digit, 10);
    return str.length > num ? `${str.slice(0, num > 3 ? num - 3 : num)}...` : str;
}

export function turnPercent(num, fixed = 2) {
    let result = num;
    let numStr = num.toString();
    const decimalIndex = numStr.indexOf('.');
    if (decimalIndex > -1) {
        // if (decimalIndex + 2 > numStr.length - 1) { numStr += '00';}
        numStr += '00';
        result = numStr.replace(/\.(.{2})/g, '$1.'); // replace '.**' with '**.'
        result = `${parseFloat(result).toFixed(fixed)}%`;
    } else if (typeof result === 'number' && !Number.isNaN(result)) {
        result = `${result * 100}%`;
    }
    return result;
}

export function localeFloat(num) {
    let result = parseFloat(num.toFixed(2)).toLocaleString('en-US');
    const dotIndex = result.indexOf('.');
    if (dotIndex === -1) {
        result += '.00';
    } else {
        const gap = result.length - dotIndex - 1;
        if (gap < 2) {
            result += '0' * gap;
        }
    }
    return result;
}

export function deleteAllCookies() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}

export function setCookie(cName, value, expiredays) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    const cookieStr = `${cName}=${escape(value)
    }${(expiredays == null) ? '' : `;expires=${exdate.toGMTString()}`}`;
    document.cookie = cookieStr;
}

export function getCookie(cName, type = 'string') {
    if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(`${cName}=`);
        if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            let cEnd = document.cookie.indexOf(';', cStart);
            if (cEnd === -1) {
                cEnd = document.cookie.length;
            }
            let result = unescape(document.cookie.substring(cStart, cEnd));
            if (result && type === 'object') {
                result = JSON.parse(result);
            }
            return result;
        }
    }
    return '';
}

export function getRandomString() {
    const str = Math.random().toString();
    return str.slice(2, str.length - 1);
}

export function getNumberFromString(str) {
    return str.match(/(\d|\.)*/g).join('');
}

export function turnToRate(num) {
    let realNum = parseFloat(num) * 100;
    realNum = +(`${Math.round(`${realNum}e+2`)}e-2`);
    return `${realNum}%`;
}

export function toDecimalMark(num) {
    return num.toLocaleString('en-US');
}

export function debounce(callback, interval = 600) {
    let timeoutHandler = '';

    return () => {
        timeoutHandler && clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(() => {
            callback.apply(this);
        }, interval);
    };
}

export function copyToClipboard(str, success, failed, error) {
    const textArea = document.createElement('textarea');
    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            success();
        } else {
            failed();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        typeof error === 'function' && error();
    }

    document.body.removeChild(textArea);
}

export function getType(val) {
    let result;
    const typeStr = Object.prototype.toString.call(val);
    switch (typeStr) {
    case '[object Array]':
        result = 'array';
        break;
    case '[object Object]':
        result = 'object';
        break;
    case '[object String]':
        result = 'string';
        break;
    case '[object Number]': // NaN is also a number
        result = 'number';
        break;
    case '[object Boolean]':
        result = 'boolean';
        break;
    case '[object Undefined]':
        result = 'undefined';
        break;
    case '[object Null]':
        result = 'null';
        break;
    case '[object Function]':
        result = 'function';
        break;
    default:
        break;
    }
    return result;
}
