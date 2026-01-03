# EmailJS Debug Steps

## Step 1: Check Browser Console
1. Open your website: http://127.0.0.1:4000
2. Open browser Developer Tools (F12)
3. Go to Console tab
4. Fill out and submit the form
5. Look for any error messages

## Step 2: Check EmailJS Dashboard
1. Go to emailjs.com
2. Check "Email Services" - make sure Gmail is connected
3. Check "Email Templates" - verify both templates exist
4. Check "Email" tab - see if any emails were sent/failed

## Step 3: Test Templates Individually
1. In EmailJS dashboard, go to each template
2. Click "Test" button
3. Fill in test data
4. Send test email

## Common Issues:
- Template variables don't match ({{variable}} names)
- Service not connected properly
- Email address not verified
- Template ID incorrect
- JavaScript errors

## Template Variable Reference:

### Business Template (template_vd34szo):
- {{from_name}} - Customer name
- {{from_email}} - Customer email
- {{phone}} - Phone number
- {{address}} - Service address
- {{service_type}} - Type of service
- {{description}} - Job description
- {{preferred_date}} - Preferred date
- {{additional_info}} - Additional notes

### Customer Template (template_gssk08o):
- {{to_name}} - Customer name
- {{to_email}} - Customer email
- {{service_type}} - Type of service