export default {
    setToken(token){
        window.sessionStorage.setItem("token",token);
    },
    getToken(){
        return window.sessionStorage.getItem("token")
    },
    removeToken(){
        window.sessionStorage.removeItem("token");
    }
}
