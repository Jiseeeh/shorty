import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IconChecks, IconClipboardCopy, IconTrash } from "@tabler/icons";

import randomize from "../helper/randomize";

const ShortyForm: React.FC = () => {
  const [formValue, setFormValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValue) {
      toast.error("Input field is empty!");
      return;
    }

    const userSessionInfo = sessionStorage.getItem("userInfo");
    if (userSessionInfo === null) return;

    if (formValue.includes("shawtee.vercel.app")) {
      toast.error("That is already a shorty.");
      return;
    }

    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (!formValue.match(urlRegex)) {
      toast.error("That is not a valid link bro.");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Creating your shorty...");

    const data = {
      key: formValue,
      value: randomize(),
      userId: JSON.parse(userSessionInfo).id,
    };

    const response = await axios.post("/api/create", data);

    setIsLoading(false);
    toast.dismiss(toastId);

    await navigator.clipboard.writeText(response.data.value);
    toast.success("Written to your clipboard!");
  };

  const onPaste = async () => {
    const userClipboardContent = await navigator.clipboard.readText();

    if (!userClipboardContent) {
      toast.error("Your clipboard is empty!");
      return;
    }

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
        <button
          className={`btn hover:btn-success ${isLoading ? "btn-disabled" : ""}`}
          type="submit"
        >
          <IconChecks />
        </button>
        <button className="btn hover:btn-info" type="button" onClick={onPaste}>
          <IconClipboardCopy />
        </button>
        <button
          className="btn hover:btn-error"
          type="button"
          onClick={onDelete}
        >
          <IconTrash />
        </button>
      </section>
    </form>
  );
};

export default ShortyForm;
