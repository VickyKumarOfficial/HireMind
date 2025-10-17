# HR Login Security Enhancement

## Overview
The HR login system has been enhanced with multi-factor company verification to ensure that only authorized HR personnel can access the HR portal and post jobs.

## Security Features Implemented

### 1. **Multi-Field Authentication**
HR personnel must now provide the following credentials to login:

- **Corporate Email Address**: Official company email
- **Password**: Secure password
- **Company ID**: Unique company identifier (Format: `COMP-XXXX`)
- **HR Employee ID**: Unique employee identification number (Format: `EMP-XXXX` or numeric)
- **Department Authorization Code**: HR-specific department code (Format: `HR-XXX`)

### 2. **Format Validation**
Each field is validated against specific formats:

- **Company ID**: Must follow pattern like `COMP-1234` (2-4 uppercase letters, hyphen, 4-6 digits)
- **Employee ID**: Must follow pattern like `EMP-5678` or numeric ID (4-8 digits)
- **Department Code**: Must start with `HR-` followed by 2-4 digits (e.g., `HR-101`)

### 3. **Department Access Control**
Only codes starting with `HR-` are allowed, preventing non-HR personnel from accessing the portal.

### 4. **Session Management**
- Authentication data is stored in `sessionStorage`
- Sessions automatically expire after 8 hours
- All HR pages are protected with authentication checks
- Unauthorized access attempts redirect to login page

### 5. **Page Protection**
All HR portal pages are protected:
- Dashboard
- Jobs
- Candidates
- Analytics

Attempting to access any HR page without proper authentication will redirect to the login page.

## Usage Examples

### Valid Login Credentials Format:
```
Email: hr.manager@company.com
Password: ********
Company ID: COMP-1234
Employee ID: EMP-5678
Department Code: HR-101
```

### Alternative Employee ID Format:
```
Employee ID: 12345678 (numeric format)
```

## Technical Implementation

### Files Modified:
1. `src/pages/hr/HRLogin.tsx` - Enhanced login form with validation
2. `src/hooks/use-hr-auth.tsx` - Reusable authentication hook
3. `src/pages/hr/HRDashboard.tsx` - Added authentication check
4. `src/pages/hr/HRJobs.tsx` - Added authentication check
5. `src/pages/hr/HRCandidates.tsx` - Added authentication check
6. `src/pages/hr/HRAnalytics.tsx` - Added authentication check
7. `src/components/hr/HRSidebar.tsx` - Added secure logout functionality

### Authentication Hook (`useHRAuth`)
A custom hook that:
- Validates authentication on component mount
- Checks session expiration (8-hour limit)
- Provides `logout()` function
- Provides `getHRAuthData()` to retrieve current user info

### Logout Functionality
- Clears authentication data from sessionStorage
- Redirects to login page
- Available in the sidebar footer

## Security Benefits

1. **Prevents Unauthorized Access**: Multiple verification points ensure only legitimate HR personnel can login
2. **Company-Specific Validation**: Each company can have unique IDs and codes
3. **Department Isolation**: Only HR department codes are accepted
4. **Session Security**: Automatic expiration prevents stale sessions
5. **Real-time Validation**: Immediate feedback on incorrect format

## Future Enhancements (Recommended)

For production deployment, consider:

1. **Backend API Integration**: Validate credentials against a secure database
2. **Two-Factor Authentication (2FA)**: Add SMS/Email OTP verification
3. **Rate Limiting**: Prevent brute force attacks
4. **Audit Logging**: Track all login attempts
5. **Password Complexity Requirements**: Enforce strong passwords
6. **Account Lockout**: Lock accounts after multiple failed attempts
7. **HTTPS Only**: Ensure all communication is encrypted
8. **JWT Tokens**: Use secure token-based authentication
9. **Role-Based Access Control (RBAC)**: Different permissions for different HR roles

## Testing the Security

To test the enhanced security:

1. Try accessing `/hr/dashboard` directly without logging in → Should redirect to login
2. Try logging in with invalid formats → Should show validation errors
3. Try using non-HR department codes → Should show access denied
4. Wait 8+ hours after login → Session should expire and redirect to login
5. Logout and try accessing HR pages → Should redirect to login

## Notes

- All validation is currently client-side
- For production, implement server-side validation
- SessionStorage is used (data cleared when browser closes)
- Consider using encrypted cookies or localStorage for longer sessions
