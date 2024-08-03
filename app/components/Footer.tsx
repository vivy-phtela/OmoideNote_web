import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex w-full h-96 bg-black justify-evenly items-center text-white">
      <div>
        <h1 className="text-5xl">CONTACT</h1>
        <h1>080-****-**** &nbsp; 平日10:00~18:00</h1>
      </div>
      <div className="w-2/5 h-52 p-3 border border-slate-500">
        <div className="w-5/6 text-center text-xl leading-10 mx-auto">
          <h1>まずはここから</h1>
          <h1>新規会員登録またはログイン</h1>
        </div>
        <div className="flex justify-between items-center w-11/12 h-20 mx-auto mt-3">
          <Link
            href="/auth/register"
            className="text-black h-10 bg-white px-4 py-2 ml-10 rounded-lg"
          >
            新規会員登録
          </Link>
          <Link
            href="/auth/login"
            className="text-black h-10 bg-white px-4 py-2 mr-10 rounded-lg"
          >
            ログイン
          </Link>
        </div>
      </div>
      <div>
        <h1 className="text-2xl mb-4">各種リンク</h1>
        <ul className="leading-10">
          <li>Instagram</li>
          <li>X</li>
          <li>aitoto@gmail.com</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
