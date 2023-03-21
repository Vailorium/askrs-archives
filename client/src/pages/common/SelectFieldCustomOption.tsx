/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import { components } from 'react-select';

interface SelectFieldCustomOptionProps {
  innerProps: any,
  children: ReactNode,
}

function SelectFieldCustomOption({ children, ...props }: SelectFieldCustomOptionProps) {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return (
    // @ts-ignore
    <components.Option {...newProps} className="custom-option">
      {children}
    </components.Option>
  );
}
export default SelectFieldCustomOption;
