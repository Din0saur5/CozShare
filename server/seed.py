
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
            
            
   