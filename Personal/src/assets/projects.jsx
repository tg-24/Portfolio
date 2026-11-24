export { projects };

const projects = [
  {
    title: "Eritrean Community Website",
    brief_description:
      "A full-stack web application for the Eritrean community in Malden, MA to share events, resources, and cultural information.",
    full_description:
      "A full-stack web application that promotes community engagement through event management, user registration, and cultural resources. Built with a responsive React frontend and a Django REST API, the platform incorporates session-based authentication, administrative permissions, event registration, and relational database management.",
    skills: ["React", "Django", "PostgreSQL", "REST API"],
    full_skills: [
      "React",
      "JavaScript",
      "Python",
      "Django REST Framework",
      "PostgreSQL",
      "Authentication",
      "Responsive Design",
    ],
    bullets: [
      "Developed a full-stack web application using React, Django REST Framework, and PostgreSQL.",
      "Implemented secure session-based authentication, CSRF protection, and role-based permissions.",
      "Designed an event management system supporting event creation, registration, and participant tracking.",
      "Built a responsive user interface to promote community engagement and cultural awareness.",
    ],
    link: "https://github.com/tg-24/Portfolio/tree/8fc07c0be759335295319d36f7c7ae867091037f/Eritrean-Website",
    video: `${import.meta.env.BASE_URL}Eritrean_Community.mp4`,
    image: `${import.meta.env.BASE_URL}Eritrean_Community.png`,
  },
  {
    title: "Heart Disease Prediction Program",
    brief_description:
      "A Python-based medical application that collects patient health information and uses machine learning to assess the likelihood of heart disease.",
    full_description:
      "An interactive medical application designed to assess the likelihood of heart disease using supervised machine learning. The application features a graphical user interface that collects patient health indicators, including age, blood pressure, cholesterol levels, chest pain type, and heart rate, and processes these inputs to generate a prediction.",
    skills: ["Python", "Machine Learning", "Tkinter", "Data Processing"],
    full_skills: [
      "Python",
      "Tkinter",
      "Scikit-learn",
      "Supervised Learning",
      "Data Preprocessing",
      "GUI Development",
    ],
    bullets: [
      "Developed a Python-based application that utilizes supervised machine learning to predict the likelihood of heart disease.",
      "Designed an interactive graphical user interface using Tkinter to collect patient health information.",
      "Processed patient health indicators, including age, cholesterol levels, blood pressure, and heart rate, for predictive analysis.",
      "Integrated a machine learning model with the graphical interface to generate predictions based on user inputs.",
    ],
    link: "https://github.com/tg-24/IO_TG_Medical_Program.git",
    video: `${import.meta.env.BASE_URL}Medical.mp4`,
    image: `${import.meta.env.BASE_URL}Medical.png`,
  },
  {
    title: "Collaborative Code Sharing Platform",
    brief_description:
      "A full-stack educational platform that enables instructors to manage assignments and students to share code, collaborate, and receive peer feedback.",
    full_description:
      "A full-stack educational application developed in a collaborative team environment to streamline code sharing and peer review. The platform enables instructors to manage classes and assignments while allowing students to upload code, review group submissions, and provide line-specific feedback through an interactive commenting system.",
    skills: ["React", "Django", "REST APIs", "Team Development"],
    full_skills: [
      "React",
      "JavaScript",
      "Python",
      "Django REST Framework",
      "API Integration",
      "Git (GitLab)",
      "Collaborative Development",
    ],
    bullets: [
      "Collaborated with a development team to build a full-stack educational platform for code sharing and peer review.",
      "Developed instructor and student interfaces supporting class and assignment management.",
      "Integrated code submission and line-specific commenting functionality to facilitate peer feedback.",
      "Utilized Git for version control, collaborative development, and code integration.",
    ],
    link: "https://github.com/tg-24/Portfolio/tree/8be336ecb031a5ac906f5e870387ab287f04a3d9/blue_footed_booby",
    video: `${import.meta.env.BASE_URL}blue_footed_booby.mp4`,
    image: `${import.meta.env.BASE_URL}blue_footed_booby.png`,
  },
];
