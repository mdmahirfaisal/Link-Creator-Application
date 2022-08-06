import styled from "styled-components";

export const Select = styled.select`
font-size: ${(props) => props.size};
 font-weight: ${(props) => props.weight};
 text-align: ${(props) => props.align};
 width: ${props => props.w};
 height: ${props => props.h};
 margin: ${props => props.m};
 padding: ${props => props.p};
 border: ${props => props.border};
 border-radius: ${props => props.rounded};
 color: ${props => props.color};
 background-color: ${props => props.bg};

 &:focus{
    outline: none;
  };
`;
export const Input = styled.input`
font-size: ${(props) => props.size};
 font-weight: ${(props) => props.weight};
 text-align: ${(props) => props.align};
 width: ${props => props.w};
 height: ${props => props.h};
 margin: ${props => props.m};
 padding: ${props => props.p};
 border: ${props => props.border};
 border-radius: ${props => props.rounded};
 color: ${props => props.color};
 background-color: ${props => props.bg};

 &:focus{
    outline: none;
  };
`;



