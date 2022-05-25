import styled from 'styled-components';
import { useState } from 'react';
import type { NextPage } from 'next';
import QuestionCard from '../components/QuestionCard';
//components
import { fetchQuizQuestions } from '../API';
//types
import { Difficulty, QuestionsState } from '../API';

type AnswerObject = {
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

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <PageWrapper>
      <Title>Quiz APP</Title>
      {gameover || userAnswers.length === TOTAL_QUESTIONS ? (
        <button onClick={startTrivia}>start</button>
      ) : null}

      {!gameover ? <p>Score: </p> : null}
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

      <button onClick={nextQuestion}>Next Question</button>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default Home;
