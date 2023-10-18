import { useState } from "react";

export function useForm(initialState) {
  const [form, setForm] = useState(initialState);
  

  const resetForm = () => setForm(initialState)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return { handleChange, form, resetForm }
}