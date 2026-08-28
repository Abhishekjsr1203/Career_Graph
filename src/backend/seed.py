from database import driver


def seed_database():

    with driver.session() as session:


        roles = [
            {
                "id": "frontend-developer",
                "title": "Frontend Developer",
                "category": "Development",
                "description": "Build responsive and interactive websites using modern frontend technologies.",
                "salary": "₹4 - ₹12 LPA"
            },
            {
                "id": "backend-developer",
                "title": "Backend Developer",
                "category": "Development",
                "description": "Develop server-side applications, APIs, databases, and business logic.",
                "salary": "₹5 - ₹14 LPA"
            },
            {
                "id": "data-scientist",
                "title": "Data Scientist",
                "category": "Data & AI",
                "description": "Analyze complex datasets and build machine learning models to solve problems.",
                "salary": "₹6 - ₹18 LPA"
            },
            {
                "id": "ml-engineer",
                "title": "Machine Learning Engineer",
                "category": "Data & AI",
                "description": "Design, train, and deploy machine learning models for real-world applications.",
                "salary": "₹6 - ₹20 LPA"
            },
            {
                "id": "ui-ux-designer",
                "title": "UI/UX Designer",
                "category": "Design",
                "description": "Create intuitive, attractive, and user-friendly digital experiences.",
                "salary": "₹3 - ₹10 LPA"
            },
            {
                "id": "cloud-engineer",
                "title": "Cloud Engineer",
                "category": "Cloud",
                "description": "Design, manage, and maintain scalable cloud infrastructure and services.",
                "salary": "₹5 - ₹16 LPA"
            }
        ]


        for role in roles:
            session.run(
                """
                MERGE (r:Role {id: $id})
                SET r.title = $title,
                    r.category = $category,
                    r.description = $description,
                    r.salary = $salary
                """,
                role
            )


        skills = [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Git",
            "Python",
            "Java",
            "Node.js",
            "SQL",
            "REST APIs",
            "Pandas",
            "NumPy",
            "Machine Learning",
            "Scikit-learn",
            "TensorFlow",
            "Figma",
            "Wireframing",
            "Prototyping",
            "UX Research",
            "AWS",
            "Azure",
            "Docker",
            "Linux",
            "Networking"
        ]

        for skill in skills:
            skill_id = skill.lower().replace(" ", "-")

            session.run(
                """
                MERGE (s:Skill {id: $id})
                SET s.name = $name
                """,
                {
                    "id": skill_id,
                    "name": skill
                }
            )


        technologies = [
            "React.js",
            "Vite",
            "Node.js",
            "Express.js",
            "Flask",
            "Django",
            "MySQL",
            "MongoDB",
            "Pandas",
            "NumPy",
            "Scikit-learn",
            "TensorFlow",
            "Figma",
            "AWS",
            "Docker",
            "GitHub"
        ]

        for technology in technologies:
            technology_id = (
                technology.lower()
                .replace(" ", "-")
                .replace(".", "")
            )

            session.run(
                """
                MERGE (t:Technology {id: $id})
                SET t.name = $name
                """,
                {
                    "id": technology_id,
                    "name": technology
                }
            )


        role_skills = {
            "frontend-developer": [
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Git"
            ],

            "backend-developer": [
                "Python",
                "Java",
                "Node.js",
                "SQL",
                "REST APIs",
                "Git"
            ],

            "data-scientist": [
                "Python",
                "SQL",
                "Pandas",
                "NumPy",
                "Machine Learning"
            ],

            "ml-engineer": [
                "Python",
                "Machine Learning",
                "Scikit-learn",
                "TensorFlow",
                "SQL"
            ],

            "ui-ux-designer": [
                "Figma",
                "Wireframing",
                "Prototyping",
                "UX Research"
            ],

            "cloud-engineer": [
                "AWS",
                "Azure",
                "Docker",
                "Linux",
                "Networking",
                "Git"
            ]
        }

        for role_id, skill_list in role_skills.items():

            for skill in skill_list:

                skill_id = skill.lower().replace(" ", "-")

                session.run(
                    """
                    MATCH (r:Role {id: $role_id})
                    MATCH (s:Skill {id: $skill_id})
                    MERGE (r)-[:REQUIRES]->(s)
                    """,
                    {
                        "role_id": role_id,
                        "skill_id": skill_id
                    }
                )


        role_technologies = {
            "frontend-developer": [
                "React.js",
                "Vite",
                "GitHub"
            ],

            "backend-developer": [
                "Node.js",
                "Express.js",
                "Flask",
                "Django",
                "MySQL",
                "MongoDB"
            ],

            "data-scientist": [
                "Pandas",
                "NumPy",
                "Scikit-learn"
            ],

            "ml-engineer": [
                "Python",
                "Scikit-learn",
                "TensorFlow"
            ],

            "ui-ux-designer": [
                "Figma"
            ],

            "cloud-engineer": [
                "AWS",
                "Docker",
                "GitHub"
            ]
        }

        for role_id, technology_list in role_technologies.items():

            for technology in technology_list:

                technology_id = (
                    technology.lower()
                    .replace(" ", "-")
                    .replace(".", "")
                )

                session.run(
                    """
                    MATCH (r:Role {id: $role_id})
                    MATCH (t:Technology {id: $technology_id})
                    MERGE (r)-[:USES]->(t)
                    """,
                    {
                        "role_id": role_id,
                        "technology_id": technology_id
                    }
                )

        print("CareerGraph database seeded successfully!")


if __name__ == "__main__":
    seed_database()