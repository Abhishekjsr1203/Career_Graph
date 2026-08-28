# CareerGraph

CareerGraph is a career exploration web application that helps users discover career roles, required skills, technologies, projects, and learning resources. The application represents relationships between career roles, skills, and technologies using a graph database and provides an interactive interface for exploring career information.

## Use Case

Choosing a suitable career path can be difficult because users need to understand which skills and technologies are associated with different roles.

CareerGraph provides a centralized platform where users can:

* Explore different career roles
* Search and discover career opportunities
* View skills required for specific roles
* Explore technologies associated with roles
* Navigate relationships between roles, skills, and technologies
* Discover learning resources
* Explore career information through a graph-based interface

## Features

* Career role exploration
* Role search and filtering
* Detailed role information
* Skills Explorer
* Graph Explorer
* Technology relationships
* Learning resources
* Project information
* Interactive navigation
* React-based user interface
* Flask REST API
* CognoDB graph database integration

## Why a Graph Database?

Career information is highly interconnected.

For example:

```text
Frontend Developer
       |
    REQUIRES
       |
   JavaScript
       |
   RELATED TO
       |
     React
```

A traditional database can store this information, but representing and querying relationships between multiple entities can become more complex as the number of connections increases.

A graph database is well suited for CareerGraph because it stores entities as nodes and their relationships as connections.

The application uses graph relationships such as:

```text
Role ──REQUIRES──> Skill

Role ──USES──────> Technology
```

This makes it easier to answer relationship-based questions such as:

* Which skills are required for a particular role?
* Which technologies are used by a role?
* Which roles require a particular skill?
* What entities are connected to a specific career?

## Technology Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Vite
* Lucide React

### Backend

* Python
* Flask
* Flask-CORS

### Database

* CognoDB
* Cypher Query Language

## Data Model

The main graph data model contains three primary entities:

```text
                  ┌───────────────┐
                  │     Role      │
                  └───────┬───────┘
                          │
                     REQUIRES
                          │
                          ▼
                  ┌───────────────┐
                  │     Skill     │
                  └───────────────┘

                  ┌───────────────┐
                  │     Role      │
                  └───────┬───────┘
                          │
                         USES
                          │
                          ▼
                  ┌───────────────┐
                  │  Technology   │
                  └───────────────┘
```

### Graph Structure

```text
(Role)-[:REQUIRES]->(Skill)

(Role)-[:USES]->(Technology)
```

## Main Cypher Queries

### 1. Retrieve Role Details

```cypher
MATCH (r:Role {id: $role_id})
OPTIONAL MATCH (r)-[:REQUIRES]->(s:Skill)
OPTIONAL MATCH (r)-[:USES]->(t:Technology)
RETURN r,
       collect(DISTINCT s.name) AS skills,
       collect(DISTINCT t.name) AS technologies
```

This query retrieves a specific career role along with the skills and technologies connected to it.

### 2. Retrieve Skills

```cypher
MATCH (s:Skill)
OPTIONAL MATCH (r:Role)-[:REQUIRES]->(s)
RETURN s.name AS skill,
       collect(DISTINCT r.title) AS roles
ORDER BY s.name
```

This query retrieves skills and the career roles that require each skill.

### 3. Explore Graph Relationships

```cypher
MATCH (a)-[r]->(b)
RETURN a, r, b
LIMIT 100
```

This query retrieves connected nodes and relationships for graph exploration.

### 4. Retrieve Role-Skill Relationships

```cypher
MATCH (r:Role)-[:REQUIRES]->(s:Skill)
RETURN r, s
```

This query displays the relationship between career roles and their required skills.

## Project Structure

```text
CareerGraph/
│
├── public/
│
├── src/
│   ├── components/
│   │
│   ├── Pages/
│   │   ├── Home.jsx
│   │   ├── ExploreRoles.jsx
│   │   ├── RoleDetails.jsx
│   │   ├── Skills.jsx
│   │   ├── GraphExplorer.jsx
│   │   ├── Project.jsx
│   │   ├── Resources.jsx
│   │   └── About.jsx
│   │
│   ├── backend/
│   │   ├── app.py
│   │   ├── database.py
│   │   └── seed.py
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Abhishekjsr1203/Career_Graph.git
cd Career_Graph
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Create Python Virtual Environment

From the backend directory:

```bash
cd src/backend
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

### 4. Install Python Dependencies

```bash
pip install flask flask-cors neo4j python-dotenv
```

## Creating the CognoDB Instance

1. Create and log in to your CognoDB account.
2. Create a new database instance.
3. Obtain the database connection URI.
4. Obtain the required database username and password.
5. Create a `.env` file for the backend configuration.
6. Add the database credentials to the `.env` file.

Example:

```env
NEO4J_URI=your_database_uri
NEO4J_USERNAME=your_username
NEO4J_PASSWORD=your_password
```

Do not commit the `.env` file to GitHub because it contains private database credentials.

## Loading the Graph Data

After configuring the database, run the data-loading script:

```bash
python seed.py
```

The seed script creates and populates the required career roles, skills, technologies, and their relationships in the graph database.

## Running the Backend

From:

```text
src/backend
```

run:

```bash
python app.py
```

The Flask API will run at:

```text
http://127.0.0.1:5000
```

## Running the Frontend

Open another terminal in the project root:

```bash
npm run dev
```

The React application will be available at the local Vite address displayed in the terminal.

## API Endpoints

### Health Check

```text
GET /
```

Checks whether the CareerGraph Flask API is running.

### Database Connection

```text
GET /test-db
```

Tests the connection between Flask and CognoDB.

### Role Details

```text
GET /api/roles/<role_id>
```

Returns information about a specific career role, including its associated skills and technologies.

### Skills

```text
GET /api/skills
```

Returns skills and the career roles associated with them.

## UI Screenshots

### Home Page

Add the Home page screenshot here.

```text
screenshots/home.png
```

### Explore Roles

Add the Explore Roles screenshot here.

```text
screenshots/explore-roles.png
```

### Role Details

Add the Role Details screenshot here.

```text
screenshots/role-details.png
```

### Skills Explorer

Add the Skills Explorer screenshot here.

```text
screenshots/skills.png
```

### Graph Explorer

Add the Graph Explorer screenshot here.

```text
screenshots/graph-explorer.png
```

### CognoDB Graph

Add a screenshot showing the graph database relationships here.

```text
screenshots/cognodb-graph.png
```

## Application Architecture

```text
                    User
                      │
                      ▼
              React Frontend
                      │
                REST API Calls
                      │
                      ▼
               Flask Backend
                      │
                 Cypher Queries
                      │
                      ▼
                CognoDB Graph
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
      Roles         Skills      Technologies
        │             │             │
        └──────── Relationships ────┘
```

## Future Improvements

* User authentication
* Personalized career recommendations
* Advanced career-path visualization
* Skill gap analysis
* More career roles and technologies
* Learning progress tracking
* Deployment with a production backend
* Advanced graph-based recommendations

## Demo

Hosted Application:

```text
ADD YOUR HOSTED APPLICATION URL HERE
```

## Demo Recording

Demo video:

```text
ADD YOUR SCREEN RECORDING URL HERE
```

## GitHub Repository

[CareerGraph GitHub Repository](https://github.com/Abhishekjsr1203/Career_Graph)

## Author

Abhishek Paul
