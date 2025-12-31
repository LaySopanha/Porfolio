import { motion } from 'framer-motion'
import { GitCommit, Folder, Code2, TrendingUp, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'

const ActivityStats = () => {
    const [githubData, setGithubData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hoveredDay, setHoveredDay] = useState(null)

    const GITHUB_USERNAME = 'LaySopanha' // From cv.js

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Fetch user data
                const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
                const userData = await userResponse.json()

                // Fetch events (recent activity)
                const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`)
                const eventsData = await eventsResponse.json()

                // Fetch repos
                const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
                const reposData = await reposResponse.json()

                setGithubData({
                    user: userData,
                    events: eventsData,
                    repos: reposData
                })
            } catch (error) {
                console.error('Error fetching GitHub data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGitHubData()
    }, [])

    // Generate heatmap from events
    const generateHeatmapData = () => {
        const data = []
        const today = new Date()
        const dayMap = new Map()

        // Initialize all days with 0
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            const dateStr = date.toISOString().split('T')[0]
            dayMap.set(dateStr, { date: dateStr, level: 0, count: 0 })
        }

        // Count events per day if we have GitHub data
        if (githubData?.events) {
            githubData.events.forEach(event => {
                const eventDate = new Date(event.created_at).toISOString().split('T')[0]
                if (dayMap.has(eventDate)) {
                    const day = dayMap.get(eventDate)
                    day.count += 1
                }
            })

            // Calculate levels based on count
            const maxCount = Math.max(...Array.from(dayMap.values()).map(d => d.count), 1)
            dayMap.forEach(day => {
                if (day.count === 0) day.level = 0
                else if (day.count <= maxCount * 0.25) day.level = 1
                else if (day.count <= maxCount * 0.5) day.level = 2
                else if (day.count <= maxCount * 0.75) day.level = 3
                else day.level = 4
            })
        }

        return Array.from(dayMap.values())
    }

    const heatmapData = generateHeatmapData()

    // Group data by weeks
    const weeks = []
    for (let i = 0; i < heatmapData.length; i += 7) {
        weeks.push(heatmapData.slice(i, i + 7))
    }

    // Calculate stats
    const totalCommits = heatmapData.reduce((sum, day) => sum + day.count, 0)
    const thisMonthCommits = heatmapData
        .filter(day => {
            const date = new Date(day.date)
            const now = new Date()
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
        })
        .reduce((sum, day) => sum + day.count, 0)
    
    const currentStreak = (() => {
        let streak = 0
        for (let i = heatmapData.length - 1; i >= 0; i--) {
            if (heatmapData[i].level > 0) streak++
            else break
        }
        return streak
    })()

    const activeRepos = githubData?.repos?.filter(repo => {
        const lastUpdate = new Date(repo.updated_at)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return lastUpdate > thirtyDaysAgo
    }).length || 0

    const getLevelColor = (level) => {
        const colors = [
            'bg-gray-100 border-gray-200',      // 0 - no activity
            'bg-green-200 border-green-300',    // 1 - low
            'bg-green-400 border-green-500',    // 2 - medium
            'bg-green-600 border-green-700',    // 3 - high
            'bg-green-800 border-green-900'     // 4 - very high
        ]
        return colors[level] || colors[0]
    }

    const StatCard = ({ icon: Icon, label, value, color = "primary" }) => (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white/60 backdrop-blur-sm border border-primary/20 rounded-lg p-4 flex items-center gap-3 shadow-sm"
        >
            <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>
                <Icon size={20} />
            </div>
            <div>
                <div className="text-2xl font-black text-text-main">{loading ? '...' : value}</div>
                <div className="text-xs font-bold text-text-muted uppercase">{label}</div>
            </div>
        </motion.div>
    )

    if (loading) {
        return (
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-6 border-b-2 border-primary/10 pb-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <h2 className="text-sm font-bold ml-2 font-mono text-text-muted">~/ACTIVITY/DASHBOARD</h2>
                </div>
                <div className="bg-white/60 backdrop-blur-sm border border-primary/20 rounded-lg p-10 shadow-sm text-center">
                    <div className="text-text-muted font-mono text-sm">Loading GitHub activity...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="mb-10">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6 border-b-2 border-primary/10 pb-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <h2 className="text-sm font-bold ml-2 font-mono text-text-muted">~/ACTIVITY/DASHBOARD</h2>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <StatCard icon={GitCommit} label="Recent Events" value={totalCommits} color="secondary" />
                <StatCard icon={Calendar} label="This Month" value={thisMonthCommits} color="primary" />
                <StatCard icon={Code2} label="Current Streak" value={`${currentStreak}d`} color="accent" />
                <StatCard icon={Folder} label="Active Repos" value={activeRepos} color="text-main" />
            </div>

            {/* Contribution Heatmap */}
            <div className="bg-white/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-text-muted uppercase">Contribution Activity</h3>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-text-muted">Less</span>
                        <div className="flex gap-1">
                            {[0, 1, 2, 3, 4].map(level => (
                                <div key={level} className={`w-3 h-3 rounded-sm border ${getLevelColor(level)}`}></div>
                            ))}
                        </div>
                        <span className="text-text-muted">More</span>
                    </div>
                </div>

                {/* Heatmap Grid */}
                <div className="overflow-x-auto">
                    <div className="inline-flex gap-1 min-w-full">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1">
                                {week.map((day, dayIndex) => (
                                    <motion.div
                                        key={day.date}
                                        whileHover={{ scale: 1.3, zIndex: 10 }}
                                        onHoverStart={() => setHoveredDay(day)}
                                        onHoverEnd={() => setHoveredDay(null)}
                                        className={`w-3 h-3 rounded-sm border cursor-pointer transition-all ${getLevelColor(day.level)}`}
                                        title={`${day.date}: ${day.count} commits`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hover Tooltip */}
                {hoveredDay && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-text-main text-white rounded-lg text-xs font-mono"
                    >
                        <div className="font-bold">{hoveredDay.date}</div>
                        <div>{hoveredDay.count} {hoveredDay.count === 1 ? 'event' : 'events'} on this day</div>
                    </motion.div>
                )}

                {/* Month Labels */}
                <div className="flex justify-between mt-2 text-[10px] text-text-muted font-mono">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                </div>
            </div>
        </div>
    )
}

export default ActivityStats
