import React from "react";
import { IconType } from "react-icons";

interface MyIconProps {
  component: IconType;
  size?: number;
  textColor?: string;
  bgColor?: string;
  padding?: number;
}

const MyIcon = ({
  component: IconComponent,
  size = 70,
  textColor = "text-gray-600",
  bgColor = "bg-transparent",
  padding = 3,
}: MyIconProps) => {
  return (
    <IconComponent
      size={size}
      className={` ${textColor} ${bgColor} p-${padding} rounded-full `}
    />
  );
};

export default MyIcon;
