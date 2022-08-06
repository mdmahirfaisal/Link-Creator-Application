import styled from "styled-components";

export const Container = styled.div`
    @media only screen and (min-width: 1281px) {
    width: 1280px;
    margin: 0 auto;
    }
    @media only screen and (max-width: 1280px) {
    width: 96%;
    margin: 0 auto;
    }
    @media only screen and (max-width: 600px) {
    width: 98%;
    margin: 0 auto;
    }
`;
export const Div = styled.div`
    position: ${props => props.position};
    width: ${props => props.w};
    height: ${props => props.h};
    margin: ${props => props.m};
    padding: ${props => props.p};
    border: ${props => props.border};
    border-top:${props => props.borderT};
    border-right:${props => props.borderR};
    border-bottom:${props => props.borderB};
    border-left:${props => props.borderL};
    border-radius: ${props => props.rounded};
    color: ${props => props.color};
    background-color: ${props => props.bg};
`;

// export const Grid = styled.div`
//     position: ${props => props.position};
//     display: grid;
//     width: ${props => props.w};
//     height: ${props => props.h};
//     margin: ${props => props.m};
//     padding: ${props => props.p};
//     color: ${props => props.color};
//     background-color: ${props => props.bg};
//     border: ${props => props.border};
//     border-top:${props => props.borderT};
//     border-right:${props => props.borderR};
//     border-bottom:${props => props.borderB};
//     border-left:${props => props.borderL};
//     border-radius: ${props => props.rounded};
//     grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
//     grid-template-rows: ${props => `repeat(${props.rows}, 1fr)`};
//     grid-row-gap: ${props => props.rowGap};
//     grid-column-gap: ${props => props.colGap};
//     gap: ${props => props.gap};
// `;

export const GridItem = styled.div`
    position: ${props => props.position};
    width: ${props => props.w};
    height: ${props => props.h};
    margin: ${props => props.m};
    padding: ${props => props.p};
    color: ${props => props.color};
    background-color: ${props => props.bg};
    border: ${props => props.border};
    border-top:${props => props.borderT};
    border-right:${props => props.borderR};
    border-bottom:${props => props.borderB};
    border-left:${props => props.borderL};
    border-radius: ${props => props.rounded};
    grid-column: ${props => `span ${props.colSpan}`};
    grid-row: ${props => `span ${props.rowSpan}`};
`;


export const Flex = styled.div`
    position: ${props => props.position};
    display: flex;
    align-items: ${props => props.items};
    justify-content: ${props => props.justify};
    width: ${props => props.w};
    height: ${props => props.h};
    margin: ${props => props.m};
    padding: ${props => props.p};
    color: ${props => props.color};
    background-color: ${props => props.bg};
    border: ${props => props.border};
    border-top:${props => props.borderT};
    border-right:${props => props.borderR};
    border-bottom:${props => props.borderB};
    border-left:${props => props.borderL};
    border-radius: ${props => props.rounded};
    flex-direction: ${props => props.dir};
    flex-grow: ${props => props.grow};
    flex-shrink: ${props => props.shrink};
    flex-wrap: ${props => props.wrap};
    gap: ${props => props.gap};
`;