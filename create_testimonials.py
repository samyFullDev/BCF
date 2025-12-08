import os
from PIL import Image, ImageDraw

# Dossier des images
image_dir = r"c:\Users\Futur\Desktop\anuttc-main\assets\images"

# Créer des avatars simples pour les témoignages
colors = ["#FF6B6B", "#4ECDC4", "#45B7D1"]
initials = ["A", "B", "C"]

for i in range(3):
    # Créer une image circulaire
    img = Image.new('RGB', (100, 100), color='white')
    draw = ImageDraw.Draw(img)
    
    # Dessiner un cercle coloré
    draw.ellipse([(10, 10), (90, 90)], fill=colors[i], outline=colors[i])
    
    # Ajouter une initiale
    try:
        from PIL import ImageFont
        font = ImageFont.truetype("arial.ttf", 36)
    except:
        font = ImageFont.load_default()
    
    text = initials[i]
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Centrer le texte
    x = (100 - text_width) // 2
    y = (100 - text_height) // 2
    
    draw.text((x, y), text, fill='white', font=font)
    
    # Sauvegarder
    filepath = os.path.join(image_dir, f"testimonial-{i+1}.jpg")
    img.save(filepath, "JPEG", quality=85)
    print(f"Créé: testimonial-{i+1}.jpg")

print("Images de témoignages créées!")