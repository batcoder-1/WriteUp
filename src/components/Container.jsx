import React from "react";
function Container({ children }) {// we are placing all the children inside the container so whenever we want to change anything in it, we can do it in one place.
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {children}
    </div>
  );
}
export default Container;
