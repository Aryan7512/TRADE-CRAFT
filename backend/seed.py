import asyncio
import os
import random
from app.database import db
from app.services.embeddings import embeddings_service

# Sample Data
SAMPLE_USERS = [
    {
        "email": "sarah.dev@example.com",
        "name": "Sarah Jenkins",
        "bio": "Senior React Developer with 5 years of experience. I love teaching frontend architecture and want to learn backend mastery.",
        "avatar_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("React", 5), ("TypeScript", 4), ("CSS", 5)],
        "learn": [("Python", 1), ("Machine Learning", 1)]
    },
    {
        "email": "mike.designer@example.com",
        "name": "Mike Ross",
        "bio": "Product Designer at a tech startup. Can help you with Figma and UI principles. Looking to get into coding.",
        "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("UI/UX Design", 5), ("Figma", 5)],
        "learn": [("React", 2), ("JavaScript", 2)]
    },
    {
        "email": "jessica.py@example.com",
        "name": "Jessica Pearson",
        "bio": "Data Scientist using Python and PyTorch. Happy to mentor anyone in AI/ML!",
        "avatar_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Python", 5), ("Data Science", 4), ("Machine Learning", 4)],
        "learn": [("Public Speaking", 2), ("Marketing", 1)]
    },
    {
        "email": "harvey.biz@example.com",
        "name": "Harvey Specter",
        "bio": "Corporate lawyer turned entrepreneur. Expert in negotiation and public speaking. Want to learn how to build my MVP.",
        "avatar_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Public Speaking", 5), ("Negotiation", 5), ("Business Strategy", 4)],
        "learn": [("Web Development", 1), ("MVP Building", 1)]
    },
    {
        "email": "louis.fin@example.com",
        "name": "Louis Litt",
        "bio": "Finance wizard. I know everything about corporate finance and Excel. Need to learn better communication skills.",
        "avatar_url": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Finance", 5), ("Excel", 5)],
        "learn": [("Communication", 2), ("Leadership", 2)]
    },
    {
        "email": "donna.ops@example.com",
        "name": "Donna Paulsen",
        "bio": "Operations Manager. I keep things running smoothly. I want to learn graphic design.",
        "avatar_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Project Management", 5), ("Operations", 5)],
        "learn": [("Graphic Design", 1), ("Adobe Illustrator", 1)]
    },
    {
        "email": "rachel.para@example.com",
        "name": "Rachel Zane",
        "bio": "Paralegal studying for the bar. Excellent at research and writing. Want to learn Spanish.",
        "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Legal Research", 4), ("Writing", 5)],
        "learn": [("Spanish", 1)]
    },
     {
        "email": "alex.chef@example.com",
        "name": "Alex Gourmet",
        "bio": "Professional Chef with 10 years experience. I can teach you how to cook anything. Want to learn digital marketing for my food blog.",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Cooking", 5), ("Baking", 4)],
        "learn": [("Digital Marketing", 1), ("SEO", 1)]
    },
     {
        "email": "sam.music@example.com",
        "name": "Sam Strummer",
        "bio": "Guitarist and Music Producer. I can teach guitar, theory, and Ableton Live. Looking to learn photography.",
        "avatar_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Guitar", 5), ("Music Production", 4)],
        "learn": [("Photography", 2)]
    },
    {
        "email": "lisa.yoga@example.com",
        "name": "Lisa Flow",
        "bio": "Certified Yoga Instructor. I can help you with flexibility and mindfulness. Want to learn how to build a website.",
        "avatar_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        "teach": [("Yoga", 5), ("Meditation", 5)],
        "learn": [("Web Design", 1), ("HTML/CSS", 1)]
    }
]

async def seed_users():
    print("🌱 Starting database seed...")
    
    for user_data in SAMPLE_USERS:
        print(f"Processing {user_data['name']}...")
        
        # 1. Create User (Bypassing Auth specific logic, just inserting into public.users)
        # Note: In a real scenario, we'd need them in auth.users too for them to login.
        # But for matching candidates, public.users is sufficient if we assume they are "offline".
        # We generate a deterministic UUID based on email for repeatability if needed, but here we let DB handle it or random.
        
        # Check if exists
        existing = await db.service_client.table("users").select("id").eq("email", user_data["email"]).execute()
        if existing.data:
            print(f"  User {user_data['name']} already exists. Skipping creation.")
            user_id = existing.data[0]['id']
        else:
            # Create user
            res = await db.service_client.table("users").insert({
                "email": user_data["email"],
                "name": user_data["name"],
                "bio": user_data["bio"],
                "avatar_url": user_data["avatar_url"]
            }).execute()
            
            if not res.data:
                print(f"  Failed to create user {user_data['name']}")
                continue
            
            user_id = res.data[0]['id']
            print(f"  Created user ID: {user_id}")

        # 2. Add Skills
        all_skills = [
            {"name": name, "level": level, "mode": "TEACH"} for name, level in user_data["teach"]
        ] + [
            {"name": name, "level": level, "mode": "LEARN"} for name, level in user_data["learn"]
        ]
        
        for skill in all_skills:
            # Check for existing skill
            skill_exists = await db.service_client.table("skills").select("id").eq("user_id", user_id).eq("name", skill["name"]).eq("mode", skill["mode"]).execute()
            if skill_exists.data:
                continue

            # Generate embedding
            embedding = embeddings_service.generate_embedding(skill["name"])
            
            # Insert skill
            await db.service_client.table("skills").insert({
                "user_id": user_id,
                "name": skill["name"],
                "level": skill["level"],
                "mode": skill["mode"],
                "embedding": embedding,
                "canonical_text": skill["name"]
            }).execute()
            
        print(f"  Added {len(all_skills)} skills for {user_data['name']}")

    print("✅ Seeding complete! You can now find these matches in the dashboard.")

if __name__ == "__main__":
    asyncio.run(seed_users())
