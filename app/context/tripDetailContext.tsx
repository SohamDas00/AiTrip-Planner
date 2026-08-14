import React, { createContext } from "react";
import { TypeTrip } from "../create-new-trip/_components/chatbox";

export type TripContextType = {
  tripDetailInfo: TypeTrip | null;
  setTripDetailInfo: React.Dispatch<React.SetStateAction<TypeTrip | null>>;
};

export const TripDetailContext = createContext<TripContextType | undefined>(
  undefined
);