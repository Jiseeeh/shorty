import React, { useState } from "react";
import { IconChecks, IconClipboardCopy, IconTrash } from "@tabler/icons";

const Form: React.FC = () => {
  const [formValue, setFormValue] = useState<string>("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValue) return;
  };

  const onPaste = async () => {
    setFormValue(await navigator.clipboard.readText());
  };

  const onDelete = () => {
    setFormValue("");
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
        <button className="btn hover:btn-info" onClick={onPaste}>
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
