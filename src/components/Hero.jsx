import { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Linkedin, ChevronsDown } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = useMemo(() => t("hero.phrases", { returnObjects: true }), [t]);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTypingSpeed(2000); // Wait at end
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed, loopNum, phrases]);

  return (
    <StyledHero id="hero">
      <BgBlur className="hero-bg-blur" />

      <HeroContent className="container">
        <AvailableBadge>
          <span className="dot"></span>
          {t("hero.available")}
        </AvailableBadge>

        <HeroTitle>
          {t("hero.title_start")} <br />
          <GradientText>
            {text}
            <Cursor>|</Cursor>
          </GradientText>
        </HeroTitle>

        <HeroSubtitle>
          {t("hero.subtitle")}
        </HeroSubtitle>

        <HeroCTA>
          <Button size="lg" className="group" href="#projects">
            {t("hero.cta_work")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" href="#contact">
            {t("hero.cta_contact")}
          </Button>
        </HeroCTA>

        <SocialLinks>
          <SocialIcon href="#">
            <Github className="h-6 w-6" />
          </SocialIcon>
          <SocialIcon href="#">
            <Twitter className="h-6 w-6" />
          </SocialIcon>
          <SocialIcon href="#">
            <Linkedin className="h-6 w-6" />
          </SocialIcon>
        </SocialLinks>
      </HeroContent>

      <ScrollDownButton href="#about">
        <span className="text">{t("hero.cta_discover")}</span>
        <ChevronsDown className="icon" size={30} />
      </ScrollDownButton>
    </StyledHero>
  );
};

export default Hero;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledHero = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;

  /* Ensure content is above background effects */
  & > * {
    position: relative;
    z-index: 10;
  }
`;

const BgBlur = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  max-width: 1280px;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    top: 5rem;
    right: 0;
    width: 500px;
    height: 500px;
    background-color: rgba(59, 130, 246, 0.2);
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 768px;
  position: relative;
  z-index: 10;
`;

const AvailableBadge = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background-color: rgba(59, 130, 246, 0.15);
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #60a5fa;
  margin-bottom: 1.5rem;

  .dot {
    display: block;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background-color: var(--primary);
    margin-right: 0.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const GradientText = styled.span`
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  min-height: 1.1em;
`;

const Cursor = styled.span`
  display: inline-block;
  margin-left: 2px;
  -webkit-text-fill-color: var(--primary);
  animation: ${blink} 0.8s infinite;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--muted-foreground);
  margin-bottom: 2rem;
  max-width: 36rem;
`;

const HeroCTA = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--muted-foreground);
`;

const SocialIcon = styled.a`
  &:hover {
    color: var(--primary);
    transition: color 0.2s;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
`;

const ScrollDownButton = styled.a`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted-foreground);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
  z-index: 20; /* Ensure it's above other elements */

  &:hover {
    color: var(--primary);
  }

  .text {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.8;
  }

  .icon {
    animation: ${bounce} 2s infinite;
  }
`;
