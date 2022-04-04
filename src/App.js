import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Notes from './components/Notes'
import AddNote from './components/AddNote'
import About from './components/About'

const App = () => {
  const [showAddNote, setShowAddNote] = useState(false)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const getNotes = async () => {
      const NotesFromServer = await fetchNotes()
      setNotes(NotesFromServer)
    }

    getNotes()
  }, [])


  const fetchNotes = async () => {
    const res = await fetch('http://localhost:5000/notes')
    const data = await res.json()

    return data
  }

 
  const fetchNote = async (id) => {
    const res = await fetch(`http://localhost:5000/notes/${id}`)
    const data = await res.json()

    return data
  }

 
  const addNote = async (note) => {
    const res = await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(note),
    })

    const data = await res.json()

    setNotes([...notes, data])

  }

 
  const deleteNote = async (id) => {
    const res = await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    })
    res.status === 200
      ? setNotes(notes.filter((note) => note.id !== id))
      : alert('Error Deleting This note ')
  }

 
  const toggleReminder = async (id) => {
    const noteToToggle = await fetchNote(id)
    const updNote = { ...noteToToggle, reminder: !noteToToggle.reminder }

    const res = await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updNote),
    })

    const data = await res.json()

    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, reminder: data.reminder } : note
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddNote(!showAddNote)}
          showAdd={showAddNote}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddNote && <AddNote onAdd={addNote} />}
                {Notes.length > 0 ? (
                  <Notes
                    notes={notes}
                    onDelete={deleteNote}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Notes To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
