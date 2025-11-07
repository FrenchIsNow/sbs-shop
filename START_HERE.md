# 🚀 START HERE - SBS SHOP Testing Guide

## ✨ What's New

Your coming soon page now has:
1. ✅ **Countdown timer** replacing "Bientôt"
2. ✅ **Auto-fill test helper** (purple button)
3. ✅ **Fixed n8n workflow** 
4. ✅ **Complete testing tools**

---

## 🎯 Quick Start (2 Minutes)

### Step 1: Start Dev Server
```bash
cd /Users/levelup/Dev/WEBSITES/sbs-shop
npm run dev
```

### Step 2: Open in Browser
```
http://localhost:3000
```

### Step 3: Look for Purple Button
- Bottom-right corner: **🧪 Test**
- Click it to open test panel
- Click **"🚀 Auto-Fill Form"**
- Submit the form

---

## ⚠️ First Time Setup

Before testing, you need to **activate the n8n workflow**:

### Quick Activation (5 minutes)
1. Go to: https://n8n.srv759792.hstgr.cloud
2. Import `app/n8n.json`
3. Connect Google Sheets
4. Toggle to "Active"

**Full Instructions:** [ACTIVATE_N8N.md](./ACTIVATE_N8N.md)

---

## 📚 Documentation Map

```
START_HERE.md              ← You are here! 🎯
│
├─ README_TESTING.md       ← Quick testing guide
├─ ACTIVATE_N8N.md         ← How to activate workflow ⚠️ IMPORTANT
├─ TEST_N8N.md             ← Full testing guide
├─ CHANGES_SUMMARY.md      ← What was changed
└─ N8N_SETUP.md            ← Complete n8n setup
```

**Follow this order:**
1. Read this file (START_HERE.md)
2. Complete activation ([ACTIVATE_N8N.md](./ACTIVATE_N8N.md))
3. Test with guide ([README_TESTING.md](./README_TESTING.md))

---

## 🧪 Testing Options

### Option 1: Auto-Fill Helper (Easiest) ⭐
```bash
npm run dev
# Look for purple 🧪 button
# Click "Auto-Fill Form"
# Submit & verify
```

### Option 2: Terminal Test
```bash
./test-webhook.sh
```

### Option 3: Manual cURL
```bash
curl -X POST https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"+33612345678"}'
```

---

## ✅ Success Checklist

- [ ] Dev server running (`npm run dev`)
- [ ] Purple test button visible
- [ ] n8n workflow activated
- [ ] Auto-fill populates form
- [ ] Form submits successfully
- [ ] Success message shows
- [ ] Data in Google Sheet

---

## 🐛 Troubleshooting

### Test button not showing?
→ Make sure you're running `npm run dev` (not production)

### Getting 404 error?
→ n8n workflow not active - see [ACTIVATE_N8N.md](./ACTIVATE_N8N.md)

### Form not submitting?
→ Check browser console for errors

### Data not in sheet?
→ Check n8n execution logs

---

## 📂 New Files Created

Testing Tools:
- `app/components/FormTestHelper.js` - Auto-fill component
- `test-webhook.sh` - Terminal test script

Documentation:
- `START_HERE.md` - This file
- `README_TESTING.md` - Quick guide
- `ACTIVATE_N8N.md` - Activation steps
- `TEST_N8N.md` - Full guide
- `CHANGES_SUMMARY.md` - What changed

---

## 🎨 Visual Guide

```
Your Website:
┌──────────────────────────────────────┐
│   [Logo: SBS SHOP]                   │
├──────────────────────────────────────┤
│                                      │
│     Bienvenue!                       │
│     Notre Site Premium...            │
│                                      │
│   ┌──────────────────────┐          │
│   │  00 : 12 : 34 : 56  │ ← NEW!    │
│   │ DAYS HRS MINS SECS  │          │
│   └──────────────────────┘          │
│                                      │
│   ┌────────────────────┐            │
│   │  [Contact Form]    │            │
│   │  Name: [_____]     │            │
│   │  Email: [_____]    │            │
│   │  Phone: [_____]    │            │
│   │  Message: [___]    │            │
│   │  [Submit]          │            │
│   └────────────────────┘            │
│                                      │
│                   ┌─────────┐       │
│                   │ 🧪 Test │ ← NEW!│
│                   └─────────┘       │
└──────────────────────────────────────┘
```

---

## 🚀 Next Steps

### Now (Required):
1. **Activate n8n workflow**
   - Follow [ACTIVATE_N8N.md](./ACTIVATE_N8N.md)
   - Takes ~5 minutes

2. **Test the setup**
   - Run `npm run dev`
   - Use test helper
   - Verify data in sheet

### Later (Optional):
- Add reCAPTCHA
- Set up analytics
- Add email notifications
- Configure rate limiting

---

## 🎯 What Changed Today

✅ **Countdown Timer:** Replaced "Bientôt" with live countdown
✅ **n8n Workflow:** Fixed data mapping for reliability
✅ **Test Helper:** Purple button for easy form testing
✅ **Documentation:** Complete guides for everything
✅ **Test Script:** Terminal testing tool

---

## 📞 Need Help?

**Quick Questions:**
- Check [README_TESTING.md](./README_TESTING.md)

**Activation Issues:**
- See [ACTIVATE_N8N.md](./ACTIVATE_N8N.md)

**Deep Dive:**
- Read [TEST_N8N.md](./TEST_N8N.md)

---

## 💡 Pro Tips

1. **Always test in dev first:** `npm run dev`
2. **Check browser console:** Press F12
3. **Monitor n8n logs:** Watch for errors
4. **Verify Google Sheet:** Check data quality
5. **Use test helper:** Fastest way to test

---

## 🎉 You're All Set!

**Ready to test?**
```bash
npm run dev
```

Look for the purple **🧪 Test** button and start testing!

**Need to activate first?** → [ACTIVATE_N8N.md](./ACTIVATE_N8N.md)

---

**Good luck! 🚀**

