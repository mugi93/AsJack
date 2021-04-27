import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './componant/button/Button.jsx'
import Cartes from "./views/carte/Cartes";
import StartGame from './views/Play/StartGame.jsx'
import Utils from "./utils/Utils.js"
import { rndCarte } from "./utils/Utils.js"
import { transformCardIntoInt } from "./utils/Utils"





class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      counterPlayer: 0,
      counterDealer: 0,
      playerCardList: [],
      dealerCardList: [],
      startGame: false,
      endGame: false,
      nameOfWinner: ""
    }
  }



  onClickStop = () => {
    // la valeur des 2 premieres cartes 
    const cardSelectedDealer = rndCarte()
    const cardSelectedDealer2 = rndCarte()

    const valueCarteDealer = transformCardIntoInt(cardSelectedDealer.split("")[0])
    const valueCarteDealer2 = transformCardIntoInt(cardSelectedDealer2.split("")[0])

    const cardsDealer = [cardSelectedDealer, cardSelectedDealer2]

    let dealerValue = valueCarteDealer + valueCarteDealer2

    let endGameAndWinner = {
      endGame: false,
      nameOfWinner: ""
    }
    // condition pour gagner
    while (dealerValue < 17) {
      const cardSelectedDealer = rndCarte()
      const valueCarteDealer = transformCardIntoInt(cardSelectedDealer.split("")[0])

      cardsDealer.push(cardSelectedDealer)

      dealerValue += valueCarteDealer

      if (dealerValue > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }

        break;
      }
    }
    if (dealerValue <= 21) {
      if (this.state.counterPlayer > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
      } else if (this.state.counterPlayer < dealerValue) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
      } else {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }
      }
    }

    console.log("update state on stop");

    this.setState({
      counterDealer: dealerValue,
      dealerCardList: cardsDealer,
      nameOfWinner: endGameAndWinner.nameOfWinner,
      endGame: endGameAndWinner.endGame
    })
  }

  onClickGive = () => {
    // carte du joueur 
    const cardSelected = rndCarte()
    const valueCarte = transformCardIntoInt(cardSelected.split("")[0])
    const totalPlayerValue = this.state.counterPlayer + valueCarte
    let endGameAndWinner = {
      endGame: false,
      nameOfWinner: ""
     }
     console.log(totalPlayerValue)
    if (totalPlayerValue > 21) {
      endGameAndWinner = {
        endGame: true,
        nameOfWinner: "Le player a perdu"
      }
    }

    this.setState({
      nameOfWinner: endGameAndWinner.nameOfWinner,
      endGame: endGameAndWinner.endGame,
      counterPlayer: totalPlayerValue,
      playerCardList: [...this.state.playerCardList, cardSelected]
    })
  }



  startGame = () => {
    const cardSelected = rndCarte()
    const cardSelected2 = rndCarte()

    const valueCarte = transformCardIntoInt(cardSelected.split("")[0])
    const valueCarte2 = transformCardIntoInt(cardSelected2.split("")[0])

    const firstPlayerValue = valueCarte + valueCarte2

    const firstTwoCardsPlayer = [cardSelected, cardSelected2]

    this.setState({
      counterPlayer: firstPlayerValue,
      playerCardList: firstTwoCardsPlayer,
      startGame: true
    })
  }

  renderMsg() {
    if (this.state.nameOfWinner === "Le player a perdu") {
      return (<h1>{this.state.nameOfWinner}</h1>)
    } else {
      return (<h1>Winner is {this.state.nameOfWinner}</h1>)
    }
  }
  

  renderGame() {

    return (<div>


      <div className="playGame">
        <div style={{ height: '100vh', position: 'relative' }}>
          <h1 style={{ color: '#feb236', textAlign: 'center' }}>Black Jack</h1>

          <Cartes key={"dealer"} cardList={this.state.dealerCardList} />
          {this.state.endGame && (<div className='winlost'>
            {this.renderMsg()}
          </div>)}




          <div style={{ bottom: '20px', position: 'absolute' }} className="row col-6 offset-3 flex d-flex justify-content-between">

            <div className="d-grid gap-2">

              <Button
                onClick={this.onClickGive}
                classe="btn btn-outline-warning btn-lg rounded-pill"
                color="white"
                bcolor="#0d6efd"
                name="Give"
                display={this.state.endGame === true ? "none" : "block"}
              />
            </div>
            <div className="d-grid gap-2">
              <Cartes key={"player"} cardList={this.state.playerCardList} />
            </div>
            <div className="d-grid gap-2">
              <Button
                onClick={this.onClickStop}
                classe="btn btn-outline-warning btn-lg rounded-pill"
                color="white"
                bcolor="#dc3545"
                name="Stop"
                display={this.state.endGame === true ? "none" : "block"} />
            </div>

          </div>
        </div>
      </div>
    </div>)
  }

  render() {
    if (this.state.startGame === false) {
      return (
        <StartGame startGame={this.startGame} />
      )
    } else {
      return (this.renderGame())
    }
  }
}

export default Table;

