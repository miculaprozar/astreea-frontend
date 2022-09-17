import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import AuthWrapper from "./AuthWrapper";
import Loader from "../../general_components/Loader/Loader";

export const RouteGuard = (props) => {
	const { token, initAuth } = useContext(AuthContext);
	useEffect(() => {
		console.log("TOKEN", token);
		if (token === null) initAuth();
	}, [token]);

	return <>{!token ? <Loader isLoading={true} /> : <>{props.children}</>}</>;
};
