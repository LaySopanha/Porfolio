import React from 'react'
import RichExperienceView from '../../components/RichExperienceView'
import { idriStory } from '../../data/experienceStories/idri'

const IdriExperience = () => {
    return (
        <div className="h-full w-full overflow-y-auto custom-scrollbar bg-white/40">
            <RichExperienceView data={idriStory} />
        </div>
    )
}

export default IdriExperience
