import React from "react";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { getQuizData } from "../../../reducks/quiz/selectors";

export default function Progressbar() {
  const selector = useSelector((state) => state);
  const quizData = getQuizData(selector);

  const Block = styled.div`
    margin: 0;
    height: 8px;
    border-right: 1px solid white;
    background-color: gray;
    :last-child {
      border: none;
    }
    :nth-child(n + 1):nth-child(-n + ${quizData.currentIndex}) {
      background-color: #05c4a3;
    }
  `;

  const fields = [];
  for (let i = 1; i <= quizData.quizLength; i++) {
    fields.push(<Block key={i} />);
  }

  return <div className="progress-bar">{fields.map((field) => field)}</div>;
}
