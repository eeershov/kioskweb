import { createContext } from "react";


export const ViewportContext = createContext<"Mobile" | "Desktop">("Mobile");
