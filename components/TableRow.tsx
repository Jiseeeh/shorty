import React from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IconTrash } from "@tabler/icons";

import IShorty from "../interfaces/IShorty";
import IUser from "../interfaces/IUser";
import pfp from "../public/pfp.webp";

interface TableRowProps {
  data: IShorty;
  setShorties: React.Dispatch<React.SetStateAction<IShorty[]>>;
  userInfo: IUser | null;
}

const TableRow: React.FC<TableRowProps> = ({ data, userInfo, setShorties }) => {
  return (
    <tr>
      <td>
        <article className="flex items-center space-x-3">
          <section className="avatar">
            <section className="mask mask-squircle w-12 h-12">
              <Image src={pfp} alt="Anime character sleeping" priority />
            </section>
          </section>
          <article>
            <section className="font-bold">{userInfo && userInfo.name}</section>
            <section className="text-sm opacity-50">Somewhere</section>
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
  );
};

export default TableRow;
