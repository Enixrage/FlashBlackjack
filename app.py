from flask import Flask, request, redirect, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from google.oauth2 import id_token
from google.auth.transport import requests as grequests

app = Flask(__name__)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-app-password'  # Use an app password for Gmail

db = SQLAlchemy(app)
mail = Mail(app)

# Google OAuth client ID
CLIENT_ID = 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com'  # Replace this

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # For Google users, you can use 'GOOGLE_AUTH'

# Route: Manual registration
@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    # Send confirmation email
    msg = Message('Welcome to Blackjack!', sender='your-email@gmail.com', recipients=[email])
    msg.body = f"Hello {username}, thanks for signing up for Blackjack!"
    mail.send(msg)

    return redirect('/index')  # Change to the page you want after registration

# Route: Google Sign-In
@app.route('/auth/google', methods=['POST'])
def google_login():
    try:
        token = request.json.get('id_token')
        idinfo = id_token.verify_oauth2_token(token, grequests.Request(), CLIENT_ID)

        email = idinfo['email']
        name = idinfo.get('name') or email.split('@')[0]

        # Check if user already exists
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(username=name, email=email, password='GOOGLE_AUTH')
            db.session.add(user)
            db.session.commit()

        # Optional: Create session or token here
        return jsonify({'message': 'Login successful', 'redirect': '/play.html'})

    except Exception as e:
        print('Google login error:', e)
        return jsonify({'error': 'Login failed'}), 400

# Optional: Serve main page
@app.route('/')
def home():
    return redirect('/login.html')

if __name__ == '__main__':
    app.run(debug=True)

