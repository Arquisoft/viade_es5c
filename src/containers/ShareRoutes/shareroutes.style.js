import styled from 'styled-components';
import {media} from "../../utils";

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

export const Header = styled.div`
  display: flex;
  flex-direction: column !important;
  position: relative;
   background-image: url('img/pattern-geo.png'),
    radial-gradient(#ff8000, #ff8000, #ff8000);
  background-repeat: repeat, no-repeat;
  padding: 30px 20px;
  max-width: 300px;
`;

export const Input = styled.input`
  margin: 5px;
  color: black;
`;

export const Button = styled.button`
  max-width: 128px;
  display: inline-block;
  margin-left: 5px;
`;

export const Label = styled.label`
  margin: 5px;
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