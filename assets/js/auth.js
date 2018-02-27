module.exports = {

    logout: function() {
        delete localStorage.username
        delete localStorage.token
    },

    loggedIn: function() {
        return !!localStorage.token
    },

}
