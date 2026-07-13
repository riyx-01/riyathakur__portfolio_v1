const fs = require('fs');

const path = 'e:\\my_projects\\my_final_portfolio\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const startStr = '<div className="projects-deck" id="projects-deck">';
const endStr = '                        <div className="deck-controls">';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex + startStr.length);
    const after = content.substring(endIndex);
    
    const replacement = `
                                {projectsData.map((proj, idx) => (
                                    <ProjectTicket 
                                        key={idx}
                                        index={idx + 1}
                                        title={proj.title}
                                        subtitle={proj.subtitle}
                                        stack={proj.stack}
                                        desc={proj.desc}
                                        features={proj.features}
                                        demo={proj.demo}
                                        link={proj.link}
                                        linkText={proj.linkText}
                                        theme={proj.theme}
                                    />
                                ))}
                            </div>
                        </div>
`;
    
    fs.writeFileSync(path, before + replacement + after);
    console.log('Successfully replaced projects deck.');
} else {
    console.log('Could not find start or end bounds.');
}
