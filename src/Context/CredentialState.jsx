import { useState } from "react";
import CredentialContext from "./CredentialContext";
import PropTypes from "prop-types";

const CredentialState = (props) => {
  const [credentials, setCredentials] = useState({});

  return (
    <CredentialContext.Provider value={{ credentials, setCredentials }}>
      {props.children}
    </CredentialContext.Provider>
  );
};

CredentialState.propTypes = {
  children: PropTypes.node,
};

export default CredentialState;
