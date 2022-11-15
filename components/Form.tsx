import React, { useState } from "react";
import { IconChecks, IconClipboardCopy, IconTrash } from "@tabler/icons";
import axios from "axios";
import toast from "react-hot-toast";

import randomize from "../helper/randomize";
import syncSessionStorage from "../helper/syncSessionStorage";

const Form: React.FC = () => {
  const [formValue, setFormValue] = useState<string>("");

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValue) return;

    const value = randomize();
    const data = {
      key: formValue,
      value,
    };

    const response = await axios.post("/api/create", data);
    syncSessionStorage(response.data, "add");

    await navigator.clipboard.writeText(response.data.shorty);
    toast.success("Written to your clipboard!");
  };

  const onPaste = async () => {
    const userClipboardContent = await navigator.clipboard.readText();
    if (formValue === userClipboardContent) {
      toast.error("Done pasting!");
      return;
    }

    setFormValue(userClipboardContent);
    toast.success("Paste Success!");
  };

  const onDelete = () => {
    if (!formValue) {
      toast.error("Input field is already empty!");
      return;
    }

    setFormValue("");
    toast.success("Delete Success!");
  };

  const onSaveShorties = () => {};

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  return (
    <form className="form-control" onSubmit={onFormSubmit}>
      <h1 className="my-5 text-4xl font-bold text-center">Make it short!</h1>
      <label className="input-group">
        <span>Link</span>
        <input
          type="text"
          placeholder="https://nextjs-setup.jiseeeh.vercel.app/"
          autoFocus
          value={formValue}
          onChange={onInputChange}
          className="input input-bordered"
          pattern="(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
        />
      </label>
      <section className="my-3 flex justify-around">
        <button className="btn hover:btn-success" type="submit">
          <IconChecks />
        </button>
        <button className="btn hover:btn-info" type="button" onClick={onPaste}>
          <IconClipboardCopy />
        </button>
        <button className="btn hover:btn-error" onClick={onDelete}>
          <IconTrash />
        </button>
      </section>
      <button className="btn hover:btn-success" type="button">
        Save my shorties
      </button>
    </form>
  );
};

export default Form;
