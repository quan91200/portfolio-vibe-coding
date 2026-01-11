import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaFigma,
  FaGitAlt,
  FaCss3Alt
} from "react-icons/fa";

import {
  SiNuxtdotjs,
  SiPostgresql,
  SiTypescript
} from "react-icons/si";

const Skills = () => {
  const { t } = useTranslation();

  const skills = useMemo(() => [
    { name: "React", icon: <FaReact />, subtitle: t("skills.react") },
    { name: "Nuxt.js", icon: <SiNuxtdotjs />, subtitle: t("skills.nuxt") },
    { name: "TypeScript", icon: <SiTypescript />, subtitle: t("skills.typescript") },
    { name: "CSS / Modules", icon: <FaCss3Alt />, subtitle: t("skills.css") },
    { name: "Node.js", icon: <FaNodeJs />, subtitle: t("skills.node") },
    { name: "PostgreSQL", icon: <SiPostgresql />, subtitle: t("skills.postgres") },
    { name: "Docker", icon: <FaDocker />, subtitle: t("skills.docker") },
    { name: "AWS", icon: <FaAws />, subtitle: t("skills.aws") },
    { name: "Figma", icon: <FaFigma />, subtitle: t("skills.figma") },
    { name: "Git", icon: <FaGitAlt />, subtitle: t("skills.git") }
  ], [t]);

  return (
    <StyledSkills id="skills">
      <SkillsContainer>
        <h2 className="section-title">{t("common.technical_skills")}</h2>
        <SkillsList>
          {skills.map((skill) => (
            <SkillCard key={skill.name}>
              <IconWrapper>{skill.icon}</IconWrapper>
              <SkillTitle>{skill.name}</SkillTitle>
              <SkillSubtitle>{skill.subtitle}</SkillSubtitle>
            </SkillCard>
          ))}
        </SkillsList>
      </SkillsContainer>
    </StyledSkills>
  );
};

export default Skills;

const StyledSkills = styled.section`
  padding: 5rem 0;
`;

const SkillsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const SkillsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  padding: 2rem 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const SkillCard = styled.div`
  background-color: var(--secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkillTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: var(--foreground);
`;

const SkillSubtitle = styled.p`
  font-size: 0.75rem;
  color: var(--muted-foreground);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
