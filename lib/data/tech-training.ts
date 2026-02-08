export interface TrainingVideo {
  id: string
  title: string
  expertName: string
  organization: string
  thumbnailUrl: string
  videoUrl?: string
  learnerCount: number
  publishedAt: string
}

export interface TrainingStaffLearning {
  id: string
  name: string
  role: string
  organization: string
  learnedCount: number
  completedCount: number
  lastLearningAt: string
}

// 示例数据：后续可对接真实接口/数据库
export const trainingVideos: TrainingVideo[] = [
  {
    id: "TR-0001",
    title: "驴场科学饲养基础与日常管理",
    expertName: "张老师",
    organization: "省农科院畜牧研究所",
    thumbnailUrl: "/training/thumb-1.svg",
    learnerCount: 128,
    publishedAt: "2025-11-12",
  },
  {
    id: "TR-0002",
    title: "繁殖关键点：配种时机与妊娠管理",
    expertName: "李教授",
    organization: "农业大学动物科学学院",
    thumbnailUrl: "/training/thumb-2.svg",
    learnerCount: 86,
    publishedAt: "2025-12-03",
  },
  {
    id: "TR-0003",
    title: "常见疫病识别与场内防控流程",
    expertName: "王专家",
    organization: "市动物疫控中心",
    thumbnailUrl: "/training/thumb-3.svg",
    learnerCount: 142,
    publishedAt: "2026-01-06",
  },
  {
    id: "TR-0004",
    title: "档案规范：耳号、血缘与生产记录的标准化",
    expertName: "赵老师",
    organization: "畜牧技术推广站",
    thumbnailUrl: "/training/thumb-4.svg",
    learnerCount: 64,
    publishedAt: "2026-01-22",
  },
]

export const trainingStaffLearning: TrainingStaffLearning[] = [
  {
    id: "ST-001",
    name: "陈强",
    role: "饲养员",
    organization: "一号养殖区",
    learnedCount: 4,
    completedCount: 3,
    lastLearningAt: "2026-02-05 19:10",
  },
  {
    id: "ST-002",
    name: "刘敏",
    role: "兽医",
    organization: "防疫组",
    learnedCount: 4,
    completedCount: 4,
    lastLearningAt: "2026-02-07 09:32",
  },
  {
    id: "ST-003",
    name: "周伟",
    role: "配种员",
    organization: "繁殖组",
    learnedCount: 3,
    completedCount: 2,
    lastLearningAt: "2026-02-06 14:21",
  },
  {
    id: "ST-004",
    name: "吴芳",
    role: "统计员",
    organization: "档案室",
    learnedCount: 2,
    completedCount: 1,
    lastLearningAt: "2026-02-04 16:02",
  },
  {
    id: "ST-005",
    name: "马杰",
    role: "场长",
    organization: "管理组",
    learnedCount: 2,
    completedCount: 2,
    lastLearningAt: "2026-02-07 21:05",
  },
]
