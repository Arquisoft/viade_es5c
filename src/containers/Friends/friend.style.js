import styled from 'styled-components';

export const FriendWrapper = styled.section`
  width: 100%;
  background-image: url('img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 50px 0;
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