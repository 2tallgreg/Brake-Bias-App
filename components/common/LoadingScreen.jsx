// components/common/LoadingScreen.jsx
'use client';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const ellipsis = keyframes`
  to {
    width: 1.25em;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--bg-primary);
  z-index: 9999;
`;

const LoadingText = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-top: 1.5rem;
  font-family: 'Roboto Mono', monospace;

  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4, end) 1500ms infinite;
    content: "\\2026"; /* ascii code for the ellipsis character */
    width: 0px;
  }
`;

const CarSpinner = styled.div`
  // Simple CSS spinner as a placeholder
  border: 4px solid var(--border);
  border-top: 4px solid var(--accent);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// --- The 'text' prop defaults to "Buffeting..." if not provided ---
export default function LoadingScreen({ text = "Buffeting..." }) {
  return (
    <SpinnerContainer>
      <CarSpinner />
      <LoadingText>{text}</LoadingText>
    </SpinnerContainer>
  );
}