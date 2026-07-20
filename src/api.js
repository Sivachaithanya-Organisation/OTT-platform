const BASE = '/api'

async function request(path, { method = 'GET', body, token, form } = {}) {
  const headers = {}
  let payload = body

  if (form) {
    payload = new URLSearchParams(body)
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else if (body) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { method, headers, body: payload })
  const isJson = res.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await res.json() : null

  if (!res.ok) {
    throw new Error(data?.detail || `Request failed (${res.status})`)
  }
  return data
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (email, password) =>
    request('/auth/login', { method: 'POST', form: true, body: { username: email, password } }),
  me: (token) => request('/auth/me', { token }),
  shows: (shelf) => request(shelf ? `/shows?shelf=${shelf}` : '/shows'),
  watchlist: (token) => request('/me/watchlist', { token }),
  toggleWatchlist: (showId, token) =>
    request('/me/watchlist/toggle', { method: 'POST', body: { show_id: showId }, token }),
}
