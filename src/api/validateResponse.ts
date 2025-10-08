export async function validateResponse(response: Response): Promise<unknown> {
    if(!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
}