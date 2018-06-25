import React, { Component } from 'react';
import Notes from './components/Notes';
import style from './main.css'

// if(process.env.NODE_ENV !== 'production') {
//   React.Perf = require('react-addons-perf');
// }

import uuid from 'uuid';

const notes = [
  {
    id: uuid.v4(),
    task: 'Learn React'
  },
  {
    id: uuid.v4(),
    task: 'Do laundry'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes,
    };
  }

  render() {
    const {notes} = this.state;

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onNoteClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
        />
      </div>
    );
  }

  addNote = () => {
    const newNote = {
      id: uuid.v4(),
      task: 'new task',
    };

    this.setState({
      notes: [...this.state.notes, newNote]
    })
  }

  deleteNote = (id, e) => {
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id),
    });
  }

  activateNoteEdit = (id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(note.id === id) {
          note.editing = true;
        }

        return note;
      })
    })
  }

  editNote = (id, task) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(note.id === id) {
          note.editing = false;
          note.task = task;
        }

        return note;
      })
    })
  }
}

export default App;
