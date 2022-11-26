import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import Pagination from "./Pagination";
import TableRow from "./TableRow";
import { useUserShorties } from "../helper/hooks/useShorties";

const ShortiesTable: React.FC = () => {
  const { userInfo, shorties, setShorties } = useUserShorties();
  const [shortyPerPage, setShortyPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * shortyPerPage;
  const firstPostIndex = lastPostIndex - shortyPerPage;

  const onDeleteAllShorties = () => {
    if (shorties.length === 0) {
      toast.error("You do not have any shorty!");
      return;
    }
    if (userInfo === null) return;

    const ownerName = userInfo.name;

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

  const paginatedShorties = shorties.slice(firstPostIndex, lastPostIndex);

  // effect for checking if the current page's shorties is equal to 0,
  // if yes, decrement the current page number to show the other shorties.
  useEffect(() => {
    if (shorties.length === 0) return;

    if (paginatedShorties.length === 0)
      setCurrentPage((prevPage) => prevPage - 1);
  }, [paginatedShorties, shorties.length]);

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
            <TableRow
              key={data.id}
              data={data}
              setShorties={setShorties}
              userInfo={userInfo}
            />
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
