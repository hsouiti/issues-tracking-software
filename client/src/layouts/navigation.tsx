import {NavLink} from 'react-router-dom';

export const Navigation = () => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/users',
      name: 'Users',
    },
    {
      path: '/projects',
      name: 'Projects',
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
