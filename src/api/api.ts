export async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);
        const data: T = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(`Error fetching data from api: ${(error as Error).message}`);
    }
};
