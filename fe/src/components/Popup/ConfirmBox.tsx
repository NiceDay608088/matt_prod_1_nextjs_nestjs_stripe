import React from "react";

interface PropType {
  children: React.ReactNode;
  visibility: boolean;
}

const ConfirmBox = ({ children, visibility }: PropType) => {
  return (
    <div
      className={`absolute inset-0 bg-opacity-60 bg-gray-100  flex justify-center items-center ${
        visibility ? "block" : "hidden"
      }`}
    >
      <div className="px-10 py-5 flex opacity-100 bg-white z-50 border-red-500 border text-lg">
        {children}
      </div>
    </div>
  );
};

export default ConfirmBox;
