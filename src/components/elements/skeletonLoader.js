const SkeletonLoader = ({ width, height }) => {
    return (
      <div
        className={`bg-gray-300 dark:bg-gray-600 animate-pulse ${width} ${height} rounded-lg`}
      ></div>
    );
  };
  
  export default SkeletonLoader;