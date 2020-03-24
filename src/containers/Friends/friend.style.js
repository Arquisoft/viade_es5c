import styled from 'styled-components';

export const FriendWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-image: url('img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 60px 0;
  h1 {
    color: #666666;
      font-weight: bold;
      font : Verdana;
  }
`;

export const FriendContainer = styled.div`
 box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 90%;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
  img{
  width:100%;
  height:100%;
  }
  li{
      font-weight: bold;
      font : Verdana;
      font-size:20px;
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
  p {
    color: white;
  }
  .edit-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 1rem;
  }
`;
