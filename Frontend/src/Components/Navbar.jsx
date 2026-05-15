import { Container, Navbar } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar className="app-navbar">
      <Container>
        <Navbar.Brand href="#" className="brand-wrap">
          <span className="brand-mark">ET</span>
          <span>
            <span className="brand-title">Expense Tracker</span>
            <span className="brand-subtitle"></span>
          </span>
        </Navbar.Brand>
        <span className="navbar-chip">Backend Connected</span>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
