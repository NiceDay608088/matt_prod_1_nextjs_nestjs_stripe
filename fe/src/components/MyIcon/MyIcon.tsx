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
  size = 50,
  textColor = "text-gray-600",
  bgColor = "bg-transparent",
  padding = 3,
}: MyIconProps) => {
  return (
    <div className={`p-${padding} rounded-full ${textColor} ${bgColor}`}>
      <IconComponent size={size} />
    </div>
  );
};

export default MyIcon;
