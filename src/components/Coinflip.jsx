  import React, { useEffect, useState } from "react";
  import '../CSS/Coinflip.css'
  import coin from '../Assets/coin.svg';

  const Coinflip = () =>{

    const [result,setResult] = useState(null);

    const [score, updateScore] = useState(() => {
      let savedScore = JSON.parse(localStorage.getItem("score"));
      return savedScore || { wins: 0, losses: 0, computerMove: "", playerMove: "" };
    });
    

    useEffect(()=> {
      localStorage.setItem('score',JSON.stringify(score));
    },[score])

    const chooseCoin = (choice) =>{
      const randomNumber = Math.random();
      let computerMove = randomNumber < 0.5 ? 'Head' : 'Tail';
      
      let newResult = computerMove === choice ? 1 : 0;
      setResult(newResult);

      if(newResult === 1){
        updateScore(prevScore=>({...prevScore,wins : prevScore.wins+1,computerMove :computerMove, playerMove :choice}));
      }
      else{
        updateScore(prevScore=>({...prevScore,losses:prevScore.losses+1,computerMove :computerMove, playerMove :choice}));
      }
    }

    const resetScore = () =>{
      updateScore(({wins : 0,losses : 0,computerMove: "", playerMove: ""}));
    }

    return (
      <div className="coinflip-container">
        <div className="coinbtn-container">
          <button className="coin-btn" onClick= {()=>{chooseCoin('Head')}}>
            <img src={coin} alt="head-img" className="coin-img" />
          </button>
          <button className="coin-btn" onClick= {()=>{chooseCoin('Tail')}}>
            <img src={coin} alt="head-img" className="coin-img" />
          </button>
        </div>

        <div className= "coin-info">
          <div className="coin-names">Head</div>
          <div className="coin-names">Tail</div>
        </div>

        <div className="show-result">
            {result === 1 ? <h3>You win</h3> : result === 0 ? <h3>You lose</h3> :null}

            {result !== null && (score.wins !== 0 || score.losses !== 0) &&(
              <div className="show-moves">
                <h3>{`Computermove : ${score.computerMove}`}</h3>
                <h3>{`Playermove : ${score.playerMove}`}</h3>
              </div>
            )}

            <div>
              <h3>{`Wins : ${score.wins} Losses : ${score.losses}`}</h3>
            </div> 

            <button className="reset-btn" onClick={()=>resetScore()}>Reset</button>
            
        </div>
        
      </div>
    )
  }

  export default Coinflip

