import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  width: 100%;
  min-height: 6em;
  display: flex;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
`;

const Name = styled.h3`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const Rating = styled.span`
  color: #a1a1a1;
  font-size: 16px;
  display: flex;
  flex: 0.2;
`;

export function Movie(props) {
  const { name, rating } = props;

  return (
    <MovieContainer>
      <Name>{name}</Name>
      <Rating>{rating || "N/A"}</Rating>
    </MovieContainer>
  );
}
