/* Необходимо написать ф-ию, которая отправляет запрос на сервер.
 * Этот запрос можно отправить с разными фильтрами.
 * Ф-ия, что будет написана, должна уметь кешировать запрос и предотвращать повторную отправку на сервер с текущими
 * параметрами фильтра.
 * У кеша есть время жизни ( скажем 5 сек), после чего он уничтожится.
 * Это значит, что после повторного запроса с текущим фильтром произайдет запрос на сервер и эти данные опять закеширкуются.
*/
import axios from "axios";

function reqCache(timeout = 5000) {
    let cashValue = {};
    return {
        get: (label) => {
            return cashValue[label]
        },
        set: (label, newValue) => {
            cashValue[label] = newValue;
            setTimeout(() => {
                cashValue[label] = null;
            }, timeout)
        }
    }
}

const sendReq = (obj) => {
    let params = '';
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (params) params += '&';
        params += `${key}=${value}`
    })

    let cache = reqCache.get(params);
    if (cache) {
        return console.log(cache);
    }
    if (params) params = '?' + params;
    axios.get('bla/bla/bla?' + params)
        .then(resp => {
            reqCache.set(params, resp.data);
        })
}


