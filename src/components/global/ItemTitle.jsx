import React from 'react';

function ItemsTitle(props) {

    let lang = props.currentLanguage
    let cnt = props.count

    if (lang === 'ru') {
        if ((cnt < 10 || cnt > 20) && (cnt % 10 === 1)) return <i>{cnt} товар</i>
        else if ((cnt < 10 || cnt > 20) && (cnt % 10) < 5 && (cnt % 10) !== 0) return <i>{cnt} товара</i>
        else return <i>{cnt} товаров</i>
    } else if (lang === 'en') {
        if (cnt === 1) return <i>{cnt} item</i>
        return <i>{cnt} items</i>
    }
        return <i>{cnt} items</i>


}

export default ItemsTitle;
