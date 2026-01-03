# EmailJS Setup Guide for ZeroMaintenance

## ✅ CURRENT STATUS: PARTIALLY COMPLETE

### ✅ COMPLETED:
- **Public Key:** `e5LaHdwANoDHyRsvs` ✅
- **Service ID:** `service_20hi9bm` ✅
- **Email Address:** `contact.zeromaintenance@gmail.com` ✅

### 🔄 NEXT: Create Email Templates

---

## Step-by-Step EmailJS Configuration

### Step 1: Sign Up for EmailJS ✅
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click "Sign Up" (free account)
3. Verify your email

### Step 2: Set Up Email Service ✅
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (or your preferred email provider)
4. Connect your email account:
   - **Service Name:** `ZeroMaintenance Gmail`
   - **Email:** `contact.zeromaintenance@gmail.com`
   - Click **"Connect Account"**
5. **Service ID:** `service_20hi9bm` ✅

### Step 3: Create Email Templates 🔄 (DO THIS NOW)

#### Template 1: Business Notification (for you)
1. Go to **"Email Templates"** → **"Create New Template"**
2. **Template Name:** `business_notification`
3. **Subject:** `New Quote Request from {{from_name}}`
4. **Content:**
```
New quote request received:

Customer: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Address: {{address}}
Service: {{service_type}}
Description: {{description}}
Preferred Date: {{preferred_date}}
Additional Info: {{additional_info}}

Please contact the customer to discuss details and arrange for photos.
```
5. **Template ID:** Copy this (looks like `template_xxxxxx`)

#### Template 2: Customer Confirmation
1. Create another template
2. **Template Name:** `customer_confirmation`
3. **Subject:** `Quote Request Received - ZeroMaintenance`
4. **Content:**
```
Hi {{to_name}},

Thank you for your interest in ZeroMaintenance!

We've received your quote request for {{service_type}} and will contact you via phone or text to get pictures and provide an accurate quote.

Service Details:
- Address: {{address}}
- Description: {{description}}

We'll be in touch soon!

Best regards,
ZeroMaintenance Team
contact.zeromaintenance@gmail.com
+1 503 964 3822
```
5. **Template ID:** Copy this (looks like `template_yyyyyy`)

### Step 4: Send Template IDs 🔄
Once you create both templates, send me:
- **Business Template ID:** `template_xxxxxx`
- **Customer Template ID:** `template_yyyyyy`

### Step 5: Final Configuration ✅ (I'll do this)
I'll update `script.js` with your template IDs.

## Testing EmailJS

### Test the Form
1. Open your website locally: `http://127.0.0.1:3000`
2. Fill out the quote form
3. Submit it
4. Check your email for notifications

### Debug Tips
- Open browser console (F12) to see any errors
- Check EmailJS dashboard for sent emails
- Verify all IDs are correct (no extra spaces)

## EmailJS Limits (Free Plan)
- 200 emails/month
- 6,000 emails/year
- Perfect for starting out!

---

**🎯 YOU'RE ALMOST DONE!** Create the two email templates above and send me the Template IDs! 🚀</content>
<parameter name="filePath">c:\Projects\zeromaintenence\emailjs-setup.md