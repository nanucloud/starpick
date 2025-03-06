import React from "react";
import Logo from "../../assets/logos/logo_RX_WHITE.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-indigo-100 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <img src={Logo} alt="StarPick Limited" className="h-20" />
        </div>

        <div className="text-gray-700 text-sm text-center md:text-right">
          <p>스타픽 리미티드 | StarPick Limited</p>
          <p>대표 : 이동현 , 고객센터 : service@starpick</p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} StarPick Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
