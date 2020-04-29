import styled from 'styled-components';

export const ShareWrapper = styled.section`
  padding: 150px
  position: relative
  display: flex;
  flex: 1 0 auto;
  display: block;
  text-align: center;
  flex-direction:row !important;
  background-image: url('img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  height: inherit;
  width: 100vw !important;
`;

export const ShareContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 90%;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
   h1 {
    color: black;
      font-weight: bold;
      font : Verdana;
  }
`;

export const Header = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-image: url('img/pattern-geo.png'),
    linear-gradient(135deg, #B05103 0%, #FD7200 50%, #F48E3C 100%);
    background-repeat: repeat, no-repeat;
    padding: 30px 20px;
`;

export const Button = styled.button`
    max-width: 128px;
    display: inline-block;
    size: 100px;
    &:first-child {
    margin-right: 10px;
    }
`;

export const Input = styled.input`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    linear-gradient(135deg, #B05103 0%, #FD7200 50%, #F48E3C 100%);
    padding: 30px 20px;
`;

export const H1 = styled.h1`
    color: white;
    font-weight: bold;
    font : Verdana;
  }
`;
