import React from 'react';

export default function TypographyDemo() {
  return (
    <div className="container-lg py-8">
      <div className="space-y-8">
        {/* Display Text Examples */}
        <section>
          <h2 className="text-headline-large mb-4">Display Text</h2>
          <div className="space-y-4">
            <h1 className="text-display-large">Display Large - Hero Headlines</h1>
            <h1 className="text-display-medium">Display Medium - Major Headlines</h1>
            <h1 className="text-display-small">Display Small - Section Headlines</h1>
          </div>
        </section>

        {/* Headlines Examples */}
        <section>
          <h2 className="text-headline-large mb-4">Headlines</h2>
          <div className="space-y-3">
            <h2 className="text-headline-large">Headline Large - Section Titles</h2>
            <h3 className="text-headline-medium">Headline Medium - Subsection Titles</h3>
            <h4 className="text-headline-small">Headline Small - Card Titles</h4>
          </div>
        </section>

        {/* Body Text Examples */}
        <section>
          <h2 className="text-headline-large mb-4">Body Text</h2>
          <div className="space-y-4">
            <p className="text-body-large">
              Body Large - This is used for important body text that needs more emphasis. 
              It provides excellent readability for key content sections.
            </p>
            <p className="text-body-medium">
              Body Medium - This is the standard body text size used throughout the application. 
              It offers optimal readability for most content types and maintains good visual hierarchy.
            </p>
            <p className="text-body-small text-secondary">
              Body Small - This is used for secondary information, captions, and supporting text. 
              It&apos;s perfect for metadata and less critical information.
            </p>
          </div>
        </section>

        {/* Labels and UI Text */}
        <section>
          <h2 className="text-headline-large mb-4">Labels & UI Text</h2>
          <div className="space-y-3">
            <div>
              <label className="text-label-large block mb-2">Label Large - Form Labels</label>
              <input 
                type="text" 
                placeholder="Input field example"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="text-label-medium block mb-1">Label Medium - Secondary Labels</label>
              <span className="text-label-small text-muted">Label Small - Helper Text</span>
            </div>
          </div>
        </section>

        {/* Supporting Text */}
        <section>
          <h2 className="text-headline-large mb-4">Supporting Text</h2>
          <div className="space-y-2">
            <p className="text-caption text-muted">Caption - Timestamps, metadata, and fine print</p>
            <p className="text-overline text-muted">Overline - Categories and Tags</p>
          </div>
        </section>

        {/* Color Examples */}
        <section>
          <h2 className="text-headline-large mb-4">Text Colors</h2>
          <div className="space-y-2">
            <p className="text-primary">Primary - Brand color text</p>
            <p className="text-secondary">Secondary - Muted text</p>
            <p className="text-success">Success - Positive actions</p>
            <p className="text-warning">Warning - Caution text</p>
            <p className="text-error">Error - Danger text</p>
            <p className="text-info">Info - Information text</p>
          </div>
        </section>

        {/* Spacing Examples */}
        <section>
          <h2 className="text-headline-large mb-4">Spacing System (8px Grid)</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="bg-primary-100 p-2 rounded">Padding 2 (8px)</div>
              <div className="bg-primary-100 p-4 rounded">Padding 4 (16px)</div>
              <div className="bg-primary-100 p-6 rounded">Padding 6 (24px)</div>
              <div className="bg-primary-100 p-8 rounded">Padding 8 (32px)</div>
            </div>
          </div>
        </section>

        {/* Professional Card Example */}
        <section>
          <h2 className="text-headline-large mb-4">Professional Card Example</h2>
          <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-200 max-w-md">
            <h3 className="text-headline-medium mb-3">Lincoln High School</h3>
            <p className="text-body-medium text-secondary mb-4">
              A comprehensive educational institution serving grades 9-12 with excellence in academics and athletics.
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-label-medium">📍 123 Education St, Learning City</p>
              <p className="text-label-medium">📞 (555) 123-4567</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary text-white rounded-md text-label-medium hover:bg-primary-700 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-label-medium hover:bg-gray-50 transition-colors">
                Contact
              </button>
            </div>
            <p className="text-caption text-muted mt-4">Last updated 2 hours ago</p>
          </div>
        </section>
      </div>
    </div>
  );
}