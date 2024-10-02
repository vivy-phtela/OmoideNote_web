"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { auth } from "@/firebaseConfig";

const Header = () => {
  const { user, isOnHomePage } = useAppContext();
  const [loading, setLoading] = useState(true);

  // ログアウト
  const handleLogout = () => {
    auth.signOut();
  };

  useEffect(() => {
    if (user !== null) {
      setLoading(false); // 認証情報が取得されたらローディングを解除
    }
  }, [user]);

  if (loading && !isOnHomePage) {
    // 認証情報の取得中はローディング表示
    return (
      <header className="flex bg-white fixed top-0 left-0 w-full h-20 z-50 border-b-2 border-gray-200">
        <div className="flex items-center">
          <div className="flex items-center justify-center px-5">
            <Link href={user ? "/home" : "/"}>
              <Image
                src="/mainLogo.png"
                alt="Omoide Note Logo"
                width={130}
                height={130}
                priority
                style={{ width: "auto", height: "auto" }} // アスペクト比を維持
              />
            </Link>
          </div>
          <nav>
            <ul className="flex gap-10 text-lg">
              <li>
                <div className="text-gray-700">Loading...</div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="flex bg-white fixed top-0 left-0 w-full h-20 z-50 border-b-2 border-gray-200">
      <div className="flex items-center">
        <div className="flex items-center justify-center px-5">
          <Link href={user ? "/home" : "/"}>
            <Image
              src="/mainLogo.png"
              alt="Omoide Note Logo"
              width={130}
              height={130}
              priority
              style={{ width: "auto", height: "auto" }} // アスペクト比を維持
            />
          </Link>
        </div>
        <nav>
          <ul className="flex gap-10 text-lg">
            {user && (
              <>
                <li>
                  <Link
                    href="/home"
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
                    className="cursor-pointer text-gray-700 hover:bg-blue-100 duration-300"
                  >
                    <span>ログアウト</span>
                  </div>
                </li>
                <li>
                  <div>
                    ようこそ <span className="text-red-500">{user.email}</span>
                    さん
                  </div>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link
                    href="/auth/register"
                    className="text-gray-700 hover:bg-blue-100 duration-300"
                  >
                    新規登録
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:bg-blue-100 duration-300"
                  >
                    ログイン
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
