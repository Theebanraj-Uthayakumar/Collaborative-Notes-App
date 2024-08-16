import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../service/user.service";
import { getUserDetails } from "../../shared/utils/helpers";
import { UserDetails } from "../../shared/interfaces";
import { useDispatch } from "react-redux";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    dispatch({ type: 'LOGOUT' });
    navigate("/signin");
  };

  const userDetails: UserDetails = getUserDetails();

  return (
    <Nav>
      <Logo>
        <Link to="/">Bevolv</Link>
      </Logo>
      <Profile>
        <ProfileName onClick={toggleDropdown}>
          {userDetails?.username} <span>&#x25BC;</span>
        </ProfileName>
        {dropdownOpen && (
          <Dropdown>
            <DropdownItem>
              <Link to="/profile">Profile</Link>
            </DropdownItem>
            <DropdownItem>
              <div onClick={handleLogout}>Logout</div>
            </DropdownItem>
          </Dropdown>
        )}
      </Profile>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  background-color: #333;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const Profile = styled.div`
  position: relative;
  cursor: pointer;
`;

const ProfileName = styled.div`
  font-size: 1rem;
  span {
    margin-left: 5px;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  color: #333;
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
`;

const DropdownItem = styled.li`
  margin: 5px 0;
  a {
    color: #333;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Navbar;
