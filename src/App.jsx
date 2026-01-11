import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundRenderer from "@/components/backgrounds/BackgroundRenderer";

function App() {
  return (
    <>
      <BackgroundRenderer />
      <AppMain>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </AppMain>
    </>
  );
}

export default App;

const AppMain = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;

  /* Centralized Container Logic */
  nav > div:first-child,
  footer > div:first-child,
  main > section > div:not(.hero-bg-blur):last-child,
  main > section > .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    width: 100%;
  }
`;
