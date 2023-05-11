import { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate,
  useParams, useNavigate, useMatch,
} from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'

let initialNotes = [
  {
    id: 1,
    content: 'aaa',
    important: true,
    user: 'ryota',
  },
  {
    id: 2,
    content: 'bbb',
    important: false,
    user: 'ryota',
  },
  {
    id: 3,
    content: 'ccc',
    important: true,
    user: 'ryota',
  },
]

const Home = () => {
  return (
    <div> <h2>ryota notes app</h2> </div>
  )
}

// ノートIDをパラメータとして渡すリンクを作成
// このリンクに対応するコンポーネントの定義は、下の方で Route を使って :id で受け取れるようにしている。
// 受け取ったら、useParams でコンポーネントからパラメータを参照できる。
const Notes = ({ notes }) => (
  <>
    <h2>Notes</h2>
    <Table striped hover>
      <tbody>
      {notes.map(note => {
        return (
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${notes.id}`}>
                {note.content}
              </Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  </>
)

// useParams を使用することで、<Route>で定義したURLパラメータを取得することができる
// notes から ID を使って探すパターン
// const Note = ({ notes }) => {
//   const id = Number(useParams().id)
//   const note = notes.find(note => id === note.id)
//   return (
//     <>
//       <h2>{note.content}</h2>
//       <div><strong>{note.important ? 'important' : ''}</strong></div>
//     </>
//   )
// }

// useMatchフックを使って、単一のノートを受け取るパターン
const Note = ({ note }) => {
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

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('ryota')
    navigate('/')
  }

  return (
    <>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
          />
          <Button
            variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

const App = () => {
  const [notes, setNotes] = useState(initialNotes)
  const [user, setUser] = useState('')

  // コンポーネントをレンダリングした際に、URL が/notes/:idに一致する場合、
  // match に、パスのパラメーター化された部分が挿入される。
  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null
  
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

  // /users にアクセスしたとき、Route は、ログインしていれば Users コンポーネントを表示し、
  // ログインしていなければ /login にリダイレクトする。
  return (
    <div className='container'>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged </em>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={(user) => setUser(user)} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <footer>
        <br />
        <em>ryota's app</em>
      </footer>
    </div>
  )
}

// useMatchフックはルーティング部分を定義するコンポーネントで使用できないのでRouterはこっちに定義
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
