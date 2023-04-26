import { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams,
} from 'react-router-dom'

let initialNotes = [
  {
    id: 1,
    content: 'aaa',
    important: true
  },
  {
    id: 2,
    content: 'bbb',
    important: false
  },
  {
    id: 3,
    content: 'ccc',
    important: true
  },
]

const Home = () => {
  return (
    <div> <h2>ryota notes app</h2> </div>
  )
}

const Notes = ({ notes }) => (
  <>
    <h2>Notes</h2>
    <ul>
      {notes.map(note => {
        return (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        )
      })}
    </ul>
  </>
)

// useParams を使用することで、<Route>で定義したURLパラメータを取得することができる
const Note = ({ notes }) => {
  const id = Number(useParams().id)
  const note = notes.find(note => id === note.id)
  return (
    <>
      <h2>{note.content}</h2>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </>
  )
}

// 1行なら return なしでいきなり()でかける
const Users = () => (
  <div> <h2>Users</h2> </div>
)

const App = () => {
  const [notes, setNotes] = useState(initialNotes)
  
  const padding = {
    padding: 5
  }

  // BrowserRouterは、HTML5 history API (pushState、replaceState、および popState イベント) を使用して UI を URL と同期させるルーター。
  // BrowserRouter(HTML5 history API) を使用すると、ブラウザのアドレス バーにある URL を使用して、
  // React アプリケーションの内部ルーティングを行うことができる。
  // そのため、アドレス バーの URL が変更されても、ページのコンテンツは Javascript を使用してのみ操作され、
  // ブラウザーはサーバーから新しいコンテンツを読み込むことはない。
  // Linkコンポーネントは、例えばテキスト'notes'を表示して、これをクリックするとURLが /notes に変更される。
  // Routeコンポーネントは、ブラウザのアドレスが /notes の場合、Notes コンポーネントをレンダリングすることを定義している。
  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note notes={notes} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>ryota's app</i>
      </div>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
