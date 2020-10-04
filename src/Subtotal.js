import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import {useStateValue} from "./StateProvider";
import {useHistory} from "react-router-dom";

function Subtotal() {
    const history = useHistory();
    const [{basket}]=useStateValue();
    console.log("item price",);
    const getTotal=(basket)=>{
        var total=0
        for (var i=0;i<basket.length;i++){
            console.log(basket[i].price);
            total+=basket[i].price;
            console.log(total);
        }
        return total
    }
    return (
        <div className="subtotal">
            <CurrencyFormat
            renderText={(value)=>(
                <>
                <p>
                Subtotal({basket.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal__gift">
                    <input type="checkbox" /> This order contains a gift
                </small>
                </>
            )}
            decimalScale={2}
            value = {getTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
            />
            <button onClick={e => history.push('./Payment')}>proceed to checkout</button>
        </div>
    );
}

export default Subtotal;
