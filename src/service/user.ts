import myAxios from "../plugins/myAxios";
import {getCurrentUserState, setCurrentUserState} from "../states/user";


export const getCurrentUser = async () => {
    const currentUser = getCurrentUserState();
    console.log(currentUser);
    if (currentUser) {
        return currentUser;
    }
    //不存在则从远程获取
    const res = await myAxios.get('/user/current');
    // if (res.data.code === 0){
    if (res.code == 0 && res.data) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;

}

export const removeCurrentUser = () => {
    setCurrentUserState(null);
}
