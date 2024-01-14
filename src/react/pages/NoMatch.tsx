import React from "react";
import { Link } from "react-router-dom";

const NoMatch: React.FC = () => {
  return (
    <div>
      There is nothing here. <Link to="/">Go to the home page</Link>
    </div>
  );
};

export default NoMatch;
