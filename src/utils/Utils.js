import React from "react";

class Utils extends React.Component {


    rndCarte() {
        let rndCarteTemp = "";
        let rndNumTemp = 0;

        rndNumTemp = Math.floor(Math.random() * 53);

        if (rndNumTemp > 52) { rndNumTemp = rndNumTemp - 10 } else if (rndNumTemp < 1) { rndNumTemp = rndNumTemp + 10 }

        rndCarteTemp = this.props.cardArray[rndNumTemp - 1];

        return rndCarteTemp
    }
    transformCardIntoInt(cardValue) {
        if (cardValue === "K" || cardValue === "Q" || cardValue === "J" || cardValue === "A" || cardValue === "0") {
            cardValue = "10"
        }

        return parseInt(cardValue)
    }


    render() {
        return


    }
}

export default Utils;