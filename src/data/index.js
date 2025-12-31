import { personal } from './personal'
import { education } from './education'
import { publications } from './publications'
import { experience } from './experience'
import { projects } from './projects'
import { skills } from './skills'
import { honors } from './honors'
import { dgistStory } from './experienceStories/dgist'

export const cvData = {
    personal,
    education,
    publications,
    experience,
    projects,
    skills,
    honors,
    experienceStories: {
        dgist: dgistStory
    }
}

export {
    personal,
    education,
    publications,
    experience,
    projects,
    skills,
    honors,
    dgistStory
}
