/**
 *接口列表
 */
import base from './urlbase';
import axios from '@/request/http';
import qs from 'qs'; // 根据需求是否导入qs模块

let serverUrl=base.url;
if(process.env.NODE_ENV === 'production') {//线上环境
  axios.get('./url.txt').then(function(res){
    serverUrl=res.data;
  }).catch((error) => {
    console.error(error);
  });
}
var Authorization_l='Bearer'//请求头前部分+token
const article={
  // sid:localStorage.getItem('sessionIds'),
  serverUrl:serverUrl,
  //登录
  getLogin(params){
    return axios.post(`${serverUrl}/Auth/SignIn?LoginId=${params.LoginId}&LoginPwd=${params.LoginPwd}`)
  },
  loginOut(params){
    return axios.post(`${serverUrl}/Auth/SignOut?UserId=${params.UserId}`)
  },
  //获取教师首页列表
  homeList(params){
    let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Teaching/GetHomeDataList`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }}); 
  },
  /**
   * 权限  start
   */
  Role:{
    // 权限列表
    getRoleList(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Role/GetAll`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    // 获取单个权限
    getNowRole(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Role/GetRole?RoleId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    // 新增权限
    addRole(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Role/AddRole`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //修改权限
    updateRole(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Role/UpdateRole`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除权限
    delRole(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Role/DeleteRole?RoleId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取菜单和操作列表
    getMenuAndOperateList(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Role/GetMenuAndOperateList?RoleId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //设置菜单权限
    setMenuOperate(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Role/GetRightOfRoleTree`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取菜单权限/Role/GetRightOfRoleTree
    getRightOfRoleTree(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Role/SetMenuOperate`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
  },
  
  /**
   * 权限  end
   */

  /**
   * 日志  strat
   */
  Log:{
    getLogList(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Log/GetAll`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取单个日志
    getNowLog(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Log/GetLog?LogId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }}); 
    },
    // 新增日志
    addLog(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Log/AddLog`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //修改日志
    updateLog(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Log/UpdateLog`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除日志
    delLog(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Log/DeleteLog?LogId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
  },
  
  /**
   * 日志  end
   */
  
   /**
   * 用户  strat
   */
  User:{
    // 用户列表
    getUserList(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/User/GetAll`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取单个用户
    getNowUser(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/User/GetUser?UserId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }}); 
    },
    // 新增用户
    addUser(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/User/AddUser`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //修改用户
    updateUser(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/User/UpdateUser`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除用户
    delUser(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/User/DeleteUser?UserId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
  },
  
  /**
   * 用户  end
   */

  Menu:{
    //获取树状菜单
    getThreemenu(){
      return axios.get(`${serverUrl}/api/Data/GetAllDeviceTree`); 
    },
    // 添加树状菜单
    addThreemenu(params){
      return axios.post(`${serverUrl}/api/Data/AddInfo`,params)
    },
    //修改树状菜单
    edirtThreemenu(params){
      return axios.post(`${serverUrl}/api/Data/UpdateInfo`,params)
    },
    //删除树状菜单
    delThreemenu(params){
      return axios.post(`${serverUrl}/api/Data/DeleteInfo?id=${params.id}&attribute=${params.attribute}`)
    },
  },
  

  /**
   * 教学 start
  */
  Teaching:{
      // sessionId=localStorage.getItem('sessionId'),
      //获取课题类型
      getType(){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/GetClassAll`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //获取单课题类型
      getSgType(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/GetClass?ClassId=${params}`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //新增课题类型
      addType(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.post(`${serverUrl}/Teaching/AddClass`,params,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //更新课题类型
      edirtType(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.post(`${serverUrl}/Teaching/UpdateClass?ClassId=${params.classId}`,params,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //删除课题类型
      delType(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/DeleteClass?ClassId=${params}`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //获取课题类型1
      getSubject(){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/GetSubject`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //获取单课题
      getSgSubject(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/GetSubject?SubjectId=${params}`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //新增课题
      addSubject(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.post(`${serverUrl}/Teaching/AddSubject`,params,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //修改课题
      edirtSubject(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.post(`${serverUrl}/Teaching/UpdateSubject?SubjectId=${params.classId}`,params,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //删除课题
      delSubject(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/DeleteSubject?SubjectId=${params}`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //获取课题的树状数据
      getThree(){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/GetSubjectTreeList`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //获取教学资源
      getTeachingList(){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/GetTeachingAll`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //获取教学资源集合
      getTeachingAll(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.post(`${serverUrl}/Teaching/GetTeachingList`,params,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //获取单教学资源
      getSgTeaching(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/GetTeaching?TeachingId=${params}`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //新增教学资源
      addTeaching(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.post(`${serverUrl}/Teaching/AddTeaching`,params,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //更改教学资源
      edirtTeaching(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.post(`${serverUrl}/Teaching/UpdateTeaching?TeachingId=${params.classId}`,params,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //删除教学资源
      delTeaching(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/DeleteTeaching?TeachingId=${params}`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
      //删除选中教学资源
      chooseDelTeaching(params){
        let sessionId=localStorage.getItem('sessionId');
        return axios.get(`${serverUrl}/Teaching/DeleteTeachings?TeachingId=${params}`,{
          headers:{
            'Authorization':Authorization_l+' '+sessionId
        }});
      },
  },
  /**
   * 教学 end
  */
  /**
   *实训 start
   */
  Training:{
    //获取实训类型
    getType(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetClassAll`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取单课题类型
    getSgType(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetClass?ClassId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增课题类型
    addType(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/AddClass`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //更新课题类型
    edirtType(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/UpdateClass?ClassId=${params.classId}`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除课题类型
    delType(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/DeleteClass?ClassId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取课题类型1
    getSubject(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetSubject`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取单课题
    getSgSubject(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetSubject?SubjectId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增课题
    addSubject(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/AddSubject`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //修改课题
    edirtSubject(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/UpdateSubject?SubjectId=${params.classId}`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除课题
    delSubject(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/DeleteSubject?SubjectId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取课题的树状数据
    getThree(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetSubjectTreeList`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取实训资源
    getTeachingList(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetPracticeAll`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取实训资源集合
    getTeachingAll(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/GetPracticeList`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取单实训资源
    getSgTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetPractice?PracticeId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增实训资源
    addTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/AddPractice`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //更改实训资源
    edirtTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/UpdatePractice`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除实训资源
    delTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/DeletePractice?PracticeId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除选中实训资源
    chooseDelTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/DeletePractices?PracticeId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增试题
    addQuestions(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/AddTestQuestions`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //修改试题
    updateQuestions(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/UpdateTestQuestions`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除试题
    deleteTestQuestions(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/DeleteTestQuestions?TestQuestionsId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //老师获取实训试题
    getTestQuestionsTreeList(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetTestQuestionsTreeList?PracticeId=${params.PracticeId}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取实训试题与评分的树形数据
    getScoreTreeList(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetTestQuestionsAndScoreTreeList?PracticeId=${params.PracticeId}&UserId=${params.UserId}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取成绩集合
    getScoreResultList(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/GetScoreResultList`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除成绩
    deleteScoreresult(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/DeleteScoreresult?ScoreResultId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增评分
    addScore(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/AddScore`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //更新评分
    updatecore(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/UpdateScore`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    
    //获取提交模型
    getScoremodel(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/GetScoremodel?ScoreModelId=${params.ScoreModelId}&PracticeId=${params.PracticeId}&CreateBy=${params.CreateBy}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增提交模型
    addScoremodel(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/AddScoremodel`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //修改提交模型
    updateScoremodel(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Practice/UpdateScoremodel`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //导出成绩
    
    exportExcel(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Practice/ExportExcelScoreResult?ResultName=${params.ResultName}&SubjectId=${params.SubjectId}&UserId=${params.UserId}&pageSize=${params.pageSize}&pageIndex=${params.pageIndex}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
  },
  /**
   *实训 end
   */
  /**
   *竞赛 start
   */
  Competition:{
    //获取竞赛类型
    getType(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetClassAll`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取单课题类型
    getSgType(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetClass?ClassId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增课题类型
    addType(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/AddClass`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //更新课题类型
    edirtType(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/UpdateClass?ClassId=${params.classId}`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除课题类型
    delType(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/DeleteClass?ClassId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取课题类型1
    getSubject(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetSubject`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取单课题
    getSgSubject(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetSubject?SubjectId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增课题
    addSubject(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/AddSubject`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //修改课题
    edirtSubject(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/UpdateSubject?SubjectId=${params.classId}`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除课题
    delSubject(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/DeleteSubject?SubjectId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取课题的树状数据
    getThree(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetSubjectTreeList`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //竞赛资源
    getTeachingList(){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetCompetitionAll`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取竞赛资源集合
    getTeachingAll(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/GetCompetitionList`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取单竞赛资源
    getSgTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetCompetition?CompetitionId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增竞赛资源
    addTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/AddCompetition`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //更改竞赛资源
    edirtTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/UpdateCompetition`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除竞赛资源
    delTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/DeleteCompetition?CompetitionId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除竞赛资源
    chooseDelTeaching(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/DeleteCompetitions?CompetitionId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增试题
    addQuestions(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/AddTestQuestions`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //修改试题
    updateQuestions(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/UpdateTestQuestions`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除试题
    deleteTestQuestions(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/DeleteTestQuestions?TestQuestionsId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //老师获取竞赛试题
    getTestQuestionsTreeList(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetTestQuestionsTreeList?CompetitionId=${params.CompetitionId}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取竞赛试题与评分的树形数据
    getScoreTreeList(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetTestQuestionsAndScoreTreeList?CompetitionId=${params.CompetitionId}&UserId=${params.UserId}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //获取成绩集合
    getScoreResultList(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/GetScoreResultList`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //删除成绩
    deleteScoreresult(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/DeleteScoreresult?ScoreResultId=${params}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增评分
    addScore(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/AddScore`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //更新评分
    updatecore(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/UpdateScore`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    
    //获取提交模型
    getScoremodel(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.get(`${serverUrl}/Competition/GetScoremodel?ScoreModelId=${params.ScoreModelId}&CompetitionId=${params.CompetitionId}&CreateBy=${params.CreateBy}`,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //新增提交模型
    addScoremodel(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/AddScoremodel`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
    //修改提交模型
    updateScoremodel(params){
      let sessionId=localStorage.getItem('sessionId');
      return axios.post(`${serverUrl}/Competition/UpdateScoremodel`,params,{
        headers:{
          'Authorization':Authorization_l+' '+sessionId
      }});
    },
  },
  /**
   *竞赛 end
   */
  //公共页码
  fiterArr(num){
    let s=parseInt(num);
    if(s<=10){
      return [10] 
    }else if(s>10&&s<=20){
      return [10,20]
    }else if(s>20&&s<=50){
      return [10,20,50]
    }else if(s>50&&s<=100){
      return [10,20,50,100]
    }else if(s>100){
      return [10,20,50,100,200]
    }
  },
  // 日期转换
  formateDate(datetime) {
      function addDateZero(num) {
          return (parseInt(num) < 10 ? "0" + num : num);
      }
      // 兼容性处理
      if(typeof datetime === 'string' && (datetime.indexOf('T') > -1||datetime.includes('T'))) {
          datetime = datetime.replace('T', ' ').replace(/\-/g, '/'); //注意：指定一个具体的时间转换时间戳，需要yyyy/mm/dd hh:ii:ss格式，yyyy-mm-dd在IE和Safari下是有问题的。
      };
      if(datetime==null||datetime==''){//时间错误的时候
          return ' ';
      }else{
          let d = new Date(datetime);
          // let formatdatetime = new Date(datetime.substr(0,parseInt(datetime.indexOf('.'))).replace(/-/g,"/").replace('T'," "));//转化兼容IE时间格式
          let formatdatetime = d.getFullYear() + '/' + addDateZero(d.getMonth() + 1) + '/' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
          return formatdatetime;
      }
  }
}

export default article;
