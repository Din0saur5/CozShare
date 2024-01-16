
#!/usr/bin/env python3

# Standard library imports

import random
import string
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    fake = Faker()
    
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        users = [
    {
        "email": "knightquester@example.com",
        "display_name": "KnightQuester",
        "catchphrase": "To the stars through bolts and bars!",
        "bio": "Knight and cosplay enthusiast. Love medieval fests."
    },
    {
        "email": "elfenmagix@example.com",
        "display_name": "ElfenMagix",
        "catchphrase": "Weaving magic into every thread.",
        "bio": "Elven cosplays are my specialty. Living in a fantasy world."
    },
    {
        "email": "dragoncrafter@example.com",
        "display_name": "DragonCrafter",
        "catchphrase": "Crafting the scales of imagination.",
        "bio": "Dragon costumes and lore lover. Fantasy is my reality."
    },
    {
        "email": "cosmicwanderer@example.com",
        "display_name": "CosmicWanderer",
        "catchphrase": "Stitching the fabric of the cosmos.",
        "bio": "Sci-fi fanatic and costume maker. Star gazer at heart."
    },
    {
        "email": "pixieartisan@example.com",
        "display_name": "PixieArtisan",
        "catchphrase": "Tiny stitches tell grand tales.",
        "bio": "Fairy and pixie costumes with a sprinkle of magic."
    },
    {
        "email": "mysticseamstress@example.com",
        "display_name": "MysticSeamstress",
        "catchphrase": "Sewing the unseen and mystical.",
        "bio": "Lover of all things mystical. Bringing fantasies to life."
    },
    {
        "email": "shadowrogue@example.com",
        "display_name": "ShadowRogue",
        "catchphrase": "Crafting shadows into light.",
        "bio": "Rogue at heart. Dark and mysterious character cosplays."
    },
    {
        "email": "faeriefletcher@example.com",
        "display_name": "FaerieFletcher",
        "catchphrase": "Arrow-like precision in each design.",
        "bio": "Archery and faerie enthusiast. Blending art and archery."
    },
    {
        "email": "steampunkwizard@example.com",
        "display_name": "SteampunkWizard",
        "catchphrase": "Where magic meets gears and cogs.",
        "bio": "Steampunk and wizardry combined in intricate costumes."
    },
    {
        "email": "lorekeeper@example.com",
        "display_name": "LoreKeeper",
        "catchphrase": "Tales of old in every stitch.",
        "bio": "History buff and storyteller. Reviving ancient legends."
    }
]

        def generate_random_password():
    # Generates a random password with at least one uppercase letter and one digit
            letters = string.ascii_lowercase
            caps = string.ascii_uppercase
            digits = string.digits
            password = ''.join(random.choice(letters) for i in range(5))
            password += ''.join(random.choice(caps) for i in range(1))
            password += ''.join(random.choice(digits) for i in range(2))
            return ''.join(random.sample(password, len(password)))
        def generate_random_hex_color():
    # Generates a random hex color
            return ''.join(random.choices('0123456789ABCDEF', k=6))

        def make_users():
            for user in users:
               new_user = User(
                email = user['email'],
                display_name = user['display_name'],
                catchphrase = user['catchphrase'],
                bio = user['bio'],
                profile_pic = f'https://ui-avatars.com/api/?background={generate_random_hex_color()}'
                )
               new_user.password_hash = generate_random_password()
               db.session.add(new_user)
            db.session.commit()
            print('seed finished')
        make_users()  
            
            
     events = [
    {
        "eventName": "Mystic Realms Cosplay Con",
        "location": "Austin, Texas",
        "timestamp": "October 5-7, 2024",
        "description": "Dive into a world of fantasy and creativity at Mystic Realms Cosplay Con. Celebrate the art of cosplay with workshops, contests, and special guest appearances.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/MysticRealms.png?t=2024-01-16T02%3A26%3A01.452Z"
    },
    {
        "eventName": "Royal Joust Renaissance Fair",
        "location": "Orlando, Florida",
        "timestamp": "March 12-14, 2024",
        "description": "Step back in time and experience the thrill of medieval jousting, artisan markets, and traditional Renaissance entertainment.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/RoyalJoust.png?t=2024-01-16T02%3A25%3A51.184Z"
    },
    {
        "eventName": "Legends & Lore Expo",
        "location": "Denver, Colorado",
        "timestamp": "August 20-22, 2024",
        "description": "A haven for folklore enthusiasts, featuring panel discussions, costume contests, and immersive experiences based on legendary tales and myths.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/LegendLore.png?t=2024-01-16T02%3A25%3A33.540Z"
    },
    {
        "eventName": "Enchanted Forest Faire",
        "location": "Asheville, North Carolina",
        "timestamp": "May 15-17, 2024",
        "description": "Wander through an enchanted forest setting, with themed performances, historical reenactments, and a vibrant medieval marketplace.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/EnchantedForest.png?t=2024-01-16T02%3A25%3A25.962Z"
    },
    {
        "eventName": "Dragon’s Keep Fantasy Fest",
        "location": "Seattle, Washington",
        "timestamp": "July 9-11, 2024",
        "description": "Enter the realm of dragons and fantasy at this unique festival, showcasing intricate cosplay, fantasy art, and interactive gaming experiences.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/DragonsKeep.png?t=2024-01-16T02%3A25%3A17.499Z"
    },
    {
        "eventName": "Knights & Knaves Medieval Carnival",
        "location": "Columbus, Ohio",
        "timestamp": "September 22-24, 2024",
        "description": "Revel in the medieval era with armored knights, jesters, and traditional music. Enjoy hands-on activities, historical workshops, and hearty fare.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/KnightKnave.png?t=2024-01-16T02%3A25%3A08.280Z"
    },
    {
        "eventName": "Celestial Convergence Cosplay Gala",
        "location": "San Francisco, California",
        "timestamp": "June 5-7, 2024",
        "description": "A cosmic-themed cosplay event blending science fiction with fantasy. Features include costume showcases, sci-fi authors, and stargazing sessions.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/CelestialConvergance.png?t=2024-01-16T02%3A24%3A53.519Z"
    },
    {
        "eventName": "Renaissance Revelry & Banquet",
        "location": "Charleston, South Carolina",
        "timestamp": "April 28-30, 2024",
        "description": "Indulge in a grand Renaissance banquet complete with period music, dance, and a costume ball set in a beautifully recreated historical setting.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/RevelryBanquet.png?t=2024-01-16T02%3A24%3A36.366Z"
    },
    {
        "eventName": "Heroes & Villains Costume Parade",
        "location": "Phoenix, Arizona",
        "timestamp": "November 12-14, 2024",
        "description": "A celebration of pop culture's most beloved heroes and villains. Features include a grand parade, interactive workshops, and celebrity meet-and-greets.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/HeroVillan.png?t=2024-01-16T02%3A24%3A25.826Z"
    },
    {
        "eventName": "Time Travelers’ Symposium",
        "location": "Boston, Massachusetts",
        "timestamp": "August 16-18, 2024",
        "description": "A unique event for fans of all things time travel, from steampunk to sci-fi. Enjoy themed entertainment, panel discussions, and a costume contest.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/TimeTravels.png?t=2024-01-16T02%3A23%3A57.091Z"
    }]
