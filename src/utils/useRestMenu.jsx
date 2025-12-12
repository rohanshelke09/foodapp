import React, { useEffect, useState } from 'react'
import { MENU_API_BASE } from './constants';


const useRestMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!resId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const url = MENU_API_BASE + resId;
                console.log("Fetching menu from:", url);

                const response = await fetch(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response received:", data);

                if (data?.data) {
                    setResInfo(data.data);
                    setError(null);
                } else {
                    throw new Error("Invalid response structure from API");
                }
            } catch (error) {
                console.error("Failed to fetch menu data:", error);
                setError(error.message);
                setResInfo(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [resId]);

    return { resInfo, loading, error };
}

export default useRestMenu;