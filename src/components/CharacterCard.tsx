import "./CharacterCard.css"

export default function CharacterCard() {
    return (
        <div className="character-card-container">
            <img className="character-img" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="character" />
            <h1 className="character-name">Rick</h1>
            <ul className="character-description">
                <li>Species: Human</li>
                <li>Status: Alive</li>
                <li>Gender: Male</li>
                <li>Created: 2021</li>
            </ul>
        </div>
    );
};