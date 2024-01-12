
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
        "email": "tester1@tester.com",
        "display_name": "KnightQuester",
        "catchphrase": "To the stars through bolts and bars!",
        "bio": "Knight and cosplay enthusiast. Love medieval fests."
    },
    {
        "email": "tester2@tester.com",
        "display_name": "ElfenMagix",
        "catchphrase": "Weaving magic into every thread.",
        "bio": "Elven cosplays are my specialty. Living in a fantasy world."
    },
    {
        "email": "tester3@tester.com",
        "display_name": "DragonCrafter",
        "catchphrase": "Crafting the scales of imagination.",
        "bio": "Dragon costumes and lore lover. Fantasy is my reality."
    },
    {
        "email": "tester4@tester.com",
        "display_name": "CosmicWanderer",
        "catchphrase": "Stitching the fabric of the cosmos.",
        "bio": "Sci-fi fanatic and costume maker. Star gazer at heart."
    },
    {
        "email": "tester5@tester.com",
        "display_name": "PixieArtisan",
        "catchphrase": "Tiny stitches tell grand tales.",
        "bio": "Fairy and pixie costumes with a sprinkle of magic."
    },
    {
        "email": "tester6@tester.com",
        "display_name": "MysticSeamstress",
        "catchphrase": "Sewing the unseen and mystical.",
        "bio": "Lover of all things mystical. Bringing fantasies to life."
    },
    {
        "email": "tester7@tester.com",
        "display_name": "ShadowRogue",
        "catchphrase": "Crafting shadows into light.",
        "bio": "Rogue at heart. Dark and mysterious character cosplays."
    },
    {
        "email": "tester8@tester.com",
        "display_name": "FaerieFletcher",
        "catchphrase": "Arrow-like precision in each design.",
        "bio": "Archery and faerie enthusiast. Blending art and archery."
    },
    {
        "email": "tester9@tester.com",
        "display_name": "SteampunkWizard",
        "catchphrase": "Where magic meets gears and cogs.",
        "bio": "Steampunk and wizardry combined in intricate costumes."
    },
    {
        "email": "tester10@tester.com",
        "display_name": "LoreKeeper",
        "catchphrase": "Tales of old in every stitch.",
        "bio": "History buff and storyteller. Reviving ancient legends."
    },
    {
        "email": "tester11@tester.com",
        "display_name": "WandererOfRealms",
        "catchphrase": "Journeying through uncharted lands.",
        "bio": "Adventurer and explorer. Love creating characters from different realms."
    },
    {
        "email": "tester12@tester.com",
        "display_name": "GrimoireGuardian",
        "catchphrase": "Guarding ancient secrets in my stitches.",
        "bio": "Mystic and lore guardian. Crafting costumes from forgotten tales."
    },
    {
        "email": "tester13@tester.com",
        "display_name": "CelestialSorcerer",
        "catchphrase": "Harnessing the power of the stars.",
        "bio": "Sorcerer and astrologer. Blending magic with celestial elements."
    },
    {
        "email": "tester14@tester.com",
        "display_name": "FrostAlchemist",
        "catchphrase": "Conjuring frost with every thread.",
        "bio": "Alchemist and ice mage. Bringing winter fantasies to life."
    },
    {
        "email": "tester15@tester.com",
        "display_name": "SylvanRanger",
        "catchphrase": "Arrow and bow, swift as the doe.",
        "bio": "Forest ranger and nature lover. Crafting wilderness-inspired outfits."
    },
    {
        "email": "tester16@tester.com",
        "display_name": "DuneNomad",
        "catchphrase": "Shifting sands tell my tale.",
        "bio": "Desert wanderer and survivalist. Sand and sun in every costume."
    },
    {
        "email": "tester17@tester.com",
        "display_name": "OceanSiren",
        "catchphrase": "Echoing the call of the deep blue.",
        "bio": "Sea lover and mermaid at heart. Bringing oceanic dreams ashore."
    },
    {
        "email": "tester18@tester.com",
        "display_name": "MythicBard",
        "catchphrase": "Singing tales of old and new.",
        "bio": "Bard and music enthusiast. Weaving stories into costumes."
    },
    {
        "email": "tester19@tester.com",
        "display_name": "EternalVoyager",
        "catchphrase": "Through time and space, my journey goes.",
        "bio": "Time traveler and space voyager. Exploring the universe through cosplay."
    },
    {
        "email": "tester20@tester.com",
        "display_name": "InfernoSmith",
        "catchphrase": "Forging dreams in fire and flame.",
        "bio": "Blacksmith and pyromancer. Creating fiery costumes with passion."
    }
]


        def generate_random_password():
    # Generates a random password with at least one uppercase letter and one digit
            # letters = string.ascii_lowercase
            # caps = string.ascii_uppercase
            # digits = string.digits
            # password = ''.join(random.choice(letters) for i in range(5))
            # password += ''.join(random.choice(caps) for i in range(1))
            # password += ''.join(random.choice(digits) for i in range(2))
            # return ''.join(random.sample(password, len(password)))
            return 'Seeded123'
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
            
            
   