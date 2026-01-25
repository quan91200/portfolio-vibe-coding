import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal, Settings } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import SettingsModal from "@/components/settings/SettingsModal";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    // URL Sync Logic
    const handlePopState = () => {
      setSettingsOpen(window.location.pathname === '/#settings');
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("popstate", handlePopState);

    // Initial check
    if (window.location.pathname === '/settings') {
      setSettingsOpen(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const openSettings = () => {
    setSettingsOpen(true);
    window.history.pushState(null, '', '/#settings');
  };

  const closeSettings = () => {
    setSettingsOpen(false);
    // If closing via UI, return to root URL
    window.history.pushState(null, '', '/');
  };

  const navLinks = [
    { name: t("common.about"), href: "#about" },
    { name: t("common.skills"), href: "#skills" },
    { name: t("common.projects"), href: "#projects" },
    { name: t("common.contact"), href: "#contact" },
  ];

  return (
    <StyledNavbar $scrolled={scrolled}>
      <NavbarInner>
        <NavbarBrand href="/">
          <Terminal size={24} />
          <span>DevCobham</span>
        </NavbarBrand>

        <NavbarDesktop>
          <NavbarLinks>
            {navLinks.map((link) => (
              <NavbarLink key={link.name} href={link.href}>
                {link.name}
              </NavbarLink>
            ))}
          </NavbarLinks>

          <NavbarActions>
            <SettingsButton
              onClick={openSettings}
              aria-label="Settings"
              title="Settings"
            >
              <Settings size={20} />
            </SettingsButton>
            <Button
              variant="default"
              size="sm"
              href="https://cv-web-xi-seven.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("common.resume")}
            </Button>
          </NavbarActions>
        </NavbarDesktop>

        <SettingsModal
          isOpen={settingsOpen}
          onClose={closeSettings}
        />

        <NavbarMobileToggle>
          <button
            onClick={openSettings}
            className="toggle-btn"
            style={{ color: theme === 'dark' ? 'white' : 'inherit' }}
          >
            <Settings size={20} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="toggle-btn"
            style={{ color: theme === 'dark' ? 'white' : 'inherit' }}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </NavbarMobileToggle>
      </NavbarInner>

      {isOpen && (
        <NavbarMobileMenu>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            className="mobile-nav-link"
            href="https://s3.topcv.vn/data-cvs/topcv-cv-uploads/20ac31da7fabcd3a7f0de8655ca7b344.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=s3-tp-topcv%2F20260111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260111T081453Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=880aa6f5f654f325df5b63e3c1304f089d45e9837184b2facc0245c8f7725d9e"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("common.resume")}
          </a>
        </NavbarMobileMenu>
      )}
    </StyledNavbar>
  );
};

export default Navbar;

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${props => (props.$scrolled ? "var(--navbar-bg)" : "transparent")};
  backdrop-filter: ${props => (props.$scrolled ? "blur(16px) saturate(180%)" : "none")};
  -webkit-backdrop-filter: ${props => (props.$scrolled ? "blur(16px) saturate(180%)" : "none")};
  border-bottom: 1px solid ${props => (props.$scrolled ? "var(--border)" : "transparent")};
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`

const NavbarInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const NavbarBrand = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--foreground);
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  overflow: hidden; /* Ensure overflow hidden for animation */

  span {
    background: linear-gradient(to right, var(--primary), #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    /* Animation props */
    max-width: 0;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
  }

  &:hover span {
    max-width: 200px; /* Arbitrary large width */
    opacity: 1;
    transform: translateX(0);
  }

  svg {
    transition: color 0.3s ease, transform 0.3s ease;
  }

  &:hover svg {
    color: #a855f7;
    transform: rotate(-10deg);
  }
`;

const NavbarDesktop = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavbarLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavbarLink = styled.a`
  color: var(--muted-foreground);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: var(--foreground);
  }
`;

const NavbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SettingsButton = styled.button`
  background: transparent;
  border: none;
  color: var(--foreground);
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: var(--button-hover);
    color: var(--primary);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

const NavbarMobileToggle = styled.div`
  display: none;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
  }

  .toggle-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavbarMobileMenu = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  background: var(--navbar-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 999;

  .mobile-nav-link {
    padding: 0.75rem 1rem;
    color: var(--foreground);
    text-decoration: none;
    font-weight: 500;
    border-radius: var(--radius);

    &:hover {
      background: var(--button-hover);
    }
  }
`
