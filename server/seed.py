
#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import string
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Event

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
        "bio": "Knight and cosplay enthusiast. Love medieval fests.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/KnightQuester.png?t=2024-01-15T21%3A50%3A12.855Z"
        
    },
    {
        "email": "tester2@tester.com",
        "display_name": "ElfenMagix",
        "catchphrase": "Weaving magic into every thread.",
        "bio": "Elven cosplays are my specialty. Living in a fantasy world.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/ElfenMagix.png?t=2024-01-15T21%3A56%3A02.958Z"
    },
    {
        "email": "tester3@tester.com",
        "display_name": "DragonCrafter",
        "catchphrase": "Crafting the scales of imagination.",
        "bio": "Dragon costumes and lore lover. Fantasy is my reality.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/DragonCrafter.png?t=2024-01-15T21%3A55%3A52.061Z"
    },
    {
        "email": "tester4@tester.com",
        "display_name": "CosmicWanderer",
        "catchphrase": "Stitching the fabric of the cosmos.",
        "bio": "Sci-fi fanatic and costume maker. Star gazer at heart.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/CosmicWanderer.png"
    },
    {
        "email": "tester5@tester.com",
        "display_name": "PixieArtisan",
        "catchphrase": "Tiny stitches tell grand tales.",
        "bio": "Fairy and pixie costumes with a sprinkle of magic.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/PixieArtisan.png?t=2024-01-15T21%3A55%3A30.810Z"
    },
    {
        "email": "tester6@tester.com",
        "display_name": "MysticSeamstress",
        "catchphrase": "Sewing the unseen and mystical.",
        "bio": "Lover of all things mystical. Bringing fantasies to life.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/MysticSeamstress.png?t=2024-01-15T21%3A55%3A15.569Z"
    },
    {
        "email": "tester7@tester.com",
        "display_name": "ShadowRogue",
        "catchphrase": "Crafting shadows into light.",
        "bio": "Rogue at heart. Dark and mysterious character cosplays.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/ShadowRouge.png?t=2024-01-15T21%3A55%3A06.559Z"
    },
    {
        "email": "tester8@tester.com",
        "display_name": "FaerieFletcher",
        "catchphrase": "Arrow-like precision in each design.",
        "bio": "Archery and faerie enthusiast. Blending art and archery.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/FaerieFletcher.png?t=2024-01-15T21%3A54%3A54.621Z"
    },
    {
        "email": "tester9@tester.com",
        "display_name": "SteampunkWizard",
        "catchphrase": "Where magic meets gears and cogs.",
        "bio": "Steampunk and wizardry combined in intricate costumes.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/SteampunkWizard.png?t=2024-01-15T21%3A54%3A46.023Z"
    },
    {
        "email": "tester10@tester.com",
        "display_name": "LoreKeeper",
        "catchphrase": "Tales of old in every stitch.",
        "bio": "History buff and storyteller. Reviving ancient legends.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/LoreKeeper.png?t=2024-01-15T21%3A54%3A36.333Z"
    },
    {
        "email": "tester11@tester.com",
        "display_name": "WandererOfRealms",
        "catchphrase": "Journeying through uncharted lands.",
        "bio": "Adventurer and explorer. Love creating characters from different realms.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/WandererOfRealms.png?t=2024-01-15T21%3A54%3A25.454Z"
    },
    {
        "email": "tester12@tester.com",
        "display_name": "GrimoireGuardian",
        "catchphrase": "Guarding ancient secrets in my stitches.",
        "bio": "Mystic and lore guardian. Crafting costumes from forgotten tales.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/GrimoireGuardian.png?t=2024-01-15T21%3A54%3A15.012Z"
    },
    {
        "email": "tester13@tester.com",
        "display_name": "CelestialSorcerer",
        "catchphrase": "Harnessing the power of the stars.",
        "bio": "Sorcerer and astrologer. Blending magic with celestial elements.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/CelestialSorcerer.png"
    },
    {
        "email": "tester14@tester.com",
        "display_name": "FrostAlchemist",
        "catchphrase": "Conjuring frost with every thread.",
        "bio": "Alchemist and ice mage. Bringing winter fantasies to life.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/FrostAlchemist.png?t=2024-01-15T21%3A53%3A49.365Z"
    },
    {
        "email": "tester15@tester.com",
        "display_name": "SylvanRanger",
        "catchphrase": "Arrow and bow, swift as the doe.",
        "bio": "Forest ranger and nature lover. Crafting wilderness-inspired outfits.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/SylvanRanger.png?t=2024-01-15T21%3A53%3A36.068Z"
    },
    {
        "email": "tester16@tester.com",
        "display_name": "DuneNomad",
        "catchphrase": "Shifting sands tell my tale.",
        "bio": "Desert wanderer and survivalist. Sand and sun in every costume.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/DuneNomad.png?t=2024-01-15T21%3A53%3A23.648Z"
    },
    {
        "email": "tester17@tester.com",
        "display_name": "OceanSiren",
        "catchphrase": "Echoing the call of the deep blue.",
        "bio": "Sea lover and mermaid at heart. Bringing oceanic dreams ashore.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/OceanSiren.png?t=2024-01-15T21%3A53%3A13.562Z"
    },
    {
        "email": "tester18@tester.com",
        "display_name": "MythicBard",
        "catchphrase": "Singing tales of old and new.",
        "bio": "Bard and music enthusiast. Weaving stories into costumes.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/MythicBard.png?t=2024-01-15T21%3A53%3A01.503Z"
    },
    {
        "email": "tester19@tester.com",
        "display_name": "EternalVoyager",
        "catchphrase": "Through time and space, my journey goes.",
        "bio": "Time traveler and space voyager. Exploring the universe through cosplay.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/EternalVoyager.png?t=2024-01-15T21%3A52%3A52.365Z"
    },
    {
        "email": "tester20@tester.com",
        "display_name": "InfernoSmith",
        "catchphrase": "Forging dreams in fire and flame.",
        "bio": "Blacksmith and pyromancer. Creating fiery costumes with passion.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/InfernoSmith.png?t=2024-01-15T21%3A52%3A40.872Z"
    }
]


        # def generate_random_password():
    # Generates a random password with at least one uppercase letter and one digit
            # letters = string.ascii_lowercase
            # caps = string.ascii_uppercase
            # digits = string.digits
            # password = ''.join(random.choice(letters) for i in range(5))
            # password += ''.join(random.choice(caps) for i in range(1))
            # password += ''.join(random.choice(digits) for i in range(2))
            # return ''.join(random.sample(password, len(password)))
            # return 'Seeded123'
    #     def generate_random_hex_color():
    # # Generates a random hex color
    #         return ''.join(random.choices('0123456789ABCDEF', k=6))
# f'https://ui-avatars.com/api/?background={generate_random_hex_color()}'
        def make_users():
            for user in users:
               new_user = User(
                email = user['email'],
                display_name = user['display_name'],
                catchphrase = user['catchphrase'],
                bio = user['bio'],
                profile_pic = user['profile_pic']
               )
               new_user.password_hash = 'Seeded123'
               db.session.add(new_user)
            db.session.commit()
            print('seed finished')
        make_users()  
            
            
     events = [
    {
        "eventName": "Mystic Realms Cosplay Con", done
        "location": "Austin, Texas",
        "timestamp": "October 5-7, 2024",
        "description": "Dive into a world of fantasy and creativity at Mystic Realms Cosplay Con. Celebrate the art of cosplay with workshops, contests, and special guest appearances.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/MysticRealms.png?t=2024-01-16T02%3A26%3A01.452Z"
    },
    {
        "eventName": "Royal Joust Renaissance Fair", done
        "location": "Orlando, Florida",
        "timestamp": "March 12-14, 2024",
        "description": "Step back in time and experience the thrill of medieval jousting, artisan markets, and traditional Renaissance entertainment.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/RoyalJoust.png?t=2024-01-16T02%3A25%3A51.184Z"
    },
    {
        "eventName": "Legends & Lore Expo", done
        "location": "Denver, Colorado",
        "timestamp": "August 20-22, 2024",
        "description": "A haven for folklore enthusiasts, featuring panel discussions, costume contests, and immersive experiences based on legendary tales and myths.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/LegendLore.png?t=2024-01-16T02%3A25%3A33.540Z"
    },
    {
        "eventName": "Enchanted Forest Faire", done
        "location": "Asheville, North Carolina",
        "timestamp": "May 15-17, 2024",
        "description": "Wander through an enchanted forest setting, with themed performances, historical reenactments, and a vibrant medieval marketplace.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/EnchantedForest.png?t=2024-01-16T02%3A25%3A25.962Z"
    },
    {
        "eventName": "Dragon’s Keep Fantasy Fest",done
        "location": "Seattle, Washington",
        "timestamp": "July 9-11, 2024",
        "description": "Enter the realm of dragons and fantasy at this unique festival, showcasing intricate cosplay, fantasy art, and interactive gaming experiences.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/DragonsKeep.png?t=2024-01-16T02%3A25%3A17.499Z"
    },
    {
        "eventName": "Knights & Knaves Medieval Carnival", done
        "location": "Columbus, Ohio",
        "timestamp": "September 22-24, 2024",
        "description": "Revel in the medieval era with armored knights, jesters, and traditional music. Enjoy hands-on activities, historical workshops, and hearty fare.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/KnightKnave.png?t=2024-01-16T02%3A25%3A08.280Z"
    },
    {
        "eventName": "Celestial Convergence Cosplay Gala", done
        "location": "San Francisco, California",
        "timestamp": "June 5-7, 2024",
        "description": "A cosmic-themed cosplay event blending science fiction with fantasy. Features include costume showcases, sci-fi authors, and stargazing sessions.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/CelestialConvergance.png?t=2024-01-16T02%3A24%3A53.519Z"
    },
    {
        "eventName": "Renaissance Revelry & Banquet", done
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
        "eventName": "Time Travelers’ Symposium", done
        "location": "Boston, Massachusetts",
        "timestamp": "August 16-18, 2024",
        "description": "A unique event for fans of all things time travel, from steampunk to sci-fi. Enjoy themed entertainment, panel discussions, and a costume contest.",
        "profile_pic": "https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/profile-pics/TimeTravels.png?t=2024-01-16T02%3A23%3A57.091Z"
    }]
