# HR Communications Feature Documentation

## Overview
The HR Communications page provides a comprehensive email management system for HR personnel to communicate with candidates efficiently using templates, variables, and bulk sending capabilities.

## Features Implemented

### 1. **Template Library** 📝

#### Features:
- **View All Templates**: Browse all email templates in a searchable list
- **Search Functionality**: Filter templates by name or category
- **Template Categories**: 
  - General
  - Interview
  - Acknowledgment
  - Offer
  - Rejection
  - Follow-up

#### Template Management:
- **Create Template**: Build new email templates with custom subject and body
- **Edit Template**: Modify existing templates
- **Duplicate Template**: Quick copy of templates with "(Copy)" suffix
- **Delete Template**: Remove templates with confirmation dialog
- **Variable System**: Use placeholders like `{candidate_name}`, `{job_title}`, etc.

#### Pre-loaded Templates:
1. **Interview Invitation** - Invite candidates for interviews
2. **Application Received** - Acknowledge receipt of applications
3. **Offer Letter** - Send job offers
4. **Rejection - Not a Fit** - Polite rejection emails

### 2. **Variable/Placeholder System** 🔤

#### Available Variables:
- `{candidate_name}` - Candidate's full name
- `{job_title}` - Position title
- `{company_name}` - Company name (HireMind)
- `{matched_skills}` - Skills that match the job
- `{interview_date}` - Interview date
- `{interview_time}` - Interview time
- `{interview_location}` - Interview location
- `{hr_name}` - HR representative name
- `{response_time}` - Expected response timeframe
- `{start_date}` - Job start date
- `{salary}` - Salary details
- `{benefits}` - Benefits package
- `{response_deadline}` - Deadline for response

#### How Variables Work:
1. Add variables to template using `{variable_name}` format
2. System automatically detects and displays all variables in template
3. Variables are replaced with actual data when sending emails
4. Visual badge display shows which variables are used in each template

### 3. **Compose Email Interface** ✉️

#### Workflow:
1. **Select Job Position**
   - Choose from available job postings
   - Dropdown shows job title and department

2. **Select Candidates**
   - Multi-select checkbox list
   - Shows candidate name, email, and position
   - Counter displays number of selected candidates

3. **Choose Template**
   - Select from template library
   - Dropdown shows template name and category

4. **Edit Before Send Option** ✏️
   - Toggle checkbox to enable editing
   - Override subject line (optional)
   - Override email body (optional)
   - Maintains template structure while allowing customization

5. **Preview Email** 👁️
   - Preview how the email will look with variables replaced
   - Shows actual candidate data in place of variables
   - Review before sending

6. **Send Email** 🚀
   - Sends to all selected candidates
   - Success toast notification
   - Email added to sent history

### 4. **Sent Emails / History Log** 📨

#### Features:
- **Complete Email History**: View all sent emails
- **Search Functionality**: Filter by subject, recipient, or job
- **Email Details**:
  - Status badge (Sent/Failed/Pending)
  - Timestamp
  - Recipients list
  - Job position
  - Template used
  - Full subject and body

#### Status Indicators:
- ✅ **Sent** - Successfully delivered (green badge)
- ❌ **Failed** - Delivery failed (red badge)
- ⏳ **Pending** - Awaiting delivery (gray badge)

#### View Email Details:
- Click eye icon to view full email
- Modal shows complete email information
- Includes all metadata and full message content

## User Interface Components

### Navigation Tabs:
1. **Template Library** - Manage email templates
2. **Sent Emails** - View email history

### Action Buttons:
- **Compose Email** - Main CTA button (top right)
- **Create Template** - Add new template
- **Edit** - Modify template
- **Duplicate** - Copy template
- **Delete** - Remove template (with confirmation)
- **Preview** - View email before sending
- **Send** - Deliver email to candidates

### Search Bars:
- Template search (filters by name/category)
- Email history search (filters by subject/recipient/job)

## Technical Implementation

### Component Structure:
```
HRCommunications.tsx (Main Component)
├── Template Library Tab
│   ├── Search Bar
│   ├── Create Template Dialog
│   ├── Template Cards
│   │   ├── Template Info
│   │   ├── Action Buttons
│   │   └── Variable Badges
│   └── Edit Template Dialog
└── Sent Emails Tab
    ├── Search Bar
    ├── Email History Cards
    │   ├── Status Badge
    │   ├── Email Summary
    │   └── View Details Button
    └── Email Details Dialog
```

### State Management:
- **Templates State**: Array of EmailTemplate objects
- **Sent Emails State**: Array of SentEmail objects
- **Compose Form State**: Current email composition data
- **Dialog States**: Control visibility of various modals
- **Search States**: Filter criteria for templates and emails

### Data Models:

#### EmailTemplate:
```typescript
{
  id: number;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  category: string;
  createdAt: string;
  lastModified: string;
}
```

#### SentEmail:
```typescript
{
  id: number;
  to: string[];
  subject: string;
  body: string;
  template: string;
  job: string;
  sentAt: string;
  status: "sent" | "failed" | "pending";
}
```

#### Candidate:
```typescript
{
  id: number;
  name: string;
  email: string;
  position: string;
  skills: string[];
}
```

## Usage Examples

### Example 1: Creating a New Template
1. Click "Create Template" button
2. Enter template name: "Technical Interview"
3. Select category: "Interview"
4. Enter subject: "Technical Interview for {job_title}"
5. Enter body with variables: "Dear {candidate_name}, We'd like to invite you for a technical interview..."
6. Click "Create Template"

### Example 2: Sending Bulk Email
1. Click "Compose Email" button
2. Select Job: "Senior React Developer"
3. Select Candidates: Check Sarah Johnson, Michael Chen
4. Choose Template: "Interview Invitation"
5. (Optional) Enable "Edit before send" and customize
6. Click "Preview Email"
7. Review and click "Send Email"

### Example 3: Editing Template
1. Navigate to Template Library tab
2. Find template to edit
3. Click Edit icon
4. Modify subject/body/category
5. Click "Update Template"

## Security Features

- **Authentication Required**: Uses `useHRAuth()` hook
- **Protected Route**: Only accessible to authenticated HR users
- **Session Validation**: Checks HR credentials before allowing access

## Mock Data Included

### Pre-loaded Templates (4):
- Interview Invitation
- Application Received
- Offer Letter
- Rejection - Not a Fit

### Sample Candidates (5):
- Sarah Johnson (React Developer)
- Michael Chen (Product Manager)
- Emily Rodriguez (UX Designer)
- David Kim (Backend Developer)
- Lisa Wang (Frontend Developer)

### Sample Jobs (5):
- Senior React Developer
- Product Manager
- UX Designer
- Backend Developer
- Frontend Developer

### Sample Sent Emails (3):
- Interview invitation to Sarah
- Application acknowledgment to Michael & Emily
- Offer letter to John

## Future Enhancements (Recommended)

### Backend Integration:
1. **Database Storage**: Store templates and email history
2. **Real Email Sending**: Integrate with email service (SendGrid, AWS SES)
3. **Email Tracking**: Track opens, clicks, and responses
4. **Attachment Support**: Allow file attachments
5. **Scheduled Sending**: Schedule emails for future delivery

### Advanced Features:
1. **Email Analytics**: Track open rates, response rates
2. **A/B Testing**: Test different email versions
3. **Email Sequences**: Create automated follow-up sequences
4. **Rich Text Editor**: HTML email composition
5. **Email Signatures**: Custom signatures per HR user
6. **CC/BCC Support**: Add additional recipients
7. **Email Queue**: Bulk sending with rate limiting
8. **Template Versioning**: Track template changes over time
9. **Email Validation**: Validate email addresses before sending
10. **Spam Score Checker**: Check emails for spam triggers

### Integration Features:
1. **Calendar Integration**: Auto-schedule interviews
2. **CRM Integration**: Sync with candidate database
3. **Analytics Dashboard**: Email performance metrics
4. **Mobile Responsive**: Optimize for mobile viewing
5. **Export/Import Templates**: Share templates between teams

## Accessibility

- ✅ Keyboard navigation supported
- ✅ ARIA labels for screen readers
- ✅ Clear visual hierarchy
- ✅ Color-blind friendly status indicators
- ✅ Responsive design for all screen sizes

## Testing Checklist

- [ ] Create new template
- [ ] Edit existing template
- [ ] Delete template (with confirmation)
- [ ] Duplicate template
- [ ] Search templates
- [ ] Compose email with single candidate
- [ ] Compose email with multiple candidates
- [ ] Use "Edit before send" option
- [ ] Preview email before sending
- [ ] Send email successfully
- [ ] View sent email history
- [ ] Search sent emails
- [ ] View email details
- [ ] Test variable replacement
- [ ] Test authentication protection
- [ ] Test responsive layout

## Known Limitations

1. **Client-Side Only**: No actual email sending (mock data)
2. **No Persistence**: Data resets on page refresh
3. **Limited Variables**: Fixed set of variables
4. **No HTML Emails**: Plain text only
5. **No Attachments**: File attachments not supported
6. **No Scheduling**: Immediate send only

## File Location

- **Component**: `src/pages/hr/HRCommunications.tsx`
- **Route**: `/hr/communications`
- **Auth**: Protected with `useHRAuth()` hook

## Dependencies Used

- React hooks (useState)
- React Router (useNavigate, useLocation)
- Shadcn UI components (Dialog, Card, Button, etc.)
- Lucide React icons
- Sonner (toast notifications)

---

**Status**: ✅ Fully Implemented and Functional
**Last Updated**: October 17, 2025
