import React, { useState } from 'react';
import styled from 'styled-components';

// ... (keep all your existing styled-components declarations)
declare global {
  interface ImportMeta {
    env: {
      BASE_URL: string;
      [key: string]: any;
    };
  }
}

const logo = '/logo192.png';


const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavigationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomePage = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 7rem 2rem 2rem; /* Added top padding to account for fixed header */
  text-align: center;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  color: #000;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
`;

const TagLine = styled.div`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 1rem;
  font-weight: 500;
`;

interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${props => props.primary ? '#000' : 'transparent'};
  color: ${props => props.primary ? '#fff' : '#666'};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: ${props => props.primary ? 'none' : '1px solid #666'};
  cursor: pointer;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background-color: ${props => props.primary ? '#222' : '#f5f5f5'};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  gap: 0.5rem;
`;

const RoadmapContainer = styled.div`
  margin-top: 4rem;
  text-align: left;
`;

const Input = styled.input`
    width: 100%;
    padding: 1rem;
    font-size: 1.2rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-bottom: 1rem;
`;

const RoadmapDisplay = styled.div`
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 8px;
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
`;

const App: React.FC = () => {
    const [aspiration, setAspiration] = useState('');
    const [roadmap, setRoadmap] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateRoadmap = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/generate-roadmap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ aspiration }),
            });
            const data = await response.json();
            setRoadmap(data.roadmap);
        } catch (error) {
            console.error('Error generating roadmap:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navigation>
                <NavigationContainer>
                    <Logo>
                        <img src={logo} alt="Chingu" style={{ height: '32px', marginRight: '8px' }} />
                        Chingu
                    </Logo>
                    <NavLinks>
                        <Button>Features</Button>
                        <Button>How it Works</Button>
                        <Button>Get Started</Button>
                        <Button primary>Sign In</Button>
                    </NavLinks>
                </NavigationContainer>
            </Navigation>

            <HomePage>
                <TagLine>AI-Powered Study Companion</TagLine>
                <Title>Turn Your Aspirations Into Structured Learning</Title>
                <Subtitle>
                    Stop wandering without direction. Get personalized roadmaps, focused
                    learning modules, and clear guidance to achieve your goals on time.
                </Subtitle>
                
                <RoadmapContainer>
                    <Input
                        type="text"
                        value={aspiration}
                        onChange={(e) => setAspiration(e.target.value)}
                        placeholder="e.g., I want to build a drone by September 2026"
                    />
                    <Button primary onClick={handleGenerateRoadmap} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Roadmap'}
                    </Button>

                    {roadmap && (
                        <RoadmapDisplay>
                            {roadmap}
                        </RoadmapDisplay>
                    )}
                </RoadmapContainer>

                <Stats>
                    <StatItem>
                        <StatNumber>10k+</StatNumber>
                        <StatLabel>Active Learners</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatNumber>95%</StatNumber>
                        <StatLabel>Goal Achievement</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatNumber>500+</StatNumber>
                        <StatLabel>Learning Paths</StatLabel>
                    </StatItem>
                </Stats>
            </HomePage>
        </>
    );
};

export default App;