"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { db, storage } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

const Uploadpage = () => {
  const { user } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  // アップロードした画像をプレビューする
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!user) return; // ユーザがログインしているか確認
      const userId = user.uid;

      // Storageに保存
      let imageUrl = "";
      if (selectedImage) {
        const imageRef = ref(storage, `present_images/${userId}/${Date.now()}`); // 画像の保存先
        await uploadString(imageRef, selectedImage, "data_url"); // 画像をアップロード
        imageUrl = await getDownloadURL(imageRef); // 画像のURLを取得
      }

      // Firestore Databaseに保存
      const docRef = await addDoc(
        collection(db, "users", userId, "registrations"),
        {
          title: title, // タイトル
          bio: bio, // 説明
          date: date, // 日付
          imageUrl: imageUrl, // 画像のURL
          createdAt: new Date(), // 登録日時
        }
      );

      alert("登録完了");
      setTitle("");
      setBio("");
      setDate("");
      setSelectedImage(null);
      router.push("/list");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex justify-evenly relative w-full h-screen items-center">
      <div className="w-[30rem] h-[30rem] mt-20 border-dashed border-2 border-black flex items-center justify-center">
        {selectedImage ? (
          // 画像が選択されている場合はプレビューを表示
          <img
            src={selectedImage}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          <label className="cursor-pointer w-full h-full flex items-center justify-center">
            <span>クリックして写真をインポート</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>
      <div className="bg-slate-500 h-3/4 w-2/5 mt-20 p-5 rounded-2xl">
        <div className="mt-5">
          <p className="text-white text-xl">タイトル</p>
          <input
            type="text"
            placeholder="タイトルを入力してください"
            className="w-full p-2 mt-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-8">
          <p className="text-white text-xl">説明</p>
          <textarea
            rows={5}
            placeholder="説明を入力してください"
            className="w-full p-2 mt-2 border rounded resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="mt-8">
          <p className="text-white text-xl">日付</p>
          <input
            type="date"
            className="w-full p-2 mt-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white text-xl w-28 h-12 py-2 px-4 rounded hover:bg-blue-700"
          >
            登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default Uploadpage;
