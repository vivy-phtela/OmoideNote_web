"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { db, storage } from "@/firebaseConfig";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";

const Uploadpage = () => {
  const { user } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  // アップロードした画像をプレビュー
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
      let imageURL = "";
      if (selectedImage) {
        const imageRef = ref(storage, `present_images/${userId}/${Date.now()}`);
        await uploadString(imageRef, selectedImage, "data_url");
        imageURL = await getDownloadURL(imageRef);
      }

      // Firestoreに保存
      const docRef = await addDoc(
        collection(db, "users", userId, "registrations"),
        {
          title: title,
          bio: bio,
          date: Timestamp.fromDate(new Date(date)), // 日付(Timestamp型)
          imageURL: imageURL,
        }
      );

      await updateDoc(docRef, {
        id: docRef.id,
      });

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
    <div className="min-h-[calc(100vh-80px)] mt-20 px-3 sm:px-10 py-3 upload:flex upload:justify-evenly upload:items-center w-full">
      <div className="hidden upload:flex items-center justify-center relative w-1/3 aspect-[4/3] rounded-xl overflow-hidden border-dashed border-2 border-gray-800">
        {selectedImage ? (
          <>
            <img
              src={selectedImage}
              alt="Uploaded"
              className="w-full h-full object-contain object-center"
            />
            <label className="absolute top-0 left-0 w-full h-full cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 text-white">
              <span>クリックして写真を再インポート</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </>
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
      <div className="flex flex-col bg-slate-500 w-full upload:w-2/3 upload:ml-6 p-5 rounded-2xl items-center">
        <div className="upload:hidden flex items-center justify-center relative w-[80%] aspect-[4/3] rounded-xl overflow-hidden border-dashed border-2 border-gray-400">
          {selectedImage ? (
            <>
              <img
                src={selectedImage}
                alt="Uploaded"
                className="w-full h-full object-contain object-center"
              />
              <label className="absolute top-0 left-0 w-full h-full cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 text-white">
                <span>クリックして写真を再インポート</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </>
          ) : (
            <label className="cursor-pointer w-full h-full flex items-center justify-center">
              <span className="text-gray-200">
                クリックして写真をインポート
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
        <div className="mt-5 w-full">
          <p className="text-white text-xl">タイトル</p>
          <input
            type="text"
            placeholder="タイトルを入力してください"
            className="w-full p-2 mt-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-8 w-full">
          <p className="text-white text-xl">説明</p>
          <textarea
            rows={5}
            placeholder="説明を入力してください"
            className="w-full p-2 mt-2 border rounded resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="mt-8 w-full">
          <p className="text-white text-xl">日付</p>
          <input
            type="date"
            className="w-full p-2 mt-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mt-8 w-full flex justify-center">
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
