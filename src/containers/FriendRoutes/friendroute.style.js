import styled from 'styled-components';

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

export const RouteList = styled.p`
    border: 2px solid orange;
`;

export const H1 = styled.h1`
    color:white;
`;

export const H2 = styled.h2`
    color: black;
    font-size: medium;
`;

export const LABEL = styled.label`
    padding: 15px;
`;