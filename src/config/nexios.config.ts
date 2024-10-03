import { Nexios } from "nexios-http";


const nexiosInstance = new Nexios({
    baseURL: "https://pet-care-server-eight.vercel.app/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});


// nexiosInstance.interceptors.request.use((config) => {
//     const accessToken = cookies().get("accessToken")?.value;
//     if (accessToken) {
//         config.headers = {
//             ...config.headers,
//             Authorization: `${accessToken}`,
//         };
//     }

//     return config;

// })


export default nexiosInstance;