import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken,
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

// FIREBASE_APPCHECK_DEBUG_TOKENの型定義
declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

if (typeof document !== "undefined") {
  // 1.デバック環境用設定
  if (process.env.NODE_ENV === "development") {
    window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true; // デバッグ用文字列の生成
  }
  // 2.AppCheck 初期化
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      process.env.NEXT_PUBLIC__RECAPTCHA_SITEKEY as string
    ),
    isTokenAutoRefreshEnabled: true,
  });
  // 3.AppCheck結果 ＆ トークン確認
  getToken(appCheck)
    .then(() => {
      console.log("AppCheck:Success");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
