import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  Github,
  Linkedin,
  Facebook,
} from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/dev.cobham",
      icon: <Facebook className="h-4 w-4" />
    },
    {
      name: "GitHub",
      href: "https://github.com/quan91200",
      icon: <Github className="h-4 w-4" />
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/devcobham/",
      icon: <Linkedin className="h-4 w-4" />
    },
  ];

  return (
    <StyledFooter>
      <FooterInner>
        <FooterCopyright>
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </FooterCopyright>
        <FooterLinks>
          {socialLinks.map((link) => (
            <LinkWrapper key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
              <Flipper>
                <Front>{link.name}</Front>
                <Back>{link.icon}</Back>
              </Flipper>
            </LinkWrapper>
          ))}
        </FooterLinks>
      </FooterInner>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  padding: 2rem 0;
  border-top: 1px solid var(--border);
`;

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterCopyright = styled.p`
  font-size: 0.875rem;
  color: var(--muted-foreground);
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Flipper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
`;

const LinkWrapper = styled.a`
  perspective: 1000px;
  width: 5rem;
  height: 1.5rem;
  display: inline-block;
  color: var(--muted-foreground);
  text-decoration: none;
  font-size: 0.875rem;
  overflow: visible;

  &:hover ${Flipper} {
    transform: rotateX(-180deg);
  }
`;

const Front = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Back = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateX(180deg);
  color: var(--primary);

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
