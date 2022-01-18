import React, {useState, useEffect, useRef} from 'react';
import {BiDotsHorizontal} from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { deleteEvent } from '../../services/eventServices';

const EventPageOptions = ({token, eventId}) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const handleOptionsClick = () => setIsActive(!isActive);
    const history = useHistory();
    

    useEffect(()=> {
        const pageClickEvent = (e) => {
            if(dropdownRef.current !== null && !dropdownRef.current.contains(e.target)){
                setIsActive(!isActive);
            }
        }
        if (isActive){
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        }
    }, [isActive]);

    const handleDelete = () => {
        deleteEvent(eventId, token);
        history.push('/');
    }
    console.log(dropdownRef)

    return (
        <div className="event-page-options">
            <BiDotsHorizontal className="event-page-options--button heading-2" onClick={handleOptionsClick}/>
            <nav ref={dropdownRef} className={`event-page-options__drop-down ${isActive ? `active`: 'inactive'}`}>
                <ul>
                    <li>Bookmark</li>
                    {token && <li onClick={handleDelete}>Delete</li>}
                </ul>
            </nav>
        </div>
    )
};

export default EventPageOptions;