import React, { ReactNode } from 'react';
import VirtualList from 'react-tiny-virtual-list';

const DefaultItemHeight = 45;

interface SelectFieldVirtualMenuListProps {
  options: any[],
  children: ReactNode | ReactNode[],
  maxHeight: number,
  getValue: () => any,
}

class SelectFieldVirtualMenuList extends React.Component<SelectFieldVirtualMenuListProps, {}> {
  renderItem = (props: any) => {
    const { children } = this.props;
    if (Array.isArray(children)) {
      return (
        <li style={props.style} key={props.index}>
          {children[props.index]}
        </li>
      );
    }
    if (children) {
      return (
        <li
          key={props.index}
          className="react-virtualized-menu-placeholder"
        >
          {/* @ts-ignore */}
          {children.props.children}
        </li>
      );
    }
    return null;
  }

  render() {
    const {
      options, children, maxHeight, getValue,
    } = this.props;

    const [value] = getValue();
    const initialOffset = options.indexOf(value) * DefaultItemHeight;
    const childrenOptions = React.Children.toArray(children);
    const wrapperHeight = maxHeight < childrenOptions.length * DefaultItemHeight
      ? maxHeight : childrenOptions.length * DefaultItemHeight;

    return (
      <span className="react-virtualized-list-wrapper">
        <VirtualList
          width="100%"
          height={wrapperHeight + 6}
          scrollOffset={initialOffset}
          itemCount={childrenOptions.length}
          itemSize={DefaultItemHeight}
          renderItem={this.renderItem}
        />
      </span>
    );
  }
}
export default SelectFieldVirtualMenuList;
