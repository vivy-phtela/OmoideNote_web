import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        {/* アイコン郡 */}
        <div className="flex justify-center mb-4 space-x-8">
          <a href="https://twitter.com">
            <FaSquareXTwitter size={36} />
          </a>
          <a href="https://facebook.com">
            <FaSquareFacebook size={36} />
          </a>
          <a href="https://instagram.com">
            <FaSquareInstagram size={36} />
          </a>
        </div>

        {/* リンク一覧 */}
        <div className="flex flex-wrap justify-center space-x-6 gap-y-3 text-gray-600 mb-4 text-center text-xs">
          <Link href="/about">思い出ノートとは</Link>
          <Link href="/faq">よくあるご質問</Link>
          <Link href="/contact">お問い合わせ</Link>
          <Link href="/guide">ご利用ガイド</Link>
          <Link href="/terms">利用規約</Link>
          <Link href="/privacy">プライバシーポリシー</Link>
          <Link href="/law">特商法による表記</Link>
        </div>

        {/* 著作権表示 */}
        <div className="text-center text-gray-500">
          <p>© 2024 AITOTO</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
