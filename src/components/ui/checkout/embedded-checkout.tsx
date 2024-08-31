import { useCallback } from "react";

export function EmbeddedCheckout() {
    const fetchClientScret = useCallback(() => {
        return fetch("api/embedded-checkout",
            {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceId: "price_1JZ5Z2JZ5Z2JZ5Z2JZ5Z2JZ5",
                }),
            }).then((response) => { return response.json() }).then((data) => { data.clientSecret });
    }, []);

    const options = { fetchClientScret };

    return (
        <a
            onClick={() => { }}
            className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Get access
        </a>
    );
}
