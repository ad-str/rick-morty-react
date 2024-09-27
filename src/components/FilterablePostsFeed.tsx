import { useState } from 'react';
import './FilterBar.css';

// base types + interfaces
interface Character {
    name: string;
    species: string;
    status: string;
    gender: string;
    dateCreated: string;
}

type SortOrder = 'name' | 'date-new' | 'date-old';

interface StatusFilter {
    alive: boolean;
    dead: boolean;
    unknown: boolean;
}

// interfaces for props
interface FitlerablePostsFeedProps {
    characters: Character[];
}

interface FilterBarProps {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  statusFilter: StatusFilter;
  setStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
}

interface PostsFeedProps {
    characters: Character[],
    sortOrder: SortOrder,
    statusFilter: StatusFilter
}

export default function FilterablePostsFeed({ characters }: FitlerablePostsFeedProps) {
    const [sortOrder, setSortOrder] = useState<SortOrder>('date-old'); // default to oldest to newest sorting
    const [statusFilter, setStatusFilter] = useState<StatusFilter>({
        alive: true,
        dead: true,
        unknown: true
    }); // default to all checked

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
                sortOrder={sortOrder}
                statusFilter={statusFilter}
            />
        </div>
    );
};

function FilterBar({ sortOrder, setSortOrder, statusFilter, setStatusFilter }: FilterBarProps) {
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as SortOrder);
    };
    
    const handleStatusChange = (status: keyof StatusFilter) => {
        setStatusFilter(prev => ({
            ...prev,
            [status]: !prev[status]
        }));
      };

    return (
        <div className='filter-bar'>
            <label htmlFor="sort">Sort by: </label>
            <select id="sort" name="sort" value={sortOrder} onChange={handleSortChange}>
                <option value="date-old">Date (oldest to newest)</option>
                <option value="date-new">Date (newest to oldest)</option>
                <option value="name">Name</option>
            </select>
            
            <div className='status-container'>
                <label>Status:</label>
                {(Object.keys(statusFilter) as Array<keyof StatusFilter>).map(status => (
                    <label key={status}>
                        <input 
                        type="checkbox" 
                        name="status" 
                        value={status}
                        checked={statusFilter[status]}
                        onChange={() => handleStatusChange(status)}
                        />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                ))}
            </div>
        </div>
    );
};

function PostsFeed({ characters, sortOrder, statusFilter }: PostsFeedProps) {
    // filter the characters by status
    const filteredCharacters = characters.filter(character => {
        return statusFilter[character.status.toLowerCase() as keyof StatusFilter];
    });

    // now sort the filtered characters
    const sortedCharacters = filteredCharacters.sort((a, b) => {
        switch (sortOrder) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'date-new':
                return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
            case 'date-old':
                return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
            default:
                return 0;
        }
    });


    return (
        <table>
            <thead>
                <tr>
                    <th>Cards</th>
                </tr>
            </thead>
            <tbody>
                {sortedCharacters.map((character) => (
                    <tr key={character.name}>
                        <td>{character.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
