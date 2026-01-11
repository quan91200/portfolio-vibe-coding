import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <StyledContact id="contact">
      <ContactContainer>
        <Header>
          <h2 className="section-title">{t("contact.title")}</h2>
          <Subtitle>{t("contact.subtitle")}</Subtitle>
        </Header>

        <ContentWrapper>
          <ContactInfo>
            <InfoCard>
              <IconBox>
                <Mail size={24} />
              </IconBox>
              <InfoText>
                <h4>{t("contact.email")}</h4>
                <p>xb91200@gmail.com</p>
              </InfoText>
            </InfoCard>

            <InfoCard>
              <IconBox>
                <MapPin size={24} />
              </IconBox>
              <InfoText>
                <h4>{t("contact.info_title")}</h4>
                <p>{t("contact.location")}</p>
              </InfoText>
            </InfoCard>
          </ContactInfo>

          <ActionArea>
            <ContactBtns>
              <StyledButton size="lg" variant="default">
                <Send className="mr-2 h-5 w-5" /> {t("contact.send")}
              </StyledButton>
              <StyledButton size="lg" variant="outline">
                <MessageSquare className="mr-2 h-5 w-5" /> {t("contact.schedule")}
              </StyledButton>
            </ContactBtns>
          </ActionArea>
        </ContentWrapper>
      </ContactContainer>
    </StyledContact>
  );
};

export default Contact;

const StyledContact = styled.section`
  padding: 8rem 0;
  position: relative;
`;

const ContactContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--muted-foreground);
  max-width: 600px;
  margin: 1rem auto 0;
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary);
    transform: translateX(10px);
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoText = styled.div`
  h4 {
    margin: 0;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted-foreground);
  }
  p {
    margin: 0.25rem 0 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--foreground);
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  width: 100%
  justify-content: center
`
