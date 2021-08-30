import { FormEvent } from "react";
import { ApiUrl } from "screens/project-list";

const login = (param: { username: string; password: string }) => {
  fetch(`${ApiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
    }
  });
};

export const LoginScreen = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Account: </label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>Login</button>
    </form>
  );
};
