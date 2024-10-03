"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { auth } from "@/firebaseConfig";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { FiAlignJustify } from "react-icons/fi";
import { Description } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";


const Header = () => {
  const { user, isOnHomePage } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); 
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

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
        <nav className="hidden md:block">
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
      <div className="md:hidden flex flex-grow justify-end mr-5">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <FiAlignJustify className="h-10 w-10"/>
          </SheetTrigger>
          {user && (
            <SheetContent className="px-0 pt-10">
              <SheetHeader className="mb-3">
                <SheetTitle className="text-center">{user.email}</SheetTitle>
                <Description></Description>
              </SheetHeader>
              <div className="flex flex-col w-full text-center">
                <button onClick={() => handleLinkClick('/home')} className="border-y py-5">
                  ホーム
                </button>
                <button onClick={() => handleLinkClick('/upload')} className="border-b py-5">
                  登録
                </button>
                <button onClick={() => handleLinkClick('/list')} className="border-b py-5">
                  一覧
                </button>
                <button onClick={handleLogout} className="border-b py-5">
                  ログアウト
                </button>
              </div>
            </SheetContent>
          )}
          {!user && (
            <SheetContent className="px-0 pt-10">
              <SheetHeader className="mb-3">
                <SheetTitle className="text-center">Not logged in</SheetTitle>
                <Description></Description>
              </SheetHeader>
              <div className="flex flex-col w-full text-center">
                <button onClick={() => handleLinkClick('/auth/register')} className="border-y py-5">
                  新規登録
                </button>
                <button onClick={() => handleLinkClick('/auth/login')} className="border-b py-5">
                  ログイン
                </button>
              </div>
            </SheetContent>
          )}
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
