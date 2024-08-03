import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
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
              <Link href="/" className="text-gray-700">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/upload" className="text-gray-700">
                登録
              </Link>
            </li>
            <li>
              <Link href="/list" className="text-gray-700">
                一覧
              </Link>
            </li>
            <li>
              <Link href="/logout" className="text-gray-700">
                ログアウト
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
