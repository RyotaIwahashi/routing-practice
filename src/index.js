import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const Home = () => {
  return (
    <div> <h2>ryota notes app</h2> </div>
  )
}

// 1行なら return なしでいきなり()でかける
const Notes = () => (
  <div> <h2>Notes</h2> </div>
)

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const App = () => {
  
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
        <Route path="/notes" element={<Notes />} />
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
