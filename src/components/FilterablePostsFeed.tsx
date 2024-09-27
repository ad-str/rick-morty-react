import './FilterBar.css';

interface Character {
    name: string;
    species: string;
    status: string;
    gender: string;
    dateCreated: string;
}

interface CharactersProp {
    characters: Character[];
}

export default function FilterablePostsFeed({ characters }: CharactersProp) {
    return (
        <div>
            <FilterBar />
            <PostsFeed characters={characters} />
        </div>
    );
};

function FilterBar() {
    return (
        <div className='filter-bar'>
            <label htmlFor="sort">Sort by: </label>
            <select id="sort" name="sort">
                <option value="name">Name</option>
                <option value="date-new">Date (newest to oldest)</option>
                <option value="date-old">Date (oldest to newest)</option>
            </select>
            
            <div className='status-container'>
                <label>Status:</label>
                <label>
                    <input type="checkbox" name="status" value="alive" />
                    Alive
                </label>
                <label>
                    <input type="checkbox" name="status" value="dead" />
                    Dead
                </label>
                <label>
                    <input type="checkbox" name="status" value="unknown" />
                    Unknown
                </label>
            </div>
        </div>
    );
};

function PostsFeed({ characters }: CharactersProp) {
    return (
        <div>not implemented</div>
    );
};
