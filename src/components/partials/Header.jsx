import React from "react";
import FtcLogoHeader from "../../assets/svg/FtcLogoHeader";
import { StoreContext } from "../../../store/StoreContext";
import ModalSuccess from "./modal/ModalSuccess";

const Header = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  console.log(store.message, store.error, store.success);
  return (
    <>
      <div className="flex items-center justify-between h-16 border-solid border-b-2 border-black px-2">
        <div>
          <FtcLogoHeader />
        </div>

        <div>
          <div className="rounded-full bg-[#3E9BD0] h-8 w-8 flex items-center justify-center text-white">
            <span className="block">P</span>
            <span className="block">C</span>
          </div>
        </div>
      </div>

      {store.success && <ModalSuccess />}
    </>
  );
};

export default Header;
