import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconTrash } from "@tabler/icons";
import { toast } from "react-hot-toast";

import IShorty from "../interfaces/IShorty";
import Pagination from "./Pagination";

const ShortiesTable: React.FC = () => {
  const [shorties, setShorties] = useState<IShorty[]>([]);
  const [shortyPerPage, setShortyPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const userInfo = sessionStorage.getItem("userInfo");
  const lastPostIndex = currentPage * shortyPerPage;
  const firstPostIndex = lastPostIndex - shortyPerPage;

  const onDeleteAllShorties = () => {
    if (shorties.length === 0) {
      toast.error("You do not have any shorty!");
      return;
    }
    if (userInfo === null) return;

    const ownerName = JSON.parse(userInfo).name;

    const response = axios.delete(
      `/api/delete/shorties?ownerName=${ownerName}`
    );

    toast.promise(response, {
      error: "Something went wrong!",
      loading: "Syncing!",
      success: "Synced!",
    });

    setShorties([]);
  };

  const fetchUserShorties = async () => {
    const userSessionInfo = sessionStorage.getItem("userInfo");
    if (userSessionInfo === null) return;

    const response = await axios.get("/api/shorties", {
      params: {
        id: JSON.parse(userSessionInfo).id,
      },
    });
    setShorties(response.data.shorties);
  };

  useEffect(() => {
    fetchUserShorties();
  }, []);

  const paginatedShorties = shorties.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    if (shorties.length === 0) return;

    if (paginatedShorties.length === 0)
      setCurrentPage((prevPage) => prevPage - 1);
  }, [paginatedShorties]);

  return (
    <div className="p-5 overflow-x-auto w-full">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-center">Long Link</th>
            <th className="text-center">Shorty</th>
            <th className="text-center">
              <button className="btn btn-error" onClick={onDeleteAllShorties}>
                Delete All
              </button>
              <section className="tooltip" data-tip="Shorties per page">
                <select
                  className="ml-3 select max-w-xs"
                  onChange={(e) => {
                    if (currentPage !== 1) setCurrentPage(1);
                    setShortyPerPage(Number(e.target.value));
                  }}
                  defaultValue={5}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </select>
              </section>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedShorties.map((data) => (
            <tr key={data.id}>
              <td>
                <article className="flex items-center space-x-3">
                  <section className="avatar">
                    <section className="mask mask-squircle w-12 h-12">
                      <img
                        src="https://i.pinimg.com/736x/3a/64/69/3a6469083e633a02f132c2dea8538e8f.jpg"
                        alt="Anime character sleeping"
                      />
                    </section>
                  </section>
                  <article>
                    <section className="font-bold">
                      {userInfo && JSON.parse(userInfo).name}
                    </section>
                    <section className="text-sm opacity-50">
                      Somewhere
                    </section>
                  </article>
                </article>
              </td>
              <td className="max-w-xs overflow-x-auto">{data.key}</td>
              <td
                className="cursor-pointer transition-all delay-50 hover:bg-gray-300"
                onClick={async () => {
                  await navigator.clipboard.writeText(data.value);
                  toast.success("Copied Successfully!");
                }}
              >
                {data.value}
              </td>
              <th className="text-center">
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    setShorties((prevShorties) =>
                      prevShorties.filter((shorty) => shorty.id !== data.id)
                    );

                    const response = axios.delete(`/api/delete/${data.id}`);
                    toast.promise(response, {
                      error: "Something went wrong!",
                      loading: "Syncing!",
                      success: "Synced!",
                    });
                  }}
                >
                  <IconTrash />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
        {/* only show footer when there is at-least 1 row */}
        {shorties.length === 0 ? null : (
          <tfoot>
            <tr>
              <th>Name</th>
              <th className="text-center">Long Link</th>
              <th className="text-center">Shorty</th>
              <th className="text-center">
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  shortyPerPage={shortyPerPage}
                  totalShorties={shorties.length}
                />
              </th>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default ShortiesTable;
