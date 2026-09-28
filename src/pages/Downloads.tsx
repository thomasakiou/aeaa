import { FileText, Download } from 'lucide-react';
import '../styles/animations.css';
import './css/Downloads.css';

export default function Downloads() {
    const documents = [
        {
            title: "Conference Brochure",
            description: "Detailed overview of the 43rd AEAA Conference, including schedules and event details.",
            filename: "conference-brochure.pdf",
            path: "/docs/conference-brochure.pdf",
            size: "2.4 MB"
        },
        {
            title: "Conference Manual",
            description: "A comprehensive guide for delegates, including guidelines, maps, and important contacts.",
            filename: "conference-manual.pdf",
            path: "/docs/conference-manual.pdf",
            size: "5.1 MB"
        },
        {
            title: "Conference Booklet",
            description: "A comprehensive guide for delegates, including guidelines and important contacts.",
            filename: "conference-booklet.pdf",
            path: "/docs/conference-booklet.pdf",
            size: "3.50 MB"
        }
    ];

    return (
        <div className="downloads-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">Document <span style={{ opacity: 0.7 }}>Downloads</span></h1>
                <p className="animate-fade-up-d1">Access important materials and resources for the 43rd AEAA Conference.</p>
            </div>

            <div className="page-body container">
                <div className="downloads-container">
                    {documents.map((doc, index) => (
                        <div key={index} className={`glass-panel download-card animate-fade-up-d${index + 2}`}>
                            <div className="download-info">
                                <div className="download-icon-wrapper">
                                    <FileText size={32} />
                                </div>
                                <div>
                                    <h3 className="download-title">{doc.title}</h3>
                                    <p className="download-description">
                                        {doc.description}
                                    </p>
                                    <div className="download-metadata">
                                        <span>PDF Format</span>
                                        <span>•</span>
                                        <span>{doc.size}</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={doc.path}
                                download={doc.filename}
                                className="btn btn-primary download-btn"
                            >
                                <Download size={18} />
                                Download
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
