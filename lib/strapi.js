export async function getAllNotes() {
  const response = await fetch(`http://127.0.0.1:1337/api/notes`)
  const data = await response.json()
  const res = {}

  data.data?.forEach(
    ({ id, attributes: { title, content, slug, updatedAt } }) => {
      res[slug] = JSON.stringify({
        title,
        content,
        updateTime: updatedAt,
      })
    },
  )

  return res
}

export async function addNote(data) {
  const response = await fetch(`http://127.0.0.1:1337/api/notes`, {
    method: 'POST',
    headers: {
      Authorization:
        '6db1077aa26da168559ae5405ff030dcc26f4fc191f9ec7f3870d774370f06ae662f709b4aa2727e23c308d7faacd6f664c4e7162a751acb64fd15b68e3ad439bd853ae39891e31bf62523d145ff2d0d1094f5833ffb77a45a2f18c75ce09413a53b1b392f397f71d441ed0c8ae6295e0810a38741a28bde4602358033e75dcb',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  })
  const res = await response.json()
  return res.data?.attributes?.slug
}

export async function updateNote(uuid, data) {
  const { id } = await getNote(uuid)
  console.log('id', data)

  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization:
        '6db1077aa26da168559ae5405ff030dcc26f4fc191f9ec7f3870d774370f06ae662f709b4aa2727e23c308d7faacd6f664c4e7162a751acb64fd15b68e3ad439bd853ae39891e31bf62523d145ff2d0d1094f5833ffb77a45a2f18c75ce09413a53b1b392f397f71d441ed0c8ae6295e0810a38741a28bde4602358033e75dcb',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  })
  const res = await response.json()
}

export async function getNote(uuid) {
  const response = await fetch(
    `http://127.0.0.1:1337/api/notes?filters[slug][$eq]=${uuid}`,
  )
  const data = await response.json()
  console.log('data', data)
  return {
    title: data.data?.[0]?.attributes?.title,
    content: data.data?.[0]?.attributes?.content,
    updateTime: data.data?.[0]?.attributes?.updatedAt,
    id: data.data?.[0]?.id,
  }
}

export async function delNote(uuid) {
  const { id } = await getNote(uuid)
  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization:
        '6db1077aa26da168559ae5405ff030dcc26f4fc191f9ec7f3870d774370f06ae662f709b4aa2727e23c308d7faacd6f664c4e7162a751acb64fd15b68e3ad439bd853ae39891e31bf62523d145ff2d0d1094f5833ffb77a45a2f18c75ce09413a53b1b392f397f71d441ed0c8ae6295e0810a38741a28bde4602358033e75dcb',
      'Content-Type': 'application/json',
    },
  })
  const res = await response.json()
}
