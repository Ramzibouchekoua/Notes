import Note from './Note';
import React, { useState} from "react";
import { Input} from 'antd';

const Notes = ({ notes, onDelete, onToggle }) => {
  const { Search } = Input;
  const [q, setQ] = useState("");


  function search(note) {
    const colmuns = note[0] && Object.keys(note[0]);
     return notes.filter((note)=> 
     colmuns.some(
         () => note.text.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
     )
     );
   }
  return (
    <>
<Search placeholder="Search by Note" type="text" value={q} onChange={(e) => setQ(e.target.value)}  enterButton />

        <Note  notes={search(notes)} onDelete={onDelete} onToggle={onToggle} />
    </>
  )
}

export default Notes
