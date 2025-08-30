import img from '../assets/docsum.png';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo" >
                <img src={img} alt="Logo" style={{ height: 60, marginRight: 10 }} /> 
                <span style={{ fontSize: 24, fontWeight: "bold" }}>DSA.</span> 
            </div>
        </nav>
    );
}   
