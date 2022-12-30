import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBarItem(props) {
  const { icon, selectedIcon, text, onClick, path : myPath } = props;
  const [isSelected, setSelected] = useState(false);
  const location = useLocation();
  

  const handleClick = (e) => {
    if( isSelected === true ){
      return;
    }

    setSelected(!isSelected);
    onClick?.(e);
  };

  useEffect(() => {
    if( location.pathname.startsWith(myPath) ){
      setSelected(true);
    }
  }, [location]);
  

  return (
    <li className={`${isSelected && "on "}s1`} onClick={handleClick}>
      <Link className="pointer" to={myPath}>
        <span className="ico">
          <FontAwesomeIcon 
            icon={isSelected ? selectedIcon : icon} />
        </span>
        <span>
          {text}
        </span>
      </Link>
    </li>
  );
}


