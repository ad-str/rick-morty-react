import "./CharacterCard.css"
import { Character } from "../types/types";

interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    return (
        <div className="character-card-container">
            <img className="character-img" src={character.image} alt="character" />
            <h1 className="character-name">{character.name}</h1>
            <ul className="character-description">
                <li>Species: {character.species}</li>
                <li>Status: {character.status}</li>
                <li>Gender: {character.gender}</li>
                <li>Created: {character.created.toLocaleString()}</li>
            </ul>
        </div>
    );
};