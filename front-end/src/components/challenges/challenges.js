import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import "./challenges.scss";
const Challenges = () => {

    // this.state = {
    //     error: null,
    //     isLoaded: false,
    //     items: []
    //   };

    const [items, setItems] = useState([]);
    
    //const [newvalue, xyz] = useState(0);  
    useEffect(() => {
        console.log("Quiz API data fetch rendered");

        fetch("http://localhost:3000/api/v1/quiz")
          .then((response) => response.json())
          .then((result) => {
             // console.log(result);
              setItems(result);
          })
          .catch(() => null);
      }, []);

    // const questions = [
    //     {
    //         questionText: 'What is the capital of France?',
    //         answerOptions: [
    //             { answerText: 'New York', isCorrect: false },
    //             { answerText: 'London', isCorrect: false },
    //             { answerText: 'Paris', isCorrect: true },
    //             { answerText: 'Dublin', isCorrect: false },
    //         ],
    //     },
    //     {
    //         questionText: 'Who is CEO of Tesla?',
    //         answerOptions: [
    //             { answerText: 'Jeff Bezos', isCorrect: false },
    //             { answerText: 'Elon Musk', isCorrect: true },
    //             { answerText: 'Bill Gates', isCorrect: false },
    //             { answerText: 'Tony Stark', isCorrect: false },
    //         ],
    //     },
    //     {
    //         questionText: 'The iPhone was created by which company?',
    //         answerOptions: [
    //             { answerText: 'Apple', isCorrect: true },
    //             { answerText: 'Intel', isCorrect: false },
    //             { answerText: 'Amazon', isCorrect: false },
    //             { answerText: 'Microsoft', isCorrect: false },
    //         ],
    //     },
    //     {
    //         questionText: 'How many Harry Potter books are there?',
    //         answerOptions: [
    //             { answerText: '1', isCorrect: false },
    //             { answerText: '4', isCorrect: false },
    //             { answerText: '6', isCorrect: false },
    //             { answerText: '7', isCorrect: true },
    //         ],
    //     },
    // ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    // const handleAnswerOptionClick = (isCorrect) => {
    //     if (isCorrect) {
    //         setScore(score + 1);
    //     }

    //     const nextQuestion = currentQuestion + 1;
    //     if (nextQuestion < questions.length) {
    //         setCurrentQuestion(nextQuestion);
    //     } else {
    //         setShowScore(true);
    //     }
    // };
    return (
        <div>
            <Header />
            <div className="content">
                <h1>Challenges</h1>
                {items.map((items,index) => (
                <div className='app'>
                    {showScore ? (
                        <div className='score-section'>
                            You scored {score} out of {items.length}
                        </div>
                    ) : (
                            <>
                                <div className='question-section'>
                                    <div className='question-count'>
                                        <span>Question {index + 1}</span>
                                    </div>
                                    <div className='question-text'>{items.question.question}</div>
                                </div>
                                <div className='answer-section'>
                                    {items.answers.map((answerOption) => (
                                    <button>{answerOption.answer}</button>
                                    ))}
                                </div>
                            </>
                        )}
                </div>
        ))}
            </div>
                
            <Footer />
        </div>
    );
}

export default Challenges;