"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { db, storage } from "@/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { useAppContext } from "@/context/AppContext";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";

const EditPage = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [date, setDate] = useState("");
  const [imageURL, setImageUrl] = useState("");
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
          setDate(data.date?.toDate().toISOString().substr(0, 10) || ""); // タイムスタンプをISO形式の日付文字列に変換
          setImageUrl(data.imageURL || "");
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

      // 新しい画像がある場合はStorageにアップロード
      let uploadedImageUrl = imageURL;
      if (newImage) {
        const storageRef = ref(
          storage,
          `present_images/${userId}/${Date.now()}`
        );
        await uploadBytes(storageRef, newImage);
        uploadedImageUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(docRef, {
        title,
        bio,
        date: Timestamp.fromDate(new Date(date)), // 日付(Timestamp型)
        imageURL: uploadedImageUrl,
      });

      alert("更新が完了しました");
      router.push("/list");
    }
  };

  const handleDelete = async () => {
    if (user && id) {
      const userId = user.uid;
      const docRef = doc(db, "users", userId, "registrations", id);

      // Storageから画像を削除
      if (imageURL) {
        const imageRef = ref(storage, imageURL);
        await deleteObject(imageRef)
          .then(() => {
            console.log("画像が削除されました");
          })
          .catch((error) => {
            console.error("画像の削除に失敗しました:", error);
          });
      }

      // Firestoreからドキュメントを削除
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
    <div className="min-h-[calc(100vh-80px)] mt-20 px-3 sm:px-10 pb-3 upload:flex upload:justify-evenly upload:items-center w-full">
      <div className="hidden upload:flex items-center justify-center relative w-1/3 aspect-[4/3] rounded-xl overflow-hidden border-dashed border-2 border-gray-200">
        {imageURL ? (
          <>
            <img
              src={imageURL}
              alt="登録された画像"
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
      <div className="flex flex-col bg-slate-500 w-full h-3/4 upload:w-2/3 upload:ml-6 p-5 mt-3 rounded-2xl items-center">
        <div className="upload:hidden flex items-center justify-center relative w-[80%] aspect-[4/3] rounded-xl overflow-hidden border-dashed border-2 border-gray-400">
          {imageURL ? (
            <>
              <img
                src={imageURL}
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
        <div className="flex justify-between mt-8 w-full">
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
