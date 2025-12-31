import os
from PIL import Image

TARGET_DIR = "/mnt/d/Portfolio/public/images/dgist"
MAX_WIDTH = 1600
QUALITY = 85

def optimize_images():
    count = 0
    saved_space = 0
    
    print(f"Scanning {TARGET_DIR}...")
    
    for filename in os.listdir(TARGET_DIR):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(TARGET_DIR, filename)
            
            try:
                original_size = os.path.getsize(filepath)
                
                with Image.open(filepath) as img:
                    # Skip if image is already smallish (e.g. < 500KB and width < MAX_WIDTH)
                    if original_size < 500 * 1024 and img.width <= MAX_WIDTH:
                         continue

                    # Resize if needed
                    if img.width > MAX_WIDTH:
                        ratio = MAX_WIDTH / float(img.width)
                        new_height = int((float(img.height) * float(ratio)))
                        img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                    
                    # Save with optimization
                    # preserve format
                    img_format = img.format
                    
                    if filename.lower().endswith('.png'):
                         # For PNG, we can maximize compression? PNG is lossless.
                         # Actually, PNG doesn't use 'quality' param the same way.
                         # We can try to convert to P mode (palette) if not transparent? 
                         # But let's just save optimized=True
                         img.save(filepath, optimize=True)
                    else:
                        img.save(filepath, quality=QUALITY, optimize=True)
                        
                new_size = os.path.getsize(filepath)
                diff = original_size - new_size
                if diff > 0:
                    saved_space += diff
                    count += 1
                    print(f"Optimized {filename}: -{diff/1024/1024:.2f} MB")
                
            except Exception as e:
                print(f"Error processing {filename}: {e}")

    print(f"Finished! Optimized {count} images. Total space saved: {saved_space/1024/1024:.2f} MB")

if __name__ == "__main__":
    optimize_images()
