type RequestOptions = {
    method: "GET" | "POST" | "PUT" | "DELETE"; // Specify allowed HTTP methods
    headers: HeadersInit; // Type for headers (you can define this as well if needed)
    body?: BodyInit | null; // Type for request body
    redirect?: RequestRedirect; // Type for redirect behavior
};

export default RequestOptions;
