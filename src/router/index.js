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
    // {
    //   path: '/vmanagement',
    //   name: 'vmanagement',
    //   meta:'rolve',
    //   component:() => import('@/components/v_management')
    // },
    // {
    //   path: '/upload',
    //   name: 'upload',
    //   meta:'rolve',
    //   component:() => import('@/components/upload')
    // },
    // {
    //   path: '/user',
    //   name: 'user',
    //   meta:'rolve',
    //   component:() => import('@/components/user')
    // },
    // {
    //   path: '/role',
    //   name: 'role',
    //   meta:'rolve',
    //   component:() => import('@/components/role')
    // },
    // {
    //   path: '/handle',
    //   name: 'handle',
    //   meta:'rolve',
    //   component:() => import('@/components/handle')
    // },
    // {
    // 	path:'/videolist',
    //   component:() => import('@/components/videolist'),
    //   children:[
    //     {
    //       path:'/',
    //       name:'videolist',
    //       component:() => import('@/components/videolist'),
    //     }
    //   ]
    // },
    // {
    //   path: '/play/:id/:src',
    //   name: 'play',
    //   component:() => import('@/components/play')
    // },
    // {
    //   path:'/filedetail/:id/:type/:src',
    //   name:'filedetail',
    //   component:() => import('@/components/filedetail')
    // },
    // {
    //   path:'/echartlist',
    //   name:'echartlist',
    //   meta:'rolve',
    //   component:() => import('@/components/echartlist')
    // },
    // {
    //   path:'/survey',
    //   meta:'rolve',
    //   component:() => import('@/components/survey')  
    // },
    // {
    //   path:'/questionnaire/:num',
    //   name:'questionnaire',
    //   component:() => import('@/components/questionnaire')
    // },
    // {
    //   path:'/surveylist',
    //   name:'surveylist',
    //   meta:'rolve',
    //   component:() => import('@/components/survey/surveylist'),
    // }, 
    // {path:'/surveyedit/:num',name:'surveyedit',meta:'rolve',component:() => import('@/components/survey/surveyedit')},
    // {path:'/surveyadd/:num',name:'surveyadd',meta:'rolve',component:() => import('@/components/survey/surveyadd')},
    // {path:'/surveyfill/:num',name:'surveyfill',meta:'rolve',component:() => import('@/components/survey/surveyfill')},
    // {path:'/linkqr/:id',name:'linkqr',component:() => import('@/components/linkqr')},

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
    {path: '/teacher/teaching/:id',name: 'teacherPlay',component:() => import('@/pages/teacher/play')},
    {path: '/student/teaching/:id',name: 'studentPlay',component:() => import('@/pages/student/play')}
  ],
  
})

