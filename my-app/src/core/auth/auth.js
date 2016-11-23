
export const authService = {
    login(username, password, firebaseRef, cb) {
        if (username && username.trim().length !== 0
            &&  password && password.trim().length !== 0) {

            firebaseRef.orderByChild("username").equalTo(username).on("child_added", (snapshot) =>{
                if( snapshot.val().password + ""  === password + "" ){
                    localStorage.token = snapshot.key;
                    localStorage.role = snapshot.val().role;
                     cb(true, snapshot.val().role);
                }else{
                     cb(false);
                }

            });
        }
    },

    logout() {
        delete localStorage.token
        delete localStorage.role
    },

    loggedIn(){
        return !!localStorage.token
    }

}