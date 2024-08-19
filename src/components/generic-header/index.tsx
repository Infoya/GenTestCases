import React from "react";

const GenericHeader: React.FC = () => {
  return (
    <div className="bg-[#f96304] p-4 flex items-center fixed top-0 left-0 right-0 z-50">
      <img src="homedepot.jpg" alt="logo" className="h-20 w-auto" />
      <div className="text-white p-4">
        <h1 className="text-4xl font-bold">AUTOMATION TEST BOT</h1>
      </div>
    </div>
  );
};

export default GenericHeader;