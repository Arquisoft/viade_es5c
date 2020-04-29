import styled from 'styled-components';
import {media} from "../../utils";


export const Fo = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  border: 20px solid white;
  background: white;
`;
export const Fo_new = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  border: 1px solid blue;
  background: white;
`;
export const Wrapper = styled.section`
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
    margin: 25px;
    max-width: 128px;
    display: inline-block;
    
    &:first-child {
    margin-right: 10px;
    }
`;


export const INPUT = styled.input`
  align: middle;
  display: block; 
  padding: 20px;
  color: black;
`;


export const LABEL = styled.label`
    vertical-align: middle;
    padding: 15px;
`;

export const H1 = styled.h1`
    color:white;
`;

export const TextArea = styled.textarea`
  margin: 5px;
`;

export const RoutePhoto = styled.div`
  height: 100%;
  text-align: center;
  position: relative;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  h1,
  img {
    margin: 0 10px;
    display: inline-block;
    vertical-align: middle;
  }
  ${media.tablet`
    width: 50%;
    &:after {
      display: block;
      content: "";
      position: absolute;
      height: 100%;
      width: 1px;
      background-color:#D0D0D0;
      top:0;
    }
  `}
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin-left: 0px;
  }
`;