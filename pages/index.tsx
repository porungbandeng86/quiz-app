import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import type { NextPage } from 'next';
import QuestionCard from '../components/QuestionCard';
//components
import { fetchQuizQuestions } from '../API';
//types
import { Difficulty, QuestionsState } from '../API';
import mitt from 'next/dist/shared/lib/mitt';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(true);

  console.log(
    'questions:',
    fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
  );

  const startTrivia = async () => {
    setLoading(true);
    setGameover(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  console.log('questions:', questions);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameover) {
      //users answer
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      //save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //move on the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameover(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <PageWrapper>
      <QuizWrapper>
        <Title>Quiz App</Title>
        {gameover || userAnswers.length === TOTAL_QUESTIONS ? (
          <StartButton onClick={startTrivia}>
            {!gameover ? 'try again' : 'Start'}
          </StartButton>
        ) : null}

        {!gameover && <Score>Score: {score} </Score>}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameover && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameover &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <NextButton onClick={nextQuestion}>Next Question</NextButton>
        ) : null}
      </QuizWrapper>
    </PageWrapper>
  );
};

//slide-in animation
const slideIn = keyframes`
  from {
    transform: translateY(-600px);
  }
  to {
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const QuizWrapper = styled.div`
  width: 500px;
  /* border: 2px solid gray; */
  padding: 24px;
  border-radius: 8px;
  background-color: gainsboro;
  animation: ${slideIn} 600ms ease-out both;
  animation-delay: 250ms;
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Score = styled.p`
  color: dimgray;
  font-size: 2rem;
`;

const StartButton = styled.button`
  font-size: 1.2rem;
  cursor: pointer;
  border: 2px solid lightgray;
  border-radius: 8px;
  height: 40px;
  margin: 20px 0;
  padding: 0 40px;

  transition: transform 150ms ease-in;
  transform-origin: left top;
  will-change: transform;
  /* 
  will-change is a property that allows us to hint to the browser 
  that we're going to animate the selected element, 
  and that it should optimize for this case. */

  &:hover {
    transform: scale(1.1);
    transition: transform 250ms ease;

    transform-origin: left top;
    will-change: transform;
    border: 2px solid silver;
  }
`;

const NextButton = styled.button`
  cursor: pointer;
  border: 2px solid lightgray;
  border-radius: 8px;
  height: 40px;
  margin: 20px 0;
  padding: 0 40px;

  &:hover {
    border: 2px solid silver;
  }
`;

export default Home;
