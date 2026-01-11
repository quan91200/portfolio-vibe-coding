import React, {
  useState,
  useEffect,
  useMemo
} from "react"
import styled, { keyframes, css } from "styled-components"
import axios from "axios"
import { useTranslation } from "react-i18next"
import {
  Github,
  ExternalLink,
  Code,
  LayoutGrid,
  List,
  Loader2,
  Star,
  GitFork
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
} from "@/components/ui/card"

const GITHUB_USERNAME = "quan91200"
const API_URL = "https://api.github.com"
const CACHE_KEY = "github_repos_minimal_cache"
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours for minimal data

const FALLBACK_REPOS = [
  {
    id: 1,
    name: "NES Web Emulator",
    description: "Trình giả lập NES (Nintendo Entertainment System) chạy trực tiếp trên trình duyệt web với đầy đủ tính năng quản lý game và tùy chỉnh phím điều khiển.",
    language: "JavaScript",
    stargazers_count: 12,
    forks_count: 5,
    html_url: `https://github.com/quan91200/nes-game`,
    homepage: `https://nes-game-eta.vercel.app/`,
    ogImage: `/contra.png`
  },
  {
    id: 2,
    name: "react-ui-library",
    description: "Modern and accessible UI components for building beautiful web applications.",
    language: "TypeScript",
    stargazers_count: 8,
    forks_count: 2,
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    homepage: "https://example.com",
    ogImage: `https://opengraph.githubassets.com/1`
  }
]

/**
 * Projects component - Optimized version (1 API call)
 * Minimalist fetching to avoid GitHub API rate limits
 */
const Projects = () => {
  const { t } = useTranslation()
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewType, setViewType] = useState("grid")

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)

        // 1. Check Cache
        const cachedStr = localStorage.getItem(CACHE_KEY)
        if (cachedStr) {
          const { data, timestamp } = JSON.parse(cachedStr)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setRepos(data)
            setLoading(false)
            return
          }
        }

        // 2. Fetch only the core repo list (Only 1 API request!)
        const { data: repoData } = await axios.get(`${API_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)

        const mappedRepos = repoData.map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          html_url: repo.html_url,
          homepage: repo.homepage,
          ogImage: `https://opengraph.githubassets.com/1`
        }))

        // 3. Save to Cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: mappedRepos,
          timestamp: Date.now()
        }))

        setRepos(mappedRepos)
      } catch (err) {
        console.error("GitHub API error:", err)
        const cachedStr = localStorage.getItem(CACHE_KEY)
        if (cachedStr) {
          const { data } = JSON.parse(cachedStr)
          setRepos(data)
        } else {
          setRepos(FALLBACK_REPOS)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  const displayedRepos = useMemo(() => {
    return viewType === "grid" ? repos.slice(0, 3) : repos.slice(0, 5)
  }, [repos, viewType])

  if (loading) {
    return (
      <StatusContainer>
        <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        <p>{t("projects.loading")}</p>
      </StatusContainer>
    )
  }

  return (
    <StyledProjects id="projects">
      <div className="container">
        <ProjectsHeader>
          <h2 className="section-title">{t("common.selected_works")}</h2>
          <ProjectsSubtitle>{t("projects.subtitle")}</ProjectsSubtitle>

          <ViewToggle>
            <ToggleBtn
              $active={viewType === "grid"}
              onClick={() => setViewType("grid")}
              aria-label={t("projects.grid_view")}
            >
              <LayoutGrid size={20} />
            </ToggleBtn>
            <ToggleBtn
              $active={viewType === "list"}
              onClick={() => setViewType("list")}
              aria-label={t("projects.list_view")}
            >
              <List size={20} />
            </ToggleBtn>
          </ViewToggle>
        </ProjectsHeader>

        <ProjectsGrid $viewType={viewType}>
          {displayedRepos.map((repo, index) => (
            <FadeIn key={repo.id} $delay={index * 0.1}>
              <StyledCard $viewType={viewType}>
                <ProjectImageContainer $viewType={viewType} className="project-image">
                  <img
                    src={repo.ogImage || "https://opengraph.githubassets.com/1"}
                    alt={repo.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://opengraph.githubassets.com/1";
                    }}
                  />
                  <div className="mesh-fallback">
                    <Code size={48} className="icon" />
                  </div>
                </ProjectImageContainer>

                <div className="content-wrapper">
                  <HeaderSection>
                    <TitleArea $viewType={viewType}>
                      <h3 className="title">
                        {repo.name}
                      </h3>
                      <RepoStats>
                        <StatItem title="Stars">
                          <Star size={14} />
                          <span>{repo.stargazers_count}</span>
                        </StatItem>
                        <StatItem title="Forks">
                          <GitFork size={14} />
                          <span>{repo.forks_count}</span>
                        </StatItem>
                      </RepoStats>
                    </TitleArea>
                    <Description className="desc">
                      {repo.description || "Project exploring modern web technologies and best practices."}
                    </Description>
                  </HeaderSection>

                  {repo.language && (
                    <TagSection>
                      <TechBadge>{repo.language}</TechBadge>
                    </TagSection>
                  )}

                  <FooterSection>
                    <Button
                      variant="outline"
                      size="sm"
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} className="mr-2" />
                      {t("projects.code")}
                    </Button>
                    {repo.homepage && (
                      <Button
                        size="sm"
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        {t("projects.demo")}
                      </Button>
                    )}
                  </FooterSection>
                </div>
              </StyledCard>
            </FadeIn>
          ))}
        </ProjectsGrid>

        <BrowseMore>
          <Button
            variant="outline"
            size="lg"
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-2" />
            {t("projects.view_github")}
          </Button>
        </BrowseMore>
      </div>
    </StyledProjects>
  )
}

export default Projects

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0
    transform: translateY(30px)
  }
  to {
    opacity: 1
    transform: translateY(0)
  }
`

const meshAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0deg) }
  50% { transform: translate(-10%, 10%) rotate(5deg) }
  100% { transform: translate(0, 0) rotate(0deg) }
`

const FadeIn = styled.div`
  opacity: 0
  animation: ${fadeInUp} 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards
  animation-delay: ${props => props.$delay}s
`

// Styled Components
const StyledProjects = styled.section`
  padding: 10rem 0
  position: relative
`

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  gap: 1.5rem;
  color: var(--muted-foreground);
  
  p {
    font-size: 1.125rem;
    letter-spacing: 0.05em;
  }
`

const ProjectsHeader = styled.div`
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  margin-bottom: 5rem
`

const ProjectsSubtitle = styled.p`
  font-size: 1.25rem
  color: var(--muted-foreground)
  max-width: 600px
  margin-bottom: 2.5rem
  line-height: 1.6
`

const ViewToggle = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`

const ToggleBtn = styled.button`
  background: ${props => (props.$active ? "var(--background)" : "transparent")};
  color: ${props => (props.$active ? "var(--primary)" : "var(--muted-foreground)")};
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => props.$active && css`
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  `}

  &:hover {
    color: var(--primary);
    background: ${props => (props.$active ? "var(--background)" : "rgba(255,255,255,0.05)")};
  }
`

const ProjectsGrid = styled.div`
  display: ${props => (props.$viewType === "grid" ? "grid" : "flex")};
  flex-direction: ${props => (props.$viewType === "list" ? "column" : "row")};
  gap: 2.5rem;
  grid-template-columns: ${props => (props.$viewType === "grid" ? "repeat(3, 1fr)" : "none")};
  padding: 2rem 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: ${props => (props.$viewType === "grid" ? "repeat(2, 1fr)" : "none")};
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-template-columns: none;
    gap: 2rem;
  }
`

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: ${props => (props.$viewType === "grid" ? "column" : "row")};
  height: 100%;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(129, 140, 248, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  &:hover {
    cursor: pointer;
    border-color: rgba(129, 140, 248, 0.4);
    box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.7);
    
    &::after {
      opacity: 1;
    }

    .project-image img {
      transform: scale(1.1);
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem 2rem;
    position: relative;
    z-index: 1;
  }
`

const ProjectImageContainer = styled.div`
  height: ${props => (props.$viewType === "list" ? "auto" : "200px")};
  min-width: ${props => (props.$viewType === "list" ? "320px" : "100%")};
  max-width: ${props => (props.$viewType === "list" ? "320px" : "100%")};
  background: var(--secondary);
  position: relative;
  overflow: hidden;
  border-bottom: ${props => (props.$viewType === "grid" ? "1px solid var(--border)" : "none")};
  border-right: ${props => (props.$viewType === "list" ? "1px solid var(--border)" : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: absolute;
    inset: 0;
    z-index: 2;
  }

  .mesh-fallback {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 30%, rgba(129, 140, 248, 0.2), transparent),
                radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15), transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${meshAnimation} 15s infinite linear alternate;
    z-index: 1;
    
    .icon {
      color: var(--primary);
      opacity: 0.3;
    }
  }

  @media (max-width: 1024px) {
    min-width: 100%;
    height: 240px;
  }
`

const HeaderSection = styled.div`
  margin-bottom: .5rem;
`

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--foreground);
    margin: 0;
    letter-spacing: -0.02em;
    overflow-wrap: anywhere;
    word-break: break-word;
    line-height: 1.2;
    
    &::before {
      content: "# ";
      color: var(--primary);
      opacity: 0.5;
      font-weight: 400;
    }
  }
`

const RepoStats = styled.div`
  display: flex;
  gap: 0.6rem;
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted-foreground);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary);
    border-color: var(--primary);
    background: rgba(129, 140, 248, 0.05);
  }
`

const Description = styled.p`
  font-size: 1rem;
  color: var(--muted-foreground);
  line-height: 1.7;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 5.1rem;

  &::before {
    content: "## ";
    color: var(--primary);
    opacity: 0.4;
    font-weight: 400;
  }
`

const TagSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: .5rem;
`

const TechBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary);
  background: rgba(129, 140, 248, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 99px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
  }
`

const FooterSection = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 2rem;
  
  a {
    flex: 1;
    justify-content: center;
  }
`

const BrowseMore = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`
