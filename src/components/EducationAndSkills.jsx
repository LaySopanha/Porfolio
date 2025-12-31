import { motion } from 'framer-motion'
import SectionContainer from './SectionContainer'
import { cvData } from '../data'

const EducationAndSkills = () => {
    return (
        <SectionContainer id="skills" title="Education & Skills">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Education Column */}
                <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-secondary">01.</span> Education
                    </h3>
                    {cvData.education.map((edu, index) => (
                        <div key={index} className="glass-card p-6">
                            <h4 className="text-xl font-bold mb-2">{edu.school}</h4>
                            <p className="text-violet-400 mb-1">{edu.degree}</p>
                            <p className="text-sm text-gray-400 mb-4">{edu.date} • {edu.gpa}</p>
                            <div className="text-sm text-gray-300">
                                <span className="font-semibold text-white">Relevant Coursework:</span>
                                <p className="mt-2 leading-relaxed opacity-80">{edu.coursework}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skills Column */}
                <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-secondary">02.</span> Technical Skills
                    </h3>
                    <div className="space-y-6">
                        {Object.entries(cvData.skills).map(([category, items], index) => (
                            <div key={index}>
                                <h4 className="text-sm font-mono text-gray-400 mb-3 uppercase tracking-wider">
                                    {category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm hover:border-secondary/50 transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold mt-12 mb-6 flex items-center gap-2">
                        <span className="text-secondary">03.</span> Honors & Awards
                    </h3>
                    <div className="space-y-4">
                        {cvData.honors.map((honor, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                                <div>
                                    <h4 className="font-bold">{honor.title}</h4>
                                    <p className="text-sm text-gray-400">{honor.issuer} • {honor.year}</p>
                                    {honor.description && <p className="text-sm text-gray-500 mt-1">{honor.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    )
}

export default EducationAndSkills
