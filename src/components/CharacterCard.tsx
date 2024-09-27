import "./CharacterCard.css"
import { Character } from "./types";

interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    return (
        <div className="character-card-container">
            <img className="character-img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="character" />
            <h1 className="character-name">{character.name}</h1>
            <ul className="character-description">
                <li>Species: {character.species}</li>
                <li>Status: {character.status}</li>
                <li>Gender: {character.gender}</li>
                <li>Created: {character.dateCreated}</li>
            </ul>
        </div>
    );
};