"use client";

import React, { useState } from 'react';
import ActionButton from './ActionButton';

// Icons for the buttons
const BuildIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>
);

const LongevityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MarketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
  </svg>
);

// New icons for additional buttons
const CompetitiveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
  </svg>
);

const InvestmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const RiskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const TrendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

const StartupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

interface ActionButtonsProps {
  activeButton?: string | null;
  onButtonClick?: (buttonName: string) => void;
  userInput?: string; // The search query or business idea input by the user
  addBotMessage?: (message: any) => void; // Function to add a bot message to the chat
  isLoading?: boolean; // Indicates if a request is in progress
  setIsLoading?: (loading: boolean) => void; // Function to set the loading state
  conversationHistory?: Array<{role: string, content: string}>; // Chat history for context
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  activeButton, 
  onButtonClick,
  userInput,
  addBotMessage,
  isLoading,
  setIsLoading,
  conversationHistory = []
}) => {
  const [showMore, setShowMore] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Generic API call function
  const callAgentAPI = async (endpoint: string, idea: string) => {
    if (!idea || !addBotMessage || !setIsLoading) {
      console.error("Missing required props for API call");
      return;
    }

    try {
      setIsLoading(true);
      
      // Get the last 10 messages from conversation history (if available)
      const recentHistory = conversationHistory ? 
        conversationHistory.slice(-10) : 
        [];
      
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idea, 
          conversation_history: recentHistory 
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle How To Build button
  const handleBuildClick = async () => {
    try {
      if (!userInput || isLoading) return;
      
      // Add a loading message
      addBotMessage({
        role: 'assistant',
        content: `Generating a build plan for "${userInput}"...`,
        loading: true
      });

      const data = await callAgentAPI('build-plan', userInput);
      console.log("Build plan API response:", data);
      
      // Check if the response is from ChatGPT or the fallback template
      if (data.source === "chatgpt") {
        // For ChatGPT responses, use the content directly (it's already formatted)
        addBotMessage({
          role: 'assistant',
          content: data.content
        });
      } else {
        // For fallback template responses, use the old formatting
        addBotMessage({
          role: 'assistant',
          content: `# Build Plan for: ${userInput}\n\n` +
            `## Timeline\n` +
            (data.timeline && typeof data.timeline === 'object' ? 
              `- MVP Development: ${data.timeline.mvp || 'N/A'}\n` +
              `- Beta Testing: ${data.timeline.beta || 'N/A'}\n` +
              `- Launch Preparation: ${data.timeline.launch || 'N/A'}\n\n` :
              `- Timeline data not available\n\n`) +
            
            `## Steps\n` +
            (Array.isArray(data.steps) ? 
              data.steps.map((step: any, index: number) => 
                `${index + 1}. **${step.name || 'Step ' + (index + 1)}** (${step.start || 'N/A'} to ${step.end || 'N/A'})\n`
              ).join('\n') :
              'Step data not available') + '\n\n' +
            
            `## Recommended Tech Stack\n` +
            (Array.isArray(data.recommended_stack) ? 
              data.recommended_stack.map((tech: string) => `- ${tech}`).join('\n') :
              'Tech stack data not available') + '\n\n' +
            
            `## Resources Required\n` +
            (data.resources && typeof data.resources === 'object' ? 
              (data.resources.team ? 
                `- Developers: ${data.resources.team.developers || 'N/A'}\n` +
                `- Designers: ${data.resources.team.designers || 'N/A'}\n` +
                `- Data Scientists: ${data.resources.team.data_scientists || 'N/A'}\n` :
                '') +
              `- Estimated Cost: ${data.resources.cost || 'N/A'}\n\n` :
              'Resource data not available\n\n') +
            
            `## Similar Projects\n` +
            (Array.isArray(data.similar_projects) ? 
              data.similar_projects.map((project: any) => 
                `- **${project.title || 'Unnamed Project'}**\n` +
                `  Tech: ${Array.isArray(project.stack) ? project.stack.join(', ') : 'N/A'}\n` +
                `  Timeline: ${project.timeline ? JSON.stringify(project.timeline) : 'N/A'}\n`
              ).join('\n') :
              'Similar project data not available') + '\n\n' +
            
            (Array.isArray(data.potential_pivots) ? 
              `## Potential Pivots\n` + data.potential_pivots.map((pivot: any) => 
                `- ${typeof pivot === 'string' ? pivot : (pivot.suggestion || 'Unnamed pivot')}`
              ).join('\n') :
              '')
        });
      }
    } catch (error) {
      console.error("Build plan API error:", error);
      // Handle error
      addBotMessage({
        role: 'assistant',
        content: "I'm sorry, there was an error generating the build plan. Please try again later."
      });
    }
  };

  // Handle Longevity Predictor button
  const handleLongevityClick = async () => {
    try {
      if (!userInput || isLoading) return;
      
      // Add a loading message
      addBotMessage({
        role: 'assistant',
        content: `Analyzing market longevity for "${userInput}"...`,
        loading: true
      });

      const data = await callAgentAPI('longevity-prediction', userInput);
      console.log("Longevity API response:", data);
      
      // Check if the response is from ChatGPT or the fallback template
      if (data.source === "chatgpt") {
        // For ChatGPT responses, use the content directly (it's already formatted)
        addBotMessage({
          role: 'assistant',
          content: data.content
        });
      } else {
        // For fallback template responses, use the old formatting
        addBotMessage({
          role: 'assistant',
          content: `# Market Longevity Analysis for: ${userInput}\n\n` +
            `## Longevity Score: ${data.longevity_score || 'N/A'}/100\n\n` +
            
            `## Market Windows\n` +
            (data.marketing_windows && Array.isArray(data.marketing_windows) ? 
              data.marketing_windows.map((window: any) => 
                `- ${window.phase || 'Phase'}: ${window.year_range || 'N/A'} - ${window.strategy || 'N/A'}`
              ).join('\n') :
              `- Data not available\n`) + '\n\n' +
            
            `## Google Trends Analysis\n` +
            (data.trend_data ? 
              `- Overall Score: ${data.trend_data.overall_score || 'N/A'}/100\n` +
              `- Growth Rate: ${data.trend_data.overall_growth || 'N/A'}x\n\n` :
              `- Trend data not available\n\n`) +
            
            `## Historical Analog\n` +
            (data.historical_analog && data.historical_analog.historical_analog ? 
              `- Similar Technology: ${data.historical_analog.historical_analog.name || 'N/A'}\n` +
              `- Market Category: ${data.historical_analog.category || 'N/A'}\n` +
              `- Peak Year: ${data.historical_analog.historical_analog.peak_year || 'N/A'}\n` +
              `- Market Cap at Peak: ${data.historical_analog.historical_analog.market_cap || 'N/A'}\n\n` :
              `- Historical data not available\n\n`) +
            
            `## Adoption Curve\n` +
            (data.adoption_curve && Array.isArray(data.adoption_curve) ? 
              data.adoption_curve.map((point: any) => 
                `- Year ${point.year || '?'}: ${point.adoption || 'N/A'}%`
              ).join('\n') :
              `- Adoption data not available`) + '\n\n' +
            
            `## Market Factors\n` + 
            (data.market_factors && Array.isArray(data.market_factors) ? 
              data.market_factors.map((factor: any) => 
                `- ${factor.factor || 'Factor'}: ${factor.score || 'N/A'}/10 (${factor.impact || 'N/A'} impact)`
              ).join('\n') :
              `- Market factor data not available`)
        });
      }
    } catch (error) {
      console.error("Longevity API error:", error);
      // Handle error
      addBotMessage({
        role: 'assistant',
        content: "I'm sorry, there was an error analyzing market longevity. Please try again later."
      });
    }
  };

  // Handle Consumer Market Analysis button
  const handleMarketClick = async () => {
    try {
      if (!userInput || isLoading) return;
      
      // Add a loading message
      addBotMessage({
        role: 'assistant',
        content: `Analyzing consumer market for "${userInput}"...`,
        loading: true
      });

      const data = await callAgentAPI('market-analysis', userInput);
      console.log("Market analysis API response:", data);
      
      // Check if the response is from ChatGPT or the fallback template
      if (data.source === "chatgpt") {
        // For ChatGPT responses, use the content directly (it's already formatted)
        addBotMessage({
          role: 'assistant',
          content: data.content
        });
      } else {
        // For fallback template responses, use the old formatting
        addBotMessage({
          role: 'assistant',
          content: `# Consumer Market Analysis for: ${userInput}\n\n` +
            `## Target Segments\n` +
            (Array.isArray(data.segments) ? 
              data.segments.map((segment: any, index: number) => 
                `### ${index + 1}. ${segment.name || 'Segment ' + (index + 1)}\n` +
                `- Age Range: ${segment.age_range || 'N/A'}\n` +
                `- Gender Ratio: ${segment.gender_ratio ? (`${segment.gender_ratio.male || 0}% male, ${segment.gender_ratio.female || 0}% female`) : 'N/A'}\n` +
                `- Income Level: ${segment.income || 'N/A'}\n` +
                `- Market Size: ${segment.market_size ? segment.market_size.toLocaleString() : 'N/A'} users (${segment.market_percentage || 'N/A'}%)\n` +
                `- Targeting Priority: ${segment.targeting_priority || 'N/A'}\n`
              ).join('\n') :
              'Segment data not available') + '\n\n' +
            
            `## Total Addressable Market\n` +
            (data.market_size ? 
              `- Total Users: ${data.market_size.total_users ? data.market_size.total_users.toLocaleString() : 'N/A'}\n` +
              `- Average Revenue Per User: $${data.market_size.arpu || 'N/A'}\n` +
              `- TAM: $${data.market_size.tam ? data.market_size.tam.toLocaleString() : 'N/A'} ${data.market_size.currency || 'USD'}\n\n` :
              `- Market size data not available\n\n`) +
            
            `## Pain Points\n` +
            (Array.isArray(data.pain_points) ? 
              data.pain_points.map((pain: any, index: number) => 
                `### ${index + 1}. ${pain.issue || 'Issue ' + (index + 1)}\n` +
                `- Sentiment Score: ${pain.sentiment_score || 'N/A'}\n` +
                `- Frequency: ${pain.frequency || 'N/A'} mentions\n` +
                `- Impact: ${pain.impact || 'N/A'}\n` +
                `- Example Quote: "${pain.typical_quote || 'N/A'}"\n`
              ).join('\n') :
              'Pain point data not available') + '\n\n' +
            
            `## Geographic Insights\n` +
            (data.geographic_insights ? 
              `### Top Countries\n` +
              (Array.isArray(data.geographic_insights.top_countries) ? 
                data.geographic_insights.top_countries.map((country: any, index: number) => 
                  `${index + 1}. **${country.country || 'Country ' + (index + 1)}** (${country.region || 'N/A'})\n` +
                  `   - Market Potential: ${country.market_potential || 'N/A'}/100\n` +
                  `   - Growth Rate: ${country.growth_rate || 'N/A'}\n`
                ).join('\n') :
                'Country data not available') :
              'Geographic data not available') + '\n\n' +
            
            `## Feature Recommendations\n` +
            (Array.isArray(data.feature_recommendations) ? 
              data.feature_recommendations.map((rec: any, index: number) => 
                `${index + 1}. **${rec.feature || 'Feature ' + (index + 1)}**\n` +
                `   - Addresses: ${rec.pain_point || 'N/A'}\n` +
                `   - Priority: ${rec.priority || 'N/A'}\n` +
                `   - Expected Impact: ${rec.expected_impact || 'N/A'}\n`
              ).join('\n') :
              'Feature recommendation data not available') + '\n\n' +
            
            `## Sentiment Overview\n` +
            (data.sentiment_overview ? 
              Object.entries(data.sentiment_overview).map(([sentiment, percentage]) => 
                `- ${sentiment}: ${percentage}%`
              ).join('\n') :
              'Sentiment data not available')
        });
      }
    } catch (error) {
      console.error("Market analysis API error:", error);
      // Handle error
      addBotMessage({
        role: 'assistant',
        content: "I'm sorry, there was an error analyzing the consumer market. Please try again later."
      });
    }
  };

  const handleButtonClick = (buttonName: string) => {
    if (onButtonClick) {
      onButtonClick(buttonName);
    }
    
    // Check if user has entered any input
    if (!userInput && addBotMessage) {
      addBotMessage({
        role: 'assistant',
        content: "Please enter a business idea or question first before using these tools. For example, try asking about 'An AI-powered fitness app' or 'A subscription box for organic products'."
      });
      return;
    }
    
    // Call the appropriate function based on the button clicked
    switch (buttonName) {
      case 'build':
        handleBuildClick();
        break;
      case 'longevity':
        handleLongevityClick();
        break;
      case 'market':
        handleMarketClick();
        break;
      default:
        // For other buttons not yet implemented
        if (addBotMessage) {
          addBotMessage({
            role: 'assistant',
            content: `The ${buttonName} feature is coming soon! Please try one of the other tools available.`
          });
        }
        break;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-2 mt-1 mb-1 bg-gray-800/40 py-2 px-3 rounded-lg backdrop-blur-sm border-t border-b border-gray-700/30">
        <div className="flex justify-center flex-wrap gap-2 w-full">
          <ActionButton 
            icon={<BuildIcon />} 
            label="How To Build" 
            active={activeButton === 'build'}
            onClick={() => handleButtonClick('build')}
          />
          <ActionButton 
            icon={<LongevityIcon />} 
            label="Longevity Predictor" 
            active={activeButton === 'longevity'}
            onClick={() => handleButtonClick('longevity')}
          />
          <ActionButton 
            icon={<MarketIcon />} 
            label="Consumer Market Analysis" 
            active={activeButton === 'market'}
            onClick={() => handleButtonClick('market')}
          />
          <ActionButton 
            icon={<CompetitiveIcon />} 
            label="Competitive Landscape" 
            active={activeButton === 'competitive'}
            onClick={() => handleButtonClick('competitive')}
          />
        
          {/* Toggle button for additional options */}
          <button 
            onClick={() => setShowMore(!showMore)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-800/60 hover:bg-gray-700/70 text-gray-300 hover:text-white border border-gray-700/50 transition-all ${showMore ? 'bg-gray-700/70' : ''}`}
          >
            {showMore ? 'Show Less' : 'More Options'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className={`w-3 h-3 transition-transform ${showMore ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Additional buttons row that appears when "More Options" is clicked */}
      {showMore && (
        <div className="flex justify-center flex-wrap gap-2 mt-2 mb-1 bg-gray-800/40 py-2 px-3 rounded-lg backdrop-blur-sm border-t border-b border-gray-700/30">
          <ActionButton 
            icon={<InvestmentIcon />} 
            label="Investment Opportunities" 
            active={activeButton === 'investment'}
            onClick={() => handleButtonClick('investment')}
          />
          <ActionButton 
            icon={<RiskIcon />} 
            label="Risk Assessment" 
            active={activeButton === 'risk'}
            onClick={() => handleButtonClick('risk')}
          />
          <ActionButton 
            icon={<TrendIcon />} 
            label="Trend Forecasting" 
            active={activeButton === 'trend'}
            onClick={() => handleButtonClick('trend')}
          />
          <ActionButton 
            icon={<StartupIcon />} 
            label="Startup Validator" 
            active={activeButton === 'startup'}
            onClick={() => handleButtonClick('startup')}
          />
        </div>
      )}
    </div>
  );
};

export default ActionButtons; 