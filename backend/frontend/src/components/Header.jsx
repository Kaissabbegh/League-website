import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { logout } from "../actions/championActions";

export default function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="p-1 mx-3 xl:mx-[400px] bg-[#EBD3F8] rounded-3xl flex justify-between items-center bg-opacity-90">
      <Link to="/">
        <div className="p-10 bg-cover bg-[url(static/logo-nobg.png)] bg-center h-16 w-16 md:h-20 md:w-20" />
      </Link>
      {userInfo ? (
        <Menu
          as="div"
          className="relative inline-block text-left mr-5 rounded-2xl bg-[#2E073F] p-2"
        >
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl px-3 py-2 text-sm font-semibold text-white shadow-sm ">
              Orders
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-white"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#2E073F] shadow-lg ring-1 ring-white/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-white data-[focus]:bg-[#D6BEE3] data-[focus]:text-black data-[focus]:outline-none"
                >
                  Orders
                </Link>
              </MenuItem>

              <MenuItem>
                <button
                  onClick={logoutHandler}
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-white text-sm data-[focus]:bg-[#D6BEE3] data-[focus]:text-black data-[focus]:outline-none"
                >
                  Sign out
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      ) : (
        <Link
          to="/login"
          className="relative inline-block text-left mr-5 rounded-2xl bg-[#2E073F] text-white px-5 py-3"
        >
          Login
        </Link>
      )}
    </div>
  );
}
