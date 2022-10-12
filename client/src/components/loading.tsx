import loading from '../assets/loading.gif';
export const Loading = () => {
  return (
    <div className="w-screen h-screen  flex justify-center items-center">
      <img className="w-[200px] h-[200px]" src={loading} alt="Laoding..." />
    </div>
  );
};
