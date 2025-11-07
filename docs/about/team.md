---
layout: page
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'

const coreMembers = [
  {
    avatar: 'https://github.com/marcoolTang.png',
    name: 'Marco Tang',
    title: '创始人 & 核心开发者',
    org: 'MZ-UI',
    orgLink: 'https://github.com/marcoolTang/mz-ui',
    desc: '全栈开发工程师，专注于企业级前端解决方案',
    links: [
      { icon: 'github', link: 'https://github.com/marcoolTang' },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>' }, link: 'mailto:tzzwpqwe@vip.qq.com' }
    ],
    sponsor: 'https://github.com/sponsors/marcoolTang'
  }
]

// const contributors = [
//   {
//     avatar: 'https://github.com/github.png',
//     name: '贡献者 1',
//     title: '组件开发',
//     links: [
//       { icon: 'github', link: 'https://github.com' }
//     ]
//   },
//   {
//     avatar: 'https://github.com/github.png',
//     name: '贡献者 2',
//     title: '文档维护',
//     links: [
//       { icon: 'github', link: 'https://github.com' }
//     ]
//   }
// ]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的团队</template>
    <template #lead>
      MZ-UI 的开发由一个国际化团队驱动，其中一些成员选择在下面展示。
    </template>
  </VPTeamPageTitle>
  
  <VPTeamMembers size="medium" :members="coreMembers" />
  
  <VPTeamPageTitle>
    <template #title>社区贡献者</template>
    <template #lead>
      感谢所有为 MZ-UI 做出贡献的开发者们！
    </template>
  </VPTeamPageTitle>
  
  <!-- <VPTeamMembers size="small" :members="contributors" /> -->
</VPTeamPage>

<style scoped>
.VPTeamPage {
  margin-top: 2rem;
}
</style>
