import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../util";

export default function useLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      setDisable(true), e.preventDefault();

      login(
        { email, password },
        () => console.error("An error has occurred"),
        () => navigate("/")
      );
      setDisable(false);
    },
    [email, password, navigate]
  );

  return {
    disable,
    password,
    email,
    navigate,
    setDisable,
    setPassword,
    setEmail,
    handleSubmit,
  };
}
