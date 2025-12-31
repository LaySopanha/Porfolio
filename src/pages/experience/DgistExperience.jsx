import RichExperienceView from '../../components/RichExperienceView'
import { cvData, dgistStory } from '../../data'

const DGIST_INDEX = 0

const DgistExperience = () => {
    const experience = cvData.experience[DGIST_INDEX]

    if (!experience) {
        return (
            <div className="h-full w-full flex items-center justify-center text-text-muted bg-white/40">
                DGIST experience data unavailable.
            </div>
        )
    }

    return (
        <div className="h-full w-full overflow-y-auto custom-scrollbar bg-white/40">
            <RichExperienceView
                data={{
                    ...dgistStory,
                    title: experience.role,
                    company: experience.company,
                }}
            />
        </div>
    )
}

export default DgistExperience

