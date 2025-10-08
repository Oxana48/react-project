export async function validateResponse(response: Response): Promise<any> {
    if(!response.ok) {
        throw new Error(await response.text());
    }
    return response.json();
}