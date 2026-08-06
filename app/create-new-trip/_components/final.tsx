const  Final = ({ disabled }: any) => {
  return (
    <div className="mt-4">
      <div className="bg-white rounded-xl shadow-sm border p-5 w-full max-w-md">
        {/* Heading */}
        <h3 className="text-center text-lg font-semibold text-primary">
          ✈️ Planning your dream trip...
        </h3>

        {/* Subtitle */}
        <p className="text-center text-gray-500 text-sm mt-2">
          Gathering the best destinations, activities, hotels and travel
          details for you.
        </p>

        {/* Button */}
        <button
          disabled={disabled}
          className={`mt-6 w-full rounded-lg py-2 font-medium transition
    ${disabled
              ? "bg-primary opacity-70 cursor-not-allowed text-white"
              : "bg-primary hover:opacity-90 cursor-pointer text-white"
            }`}
        >
          View Trip
        </button>
      </div>
    </div>
  );
};

export default Final;