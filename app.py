from flask import Flask, request, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message

app = Flask(__name__)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-app-password'  # Use App Password if using Gmail
db = SQLAlchemy(app)
mail = Mail(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # You should hash passwords!

# Routes
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

    return redirect('/index')  # make a success.html page

if __name__ == '__main__':
    app.run(debug=True)
