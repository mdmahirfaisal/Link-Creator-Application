import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavLink, NavMenu } from '../styles/NavElements.styles';

const spanStyle = {
    backgroundColor: 'red',
    borderRadius: '20px',
    height: '15px',
    width: "23px",
    color: "white",
    fontSize: '12px',
    textAlign: 'center',
    marginLeft: "20px",
    marginTop: "3px",
    fontWeight: "bold"
}

const NavigationBar = () => {
    const { linkedData } = useSelector((state => state.linkEditor))
    return (
        <Nav>
            <NavMenu>
                <NavLink style={{ padding: '0 40px' }} to='/'>LEA</NavLink>
                <NavLink to='/links' activeStyle> Links <span style={spanStyle}>{linkedData?.length}</span> </NavLink>
                <NavLink to='/linkTypes' activeStyle> Link Types <span style={spanStyle}>42</span></NavLink>
                <NavLink to='/sources' activeStyle>Sources</NavLink>
                <NavLink to='/targets' activeStyle>Targets</NavLink>
            </NavMenu>

            <NavLink style={{ marginRight: '30px' }} to='/'>Log Out</NavLink>
        </Nav>
    );
};

export default NavigationBar;