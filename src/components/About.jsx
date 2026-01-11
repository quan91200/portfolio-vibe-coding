import styled from "styled-components";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <StyledAbout id="about">
      <Content>
        <h2 className="section-title">{t("common.about_me")}</h2>
        <Paragraph>
          {t("about.p1")}
        </Paragraph>
        <Paragraph>
          {t("about.p2_start")}
          <Bold>{t("about.p2_startup")}</Bold>,
          <Bold>{t("about.p2_agency")}</Bold>,
          <Bold>{t("about.p2_corp")}</Bold>
          {t("about.p2_end")}
        </Paragraph>
        <Paragraph>
          {t("about.p3")}
        </Paragraph>
      </Content>
    </StyledAbout>
  );
};

export default About;

const StyledAbout = styled.section`
  padding: 5rem 0;
`;

const Content = styled.div`
  @media (min-width: 768px) {
    max-width: 800px;
    margin: 0 auto;
  }
`;

const Paragraph = styled.p`
  color: var(--muted-foreground);
  font-size: 1.125rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
`;

const Bold = styled.span`
  font-weight: 600;
  color: var(--foreground);
`;
