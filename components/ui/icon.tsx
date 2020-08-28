import React from 'react';

interface Icon extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  icon: string
}

export default function Icon(props: Icon): JSX.Element {
  const path = '/static/icons/';
  const { icon, className, ...elementProps } = props;

  const fullClass = `icon ${className}`;

  return (
    <img
      className={fullClass}
      src={`${path}${icon}.svg`}
      alt=''
      {...elementProps}
    />
  );
}
