from flask import Flask, jsonify
from flask_cors import CORS
from database import driver

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "message": "CareerGraph API is running"
    })

@app.route("/test-db")
def test_db():
    try:
        with driver.session() as session:
            result = session.run(
                "RETURN 'CognoDB Connected!' AS message"
            )
            message = result.single()["message"]

        return jsonify({
            "success": True,
            "message": message
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/api/roles", methods=["GET"])
def get_roles():
    try:
        with driver.session() as session:
            result = session.run("""
                MATCH (r:Role)
                RETURN r
                ORDER BY r.title
            """)

            roles = []

            for record in result:
                role = record["r"]

                roles.append({
                    "id": role.get("id"),
                    "title": role.get("title"),
                    "category": role.get("category"),
                    "description": role.get("description"),
                    "salary": role.get("salary")
                })

            return jsonify(roles)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@app.route("/api/roles/<role_id>", methods=["GET"])
def get_role(role_id):
    try:
        with driver.session() as session:
            result = session.run("""
                MATCH (r:Role {id: $role_id})
                OPTIONAL MATCH (r)-[:REQUIRES]->(s:Skill)
                OPTIONAL MATCH (r)-[:USES]->(t:Technology)
                RETURN r,
                       collect(DISTINCT s.name) AS skills,
                       collect(DISTINCT t.name) AS technologies
            """, role_id=role_id)

            record = result.single()

            if not record:
                return jsonify({
                    "error": "Role not found"
                }), 404

            role = record["r"]

            return jsonify({
                "id": role.get("id"),
                "title": role.get("title"),
                "category": role.get("category"),
                "description": role.get("description"),
                "salary": role.get("salary"),
                "skills": record["skills"],
                "technologies": record["technologies"]
            })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@app.route("/api/graph", methods=["GET"])
def get_graph():
    try:
        with driver.session() as session:
            result = session.run("""
                MATCH (r:Role)-[rel]->(n)
                RETURN r.id AS role_id,
                       r.title AS role_title,
                       type(rel) AS relationship,
                       labels(n)[0] AS node_type,
                       n.name AS node_name
            """)

            graph = []

            for record in result:
                graph.append({
                    "role_id": record["role_id"],
                    "role_title": record["role_title"],
                    "relationship": record["relationship"],
                    "node_type": record["node_type"],
                    "node_name": record["node_name"]
                })

            return jsonify(graph)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@app.route("/api/skills", methods=["GET"])
def get_skills():
    try:
        with driver.session() as session:
            result = session.run("""
                MATCH (s:Skill)
                OPTIONAL MATCH (r:Role)-[:REQUIRES]->(s)
                RETURN s.name AS skill,
                       collect(DISTINCT r.title) AS roles
                ORDER BY s.name
            """)

            skills = []

            for record in result:
                skills.append({
                    "skill": record["skill"],
                    "roles": record["roles"]
                })

            return jsonify(skills)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)