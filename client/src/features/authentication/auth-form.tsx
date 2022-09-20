import {useState} from 'react';

export const AuthForm = () => {
  const [message, setMessage] = useState('message');
  const handleClick = () => {
    setMessage('submit success');
  };

  return (
    <div>
      <form>
        <div data-testid="message">{message}</div>
        <div className="inputs">
          <div>
            <label>Username</label>
            <input type="text" className="border" name="username" />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="border"
              name="password"
              role="password"
              aria-label="password"
            />
          </div>
        </div>
        <button disabled onClick={handleClick}>
          Sign In
        </button>
        <button>Cancel </button>
      </form>
    </div>
  );
};
