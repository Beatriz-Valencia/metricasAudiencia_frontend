import { createContext, useContext} from "react";

export const HelpersContext = createContext(null);

export function useHelpers() {
    const context = useContext(HelpersContext);
    return context;
}