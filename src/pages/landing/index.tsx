import React from "react";
import { useNavigate } from "react-router-dom";
import { GenericHeader } from "../../components";
import { TYPES_PAGES } from "../../const";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string, params: Record<string, string>) => {
    const searchParams = new URLSearchParams(params).toString();
    navigate(`${path}?${searchParams}`);
  };

  return (
    <div>
      <GenericHeader />
      <div className="flex items-center justify-center h-screen bg-gray-100 pt-24 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-white shadow-lg rounded-lg p-8 flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow duration-200"
            onClick={() =>
              navigateTo("/bot-test", { type: TYPES_PAGES.TEST_SCENARIO })
            }
          >
            <span className="text-4xl font-bold text-[#f96304]">
              Create Test Scenarios
            </span>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg p-8 flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow duration-200"
            onClick={() =>
              navigateTo("/bot-test", { type: TYPES_PAGES.TEST_CASE })
            }
          >
            <span className="text-4xl font-bold text-[#f96304]">
              Create Test Cases
            </span>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg p-8 flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow duration-200"
            onClick={() => navigateTo("/bot-test", { type: TYPES_PAGES.BA })}
          >
            <span className="text-4xl font-bold text-[#f96304]">BA Agent</span>
          </div>
        </div>
        <div className="absolute bottom-3 text-center text-gray-400 text-sm mt-6">
          © 2024 Infoya
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
