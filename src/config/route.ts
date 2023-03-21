// 2. 定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";


const routes = [
    {path: '/', component: Index, name: 'index'},
    {path: '/team', component: Team, name: 'team',title: '队伍列表'},
    {path: '/team/add', component: TeamAddPage, name: 'teamAdd',title: '创建队伍'},
    {path: '/team/update', component: TeamUpdatePage, name: 'teamUpdate',title: '更新队伍'},
    {path: '/user', component: UserPage, name: 'userPage',title: '个人信息'},
    {path: '/search', component: SearchPage, name: 'search',title: '寻找伙伴'},
    {path: '/user/list', component: SearchResultPage, name: 'userList',title: '用户列表'},
    {path: '/user/edit', component: UserEditPage, name: 'userEdit',title: '编辑信息'},
    {path: '/user/login', component: UserLoginPage, name: 'userLogin',title: '登陆'},
    {path: '/user/update', component: UserUpdatePage, name: 'userUpdate',title: '当前信息'},
    {path: '/user/team/join', component: UserTeamJoinPage, name: 'userTeamJoin',title: '加入队伍'},
    {path: '/user/team/create', component: UserTeamCreatePage, name: 'userTeamCreate',title: '创建队伍'},
]

export default routes;