import React from 'react'
import dayjs from 'dayjs'
import SidebarNoteItem from '../SidebarNoteItem'

const SidebarNoteList = async ({ notes }) => {
  const arr = await Object.entries(notes)

  if (arr.length === 0) {
    return <div className="notes-empty">{'No notes created yet!'}</div>
  }

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        const { title, updateTime } = JSON.parse(note)
        return (
          <li key={noteId}>
            <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        )
      })}
    </ul>
  )
}

export default SidebarNoteList
