import React from "react";
import { useDispatch } from "react-redux";
import List from "../../common/List/List";
import { logoutUserRequest } from "../../redux/sagas/auth";
import styles from './Sidebar.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const sidebarMenuItems = [
  { label: "menu1", icon: "icon" },
  { label: "menu2", icon: "icon" },
  { label: "menu3", icon: "icon" },
  { label: "menu4", icon: "icon" },
];
const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer)
  const logoutHandler = () => {
    dispatch(logoutUserRequest());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  return (
    <div className={styles.sidebar}>
      <List listItems={sidebarMenuItems} />
      <span
        onClick={logoutHandler}
        style={{ cursor: "pointer", fontSize: "1em" }}
      >
        {user.email}
        <FontAwesomeIcon icon={faSignOutAlt} />
      </span>
    </div>
  );
};

export default Sidebar;
