# AccessAble 5.1 — GitHub Pages + Supabase (No Firebase)

This is the **Supabase edition** of AccessAble, with the original student support site, four-step Smart Navigator, detailed knowledge library, student ticket/appointment forms, personal workspace, and a staff login link in the student footer. The staff login opens in a **new tab**; it checks a real Supabase Auth account and a database staff role before showing tickets.

**Important:** This package has fully written website and database setup files, but a live staff login and cross-device ticket updates will work **only after you create and connect your own Supabase project**. This package has **no default staff password**. It is a portfolio project, not an operating school support service.

## Your links

- Website files: https://github.com/sam-x9/accessable-support
- Published website: https://sam-x9.github.io/accessable-support/
- Supabase control panel: https://supabase.com/dashboard

## Files

| File | What it does |
| --- | --- |
| `index.html` | Student website and footer Staff login link |
| `app.js` + `styles.css` | Student navigation, navigator, guides, requests, workspace |
| `staff-login.html` | Staff email/password sign-in in a new tab |
| `staff-dashboard.html` + `staff.js` + `staff.css` | Protected ticket queue, appointments, notes, analytics |
| `cloud-student.js` | Student Supabase sign-in and database synchronization |
| `supabase-config.js` | Paste your **public project URL and publishable key** here |
| `supabase-schema.sql` | Creates secure tables, staff role checks, and server-side ticket actions |
| `.nojekyll` | GitHub Pages compatibility |

## Before you change your existing GitHub website

1. Sign in at https://github.com using the GitHub account that owns `sam-x9/accessable-support`.
2. Open https://github.com/sam-x9/accessable-support
3. Click **Code → Download ZIP** to back up your current published files.
4. **Do not upload the older AccessAble 4.0 Firebase package**. Use only this Supabase 5.0 package after finishing the database steps below.

## Step A — Create a free Supabase project

1. Open https://supabase.com/dashboard and sign up (Google or GitHub sign-in is fine).
2. Click **New project** (create an organization first if prompted).
3. Name it `AccessAble`, choose the Free plan and a nearby US region.
4. Create and privately save your **database password**. This password is **not** your staff login password and is **never pasted into GitHub**.
5. Click **Create project** and open it.

## Step B — Create tables and protect student information

1. In the Supabase left menu, click **SQL Editor**.
2. Click **New query**.
3. On your computer, open `supabase-schema.sql` (right-click → Open with Notepad or VS Code).
4. Press Ctrl+A, then Ctrl+C to copy all the SQL.
5. Paste it into the Supabase SQL Editor.
6. Click **Run**. You should see a success message. **Do not skip this step**.
7. In **Table Editor**, confirm you see `support_tickets`, `support_appointments`, and `staff_accounts`.

The SQL creates row-level security: students can view only their own records; people with an active staff role can view all support records. Direct writes are blocked; ticket changes run through permission-checked database functions. The SQL Editor runs with administrative database permissions, so **read the SQL file and only execute this project's file**. Keep actual student data out of the project until the rules are tested.

## Step C — Enable student and staff authentication

1. Select **Authentication** in Supabase.
2. Under **Sign In / Providers** or **Providers**, confirm **Email** is enabled for staff login.
3. Under **Anonymous Sign-Ins**, enable the anonymous sign-in option for students. This lets a student submit a ticket without a password; their personal request history belongs to that browser profile. For a real public deployment, configure CAPTCHA/abuse protections.
4. Under **Authentication → URL Configuration**, set **Site URL** to `https://sam-x9.github.io/accessable-support/`.
5. Add this under allowed **Redirect URLs** if you plan to use emailed invite/reset links: `https://sam-x9.github.io/accessable-support/staff-login.html`.

## Step D — Make your staff account

1. Open **Authentication → Users**.
2. Click **Add user**. Either create a user with your own email and a strong password, or send yourself an invitation and follow the email link to set a password.
3. Find your new staff user and **copy their UID** (a long ID with hyphens). The UID is not the email address.
4. Open **SQL Editor → New query**.
5. Paste the following, replacing `PASTE-STAFF-USER-UID-HERE` with the UID copied above:

```sql
insert into public.staff_accounts (user_id, active, display_name)
values ('PASTE-STAFF-USER-UID-HERE', true, 'AccessAble Staff')
on conflict (user_id) do update set active = true;
```

6. Click **Run**. You have now granted the real staff role.
7. Keep the staff password private. **No default `admin/admin` password exists.**

## Step E — Find the two public connection settings

1. Open the Supabase project's **Connect** button to locate the **Project URL** and **publishable key**. Or find these under **Project Settings → API Keys**.
2. Project URL looks like `https://something.supabase.co`.
3. The browser-safe publishable key starts `sb_publishable_`.
4. Open your extracted `supabase-config.js` in Notepad or VS Code.
5. Replace the two `REPLACE_WITH_...` placeholder values only. Keep all quotes and punctuation. Save (Ctrl+S).

**NEVER paste a Supabase secret key (`sb_secret_`), a legacy `service_role` key, or a database password into a website file.** The publishable key is intended for browsers; the database RLS/roles provide access control.

## Step F — Put the website on GitHub

1. Extract this ZIP on your Windows computer: right-click ZIP → **Extract All**.
2. Open your GitHub repository: https://github.com/sam-x9/accessable-support
3. Click **Add file → Upload files**.
4. From the extracted package, upload the **files inside** the folder, not the ZIP itself and not a wrapper folder. `index.html` must be in the repository root.
5. When GitHub offers to replace files with the same names, choose to replace them. If older Firebase files remain in the repository (`firebase-config.js`, `firestore.rules`), they are unused by this Supabase edition and may be deleted for clarity.
6. Enter commit message `Publish AccessAble 5.0 with Supabase` and select **Commit changes**.
7. Go to **Settings → Pages**. Under **Build and deployment**, set **Deploy from a branch → main → /(root)**, unless your repo already uses a different publishing branch; then keep the existing one. Click **Save**.
8. Open https://sam-x9.github.io/accessable-support/ and refresh once GitHub Pages completes the update.

If the website does not update, check GitHub **Actions** for a deployment failure, confirm `index.html` is at the correct root, and do a hard refresh (Ctrl+Shift+R).

## Step G — Test a student-to-staff ticket

1. On the published student site, look for the **Cloud connected** banner. If it says preview/offline, the Supabase config or Anonymous Sign-Ins are not configured.
2. Click **Create request** and submit a **fictional test ticket**, e.g. `Cannot open learning portal` with a short description. Record its ticket ID.
3. Open Supabase **Table Editor → support_tickets**. The request should be visible there.
4. On the student website, scroll to the footer and click **Staff login ↗**. This opens a **new tab**.
5. Enter the email and password of the account you created in Step D.
6. Open **Support tickets** on the staff dashboard. The same ticket should appear (the dashboard refreshes automatically, or you can reload).
7. Open the ticket, set **In progress**, add a short troubleshooting note, and save.
8. Switch back to the student website; focus or reload the browser tab, then look at **My Workspace** to see the updated status and history.
9. Try a different staff account that has **no `staff_accounts` role**: it must **not** access the dashboard or retrieve tickets.

## Limitations and safety

- The student portal currently uses **anonymous browser-based accounts**, not real school logins. If a student clears storage or uses a different device, they cannot automatically access the same personal ticket history; staff can still see the ticket.
- Staff passwords are verified by Supabase Auth; the website does **not** store them. The staff dashboard checks `staff_accounts.active`, and database functions enforce staff-only changes.
- A separate staff page URL is not itself a security boundary; the **Supabase database rules are**.
- Appointment requests do not guarantee an actual meeting; the project has no real advisors or external calendar integration.
- The project uses the hosted Supabase JavaScript library from a CDN. Internet access is needed for cloud mode.
- Before collecting real student personal information, do security testing, privacy review, retention policy, CAPTCHA/abuse controls, and accessible testing. Supabase free projects may pause after inactivity.
- Supabase cloud login and database updates **have not been end-to-end tested with your project**, because your private Supabase account is not connected here. The offline UI and JavaScript syntax can be tested independently.

Official guidance: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site, https://supabase.com/docs/guides/auth, https://supabase.com/docs/guides/database/postgres/row-level-security, https://supabase.com/docs/guides/getting-started/api-keys

## Public-facing copy update (v5.1)

Removed the portfolio announcement strip, the portfolio line in the student website footer, and the portfolio disclosure box on the About page. The site still gives accurate data-handling details alongside forms and support status messages. These changes do not activate Supabase; follow the configuration steps above.
