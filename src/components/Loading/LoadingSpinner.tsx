import React from "react";
import styled, { keyframes } from "styled-components";

// Animation for the spinner
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the spinner container
interface SpinnerContainerProps {
  height?: string;
  width?: string;
  bgColor?: string;
}

const SpinnerContainer = styled.div<SpinnerContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height || "100vh"};
  width: ${(props) => props.width || "100%"};
  background-color: ${(props) => props.bgColor || "transparent"};
`;

// Styled component for the spinner
interface SpinnerProps {
  size?: string;
  thickness?: string;
  color?: string;
  spinColor?: string;
  spacing?: string;
}

const Spinner = styled.div<SpinnerProps>`
  width: ${(props) => props.size || "50px"};
  height: ${(props) => props.size || "50px"};
  border: ${(props) => props.thickness || "5px"} solid ${(props) => props.color || "#f3f3f3"};
  border-top: ${(props) => props.thickness || "5px"} solid ${(props) => props.spinColor || "#3498db"};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${(props) => props.spacing || "15px"};
`;

// Styled component for the loading text
interface LoadingTextProps {
  fontSize?: string;
  color?: string;
}

const LoadingText = styled.p<LoadingTextProps>`
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || "#333"};
  margin: 0;
`;

// Defining the props for the LoadingSpinner component
interface LoadingSpinnerProps {
  size?: string;
  thickness?: string;
  color?: string;
  spinColor?: string;
  height?: string;
  width?: string;
  bgColor?: string;
  text?: string;
  textFontSize?: string;
  textColor?: string;
  spacing?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
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
