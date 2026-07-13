import React from 'react';
import './ProjectTicket.css';

export interface ProjectTicketProps {
    title: string;
    subtitle: string;
    stack: string;
    desc: React.ReactNode;
    features?: React.ReactNode;
    demo?: React.ReactNode;
    link?: string;
    linkText?: string;
    theme: 'blue' | 'red';
    index: number | string;
    typeLabel?: string;
    descLabel?: string;
    featuresLabel?: string;
    demoLabel?: string;
}

export default function ProjectTicket({
    title,
    subtitle,
    stack,
    desc,
    features,
    demo,
    link,
    linkText = 'LAUNCH',
    theme,
    index,
    typeLabel = 'Project',
    descLabel = 'Description',
    featuresLabel = 'Features',
    demoLabel = 'Demonstrates'
}: ProjectTicketProps) {
    const paddedIndex = typeof index === 'number' && index < 10 ? `0${index}` : `${index}`;

    return (
        <div className={`ticket-wrapper ${theme}-theme`}>
            <div className="ticket">
                <div className="t-main">
                    <div className="t-content">
                        <div className="t-header">
                            <div className="t-logo">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                                {subtitle}
                            </div>
                            <div className="t-type">{typeLabel}</div>
                        </div>
                        <div className="t-title">{title}</div>
                        <div className="t-subtitle">{stack}</div>
                        
                        <div className="t-details">
                            <div className="t-detail-item">
                                <span className="t-label">{descLabel}</span>
                                <span className="t-value">{desc}</span>
                            </div>
                            {features && (
                                <div className="t-detail-item">
                                    <span className="t-label">{featuresLabel}</span>
                                    <span className="t-value">{features}</span>
                                </div>
                            )}
                            {demo && (
                                <div className="t-detail-item">
                                    <span className="t-label">{demoLabel}</span>
                                    <span className="t-value">{demo}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className="t-perforation"
                        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', transform: 'translateY(50%)' }}
                    >
                        <div className="t-perf-line"></div>
                    </div>
                </div>
                
                <div className="t-stub">
                    <div className="t-barcode-container">
                        <div className="t-barcode"></div>
                        <div className="t-barcode-id">UI-77-9X04-{paddedIndex}</div>
                    </div>
                    <div className="t-admit" style={{ zIndex: 10 }}>
                        {link ? (
                            <a href={link} target="_blank" rel="noreferrer" className="proj-ticket-link">
                                {linkText}
                            </a>
                        ) : (
                            <>
                                <div className="t-admit-text">Code</div>
                                <div className="t-admit-num">{paddedIndex}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
