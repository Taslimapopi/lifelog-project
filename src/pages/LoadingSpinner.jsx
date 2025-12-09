const LoadingSpinner = () => {
  return (
    <div className="w-full h-[60vh] flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
