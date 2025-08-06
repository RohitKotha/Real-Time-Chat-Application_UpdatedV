import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(() => {
		const storedUser = JSON.parse(localStorage.getItem("chat-user"));
		// Ensure default language is set to English if not present
		if (storedUser && !storedUser.language) {
			storedUser.language = "en";
			localStorage.setItem("chat-user", JSON.stringify(storedUser));
		}
		return storedUser;
	});

	// Update localStorage whenever authUser changes
	useEffect(() => {
		if (authUser) {
			localStorage.setItem("chat-user", JSON.stringify(authUser));
		} else {
			localStorage.removeItem("chat-user");
		}
	}, [authUser]);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
