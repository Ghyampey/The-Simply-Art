// import { useState, useEffect } from "react";
// import { useToken } from "./useToken";

// export const useUser = () => {
//     const [token] = useToken();

//     const getPayloadFromToken = (token) => {
//         const encodedPayload = token.split(".")[1];
//         return JSON.parse(atob(encodedPayload));
//     };

//     const [user, setUser] = useState(() => {
//         if (!token) {
//             return null;
//         }
//         return getPayloadFromToken(token);
//     });

//     useEffect(() => {
//         if (!token) {
//             setUser(null);
//         } else {
//             setUser(getPayloadFromToken(token));
//         }
//     }, [token]);

//     return user;
// };
import { useState, useEffect } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = (token) => {
        try {
            if (!token) throw new Error('Invalid token');
            
            const encodedPayload = token.split(".")[1];
            if (!encodedPayload) throw new Error('Invalid token format');

            // Replace base64url characters with base64 characters
            const base64 = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');

            // Decode base64 string
            let payload;
            if (typeof window !== 'undefined' && typeof window.atob === 'function') {
                // Browser environment
                payload = atob(base64);
            } else {
                // Node.js environment
                payload = Buffer.from(base64, 'base64').toString('utf-8');
            }

            return JSON.parse(payload);
        } catch (error) {
            console.error('Failed to decode and parse token payload:', error);
            return null;
        }
    };

    const [user, setUser] = useState(() => {
        if (!token) {
            return null;
        }
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayloadFromToken(token));
        }
    }, [token]);

    return user;
};
