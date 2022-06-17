import React from "react";

function Price(props) {

    let price = props.price?.toString()
    price = price?.split("").reverse().join("").replace(/(.{3})/g,"$1 ").trim().split("").reverse().join("")

    if (props.sale) {
        let sale = props.sale.toString()
        sale = sale.split("").reverse().join("").replace(/(.{3})/g,"$1 ").trim().split("").reverse().join("")
        return <div className="_price-wrapper__wrapper">
            <div className="_price-wrapper _price_old">
                <span className="_price">{price}</span> <strong>{props.wallet}</strong>
            </div>
            <div className="_price-wrapper _price_new">
                <span className="_price">{sale}</span> <strong>{props.wallet}</strong>
            </div>
        </div>
    } else {
        return <div className="_price-wrapper">
            <span className="_price">{price}</span> <strong>{props.wallet}</strong>
        </div>
    }


}

export default Price
