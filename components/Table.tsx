import React, { useState, useEffect } from "react";
import { IconTrash } from "@tabler/icons";
import { toast } from "react-hot-toast";
import axios from "axios";

import IShorty from "../interfaces/IShorty";
import syncSessionStorage from "../helper/syncSessionStorage";

const ShortiesTable: React.FC = () => {
  const [shorties, setShorties] = useState<IShorty[]>([]);

  const onDeleteAllShorties = () => {
    if (shorties.length === 0) {
      toast.error("You do not have any shorty!");
      return;
    }
    sessionStorage.removeItem("shorties");
    setShorties([]);
  };

  const fetchUserShorties = async () => {
    // try set to local array to prevent too much requests
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
            </th>
          </tr>
        </thead>
        <tbody>
          {shorties.map((data) => (
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
                    <section className="font-bold">Hart Hagerty</section>
                    <section className="text-sm opacity-50">
                      Mount Myōboku
                    </section>
                  </article>
                </article>
              </td>
              <td className="max-w-xs overflow-x-scroll">{data.key}</td>
              <td>{data.value}</td>
              <th className="text-center">
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    setShorties((prevShorties) =>
                      prevShorties.filter((shorty) => {
                        if (shorty.id === data.id) {
                          syncSessionStorage(shorty, "delete");
                          return false;
                        }
                        return true;
                      })
                    );
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
              <th></th>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default ShortiesTable;
