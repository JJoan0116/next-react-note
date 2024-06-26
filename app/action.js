'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/strapi'
import { revalidatePath } from 'next/cache'

export async function saveNote(noteId, title, body) {
  console.log(111111, noteId, title, body)
  const data = JSON.stringify({
    title,
    content: body,
    updateTime: new Date(),
  })

  if (noteId) {
    updateNote(noteId, data)
    revalidatePath('/', 'layout')
    redirect(`/note/${noteId}`)
  } else {
    const res = await addNote(data)
    revalidatePath('/', 'layout')
    redirect(`/note/${res}`)
  }
}

export async function deleteNote(noteId) {
  delNote(noteId)
  revalidatePath('/', 'layout')
  redirect('/')
}
