import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height || "100vh"};
  width: ${(props) => props.width || "100%"};
  background-color: ${(props) => props.bgColor || "transparent"};
`;

const Spinner = styled.div`
  width: ${(props) => props.size || "50px"};
  height: ${(props) => props.size || "50px"};
  border: ${(props) => props.thickness || "5px"} solid ${(props) => props.color || "#f3f3f3"};
  border-top: ${(props) => props.thickness || "5px"} solid ${(props) => props.spinColor || "#3498db"};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${(props) => props.spacing || "15px"};
`;

const LoadingText = styled.p`
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || "#333"};
  margin: 0;
`;

const LoadingSpinner = ({
  size,
  thickness,
  color,
  spinColor,
  height,
  width,
  bgColor,
  text = "Loading, please wait...", 
  textFontSize,
  textColor,
  spacing,
}) => {
  return (
    <SpinnerContainer height={height} width={width} bgColor={bgColor}>
      <Spinner
        size={size}
        thickness={thickness}
        color={color}
        spinColor={spinColor}
        spacing={spacing}
      />
      <LoadingText fontSize={textFontSize} color={textColor}>
        {text}
      </LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
