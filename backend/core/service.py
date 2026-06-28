from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

def send_html_email(to_email, subject, template, context):
    html_content = render_to_string(template, context)

    email = EmailMultiAlternatives(
        subject=subject,
        body="Это письмо требует HTML",  # fallback
        to=[to_email],
    )

    email.attach_alternative(html_content, "text/html")
    email.send()