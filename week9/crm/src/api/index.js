import http from './http'

export function judgeLogin() {
    return http.get('/user/login').then(data => {
        return data.code == 0
    })
}


// 请求部门列表数据
export function getDpList() {
    return http.get('/department/list')
}
// 删除部门列表中的数据
export function delDpList(departmentId) {
    return http.get('/department/delete', {
        params: { departmentId }
    })
}
// 新增部门接口
export function addDpList(option) {
    return http.post('/department/add', option)
}
// 更新部门接口
export function updateDpList(option) {
    return http.post('/department/update', option)
}

// 获取用户列表接口
export function getUserList(option) {
    // option ==> {departmentId:0,search:''}
    return http.get('/user/list', {
        params: option
    })
}
// 新增用户列表
export function addUserList(option) {
    return http.post('/user/add',option) 
}
// 更新用户接口
export function updateUserList(option) {
    return http.post('/user/update',option)
}
// 删除用户接口
export function delUserList(userId){
    return http.get('/user/delete',{
        params:{userId}
    })
}






// 获取职务列表接口
export function getJobList(jobId) {
    return http.get('/job/list', {
        params:{jobId}
    })
}
// 增加职务
export function addJobList(option) {
    return http.post('/job/add', option)
}
// 更新职务接口
export function updateJoblist(option) {
    return http.post('/job/update',option)
}
// 删除职务接口
export function delJobList(option){
    return http.get('/job/delete',{
        params:{jobId}
    })
}

