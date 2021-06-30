import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '/',
      redirect: 'login',
  	},
    {
      path: '/login',
      name: 'login',
      component:() => import('@/components/login')
    },
    {path:'/home/teacher',name:'homeTeacher',meta:'homeTeacher',component:() => import('@/pages/teacher/home')},//首页
    {path:'/management',name:'management',meta:'management',component:() => import('@/pages/management/management')},//后台管理
    {path:'/teaching',name:'teaching',meta:'teaching',component:() => import('@/pages/teacher/teaching/teaching'),},//教学系统
    {path:'/teaching/teacher',name:'teachingTeacher',meta:'teachingTeacher',component:() => import('@/pages/teacher/teaching/teaching')},
    {path:'/teaching/student',name:'teachingStudent',meta:'teachingStudent',component:() => import('@/pages/student/teaching/teaching')},
    
    { path:'/training/teacher',name:'trainingTeacher',meta:'trainingTeacher',component:() => import('@/pages/teacher/training/training'),},//实训系统
    {path:'/training/student',name:'trainingStudent',meta:'trainingStudent',component:() => import('@/pages/student/training/training')},
    {path:'/training/demo',name:'demo',meta:'demo',component:() => import('@/pages/student/demo')},

    {path:'/competition/teacher',name:'competitionTeacher',meta:'competitionTeacher',component:() => import('@/pages/teacher/competition/competition'),},//竞赛系统
    {path:'/competition/student',name:'competitionStudent',meta:'competitionStudent',component:() => import('@/pages/student/competition/competition')},

    //详情
    {path: '/teaching/:id',name: 'teachingPlay',component:() => import('@/pages/student/play')},//视频
    {path: '/training/:id',name: 'trainingPlay',component:() => import('@/pages/student/play')},//视频
    {path: '/competition/:id',name: 'competitionPlay',component:() => import('@/pages/student/play')},//视频

    {path: '/teaching/detail/:id',name: 'teachingDetail',component:() => import('@/pages/detail/content')},//普通文件 
    {path: '/training/detail/:id',name: 'trainingDetail',component:() => import('@/pages/detail/content')},//普通文件 
    {path: '/competition/detail/:id',name: 'competitionDetail',component:() => import('@/pages/detail/content')},//普通文件 
    //老师首页详情
    {path: '/teacher/teaching/detail/:id',name: 'teacherTeaching',component:() => import('@/pages/detail/content')},//普通文件  
    {path: '/teacher/training/detail/:id',name: 'teacherTraining',component:() => import('@/pages/detail/content')},//普通文件 
    {path: '/teacher/competition/detail/:id',name: 'teacherCompetition',component:() => import('@/pages/detail/content')},//普通文件 
    {path: '/teacher/teaching/:id',name: 'teacherTeachingPlay',component:() => import('@/pages/teacher/play')},
    {path: '/teacher/training/:id',name: 'teacherTrainingPlay',component:() => import('@/pages/teacher/play')},
    {path: '/teacher/competition/:id',name: 'teacherCompetitionPlay',component:() => import('@/pages/teacher/play')},
    // {path: '/student/teaching/:id',name: 'studentPlay',component:() => import('@/pages/student/play')}
  ],
  
})

