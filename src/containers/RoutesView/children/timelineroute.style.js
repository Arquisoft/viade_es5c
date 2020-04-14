import styled from 'styled-components';

export const RouteCard = styled.div`
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  max-width: 90%;
  flex-direction: row;
  padding: 10px 0;
  align-items: center;

  button {
    margin-right: 8px;
  }
`;

export const RouteDetail = styled.div`
    border = 1em;
  padding: 1rem 3.5rem;
  p;
  .button{
  background-color: transparent;
  font-weight: bold;
      font : Verdana;
      font-size:24px;
  }
.modal {
  text-align: center;
}
.map{
  width: 10%;
}

`;