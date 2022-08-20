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
    marginLeft: "15px",
    marginTop: "3px",
    fontWeight: "bold"
}

const NavigationBar = () => {
    const { linkedData } = useSelector((state => state.linkEditor))
    return (
        <Nav>
            <NavMenu>
                <NavLink style={{ padding: '0 25px' }} to='/'>LEA</NavLink>
                <NavLink to='/links' > Links <span style={spanStyle}>{linkedData?.length}</span> </NavLink>
                <NavLink to='/linkTypes' > Link Types <span style={{ ...spanStyle, marginLeft: '10px' }}>0</span></NavLink>
                <NavLink to='/sources' >Sources</NavLink>
                <NavLink to='/targets' >Targets</NavLink>
            </NavMenu>
        </Nav>
    );
};

export default NavigationBar;