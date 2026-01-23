/**
 * Embroidery Descriptions Module
 * Loads and parses markdown description files for each work
 */

class DescriptionsManager {
  constructor() {
    this.descriptions = new Map();
    this.loadingPromises = new Map();
  }

  /**
   * Parse markdown frontmatter and content
   */
  parseMarkdown(content) {
    // Extract YAML frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) {
      return null;
    }

    const [, frontmatter, body] = frontmatterMatch;

    // Parse frontmatter
    const metadata = {};
    frontmatter.split('\n').forEach(line => {
      const match = line.match(/^(\w+(?:_\w+)?)\s*:\s*"?([^"]+)"?$/);
      if (match) {
        const [, key, value] = match;
        metadata[key] = value.replace(/^"|"$/g, '');
      }
    });

    // Split body into NL and EN sections
    const sections = body.split(/^# /m).filter(s => s.trim());
    const nlSection = sections.find(s => s.startsWith('Dutch Description') || s.startsWith('Merklap'));
    const enSection = sections.find(s => s.startsWith('English Description') || s.startsWith('Sampler'));

    const extractText = (section) => {
      if (!section) return '';
      return section
        .split('\n')
        .slice(1) // Skip the heading
        .join('\n')
        .trim();
    };

    return {
      metadata,
      description_nl: extractText(nlSection),
      description_en: extractText(enSection)
    };
  }

  /**
   * Load description for a specific work ID
   */
  async loadDescription(workId) {
    // Return cached if available
    if (this.descriptions.has(workId)) {
      return this.descriptions.get(workId);
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(workId)) {
      return this.loadingPromises.get(workId);
    }

    // Start loading
    const loadPromise = fetch(`content/descriptions/${workId}.md`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load description for ${workId}`);
        }
        return response.text();
      })
      .then(content => {
        const parsed = this.parseMarkdown(content);
        if (parsed) {
          this.descriptions.set(workId, parsed);
          return parsed;
        }
        throw new Error(`Failed to parse description for ${workId}`);
      })
      .catch(error => {
        console.warn(`Could not load description for ${workId}:`, error);
        return null;
      })
      .finally(() => {
        this.loadingPromises.delete(workId);
      });

    this.loadingPromises.set(workId, loadPromise);
    return loadPromise;
  }

  /**
   * Get description for a work (loads if needed)
   */
  async getDescription(workId) {
    return await this.loadDescription(workId);
  }

  /**
   * Get short description for tooltip
   */
  getShortDescription(description, lang = 'en') {
    if (!description) return '';

    const key = lang === 'nl' ? 'description_nl' : 'description_en';
    const fullText = description[key];

    if (!fullText) return '';

    // Get first paragraph
    const firstParagraph = fullText.split('\n\n')[0];

    // Limit to ~150 characters
    if (firstParagraph.length <= 150) {
      return firstParagraph;
    }

    return firstParagraph.substring(0, 147) + '...';
  }

  /**
   * Format description as HTML
   */
  formatDescriptionHTML(description, lang = 'en') {
    if (!description) return '';

    const key = lang === 'nl' ? 'description_nl' : 'description_en';
    const text = description[key];

    if (!text) return '';

    // Convert paragraphs to HTML
    return text
      .split('\n\n')
      .map(para => `<p>${para.trim()}</p>`)
      .join('\n');
  }
}

// Create global instance
window.descriptionsManager = new DescriptionsManager();
