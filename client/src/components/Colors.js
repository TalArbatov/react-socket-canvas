import React from "react";
import styled from "styled-components";
import Color from "./Color";
const colors = ["black", "grey", 'red', 'orange', 'blue'];

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Colors = props => {
  return (
    <Wrapper>
      {colors.map((color, index) => {
        return <Color changeColor={props.changeColor} key={index} color={color} />;
      })}
    </Wrapper>
  );
};

export default Colors;
