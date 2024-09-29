import { useState, useEffect } from 'react';
import { fetchData } from '../api/api.ts';
import './FilterablePostsFeed.css';
import CharacterCard from './CharacterCard';
import { Character } from '../types/types';

// specific types
type SortOrder = 'name' | 'date-new' | 'date-old';
type StatusFilter = 'all' | 'alive' | 'dead' | 'unknown'

// interfaces for component props
interface FilterBarProps {
    sortOrder: SortOrder;
    setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
    statusFilter: StatusFilter;
    setStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
}

interface PostsFeedProps {
    characters: Character[],
    isLoading: boolean,
    error: string | null
}

// main function
export default function FilterablePostsFeed() {
    const [sortOrder, setSortOrder] = useState<SortOrder>('date-old'); // default to oldest to newest sorting
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all'); // default to all
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // base url
                let url = `https://rickandmortyapi.com/api/character`;
                
                // set status query
                if (statusFilter !== 'all') {
                    url += `?status=${statusFilter}`;
                }

                // fetch characters
                let characters = await fetchData<{ results: Character[] }>(url);

                // now sort results
                characters.sort((a, b) => {
                    switch (sortOrder) {
                        case 'name':
                            return a.name.localeCompare(b.name);
                        case 'date-new':
                            return b.created.getTime() - a.created.getTime();
                        case 'date-old':
                            return a.created.getTime() - b.created.getTime();
                        default:
                            return 0; // shouldn't reach this code
                    }
                })
                
                setCharacters(characters);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacters();
    }, [sortOrder, statusFilter]);

    return (
        <div>
            <FilterBar 
                sortOrder={sortOrder} 
                setSortOrder={setSortOrder} 
                statusFilter={statusFilter} 
                setStatusFilter={setStatusFilter} 
            />
            <PostsFeed
                characters={characters}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
};

function FilterBar({ sortOrder, setSortOrder, statusFilter, setStatusFilter }: FilterBarProps) {
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as SortOrder);
    };
    
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(event.target.value as StatusFilter);
    };

    return (
        <div className='filter-bar'>
            <div className="sort-container">
                <label htmlFor="sort">Sort by: </label>
                <select id="sort" name="sort" value={sortOrder} onChange={handleSortChange}>
                    <option value="date-old">Date (oldest to newest)</option>
                    <option value="date-new">Date (newest to oldest)</option>
                    <option value="name">Name</option>
                </select>
            </div>
            
            <div className='status-container'>
                <label htmlFor="status">Status: </label>
                <select id="status" name="status" value={statusFilter} onChange={handleStatusChange}>
                    <option value="all">All</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
        </div>
    );
};

function PostsFeed({ characters, isLoading, error }: PostsFeedProps) {

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="feed-container">
            {characters.length === 0 ? (
                <div>No characters found</div>
            ) : (
                characters.map((character) => (
                    <CharacterCard character={character} />
                ))
            )}
        </div>
    );
};
