import asyncio
import os
from app.services.embeddings import embeddings_service

# Sample Data (Same as before)
SAMPLE_USERS = [
    {
        "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        "email": "sarah.dev@example.com",
        "name": "Sarah Jenkins",
        "bio": "Senior React Developer with 5 years of experience. I love teaching frontend architecture and want to learn backend mastery.",
        "avatar_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("React", 5), ("TypeScript", 4), ("CSS", 5)],
        "learn": [("Python", 1), ("Machine Learning", 1)]
    },
    {
        "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12",
        "email": "mike.designer@example.com",
        "name": "Mike Ross",
        "bio": "Product Designer at a tech startup. Can help you with Figma and UI principles. Looking to get into coding.",
        "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("UI/UX Design", 5), ("Figma", 5)],
        "learn": [("React", 2), ("JavaScript", 2)]
    },
    {
        "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13",
        "email": "jessica.py@example.com",
        "name": "Jessica Pearson",
        "bio": "Data Scientist using Python and PyTorch. Happy to mentor anyone in AI/ML!",
        "avatar_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Python", 5), ("Data Science", 4), ("Machine Learning", 4)],
        "learn": [("Public Speaking", 2), ("Marketing", 1)]
    },
    {
        "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14",
        "email": "harvey.biz@example.com",
        "name": "Harvey Specter",
        "bio": "Corporate lawyer turned entrepreneur. Expert in negotiation and public speaking. Want to learn how to build my MVP.",
        "avatar_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Public Speaking", 5), ("Negotiation", 5), ("Business Strategy", 4)],
        "learn": [("Web Development", 1), ("MVP Building", 1)]
    },
    {
        "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15",
        "email": "louis.fin@example.com",
        "name": "Louis Litt",
        "bio": "Finance wizard. I know everything about corporate finance and Excel. Need to learn better communication skills.",
        "avatar_url": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Finance", 5), ("Excel", 5)],
        "learn": [("Communication", 2), ("Leadership", 2)]
    }
]

async def generate_sql():
    print("running...")
    sql_statements = []
    
    # Clean up existing fake users (optional, good for reset)
    ids = [u['id'] for u in SAMPLE_USERS]
    id_list = "'" + "','".join(ids) + "'"
    sql_statements.append(f"DELETE FROM skills WHERE user_id IN ({id_list});")
    sql_statements.append(f"DELETE FROM users WHERE id IN ({id_list});")

    for user in SAMPLE_USERS:
        # User Insert
        sql_statements.append(f"""
        INSERT INTO users (id, email, name, bio, avatar_url)
        VALUES ('{user['id']}', '{user['email']}', '{user['name']}', '{user['bio'].replace("'", "''")}', '{user['avatar_url']}');
        """)

        # Skills
        all_skills = [
            {"name": name, "level": level, "mode": "TEACH"} for name, level in user["teach"]
        ] + [
            {"name": name, "level": level, "mode": "LEARN"} for name, level in user["learn"]
        ]

        for skill in all_skills:
            try:
                embedding = embeddings_service.generate_embedding(skill["name"])
                # Format embedding as string literal '[0.1,0.2,...]'
                emb_str = f"'{list(embedding)}'"
                
                sql_statements.append(f"""
                INSERT INTO skills (user_id, name, level, mode, embedding, canonical_text)
                VALUES ('{user['id']}', '{skill['name']}', {skill['level']}, '{skill['mode']}', {emb_str}, '{skill['name']}');
                """)
            except Exception as e:
                print(f"Skipping skill {skill['name']}: {e}")

    with open("seed_output.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(sql_statements))
    
    print("✅ SQL generated in seed_output.sql")

if __name__ == "__main__":
    asyncio.run(generate_sql())
