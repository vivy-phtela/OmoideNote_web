"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

type Registration = {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  memo: string;
};

const Listpage = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const userId = user.uid;
        const snapshot = await getDocs(
          collection(db, "users", userId, "registrations")
        );
        const data = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Registration)
        );
        setRegistrations(data);
      };
      fetchData();
    }
  }, [user]);

  const handleClick = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = registrations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 pl-20 mt-20 h-full">
      <div className="grid grid-cols-3 gap-9">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer"
            onClick={() => handleClick(item.id)}
          >
            <div className="w-60 h-60 relative overflow-hidden bg-gray-200">
              <Image
                src={item.imageUrl}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-xl mt-2">{item.title}</h2>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            前のページ
          </button>
        )}
        {indexOfLastItem < registrations.length && (
          <button
            onClick={handleNextPage}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            次のページ
          </button>
        )}
      </div>
    </div>
  );
};

export default Listpage;
