"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

export default function ServiceIntro() {
  const [stage, setStage] = useState("text");
  const message = "人と人をつなぐ";
  const { setIsOnHomePage } = useAppContext();

  useEffect(() => {
    setIsOnHomePage(true);
    return () => setIsOnHomePage(false);
  }, [setIsOnHomePage]);

  useEffect(() => {
    const textTimer = setTimeout(() => setStage("content"), 3000); // 3秒後にコンテンツを表示
    return () => {
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <AnimatePresence>
        {stage === "text" && (
          <motion.div
            key="animated-text"
            className="text-6xl md:text-7xl font-bold text-gray-800 flex"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {message.split("").map((char, index) => (
              <motion.span
                key={`char-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.1,
                      duration: 1.0,
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="max-w-2xl w-full"
          >
            <h1 className="text-7xl text-center mb-12 text-gray-800 font-extrabold">
              Omoide Note
            </h1>
            <div className="space-y-6">
              <ServiceFeature
                title="貰ったプレゼントを記録"
                description="貰ったプレゼントを写真で撮って記録"
              />
              <ServiceFeature
                title="お返しを忘れないための通知"
                description="プレゼントを貰ったらお返しを忘れないように通知"
              />
              <ServiceFeature
                title="AIによる返礼品のおすすめ"
                description="AIがあなたの要望に合わせて返礼品を提案"
              />
            </div>
            <Link href={"/auth/register"}>
              <motion.button
                className="mt-8 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                新規登録
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type ServiceFeatureProps = {
  title: string;
  description: string;
};

function ServiceFeature({ title, description }: ServiceFeatureProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
