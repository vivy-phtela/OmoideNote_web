"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";

// コンテキストの型定義
type AppContextType = {
  user: User | null;
  userid: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isOnHomePage: boolean;
  setIsOnHomePage: React.Dispatch<React.SetStateAction<boolean>>;
};

// コンテキストの初期値
const defaultContextData = {
  user: null,
  userid: null,
  setUser: () => {},
  isOnHomePage: false,
  setIsOnHomePage: () => {},
};

// コンテキストの作成
const AppContext = createContext<AppContextType>(defaultContextData);

// コンテキストのプロバイダー作成
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // 提供したいデータの定義
  const [user, setUser] = useState<User | null>(null);
  const [userid, setUserId] = useState<string | null>(null);
  const [isOnHomePage, setIsOnHomePage] = useState<boolean>(false); // ページ情報の管理

  const router = useRouter();

  useEffect(() => {
    // ログイン状態を監視
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser); // ユーザー情報をセット
      setUserId(newUser ? newUser.uid : null); // ユーザ情報があればuidをセットし，なければnullをセット
      if (!newUser) {
        // ユーザー情報がなければ/にリダイレクト
        router.push("/");
      }
    });
    // クリーンアップ関数→監視を解除する
    return () => {
      unsubscribe();
    };
  }, []);

  // プロバイダーを作成し，コンテキストを提供
  return (
    <AppContext.Provider value={{ user, userid, setUser, isOnHomePage, setIsOnHomePage }}>
      {children}
    </AppContext.Provider>
  );
};

// コンテキストを受け取るメソッドを作成
export const useAppContext = () => useContext(AppContext);
