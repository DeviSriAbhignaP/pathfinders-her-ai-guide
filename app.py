from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client

# Supabase connection
SUPABASE_URL = "https://uosketjlzbogqyypbjtb.supabase.co"
SUPABASE_KEY = "sb_secret_9KwtzdXm9yP0vE1S2qepoA_gKVFjWRr"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__)
CORS(app)

CAREER_RULES = {
    "Data Scientist": {
        "skills": ["Python", "Machine Learning", "Statistics"],
        "interests": ["AI", "Data Analysis"],
        "min_match": 2
    },
    "Software Developer": {
        "skills": ["Python", "Java", "JavaScript", "C++", "Programming"],
        "interests": ["Software Development", "Web Development"],
        "min_match": 1
    },
    "Cybersecurity Analyst": {
        "skills": ["Security", "Networking", "Cryptography"],
        "interests": ["Security", "Cybersecurity"],
        "min_match": 2
    },
    "UI/UX Designer": {
        "skills": ["Design", "CSS", "Figma"],
        "interests": ["User Experience"],
        "min_match": 2
    },
    "DevOps Engineer": {
        "skills": ["Cloud", "Docker", "Kubernetes", "Linux"],
        "interests": ["DevOps", "Infrastructure"],
        "min_match": 2
    },
    "Backend Developer": {
        "skills": ["Python", "Java", "Database", "REST API"],
        "interests": ["Backend Development", "Database Design"],
        "min_match": 2
    }
}


def match_career(user_skills, user_interests):
    best_career = None
    best_score = 0

    for career, rules in CAREER_RULES.items():
        skill_matches = sum(1 for skill in user_skills if skill in rules["skills"])
        interest_matches = sum(1 for interest in user_interests if interest in rules["interests"])

        total_matches = skill_matches + interest_matches

        if total_matches >= rules["min_match"]:
            score = (skill_matches * 2) + interest_matches

            if score > best_score:
                best_score = score
                best_career = career

    return best_career if best_career else "Software Developer"


@app.route('/api/recommend-career', methods=['POST'])
def recommend_career():

    data = request.get_json()

    skills = data.get("skills", [])
    interests = data.get("interests", [])

    career = match_career(skills, interests)

    # Save recommendation to Supabase
    supabase.table("career_recommendations").insert({
        "skills": ", ".join(skills),
        "interests": ", ".join(interests),
        "recommended_career": career
    }).execute()

    return jsonify({
        "career": career,
        "input": {
            "skills": skills,
            "interests": interests
        }
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)