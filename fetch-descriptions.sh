#!/bin/bash

# Fetch embroidery descriptions from GitHub
# Maps our work IDs to the original numbering

cd "$(dirname "$0")"

BASE_URL="https://raw.githubusercontent.com/hiddedesmet/stichingdutchheritage/main/my-github-pages-site/content/embroideries/text"

echo "📥 Downloading embroidery descriptions from GitHub..."
echo ""

mkdir -p content/descriptions

# Function to download a single description
download_description() {
    local work_id="$1"
    local original_num="$2"
    local url="${BASE_URL}/${original_num}.md"
    local output="content/descriptions/${work_id}.md"

    if curl -f -s "$url" -o "$output" 2>/dev/null; then
        echo "  ✓ Downloaded ${work_id} (from ${original_num}.md)"
    else
        echo "  ✗ FAILED: ${work_id} (original #${original_num})"
    fi
}

# Royal House Collection
echo "📦 Royal House Collection:"
download_description "RH001" "21"
download_description "RH002" "27"
download_description "RH003" "30"
download_description "RH004" "36"
download_description "RH005" "25"
echo ""

# Zaanse Schans Collection
echo "📦 Zaanse Taferelen:"
download_description "ZS001" "12"
download_description "ZS002" "22"
download_description "ZS003" "43"
download_description "ZS004" "58"
echo ""

# Windmills Collection
echo "📦 Molens & Meesters van de Wind:"
download_description "WM001" "31"
download_description "WM002" "35"
download_description "WM003" "41"
download_description "WM004" "56"
echo ""

# City & Street Collection
echo "📦 Stad & Straat:"
download_description "CS001" "2"
download_description "CS002" "49"
echo ""

# Samplers Collection
echo "📦 Nederland in Stof:"
download_description "SM001" "4"
download_description "SM002" "11"
download_description "SM003" "13"
download_description "SM004" "40"
download_description "SM005" "48"
echo ""

# Folk Life Collection
echo "📦 Van Alles Wat:"
download_description "FL004" "10"
download_description "FL005" "51"
echo ""

echo "✅ Download complete!"
echo ""
echo "📁 Files saved to: content/descriptions/"
echo ""
echo "📋 Summary:"
ls -1 content/descriptions/*.md 2>/dev/null | wc -l | xargs echo "  Total files downloaded:"
