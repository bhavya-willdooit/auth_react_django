import re

USERNAMES_TOKENS = {}
USERNAMES_PASSWORD = {
"admin@test.com": "Admin123!"
}

class UserMethods(object):

    def validate_username_password(self,username,password):
        pattern = re.compile(r'[\w\.-]+@[\w\.-]+(\.[\w]+)+')
        email = pattern.match(username)

        length_error = len(password) < 8 or len(password) > 20
        number_error = re.search(r"\d", password) is None
        uppercase_error = re.search(r"[A-Z]", password) is None
        lowercase_error = re.search(r"[a-z]", password) is None
        symbol_error = re.search(r"[ !@#$%&'()*+,-./[\\\]^_`{|}~"+r'"]', password) is None
        password_ok = not ( length_error or number_error or uppercase_error or lowercase_error or symbol_error )

        if not password_ok or not email:
            return False
        return True

    def check_if_user_exists(self,username,password):
        if USERNAMES_PASSWORD.get(username,False) == password:
            return "admin@test.com"
        return False

    def generate_new_token(self):
        return "asjdkjasndkjsandkj"

    def remove_user_session(self,username):
        del USERNAMES_TOKENS[username]

    def get_token(self,user):
        token = ''
        if USERNAMES_TOKENS.get(user):
            token = USERNAMES_TOKENS.get(user)
        else:
            token = self.generate_new_token()
            USERNAMES_TOKENS[user] = token
        return token
