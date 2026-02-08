export type DonkeySex = "公" | "母" | "未知"

export interface DonkeyPedigreeRecord {
  id: string
  name?: string
  breed?: string
  sex?: DonkeySex
  birthYear?: number
  fatherId?: string
  motherId?: string
}

// 说明：真实系统中应来自数据库。
// 这里提供一份最小示例数据，用于演示“上下三代血统”与“两驴三代内血缘关系”查询。
// 数据可能不完整（多数情况下不会记录完整六代），界面会对缺失信息做“未知/暂无记录”处理。
export const donkeyPedigreeRecords: DonkeyPedigreeRecord[] = [
  // 本群驴（与工作台表格耳号一致）
  {
    id: "DB-2023001",
    name: "一号",
    breed: "德州黑驴",
    sex: "母",
    birthYear: 2023,
    fatherId: "DB-2017001",
    motherId: "DB-2016001",
  },
  {
    id: "DB-2023002",
    name: "二号",
    breed: "关中驴",
    sex: "公",
    birthYear: 2023,
    fatherId: "DB-2017002",
    motherId: "DB-2016002",
  },
  {
    id: "DB-2023003",
    name: "三号",
    breed: "德州黑驴",
    sex: "母",
    birthYear: 2023,
    fatherId: "DB-2017001",
    motherId: "DB-2016003",
  },
  {
    id: "DB-2023004",
    name: "四号",
    breed: "广灵驴",
    sex: "母",
    birthYear: 2023,
    // 缺失父母信息（常见场景）
  },
  {
    id: "DB-2023005",
    name: "五号",
    breed: "佳米驴",
    sex: "公",
    birthYear: 2023,
    fatherId: "DB-2017003",
    motherId: "DB-2016004",
  },

  // 扩展示例：更多同代个体（父母信息部分缺失）
  {
    id: "DB-2023006",
    name: "六号",
    breed: "德州黑驴",
    sex: "母",
    birthYear: 2023,
    fatherId: "DB-2017004",
    motherId: "DB-2016005",
  },
  {
    id: "DB-2023007",
    name: "七号",
    breed: "关中驴",
    sex: "公",
    birthYear: 2023,
    fatherId: "DB-2017002",
    motherId: "DB-2016006",
  },
  {
    id: "DB-2023008",
    name: "八号",
    breed: "广灵驴",
    sex: "母",
    birthYear: 2023,
    fatherId: "DB-2017005",
    motherId: "DB-2016007",
  },
  {
    id: "DB-2023009",
    name: "九号",
    breed: "佳米驴",
    sex: "公",
    birthYear: 2023,
    fatherId: "DB-2017003",
    // 缺失母系
  },
  {
    id: "DB-2023010",
    name: "十号",
    breed: "德州黑驴",
    sex: "母",
    birthYear: 2023,
    fatherId: "DB-2017006",
    motherId: "DB-2016008",
  },
  {
    id: "DB-2022001",
    name: "十一号",
    breed: "德州黑驴",
    sex: "公",
    birthYear: 2022,
    fatherId: "DB-2016009",
    motherId: "DB-2015001",
  },
  {
    id: "DB-2022002",
    name: "十二号",
    breed: "关中驴",
    sex: "母",
    birthYear: 2022,
    fatherId: "DB-2017005",
    motherId: "DB-2016006",
  },
  {
    id: "DB-2022003",
    name: "十三号",
    breed: "广灵驴",
    sex: "公",
    birthYear: 2022,
    fatherId: "DB-2017004",
    motherId: "DB-2016007",
  },
  {
    id: "DB-2021001",
    name: "十四号",
    breed: "佳米驴",
    sex: "母",
    birthYear: 2021,
    fatherId: "DB-2015002",
    motherId: "DB-2016004",
  },
  {
    id: "DB-2021002",
    name: "十五号",
    breed: "关中驴",
    sex: "公",
    birthYear: 2021,
    fatherId: "DB-2017006",
    motherId: "DB-2016002",
  },

  // 父母代
  { id: "DB-2017001", name: "雄一", sex: "公", birthYear: 2017, fatherId: "DB-2011001", motherId: "DB-2011002" },
  { id: "DB-2016001", name: "雌一", sex: "母", birthYear: 2016, fatherId: "DB-2010001", motherId: "DB-2010002" },

  { id: "DB-2017002", name: "雄二", sex: "公", birthYear: 2017, fatherId: "DB-2011003", motherId: "DB-2011004" },
  { id: "DB-2016002", name: "雌二", sex: "母", birthYear: 2016, fatherId: "DB-2010003", motherId: "DB-2010004" },

  { id: "DB-2016003", name: "雌三", sex: "母", birthYear: 2016, fatherId: "DB-2010001", motherId: "DB-2010005" },

  { id: "DB-2017003", name: "雄三", sex: "公", birthYear: 2017 },
  { id: "DB-2016004", name: "雌四", sex: "母", birthYear: 2016 },

  { id: "DB-2017004", name: "雄四", sex: "公", birthYear: 2017, fatherId: "DB-2011005", motherId: "DB-2011006" },
  { id: "DB-2017005", name: "雄五", sex: "公", birthYear: 2017, fatherId: "DB-2011003", motherId: "DB-2011004" },
  { id: "DB-2017006", name: "雄六", sex: "公", birthYear: 2017, fatherId: "DB-2011007", motherId: "DB-2011008" },

  { id: "DB-2016005", name: "雌五", sex: "母", birthYear: 2016, fatherId: "DB-2010006", motherId: "DB-2010007" },
  { id: "DB-2016006", name: "雌六", sex: "母", birthYear: 2016, fatherId: "DB-2010003", motherId: "DB-2010004" },
  { id: "DB-2016007", name: "雌七", sex: "母", birthYear: 2016, fatherId: "DB-2010008", motherId: "DB-2010009" },
  { id: "DB-2016008", name: "雌八", sex: "母", birthYear: 2016 },
  { id: "DB-2016009", name: "雄七", sex: "公", birthYear: 2016, fatherId: "DB-2010001", motherId: "DB-2010002" },

  { id: "DB-2015001", name: "雌九", sex: "母", birthYear: 2015, fatherId: "DB-2009001", motherId: "DB-2009002" },
  { id: "DB-2015002", name: "雄八", sex: "公", birthYear: 2015, fatherId: "DB-2009003", motherId: "DB-2009004" },

  // 祖父母代（可能缺失）
  { id: "DB-2011001", name: "祖雄一", sex: "公", birthYear: 2011 },
  { id: "DB-2011002", name: "祖雌一", sex: "母", birthYear: 2011 },
  { id: "DB-2011003", name: "祖雄二", sex: "公", birthYear: 2011 },
  { id: "DB-2011004", name: "祖雌二", sex: "母", birthYear: 2011 },

  { id: "DB-2011005", name: "祖雄三", sex: "公", birthYear: 2011 },
  { id: "DB-2011006", name: "祖雌三", sex: "母", birthYear: 2011 },
  { id: "DB-2011007", name: "祖雄四", sex: "公", birthYear: 2011 },
  { id: "DB-2011008", name: "祖雌四", sex: "母", birthYear: 2011 },

  { id: "DB-2010001", name: "外祖雄一", sex: "公", birthYear: 2010 },
  { id: "DB-2010002", name: "外祖雌一", sex: "母", birthYear: 2010 },
  { id: "DB-2010003", name: "外祖雄二", sex: "公", birthYear: 2010 },
  { id: "DB-2010004", name: "外祖雌二", sex: "母", birthYear: 2010 },
  { id: "DB-2010005", name: "外祖雌三", sex: "母", birthYear: 2010 },

  { id: "DB-2010006", name: "外祖雄三", sex: "公", birthYear: 2010 },
  { id: "DB-2010007", name: "外祖雌四", sex: "母", birthYear: 2010 },
  { id: "DB-2010008", name: "外祖雄四", sex: "公", birthYear: 2010 },
  { id: "DB-2010009", name: "外祖雌五", sex: "母", birthYear: 2010 },

  // 更早一代（用于部分两驴共同祖先演示）
  { id: "DB-2009001", name: "远祖雄一", sex: "公", birthYear: 2009 },
  { id: "DB-2009002", name: "远祖雌一", sex: "母", birthYear: 2009 },
  { id: "DB-2009003", name: "远祖雄二", sex: "公", birthYear: 2009 },
  { id: "DB-2009004", name: "远祖雌二", sex: "母", birthYear: 2009 },
]

export function buildPedigreeIndex(records: DonkeyPedigreeRecord[]) {
  const byId = new Map<string, DonkeyPedigreeRecord>()
  for (const record of records) byId.set(record.id, record)

  const childrenByParent = new Map<string, string[]>()
  for (const record of records) {
    for (const parentId of [record.fatherId, record.motherId]) {
      if (!parentId) continue
      const arr = childrenByParent.get(parentId) ?? []
      arr.push(record.id)
      childrenByParent.set(parentId, arr)
    }
  }

  return { byId, childrenByParent }
}

export interface AncestorHit {
  ancestorId: string
  depth: number // 1=父母, 2=祖父母, 3=曾祖父母
}

export function getAncestorsUpToDepth(params: {
  startId: string
  byId: Map<string, DonkeyPedigreeRecord>
  maxDepth: number
}): AncestorHit[] {
  const { startId, byId, maxDepth } = params
  const hits: AncestorHit[] = []

  // BFS
  const queue: Array<{ id: string; depth: number }> = [{ id: startId, depth: 0 }]
  const visited = new Set<string>([startId])

  while (queue.length) {
    const current = queue.shift()!
    if (current.depth >= maxDepth) continue

    const record = byId.get(current.id)
    if (!record) continue

    const nextDepth = current.depth + 1
    const parentIds = [record.fatherId, record.motherId].filter(Boolean) as string[]

    for (const parentId of parentIds) {
      if (visited.has(parentId)) continue
      visited.add(parentId)
      hits.push({ ancestorId: parentId, depth: nextDepth })
      queue.push({ id: parentId, depth: nextDepth })
    }
  }

  return hits
}

export interface KinshipResult {
  related: boolean
  commonAncestors: Array<{ id: string; depthA: number; depthB: number }>
}

export function checkKinshipWithinDepth(params: {
  aId: string
  bId: string
  byId: Map<string, DonkeyPedigreeRecord>
  maxDepth: number
}): KinshipResult {
  const { aId, bId, byId, maxDepth } = params

  if (aId === bId) {
    return {
      related: true,
      commonAncestors: [{ id: aId, depthA: 0, depthB: 0 }],
    }
  }

  const ancestorsA = getAncestorsUpToDepth({ startId: aId, byId, maxDepth })
  const ancestorsB = getAncestorsUpToDepth({ startId: bId, byId, maxDepth })

  const mapA = new Map<string, number>()
  for (const hit of ancestorsA) {
    const existing = mapA.get(hit.ancestorId)
    mapA.set(hit.ancestorId, existing ? Math.min(existing, hit.depth) : hit.depth)
  }

  const commons: Array<{ id: string; depthA: number; depthB: number }> = []
  for (const hit of ancestorsB) {
    const depthA = mapA.get(hit.ancestorId)
    if (!depthA) continue
    commons.push({ id: hit.ancestorId, depthA, depthB: hit.depth })
  }

  commons.sort((x, y) => (x.depthA + x.depthB) - (y.depthA + y.depthB))

  return {
    related: commons.length > 0,
    commonAncestors: commons,
  }
}

export interface DescendantHit {
  descendantId: string
  depth: number // 1=子代, 2=孙代, 3=曾孙代
}

export function getDescendantsUpToDepth(params: {
  startId: string
  childrenByParent: Map<string, string[]>
  maxDepth: number
}): DescendantHit[] {
  const { startId, childrenByParent, maxDepth } = params
  const hits: DescendantHit[] = []

  const queue: Array<{ id: string; depth: number }> = [{ id: startId, depth: 0 }]
  const visited = new Set<string>([startId])

  while (queue.length) {
    const current = queue.shift()!
    if (current.depth >= maxDepth) continue

    const nextDepth = current.depth + 1
    const children = childrenByParent.get(current.id) ?? []
    for (const childId of children) {
      if (visited.has(childId)) continue
      visited.add(childId)
      hits.push({ descendantId: childId, depth: nextDepth })
      queue.push({ id: childId, depth: nextDepth })
    }
  }

  return hits
}
