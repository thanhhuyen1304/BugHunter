import React, { useEffect, useState } from 'react'
import {
  Code,
  BookOpen,
  BarChart,
  CheckCircle,
  Clock,
  Award,
  Trophy,
} from 'lucide-react'
import { useLanguage } from './contexts/LanguageContext'

const Features: React.FC = () => {
  const { language, t } = useLanguage()
  const [activeFeature, setActiveFeature] = useState(0)
  // Generic achievement card data (shared/common)
  const genericCompleted = 24
  const genericTotal = 30
  const genericLearningTime = '12h 30m'
  const genericRankingText = 'Top 15%'

  // State used to display values (initialized with generic)
  const [completed, setCompleted] = useState<number>(genericCompleted)
  const [total, setTotal] = useState<number>(genericTotal)
  const [learningTime, setLearningTime] = useState<string>(genericLearningTime)
  const [rankingText, setRankingText] = useState<string>(genericRankingText)

  // Fetch real progress for logged-in user
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

    const abortController = new AbortController()

    fetch(`${API_BASE}/api/users/me/progress`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      signal: abortController.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((json) => {
        if (json && json.success && json.data) {
          const d = json.data
          setCompleted(typeof d.completed === 'number' ? d.completed : genericCompleted)
          setTotal(typeof d.total === 'number' ? d.total : genericTotal)
          if (typeof d.learningTimeMinutes === 'number') {
            const h = Math.floor(d.learningTimeMinutes / 60)
            const m = d.learningTimeMinutes % 60
            setLearningTime(`${h}h ${m}m`)
          }
          if (typeof d.rankingPercent === 'number') {
            setRankingText(`Top ${d.rankingPercent}%`)
          }
        }
      })
      .catch(() => {
        // ignore errors and keep generic values
      })

    return () => abortController.abort()
  }, [])

  const features = [
    {
      icon: <Code size={32} className="text-[#FF007A]" />,
      title: 'Code Challenge',
      description:
        language === 'vi'
          ? 'Thử thách debug với các level khác nhau từ cơ bản đến nâng cao, giúp bạn rèn luyện khả năng phát hiện và sửa lỗi.'
          : 'Debug challenges with different levels from basic to advanced, helping you train your ability to detect and fix errors.',
      stats: [
        { value: '500+', label: language === 'vi' ? 'Bài tập' : 'Exercises' },
        { value: '5', label: language === 'vi' ? 'Cấp độ' : 'Levels' },
      ],
      color: 'from-[#FF007A] to-[#A259FF]',
      bgColor: 'bg-[#FFF2F8] dark:bg-[#2B1B3D]/40',
    },
    {
      icon: <BookOpen size={32} className="text-[#A259FF]" />,
      title: 'Interactive Learning',
      description:
        language === 'vi'
          ? 'Học qua video và bài tập thực hành với phản hồi tức thì, giúp bạn hiểu sâu về nguyên nhân gây ra lỗi và cách khắc phục.'
          : 'Learn through videos and exercises with instant feedback to understand causes and solutions.',
      stats: [
        { value: '200+', label: language === 'vi' ? 'Video bài giảng' : 'Videos' },
        { value: '24/7', label: language === 'vi' ? 'Hỗ trợ' : 'Support' },
      ],
      color: 'from-[#C77DFF] to-[#A259FF]',
      bgColor: 'bg-[#F6EDFF] dark:bg-[#1F1A2E]/40',
    },
    {
      icon: <BarChart size={32} className="text-[#00BFA6]" />,
      title: 'Progress Tracking',
      description:
        language === 'vi'
          ? 'Theo dõi tiến độ học tập chi tiết, biết được điểm mạnh, điểm yếu để tập trung vào kỹ năng cần cải thiện.'
          : 'Track detailed progress and identify strengths and weaknesses.',
      stats: [
        { value: '100%', label: language === 'vi' ? 'Cá nhân hóa' : 'Personalized' },
        { value: '8', label: language === 'vi' ? 'Báo cáo chi tiết' : 'Reports' },
      ],
      color: 'from-[#00BFA6] to-[#00E5FF]',
      bgColor: 'bg-[#E0FBF6] dark:bg-[#0C2A29]/40',
    },
  ]

  const additionalFeatures = [
    { icon: <CheckCircle size={20} />, text: language === 'vi' ? 'Bài học theo chủ đề và ngôn ngữ lập trình' : 'Lessons by topic and language' },
    { icon: <CheckCircle size={20} />, text: language === 'vi' ? 'Cộng đồng hỗ trợ lớn' : 'Large support community' },
    { icon: <CheckCircle size={20} />, text: language === 'vi' ? 'Chứng chỉ hoàn thành' : 'Completion certificates' },
    { icon: <CheckCircle size={20} />, text: language === 'vi' ? 'Cập nhật nội dung thường xuyên' : 'Regular content updates' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // (No per-user progress here — the achievement card shows shared/generic data)

  return (
    <section className="py-24 bg-gradient-to-br from-white via-[#FAF5FF] to-[#FFF4FA] dark:from-[#0E0A12] dark:via-[#14101D] dark:to-[#1A1623] relative overflow-hidden">
      {/* background blur */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF007A]/10 dark:bg-[#A259FF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#A259FF]/10 dark:bg-[#FF007A]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            {t('features.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            {t('features.subtitle')}
          </p>
        </div>

        {/* main features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-2xl p-8 border border-transparent hover:border-[#A259FF]/30 hover:shadow-[0_0_25px_rgba(162,89,255,0.2)] transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
              <div className="flex justify-between items-center">
                {feature.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#FF007A] to-[#A259FF] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              {activeFeature === index && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-[#A259FF] rounded-full animate-ping"></div>
              )}
            </div>
          ))}
        </div>

        {/* additional features */}
        <div className="bg-gradient-to-br from-[#FFE6F0] via-[#F2E8FF] to-[#E6F0FF] dark:from-[#1A1520] dark:via-[#1E162A] dark:to-[#151627] rounded-2xl p-10 shadow-[0_0_30px_rgba(162,89,255,0.25)] border border-[#A259FF]/30 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* text */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'vi' ? 'Tính năng bổ sung' : 'Additional Features'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {language === 'vi'
                  ? 'BugHunter không chỉ là nền tảng học debug, mà còn là một hệ sinh thái hoàn chỉnh giúp bạn chinh phục lỗi lập trình theo cách thú vị nhất.'
                  : 'BugHunter is not just a debugging platform, but a full learning ecosystem that makes fixing bugs fun and rewarding.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {additionalFeatures.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF007A] to-[#A259FF] flex items-center justify-center text-white mr-3 shadow-md">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* achievement card */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="mr-4 p-3 rounded-full bg-gradient-to-br from-[#FF007A] to-[#A259FF] text-white shadow-md">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {language === 'vi' ? 'Thành tích của bạn' : 'Your Achievements'}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'vi' ? 'Tuần này' : 'This week'}</p>
                  </div>
                </div>

                {/* progress */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{language === 'vi' ? 'Bài tập đã hoàn thành' : 'Completed exercises'}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{completed}/{total}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-[#FF007A] to-[#A259FF] h-2.5 rounded-full" style={{ width: `${Math.round((completed / total) * 100)}%` }}></div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-700 dark:text-gray-300">{language === 'vi' ? 'Thời gian học' : 'Learning time'}</span>
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
                      <span className="font-medium text-gray-900 dark:text-white">{learningTime}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#FFEDF9] to-[#E8D6FF] dark:from-[#2B1B3D] dark:to-[#1E1A2E] rounded-xl shadow-inner">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'vi' ? 'Xếp hạng của bạn' : 'Your ranking'}
                      </span>
                      <div className="font-bold text-xl bg-gradient-to-r from-[#FF007A] to-[#A259FF] bg-clip-text text-transparent">
                        {rankingText}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                      <Trophy size={20} className="text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* floating badge */}
              <div className="absolute -bottom-4 -right-4 z-50 bg-gradient-to-br from-[#FF007A] to-[#A259FF] text-white px-5 py-3 rounded-xl shadow-lg transform rotate-2">
                <div className="text-sm font-bold">
                  {language === 'vi' ? '+25 điểm hôm nay' : '+25 points today'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
