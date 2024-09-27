import { Character } from "../types/types.ts";

export async function fetchData<T>(url: string): Promise<Character[]> {
    try {
        const response = await fetch(url);
        const data: T = await response.json();

        // Extract and return only the relevant fields from results
        const results: Character[] = (data as any).results.map((character: any) => ({
            name: character.name,
            species: character.species,
            status: character.status,
            gender: character.gender,
            created: new Date(character.created),
            image: character.image
        }));

        console.log(results);
        return results;
    } catch (error) {
        throw new Error(`Error fetching data from api: ${(error as Error).message}`);
    }
};
