# GROQ API Setup Instructions

## 🎯 Quick Setup (5 Minutes)

### Step 1: Get GROQ API Key

1. **Visit GROQ Console**
   - Open browser: https://console.groq.com/
   - Click **"Sign Up"** or **"Login"**

2. **Create Account**
   - Sign up with email or GitHub
   - Verify your email if required
   - Complete profile setup

3. **Generate API Key**
   - Navigate to **"API Keys"** in sidebar
   - Click **"Create API Key"**
   - Name it: `HireMind-Resume-Optimizer`
   - Click **"Create"**
   - **COPY THE KEY** (shown only once!)

### Step 2: Configure Project

1. **Open Project Root**
   ```
   d:\HireMind\
   ```

2. **Create/Edit `.env` File**
   - If `.env` doesn't exist, create it
   - Add the following line:
   ```
   VITE_GROQ_API_KEY=gsk_your_actual_api_key_here
   ```
   - Replace `gsk_your_actual_api_key_here` with your real key
   - Save the file

3. **Verify `.gitignore`**
   - Open `.gitignore` file
   - Ensure it contains:
   ```
   .env
   .env.local
   .env.*.local
   ```
   - This prevents committing API keys

### Step 3: Restart Development Server

1. **Stop Current Server**
   - Press `Ctrl + C` in terminal
   - Wait for server to stop

2. **Start Fresh**
   ```powershell
   npm run dev
   ```
   - Server will load environment variables
   - You should see: `VITE ready` message

### Step 4: Test Integration

1. **Navigate to Profile**
   - Open browser: http://localhost:5173/candidate/profile
   - Upload a resume (PDF or Word)

2. **Click AI Optimizer**
   - Click **"AI Resume Optimizer"** button
   - You should navigate to optimizer page
   - Analysis should start automatically

3. **Verify Results**
   - Wait 2-4 seconds
   - You should see:
     - Score out of 100
     - Changes required
     - Project enhancements
     - Overall review
   - ✅ If you see results → Working!
   - ❌ If error → Check troubleshooting below

---

## 🔍 Verification Checklist

- [ ] GROQ account created
- [ ] API key generated and copied
- [ ] `.env` file created in project root
- [ ] API key pasted in `.env` (format: `VITE_GROQ_API_KEY=gsk_...`)
- [ ] `.env` added to `.gitignore`
- [ ] Development server restarted
- [ ] Can navigate to AI Optimizer page
- [ ] Analysis completes successfully
- [ ] Results display correctly

---

## 🐛 Troubleshooting

### Issue 1: "Failed to analyze resume"

**Cause:** API key not configured or invalid

**Solution:**
1. Check `.env` file exists in `d:\HireMind\.env`
2. Verify format: `VITE_GROQ_API_KEY=gsk_xxxxx`
3. No spaces, no quotes around key
4. Restart dev server after changes
5. Generate new key if old one expired

### Issue 2: Analysis stuck on loading

**Cause:** Network issues or API problems

**Solution:**
1. Check internet connection
2. Visit https://console.groq.com/ - is it accessible?
3. Check browser console (F12) for errors
4. Try regenerating API key
5. Wait 10 seconds (GROQ is fast, but network can be slow)

### Issue 3: Environment variable not loading

**Cause:** `.env` file location or format wrong

**Solution:**
1. Ensure `.env` is in project ROOT (`d:\HireMind\.env`)
2. Not in `src` folder
3. File name is exactly `.env` (no `.txt` extension)
4. Format: `VITE_GROQ_API_KEY=value` (no spaces around `=`)
5. Restart dev server after creating/editing

### Issue 4: "Please upload a resume first"

**Cause:** No resume uploaded on profile

**Solution:**
1. Go to Profile page
2. Upload resume (PDF or Word, max 5MB)
3. Return to Profile page
4. Click "AI Resume Optimizer" again

### Issue 5: Console errors about API key

**Check these:**
```powershell
# In PowerShell, verify env vars loaded:
Write-Host $env:VITE_GROQ_API_KEY
# Should show your key, not empty

# Restart dev server:
npm run dev
# Watch for any error messages during startup
```

---

## 📋 `.env` File Template

Create `d:\HireMind\.env` with this content:

```bash
# GROQ AI Configuration
# Get your API key from: https://console.groq.com/keys
VITE_GROQ_API_KEY=gsk_your_api_key_here

# Replace gsk_your_api_key_here with your actual GROQ API key
# Example: VITE_GROQ_API_KEY=gsk_abc123def456ghi789jkl012mno345pqr

# IMPORTANT SECURITY NOTES:
# - Never commit this file to version control
# - Never share your API key publicly
# - Add .env to .gitignore
# - Rotate keys if exposed
```

---

## 🔒 Security Best Practices

### ⚠️ DO:
- ✅ Keep `.env` in `.gitignore`
- ✅ Use backend API in production
- ✅ Rotate keys regularly
- ✅ Use different keys for dev/prod
- ✅ Monitor API usage

### ❌ DON'T:
- ❌ Commit `.env` to Git
- ❌ Share API keys in chat/email
- ❌ Use same key across multiple projects
- ❌ Store keys in frontend code
- ❌ Publish keys to public repos

---

## 🌐 GROQ API Information

### Available Models:
```
llama-3.3-70b-versatile (Default - Fast & Capable)
llama-3.1-8b-instant (Faster, less capable)
mixtral-8x7b-32768 (Alternative model)
```

### Rate Limits:
- Free tier: Check GROQ console for current limits
- Typical: 30 requests/minute
- Upgrade available for higher limits

### Pricing:
- Free tier available
- Pay-as-you-go options
- Check: https://console.groq.com/settings/billing

### Performance:
- Response time: 1-4 seconds typically
- Token speed: 300-800 tokens/second
- Very fast compared to other LLM APIs

---

## 📊 Testing Your Setup

### Manual Test:

1. **Open Browser Console** (F12)
2. **Run this in console:**
   ```javascript
   console.log(import.meta.env.VITE_GROQ_API_KEY)
   ```
3. **Should output your key** (first few chars)
4. **If undefined** → env var not loaded, restart server

### Component Test:

1. **Go to Profile page**
2. **Upload any PDF/Word file**
3. **Click "AI Resume Optimizer"**
4. **Watch for:**
   - Loading animation appears
   - After 2-4 seconds, results show
   - Score displays
   - All sections populate
5. **Check browser console** for any errors

### API Test:

You can test directly in GROQ console:
1. Visit https://console.groq.com/playground
2. Try sample prompt
3. Verify API is working
4. Check your usage quota

---

## 🔄 Updating API Key

If you need to change your API key:

1. **Generate New Key**
   - Go to GROQ console
   - Create new API key
   - Copy it

2. **Update `.env`**
   ```bash
   # Replace old key with new one
   VITE_GROQ_API_KEY=gsk_new_key_here
   ```

3. **Restart Server**
   ```powershell
   # Stop server (Ctrl+C)
   npm run dev
   ```

4. **Test Again**
   - Try AI Optimizer
   - Should work with new key

---

## 📱 Production Deployment

### Important Changes for Production:

1. **Move API to Backend**
   ```
   Current: Frontend → GROQ (insecure)
   Production: Frontend → Backend → GROQ (secure)
   ```

2. **Environment Variables**
   ```
   Development: .env file
   Production: Hosting platform env vars
   ```

3. **Remove Browser Flag**
   ```typescript
   // Remove this in production:
   dangerouslyAllowBrowser: true
   ```

4. **Add Error Handling**
   - Rate limiting
   - Retry logic
   - Fallback mechanisms
   - User-friendly errors

---

## 🎯 What You Should See

### Successful Setup:

```
1. Navigate to /candidate/profile
   ✅ Page loads

2. Click "AI Resume Optimizer"
   ✅ Navigates to /candidate/ai-resume-optimizer

3. Automatic analysis starts
   ✅ Loading spinner shows
   ✅ "Analyzing Your Resume" message

4. After 2-4 seconds
   ✅ Score displays (0-100)
   ✅ Color-coded (green/yellow/red)
   ✅ Changes listed
   ✅ Projects suggestions shown
   ✅ Strengths & weaknesses visible
   ✅ Overall review displayed

5. History button works
   ✅ Opens dialog
   ✅ Shows past analyses

6. Re-analyze works
   ✅ Triggers new analysis
   ✅ Updates results
```

---

## 💡 Pro Tips

### Getting Better Results:
1. Upload actual resume (not blank)
2. Ensure resume has content
3. PDF format works best
4. Use latest resume version
5. Include all sections (experience, skills, etc.)

### Optimizing API Usage:
1. Don't spam re-analyze button
2. Wait for analysis to complete
3. Review results before re-analyzing
4. Make changes between analyses
5. Track improvement over time

### Debugging:
1. Always check browser console first
2. Look for network errors (Network tab)
3. Verify API key in console: `import.meta.env.VITE_GROQ_API_KEY`
4. Check GROQ console for usage/limits
5. Try playground to test API directly

---

## 📞 Getting Help

### Before Asking for Help:

1. **Check this guide** - Most issues covered here
2. **Check console** - Errors show in browser DevTools
3. **Verify API key** - Is it correct in `.env`?
4. **Restart server** - Fixed 90% of issues
5. **Check GROQ status** - Is service operational?

### If Still Stuck:

**Provide this info:**
- What step failed?
- Any error messages?
- Browser console output?
- `.env` file format (without actual key)?
- Did you restart server?

---

## ✅ Final Checklist

Before considering setup complete:

- [ ] GROQ account active
- [ ] API key generated
- [ ] `.env` file created
- [ ] Key format correct
- [ ] `.gitignore` updated
- [ ] Server restarted
- [ ] Can access AI Optimizer page
- [ ] Analysis runs successfully
- [ ] Results display properly
- [ ] History dialog works
- [ ] Re-analyze works
- [ ] No console errors
- [ ] Ready to use!

---

## 🎉 Success!

If all checks pass, you're ready to:
- ✅ Analyze resumes with AI
- ✅ Get instant feedback
- ✅ Improve resume quality
- ✅ Track progress over time

**Start optimizing resumes now!** 🚀

---

## 📚 Additional Resources

- **GROQ Documentation**: https://console.groq.com/docs
- **GROQ Playground**: https://console.groq.com/playground
- **API Keys Management**: https://console.groq.com/keys
- **Usage & Billing**: https://console.groq.com/settings/billing
- **Status Page**: https://status.groq.com/

---

*Last Updated: October 17, 2025*
*Version: 1.0.0*

**Need help? Check troubleshooting section or contact dev team!**
