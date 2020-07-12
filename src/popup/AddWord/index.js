import React from "react";
import { useForm } from "react-hook-form";

function AddWord () {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => browser.runtime.sendMessage({ action: "add word", data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="word">Word:</label><br />
      <input required type="text" id="word" name="word" ref={register} /><br />
      <label htmlFor="meaning">Meaning:</label><br />
      <input required type="meaning" id="meaning" name="meaning" ref={register} /><br /><br />
      <label htmlFor="example">Example:</label><br />
      <input required type="example" id="example" name="example" ref={register} /><br /><br />
      <button>Add!</button>
    </form>
  );
};

export default AddWord;
