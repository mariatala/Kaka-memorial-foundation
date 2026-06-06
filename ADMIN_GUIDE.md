# Admin Guide — Kaka Memorial Foundation

This guide explains how to use the admin section of the Kaka Memorial Foundation website. It is written for foundation staff who manage the site's content, events, and community submissions.

---

## Table of Contents

1. [Signing In](#1-signing-in)
2. [The Admin Dashboard](#2-the-admin-dashboard)
3. [Managing Events](#3-managing-events)
4. [Viewing Event Attendees](#4-viewing-event-attendees)
5. [Viewing Registrations (Partners & Volunteers)](#5-viewing-registrations-partners--volunteers)
6. [Viewing Donations](#6-viewing-donations)
7. [Reading Contact Messages](#7-reading-contact-messages)
8. [Editing Homepage Statistics](#8-editing-homepage-statistics)
9. [Managing the Carousel (Recent Projects)](#9-managing-the-carousel-recent-projects)
10. [Managing Newsletter Subscribers](#10-managing-newsletter-subscribers)
11. [Signing Out](#11-signing-out)

---

## 1. Signing In

Only staff with an admin account can access the admin section. Admin accounts are set up by the technical team — you cannot create one yourself through the website.

**Steps:**

1. Go to the website and click **Sign In** in the navigation bar, or visit `/sign-in` directly.
2. Enter your **Email Address** and **Password**.
3. Click **Sign In**.
4. If your credentials are correct, you will be taken to the home page. Then navigate to `/admin` or click your way to the admin dashboard.

> If you see "Invalid email or password," double-check your credentials. If you have forgotten your password, contact the technical team to reset it.

---

## 2. The Admin Dashboard

Once signed in as an admin, go to `/admin`. You will see:

- Your **name**, **email address**, and your role badge (**ADMIN**) displayed at the top.
- A grid of **8 quick-action cards**, each leading to a different section of the admin panel.

The eight sections are:

| Section | What it does |
|---------|-------------|
| **Registrations** | View partner and volunteer form submissions |
| **Events** | Create and manage event categories |
| **Event Attendees** | View everyone who registered for an event |
| **Donations** | View all PayPal donation records |
| **Messages** | Read contact form submissions |
| **Statistics** | Edit the impact numbers shown on the homepage |
| **Carousel** | Manage the sliding project/advocacy cards on the homepage |
| **Subscribers** | View and manage newsletter subscribers |

Click any card to go to that section.

---

## 3. Managing Events

Go to **Admin → Events** (or `/admin/events`).

This section lets you create, edit, and delete **event categories** — the types of events the foundation hosts (such as Community Outreach, Fundraising, or Advocacy events).

### Creating a New Event

1. Click the **+ New Event** button at the top right.
2. A form will appear. Fill in the following fields:

   | Field | Description | Required? |
   |-------|-------------|-----------|
   | **Title** | The main name of the event (e.g., "Community Outreach") | Yes |
   | **Subtitle** | A short tagline or extra title | No |
   | **Date & Time** | When the event will take place | No |
   | **Location** | The venue or city | No |
   | **Image URL** | A link to the event's photo (e.g., `/school.png` or a full web address) | No |
   | **Card Colour** | The background colour of the event card on the website — choose from Teal, Orange, Blue, or Dark Green | No |
   | **Display Order** | A number that controls where this event appears in the list — lower numbers appear first (e.g., 0 comes before 1) | No |
   | **About** | A paragraph describing the event | No |

3. Click **Create Event** to save.

If something goes wrong, a red error message will appear at the top of the form explaining what needs to be fixed.

### Editing an Existing Event

1. Find the event in the list below the form.
2. Click the **Edit** button (pencil icon) on that event's card.
3. The form at the top will fill in with the event's current details.
4. Make your changes and click **Save Changes**.

### Deleting an Event

1. Find the event in the list.
2. Click the **Delete** button (trash icon).
3. A confirmation prompt will appear — click **Confirm** to permanently delete the event, or **Cancel** to go back.

> **Important:** Deleting an event category will affect any attendee registrations linked to it. Registrations will remain in the database but will no longer be associated with a category.

---

## 4. Viewing Event Attendees

Go to **Admin → Event Attendees** (or `/admin/event-attendees`).

This section shows everyone who has registered for an event through the website.

### Searching and Filtering

- Use the **search box** at the top to search by a person's name, email address, or phone number.
- Use the **event dropdown** to filter results to a specific event category.
- You can also click the **event name chips** below the controls to toggle between events quickly.

### Reading an Attendee's Details

Each row in the table shows:
- **Name** and **Phone Number**
- **Event** they registered for
- **Email Address**
- **Date** of registration

Click the **arrow (chevron)** at the end of any row to expand it and see additional details such as:
- Their location or address
- Any message or comments they left when registering

### Exporting to CSV

Click the **Export CSV** button to download the current list as a spreadsheet file. The file will be named with today's date (e.g., `event-attendees-2026-06-06.csv`). This button is only active when there are results showing.

---

## 5. Viewing Registrations (Partners & Volunteers)

Go to **Admin → Registrations** (or `/admin/registrations`).

This section shows everyone who submitted a Partner or Volunteer form on the Join Us page.

### Filtering by Type

Use the tabs at the top to switch between:
- **All** — shows every submission
- **Partners** — shows only partner requests
- **Volunteers** — shows only volunteer requests

Each tab shows the number of submissions in brackets.

### Reading a Submission

Each row shows:
- **Name** and **Phone Number**
- **Type** badge (Partner or Volunteer)
- **Email Address**
- **Date** submitted

Click the **arrow** at the end of a row to expand it and see:
- Their **address** (if provided)
- Their **message** (if provided)

---

## 6. Viewing Donations

Go to **Admin → Donations** (or `/admin/donations`).

This section shows all donations processed through PayPal on the website.

### Summary Cards

At the top of the page you will see:
- **Total Raised** — the combined value of all donations in USD
- **Transactions** — the total number of individual donations received

### Filtering by Frequency

Use the tabs to filter donations by type:
- **All** — every donation
- **One-time** — single donations
- **Monthly** — recurring monthly donors

### Reading a Donation Record

Each row shows:
- **Donor name** (or "Anonymous" if they did not provide one)
- **Email address** (or a dash if not provided)
- **Amount** in USD
- **Frequency** badge (One-time or Monthly)
- **Date** the donation was recorded

Click the **arrow** on any row to expand it and see the **Transaction ID** — this is the unique PayPal reference number for that payment, which can be used to verify the transaction in your PayPal account.

---

## 7. Reading Contact Messages

Go to **Admin → Messages** (or `/admin/messages`).

This section shows all messages submitted through the Contact page.

A summary card at the top shows the **total number of messages** received.

### Reading a Message

Each row shows:
- **Sender's name** and **email address**
- **Subject** (if they provided one)
- **Date** the message was sent

Click the **arrow** on a row to expand it and read the **full message text**.

> Messages cannot be replied to directly from this panel. Use the email address shown in the row to follow up with the sender.

---

## 8. Editing Homepage Statistics

Go to **Admin → Statistics** (or `/admin/statistics`).

This section controls the impact numbers displayed on the homepage (for example, "500+ People Served" or "$10,000 Grants Raised").

### Creating a New Statistic

1. Click **+ New Stat**.
2. Fill in the form:

   | Field | Description | Example | Required? |
   |-------|-------------|---------|-----------|
   | **Description** | A label explaining what the number represents | "People Served by Kaka Foundation" | Yes |
   | **Value** | The number to display (whole numbers only) | `500` | Yes |
   | **Prefix** | A symbol that appears before the number | `$` or `₦` | No |
   | **Suffix** | A symbol that appears after the number | `+` | No |
   | **Display Order** | Controls the order in which stats appear — lower numbers appear first | `0` | No |

3. Click **Create Stat**.

A preview of how the number will look on the homepage is shown as you type.

> Numbers of 10,000 or more are automatically formatted with commas (e.g., 10000 displays as 10,000).

### Editing a Statistic

1. Find the statistic in the list below the form.
2. Click **Edit**.
3. The form fills in with current values — make your changes.
4. Click **Save Changes**.

A brief confirmation message will appear when the save is successful.

### Deleting a Statistic

1. Click the **Delete** button on the statistic you want to remove.
2. Confirm when prompted.

---

## 9. Managing the Carousel (Recent Projects)

Go to **Admin → Carousel** (or `/admin/carousel`).

This section manages the sliding cards on the homepage that showcase recent advocacy work or projects (such as "X-Space Advocacy" or "Water Access Campaign").

### Creating a New Carousel Item

1. Click **+ New Item**.
2. Fill in the form:

   | Field | Description | Required? |
   |-------|-------------|-----------|
   | **Title** | The headline of the slide (e.g., "Water Access Advocacy") | Yes |
   | **Description** | A short summary of the project or activity | Yes |
   | **Image** | A file path (e.g., `/water.jpg`) or a full web URL to the image | Yes |
   | **Image Alt Text** | A brief description of the image for accessibility (e.g., "Children collecting clean water") | No |
   | **Link** | An optional link — e.g., to an events page or external article | No |
   | **Display Order** | Controls the order of slides — lower numbers appear first | No |

3. A **thumbnail preview** of the image will appear if the image URL is valid.
4. Click **Create Item** to save.

### Editing a Carousel Item

1. Find the item in the list.
2. Click **Edit**.
3. Adjust the fields as needed.
4. Click **Save Changes**.

### Deleting a Carousel Item

1. Click **Delete** on the item.
2. Confirm when prompted.

---

## 10. Managing Newsletter Subscribers

Go to **Admin → Subscribers** (or `/admin/memberships`).

This section lists every person who subscribed to the newsletter via the website.

### Searching Subscribers

Use the **filter box** at the top to search by email address. The list updates as you type.

The footer of the table shows how many subscribers are currently visible versus the total (e.g., "5 of 23 subscribers").

### Copying Email Addresses

Click **Copy all** (or **Copy X** when filtering) to copy all visible email addresses to your clipboard as a comma-separated list. This is useful for sending bulk emails through your email client. A "Copied!" confirmation appears briefly after clicking.

### Removing a Subscriber

1. Find the subscriber's row.
2. Click the **trash (delete) icon** on the right.
3. A confirmation prompt will appear — click **Remove** to delete, or **Cancel** to go back.

> Removing a subscriber deletes their record permanently. They can re-subscribe through the website at any time.

---

## 11. Signing Out

To sign out, click the **Sign Out** option in the navigation header. You will be returned to the home page and your admin session will end.

---

> For technical issues such as forgotten passwords, database errors, or access problems, please contact the development team.
