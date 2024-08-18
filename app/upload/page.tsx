"use client"; //クライアント側の定義

import React, { useState } from "react";

const Uploadpage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); //画像選択state

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //ファイル選択時
    const file = event.target.files?.[0]; //ユーザが選択したファイルリストをfileに格納
    if (file) {
      const reader = new FileReader(); //FireRenderでファイル読み込み
      reader.onload = () => {
        //読み込みが完了したときの関数
        setSelectedImage(reader.result as string); //画像選択stateにセット
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    //クリックされた時の処理を追加
    alert("登録完了");
  };

  return (
    <div className="flex justify-center relative w-full h-screen bg-white">
      <div className="w-96 h-96 mt-60 mr-10 border-dashed border-2 border-black flex items-center justify-center">
        {selectedImage ? ( //データがあるか確認
          <img
            src={selectedImage}
            alt="Uploaded"
            className="w-full h-full object-cover"
          /> //データがある場合の処理
        ) : (
          //データがない場合の処理
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
      <div className="bg-slate-500 h-3/4 w-2/5 mt-36 ml-10 p-5 rounded">
        <div className="mt-5">
          <p className="text-white text-xl">タイトル</p>
          <input
            type="text"
            placeholder="タイトルを入力してください"
            className="w-full p-2 mt-2 border rounded"
          />
        </div>
        <div className="mt-10">
          <p className="text-white text-xl">メモ</p>
          <textarea
            rows={5}
            placeholder="メモを入力してください"
            className="w-full p-2 mt-2 border rounded"
          />
        </div>
        <div className="mt-10">
          <p className="text-white text-xl">日付</p>
          <input type="date" className="w-full p-2 mt-2 border rounded" />
        </div>
        <div className="mt-16 flex justify-center">
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
