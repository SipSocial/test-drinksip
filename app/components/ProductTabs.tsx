import { useState } from 'react';

interface ProductTabsProps {
  details: string[];
  nutrition?: string[];
  ingredients?: string[];
}

export function ProductTabs({ details, nutrition = [], ingredients = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Details', content: details },
    { id: 'nutrition', label: 'Nutrition Facts', content: nutrition },
    { id: 'ingredients', label: 'Ingredients', content: ingredients },
  ];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Tab Headers */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e5e7eb'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: activeTab === tab.id ? '#f9fafb' : 'transparent',
              color: activeTab === tab.id ? '#000' : '#666',
              fontWeight: activeTab === tab.id ? 600 : 400,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderBottom: activeTab === tab.id ? '2px solid #000' : '2px solid transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        padding: '2rem'
      }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              display: activeTab === tab.id ? 'block' : 'none'
            }}
          >
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {tab.content.map((item, index) => (
                <li
                  key={index}
                  style={{
                    padding: '0.75rem 0',
                    borderBottom: index < tab.content.length - 1 ? '1px solid #f3f4f6' : 'none',
                    fontSize: '0.95rem',
                    color: '#374151',
                    fontWeight: 500
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
