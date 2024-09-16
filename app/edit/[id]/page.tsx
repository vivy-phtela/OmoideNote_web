"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAppContext } from "@/context/AppContext";

const EditPage = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (user && id) {
      const fetchData = async () => {
        const userId = user.uid;
        const docRef = doc(db, "users", userId, "registrations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setMemo(data.memo || "");
          setDate(data.date || "");
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

      await updateDoc(docRef, {
        title,
        memo,
        date,
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

  return (
    <div className="flex flex-col items-center p-6 mt-20 h-full">
      <div className="w-full max-w-lg">
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
          <p className="text-xl">メモ</p>
          <textarea
            rows={5}
            placeholder="メモを入力してください"
            className="w-full p-2 mt-2 border rounded"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
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
