import React from "react";
import PropTypes from "prop-types";

export const ErrorFallback = ({ error }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
);

ErrorFallback.propTypes = {
  error: PropTypes.object
};
