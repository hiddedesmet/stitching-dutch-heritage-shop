#!/bin/bash

# Create simple text-based placeholder certificates
# These will be replaced with real certificates later

cd "$(dirname "$0")"

echo "📜 Creating placeholder certificates..."

# Function to create a simple certificate placeholder using ImageMagick (if available)
# Otherwise just copy the work image
create_certificate_placeholder() {
    local work_id="$1"
    local lang="$2"
    local collection_id=$(echo $work_id | cut -c1-2 | tr '[:upper:]' '[:lower:]')
    local source_image="images/collections/${collection_id}/${work_id}.jpg"
    local output_nl="images/certificates/nl/${work_id}-NL.jpg"
    local output_en="images/certificates/en/${work_id}-EN.jpg"

    if [ -f "$source_image" ]; then
        # Just copy for now - real certificates will be added later
        cp "$source_image" "$output_nl"
        cp "$source_image" "$output_en"
        echo "  ✓ Created placeholder for $work_id"
    fi
}

# Create placeholders for all works
for collection in RH ZS WM CS SM FL; do
    case $collection in
        RH) count=5 ;;
        ZS) count=4 ;;
        WM) count=4 ;;
        CS) count=2 ;;
        SM) count=5 ;;
        FL) count=2 ;;  # FL004 and FL005
    esac

    for i in $(seq 1 $count); do
        if [ $collection = "FL" ]; then
            # FL has special numbering (FL004, FL005)
            [ $i -eq 1 ] && num="004" || num="005"
        else
            num=$(printf "%03d" $i)
        fi
        create_certificate_placeholder "${collection}${num}"
    done
done

echo ""
echo "✅ Placeholder certificates created!"
echo ""
echo "📋 Note: These are temporary placeholders (copies of the work images)"
echo "    Replace with real certificate scans when available."
