import { Loader2 } from "lucide-react";

const Final = () => {
  return (
    <div className="mt-4">
      <div className="bg-white rounded-xl shadow-sm border p-5 w-full max-w-md">
        {/* Loader */}
        <div className="flex justify-center mb-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>

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
          disabled
          className="mt-6 w-full bg-primary text-white rounded-lg py-2 font-medium opacity-70 cursor-not-allowed"
        >
          View Trip
        </button>
      </div>
    </div>
  );
};

export default Final;