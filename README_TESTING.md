# 🧪 Quick Testing Guide - SBS SHOP

## 🎯 Quick Start (3 Steps)

### 1. Start Development Server
```bash
npm run dev
```

### 2. Look for Purple Test Button
- Bottom-right corner: **🧪 Test**
- Click to open test panel
- Click **"Auto-Fill Form"** 

### 3. Submit & Verify
- Form will be auto-filled
- Click submit button
- Check success message
- Verify data in [Google Sheet](https://docs.google.com/spreadsheets/d/1hog1XvrnNDqGKz_LGa9yBgBHD0H2F-yzuIIYg3atwvk)

---

## ⚠️ If Getting 404 Error

The n8n workflow needs to be activated first:

1. Go to: https://n8n.srv759792.hstgr.cloud
2. Import workflow from `app/n8n.json`
3. Connect Google Sheets credentials
4. Toggle workflow to **"Active"**
5. Test again

👉 **See [ACTIVATE_N8N.md](./ACTIVATE_N8N.md) for detailed steps**

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README_TESTING.md** | Quick testing guide (this file) |
| **ACTIVATE_N8N.md** | Step-by-step n8n activation |
| **TEST_N8N.md** | Comprehensive testing guide |
| **N8N_SETUP.md** | Complete n8n configuration |
| **test-webhook.sh** | Terminal test script |

---

## 🔧 What Was Fixed

### n8n Workflow
- ✅ Fixed data mapping: `$json.body.name` instead of `$json["body"]["name"]`
- ✅ Added fallback for empty message: `$json.body.message || ''`
- ✅ Improved error handling

### Testing Tools
- ✅ Auto-fill test helper (purple button)
- ✅ Terminal test script (`test-webhook.sh`)
- ✅ Test data for EN & FR languages
- ✅ Automatic form scrolling & focus

---

## 🚀 Test Methods

### Method 1: Auto-Fill Helper (Recommended)
```bash
npm run dev
# Click purple 🧪 button → Auto-Fill Form → Submit
```

### Method 2: Terminal Script
```bash
./test-webhook.sh
```

### Method 3: cURL Command
```bash
curl -X POST https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"+33612345678","message":"Test"}'
```

---

## ✅ Success Checklist

- [ ] Purple test button appears (dev mode)
- [ ] Auto-fill populates all fields
- [ ] Form submits without errors
- [ ] Success message displays
- [ ] Data appears in Google Sheet
- [ ] All 4 columns populated (NOM, EMAIL, NUMERO, MESSAGE)

---

## 🐛 Common Issues

### Test Button Not Visible
- Make sure you're running `npm run dev` (not production build)
- Test button only shows in development mode

### 404 Error
- Workflow not active in n8n
- See [ACTIVATE_N8N.md](./ACTIVATE_N8N.md)

### 500 Error  
- Google Sheets credentials issue
- Check OAuth2 connection in n8n

### Data Not in Sheet
- Check n8n execution logs
- Verify Sheet name is "LEAD"
- Check column headers match

---

## 📞 Need Help?

1. Check [ACTIVATE_N8N.md](./ACTIVATE_N8N.md) - Activation guide
2. Check [TEST_N8N.md](./TEST_N8N.md) - Full testing guide
3. Check n8n execution logs for errors
4. Verify Google Sheet structure

---

## 🎨 Test Data

### French (Default)
- **Name:** Jean Dupont
- **Email:** jean.dupont@test.fr  
- **Phone:** +33 6 12 34 56 78

### English
- **Name:** John Doe
- **Email:** john.doe@test.com
- **Phone:** +1 234 567 8900

---

## 📊 File Structure

```
sbs-shop/
├── app/
│   ├── components/
│   │   ├── CountdownTimer.js       # Countdown component
│   │   ├── FormTestHelper.js       # Auto-fill test tool ✨
│   │   └── TextCursorProximity.js
│   ├── config.js                   # Countdown date config
│   ├── n8n.json                    # Fixed n8n workflow ✅
│   └── page.js                     # Main page with form
├── ACTIVATE_N8N.md                 # Activation guide 📋
├── TEST_N8N.md                     # Testing guide 🧪
├── N8N_SETUP.md                    # Setup documentation 📚
├── README_TESTING.md               # This file 🎯
└── test-webhook.sh                 # Test script 🔧
```

---

## 🎯 Next Steps After Testing

1. ✅ Verify all tests pass
2. 📊 Monitor Google Sheet data quality
3. 🚀 Deploy to production
4. 🔒 Consider adding reCAPTCHA
5. 📈 Set up analytics tracking
6. 🔔 Add email notifications (optional)

---

**Ready to test? Run `npm run dev` and look for the purple 🧪 button!**

