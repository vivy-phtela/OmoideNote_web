"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { auth } from "@/firebaseConfig";

const Header = () => {
  const { user, userid } = useAppContext();

  // ログアウト
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header className="flex bg-slate-50 fixed top-0 left-0 w-full h-20 z-50">
      {/*  */}
      <div className="flex items-center">
        <div className="flex w-16 h-16 mx-10 items-center justify-center">
          <Image
            src="/logo.png"
            alt="Omoide Note Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <nav>
          <ul className="flex gap-10 text-lg">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:bg-blue-100 duration-300"
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href="/upload"
                className="text-gray-700 hover:bg-blue-100 duration-300"
              >
                登録
              </Link>
            </li>
            <li>
              <Link
                href="/list"
                className="text-gray-700 hover:bg-blue-100 duration-300"
              >
                一覧
              </Link>
            </li>
            <li>
              <div
                onClick={handleLogout}
                className="text-gray-700 hover:bg-blue-100 duration-300"
              >
                <span>ログアウト</span>
              </div>
            </li>
            <li>
              {user && (
                // ログインしている場合はユーザー情報を表示
                <div>ようこそ {user.email}さん</div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
