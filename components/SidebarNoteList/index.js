import SidebarNoteListFilter from '@/components/SidebarNoteListFilter'
import { getAllNotes } from '@/lib/strapi'

export default async function NoteList() {
  const notes = await getAllNotes()

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">{'No notes created yet!'}</div>
  }

  return <SidebarNoteListFilter notes={notes} />
}
