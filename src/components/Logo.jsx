import React from "react";
import image from "/Users/DELL G15/OneDrive/Desktop/vscode/webdev/Blog-site/src/assets/image.png";
function Logo({ width = "150px" }) {
    return (
        <div className="logo" style={{ width }}>
            <img src={image} alt="Logo" style={{ width: "100%" }} />
        </div>
    );
}

export default Logo;