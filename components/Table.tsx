import React, { useState, useEffect } from "react";
import { JsxElement } from "typescript";

import IShorty from "../interfaces/IShorty";

interface ShortiesTableProps {}

const ShortiesTable: React.FC<ShortiesTableProps> = (props) => {
  const [shorties, setShorties] = useState<IShorty[]>([]);
  const [tableContent, setTableContent] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let sessionShorties = sessionStorage.getItem("shorties");

    if (sessionShorties !== null) {
      setShorties(JSON.parse(sessionShorties));

      setTableContent(
        shorties.map((data) => (
          <tr key={data.id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
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
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        ))
      );
    }
  }, []);

  return (
    <div className="p-5 overflow-x-auto w-full">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Long Link</th>
            <th className="text-center">Shorty</th>
            <th>
              <button className="btn btn-error">Delete</button>
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
        {/* <!-- foot --> */}
        {shorties.length === 0 ? null : (
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Long Link</th>
              <th>Shorty</th>
              <th></th>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default ShortiesTable;
