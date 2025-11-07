# 🧪 Testing n8n Workflow - SBS SHOP

## ✅ What's Fixed

### 1. N8N Workflow Fixed
- Updated data mapping from `$json["body"]["name"]` to `$json.body.name`
- Added fallback for empty message field: `$json.body.message || ''`
- More robust error handling

### 2. Auto-Fill Test Helper Added
A floating test button (only visible in development mode) that:
- ✨ Auto-fills form with realistic test data
- 🎯 Scrolls to form automatically
- 🌍 Supports both English and French test data
- 💜 Purple floating button in bottom-right corner

## 🚀 How to Test

### Method 1: Using Auto-Fill Test Helper (Easiest)

1. **Start Development Server:**
```bash
npm run dev
```

2. **Look for Purple Test Button:**
   - Bottom-right corner of the page
   - Click "🧪 Test" to open test panel

3. **Auto-Fill Form:**
   - Click "🚀 Auto-Fill Form"
   - Form will be populated with test data
   - Page will scroll to form
   - Name field will be focused

4. **Submit Form:**
   - Click submit button
   - Check browser console for response
   - Verify data in Google Sheets

### Method 2: Manual cURL Test

```bash
curl -X POST https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+33612345678",
    "message": "This is a test message"
  }'
```

Expected Response:
```json
{
  "status": "success",
  "message": "Lead saved successfully"
}
```

### Method 3: Browser Console Test

Open browser console and run:

```javascript
fetch('https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Console Test',
    email: 'console@test.com',
    phone: '+33612345678',
    message: 'Testing from console'
  })
})
.then(res => res.json())
.then(data => console.log('✅ Success:', data))
.catch(err => console.error('❌ Error:', err))
```

## 📊 Test Data

### French Test Data (Default)
- **Name:** Jean Dupont
- **Email:** jean.dupont@test.fr
- **Phone:** +33 6 12 34 56 78
- **Message:** Je suis passionné de motos électriques et j'aimerais en savoir plus sur vos modèles.

### English Test Data
- **Name:** John Doe
- **Email:** john.doe@test.com
- **Phone:** +1 234 567 8900
- **Message:** I'm passionate about electric bikes and would love to learn more about your models.

## ✅ Verification Checklist

After submitting the form, verify:

1. ✅ Form shows success message
2. ✅ Button shows green "Done!" state
3. ✅ Console shows 200 response
4. ✅ Data appears in Google Sheet with columns:
   - NOM (Name)
   - EMAIL
   - NUMERO (Phone)
   - MESSAGE

## 🔧 Re-import Workflow to n8n

If you need to update the workflow in n8n:

1. Go to: `https://n8n.srv759792.hstgr.cloud`
2. Open existing workflow or create new one
3. Import updated `app/n8n.json`
4. Verify Google Sheets credentials are connected
5. Activate workflow

## 🐛 Troubleshooting

### Test Button Not Visible
- ✅ Make sure you're in development mode (`npm run dev`)
- ✅ Test button only shows in `NODE_ENV=development`

### Form Submission Fails
- ❌ Check n8n workflow is ACTIVE
- ❌ Verify webhook URL is correct
- ❌ Check browser console for CORS errors
- ❌ Verify Google Sheets credentials in n8n

### Data Not Appearing in Google Sheets
- ❌ Check n8n execution logs
- ❌ Verify Sheet name is "LEAD"
- ❌ Verify columns: NOM, EMAIL, NUMERO, MESSAGE
- ❌ Check OAuth2 credentials are valid

### Success Response but No Data
- ❌ Check if data mapping is correct in n8n
- ❌ Verify the path: `$json.body.name` (not `$json["body"]["name"]`)
- ❌ Look at n8n execution to see what data was received

## 📝 Google Sheet Setup

Your Google Sheet must have these exact column headers:

| NOM | EMAIL | NUMERO | MESSAGE |
|-----|-------|--------|---------|

**Important:** First row should be headers, data starts from row 2.

## 🎯 Next Steps

1. Test with auto-fill helper
2. Verify data in Google Sheets
3. Test error states (invalid email, empty fields)
4. Test with real device/phone
5. Monitor n8n execution logs
6. Set up email notifications (optional)

## 🔒 Production Notes

- Test helper will NOT appear in production build
- CORS is set to `*` - consider restricting to your domain
- Rate limiting is not implemented - consider adding it
- No spam protection - consider adding reCAPTCHA

## 📞 Support

If issues persist:
1. Check n8n execution logs
2. Verify webhook URL is accessible
3. Test with cURL first (simplest method)
4. Check Google Sheets permissions

