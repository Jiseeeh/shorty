import React, { useState, useEffect } from "react";

import IShorty from "../interfaces/IShorty";
import syncSessionStorage from "../helper/syncSessionStorage";
import { IconTrash } from "@tabler/icons";

const ShortiesTable: React.FC = () => {
  const [shorties, setShorties] = useState<IShorty[]>([]);

  useEffect(() => {
    const userSessionStorage = sessionStorage.getItem("shorties");

    if (userSessionStorage === "[]") return;
    if (userSessionStorage !== null) {
      // only set shorties if it's empty
      if (shorties.length === 0) setShorties(JSON.parse(userSessionStorage));
    }
  }, [shorties]);

  return (
    <div className="p-5 overflow-x-auto w-full">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-center">Long Link</th>
            <th className="text-center">Shorty</th>
            <th>
              <button className="btn btn-error">Delete All</button>
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
              <td>{data.key}</td>
              <td>{data.shorty}</td>
              <th>
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
