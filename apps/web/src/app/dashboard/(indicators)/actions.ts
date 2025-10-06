export const getUsersDeveloperLogin = async () => {
  try {
    const res = await fetch('/api/users', {
      credentials: 'include'
    })

    if (!res.ok) {
      throw new Error('Erro ao buscar usuários')
    }

    const { data } = await res.json()
    console.log(data)
    // setUsers(data)
  } catch (err) {
    console.error(err)
  } finally {
    // setLoading(false)
  }
}
