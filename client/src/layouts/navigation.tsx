import {NavLink} from 'react-router-dom';

export const Navigation = () => {
  const routes = [
    {
      path: '/login',
      name: 'Login',
    },
    {
      path: '/register',
      name: 'Register',
    },
  ];

  return (
    <nav>
      <ul>
        {routes.map((route) => {
          const {name, path} = route;
          return (
            <li key={name}>
              <NavLink to={path} className="underline">
                {name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
