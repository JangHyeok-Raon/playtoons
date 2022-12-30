import React from 'react';

export default function EmptyDiv(props) {
  const {text, className} = props;

  return (
    <div className={`${className}`}>
      <div className={`empty_text`}>
        {text}
      </div>
    </div>
  )
}
