from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from cellcare.models import UserMethods
#Simulates a database

def index(request):
    template = loader.get_template('base.html')
    return HttpResponse(template.render())

@csrf_exempt
def logout_user(request):
    data = json.loads(request.body)
    username = data.get('username')
    token = data.get('token')
    user_methods = UserMethods()
    # Simulates deleting the session and token details of a user
    if token and username:
        user_methods.remove_user_session(username)
        return JsonResponse({"logout":"success"})
    return JsonResponse({"logout":"failure"})

@csrf_exempt
def login_user(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    user_methods = UserMethods()
    #Simulates an authenticate method that checks credentials
    user = user_methods.check_if_user_exists(username,password)

    valid_creds = user_methods.validate_username_password(username,password)

    if user and valid_creds:
        token = user_methods.get_token(user)
        # Redirect to a success page.
        return JsonResponse({
                            "username": user,
                            "login":"success",
                            "user_token": token})
    else:
        # Return an 'invalid login' error message.
        return JsonResponse({"login":"failed"})
