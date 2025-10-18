// Sample job descriptions for testing the AI matching system

export const sampleJobDescriptions = {
  softwareEngineer: `Software Engineer - Full Stack
TechCorp Solutions
San Francisco, CA | Remote Available
$120,000 - $150,000

Job Description:
We are seeking a talented Full Stack Software Engineer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.

Key Responsibilities:
- Design and develop scalable web applications using React and Node.js
- Collaborate with cross-functional teams to define and implement new features
- Write clean, maintainable, and efficient code
- Participate in code reviews and technical discussions
- Troubleshoot and debug applications
- Optimize applications for maximum speed and scalability

Required Skills:
- 3+ years of experience in software development
- Proficiency in JavaScript, TypeScript, React, and Node.js
- Experience with databases (PostgreSQL, MongoDB)
- Knowledge of version control systems (Git)
- Understanding of RESTful APIs and microservices architecture
- Experience with cloud platforms (AWS, Azure)

Preferred Skills:
- Experience with Docker and Kubernetes
- Knowledge of CI/CD pipelines
- Familiarity with GraphQL
- Experience with testing frameworks (Jest, Cypress)
- Understanding of Agile development methodologies

Education:
Bachelor's degree in Computer Science or related field

Benefits:
- Competitive salary and equity package
- Health, dental, and vision insurance
- 401(k) with company matching
- Flexible PTO policy
- Remote work options
- Professional development budget`,

  dataScientist: `Data Scientist
Analytics Inc.
New York, NY
$110,000 - $140,000

Job Description:
We are looking for a passionate Data Scientist to turn data into insights that drive business decisions. You will work with large datasets to identify trends and patterns.

Key Responsibilities:
- Analyze complex datasets to extract meaningful insights
- Develop machine learning models and algorithms
- Create data visualizations and reports
- Collaborate with stakeholders to understand business requirements
- Present findings to technical and non-technical audiences
- Maintain and optimize existing data pipelines

Required Skills:
- 2+ years of experience in data science or analytics
- Proficiency in Python, R, and SQL
- Experience with machine learning libraries (scikit-learn, TensorFlow, PyTorch)
- Knowledge of statistical analysis and hypothesis testing
- Experience with data visualization tools (Tableau, PowerBI, matplotlib)
- Strong problem-solving and analytical skills

Preferred Skills:
- Experience with big data technologies (Spark, Hadoop)
- Knowledge of cloud platforms (AWS, GCP)
- Experience with A/B testing
- Familiarity with MLOps practices
- Experience with deep learning

Education:
Master's degree in Data Science, Statistics, Mathematics, or related field

Benefits:
- Competitive salary
- Health and wellness benefits
- Learning and development opportunities
- Flexible work arrangements`,

  frontendDeveloper: `Frontend Developer
StartupXYZ
Austin, TX | Hybrid
$80,000 - $110,000

Job Description:
Join our dynamic startup as a Frontend Developer and help build beautiful, user-friendly interfaces that our customers love.

Key Responsibilities:
- Develop responsive web applications using React and modern CSS
- Implement pixel-perfect designs from Figma mockups
- Optimize applications for performance and accessibility
- Write unit and integration tests
- Collaborate with designers and backend developers
- Participate in agile development processes

Required Skills:
- 2+ years of frontend development experience
- Proficiency in HTML, CSS, JavaScript, and TypeScript
- Strong experience with React and modern frontend frameworks
- Knowledge of responsive design and CSS frameworks
- Experience with version control (Git)
- Understanding of web accessibility standards

Preferred Skills:
- Experience with Next.js or similar frameworks
- Knowledge of state management libraries (Redux, Zustand)
- Familiarity with testing libraries (Jest, React Testing Library)
- Experience with build tools (Webpack, Vite)
- Basic understanding of backend technologies

Education:
Bachelor's degree in Computer Science, Web Development, or equivalent experience

Benefits:
- Competitive salary and equity
- Health insurance
- Flexible schedule
- Professional development budget
- Modern office with great snacks`,

  productManager: `Product Manager
InnovateCorp
Seattle, WA | Remote
$130,000 - $160,000

Job Description:
We're seeking an experienced Product Manager to drive the strategy and execution of our core product offerings. You'll work cross-functionally to deliver products that delight customers.

Key Responsibilities:
- Define product strategy and roadmap
- Conduct market research and competitive analysis
- Gather and prioritize product requirements
- Work closely with engineering, design, and marketing teams
- Analyze product metrics and user feedback
- Lead product launches and go-to-market strategies

Required Skills:
- 4+ years of product management experience
- Strong analytical and problem-solving skills
- Experience with product management tools (Jira, Confluence, Figma)
- Understanding of agile development methodologies
- Excellent communication and presentation skills
- Data-driven decision making

Preferred Skills:
- Experience in B2B SaaS products
- Technical background or engineering experience
- Knowledge of user research and design thinking
- Experience with A/B testing and experimentation
- MBA or advanced degree

Education:
Bachelor's degree in Business, Engineering, or related field

Benefits:
- Competitive compensation package
- Comprehensive health benefits
- Unlimited PTO
- Remote work flexibility
- Stock options
- Learning stipend`,

  marketingManager: `Digital Marketing Manager
GrowthCo
Los Angeles, CA
$70,000 - $95,000

Job Description:
We're looking for a creative and data-driven Digital Marketing Manager to lead our online marketing efforts and drive customer acquisition.

Key Responsibilities:
- Develop and execute digital marketing campaigns across multiple channels
- Manage social media presence and content strategy
- Analyze campaign performance and optimize for ROI
- Collaborate with content creators and designers
- Manage marketing budget and vendor relationships
- Stay current with digital marketing trends and best practices

Required Skills:
- 3+ years of digital marketing experience
- Proficiency in Google Analytics, Google Ads, and social media platforms
- Experience with email marketing and marketing automation
- Strong analytical skills and data interpretation
- Excellent written and verbal communication
- Project management and organizational skills

Preferred Skills:
- Experience with SEO and content marketing
- Knowledge of marketing automation platforms (HubSpot, Marketo)
- Familiarity with A/B testing and conversion optimization
- Experience with influencer marketing
- Basic design skills (Canva, Adobe Creative Suite)

Education:
Bachelor's degree in Marketing, Communications, or related field

Benefits:
- Competitive salary
- Health and dental insurance
- Professional development opportunities
- Flexible work schedule
- Creative work environment`
};

export const getRandomJobDescription = (): string => {
  const jobs = Object.values(sampleJobDescriptions);
  const randomIndex = Math.floor(Math.random() * jobs.length);
  return jobs[randomIndex];
};

export default sampleJobDescriptions;