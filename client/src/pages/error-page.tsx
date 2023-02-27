import {isRouteErrorResponse, useRouteError, useNavigate} from 'react-router-dom';

type errorType = {statusText: string; message: string};

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          {error.status} - {error.statusText}
        </p>
        {error.data?.message && <p>{error.data.message}</p>}

        <button
          role="link"
          onClick={() => navigate('/', {replace: true})}
          className=" w-[150px] mt-4 py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center disabled:opacity-50"
        >
          Back
        </button>
      </>
    );
  } else {
    return (
      <>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <button
          role="link"
          onClick={() => navigate('/', {replace: true})}
          className=" w-[150px] mt-4 py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center disabled:opacity-50"
        >
          Back
        </button>
      </>
    );
  }
};

export default ErrorPage;
