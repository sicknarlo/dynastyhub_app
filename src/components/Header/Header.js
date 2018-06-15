import React from 'react';
import FaBars from 'react-icons/lib/fa/bars';
import PropTypes from 'prop-types';
import { StyledHeader } from './styles';

const Header = ({ toggleSidebar }) => {
  return (
    <StyledHeader>
      <FaBars onClick={toggleSidebar} size={20} style={{ cursor: 'pointer' }} />
    </StyledHeader>
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func
};

export default Header;
