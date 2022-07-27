import React from 'react';
import styled from 'styled-components';
import { AnswerObject } from '../../pages';

interface Props {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
}

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <QuestionCardWrapper>
      <QuestionCounter>
        Question: {questionNr}/ {totalQuestions}
      </QuestionCounter>
      <Question dangerouslySetInnerHTML={{ __html: question }} />
      <ChoicesWrapper>
        {answers.map(answer => (
          <div key={answer}>
            <ButtonWrapper
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </ButtonWrapper>
          </div>
        ))}
      </ChoicesWrapper>
    </QuestionCardWrapper>
  );
};

const QuestionCardWrapper = styled.div``;

const ChoicesWrapper = styled.div`
  margin-top: 16px;
`;

const QuestionCounter = styled.p`
  font-size: 1.5rem;
`;

const Question = styled.p`
  font-size: 1.5rem;
`;

const ButtonWrapper = styled.button<ButtonWrapperProps>`
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
  font-size: 0.8 rem;
  width: 100%;
  height: 40px;
  margin: 5px 0;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: ${({ correct, userClicked }) =>
    correct
      ? 'linear-gradient(90deg, #56FFA4, #59BC86)'
      : 'linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%)'};
`;

export default QuestionCard;
