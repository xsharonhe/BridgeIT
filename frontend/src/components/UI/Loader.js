import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <LoaderWrapper>
        <MainLoader />
    </LoaderWrapper>
  );
};

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainLoader = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  background: transparent;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  ${({ theme }) => `
    border-top: 2px solid ${theme.colors.secondary};
    border-right: 2px solid ${theme.colors.secondary};
    border-bottom: 2px solid ${theme.colors.secondary};
    border-left: 4px solid ${theme.colors.primary};
  `}
`;

export default Loader;