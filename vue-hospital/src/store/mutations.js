import * as types from './mutation-types'
//同步修改状态

const mutations = {
    [types.SET_USER](state,user){
        state.user = user
    },
    [types.SET_DEPARTMENT](state,department){
        state.department = department
    },
    [types.SET_HOSPITAL](state,hospital){
        state.hospital = hospital
    },
    [types.SET_CHILDDEPARTMENT](state,childdepartment){
        state.childdepartment = childdepartment
    },
    [types.SET_EXPERT](state,expert){
        state.expert = expert
    },
    [types.SET_ADMIN](state,admin){
        state.admin = admin
    },
    [types.SET_ARTICLE](state,article){
        state.article = article
    },
    [types.SET_NOTICE](state,notice){
        state.notice = notice
    },
    [types.SET_MENU](state,menu){
        state.menu = menu
    },
    [types.SET_PATIENT](state,patient){
        state.patient = patient
    },
    [types.SET_REGISTER](state,register){
        state.register = register
    },
    [types.SET_ILLNESS](state,illness){
        state.illness = illness
    },
}

export default mutations;