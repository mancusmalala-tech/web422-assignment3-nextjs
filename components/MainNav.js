import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { readToken, removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function MainNav() {
  const router = useRouter();
  let token = readToken();

  function logout() {
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar className="fixed-top bg-primary" expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Yigit Dalkilic
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} href="/about">
                About
              </Nav.Link>
              
              {/* Show when logged in */}
              {token && (
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item>Favourites</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
              
              {/* Show when not logged in */}
              {!token && (
                <Nav.Link as={Link} href="/register">
                  Register
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}