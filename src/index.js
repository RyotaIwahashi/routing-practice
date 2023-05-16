import { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate,
  useParams, useNavigate, useMatch,
} from 'react-router-dom'

import {
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Button,
  Alert,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material'

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

// ノートIDをパラメータとして渡すリンクを作成
// このリンクに対応するコンポーネントの定義は、下の方で Route を使って :id で受け取れるようにしている。
// 受け取ったら、useParams でコンポーネントからパラメータを参照できる。
const Notes = ({ notes }) => (
  <>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" />
        </div>
        <div>
          <TextField label="password" type="password" />
        </div>
        <div>
          <Button variant="containerd" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [notes, setNotes] = useState(initialNotes)
  const [user, setUser] = useState('')
  const [message, setMessage] = useState(null)

  // コンポーネントをレンダリングした際に、URL が/notes/:idに一致する場合、
  // match に、パスのパラメーター化された部分が挿入される。
  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null
  
  const padding = {
    padding: 5
  }

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)

    setTimeout(() => {
      setMessage(null)
    }, 10000)
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
    <Container>
      <div>
        {(message &&
          <Alert severity="success">
            {message}
          </Alert>
        )}
      </div>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" />
          <Button color="inherit" component={Link} to="/">
            home
          </Button>
          <Button color="inherit" component={Link} to="/notes">
            notes
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user
            ? <em>{user} logged in</em>
            : <Button color="inherit" component={Link} to="/login">
                login
              </Button>
          }
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <footer>
        <br />
        <em>ryota's app</em>
      </footer>
    </Container>
  )
}

// useMatchフックはルーティング部分を定義するコンポーネントで使用できないのでRouterはこっちに定義
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
