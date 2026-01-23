#!/bin/bash

# Image organization script for Stitching Dutch Heritage
# This script organizes images into the correct collection folders

cd "$(dirname "$0")"

echo "🎨 Organizing images into collection folders..."
echo ""

# Create directory structure
mkdir -p images/collections/rh    # Royal House (combined 1+2)
mkdir -p images/collections/zs    # Zaanse Schans
mkdir -p images/collections/wm    # Windmills
mkdir -p images/collections/cs    # City & Street
mkdir -p images/collections/sm    # Samplers
mkdir -p images/collections/fl    # Folk Life
mkdir -p images/hero
mkdir -p images/icons
mkdir -p images/media
mkdir -p images/certificates/nl
mkdir -p images/certificates/en

echo "✓ Directory structure created"
echo ""

# Function to copy and rename image
copy_image() {
  local source="$1"
  local target="$2"
  local work_id="$3"

  if [ -f "images/$source" ]; then
    cp "images/$source" "images/collections/$target"
    echo "  ✓ $source → $target (Work ID: $work_id)"
  else
    echo "  ✗ MISSING: $source (needed for $work_id)"
  fi
}

# Collection 1: Royal House (RH) - Combined packages 1+2
echo "📦 Collection 1: Royal House (Koninklijk Verhaal)"
copy_image "21.JPEG" "rh/RH001.jpg" "RH001 - Geboortelap Prinses Beatrix"
copy_image "27.JPEG" "rh/RH002.jpg" "RH002 - Geboortelap Prinses Amalia"
copy_image "30.JPEG" "rh/RH003.jpg" "RH003 - Inhuldiging Koningin Beatrix"
copy_image "36.JPEG" "rh/RH004.jpg" "RH004 - Koninklijk ceremonieel"
copy_image "25.JPEG" "rh/RH005.jpg" "RH005 - De Gouden Koets"
echo ""

# Collection 2: Zaanse Schans (ZS)
echo "📦 Collection 2: Zaanse Taferelen (Zaan Scenes)"
copy_image "12.JPEG" "zs/ZS001.jpg" "ZS001 - Zaanse Schans"
copy_image "22.JPEG" "zs/ZS002.jpg" "ZS002 - Drie Zaanse Molens"
copy_image "43.JPEG" "zs/ZS003.jpg" "ZS003 - Zaanse Huisjes"
copy_image "58.JPEG" "zs/ZS004.jpg" "ZS004 - Zaanse molen op de Zaanse Schans"
# Note: Package needs 5 works, but only 4 listed (12 has two versions)
echo "  ⚠ NOTE: Need ZS005 - second version of nr. 12?"
echo ""

# Collection 3: Windmills (WM)
echo "📦 Collection 3: Molens & Meesters van de Wind (Windmills)"
copy_image "31.JPEG" "wm/WM001.jpg" "WM001 - Molentje"
copy_image "35.JPEG" "wm/WM002.jpg" "WM002 - Molen en zeilschip"
copy_image "41.JPEG" "wm/WM003.jpg" "WM003 - Watermolen"
copy_image "56.JPEG" "wm/WM004.jpg" "WM004 - Zaanse molen"
echo "  ✗ MISSING: Nr. 65 needed for WM005 - Molen (groter werk)"
echo ""

# Collection 4: City & Street (CS)
echo "📦 Collection 4: Stad & Straat (City & Street)"
copy_image "2.JPEG" "cs/CS001.jpg" "CS001 - Waterlooplein, Amsterdam"
copy_image "49.JPEG" "cs/CS002.jpg" "CS002 - Grote Geveltjes"
echo "  ✗ MISSING: Nr. 66 needed for CS003 - Zicht op Amsterdam"
echo "  ✗ MISSING: Nr. 67 needed for CS004 - Hollandse Geveltjes"
echo "  ✗ MISSING: Nr. 68 needed for CS005 - Haarlem"
echo ""

# Collection 5: Samplers (SM)
echo "📦 Collection 5: Nederland in Stof (Samplers & Identity)"
copy_image "4.JPEG" "sm/SM001.jpg" "SM001 - Merklap 1821"
copy_image "11.JPEG" "sm/SM002.jpg" "SM002 - Oud West-Friesland"
copy_image "13.JPEG" "sm/SM003.jpg" "SM003 - Nederland"
copy_image "40.JPEG" "sm/SM004.jpg" "SM004 - Merklap Zaanstreek"
copy_image "48.JPEG" "sm/SM005.jpg" "SM005 - Klederdracht"
echo ""

# Collection 6: Folk Life (FL)
echo "📦 Collection 6: Van Alles Wat (Folk Life & Tradition)"
echo "  ✗ MISSING: Nr. 60 needed for FL001 - Knikkeren"
echo "  ✗ MISSING: Nr. 61 needed for FL002 - Kindjes met een hoepel"
echo "  ✗ MISSING: Nr. 62 needed for FL003 - Kindjes aan 't winkelen"
copy_image "10.JPEG" "fl/FL004.jpg" "FL004 - Bollenvelden"
copy_image "51.JPEG" "fl/FL005.jpg" "FL005 - Delfts blauw"
echo "  ⚠ NOTE: Nr. 46 (Boerderijtje) listed twice - using 46a.JPEG as backup if needed"
echo ""

# Create thumbnails (simple copy for now - can be optimized later)
echo "📸 Creating thumbnails..."
for collection in rh zs wm cs sm fl; do
  if [ -d "images/collections/$collection" ]; then
    for img in images/collections/$collection/*.jpg; do
      if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)
        cp "$img" "images/collections/$collection/${filename}-thumb.jpg"
      fi
    done
  fi
done
echo "✓ Thumbnails created (note: these are full-size copies - optimize later)"
echo ""

# Hero image (use one of the nice overview images)
echo "🖼️  Setting up hero image..."
if [ -f "images/1.JPEG" ]; then
  cp "images/1.JPEG" "images/hero/embroidery-collection.jpg"
  echo "✓ Hero image set (using 1.JPEG)"
else
  echo "⚠ No hero image - please add manually to images/hero/"
fi
echo ""

echo "✅ Image organization complete!"
echo ""
echo "📋 Summary:"
echo "  ✓ Royal House: 5/5 works"
echo "  ⚠ Zaanse Schans: 4/5 works (need 2nd version of nr. 12 or choose different work)"
echo "  ⚠ Windmills: 4/5 works (missing nr. 65)"
echo "  ⚠ City & Street: 2/5 works (missing nr. 66, 67, 68)"
echo "  ✓ Samplers: 5/5 works"
echo "  ⚠ Folk Life: 2/5 works (missing nr. 60, 61, 62)"
echo ""
echo "📌 Next steps:"
echo "  1. Add missing image files to images/ folder"
echo "  2. Re-run this script to organize new files"
echo "  3. Add certificates to images/certificates/nl/ and images/certificates/en/"
echo "  4. Optimize thumbnails for web (resize to ~400px)"
echo ""
