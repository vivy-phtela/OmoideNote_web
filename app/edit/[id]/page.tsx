"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { db, storage } from "@/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAppContext } from "@/context/AppContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

const EditPage = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // 画像URLの状態
  const [newImage, setNewImage] = useState<File | null>(null); // 新しい画像の状態

  useEffect(() => {
    if (user && id) {
      const fetchData = async () => {
        const userId = user.uid;
        const docRef = doc(db, "users", userId, "registrations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setBio(data.bio || "");
          setDate(data.date || "");
          setImageUrl(data.imageUrl || ""); // 画像URLを取得
        } else {
          console.log("Document does not exist");
        }
      };
      fetchData();
    }
  }, [user, id]);

  const handleUpdate = async () => {
    if (user && id) {
      const userId = user.uid;
      const docRef = doc(db, "users", userId, "registrations", id);

      // 新しい画像がある場合、Firebase Storageにアップロード
      let uploadedImageUrl = imageUrl;
      if (newImage) {
        const storageRef = ref(storage, `images/${userId}/${newImage.name}`);
        await uploadBytes(storageRef, newImage);
        uploadedImageUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(docRef, {
        title,
        bio,
        date,
        imageUrl: uploadedImageUrl, // 新しい画像URLを更新
      });

      alert("更新が完了しました");
      router.push("/list");
    }
  };

  const handleDelete = async () => {
    if (user && id) {
      const userId = user.uid;
      const docRef = doc(db, "users", userId, "registrations", id);

      await deleteDoc(docRef);

      alert("削除が完了しました");
      router.push("/list");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0])); // プレビューのために画像URLを一時的に設定
    }
  };

  return (
    <div className="flex justify-evenly items-center h-screen px-10">
      <div className="w-1/3">
        <div className="w-full h-64 relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="登録された画像"
              fill
              className="object-cover rounded"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p>画像がありません</p>
            </div>
          )}
        </div>
        <div className="mt-4">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>

      <div className="w-2/3 pl-6">
        <div className="mb-6">
          <p className="text-xl">タイトル</p>
          <input
            type="text"
            placeholder="タイトルを入力してください"
            className="w-full p-2 mt-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <p className="text-xl">説明</p>
          <textarea
            rows={5}
            placeholder="説明を入力してください"
            className="w-full p-2 mt-2 border rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <p className="text-xl">日付</p>
          <input
            type="date"
            className="w-full p-2 mt-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            更新
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
