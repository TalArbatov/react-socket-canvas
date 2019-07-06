import React from "react";
import styled from "styled-components";

const Color = ({ color, changeColor }) => {

  const ColorWrapper = styled.div`
    height: 30px;
    width:30px;
    border-radius:50%;
    background: ${color}
    margin:5px;
    cursor:pointer;
  `;
  return (
    <div>
      <ColorWrapper onClick={() => changeColor(color)}></ColorWrapper>
    </div>
  );
};

export default Color;
