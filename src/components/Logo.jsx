import React from "react";
import image from "../assets/image.png";
function Logo({ width = "150px" }) {
    return (
        <div className="logo" style={{ width }}>
            <img src={image} alt="Logo" style={{ width: "100%" }} />
        </div>
    );
}

export default Logo;