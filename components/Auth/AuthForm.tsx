import { useState } from 'react';

type AuthFormProps = {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string) => Promise<void>;
};

const AuthForm: React.FC<AuthFormProps> = ({ onSignIn, onSignUp }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <div className="w-96 p-4 border border-gray-200 rounded bg-white">
      <div className="space-y-4 mb-6">
        <label htmlFor="email" className="flex flex-col">
          <span className="mb-2 text-sm text-zinc-500 font-semibold">
            Email
          </span>
          <input
            type="email"
            id="email"
            name="email"
            value={userCredentials.email}
            placeholder="Email"
            autoComplete="off"
            onChange={handleChange}
            className="p-3 border rounded border-gray-200 bg-gray-100 outline-none ring-zinc-300 focus:ring-2"
          />
        </label>

        <label htmlFor="password" className="flex flex-col">
          <span className="mb-2 text-sm text-zinc-500 font-semibold">
            Passowrd
          </span>
          <input
            type="password"
            id="password"
            name="password"
            value={userCredentials.password}
            placeholder="Passowrd"
            onChange={handleChange}
            className="p-3 border rounded border-gray-200 bg-gray-100 outline-none ring-zinc-300 focus:ring-2"
          />
        </label>
      </div>

      <div className="flex flex-col gap-1 justify-center items-center">
        <button
          onClick={() =>
            onSignIn(userCredentials.email, userCredentials.password)
          }
          className="w-full py-2 rounded bg-gray-600 text-white hover:bg-gray-500 active:bg-gray-500"
        >
          Authorize
        </button>

        <button
          onClick={() =>
            onSignUp(userCredentials.email, userCredentials.password)
          }
          className="w-max py-2 rounded text-blue-600 hover:underline active:underline"
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
