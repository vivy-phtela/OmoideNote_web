"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebaseConfig";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type Registration = {
  id: string;
  title: string;
  imageURL: string;
  date: Timestamp;
  memo: string;
};

const Listpage = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

        // dateによって並び替え
        data.sort(
          (a, b) => b.date.toDate().getTime() - a.date.toDate().getTime()
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
    <div className="w-full p-6">
      <div className="flex justify-evenly flex-wrap gap-2 w-full">
        {currentItems.map((item) => (
          <Card key={item.id} className="relative w-72 mb-5 overflow-hidden transform transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <Link href={`/edit/${item.id}`} className="w-full">
              <CardContent className="relative w-full h-[216px] border-b">
                <Image
                  src={item.imageURL}
                  alt={item.title}
                  fill
                  className="object-contain object-center"
                />
              </CardContent>      
              <CardFooter >
                <h2 className="text-xl font-bold mb-3">{item.title}</h2>
                <p className="text-right">{item.date.toDate().toLocaleDateString()}</p> {/* 日付を表示 */}
              </CardFooter>        
            </Link>
          </Card>
        ))}
      </div>
      <div className="flex justify-end">
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-3"
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
