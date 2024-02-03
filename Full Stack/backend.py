from flask import Flask, render_template, redirect, url_for, request, session, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta


login_or_signup_button = "Sign Up"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "estoyloco"
app.config['SECRET_KEY'] = "estoyloco"
app.permanent_session_lifetime = timedelta(days=5)

db = SQLAlchemy(app)

app.app_context().push()

class users(db.Model):

    _id = db.Column("id", db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password



@app.route("/")
@app.route("/home/")
def home():
    if "user" in session:
        login_or_signup_button = "Log Out"
    else:
        login_or_signup_button = "Sign Up"
    return render_template("home.html", content=login_or_signup_button)

@app.route("/contact-me/")
def contact_me():
    return render_template("contact-me.html")

@app.route("/tracking/")
def tracking():
    global login_or_signup_button
    if "user" in session:
        return render_template("tracking.html")
    else:
        return redirect(url_for("login"))
@app.route("/techniques/", methods=['POST', 'GET'])
def techniques():
    if request.method == 'POST':
        date = request.form["date"]
        totalhours = (int(request.form["hours"])*60+int(request.form["minutes"]))/60
        
    return render_template("study techniques.html")

@app.route("/plans/")
def pricing():
    return render_template("plans.html")

@app.route("/register/", methods=["POST", "GET"])
def register():
    global login_or_signup_button
    if "user" in session:
        return redirect(url_for("home"))
    else:
        if request.method == "POST":
            usrpassword = request.form["usrpassword"]
            usremail = request.form["usremail"]
            usrname = request.form["usrname"]
            
            found_user = users.query.filter_by(name=usrname).first()
            found_email = users.query.filter_by(email=usremail).first()
            if found_user or found_email:
                flash("There is a user with that email/username unfortunutely.")
                return redirect(url_for("register"))
            else:
                usr = users(name=usrname, email=usremail, password=usrpassword)
                db.session.add(usr)
                db.session.commit()
                session.permanent = True
                session["user"] = usremail
                login_or_signup_button = "Log Out"
                return redirect(url_for("home"))
        elif request.method == "GET":
            return render_template("register.html")

@app.route("/login/",  methods=["POST", "GET"])
def login():
    if "user" in session:
        session.pop("user", None)
        global login_or_signup_button
        login_or_signup_button = "Sign Up"
        return redirect(url_for("home"))
    else:
        if request.method == "POST":
            usrpassword = request.form["usrpassword"]
            usremail = request.form["usremail"]
            user_exists = users.query.filter_by(email=usremail).first()
            true_password = users.query.filter_by(email=usremail, password=usrpassword).first()
            if user_exists and true_password:
                session.permanent = True
                session["user"] = usremail
                print(f"Logged in as {usremail, usrpassword}")
                login_or_signup_button = "Log Out"
                return redirect(url_for("home"))
            elif user_exists and not true_password:
                print("Failed to log in because incorrect password")
                return redirect(url_for("login"))
            elif not user_exists:
                print("No user found with that email")
                return redirect(url_for("register"))
            else:
                return False
        else:
            return render_template("login.html")

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)