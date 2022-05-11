import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Form = {
  title: string;
  text: string;
};

type Props = {};

const TestNewsCreation = ({}: Props) => {
  const { register, handleSubmit } = useForm<Form>();
  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} />
        <input {...register("text")} />
      </div>
      <button onClick={handleSubmit(onSubmit)}>create</button>
    </div>
  );
};

export default TestNewsCreation;
