import axios from "axios";
import { useState } from "react";

const useRequests = ({ route, method, body, onSuccess, onFailure = null }) => {
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const baseUrl = "http://localhost:9000";
    const doRequest = async (query = "", type = "none") => {
        try {
            setErrors(null);
            setIsLoading(true);
            const response = await axios({
                method: method,
                url: `${baseUrl}${route}`,
                data: body ? body : null,
                params: {
                    location: type === "location" ? query : "none",
                    restname: type === "rest" ? query : "none",
                }
            });
            console.log(response.data);
            if (onSuccess) {
                setIsLoading(false);
                onSuccess(response.data);
            }
            return response.data;
        } catch (err) {
            if (onFailure) {
                onFailure();
            }
            console.log(err);
            throw new Error("something went wrong");
        }
    }
    return {
        doRequest,
        errors,
        isLoading,
    }
}
export default useRequests;