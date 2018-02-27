from django.test import TestCase
from cellcare.models import UserMethods

# Create your tests here.
class UserMethodTestCase(TestCase):

    def test_email_password_validator_one(self):
        user_methods = UserMethods()
        username = 'admin@test.com'
        password = 'Admin123!'
        self.assertTrue(user_methods.validate_username_password(username,password))

    def test_email_password_validator_two(self):
        user_methods = UserMethods()
        username = 'admin@test'
        password = 'Admin123!'
        self.assertFalse(user_methods.validate_username_password(username,password))

    def test_email_password_validator_three(self):
        user_methods = UserMethods()
        username = 'admin@test.com'
        password = 'Admin123'
        self.assertFalse(user_methods.validate_username_password(username,password))

    def test_email_password_validator_four(self):
        user_methods = UserMethods()
        username = 'admin@test.com'
        password = 'Admin123asdasdasd asdasdasd asdasdas dasdadsa dfghfhhhhhh asddddddddddddd'
        self.assertFalse(user_methods.validate_username_password(username,password))
