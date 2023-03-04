export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="card-opening">Card Opening</a>  
        <ul>
            <li>
                <a href="/game">Game</a>
                <a href="/how-to-play">How To Play</a>
            </li>
        </ul>

    </nav>
}