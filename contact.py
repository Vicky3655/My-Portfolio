from flask import Flask, request, render_template, flash, redirect, url_for
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = 'zigis_plug_secret'

# Email Config
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USERNAME'] = 'maryannugwu222@gmail.com'
# USE YOUR 16-CHARACTER GOOGLE APP PASSWORD HERE
app.config['MAIL_PASSWORD'] = 'xzlk jhgf dsap oiuy' 
app.config['MAIL_DEFAULT_SENDER'] = 'maryannugwu222@gmail.com'

mail = Mail(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/contact', methods=['POST'])
def contact():
    # .get() prevents the KeyError crash if a field is empty
    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message_body = request.form.get('message')

    msg = Message(
        subject=f"New Portfolio Message: {subject}",
        recipients=['maryannugwu222@gmail.com'],
        body=f"From: {name} ({email})\n\n{message_body}"
    )

    try:
        mail.send(msg)
        flash('success') # Trigger the animated tick
    except Exception as e:
        print(f"Error: {e}")
        flash('error')
        
    return redirect(url_for('home'))

if __name__ == '__main__':
    # host='0.0.0.0' is the key to mobile access
    app.run(debug=True, host='0.0.0.0', port=5000)