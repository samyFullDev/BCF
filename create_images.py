import os
from PIL import Image, ImageDraw, ImageFont

# Dossier des images
image_dir = r"c:\Users\Futur\Desktop\anuttc-main\assets\images"
os.makedirs(image_dir, exist_ok=True)

# Configuration des images
images_config = [
    {"name": "hero-image.jpg", "size": (800, 600), "text": "Services Fonciers\nANDF Bénin", "color": "#006400"},
    {"name": "cotonou.jpg", "size": (600, 300), "text": "Cotonou\nLittoral", "color": "#228B22"},
    {"name": "porto-novo.jpg", "size": (600, 300), "text": "Porto-Novo\nOuémé", "color": "#32CD32"},
    {"name": "parakou.jpg", "size": (600, 300), "text": "Parakou\nBorgou", "color": "#20B2AA"},
    {"name": "about-image.jpg", "size": (600, 400), "text": "ANDF\nÉquipe & Services", "color": "#4682B4"},
]

for config in images_config:
    # Créer une image avec fond coloré
    img = Image.new('RGB', config["size"], color='white')
    draw = ImageDraw.Draw(img)
    
    # Dessiner un rectangle coloré
    draw.rectangle([(0, 0), config["size"]], fill=config["color"], outline=config["color"])
    
    # Ajouter du texte
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()
    
    text = config["text"]
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Centrer le texte
    x = (config["size"][0] - text_width) // 2
    y = (config["size"][1] - text_height) // 2
    
    draw.text((x, y), text, fill='white', font=font, align='center')
    
    # Sauvegarder
    filepath = os.path.join(image_dir, config["name"])
    img.save(filepath, "JPEG", quality=85)
    print(f"Créé: {config['name']}")

print("Toutes les images placeholder ont été créées!")