import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { userLogin, userRegister } from "../api";

type AuthFormProps = {
  isRegister?: boolean; //
};

const AuthForm: React.FC<AuthFormProps> = ({ isRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useAuth();

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = isRegister
        ? await userRegister({ username, password })
        : await userLogin({ username, password });

      logIn(response.userId, response.accessToken);
    } catch (error) {
      console.error(isRegister ? "Registration error:" : "Login error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAuth}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
    </div>
  );
};

export default AuthForm;
