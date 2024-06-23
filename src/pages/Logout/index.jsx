import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/login");
  });

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;
