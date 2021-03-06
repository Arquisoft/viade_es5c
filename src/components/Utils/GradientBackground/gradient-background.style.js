import styled from 'styled-components';

export const Gradient = styled.div`
  background-image: linear-gradient(135deg, #B05103 0%, #FD7200 50%, #F48E3C 100%);
  background-repeat: no-repeat;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('img/background-pattern.svg');
    filter: opacity(30%);
  }
`;
