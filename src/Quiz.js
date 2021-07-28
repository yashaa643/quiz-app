import React from 'react';

import classNames from 'classnames';

import QuizOptions from './QuizOptions';

class Quiz extends React.Component{

    constructor(props){
        super(props);
        let riddle = this.playGame();
        let correct = false;
        let gameOver = false;

        this.state = {
            riddle : riddle,
            correct : correct,
            gameOver : gameOver
        }

        this.renderOptions = this.renderOptions.bind(this);
        this.checkResults = this.checkResults.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }

    playGame(){
        let field1 = this.randomNumber(20,50);
        let field2 = this.randomNumber(20,50);
        let result = field1 + field2;
        let resultsArray = this.generateRandomOptions(result);
        let riddle = {
            resultsArray: resultsArray,
            field1: field1,
            field2: field2,
            answer: result
        };

        if(this.state && this.state.gameOver){
            this.setState({riddle: riddle})    // update the state if game has been initialized once
        }
        else{
            return riddle;                      // else just return
        }
        
    }

    randomNumber(min,max){
        return Math.floor(Math.random() * (max-min+1) + min);
    }

    generateRandomOptions(result){

        let resultsArray = [];
        while(resultsArray.length < 3){
            let randomNumber = this.randomNumber(1,19);
            let additionflag = this.randomNumber(0,1);
            if(resultsArray.indexOf(randomNumber) > -1) continue; //ignore Duplicate
            additionflag === 1 ?
             resultsArray.push(result + randomNumber) : 
             resultsArray.push(result - randomNumber)
        }

        resultsArray.push(result);
        resultsArray.sort((a,b) => {return 0.5 - Math.random()}) // randomize the array

        return resultsArray;
    }

    

    checkResults(option){
        if(this.state.riddle.answer === option){
            this.setState({correct : true, gameOver : true})
        }
        else{
            this.setState({correct : false, gameOver : true})
        }
    }

    renderOptions(){
        const {riddle} = this.state;
        return(
            <div className="options">
                {riddle.resultsArray.map((options, i) => 
                    <QuizOptions key={i} option={options} checkResults={this.checkResults}/>
                )}
            </div>
        );
    }

    renderMessage(){
        const {correct} = this.state;
        if(correct){
            return <h3>Correct Answer !!!! Hit the Button to Play Again</h3>
        }
        else{
            return <h3>Wrong Answer :| Hit the Button to Play Again </h3>
        }
    }
    
    playAgain(){
        this.setState({correct: false, gameOver: false});
        this.playGame();
    }
    render(){
        const {riddle,correct,gameOver} = this.state;
        return (
        <>
          <div className="quiz">
              <div className="quiz-content">
                <p className="question">
                What is the sum of <span className="text-info">{riddle.field1}</span> and <span className="text-info">{riddle.field2}</span>  ?</p>
                {this.renderOptions()}
              </div> 
              <div className={classNames("after",{'hide':!gameOver},{'wrong':!correct},{'correct':correct},"animate__animated animate__zoomInDown")}>
                {this.renderMessage()}
              </div> 
              <div className="play-again">
            <button className="button" onClick={this.playAgain}>Play Again</button>
              </div> 
         </div>
        </>
        )
    }
}

export default Quiz;