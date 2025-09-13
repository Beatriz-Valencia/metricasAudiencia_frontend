import { createContext, useContext} from "react";

export const HelpersContext = createContext(null);

export function useHelpers() {
    const context = useContext(HelpersContext);
    if (!context) throw new Error("useHelpers debe usarse dentro de <HelpersContext.Provider");
    return context;
}