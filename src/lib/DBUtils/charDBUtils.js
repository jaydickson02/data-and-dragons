import { PostToDB } from '@/lib/DBUtils/PostCalls';
import { DeleteFromDB } from "@/lib/DBUtils/RemoveCalls";

export const fetchCharacters = async (campaignID, setCharacters, setCharactersAreLoading, setCharactersError, openAlert) => {
    setCharactersAreLoading(true);
    try {
        const charactersRes = await fetch(`/api/get/characters/${campaignID}`);
        if (!charactersRes.ok) throw new Error('Failed to load characters');
        const charactersData = await charactersRes.json();
        setCharacters(charactersData);
    } catch (error) {
        setCharactersError(error.message);
    } finally {
        setCharactersAreLoading(false);
    }
}