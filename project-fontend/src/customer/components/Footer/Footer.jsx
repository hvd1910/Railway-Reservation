import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";



function Footer() {
  return (
    <footer className="bg-white text-center text-neutral-800 dark:bg-neutral-600 dark:text-neutral-100 lg:text-left " style={{background: "rgba(27, 39, 61, 0.99)"}}>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="pl-20">
            <h6
              className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start" style={{color: "#0E9E4D"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-4 w-4">
                <path
                  d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
              RailSwift
            </h6>
            <p style={{color: "#ffffffd9"}}>
              Certificate of Business Registration No. 113642 according to Decision No. 973/QĐ-TTg dated 25 June 2010 of the Prime Minister. Enterprise code: 0100105052, fist registration on 26 July 2010, the fourth registration for change on 27 June 2014 at Hanoi Authority for Planning and Investment.
            </p>
          </div>
          
          <div className="pl-40">
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
            </h6>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200" style={{color:"#ffffffd9"}}>Home</a>
            </p>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200" style={{color:"#ffffffd9"}}>Booking Information</a>
            </p>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200" style={{color:"#ffffffd9"}}>Check Valid Ticket</a>
            </p>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200" style={{color:"#ffffffd9"}}>Terms And Conditions</a>
            </p>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200" style={{color:"#ffffffd9"}}>Contact</a>
            </p>
          </div>
          <div>
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start" style={{color: "#0E9E4D"}}>
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start" style={{color:"#ffffffd9"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5">
                <path
                  d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path
                  d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              Số 8, Tôn Thất Thuyết, Mỹ Đình, Từ Liêm, Hà Nội
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start" style={{color:"#ffffffd9"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5">
                <path
                  d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path
                  d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              railswift@gmail.com
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start" style={{color:"#ffffffd9"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd" />
              </svg>
              + 01 234 567 88
            </p>
            <p className="flex items-center justify-center md:justify-start" style={{color:"#ffffffd9"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z "
                  clipRule="evenodd" />
              </svg>
              + 01 234 567 89
            </p>
          </div>
        </div>
      </div>

      <div className="bg-emerald p-6 pt-1.5 pb-1.5 text-center dark:bg-neutral-700 " style={{background:"rgb(4, 170, 107)"}}>
        <span>© 2024 Copyright : </span>
        <a
          className="font-semibold text-black dark:text-neutral-400"
          href="#">RailSwift</a>
      </div>
    </footer>
  );
}

export default Footer;
