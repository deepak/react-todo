import React, { PropTypes } from 'react';

const Link = ({ active, children, onClick }) => {
  return (
    <li>
      <a href="#"
        onClick={e => {
            e.preventDefault();
            onClick();
          }}
        className={active ? "selected" : "not-selected"}
      >
        {children}
      </a>
    </li>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
