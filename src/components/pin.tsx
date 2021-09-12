import React, { ComponentProps } from "react";
import { Rate } from "antd";

interface PinProps extends ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin: React.FC<PinProps> = (props) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...props}
    />
  );
};
