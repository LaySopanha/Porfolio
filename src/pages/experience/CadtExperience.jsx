import React from 'react'
import RichExperienceView from '../../components/RichExperienceView'
import { cadtStory } from '../../data/experienceStories/cadt'

const CadtExperience = () => {
    return (
        <div className="h-full w-full overflow-y-auto custom-scrollbar bg-white/40">
            <RichExperienceView data={cadtStory} />
        </div>
    )
}

export default CadtExperience
