import { FaTimes } from 'react-icons/fa'

const Note = ({ notes, onDelete, onToggle }) => {
  return (
  <>
   {notes.map((note)=>(
      <div
      className={`note ${note.reminder && 'reminder'}`}
      onDoubleClick={() => onToggle(note.id)}  key={note.id}
    >
      <h3>
        {note.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(note.id)}
        />
      </h3>
      <p>{note.day}</p>
    </div>
   ))

   }
  </>
  )
}

export default Note
