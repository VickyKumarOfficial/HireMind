# HR Communications - Quick Start Guide

## 🚀 Quick Access
Navigate to: **HR Portal → Communications** (or visit `/hr/communications`)

---

## 📋 Common Tasks

### 1️⃣ Send an Email to Candidates

**Steps:**
1. Click **"Compose Email"** (blue button, top right)
2. Select a **Job Position** from dropdown
3. Check the **Candidates** you want to email
4. Choose an **Email Template** from dropdown
5. *(Optional)* Check **"Edit before send"** to customize
6. Click **"Preview Email"** to review
7. Click **"Send Email"** to send

**⏱️ Time:** ~30 seconds

---

### 2️⃣ Create a New Email Template

**Steps:**
1. Go to **"Template Library"** tab
2. Click **"Create Template"** button
3. Enter:
   - Template Name (e.g., "Phone Screen Invitation")
   - Category (e.g., "Interview")
   - Email Subject (use `{variables}`)
   - Email Body (use `{variables}`)
4. Click **"Create Template"**

**⏱️ Time:** ~2 minutes

---

### 3️⃣ View Sent Emails

**Steps:**
1. Go to **"Sent Emails"** tab
2. Browse the email history
3. Click the **👁️ Eye icon** to view full details

**⏱️ Time:** ~10 seconds

---

### 4️⃣ Edit an Existing Template

**Steps:**
1. Go to **"Template Library"** tab
2. Find your template
3. Click the **✏️ Edit icon**
4. Make your changes
5. Click **"Update Template"**

**⏱️ Time:** ~1 minute

---

### 5️⃣ Duplicate a Template

**Steps:**
1. Go to **"Template Library"** tab
2. Find the template you want to copy
3. Click the **📋 Copy icon**
4. A new template is created with "(Copy)" suffix

**⏱️ Time:** ~5 seconds

---

## 🔤 Using Variables in Templates

### Available Variables:
- `{candidate_name}` - Automatically filled with candidate's name
- `{job_title}` - Job position title
- `{company_name}` - Your company name
- `{matched_skills}` - Skills that match the job
- `{interview_date}` - Interview date
- `{interview_time}` - Interview time
- `{interview_location}` - Where the interview will be
- `{hr_name}` - HR representative's name
- `{response_time}` - Expected response time
- `{start_date}` - Job start date
- `{salary}` - Salary information
- `{benefits}` - Benefits package
- `{response_deadline}` - Deadline to respond

### Example Template:
```
Subject: Interview Invitation for {job_title}

Dear {candidate_name},

We are impressed with your skills in {matched_skills} and would like to invite you for an interview for the {job_title} position at {company_name}.

Interview Details:
- Date: {interview_date}
- Time: {interview_time}
- Location: {interview_location}

Best regards,
{hr_name}
```

---

## 🎯 Pro Tips

### ✅ DO:
- Use descriptive template names
- Test templates with preview before sending
- Use variables for personalization
- Keep templates organized by category
- Review sent emails regularly

### ❌ DON'T:
- Send emails without previewing
- Use vague template names
- Forget to select candidates
- Delete templates that are in use

---

## 📊 Template Categories

| Category | Use For |
|----------|---------|
| **General** | General communications |
| **Interview** | Interview invitations, scheduling |
| **Acknowledgment** | Application received confirmations |
| **Offer** | Job offers |
| **Rejection** | Candidate rejections |
| **Follow-up** | Follow-up communications |

---

## 🔍 Search Features

### Template Search:
- Searches template **names** and **categories**
- Type in the search box above template list

### Email History Search:
- Searches **subject**, **recipient**, and **job position**
- Type in the search box in Sent Emails tab

---

## 💡 Example Workflows

### Workflow 1: Inviting Multiple Candidates for Interview
```
1. Compose Email
2. Select: "Senior React Developer" job
3. Check: Sarah, Michael, Emily
4. Template: "Interview Invitation"
5. Preview → Send
✅ Done! 3 emails sent
```

### Workflow 2: Customizing a Template for One Candidate
```
1. Compose Email
2. Select: "Product Manager" job
3. Check: Michael Chen
4. Template: "Interview Invitation"
5. Check "Edit before send"
6. Add custom note in body
7. Preview → Send
✅ Done! Personalized email sent
```

### Workflow 3: Creating a Template from Scratch
```
1. Template Library → Create Template
2. Name: "Second Round Interview"
3. Category: "Interview"
4. Subject: "Second Round Interview - {job_title}"
5. Body: [Write your message with variables]
6. Create Template
✅ Done! Ready to use
```

---

## 🆘 Troubleshooting

### Problem: Can't send email
**Solution:** Ensure you've selected:
- ✓ A job position
- ✓ At least one candidate
- ✓ An email template

### Problem: Variables not showing in preview
**Solution:** Make sure variables are wrapped in curly braces: `{variable_name}`

### Problem: Template won't save
**Solution:** Check that you've filled in:
- ✓ Template name
- ✓ Subject line
- ✓ Body text

---

## 📱 Keyboard Shortcuts

- `Esc` - Close any open dialog
- `Tab` - Navigate between fields
- `Enter` - Submit forms (when focused on button)

---

## 📞 Need Help?

If you encounter any issues:
1. Check this guide
2. Review the full documentation: `HR_COMMUNICATIONS_DOCUMENTATION.md`
3. Contact your system administrator

---

**Happy Emailing! 📧**
