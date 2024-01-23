import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { NewUser, signUp } from "../../util";
import { useNavigate } from "react-router";

export default function useSignUp() {
  const navigate = useNavigate();
  const [disable, setDisabled] = useState(false);

  const [user, setUser] = useState<NewUser>({
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleChanges = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setUser((curr) => {
      if (typeof target.name !== "string" || !target.value) return curr;

      curr[target.name as keyof NewUser] = target.value;

      return { ...curr };
    });
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setDisabled(true);
      signUp(
        { ...user, role: "USER" },
        () => console.error("Error!"),
        () => navigate("/")
      );

      setDisabled(false);
    },
    [user, navigate]
  );

  return { disable, handleChanges, handleSubmit };
}
