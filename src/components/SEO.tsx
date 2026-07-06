/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { PageId } from '../types';

interface SEOProps {
  page: PageId;
  subTitle?: string;
}

export default function SEO({ page, subTitle }: SEOProps) {
  useEffect(() => {
    // Determine dynamic page title
    const baseTitle = "Build Cool Things With AI | Official YouTube Brand Hub";
    let dynamicTitle = baseTitle;
    let description = "Official home of Build Cool Things With AI YouTube channel. Discover high-quality coding tutorials, real-world AI projects, interactive roadmaps, and full open-source repositories.";
    let keywords = "AI, prompt to product, coding tutorials, React, TypeScript, Gemini API, AI Agents, Tailwind CSS, Vercel, Firebase, software engineering";

    switch (page) {
      case 'home':
        dynamicTitle = `From Prompt to Product | ${baseTitle}`;
        break;
      case 'episodes':
        dynamicTitle = subTitle ? `${subTitle} | Episodes | Build Cool Things With AI` : `Episodes & Tutorials | Build Cool Things With AI`;
        description = "Browse all episodes of Build Cool Things With AI. Video tutorials, code walk-throughs, and tags to filter by Gemini API, React, motion, and backend databases.";
        keywords = "YouTube episodes, web dev tutorials, agent debate, mindful synthesizers, coding video guide";
        break;
      case 'projects':
        dynamicTitle = subTitle ? `${subTitle} | Projects | Build Cool Things With AI` : `Open Source AI Projects | Build Cool Things With AI`;
        description = "Discover our catalog of open-source AI and web development projects, including Agent Debate Arenas, Breathing Synths, and Kanban boards with live demo URLs.";
        keywords = "open source, github repositories, live web demos, agent applications, code repositories";
        break;
      case 'about':
        dynamicTitle = `Our Story & Philosophy | Build Cool Things With AI`;
        description = "Meet Alex Rivera, creator of Build Cool Things With AI, and learn about our mission to empower developers to partner with AI to build spectacular software products.";
        keywords = "Alex Rivera, teaching philosophy, future of coding, AI pair programming, developer brand story";
        break;
      case 'contact':
        dynamicTitle = `Contact & Support | Build Cool Things With AI`;
        description = "Get in touch with the Build Cool Things With AI brand. Submit project suggestions, general queries, or connect through GitHub, Twitter, and LinkedIn.";
        keywords = "contact form, connect developer, support email, social links, send suggestions";
        break;
      default:
        dynamicTitle = `Page Not Found | Build Cool Things With AI`;
    }

    document.title = dynamicTitle;

    // Update Meta Description
    let metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (!metaDescriptionEl) {
      metaDescriptionEl = document.createElement('meta');
      metaDescriptionEl.setAttribute('name', 'description');
      document.head.appendChild(metaDescriptionEl);
    }
    metaDescriptionEl.setAttribute('content', description);

    // Update Meta Keywords
    let metaKeywordsEl = document.querySelector('meta[name="keywords"]');
    if (!metaKeywordsEl) {
      metaKeywordsEl = document.createElement('meta');
      metaKeywordsEl.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywordsEl);
    }
    metaKeywordsEl.setAttribute('content', keywords);

    // Update Canonical URL
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', window.location.href);

    // Add Open Graph Meta Tags
    const ogTags = {
      'og:title': dynamicTitle,
      'og:description': description,
      'og:type': 'website',
      'og:url': window.location.href,
      'og:image': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    });

    // Add Twitter Card Tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': dynamicTitle,
      'twitter:description': description,
      'twitter:image': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    });

    // Inject JSON-LD Schema
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Build Cool Things With AI",
      "alternateName": "BCTWAI",
      "url": window.location.origin,
      "description": description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    let schemaScriptEl = document.getElementById('json-ld-schema');
    if (schemaScriptEl) {
      schemaScriptEl.textContent = JSON.stringify(schemaData);
    } else {
      schemaScriptEl = document.createElement('script');
      schemaScriptEl.id = 'json-ld-schema';
      schemaScriptEl.setAttribute('type', 'application/ld+json');
      schemaScriptEl.textContent = JSON.stringify(schemaData);
      document.head.appendChild(schemaScriptEl);
    }
  }, [page, subTitle]);

  return null;
}
