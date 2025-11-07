# 🚀 Activating n8n Workflow - Step by Step

## ⚠️ Current Status
The webhook test returned **404**, which means the workflow is not active or not imported yet.

## 📋 Activation Steps

### Step 1: Access n8n Dashboard
```
https://n8n.srv759792.hstgr.cloud
```

### Step 2: Import the Fixed Workflow

1. Click **"Workflows"** in the left sidebar
2. Click **"Add Workflow"** (+ button)
3. Click the **three dots menu** (⋮) in the top right
4. Select **"Import from File"**
5. Choose the file: `app/n8n.json`
6. The workflow will open in the editor

### Step 3: Verify the Configuration

#### A. Check Webhook Node
- Node name: **"Receive Lead"**
- Path: `ebike-catalogue`
- Method: `POST`
- Response Mode: **`responseNode`** (CRITICAL!)
- Allowed Origins: `*`

#### B. Check Google Sheets Node
- Node name: **"Append Lead to Sheet"**
- Document ID: `1hog1XvrnNDqGKz_LGa9yBgBHD0H2F-yzuIIYg3atwvk`
- Sheet Name: `LEAD`
- Credentials: Make sure Google Sheets OAuth2 is connected

**Column Mappings (FIXED):**
```
NOM     → {{ $json.body.name }}
EMAIL   → {{ $json.body.email }}
NUMERO  → {{ $json.body.phone }}
MESSAGE → {{ $json.body.message || '' }}
```

#### C. Check Response Node
- Node name: **"Respond Success"**
- Response: JSON
- Body: `{"status":"success","message":"Lead saved successfully"}`
- HTTP Code: `200`

### Step 4: Connect Google Sheets (If Not Already)

1. Click on **"Append Lead to Sheet"** node
2. Under **"Credentials"**, click **"+ New Credential"**
3. Select **"Google Sheets OAuth2 API"**
4. Click **"Connect my account"**
5. Authorize with your Google account
6. Select the credential

### Step 5: Activate the Workflow

1. Click the **"Inactive"** toggle in the top right
2. It should turn to **"Active"** (green)
3. The webhook URL will now be live:
   ```
   https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue
   ```

### Step 6: Test the Webhook

#### Option A: Run Test Script
```bash
./test-webhook.sh
```

Expected output:
```
✅ Test PASSED - Webhook is working!
📊 Check your Google Sheet for the test data
```

#### Option B: Use cURL
```bash
curl -X POST https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+33612345678",
    "message": "Testing from terminal"
  }'
```

Expected response:
```json
{"status":"success","message":"Lead saved successfully"}
```

#### Option C: Use the Website
```bash
npm run dev
```
1. Look for the purple **🧪 Test** button (bottom-right)
2. Click **"Auto-Fill Form"**
3. Submit the form
4. Check for success message

### Step 7: Verify in Google Sheets

1. Open your Google Sheet: 
   ```
   https://docs.google.com/spreadsheets/d/1hog1XvrnNDqGKz_LGa9yBgBHD0H2F-yzuIIYg3atwvk
   ```
2. Go to the **"LEAD"** sheet
3. You should see the test data in a new row

## 🔍 Troubleshooting

### Still Getting 404?
- ✅ Make sure workflow toggle shows **"Active"** (green)
- ✅ Verify the webhook path is exactly: `ebike-catalogue`
- ✅ Check n8n execution logs for errors
- ✅ Try disabling and re-enabling the workflow

### Getting 500 Error?
- ❌ Check Google Sheets credentials
- ❌ Verify Sheet name is "LEAD" (case sensitive)
- ❌ Check column headers: NOM, EMAIL, NUMERO, MESSAGE
- ❌ Look at n8n execution logs for detailed error

### Data Not Appearing in Sheet?
- ❌ Check if execution shows as successful in n8n
- ❌ Verify OAuth2 permissions
- ❌ Try re-connecting Google Sheets credentials
- ❌ Check if sheet is the correct one

### CORS Errors?
- ❌ Verify Allowed Origins is set to `*` in webhook
- ❌ Check all CORS headers are present
- ❌ Clear browser cache and try again

## ✅ Success Checklist

Before considering it complete:

- [ ] Workflow shows "Active" in n8n
- [ ] Test script returns 200 status code
- [ ] Google Sheet receives test data
- [ ] Website form submission works
- [ ] Success message displays correctly
- [ ] Console shows no errors
- [ ] All 4 fields (name, email, phone, message) appear in sheet

## 📊 Monitoring

After activation, monitor:
1. **n8n Executions**: Check for failed executions
2. **Google Sheet**: Verify data quality
3. **Website Console**: Watch for JS errors
4. **Browser Network Tab**: Check webhook responses

## 🎯 Next Steps

Once the workflow is active:
1. Test with multiple submissions
2. Verify data formatting is correct
3. Set up error notifications (optional)
4. Consider adding rate limiting
5. Deploy to production

